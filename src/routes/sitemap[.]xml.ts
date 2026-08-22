import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "@/lib/site";
import { getPublishedPosts } from "@/lib/wordpress.server";
import type { BlogPostSummary } from "@/lib/wordpress-types";

const STATIC_PATHS = [
  "/",
  "/about",
  "/approach",
  "/portfolio",
  "/businesses/rocdizway",
  "/businesses/roc-parties",
  "/businesses/roc-away",
  "/founder",
  "/insights",
  "/contact",
  "/privacy",
  "/cookies",
] as const;

const SITEMAP_PAGE_SIZE = 100;
const MAX_SITEMAP_POSTS = 50_000;
const SITEMAP_FETCH_CONCURRENCY = 5;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function entry(location: string, lastModified?: string, priority?: string): string {
  const elements = [`<loc>${escapeXml(location)}</loc>`];
  if (lastModified) elements.push(`<lastmod>${escapeXml(lastModified)}</lastmod>`);
  if (priority) elements.push(`<priority>${priority}</priority>`);
  return `  <url>${elements.join("")}</url>`;
}

async function getAllPublishedPosts(): Promise<BlogPostSummary[]> {
  const firstPage = await getPublishedPosts({
    data: { page: 1, perPage: SITEMAP_PAGE_SIZE },
  });
  const maximumPages = Math.ceil(MAX_SITEMAP_POSTS / SITEMAP_PAGE_SIZE);
  const totalPages = Math.min(firstPage.totalPages, maximumPages);

  if (totalPages <= 1) return firstPage.posts;

  const remainingPages: BlogPostSummary[][] = [];
  for (let firstPageNumber = 2; firstPageNumber <= totalPages;) {
    const pageNumbers = Array.from(
      {
        length: Math.min(SITEMAP_FETCH_CONCURRENCY, totalPages - firstPageNumber + 1),
      },
      (_, index) => firstPageNumber + index,
    );
    const batch = await Promise.all(
      pageNumbers.map((page) =>
        getPublishedPosts({
          data: { page, perPage: SITEMAP_PAGE_SIZE },
        }),
      ),
    );
    remainingPages.push(...batch.map((page) => page.posts));
    firstPageNumber += pageNumbers.length;
  }

  return [...firstPage.posts, ...remainingPages.flat()];
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await getAllPublishedPosts();
        const urls = [
          ...STATIC_PATHS.map((path) =>
            entry(
              `${SITE_URL}${path === "/" ? "/" : path}`,
              undefined,
              path === "/" ? "1.0" : undefined,
            ),
          ),
          ...posts.map((post) =>
            entry(`${SITE_URL}/insights/${encodeURIComponent(post.slug)}`, post.modifiedAt),
          ),
        ];
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
          "",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "cache-control": "public, max-age=60, s-maxage=600, stale-while-revalidate=86400",
            "content-type": "application/xml; charset=utf-8",
          },
        });
      },
    },
  },
});
