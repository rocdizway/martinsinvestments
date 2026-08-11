import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { GoldLink } from "@/components/gold-link";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder | Bobby Martins | Martins Investments" },
      {
        name: "description",
        content:
          "Meet Bobby Martins, founder of Martins Investments, and discover the vision and principles behind the group.",
      },
    ],
  }),
  component: Founder,
});

const convictions = [
  [
    "01",
    "See possibility",
    "Look beyond the obvious to find ideas with the power to become enduring businesses.",
  ],
  [
    "02",
    "Build with intent",
    "Give every venture the clarity, discipline and patient support it needs to flourish.",
  ],
  [
    "03",
    "Leave value behind",
    "Measure progress by what strengthens people, communities and the next generation.",
  ],
];

function Founder() {
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden bg-onyx pt-20">
        <div className="absolute inset-0 lg:left-[48%]">
          <img
            src="/founder/bobby-martins.png"
            alt="Editorial portrait representing Bobby Martins"
            className="h-full w-full object-cover object-top opacity-65 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/80 to-onyx/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent lg:hidden" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(92vh-5rem)] max-w-7xl items-end px-6 pb-16 pt-28 lg:items-center lg:px-10 lg:pb-0 lg:pt-0">
          <div className="max-w-2xl">
            <p className="eyebrow">Founder &amp; Group Chairman</p>
            <h1 className="mt-7 text-5xl leading-[0.98] sm:text-6xl lg:text-8xl">
              Bobby <span className="text-gold-gradient">Martins.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
              Building purposeful businesses with the courage to begin, the discipline to endure,
              and the ambition to leave something meaningful behind.
            </p>
            <a
              href="#story"
              className="mt-12 inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-gold transition-colors hover:text-gold-soft"
            >
              Discover his story <ArrowDown className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="story" className="section-ivory py-24 lg:py-32">
        <ScrollReveal className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-10">
          <div>
            <p className="eyebrow">The founder's perspective</p>
            <p className="mt-8 font-display text-2xl leading-relaxed text-gold-deep md:text-3xl">
              “The businesses that matter most are built with a clear reason to exist.”
            </p>
          </div>
          <div>
            <h2 className="text-4xl leading-tight md:text-6xl">
              A conviction turned into a group.
            </h2>
            <div className="mt-9 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Bobby Martins founded Martins Investments around a simple belief: promising ideas go
                further when vision is matched by structure, patience and the freedom to grow.
              </p>
              <p>
                His approach brings commercial discipline and human perspective together. Rather
                than making every business look the same, he champions distinctive identities—then
                gives each team the foundations, confidence and long-term backing to build well.
              </p>
              <p>
                Today, that philosophy connects a growing portfolio across fashion, experiences and
                hospitality, united by an appetite for progress and a responsibility to create value
                that lasts.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="border-y border-border bg-onyx py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="relative overflow-hidden border border-border">
              <img
                src="/founder/vision-boardroom.png"
                alt="A boardroom at dawn representing long-term vision"
                className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-7 pt-20">
                <p className="text-xs tracking-[0.2em] uppercase text-gold">
                  Lagos · Looking forward
                </p>
              </div>
            </div>
            <div>
              <p className="eyebrow">A long-term view</p>
              <h2 className="mt-6 text-4xl leading-tight md:text-6xl">
                Ambition, anchored by purpose.
              </h2>
              <p className="mt-8 max-w-xl leading-8 text-muted-foreground">
                For Bobby, growth is not simply about scale. It is about making considered choices,
                investing in exceptional people and creating businesses equipped to remain relevant
                through changing times.
              </p>
              <div className="mt-10 h-px w-24 bg-gold" />
              <p className="mt-8 max-w-lg font-display text-2xl leading-relaxed text-white/85">
                “Our horizon is measured in generations, not quarters.”
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <p className="eyebrow">Guiding convictions</p>
            <h2 className="mt-6 max-w-2xl text-4xl leading-tight md:text-6xl">
              The principles behind the progress.
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid border-y border-border lg:grid-cols-3">
            {convictions.map(([number, title, body], index) => (
              <ScrollReveal
                key={title}
                delay={index * 120}
                className="border-b border-border py-10 last:border-b-0 lg:border-b-0 lg:border-r lg:px-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <p className="font-display text-lg text-gold">{number}</p>
                <h3 className="mt-10 text-3xl">{title}</h3>
                <p className="mt-5 leading-7 text-muted-foreground">{body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-onyx py-24 text-center lg:py-28">
        <ScrollReveal className="mx-auto max-w-3xl px-6">
          <p className="eyebrow">The wider story</p>
          <h2 className="mt-7 text-4xl leading-tight md:text-6xl">
            Meet the group his vision is shaping.
          </h2>
          <p className="mx-auto mt-7 max-w-xl leading-relaxed text-muted-foreground">
            Distinctive businesses, each with its own character and one shared commitment to lasting
            value.
          </p>
          <div className="mt-10 flex justify-center">
            <GoldLink to="/portfolio">Explore our portfolio</GoldLink>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
