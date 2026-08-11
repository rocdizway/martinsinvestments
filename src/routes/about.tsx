import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import aboutImage from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Group | Martins Investments" },
      {
        name: "description",
        content: "Discover the purpose, values and long-term vision behind Martins Investments.",
      },
    ],
  }),
  component: About,
});

function About() {
  const principles = [
    [
      "Purpose",
      "We back ideas that answer a real need, carry genuine potential and can create meaningful impact.",
    ],
    [
      "Integrity",
      "Trust, transparency and disciplined decisions are the foundation of value that lasts.",
    ],
    [
      "Freedom",
      "Each business has the space to develop its own identity, lead its market and grow with confidence.",
    ],
    [
      "Legacy",
      "We build for the long term—for people, communities and the generations that follow.",
    ],
  ];
  return (
    <>
      <PageHero
        eyebrow="The Group"
        title="One group. Three businesses. A shared purpose."
        intro="Martins Investments builds and supports distinctive businesses with the potential to create lasting commercial and cultural value."
      />
      <section className="section-ivory py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
          <div className="relative">
            <img
              src={aboutImage}
              alt="A refined boardroom representing the Martins Investments group"
              className="w-full border border-border object-cover"
            />
            <div className="absolute -bottom-5 -right-5 hidden border border-gold/30 bg-onyx px-8 py-6 md:block">
              <p className="eyebrow">Martins Investments</p>
              <p className="mt-2 font-display text-2xl">The name behind the names</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Why we exist</p>
            <h2 className="mt-6 text-3xl leading-tight md:text-5xl">
              Built to turn purposeful ideas into lasting value.
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
              <p>
                We believe the strongest businesses begin with a clear purpose. Our role is to
                recognise their potential, give them the right backing and help turn ambition into
                sustainable progress.
              </p>
              <p>
                Across fashion, experiences and hospitality, we provide structure without taking
                away individuality. Every holding remains distinct by design and united by the
                values that guide the wider group.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-onyx py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Our principles</p>
          <div className="mt-14 grid gap-px border border-border md:grid-cols-2 lg:grid-cols-4">
            {principles.map(([title, body], index) => (
              <div key={title} className="p-9 md:p-10">
                <p className="font-display text-gold/60">0{index + 1}</p>
                <h2 className="mt-10 text-2xl">{title}</h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-ivory py-28 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="eyebrow">The future is building</p>
          <h2 className="mt-7 text-4xl leading-tight md:text-6xl">
            The next chapter is already beginning.
          </h2>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted-foreground">
            We continue to look forward—exploring new ideas, entering new markets and building the
            next generation of Martins Investments businesses.
          </p>
          <div className="mt-10 flex justify-center">
            <GoldLink to="/portfolio">Meet the businesses</GoldLink>
          </div>
        </div>
      </section>
    </>
  );
}
