import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { businesses, sectors } from "@/data/group";

export const Route = createFileRoute("/businesses/")({
  head: () => ({
    meta: [
      { title: "Our Businesses | Martins Investments" },
      {
        name: "description",
        content:
          "The companies, brands and ventures operating within the Martins Investments group, including RocDizWay, Roc*Away and Roc*Parties.",
      },
      { property: "og:title", content: "Our Businesses | Martins Investments" },
      {
        property: "og:description",
        content:
          "Companies, brands and ventures operating within the Martins Investments group.",
      },
    ],
  }),
  component: Businesses,
});

function Businesses() {
  return (
    <>
      <PageHero
        eyebrow="Our Businesses"
        title="Companies, brands and ventures in the group"
        intro="Each business operates independently under the Martins Investments umbrella. New ventures are added to this register as they join the group."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="border border-border">
          {businesses.map((b, i) => {
            const sector = sectors.find((s) => s.slug === b.sector);
            return (
              <Link
                key={b.slug}
                to="/businesses/$business"
                params={{ business: b.slug }}
                className={`group grid gap-6 p-10 transition-colors duration-500 hover:bg-elevated md:grid-cols-[1fr_1fr_auto] md:items-center ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div>
                  <h2 className="text-2xl transition-colors group-hover:text-gold">
                    {b.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {b.tagline}
                  </p>
                </div>
                <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  {sector?.name}
                </p>
                <p className="text-[0.65rem] tracking-[0.24em] uppercase text-gold">
                  {b.stage}
                </p>
              </Link>
            );
          })}
        </div>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The register is structured so additional companies and ventures can be
          added at any time, and so any subsidiary can move to its own dedicated
          website while remaining linked to the parent company.
        </p>
      </section>
    </>
  );
}
