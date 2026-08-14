import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { holdings } from "@/data/group";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Our Core Holdings | Martins Investments" },
      {
        name: "description",
        content: "Three distinct businesses united by shared values and long-term purpose.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Our Core Holdings"
        title="Three businesses. One purpose."
        intro="Distinct by design. United by values. Built for long-term impact."
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
                  alt={holding.imageAlt}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <p className="absolute left-7 top-7 text-xs tracking-[.2em] uppercase text-white/70">
                  0{index + 1} · {holding.status}
                </p>
              </div>
              <div className="flex flex-col justify-center p-9 lg:p-16">
                <p className="eyebrow">{holding.category}</p>
                <h2 className="mt-6 text-4xl text-foreground md:text-5xl">{holding.name}</h2>
                <p className="mt-4 font-display text-xl text-gold-deep">{holding.positioning}</p>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {holding.description}
                </p>
                <a
                  href={holding.website ?? "/contact"}
                  target={holding.website ? "_blank" : undefined}
                  rel={holding.website ? "noreferrer" : undefined}
                  className="mt-9 inline-flex items-center gap-3 text-xs tracking-[.2em] uppercase text-gold-deep"
                >
                  Visit the business <ArrowUpRight className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-onyx py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">The future is building</p>
          <h2 className="mt-7 max-w-3xl text-4xl leading-tight md:text-6xl">
            The next chapter is already beginning.
          </h2>
          <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
            We continue to explore new ideas, enter new markets and build the next generation of
            Martins Investments businesses—always with purpose, discipline and long-term impact in
            view.
          </p>
        </div>
      </section>
    </>
  );
}
