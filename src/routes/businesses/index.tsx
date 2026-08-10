import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { businesses, sectors, groupPromise } from "@/data/group";

export const Route = createFileRoute("/businesses/")({
  head: () => ({
    meta: [
      { title: "Service Directory | Martins Investments" },
      {
        name: "description",
        content:
          "The service directory for Martins Investments, including landscaping, removals, cars and limo, music and video, fashion, web design, home cookery, Girl Friday, property and finance.",
      },
      { property: "og:title", content: "Service Directory | Martins Investments" },
      {
        property: "og:description",
        content: "Services available from Martins Investments.",
      },
    ],
  }),
  component: Businesses,
});

function Businesses() {
  return (
    <>
      <PageHero
        eyebrow="Service Directory"
        title="Practical services from Martins Investments"
        intro={groupPromise}
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
          Contact Martins Investments for more details about any service and we
          will get back to you as soon as we can.
        </p>
      </section>
    </>
  );
}
