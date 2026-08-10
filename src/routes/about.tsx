import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import aboutImage from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | Martins Investments" },
      {
        name: "description",
        content: "Meet the people and thinking behind RocDizWay, Roc*Parties and Roc*Away.",
      },
    ],
  }),
  component: About,
});

function About() {
  const principles = [
    [
      "Instinct",
      "We pay attention to what people are wearing, where they are gathering and what makes an experience worth returning to.",
    ],
    [
      "Discipline",
      "A compelling concept still needs clear decisions, sound structure and the patience to be built properly.",
    ],
    [
      "Character",
      "We want every business to be recognisable before anyone sees the group name behind it.",
    ],
  ];
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="The thinking behind the names."
        intro="Martins Investments brings three very different ideas under one roof: a fashion destination, an events platform and a new hospitality concept."
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
            <p className="eyebrow">Why the group exists</p>
            <h2 className="mt-6 text-3xl leading-tight md:text-5xl">
              Good ideas deserve more than a moment.
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
              <p>
                Some ideas begin with a product. Others begin with a room, a mood or a gap nobody
                else has noticed. Our job is to recognise the ones with somewhere to go.
              </p>
              <p>
                Martins Investments gives those ideas a commercial home. We bring clarity where it
                helps, step back where independence matters and keep an eye on what each business
                could become.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-onyx py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Our principles</p>
          <div className="mt-14 grid gap-px border border-border md:grid-cols-3">
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
          <p className="eyebrow">Where we are going</p>
          <h2 className="mt-7 text-4xl leading-tight md:text-6xl">
            Selective by nature. Open by outlook.
          </h2>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted-foreground">
            We are not interested in collecting brands for the sake of scale. We are interested in
            the right ideas, pursued with care and given time to prove themselves.
          </p>
          <div className="mt-10 flex justify-center">
            <GoldLink to="/portfolio">Meet the businesses</GoldLink>
          </div>
        </div>
      </section>
    </>
  );
}
