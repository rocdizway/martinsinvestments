import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import { getBusiness, getSector } from "@/data/group";

export const Route = createFileRoute("/businesses/$business")({
  loader: ({ params }) => {
    const business = getBusiness(params.business);
    if (!business) throw notFound();
    return { business };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Service not found | Martins Investments" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { business } = loaderData;
    return {
      meta: [
        { title: `${business.name} | Martins Investments` },
        { name: "description", content: business.tagline },
        {
          property: "og:title",
          content: `${business.name} | Martins Investments`,
        },
        { property: "og:description", content: business.tagline },
      ],
    };
  },
  component: BusinessPage,
});

function BusinessPage() {
  const { business } = Route.useLoaderData();
  const sector = getSector(business.sector);

  return (
    <>
      <PageHero
        eyebrow={`${sector?.name ?? "Service"} · ${business.stage}`}
        title={business.name}
        intro={business.tagline}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="eyebrow">Overview</p>
            <p>{business.description}</p>
            <p>
              Contact Martins Investments for more details about this service
              and tell us what you need help with today.
            </p>
          </div>

          <aside className="surface-card p-10">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-8 space-y-6 text-sm">
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Service area
                </dt>
                <dd className="mt-2 text-gold">{sector?.name}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-2">{business.stage}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Provider
                </dt>
                <dd className="mt-2">Martins Investments</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="mt-20">
          <p className="eyebrow">Highlights</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {business.highlights.map((h: string) => (
              <div key={h}>
                <div className="rule-gold" />
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {h}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <GoldLink to="/businesses" variant="outline">
            All services
          </GoldLink>
          <GoldLink to="/contact">Enquire about this service</GoldLink>
        </div>
      </section>
    </>
  );
}
