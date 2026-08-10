import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { sectors, businesses, groupPromise } from "@/data/group";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Our Services | Martins Investments" },
      {
        name: "description",
        content:
          "Service areas at Martins Investments, including home and property, transport, creative and digital, lifestyle and finance.",
      },
      { property: "og:title", content: "Our Services | Martins Investments" },
      {
        property: "og:description",
        content: "The service areas available from Martins Investments.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Service areas for business, home and leisure"
        intro={groupPromise}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-8 md:grid-cols-2">
          {sectors.map((s, i) => {
            const count = businesses.filter((b) => b.sector === s.slug).length;
            return (
              <Link
                key={s.slug}
                to="/portfolio/$sector"
                params={{ sector: s.slug }}
                className="surface-card flex flex-col justify-between p-10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm text-gold/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.65rem] tracking-[0.22em] uppercase text-gold">
                      {s.status}
                    </span>
                  </div>
                  <h2 className="mt-8 text-2xl">{s.name}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>
                </div>
                <p className="mt-10 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  {count} {count === 1 ? "service" : "services"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
