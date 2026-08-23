"use client";

import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Play } from "lucide-react";
import { getHolding } from "@/data/group";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

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

  if (holding.slug === "roc-parties") {
    return <RocPartiesProfile holding={holding} />;
  }

  if (holding.slug === "roc-away") {
    return <RocAwayProfile holding={holding} />;
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

const rocNightsFeatures = [
  {
    title: "VIP ACCESS",
    description: "Access to selected nightlife experiences and sought-after venues.",
  },
  {
    title: "SEAMLESS ARRIVAL",
    description: "A considered arrival experience from the moment you step through the door.",
  },
  {
    title: "PREMIUM ATMOSPHERE",
    description: "Exceptional settings, elevated surroundings and unforgettable nights.",
  },
] as const;

const rocOccasionsFeatures = [
  {
    title: "CURATED DINING",
    description: "Distinctive dining experiences selected around your occasion and preferences.",
  },
  {
    title: "PRIVATE CELEBRATIONS",
    description: "Elegant settings and considered details for moments worth celebrating.",
  },
  {
    title: "SPECIAL EVENTS",
    description: "Premium experiences surrounding major cultural, sporting and social occasions.",
  },
  {
    title: "BESPOKE OCCASIONS",
    description: "Personalised arrangements designed around your guests, schedule and vision.",
  },
] as const;

const rocConciergeServices = [
  {
    title: "HOTELS & PREMIUM STAYS",
    description: "Carefully selected accommodation suited to your plans, preferences and occasion.",
  },
  {
    title: "PRIVATE AIRPORT COLLECTION",
    description: "Seamless airport transfers and collection arrangements for a refined arrival.",
  },
  {
    title: "THEATRE & ENTERTAINMENT",
    description: "Access to selected performances, shows and entertainment experiences.",
  },
  {
    title: "PREMIUM TRAVEL",
    description: "Travel arrangements thoughtfully coordinated around your itinerary.",
  },
  {
    title: "PERSONAL SHOPPING",
    description: "Personalised shopping assistance for occasions, travel and lifestyle needs.",
  },
  {
    title: "TAILORED CONCIERGE SUPPORT",
    description:
      "From the essential details to the finishing touches, assistance can be shaped around your individual requirements.",
  },
] as const;

const rocPartiesHighlights = [
  {
    title: "VIP NIGHTLIFE & EVENT ACCESS",
    description:
      "Access to sought-after nightlife, exclusive events and premium experiences across London.",
  },
  {
    title: "LONDON LIFESTYLE CONCIERGE",
    description:
      "Personalised support for the places, services and experiences that elevate London living.",
  },
  {
    title: "TRAVEL, DINING & OCCASION PLANNING",
    description:
      "From premium stays and dining to private celebrations and special occasions, every detail can be thoughtfully coordinated.",
  },
] as const;

function RocPartiesProfile({ holding }: { holding: LoadedHolding }) {
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

      <section className="section-ivory py-20 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-10">
          <div>
            <p className="eyebrow">THE BRAND</p>
            <h2 className="mt-6 text-4xl leading-tight text-foreground sm:text-5xl">
              Distinct by design.
              <br />
              <span className="text-gold-gradient">Built with purpose.</span>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              Roc*Parties is a premium lifestyle and experiences brand created for those who value
              exceptional moments, seamless service and considered detail.
            </p>
            <p>
              From London’s nightlife and fine dining to major sporting events, cultural occasions
              and private celebrations, we connect clients with experiences worth remembering.
            </p>
            <p>
              Our concierge service extends beyond the occasion itself, helping coordinate the wider
              experience — from premium hotels and airport collection to theatre seats, personal
              shopping and tailored travel arrangements.
            </p>
            <p>One vision. One trusted service. Every detail considered.</p>
            <p className="border-l-2 border-gold pl-6 font-display text-xl leading-relaxed text-foreground sm:text-2xl">
              Spend less time organising and more time enjoying the experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="eyebrow">THE EXPERIENCE</p>
              <h2 className="mt-6 text-4xl leading-tight text-foreground sm:text-5xl">
                What Roc*Parties brings to life.
              </h2>
            </div>
            <p className="self-end text-base leading-8 text-muted-foreground sm:text-lg">
              A curated world of premium nightlife, events, dining and lifestyle experiences —
              designed around access, atmosphere and exceptional service.
            </p>
          </div>

          <div className="mt-12 grid overflow-hidden border border-border bg-onyx lg:grid-cols-[.92fr_1.08fr]">
            <figure className="relative min-h-[24rem] overflow-hidden bg-black sm:min-h-[32rem]">
              <img
                src={holding.showcaseImage}
                alt="VIP nightlife and seamless arrival with Roc Nights"
                loading="lazy"
                className="absolute inset-0 size-full object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </figure>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 xl:p-16">
              <p className="text-[.62rem] tracking-[.22em] uppercase text-gold-deep dark:text-gold-soft">
                ROC NIGHTS
              </p>
              <h3 className="mt-5 text-3xl leading-tight text-foreground sm:text-4xl">
                VIP nightlife, elevated.
              </h3>
              <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <p>
                  Experience sought-after London nightlife with VIP access, premium venues and a
                  seamless arrival-to-departure experience.
                </p>
                <p>
                  From entry and guestlist arrangements to the atmosphere inside, every detail is
                  considered so you can focus on enjoying the night.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {rocNightsFeatures.map((feature) => (
              <article key={feature.title} className="py-8 md:px-8 lg:px-10 first:pl-0 last:pr-0">
                <span className="flex size-8 items-center justify-center rounded-full border border-gold/45 text-gold">
                  <Check className="size-4" strokeWidth={1.5} />
                </span>
                <h4 className="mt-6 text-sm tracking-[.14em] uppercase text-foreground">
                  {feature.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[.62rem] tracking-[.22em] uppercase text-gold-deep dark:text-gold-soft">
              THE ROC NIGHTS STANDARD
            </p>
            <p className="mt-5 font-display text-3xl text-foreground sm:text-4xl">
              Arrive. Experience. Remember.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20">
            <div>
              <p className="eyebrow">FEATURED OFFERING</p>
              <h2 className="mt-5 text-4xl text-foreground sm:text-5xl">Roc Occasions</h2>
              <p className="mt-5 font-display text-2xl leading-relaxed text-gold-deep dark:text-gold-soft sm:text-3xl">
                Private dining. Celebrations. Exceptional moments.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Thoughtfully curated experiences for birthdays, anniversaries, milestone
                celebrations, private dinners and special occasions — shaped around the people,
                place and purpose of every event.
              </p>
            </div>
            <figure className="relative min-h-[23rem] overflow-hidden border border-gold/25 bg-black shadow-[var(--shadow-luxe)] sm:min-h-[30rem]">
              <img
                src={holding.showcaseImage}
                alt="A private dining occasion curated by Roc*Parties"
                loading="lazy"
                className="absolute inset-0 size-full object-cover object-center"
              />
            </figure>
          </div>

          <p className="mt-14 text-[.62rem] tracking-[.22em] uppercase text-gold-deep dark:text-gold-soft">
            THE ROC OCCASIONS EXPERIENCE
          </p>
          <div className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {rocOccasionsFeatures.map((feature) => (
              <article key={feature.title} className="bg-background p-7 sm:p-8">
                <span className="block h-px w-9 bg-gold" />
                <h3 className="mt-5 text-sm tracking-[.14em] uppercase text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-8 border-t border-border pt-10 md:grid-cols-[.72fr_1.28fr] md:gap-16">
            <p className="text-[.62rem] tracking-[.22em] uppercase text-gold-deep dark:text-gold-soft">
              MORE THAN AN OCCASION
            </p>
            <div>
              <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                Every detail matters — from the setting and dining experience to the atmosphere and
                service.
              </p>
              <p className="mt-7 font-display text-2xl leading-relaxed text-foreground sm:text-3xl">
                You bring the occasion.
                <br />
                <span className="text-gold-gradient">Roc*Parties brings it to life.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-20">
            <figure className="relative min-h-[23rem] overflow-hidden border border-border bg-black shadow-[var(--shadow-luxe)] sm:min-h-[30rem]">
              <img
                src={holding.showcaseImage}
                alt="Personal concierge service for a seamless Roc*Parties experience"
                loading="lazy"
                className="absolute inset-0 size-full object-cover object-right"
              />
            </figure>
            <div>
              <p className="eyebrow">ROC CONCIERGE</p>
              <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
                Effortless by design.
                <br />
                <span className="text-gold-gradient">Exceptional by detail.</span>
              </h2>
              <p className="mt-7 text-base leading-8 text-muted-foreground sm:text-lg">
                Roc Concierge provides personalised support for the details surrounding your stay,
                journey or occasion — bringing together premium accommodation, travel, entertainment
                and lifestyle arrangements through one considered service.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {rocConciergeServices.map((service) => (
              <article key={service.title} className="bg-onyx p-7 sm:p-8 lg:p-9">
                <span className="flex size-8 items-center justify-center rounded-full border border-gold/45 text-gold">
                  <Check className="size-4" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-sm tracking-[.14em] uppercase text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 border-y border-border py-10 text-center sm:py-12">
            <p className="text-[.62rem] tracking-[.22em] uppercase text-gold-deep dark:text-gold-soft">
              THE ROC CONCIERGE STANDARD
            </p>
            <p className="mt-5 text-sm tracking-[.2em] uppercase text-foreground sm:text-base">
              DISCREET. PERSONAL. SEAMLESS.
            </p>
            <p className="mt-7 font-display text-2xl leading-relaxed text-foreground sm:text-3xl">
              You enjoy the experience.
              <br />
              <span className="text-gold-gradient">We take care of the details.</span>
            </p>
            <a
              href={holding.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-3 border-b border-gold pb-2 text-[.68rem] tracking-[.18em] uppercase text-gold-deep dark:text-gold-soft"
            >
              VISIT ROC*CONCIERGE →
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">AT A GLANCE</p>
          <div className="mt-9 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {rocPartiesHighlights.map((highlight) => (
              <article key={highlight.title} className="py-8 md:px-8 lg:px-10 first:pl-0 last:pr-0">
                <span className="flex size-8 items-center justify-center rounded-full border border-gold/45 text-gold">
                  <Check className="size-4" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-sm tracking-[.14em] uppercase text-foreground">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-[.62rem] tracking-[.22em] uppercase text-gold-deep dark:text-gold-soft">
              THE ROC*PARTIES EXPERIENCE
            </p>
            <h2 className="mt-6 text-3xl uppercase leading-tight text-foreground sm:text-5xl">
              ACCESS. CONCIERGE. EXPERIENCES.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              One destination for exceptional moments, personalised service and seamless planning —
              designed so you can enjoy more and organise less.
            </p>
          </div>
        </div>
      </section>

      <section className="section-ivory py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="eyebrow">EXPLORE ROC*PARTIES</p>
          <h2 className="mt-7 text-4xl leading-tight text-foreground sm:text-6xl">
            Ready to discover more?
          </h2>
          <div className="mx-auto mt-7 max-w-3xl space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              Step into the world of Roc*Parties — a curated destination for premium nightlife,
              private occasions, dining, travel and lifestyle experiences across London.
            </p>
            <p>
              Discover our latest offerings, explore exceptional experiences and find out how
              Roc*Parties can help make your next occasion effortless.
            </p>
          </div>
          <a
            href={holding.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-4 border-b border-gold pb-3 text-xs tracking-[.2em] uppercase text-gold-deep"
          >
            VISIT ROC*PARTIES →
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-28 text-white sm:py-36">
        <img
          src={holding.image}
          alt="The Roc*Parties experience"
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
          <h2 className="text-4xl uppercase leading-tight sm:text-6xl">
            YOUR EXPERIENCE.
            <br />
            <span className="text-gold-gradient">CONSIDERED FROM BEGINNING TO END.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
            Whether you’re planning a night out, celebrating a milestone, arranging a private
            occasion or looking for something exceptional, Roc*Parties brings together access,
            service and attention to detail.
          </p>
          <p className="mt-8 font-display text-2xl text-gold-soft sm:text-3xl">
            Discover more. Experience better.
          </p>
        </div>
      </section>
    </>
  );
}

const rocdizwayCollections = [
  {
    title: "Men's fashion",
    video: "/videos/rocdizway/men-fashion.mp4",
    poster: "/images/rocdizway/men-fashion.jpg",
  },
  {
    title: "Women's fashion",
    video: "/videos/rocdizway/women-fashion.mp4",
    poster: "/images/rocdizway/women-fashion.jpg",
  },
  {
    title: "Footwear",
    video: "/videos/rocdizway/footwear.mp4",
    poster: "/images/rocdizway/footwears.jpg",
  },
  {
    title: "Accessories",
    video: "/videos/rocdizway/accessories.mp4",
    poster: "/images/rocdizway/accessories.jpg",
  },
  {
    title: "Selected pieces",
    video: "/videos/rocdizway/selected-pieces.mp4",
    poster: "/images/rocdizway/selected-pieces.jpg",
  },
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

interface VideoCardProps {
  title: string;
  video: string;
  poster: string;
}

function VideoCard({ title, video, poster }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useState<HTMLVideoElement | null>(null)[1];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative aspect-[4/5] overflow-hidden cursor-pointer text-left"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)'
        }}
      >
        <video
          src={video}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex size-16 items-center justify-center rounded-full bg-gold/90 text-black shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
            <Play className="size-7 fill-current" />
          </div>
        </div>

        {/* Title */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end gap-4 p-6 text-white sm:p-7 text-left">
          <div className="flex w-full items-start justify-between">
            <h3 className="font-display text-2xl text-left">{title}</h3>
            <ArrowUpRight className="mb-1 size-4 shrink-0 text-gold-soft transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>
      </button>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setVideoEnded(false);
      }}>
        <DialogContent className="border-0 bg-transparent p-0 shadow-none w-[90vw] max-w-5xl max-h-[90vh] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src={video}
              poster={poster}
              autoPlay
              controls
              playsInline
              onEnded={() => setVideoEnded(true)}
              className="w-full h-full max-h-[85vh] object-contain rounded-lg"
            />
            {videoEnded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-lg">
                <a
                  href="https://rocdizway.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 border-2 border-gold bg-gold/10 px-8 py-4 text-lg tracking-[.2em] uppercase text-gold-soft transition hover:bg-gold hover:text-black font-display rounded-lg"
                >
                  SHOP NOW <ArrowUpRight className="size-5" />
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

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
          <div className="max-w-2xl text-left">
            <p className="eyebrow">Shop the edit</p>
            <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
              Find your next signature piece.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {rocdizwayCollections.map((collection) => (
              <VideoCard
                key={collection.title}
                title={collection.title}
                video={collection.video}
                poster={collection.poster}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-20 text-foreground sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">At a glance</p>
          <div className="mt-9 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {rocdizwayPromises.map((promise) => (
              <div key={promise.title} className="py-8 md:px-8 lg:px-10 first:pl-0 last:pr-0">
                <span className="flex size-8 items-center justify-center rounded-full border border-gold/45 text-gold">
                  <Check className="size-4" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-sm tracking-[.14em] uppercase text-foreground">
                  {promise.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {promise.description}
                </p>
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

const rocAwayExperiences = [
  {
    eyebrow: "Roc Kitchen",
    title: "Traditional inspiration. Contemporary expression.",
    description:
      "Thoughtfully prepared food inspired by traditional African flavours, ingredients and cooking. From rich soups and stews to rice, yam, plantain and carefully prepared mains, Roc Kitchen is where the Roc*Away food story begins.",
    image: "/images/roc-away/roc-away-food-selection.jpeg",
    cta: "Explore Roc Kitchen",
  },
  {
    eyebrow: "Roc Dining",
    title: "Food, service, atmosphere and the table.",
    description:
      "A warm restaurant experience built around good food, considered service and the pleasure of sharing a table. Come for the food. Stay for the atmosphere.",
    image: "/images/roc-away/roc-away-dining.jpeg",
    cta: "Discover Roc Dining",
  },
  {
    eyebrow: "Roc Lounge",
    title: "Music. Atmosphere. Conversation. Good company.",
    description:
      "An easygoing social setting designed to relax, connect and stay awhile. As the evening develops, Roc Lounge brings together music, atmosphere and people in a space made for good times.",
    image: "/images/roc-away/roc-away-lounge.jpeg",
    cta: "Discover Roc Lounge",
  },
] as const;

const rocAwayMenu = [
  {
    title: "Soups & stews",
    items: [
      "Bitter Leaf Soup",
      "Egusi Soup",
      "Ogbono Soup",
      "Okro Soup",
      "Ugu Soup",
      "Spinach Soup",
      "Spinach Stew",
      "Tomato Stew",
      "Pepper Soup",
    ],
  },
  {
    title: "Rice & mains",
    items: [
      "Stewed Rice",
      "Jollof Rice",
      "Fried Rice",
      "Rice & Beans",
      "Chicken",
      "Fish",
      "Goat",
      "Beef",
      "Lamb",
    ],
  },
  {
    title: "Traditional favourites",
    items: [
      "Potato Porridge / Potato-Aguorawgo",
      "Potato & Beans",
      "Yam & Beans",
      "Yam & Vegetables / Ji-Aguorawgo",
    ],
  },
  {
    title: "Sides & bites",
    items: ["Akara", "Moi Moi", "Chin Chin", "Nigerian Buns", "Fried Yam", "Fried Plantains", "Fried Chips"],
  },
] as const;

const rocAwayPromises = [
  {
    title: "Restaurant-led hospitality",
    description: "Thoughtful food, service and atmosphere.",
  },
  {
    title: "Lounge & social experiences",
    description: "A setting designed to relax, connect and stay awhile.",
  },
  {
    title: "Food, atmosphere & culture",
    description: "A complete experience extending beyond the table.",
  },
] as const;

function RocAwayProfile({ holding }: { holding: LoadedHolding }) {
  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden bg-black text-white">
        <img
          src={holding.showcaseImage}
          alt="Roc*Away restaurant, dining and lounge experience"
          className="absolute inset-0 size-full object-cover object-[72%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,3,.96)_0%,rgba(4,4,3,.72)_48%,rgba(4,4,3,.16)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-36 sm:pb-20 lg:px-10 lg:pb-24">
          <Link
            to="/portfolio"
            className="mb-auto inline-flex w-fit items-center gap-3 pt-2 text-[.62rem] tracking-[.2em] uppercase text-white/65 transition-colors hover:text-gold-soft"
          >
            <ArrowLeft className="size-3.5" /> Our core holdings
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-5xl uppercase leading-none sm:text-7xl lg:text-[6.5rem]">Roc*Away</h1>
            <p className="mt-5 text-xs tracking-[.2em] uppercase text-gold-soft sm:text-sm">
              Restaurant <span aria-hidden="true">•</span> Lounge <span aria-hidden="true">•</span>{" "}
              Lifestyle
            </p>
            <p className="mt-7 font-display text-2xl text-white/90 sm:text-3xl">
              Food. Atmosphere. Culture.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
              A hospitality and lifestyle destination inspired by traditional African food, music,
              atmosphere and the pleasure of bringing people together.
            </p>
            <a
              href={holding.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-4 border border-gold/70 bg-gold/10 px-6 py-4 text-[.68rem] tracking-[.2em] uppercase text-gold-soft transition hover:bg-gold hover:text-black"
            >
              Discover Roc*Away <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-ivory py-20 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-24 lg:px-10">
          <div className="relative aspect-[4/5] overflow-hidden bg-black lg:aspect-[5/6]">
            <img
              src="/images/roc-away/roc-away-kitchen.jpeg"
              alt="A Roc*Away chef preparing a dish"
              loading="lazy"
              className="size-full object-cover object-[72%_center]"
            />
          </div>
          <div>
            <p className="eyebrow">Traditional African cookery to go</p>
            <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
              From our kitchen
              <br />
              <span className="text-gold-gradient">to yours.</span>
            </h2>
            <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>
                Roc*Away began with a love of traditional African food — authentic ingredients,
                familiar flavours and the methods passed down through generations.
              </p>
              <p className="font-display text-xl text-foreground">
                We deliver to your door — or prepare in your kitchen.
              </p>
              <p>
                From hearty soups and stews to rice, yam, plantain and traditional favourites,
                Roc*Away brings the warmth of African home cooking into a modern food experience.
              </p>
            </div>
            <a
              href={holding.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border-b border-gold pb-2 text-[.68rem] tracking-[.2em] uppercase text-gold-deep"
            >
              Explore the food <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-20 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-10">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
              From home cooking
              <br />
              <span className="text-gold-gradient">to Roc*Away.</span>
            </h2>
          </div>
          <blockquote className="border-l-2 border-gold pl-7 sm:pl-10">
            <p className="font-display text-2xl leading-relaxed text-foreground sm:text-3xl">
              “We all know mother’s food is best.”
            </p>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                As a single dad, it was always fish & chips or McDonald’s. I couldn’t even cook pasta
                or boil an egg until my mother taught me how to use traditional ingredients and
                methods to make the soul food I’d loved in childhood.
              </p>
              <p>
                What began with learning the food I grew up loving became the inspiration for
                Roc*Away. And now she says my food tastes even better than hers!
              </p>
            </div>
            <footer className="mt-8 text-xs tracking-[.16em] uppercase text-gold-deep">
              Bobby M. Martins <span className="mx-2 text-border">/</span> Founder, Roc*Away
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">What is Roc*Away?</p>
          <h2 className="mt-5 text-4xl uppercase leading-tight text-foreground sm:text-6xl">
            Food. Atmosphere. Culture.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            Roc*Away brings traditional African-inspired food, music, atmosphere and hospitality
            together to create an experience that moves naturally from dining into the rest of the
            evening.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            More than a restaurant or lounge, Roc*Away is a destination to eat, relax, socialise and
            experience.
          </p>
          <p className="mt-8 font-display text-2xl text-gold-deep">
            Inspired by heritage. Elevated for today. Made for good times.
          </p>
          <figure className="mt-12 overflow-hidden border border-border bg-black shadow-[var(--shadow-luxe)]">
            <img
              src="/images/roc-away/roc-away-food-atmosphere-culture.jpeg"
              alt="Roc*Away food, atmosphere and culture"
              loading="lazy"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-24 text-white sm:py-32">
        <img
          src="/images/roc-away/roc-away-lounge-night.jpeg"
          alt="The Roc*Away dining and lounge atmosphere"
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-[80%_center] opacity-35"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="text-xs tracking-[.22em] uppercase text-gold-soft">The experience</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-6xl">More than a meal. An experience.</h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            Roc*Away is where food, people, music and atmosphere come together. From the kitchen to
            the table, from dining to the lounge, every element is designed to make the experience
            memorable.
          </p>
          <p className="mt-10 text-[.65rem] tracking-[.18em] uppercase text-gold-soft sm:text-xs">
            Food <span aria-hidden="true">•</span> Music <span aria-hidden="true">•</span> Atmosphere{" "}
            <span aria-hidden="true">•</span> Culture <span aria-hidden="true">•</span> Hospitality
          </p>
        </div>
      </section>

      <section className="section-ivory py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-7 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Kitchen · Dining · Lounge</p>
              <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
                Three expressions.
                <br />
                <span className="text-gold-gradient">One experience.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              From the first plate to the final song, each space carries the Roc*Away story through
              food, service and atmosphere.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {rocAwayExperiences.map((experience, index) => (
              <article
                key={experience.eyebrow}
                className="group grid overflow-hidden border border-border bg-background lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[22rem] overflow-hidden bg-black sm:min-h-[28rem] ${
                    index % 2 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={experience.image}
                    alt={`${experience.eyebrow} at Roc*Away`}
                    loading="lazy"
                    className="absolute inset-y-0 right-0 h-full w-[160%] max-w-none object-cover object-right transition duration-1000 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
                  <span className="absolute bottom-6 left-6 font-display text-6xl text-white/16 sm:bottom-8 sm:left-8 sm:text-7xl">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 xl:p-16">
                  <span className="h-px w-10 bg-gold" />
                  <p className="mt-6 text-[.62rem] tracking-[.22em] uppercase text-gold-deep">
                    {experience.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-lg text-3xl leading-tight text-foreground sm:text-4xl">
                    {experience.title}
                  </h3>
                  <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {experience.description}
                  </p>
                  <a
                    href={holding.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit items-center gap-3 border-b border-gold pb-2 text-[.62rem] tracking-[.18em] uppercase text-gold-deep"
                  >
                    {experience.cta} <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-7 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">The food</p>
              <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
                Traditional flavours.
                <br />
                <span className="text-gold-gradient">Authentic inspiration.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Roc*Away’s culinary roots bring together traditional favourites, authentic ingredients
              and a contemporary expression of African food.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rocAwayMenu.map((menuSection, index) => (
              <article
                key={menuSection.title}
                className="relative overflow-hidden border border-border bg-onyx p-7 sm:p-8"
              >
                <span className="absolute right-6 top-5 font-display text-4xl text-gold/18">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="block h-px w-9 bg-gold" />
                <h3 className="mt-5 max-w-[12rem] text-sm tracking-[.16em] uppercase text-gold-deep">
                  {menuSection.title}
                </h3>
                <ul className="mt-6 space-y-2 text-sm leading-6 text-muted-foreground">
                  {menuSection.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <figure className="mt-14 border border-gold/35 bg-black p-2 shadow-[var(--shadow-luxe)] sm:p-3 lg:p-5">
            <div className="overflow-hidden border border-white/10">
              <img
                src="/images/roc-away/roc-away-menu.jpeg"
                alt="Roc*Away traditional African food menu and culinary selection"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="flex flex-col gap-5 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[.62rem] tracking-[.2em] uppercase text-gold-soft">
                  The original culinary concept
                </p>
                <p className="mt-2 max-w-2xl text-xs leading-6 text-white/55 sm:text-sm">
                  A visual introduction to the flavours, dishes and traditions at the heart of the
                  Roc*Away food story.
                </p>
              </div>
              <a
                href={holding.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit shrink-0 items-center gap-3 border-b border-gold pb-2 text-[.65rem] tracking-[.18em] uppercase text-gold-soft"
              >
                Explore the food <ArrowUpRight className="size-3.5" />
              </a>
            </figcaption>
          </figure>
          <p className="mx-auto mt-6 max-w-3xl text-center text-[.68rem] leading-6 text-muted-foreground">
            The menu represents the original Roc*Away culinary concept and heritage. The current
            offering may evolve as the Roc*Away experience develops.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">At a glance</p>
          <div className="mt-9 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {rocAwayPromises.map((promise) => (
              <div key={promise.title} className="py-8 md:px-8 lg:px-10 first:pl-0 last:pr-0">
                <span className="flex size-8 items-center justify-center rounded-full border border-gold/45 text-gold">
                  <Check className="size-4" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-sm tracking-[.14em] uppercase text-foreground">
                  {promise.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{promise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ivory py-24 sm:py-28 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-20 lg:px-10">
          <figure className="relative mx-auto w-full max-w-2xl border border-gold/30 bg-black p-2 shadow-[var(--shadow-luxe)] sm:p-3">
            <div className="overflow-hidden border border-white/10">
              <img
                src="/images/roc-away/roc-away-brand-overview.jpeg"
                alt="Roc*Away brand, hospitality and dining overview"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
            <span className="absolute -bottom-3 -right-3 size-16 border-b border-r border-gold/55 sm:-bottom-4 sm:-right-4 sm:size-24" />
          </figure>

          <div>
            <p className="eyebrow">The Roc*Away philosophy</p>
            <h2 className="mt-6 text-4xl leading-[1.08] text-foreground sm:text-6xl">
              Eat. Relax.
              <br />
              Connect. <span className="text-gold-gradient">Experience.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              From traditional African-inspired food to contemporary dining, music and lounge
              culture, Roc*Away brings everything together under one experience.
            </p>

            <div className="mt-10 border-y border-border">
              {[
                ["01", "Food", "Brings people together."],
                ["02", "Atmosphere", "Makes them stay."],
                ["03", "Culture", "Gives the experience meaning."],
              ].map(([number, title, description]) => (
                <div
                  key={title}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-5 last:border-b-0 sm:grid-cols-[3rem_.75fr_1.25fr] sm:items-center"
                >
                  <span className="text-[.62rem] tracking-[.18em] text-gold-deep">{number}</span>
                  <h3 className="font-display text-xl text-foreground sm:text-2xl">{title}</h3>
                  <p className="col-start-2 text-sm leading-6 text-muted-foreground sm:col-start-auto">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-28 text-white sm:py-36">
        <img
          src={holding.image}
          alt="Experience Roc*Away"
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/68" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="text-xs tracking-[.22em] uppercase text-gold-soft">Experience Roc*Away</p>
          <h2 className="mt-7 text-4xl leading-tight sm:text-6xl">
            Discover what brings Roc*Away to life.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/65">
            Explore the food, restaurant, lounge, atmosphere and experiences that make Roc*Away more
            than a meal.
          </p>
          <a
            href={holding.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-4 border-b border-gold pb-3 text-xs tracking-[.2em] uppercase text-gold-soft"
          >
            Visit Roc*Away <ArrowUpRight className="size-4" />
          </a>
          <div className="mt-16 border-t border-white/15 pt-7">
            <p className="font-display text-2xl">Roc*Away</p>
            <p className="mt-3 text-[.62rem] tracking-[.2em] uppercase text-white/55">
              Restaurant <span aria-hidden="true">•</span> Lounge <span aria-hidden="true">•</span>{" "}
              Lifestyle
            </p>
            <p className="mt-4 text-sm text-gold-soft">Food. Atmosphere. Culture.</p>
            <p className="mt-5 text-[.6rem] tracking-[.16em] uppercase text-white/38">
              Part of the wider Martins Investments portfolio
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
