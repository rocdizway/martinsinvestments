import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { insights } from "@/data/group";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "News & Insights | Martins Investments" },
      {
        name: "description",
        content:
          "Announcements, strategy notes and perspectives from the Martins Investments group.",
      },
      { property: "og:title", content: "News & Insights | Martins Investments" },
      {
        property: "og:description",
        content: "Announcements and perspectives from the Martins Investments group.",
      },
    ],
  }),
  component: Insights,
});

function Insights() {
  return (
    <>
      <PageHero
        eyebrow="News & Insights"
        title="Group announcements and perspectives"
        intro="Updates on the portfolio, notes on strategy and thinking from across our business areas."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="border-t border-border">
          {insights.map((post) => (
            <Link
              key={post.slug}
              to="/insights/$slug"
              params={{ slug: post.slug }}
              className="group grid gap-6 border-b border-border py-12 transition-colors duration-500 hover:bg-elevated md:grid-cols-[180px_1fr] md:px-6"
            >
              <div>
                <p className="text-[0.65rem] tracking-[0.24em] uppercase text-gold">
                  {post.category}
                </p>
                <time className="mt-2 block text-xs tracking-[0.14em] uppercase text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div>
                <h2 className="text-2xl transition-colors group-hover:text-gold">
                  {post.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
