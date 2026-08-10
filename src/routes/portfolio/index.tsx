import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { holdings } from "@/data/group";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Our Businesses | Martins Investments" },
      { name: "description", content: "Meet RocDizWay, Roc*Parties and Roc*Away." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Our Businesses"
        title="Different worlds. The same appetite for more."
        intro="A fashion archive for the present. Events designed around access and atmosphere. A new place to eat, drink and stay awhile."
      />
      <section className="section-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl space-y-10 px-6 lg:px-10">
          {holdings.map((holding, index) => (
            <article
              key={holding.slug}
              className="grid overflow-hidden border border-border bg-background lg:grid-cols-2"
            >
              <div
                className={`relative min-h-[360px] overflow-hidden bg-black ${index % 2 ? "lg:order-2" : ""}`}
              >
                <img
                  src={holding.image}
                  alt={`${holding.name} brand`}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <p className="absolute left-7 top-7 text-xs tracking-[.2em] uppercase text-white/70">
                  0{index + 1} · {holding.status}
                </p>
              </div>
              <div className="flex flex-col justify-center p-9 lg:p-16">
                <p className="eyebrow">{holding.category}</p>
                <h2 className="mt-6 text-4xl text-[#2a261f] dark:text-white md:text-5xl">
                  {holding.name}
                </h2>
                <p className="mt-4 font-display text-xl text-gold-deep dark:text-gold-soft">
                  {holding.positioning}
                </p>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-[#5b5448] dark:text-white/70">
                  {holding.description}
                </p>
                {holding.website ? (
                  <a
                    href={holding.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-9 inline-flex items-center gap-3 text-xs tracking-[.2em] uppercase text-gold-deep dark:text-gold-soft"
                  >
                    Visit the business <ArrowUpRight className="size-4" />
                  </a>
                ) : (
                  <p className="mt-9 text-xs tracking-[.2em] uppercase text-[#6b6459] dark:text-white/55">
                    Independent platform in development
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-onyx py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Beyond the three</p>
          <h2 className="mt-7 max-w-3xl text-4xl leading-tight md:text-6xl">
            The next idea may not look like the last.
          </h2>
          <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
            We keep the group deliberately open: ready for a concept with real character, a market
            worth understanding and people we trust to take it forward.
          </p>
        </div>
      </section>
    </>
  );
}
