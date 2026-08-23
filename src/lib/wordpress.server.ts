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

type PaginationInput = z.infer<typeof paginationInputSchema>;
type SlugInput = z.infer<typeof slugInputSchema>;

function validatePaginationInput(input: unknown): PaginationInput {
  const parsed = paginationInputSchema.safeParse(input);
  if (!parsed.success) throw new Error("Invalid pagination request.");
  return parsed.data;
}

function validateSlugInput(input: unknown): SlugInput {
  const parsed = slugInputSchema.safeParse(input);
  if (!parsed.success) throw new Error("Invalid perspective request.");
  return parsed.data;
}

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

class WordPressPageOutOfRangeError extends Error {
  constructor() {
    super("The requested WordPress page is out of range.");
    this.name = "WordPressPageOutOfRangeError";
  }
}

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
    "video",
    "source",
    "track",
    "iframe",
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
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "loading",
      "allow",
      "allowfullscreen",
      "referrerpolicy",
    ],
    ol: ["start", "reversed", "type"],
    pre: ["class"],
    source: ["src", "type"],
    span: ["class"],
    table: ["class"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan", "scope"],
    track: ["src", "kind", "srclang", "label", "default"],
    video: ["src", "poster", "controls", "preload", "width", "height", "playsinline"],
  },
  allowedClasses: {
    "*": [
      /^wp-block(?:-[a-z0-9-]+)?$/u,
      /^align(?:left|right|center|wide|full)$/u,
      /^has-[a-z0-9-]+$/u,
      /^is-style-[a-z0-9-]+$/u,
      /^language-[a-z0-9-]+$/u,
      /^wp-(?:embed-aspect-\d+-\d+|has-aspect-ratio)$/u,
    ],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: {
    iframe: ["https"],
    img: ["https"],
    source: ["https"],
    track: ["https"],
    video: ["https"],
  },
  allowedSchemesAppliedToAttributes: ["href", "src", "cite", "poster"],
  allowedIframeHostnames: [
    "youtube.com",
    "www.youtube.com",
    "www.youtube-nocookie.com",
    "player.vimeo.com",
  ],
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

async function isOutOfRangeResponse(response: Response): Promise<boolean> {
  if (response.status !== 400 && response.status !== 404) return false;

  try {
    const payload: unknown = await response.clone().json();
    return (
      typeof payload === "object" &&
      payload !== null &&
      "code" in payload &&
      payload.code === "rest_post_invalid_page_number"
    );
  } catch {
    return false;
  }
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
      if (await isOutOfRangeResponse(response)) throw new WordPressPageOutOfRangeError();
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

function getMediaFileName(value: string, baseUrl?: string): string | null {
  try {
    const pathname = new URL(value, baseUrl).pathname;
    const fileName = pathname.split("/").filter(Boolean).at(-1);
    return fileName ? decodeURIComponent(fileName).toLocaleLowerCase("en") : null;
  } catch {
    return null;
  }
}

/** Returns an absolute HTTPS media URL, or null when the source is unsafe. */
export function normalizeWordPressMediaUrl(
  value: string | undefined,
  baseUrl?: string,
): string | null {
  if (!value) return null;

  try {
    const url = baseUrl ? new URL(value, baseUrl) : new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function normalizeWordPressEmbedUrl(value: string | undefined): string | null {
  const normalized = normalizeWordPressMediaUrl(value);
  if (!normalized) return null;

  const url = new URL(normalized);
  const hostname = url.hostname.toLocaleLowerCase("en");

  if (
    hostname === "youtube.com" ||
    hostname === "www.youtube.com" ||
    hostname === "www.youtube-nocookie.com"
  ) {
    return /^\/embed\/[a-z0-9_-]+\/?$/iu.test(url.pathname) ? url.href : null;
  }

  if (hostname === "player.vimeo.com") {
    return /^\/video\/\d+\/?$/u.test(url.pathname) ? url.href : null;
  }

  return null;
}

function normalizeSourceAttributes(
  tagName: string,
  attributes: sanitizeHtml.Attributes,
  baseUrl?: string,
): sanitizeHtml.Tag {
  const safeAttributes = { ...attributes };
  const source = normalizeWordPressMediaUrl(safeAttributes["src"], baseUrl);

  if (source) safeAttributes["src"] = source;
  else delete safeAttributes["src"];

  return { tagName, attribs: safeAttributes };
}

export function sanitizeWordPressContent(
  value: string,
  featuredImageUrl?: string,
  mediaBaseUrl?: string,
): string {
  const featuredFileName = featuredImageUrl
    ? getMediaFileName(featuredImageUrl, featuredImageUrl)
    : null;

  return sanitizeHtml(value, {
    ...contentSanitizerOptions,
    transformTags: {
      ...(contentSanitizerOptions.transformTags ?? {}),
      img: (tagName, attributes) => {
        const transformed = normalizeSourceAttributes(tagName, attributes, mediaBaseUrl);
        transformed.attribs["loading"] = "lazy";
        transformed.attribs["decoding"] = "async";
        transformed.attribs["alt"] ??= "";
        return transformed;
      },
      iframe: (tagName, attributes) => {
        const safeAttributes = { ...attributes };
        const source = normalizeWordPressEmbedUrl(safeAttributes["src"]);

        if (source) safeAttributes["src"] = source;
        else delete safeAttributes["src"];

        safeAttributes["title"] = safeAttributes["title"]?.trim() || "Embedded video";
        safeAttributes["loading"] = "lazy";
        safeAttributes["referrerpolicy"] = "strict-origin-when-cross-origin";
        safeAttributes["allow"] = "encrypted-media; picture-in-picture";
        safeAttributes["allowfullscreen"] = "";
        return { tagName, attribs: safeAttributes };
      },
      source: (tagName, attributes) => normalizeSourceAttributes(tagName, attributes, mediaBaseUrl),
      track: (tagName, attributes) => normalizeSourceAttributes(tagName, attributes, mediaBaseUrl),
      video: (tagName, attributes) => {
        const transformed = normalizeSourceAttributes(tagName, attributes, mediaBaseUrl);
        const poster = normalizeWordPressMediaUrl(transformed.attribs["poster"], mediaBaseUrl);

        if (poster) transformed.attribs["poster"] = poster;
        else delete transformed.attribs["poster"];

        transformed.attribs["controls"] = "";
        transformed.attribs["playsinline"] = "";
        transformed.attribs["preload"] = "metadata";
        return transformed;
      },
    },
    exclusiveFilter: (frame: sanitizeHtml.IFrame) => {
      if (["iframe", "img", "source", "track"].includes(frame.tag) && !frame.attribs["src"]) {
        return true;
      }

      if (frame.tag === "img" && featuredFileName) {
        const source = frame.attribs["src"];
        if (source && getMediaFileName(source, featuredImageUrl) === featuredFileName) return true;
      }

      return frame.tag === "figure" && frame.mediaChildren.length === 0 && frame.text.trim() === "";
    },
  });
}

function normalizeDate(value: string): string {
  const dateWithZone = /(?:Z|[+-]\d{2}:\d{2})$/u.test(value) ? value : `${value}Z`;
  return new Date(dateWithZone).toISOString();
}

function normalizePostSummary(post: WordPressPostSummary, mediaBaseUrl?: string): BlogPostSummary {
  const category = post._embedded?.["wp:term"]?.flat().find((term) => term.taxonomy === "category");
  const author = post._embedded?.author?.[0];
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const mediaUrl = normalizeWordPressMediaUrl(media?.source_url, mediaBaseUrl);
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
    featuredImage:
      media && mediaUrl
        ? {
            url: mediaUrl,
            alt: toPlainText(media.alt_text ?? ""),
            ...(dimensions?.width === undefined ? {} : { width: dimensions.width }),
            ...(dimensions?.height === undefined ? {} : { height: dimensions.height }),
          }
        : null,
  };
}

function normalizePost(post: WordPressPost, mediaBaseUrl?: string): BlogPost {
  const summary = normalizePostSummary(post, mediaBaseUrl);
  return {
    ...summary,
    contentHtml: sanitizeWordPressContent(
      post.content.rendered,
      summary.featuredImage?.url,
      mediaBaseUrl,
    ),
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
    contentHtml: sanitizeWordPressContent(
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

async function getPaginationMetadata(
  url: URL,
): Promise<Pick<PaginatedPosts, "total" | "totalPages">> {
  const metadataUrl = new URL(url);
  metadataUrl.searchParams.set("page", "1");
  metadataUrl.searchParams.set("per_page", "1");
  metadataUrl.searchParams.delete("_embed");
  metadataUrl.searchParams.set("_fields", "id");

  const response = await fetchWordPress(metadataUrl);
  return {
    total: parsePaginationHeader(response, "X-WP-Total"),
    totalPages: parsePaginationHeader(response, "X-WP-TotalPages"),
  };
}

async function loadPublishedPosts(data: PaginationInput): Promise<PaginatedPosts> {
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
  url.searchParams.set("_embed", "wp:featuredmedia,wp:term");
  url.searchParams.set("_fields", "id,slug,date_gmt,modified_gmt,title,excerpt,_links,_embedded");

  let response: Response;
  try {
    response = await fetchWordPress(url);
  } catch (error) {
    if (!(error instanceof WordPressPageOutOfRangeError)) throw error;

    const { total, totalPages } = await getPaginationMetadata(url);
    return {
      posts: [],
      page: data.page,
      perPage: data.perPage,
      total,
      totalPages,
    };
  }

  const total = parsePaginationHeader(response, "X-WP-Total");
  const totalPages = parsePaginationHeader(response, "X-WP-TotalPages");
  const posts = await parsePostSummariesResponse(response);
  const mediaBaseUrl = `${apiBaseUrl.origin}/`;

  return {
    posts: posts.map((post) => normalizePostSummary(post, mediaBaseUrl)),
    page: data.page,
    perPage: data.perPage,
    total,
    totalPages,
  };
}

async function loadPublishedPostBySlug(data: SlugInput): Promise<BlogPost | null> {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) {
    return getFallbackPosts().find((post) => post.slug === data.slug) ?? null;
  }

  const url = createPostsUrl(apiBaseUrl);
  url.searchParams.set("status", "publish");
  url.searchParams.set("slug", data.slug);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("_embed", "wp:featuredmedia,wp:term");
  url.searchParams.set(
    "_fields",
    "id,slug,date_gmt,modified_gmt,title,excerpt,content,_links,_embedded",
  );

  const response = await fetchWordPress(url);
  const posts = await parsePostsResponse(response);
  return posts[0] ? normalizePost(posts[0], `${apiBaseUrl.origin}/`) : null;
}

function reportWordPressFailure(operation: string, error: unknown): void {
  console.error(`[wordpress] ${operation} failed.`, error);
}

export const getPublishedPosts = createServerFn({ method: "GET" })
  .validator(validatePaginationInput)
  .handler(async ({ data }): Promise<PaginatedPosts> => {
    try {
      return await loadPublishedPosts(data);
    } catch (error) {
      reportWordPressFailure("Loading published posts", error);
      throw new Error("The perspectives service is temporarily unavailable.");
    }
  });

export const getPublishedPostBySlug = createServerFn({ method: "GET" })
  .validator(validateSlugInput)
  .handler(async ({ data }): Promise<BlogPost | null> => {
    try {
      return await loadPublishedPostBySlug(data);
    } catch (error) {
      reportWordPressFailure("Loading a published post", error);
      throw new Error("The perspective service is temporarily unavailable.");
    }
  });
