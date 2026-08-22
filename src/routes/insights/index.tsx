import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { getPublishedPosts } from "@/lib/wordpress.server";
import type { BlogPostSummary } from "@/lib/wordpress-types";

const POSTS_PER_PAGE = 9;

type InsightsSearch = {
  page?: number;
};

function parsePage(value: unknown): number | undefined {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : Number.NaN;

  if (!Number.isSafeInteger(parsed) || parsed < 1) return undefined;
  return parsed === 1 ? undefined : parsed;
}

export const Route = createFileRoute("/insights/")({
  validateSearch: (search: Record<string, unknown>): InsightsSearch => {
    const page = parsePage(search["page"]);
    return page === undefined ? {} : { page };
  },
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  loader: async ({ deps }) => {
    const result = await getPublishedPosts({
      data: { page: deps.page, perPage: POSTS_PER_PAGE },
    });

    if (deps.page > 1 && deps.page > result.totalPages) throw notFound();
    return result;
  },
  staleTime: 60_000,
  headers: ({ loaderData }) => ({
    "cache-control": loaderData
      ? "public, max-age=60, s-maxage=300, stale-while-revalidate=3600"
      : "no-store",
  }),
  head: ({ loaderData }) => {
    const page = loaderData?.page ?? 1;
    const pageSuffix = page > 1 ? ` — Page ${page}` : "";

    return {
      meta: [
        { title: `Perspectives${pageSuffix} | Martins Investments` },
        {
          name: "description",
          content:
            "Focused perspectives on fashion, experiences, hospitality and purposeful business building.",
        },
        {
          property: "og:title",
          content: `Perspectives${pageSuffix} | Martins Investments`,
        },
        {
          property: "og:description",
          content: "Announcements and perspectives from the Martins Investments group.",
        },
      ],
    };
  },
  pendingMs: 200,
  pendingMinMs: 300,
  pendingComponent: InsightsPending,
  errorComponent: InsightsError,
  component: Insights,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function Insights() {
  const { posts, page, total, totalPages } = Route.useLoaderData();

  return (
    <>
      <InsightsHero />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="mb-8 flex items-end justify-between gap-6">
          <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
            {total === 1 ? "1 perspective" : `${total} perspectives`}
          </p>
          {totalPages > 1 ? (
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Page {page} of {totalPages}
            </p>
          ) : null}
        </div>

        {posts.length > 0 ? (
          <div className="border-t border-border">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="border-y border-border py-20 text-center">
            <p className="eyebrow">The journal</p>
            <h2 className="mt-5 text-3xl">New perspectives are on the way.</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Stories and observations from across our holdings will appear here as they are
              published.
            </p>
          </div>
        )}

        {totalPages > 1 ? <Pagination currentPage={page} totalPages={totalPages} /> : null}
      </section>
    </>
  );
}

function InsightsHero() {
  return (
    <PageHero
      eyebrow="Perspectives"
      title="Perspective with a clear point of view."
      intro="Focused thinking from across our holdings—examining the ideas, behaviours and details shaping fashion, experiences and hospitality."
    />
  );
}

function PostRow({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: post.slug }}
      className="group grid gap-7 border-b border-border py-10 transition-colors duration-500 hover:bg-elevated md:grid-cols-[220px_150px_minmax(0,1fr)] md:items-center md:px-6 lg:gap-10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-elevated">
        {post.featuredImage ? (
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 220px, calc(100vw - 3rem)"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-elevated to-onyx">
            <ImageIcon aria-hidden className="size-7 text-gold/45" strokeWidth={1.25} />
            <span className="sr-only">No featured image</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-[0.65rem] tracking-[0.24em] uppercase text-gold">{post.category}</p>
        <time
          dateTime={post.publishedAt}
          className="mt-2 block text-xs tracking-[0.14em] uppercase text-muted-foreground"
        >
          {dateFormatter.format(new Date(post.publishedAt))}
        </time>
      </div>

      <div>
        <h2 className="text-2xl leading-snug transition-colors group-hover:text-gold">
          {post.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.68rem] tracking-[0.18em] uppercase text-gold md:hidden">
          Read perspective
          <ArrowRight aria-hidden className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <nav
      aria-label="Perspectives pagination"
      className="mt-12 flex items-center justify-between border-t border-border pt-8"
    >
      {currentPage > 1 ? (
        <Link
          to="/insights"
          search={currentPage - 1 === 1 ? {} : { page: currentPage - 1 }}
          rel="prev"
          className="group inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-gold transition-colors hover:text-gold-soft"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          Newer
        </Link>
      ) : (
        <span />
      )}

      <span className="text-xs tracking-[0.16em] uppercase text-muted-foreground">
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          to="/insights"
          search={{ page: currentPage + 1 }}
          rel="next"
          className="group inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-gold transition-colors hover:text-gold-soft"
        >
          Older
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function InsightsPending() {
  return (
    <>
      <InsightsHero />
      <section
        aria-label="Loading perspectives"
        aria-busy="true"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="border-t border-border">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="grid animate-pulse gap-7 border-b border-border py-10 md:grid-cols-[220px_150px_minmax(0,1fr)] md:items-center md:px-6 lg:gap-10"
            >
              <div className="aspect-[4/3] bg-elevated" />
              <div className="space-y-3">
                <div className="h-2 w-20 bg-muted" />
                <div className="h-2 w-24 bg-muted" />
              </div>
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-muted" />
                <div className="h-2 w-full bg-muted" />
                <div className="h-2 w-4/5 bg-muted" />
              </div>
            </div>
          ))}
        </div>
        <span className="sr-only">Loading perspectives…</span>
      </section>
    </>
  );
}

function InsightsError({ reset }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <>
      <InsightsHero />
      <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <p className="eyebrow">Temporarily unavailable</p>
        <h2 className="mt-5 text-3xl">We couldn’t load the latest perspectives.</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          The journal is taking longer than expected to respond. Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={() => {
            void router.invalidate();
            reset();
          }}
          className="mt-8 border border-gold/50 px-8 py-4 text-[0.75rem] tracking-[0.2em] uppercase text-gold transition-colors hover:border-gold hover:bg-gold/10"
        >
          Try again
        </button>
      </section>
    </>
  );
}
