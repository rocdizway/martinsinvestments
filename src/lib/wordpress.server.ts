import { createServerFn } from "@tanstack/react-start";
import { decodeHTML } from "entities";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";

import { insights } from "@/data/group";
import type { BlogPost, BlogPostSummary, PaginatedPosts } from "@/lib/wordpress-types";

const REQUEST_TIMEOUT_MS = 8_000;
const EXCERPT_MAX_LENGTH = 180;
const RETRYABLE_STATUS_CODES = new Set([502, 503, 504]);
const WORDPRESS_API_PATH = /\/wp-json\/wp\/v2\/?$/u;
const WORDPRESS_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/u;

const paginationInputSchema = z
  .object({
    page: z.number().int().min(1).max(10_000),
    perPage: z.number().int().min(1).max(100),
  })
  .strict();

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .refine(
    (slug) =>
      !Array.from(slug).some((character) => {
        const codePoint = character.codePointAt(0);
        return codePoint !== undefined && (codePoint <= 31 || codePoint === 127);
      }),
    "Slug cannot contain control characters",
  )
  .refine((slug) => !/[\\/?#]/u.test(slug), "Slug cannot contain URL path delimiters");

const slugInputSchema = z.object({ slug: slugSchema }).strict();

const renderedSchema = z.object({ rendered: z.string() });
const wordpressDateSchema = z.string().refine((value) => {
  if (!WORDPRESS_DATE.test(value)) return false;

  const dateWithZone = /(?:Z|[+-]\d{2}:\d{2})$/u.test(value) ? value : `${value}Z`;
  return !Number.isNaN(Date.parse(dateWithZone));
}, "Invalid WordPress date");

const authorSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

const termSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  taxonomy: z.string(),
});

const httpUrlSchema = z
  .string()
  .url()
  .refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "URL must use HTTP or HTTPS");

const mediaSchema = z.object({
  source_url: httpUrlSchema,
  alt_text: z.string().optional(),
  media_details: z
    .object({
      width: z.number().int().positive().optional(),
      height: z.number().int().positive().optional(),
    })
    .optional(),
});

const embeddedSchema = z
  .object({
    author: z.array(authorSchema).optional(),
    "wp:featuredmedia": z.array(mediaSchema).optional(),
    "wp:term": z.array(z.array(termSchema)).optional(),
  })
  .optional();

const wordpressPostSummarySchema = z.object({
  id: z.number().int().positive(),
  slug: slugSchema,
  date_gmt: wordpressDateSchema,
  modified_gmt: wordpressDateSchema,
  title: renderedSchema,
  excerpt: renderedSchema,
  _embedded: embeddedSchema,
});

const wordpressPostSchema = wordpressPostSummarySchema.extend({
  content: renderedSchema,
});

const wordpressPostSummariesSchema = z.array(wordpressPostSummarySchema);
const wordpressPostsSchema = z.array(wordpressPostSchema);

type WordPressPostSummary = z.infer<typeof wordpressPostSummarySchema>;
type WordPressPost = z.infer<typeof wordpressPostSchema>;

const contentSanitizerOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "del",
    "a",
    "figure",
    "figcaption",
    "img",
    "pre",
    "code",
    "hr",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "div",
    "span",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel", "aria-label"],
    blockquote: ["cite"],
    code: ["class"],
    div: ["class"],
    figure: ["class"],
    figcaption: ["class"],
    h2: ["id"],
    h3: ["id"],
    h4: ["id"],
    h5: ["id"],
    h6: ["id"],
    img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
    ol: ["start", "reversed", "type"],
    pre: ["class"],
    span: ["class"],
    table: ["class"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan", "scope"],
  },
  allowedClasses: {
    "*": [
      /^wp-block(?:-[a-z0-9-]+)?$/u,
      /^align(?:left|right|center|wide|full)$/u,
      /^has-[a-z0-9-]+$/u,
      /^is-style-[a-z0-9-]+$/u,
      /^language-[a-z0-9-]+$/u,
    ],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: {
    img: ["http", "https"],
  },
  allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
  allowProtocolRelative: false,
  enforceHtmlBoundary: true,
  nonTextTags: ["style", "script", "textarea", "option", "noscript"],
  transformTags: {
    a: (tagName, attributes) => {
      const safeAttributes = { ...attributes };

      if (safeAttributes["target"] === "_blank") {
        safeAttributes["rel"] = "noopener noreferrer";
      } else {
        delete safeAttributes["target"];
        delete safeAttributes["rel"];
      }

      return { tagName, attribs: safeAttributes };
    },
    img: sanitizeHtml.simpleTransform("img", {
      loading: "lazy",
      decoding: "async",
    }),
  },
};

function getApiBaseUrl(): URL | null {
  const configuredUrl = import.meta.env["VITE_WORDPRESS_API_URL"]?.trim();
  if (!configuredUrl) return null;

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch (error) {
    throw new Error("VITE_WORDPRESS_API_URL must be a valid absolute URL.", {
      cause: error,
    });
  }

  const isLocalDevelopment =
    url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]";
  if (url.protocol !== "https:" && !(isLocalDevelopment && url.protocol === "http:")) {
    throw new Error("VITE_WORDPRESS_API_URL must use HTTPS (HTTP is only allowed for localhost).");
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new Error(
      "VITE_WORDPRESS_API_URL cannot contain credentials, a query string, or a fragment.",
    );
  }

  if (!WORDPRESS_API_PATH.test(url.pathname)) {
    throw new Error("VITE_WORDPRESS_API_URL must end with /wp-json/wp/v2.");
  }

  url.pathname = `${url.pathname.replace(/\/+$/u, "")}/`;
  return url;
}

function createPostsUrl(apiBaseUrl: URL): URL {
  const url = new URL("posts", apiBaseUrl);
  if (url.origin !== apiBaseUrl.origin) {
    throw new Error("WordPress endpoint escaped the configured origin.");
  }
  return url;
}

function isRetryableNetworkError(error: unknown): boolean {
  return (
    error instanceof TypeError ||
    (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError"))
  );
}

async function fetchWordPress(url: URL): Promise<Response> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    let response: Response;

    try {
      response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        redirect: "error",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      if (attempt === 0 && isRetryableNetworkError(error)) continue;

      throw new Error("The WordPress API could not be reached.", {
        cause: error,
      });
    }

    if (attempt === 0 && RETRYABLE_STATUS_CODES.has(response.status)) continue;

    if (!response.ok) {
      throw new Error(`WordPress API request failed with HTTP ${response.status}.`);
    }

    return response;
  }

  throw new Error("The WordPress API request failed after one retry.");
}

async function readPostsPayload(response: Response): Promise<unknown> {
  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error("WordPress returned an invalid JSON response.", { cause: error });
  }

  return payload;
}

async function parsePostSummariesResponse(response: Response): Promise<WordPressPostSummary[]> {
  const payload = await readPostsPayload(response);
  const parsed = wordpressPostSummariesSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error("WordPress returned an unexpected post summaries response.", {
      cause: parsed.error,
    });
  }

  return parsed.data;
}

async function parsePostsResponse(response: Response): Promise<WordPressPost[]> {
  const payload = await readPostsPayload(response);

  const parsed = wordpressPostsSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error("WordPress returned an unexpected posts response.", {
      cause: parsed.error,
    });
  }

  return parsed.data;
}

function parsePaginationHeader(response: Response, name: string): number {
  const value = response.headers.get(name);
  const parsed = z
    .string()
    .regex(/^\d+$/u)
    .transform(Number)
    .pipe(z.number().int().nonnegative())
    .safeParse(value);
  if (!parsed.success) {
    throw new Error(`WordPress response is missing a valid ${name} header.`);
  }
  return parsed.data;
}

function toPlainText(value: string): string {
  const blockSeparated = value.replace(
    /<\/?(?:p|br|h[1-6]|li|blockquote|div|figure|figcaption)\b[^>]*>/giu,
    " ",
  );
  const withoutMarkup = sanitizeHtml(blockSeparated, {
    allowedTags: [],
    allowedAttributes: {},
    nonTextTags: ["style", "script", "textarea", "option", "noscript"],
  });

  return decodeHTML(withoutMarkup)
    .replace(/\u00a0/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function normalizeExcerpt(value: string): string {
  const excerpt = toPlainText(value)
    .replace(/\s*\[…\]\s*$/u, "")
    .trim();
  if (excerpt.length <= EXCERPT_MAX_LENGTH) return excerpt;

  const candidate = excerpt.slice(0, EXCERPT_MAX_LENGTH - 1);
  const lastWordBoundary = candidate.lastIndexOf(" ");
  const end = lastWordBoundary >= EXCERPT_MAX_LENGTH * 0.75 ? lastWordBoundary : candidate.length;
  return `${candidate.slice(0, end).replace(/[,:;.!?\s-]+$/u, "")}…`;
}

function sanitizeContent(value: string): string {
  return sanitizeHtml(value, contentSanitizerOptions);
}

function normalizeDate(value: string): string {
  const dateWithZone = /(?:Z|[+-]\d{2}:\d{2})$/u.test(value) ? value : `${value}Z`;
  return new Date(dateWithZone).toISOString();
}

function normalizePostSummary(post: WordPressPostSummary): BlogPostSummary {
  const category = post._embedded?.["wp:term"]?.flat().find((term) => term.taxonomy === "category");
  const author = post._embedded?.author?.[0];
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const dimensions = media?.media_details;

  return {
    id: post.id,
    slug: post.slug,
    title: toPlainText(post.title.rendered) || "Untitled",
    excerpt: normalizeExcerpt(post.excerpt.rendered),
    publishedAt: normalizeDate(post.date_gmt),
    modifiedAt: normalizeDate(post.modified_gmt),
    category: category ? toPlainText(category.name) || "Perspectives" : "Perspectives",
    author: author ? toPlainText(author.name) || "Martins Investments" : "Martins Investments",
    featuredImage: media
      ? {
          url: media.source_url,
          alt: toPlainText(media.alt_text ?? ""),
          ...(dimensions?.width === undefined ? {} : { width: dimensions.width }),
          ...(dimensions?.height === undefined ? {} : { height: dimensions.height }),
        }
      : null,
  };
}

function normalizePost(post: WordPressPost): BlogPost {
  return {
    ...normalizePostSummary(post),
    contentHtml: sanitizeContent(post.content.rendered),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getFallbackPosts(): BlogPost[] {
  return insights.map((post, index) => ({
    id: index + 1,
    slug: post.slug,
    title: toPlainText(post.title),
    excerpt: toPlainText(post.excerpt),
    publishedAt: new Date(`${post.date}T00:00:00Z`).toISOString(),
    modifiedAt: new Date(`${post.date}T00:00:00Z`).toISOString(),
    category: toPlainText(post.category),
    author: "Martins Investments",
    featuredImage: null,
    contentHtml: sanitizeContent(
      post.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join(""),
    ),
  }));
}

function withoutContent(post: BlogPost): BlogPostSummary {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    modifiedAt: post.modifiedAt,
    category: post.category,
    author: post.author,
    featuredImage: post.featuredImage,
  };
}

export const getPublishedPosts = createServerFn({ method: "GET" })
  .validator((input: unknown) => paginationInputSchema.parse(input))
  .handler(async ({ data }): Promise<PaginatedPosts> => {
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) {
      const posts = getFallbackPosts().map(withoutContent);
      const start = (data.page - 1) * data.perPage;

      return {
        posts: posts.slice(start, start + data.perPage),
        page: data.page,
        perPage: data.perPage,
        total: posts.length,
        totalPages: Math.ceil(posts.length / data.perPage),
      };
    }

    const url = createPostsUrl(apiBaseUrl);
    url.searchParams.set("status", "publish");
    url.searchParams.set("page", String(data.page));
    url.searchParams.set("per_page", String(data.perPage));
    url.searchParams.set("orderby", "date");
    url.searchParams.set("order", "desc");
    url.searchParams.set("_embed", "author,wp:featuredmedia,wp:term");
    url.searchParams.set("_fields", "id,slug,date_gmt,modified_gmt,title,excerpt,_links,_embedded");

    const response = await fetchWordPress(url);
    const total = parsePaginationHeader(response, "X-WP-Total");
    const totalPages = parsePaginationHeader(response, "X-WP-TotalPages");
    const posts = await parsePostSummariesResponse(response);

    return {
      posts: posts.map(normalizePostSummary),
      page: data.page,
      perPage: data.perPage,
      total,
      totalPages,
    };
  });

export const getPublishedPostBySlug = createServerFn({ method: "GET" })
  .validator((input: unknown) => slugInputSchema.parse(input))
  .handler(async ({ data }): Promise<BlogPost | null> => {
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) {
      return getFallbackPosts().find((post) => post.slug === data.slug) ?? null;
    }

    const url = createPostsUrl(apiBaseUrl);
    url.searchParams.set("status", "publish");
    url.searchParams.set("slug", data.slug);
    url.searchParams.set("per_page", "1");
    url.searchParams.set("_embed", "author,wp:featuredmedia,wp:term");
    url.searchParams.set(
      "_fields",
      "id,slug,date_gmt,modified_gmt,title,excerpt,content,_links,_embedded",
    );

    const response = await fetchWordPress(url);
    const posts = await parsePostsResponse(response);
    return posts[0] ? normalizePost(posts[0]) : null;
  });
