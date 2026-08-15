import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getHolding } from "@/data/group";

export const Route = createFileRoute("/businesses/$business")({
  loader: ({ params }) => {
    const holding = getHolding(params.business);
    if (!holding) throw notFound();
    return holding;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} | Martins Investments` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} | Martins Investments` },
          { property: "og:description", content: loaderData.description },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  component: BusinessProfile,
});

function BusinessProfile() {
  const holding = Route.useLoaderData();

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-black text-white">
        <img
          src={holding.image}
          alt={holding.imageAlt}
          className="absolute inset-0 size-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,.94)_0%,rgba(5,5,4,.66)_52%,rgba(5,5,4,.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-24">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex w-fit items-center gap-3 text-[.65rem] tracking-[.2em] uppercase text-white/70 transition-colors hover:text-gold-soft"
          >
            <ArrowLeft className="size-3.5" /> Our core holdings
          </Link>
          <p className="eyebrow">{holding.category}</p>
          <h1 className="mt-6 max-w-4xl text-5xl uppercase leading-none md:text-7xl lg:text-8xl">
            {holding.name}
          </h1>
          <p className="mt-7 max-w-2xl font-display text-xl leading-relaxed text-white/80 md:text-2xl">
            {holding.positioning}
          </p>
        </div>
      </section>

      <section className="section-ivory py-24 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-10">
          <div>
            <p className="eyebrow">The brand</p>
            <h2 className="mt-6 text-4xl leading-tight text-foreground md:text-5xl">
              Distinct by design.
              <br />
              <span className="text-gold-gradient">Built with purpose.</span>
            </h2>
          </div>
          <div className="space-y-7">
            {holding.overview.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-muted-foreground md:text-lg">
                {paragraph}
              </p>
            ))}
            {holding.featuredPartner ? (
              <aside className="mt-10 border-l-2 border-gold bg-background p-7 shadow-[var(--shadow-luxe)] sm:p-9">
                <p className="text-[.62rem] tracking-[.22em] uppercase text-gold-deep">
                  Showcasing products from
                </p>
                <h3 className="mt-3 text-2xl text-foreground">{holding.featuredPartner.name}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {holding.featuredPartner.description}
                </p>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">The experience</p>
              <h2 className="mt-6 text-4xl leading-tight text-foreground md:text-5xl">
                What {holding.name} brings to life.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              A visual introduction to the products, places and moments at the heart of the brand.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {holding.showcase.map((item, index) => (
              <figure key={item.title} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={holding.showcaseImage}
                    alt={`${holding.name} — ${item.title}`}
                    loading="lazy"
                    className="size-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    style={{ objectPosition: `${index * 50}% center` }}
                  />
                </div>
                <figcaption className="border-x border-b border-border px-6 py-5">
                  <p className="text-[.6rem] tracking-[.2em] uppercase text-gold-deep">
                    Featured offering
                  </p>
                  <h3 className="mt-2 text-xl text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          <a
            href={holding.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 border-b border-gold pb-2 text-[.65rem] tracking-[.18em] uppercase text-gold-deep"
          >
            Visit the brand <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">At a glance</p>
          <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
            {holding.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-4 bg-background p-8 lg:p-10">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Check className="size-4" strokeWidth={1.5} />
                </span>
                <p className="font-display text-xl leading-snug text-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ivory py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="eyebrow">Explore {holding.name}</p>
          <h2 className="mt-7 text-4xl leading-tight md:text-6xl">Ready to discover more?</h2>
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-muted-foreground">
            Visit the official {holding.name} website for its latest offering, experiences and ways
            to connect with the brand.
          </p>
          <a
            href={holding.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-4 border-b border-gold pb-3 text-xs tracking-[.2em] uppercase text-gold-deep"
          >
            Visit the business <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>
    </>
  );
}
