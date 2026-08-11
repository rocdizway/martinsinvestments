import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Our Vision | Martins Investments" },
      {
        name: "description",
        content: "How Martins Investments turns purposeful ideas into enduring businesses.",
      },
    ],
  }),
  component: Approach,
});

const principles = [
  {
    number: "01",
    title: "Back ideas that matter",
    body: "We look for a clear purpose, credible potential and an opportunity to create meaningful real-world impact.",
  },
  {
    number: "02",
    title: "Build with integrity",
    body: "We bring trust, transparency and discipline to every decision because lasting value depends on strong foundations.",
  },
  {
    number: "03",
    title: "Create room to lead",
    body: "We give every business the independence, practical support and confidence to grow without losing its distinct identity.",
  },
  {
    number: "04",
    title: "Build for legacy",
    body: "We take the long view, making choices designed to benefit people, communities and generations—not only the next quarter.",
  },
];

function Approach() {
  return (
    <>
      <PageHero
        eyebrow="Our Vision"
        title="Ideas. Values. Impact."
        intro="We combine purposeful investment with disciplined support, giving distinctive businesses the freedom to grow and the foundations to endure."
      />
      <section className="section-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {principles.map((item) => (
              <article key={item.number} className="bg-background p-9 lg:p-14">
                <p className="font-display text-gold-deep dark:text-gold-soft">{item.number}</p>
                <h2 className="mt-12 text-3xl text-[#2a261f] dark:text-white">{item.title}</h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-[#5b5448] dark:text-white/70">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-onyx py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
          <p className="eyebrow">Our investment focus</p>
          <div>
            <h2 className="text-3xl leading-tight md:text-5xl">
              Purpose first. Potential always.
            </h2>
            <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
              We are drawn to ideas with a clear audience, a meaningful reason to exist and the
              potential to lead. Whether supporting a growing business or shaping an emerging
              concept, we look for ambition grounded in substance and people we can trust.
            </p>
            <div className="mt-10">
              <GoldLink to="/contact" variant="outline">
                Share an idea
              </GoldLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
