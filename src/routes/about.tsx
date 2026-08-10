import { createFileRoute } from "@tanstack/react-router";
import aboutImage from "@/assets/about.jpg";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Martins Investments" },
      {
        name: "description",
        content:
          "Martins Investments is a privately held investment group that builds, acquires and operates businesses for the long term.",
      },
      { property: "og:title", content: "About | Martins Investments" },
      {
        property: "og:description",
        content:
          "A privately held investment group building and operating businesses for the long term.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About the Group"
        title="A privately held group with a long-term view"
        intro="Martins Investments was founded to build lasting value through ownership — creating, backing and operating businesses that can stand on their own while benefiting from the strength of a shared parent company."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <img
            src={aboutImage}
            alt="Dark boardroom with black marble table and gold lighting"
            loading="lazy"
            width={1600}
            height={1000}
            className="w-full border border-border object-cover"
          />
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="eyebrow">Who we are</p>
            <p>
              We are an investment group, not an operating brand. Our role is to
              allocate capital, set governance, build shared capability and give
              each business in the portfolio the space to perform.
            </p>
            <p>
              The group's interests span fashion and e-commerce, lifestyle,
              entertainment and events, property, mobility, media and a
              deliberate pipeline of future ventures.
            </p>
            <p>
              Every venture keeps its own identity. Over time, individual
              subsidiaries may operate their own dedicated websites and
              platforms — always clearly connected to Martins Investments as
              the parent company.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-3 lg:px-10">
          {[
            {
              t: "Mission",
              b: "To build and own a portfolio of well-run businesses that create durable value for customers, partners and the group.",
            },
            {
              t: "Vision",
              b: "An international group of respected brands, each strong enough to lead its own market and connected by a common standard of quality.",
            },
            {
              t: "Values",
              b: "Integrity in dealings, discipline in capital, ambition in strategy and respect for the people who operate our businesses.",
            },
          ].map((item) => (
            <div key={item.t}>
              <div className="rule-gold" />
              <h2 className="mt-8 text-2xl">{item.t}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">Group structure</p>
        <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
          Parent company, independent businesses
        </h2>
        <div className="mt-12 border border-border">
          {[
            {
              t: "Martins Investments",
              b: "Holding company. Capital allocation, governance, group strategy and shared services.",
            },
            {
              t: "Business areas",
              b: "Seven defined pillars that organise the portfolio and guide where new ventures are added.",
            },
            {
              t: "Operating companies",
              b: "Individual brands and ventures with their own leadership, customers and — in time — their own platforms.",
            },
          ].map((row, i) => (
            <div
              key={row.t}
              className={`grid gap-6 p-10 md:grid-cols-[240px_1fr] ${i > 0 ? "border-t border-border" : ""}`}
            >
              <h3 className="text-xl text-gold">{row.t}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {row.b}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <GoldLink to="/portfolio">See the portfolio</GoldLink>
        </div>
      </section>
    </>
  );
}
