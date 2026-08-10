import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import { GoldLink } from "@/components/gold-link";
import { sectors, businesses, pillars } from "@/data/group";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Martins Investments — A Modern Investment Group" },
      {
        name: "description",
        content:
          "Martins Investments is the parent company behind a growing portfolio of businesses across fashion, lifestyle, entertainment, property, mobility and media.",
      },
      { property: "og:title", content: "Martins Investments — A Modern Investment Group" },
      {
        property: "og:description",
        content:
          "The holding company behind a growing portfolio of businesses and ventures across seven business areas.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Black marble and brushed gold architectural interior"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pb-24 pt-40 lg:px-10">
          <p className="eyebrow">Investment Group · Established Portfolio</p>
          <h1 className="mt-8 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            Building and owning{" "}
            <span className="text-gold-gradient">enduring businesses</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Martins Investments is the parent company behind a growing portfolio
            of brands and ventures — operated independently, backed
            collectively, and built for the long term.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <GoldLink to="/portfolio">Explore the portfolio</GoldLink>
            <GoldLink to="/about" variant="outline">
              About the group
            </GoldLink>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 lg:grid-cols-4 lg:px-10">
          {[
            { value: "7", label: "Business areas" },
            { value: `${businesses.length}`, label: "Ventures in group" },
            { value: "100%", label: "Privately held" },
            { value: "Long-term", label: "Ownership horizon" },
          ].map((s) => (
            <div key={s.label} className="py-14 pr-6">
              <p className="font-display text-4xl text-gold">{s.value}</p>
              <p className="mt-3 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">The Group</p>
            <h2 className="mt-6 text-3xl leading-tight md:text-5xl">
              A parent company, not a single business
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Martins Investments exists to build, acquire and hold companies.
              Each venture in the group operates with its own identity,
              leadership and customers, while drawing on shared capability in
              commerce, brand, media and operations.
            </p>
            <p>
              That structure keeps the group agile. New businesses can be added
              to the portfolio without disruption, and successful ventures can
              grow into their own dedicated platforms while remaining clearly
              connected to the parent company.
            </p>
            <Link
              to="/about"
              className="inline-block border-b border-gold/60 pb-1 text-xs tracking-[0.2em] uppercase text-gold transition-colors hover:border-gold"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-onyx py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Business Areas</p>
              <h2 className="mt-6 text-3xl md:text-5xl">Where we operate</h2>
            </div>
            <Link
              to="/portfolio"
              className="text-xs tracking-[0.2em] uppercase text-gold transition-opacity hover:opacity-70"
            >
              View all
            </Link>
          </div>

          <div className="mt-16 grid gap-px border border-border md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Link
                key={s.slug}
                to="/portfolio/$sector"
                params={{ sector: s.slug }}
                className="group border-border p-10 transition-colors duration-500 hover:bg-elevated md:border-r md:border-b [&:nth-child(2n)]:md:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <span className="font-display text-sm text-gold/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-2xl transition-colors group-hover:text-gold">
                  {s.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <p className="eyebrow">Selected Businesses</p>
        <h2 className="mt-6 max-w-2xl text-3xl md:text-5xl">
          Independent brands within the group
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {businesses.slice(0, 3).map((b) => (
            <Link
              key={b.slug}
              to="/businesses/$business"
              params={{ business: b.slug }}
              className="surface-card block p-10"
            >
              <p className="text-[0.65rem] tracking-[0.24em] uppercase text-gold">
                {b.stage}
              </p>
              <h3 className="mt-6 text-2xl">{b.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {b.tagline}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-14">
          <GoldLink to="/businesses" variant="outline">
            All businesses
          </GoldLink>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Our Approach</p>
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title}>
                <div className="rule-gold" />
                <h3 className="mt-8 text-xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-32 text-center lg:px-10">
        <p className="eyebrow">Future Vision</p>
        <h2 className="mx-auto mt-8 max-w-3xl text-3xl leading-tight md:text-5xl">
          The portfolio is designed to keep growing
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
          New ventures, new markets and new partnerships. If you are exploring
          an opportunity with the group, we would like to hear from you.
        </p>
        <div className="mt-12 flex justify-center">
          <GoldLink to="/contact">Contact the group</GoldLink>
        </div>
      </section>
    </>
  );
}
