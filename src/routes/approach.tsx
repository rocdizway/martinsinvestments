import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import { pillars } from "@/data/group";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Our Approach | Martins Investments" },
      {
        name: "description",
        content:
          "How Martins Investments selects, builds and governs the businesses in its portfolio — ownership, discipline, shared capability and independence.",
      },
      { property: "og:title", content: "Our Approach | Martins Investments" },
      {
        property: "og:description",
        content:
          "How we select, build and govern the businesses in our portfolio.",
      },
    ],
  }),
  component: Approach,
});

const stages = [
  {
    t: "Identify",
    b: "We look for markets with durable demand and a clear route to a defensible brand position.",
  },
  {
    t: "Assess",
    b: "Each opportunity is tested on unit economics, operating requirements and fit with an existing pillar.",
  },
  {
    t: "Build",
    b: "Ventures are given capital, leadership and access to group capability in commerce, media and operations.",
  },
  {
    t: "Govern",
    b: "Clear reporting and standards apply across the portfolio, without removing operational independence.",
  },
  {
    t: "Scale",
    b: "Proven businesses move onto their own platforms and expand into new markets under group ownership.",
  },
];

function Approach() {
  return (
    <>
      <PageHero
        eyebrow="Our Approach"
        title="Deliberate ownership, disciplined growth"
        intro="We are not a service provider and we are not a passive investor. We build businesses we intend to own, and we hold them to a consistent operating standard."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title}>
              <div className="rule-gold" />
              <h2 className="mt-8 text-xl">{p.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-6 text-3xl md:text-4xl">
            From opportunity to operating company
          </h2>
          <div className="mt-14 border-l border-border">
            {stages.map((s, i) => (
              <div key={s.t} className="relative grid gap-4 py-10 pl-10 md:grid-cols-[200px_1fr]">
                <span className="absolute left-0 top-12 h-px w-6 bg-gold/60" />
                <h3 className="text-xl text-gold">
                  <span className="mr-4 font-display text-sm text-gold/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Future-proof by design</p>
            <h2 className="mt-6 text-3xl md:text-4xl">
              Built to add the next venture
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              The group's public presentation is structured around business
              areas rather than individual products. Adding a company, brand or
              venture is a matter of extending the portfolio — not rebuilding
              the platform.
            </p>
            <p>
              Subsidiaries can graduate to their own dedicated websites and
              systems at the right moment, with a clear line back to Martins
              Investments as the parent company.
            </p>
            <GoldLink to="/contact" variant="outline">
              Talk to the group
            </GoldLink>
          </div>
        </div>
      </section>
    </>
  );
}
