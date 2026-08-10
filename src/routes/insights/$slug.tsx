import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import { insights } from "@/data/group";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = insights.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found | Martins Investments" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Martins Investments` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: `${post.title} | Martins Investments` },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: InsightPage,
});

function InsightPage() {
  const { post } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow={`${post.category} · ${new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}`}
        title={post.title}
      />

      <article className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
        <p className="text-lg leading-relaxed text-foreground/90">
          {post.excerpt}
        </p>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
          {post.body.map((para: string) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <div className="mt-16">
          <GoldLink to="/insights" variant="outline">
            All news &amp; insights
          </GoldLink>
        </div>
      </article>
    </>
  );
}
