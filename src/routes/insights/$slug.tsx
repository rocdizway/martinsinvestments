import { createFileRoute, notFound, redirect, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";

import { GoldLink } from "@/components/gold-link";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/site";
import { getPublishedPostBySlug } from "@/lib/wordpress.server";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const LEGACY_SLUG_REDIRECTS: Readonly<Record<string, string>> = {
  "why-the-right-piece-still-matters": "why-right-matters",
  "the-feeling-before-the-event": "the-feeling-begins-before-the-event",
};

function toAbsoluteHttpUrl(value: string, fallback: string): string {
  try {
    const url = new URL(value, `${SITE_URL}/`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : fallback;
  } catch {
    return fallback;
  }
}

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params }) => {
    const post = await getPublishedPostBySlug({ data: { slug: params.slug } });

    if (post === null) {
      const currentSlug = LEGACY_SLUG_REDIRECTS[params.slug];
      if (currentSlug) {
        throw redirect({
          to: "/insights/$slug",
          params: { slug: currentSlug },
          statusCode: 301,
        });
      }
      throw notFound();
    }
    return post;
  },
  staleTime: 60_000,
  headers: ({ loaderData }) => ({
    "cache-control": loaderData
      ? "public, max-age=60, s-maxage=300, stale-while-revalidate=3600"
      : "no-store",
  }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found | Martins Investments" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const post = loaderData;
    const articleUrl = `${SITE_URL}/insights/${encodeURIComponent(post.slug)}`;
    const socialImage = toAbsoluteHttpUrl(post.featuredImage?.url ?? "", `${SITE_URL}/logo.png`);
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.modifiedAt,
      articleSection: post.category,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      image: socialImage,
    };

    return {
      meta: [
        { title: `${post.title} | Martins Investments` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: `${post.title} | Martins Investments` },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: articleUrl },
        { property: "og:image", content: socialImage },
        {
          property: "og:image:alt",
          content: post.featuredImage?.alt || post.title,
        },
        { property: "article:published_time", content: post.publishedAt },
        { property: "article:modified_time", content: post.modifiedAt },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${post.title} | Martins Investments` },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: socialImage },
        {
          name: "twitter:image:alt",
          content: post.featuredImage?.alt || post.title,
        },
        { "script:ld+json": structuredData },
      ],
    };
  },
  pendingMs: 200,
  pendingMinMs: 300,
  pendingComponent: InsightPending,
  errorComponent: InsightError,
  component: InsightPage,
});

function InsightPage() {
  const post = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow={`${post.category} · ${dateFormatter.format(new Date(post.publishedAt))}`}
        title={post.title}
        intro={post.excerpt}
        backgroundImage={post.featuredImage?.url}
      />

      <article>
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-24">
          <div
            className="wp-article-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <footer className="mt-16 border-t border-border pt-10">
            <p className="mb-6 text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Published by {post.author}
            </p>
            <GoldLink to="/insights" variant="outline">
              All perspectives
            </GoldLink>
          </footer>
        </div>
      </article>
    </>
  );
}

function InsightPending() {
  return (
    <div aria-label="Loading article" aria-busy="true">
      <section className="border-b border-border bg-onyx pt-40 pb-20">
        <div className="mx-auto max-w-7xl animate-pulse px-6 lg:px-10">
          <div className="h-2 w-36 bg-muted" />
          <div className="mt-7 h-12 max-w-3xl bg-muted md:h-16" />
          <div className="mt-8 h-3 max-w-2xl bg-muted" />
        </div>
      </section>
      <div className="mx-auto max-w-3xl animate-pulse space-y-5 px-6 py-24 lg:px-10">
        <div className="h-3 w-full bg-muted" />
        <div className="h-3 w-11/12 bg-muted" />
        <div className="h-3 w-4/5 bg-muted" />
      </div>
      <span className="sr-only">Loading article…</span>
    </div>
  );
}

function InsightError({ reset }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <>
      <PageHero eyebrow="Perspectives" title="This perspective couldn’t be loaded." />
      <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
          The journal is taking longer than expected to respond. Please try again in a moment.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              void router.invalidate();
              reset();
            }}
            className="border border-gold/50 px-8 py-4 text-[0.75rem] tracking-[0.2em] uppercase text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Try again
          </button>
          <GoldLink to="/insights" variant="outline">
            All perspectives
          </GoldLink>
        </div>
      </section>
    </>
  );
}
