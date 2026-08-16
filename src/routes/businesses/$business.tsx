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

  if (holding.slug === "rocdizway") {
    return <RocDizWayProfile holding={holding} />;
  }

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
          <h1 className="max-w-4xl text-5xl uppercase leading-none md:text-7xl lg:text-8xl">
            {holding.name}
          </h1>
          <p className="eyebrow mt-6 whitespace-nowrap">{holding.category}</p>
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
                  Brand signature
                </p>
                <h3 className="mt-3 text-2xl text-foreground">{holding.featuredPartner.name}</h3>
                <p className="mt-1 whitespace-nowrap text-xs tracking-[.16em] uppercase text-gold-deep">
                  {holding.category}
                </p>
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

type LoadedHolding = NonNullable<ReturnType<typeof getHolding>>;

const rocdizwayCollections = [
  { title: "Men’s fashion", position: "94% center" },
  { title: "Women’s fashion", position: "16% center" },
  { title: "Footwear", position: "50% center" },
  { title: "Accessories", position: "67% center" },
  { title: "Selected pieces", position: "32% center" },
] as const;

const rocdizwayPromises = [
  {
    title: "Authentic designer fashion",
    description: "Genuine pieces from recognisable brands.",
  },
  {
    title: "For men, women & younger shoppers",
    description: "Curated collections for different styles and occasions.",
  },
  {
    title: "Shop with confidence",
    description: "Money-back guarantee and secure checkout.",
  },
] as const;

function RocDizWayProfile({ holding }: { holding: LoadedHolding }) {
  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden bg-black text-white">
        <img
          src={holding.showcaseImage}
          alt="Designer clothing, footwear and accessories curated by RocDizWay"
          className="absolute inset-0 size-full object-cover object-[68%_center] opacity-65 md:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,3,.96)_0%,rgba(4,4,3,.7)_46%,rgba(4,4,3,.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-36 sm:pb-20 lg:px-10 lg:pb-24">
          <Link
            to="/portfolio"
            className="mb-auto inline-flex w-fit items-center gap-3 pt-2 text-[.62rem] tracking-[.2em] uppercase text-white/65 transition-colors hover:text-gold-soft"
          >
            <ArrowLeft className="size-3.5" /> Our core holdings
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-5xl leading-none sm:text-7xl lg:text-[6.5rem]">RocDizWay</h1>
            <p className="mt-5 whitespace-nowrap text-xs tracking-[.24em] uppercase text-gold-soft sm:text-sm">
              Curated Sovereign👑
            </p>
            <p className="mt-7 max-w-xl font-display text-xl leading-relaxed text-white/82 sm:text-2xl">
              Authentic designer fashion, selected for individuality.
            </p>
            <a
              href={holding.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-4 border border-gold/70 bg-gold/10 px-6 py-4 text-[.68rem] tracking-[.2em] uppercase text-gold-soft transition hover:bg-gold hover:text-black"
            >
              Discover the collection <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-ivory py-20 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-24 lg:px-10">
          <div>
            <p className="eyebrow">Online fashion destination</p>
            <h2 className="mt-5 text-4xl leading-[1.06] text-foreground sm:text-5xl">
              Authentic. Distinctive.
              <br />
              <span className="text-gold-gradient">Curated.</span>
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              RocDizWay brings together authentic designer clothing, footwear and accessories for
              men, women and younger shoppers — selected for those who value individuality, quality
              and style.
            </p>
            <a
              href={holding.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 border-b border-gold pb-2 text-[.68rem] tracking-[.2em] uppercase text-gold-deep"
            >
              Explore RocDizWay <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="eyebrow">Shop the edit</p>
            <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
              Find your next signature piece.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {rocdizwayCollections.map((collection) => (
              <a
                key={collection.title}
                href={holding.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/5] overflow-hidden bg-black"
              >
                <img
                  src={holding.showcaseImage}
                  alt={`${collection.title} at RocDizWay`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  style={{ objectPosition: collection.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-7">
                  <h3 className="font-display text-2xl">{collection.title}</h3>
                  <ArrowUpRight className="mb-1 size-4 shrink-0 text-gold-soft transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-onyx py-20 text-white sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">At a glance</p>
          <div className="mt-9 grid divide-y divide-white/12 border-y border-white/12 md:grid-cols-3 md:divide-x md:divide-y-0">
            {rocdizwayPromises.map((promise) => (
              <div key={promise.title} className="py-8 md:px-8 lg:px-10 first:pl-0 last:pr-0">
                <span className="flex size-8 items-center justify-center rounded-full border border-gold/45 text-gold">
                  <Check className="size-4" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-sm tracking-[.14em] uppercase text-white">
                  {promise.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{promise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-28 text-white sm:py-32 lg:py-40">
        <img
          src={holding.showcaseImage}
          alt="RocDizWay premium fashion selection"
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-[24%_center] opacity-25"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="flex flex-col items-center gap-2 text-xs tracking-[.24em] uppercase text-gold-soft sm:flex-row sm:justify-center">
            <span>RocDizWay</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="whitespace-nowrap">Curated Sovereign👑</span>
          </p>
          <h2 className="mt-7 text-4xl leading-tight sm:text-6xl">
            Style is personal.
            <br />
            We make it easy to find yours.
          </h2>
          <a
            href={holding.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-4 border-b border-gold pb-3 text-xs tracking-[.2em] uppercase text-gold-soft"
          >
            Visit RocDizWay <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>
    </>
  );
}
