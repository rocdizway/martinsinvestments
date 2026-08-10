import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import { getSector, businesses } from "@/data/group";

export const Route = createFileRoute("/portfolio/$sector")({
  loader: ({ params }) => {
    const sector = getSector(params.sector);
    if (!sector) throw notFound();
    return { sector };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Service area not found | Martins Investments" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { sector } = loaderData;
    return {
      meta: [
        { title: `${sector.name} | Martins Investments` },
        { name: "description", content: sector.summary },
        { property: "og:title", content: `${sector.name} | Martins Investments` },
        { property: "og:description", content: sector.summary },
      ],
    };
  },
  component: SectorPage,
});

function SectorPage() {
  const { sector } = Route.useLoaderData();
  const list = businesses.filter((b) => b.sector === sector.slug);

  return (
    <>
      <PageHero
        eyebrow={`Service Area · ${sector.status}`}
        title={sector.name}
        intro={sector.detail}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">Services in this area</p>
        {list.length ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {list.map((b) => (
              <Link
                key={b.slug}
                to="/businesses/$business"
                params={{ business: b.slug }}
                className="surface-card block p-10"
              >
                <p className="text-[0.65rem] tracking-[0.24em] uppercase text-gold">
                  {b.stage}
                </p>
                <h2 className="mt-6 text-2xl">{b.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {b.tagline}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Contact Martins Investments to discuss support in this service area.
          </p>
        )}

        <div className="mt-16 flex flex-wrap gap-4">
          <GoldLink to="/portfolio" variant="outline">
            All service areas
          </GoldLink>
          <GoldLink to="/contact">Discuss this service</GoldLink>
        </div>
      </section>
    </>
  );
}
