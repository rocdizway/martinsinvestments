import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Handshake,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GoldLink } from "@/components/gold-link";
import { holdings } from "@/data/group";
import heroImage from "@/assets/hero.jpg";

const homepageHoldings = holdings.map((holding) => {
  const copy = {
    rocdizway: {
      category: "Curated sovereign",
      description:
        "Premium online fashion and lifestyle-curated designer clothing, footwear and accessories.",
    },
    "roc-parties": {
      category: "VIP events. Experiences",
      description:
        "VIP events, experiences, concierge and lifestyle management for unforgettable occasions.",
    },
    "roc-away": {
      category: "Restaurant. Lounge. Lifestyle",
      description:
        "Restaurant, lounge and hospitality experiences built around food, atmosphere and culture.",
    },
  }[holding.slug];

  return { ...holding, ...copy };
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Martins Investments — Culture, Experience and Enterprise" },
      {
        name: "description",
        content:
          "Martins Investments develops carefully chosen ventures across fashion, experiences and hospitality.",
      },
      { property: "og:title", content: "Martins Investments — Culture, Experience and Enterprise" },
      {
        property: "og:description",
        content:
          "An independent group bringing clarity, structure and ambition to ideas with character.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [heroSlide, setHeroSlide] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setHeroSlide((current) => ((current + 1) % 3) as 0 | 1 | 2),
      heroSlide === 1 ? 12_000 : 9_000,
    );

    return () => window.clearTimeout(timeout);
  }, [heroSlide]);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-black text-white">
        <div
          className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
            heroSlide === 0 ? "opacity-55" : "opacity-0"
          }`}
          aria-hidden={heroSlide !== 0}
        >
          <img
            src="/hero-0.jpg"
            alt=""
            className={`size-full object-cover ${heroSlide === 0 ? "hero-cube-reveal" : ""}`}
          />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            heroSlide === 1 ? "opacity-55" : "opacity-0"
          }`}
          aria-hidden={heroSlide !== 1}
        >
          <video
            className="size-full object-cover"
            src="https://www.pexels.com/download/video/27587866/"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div
          className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
            heroSlide === 2 ? "opacity-55" : "opacity-0"
          }`}
          aria-hidden={heroSlide !== 2}
        >
          <img
            src={heroImage}
            alt=""
            className={`size-full object-cover ${heroSlide === 2 ? "hero-ken-burns" : ""}`}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,.94)_0%,rgba(7,7,6,.62)_52%,rgba(7,7,6,.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-24">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <p className="eyebrow">Independent Holding Company</p>
          </div>
          <h1 className="max-w-5xl text-5xl leading-[.98] md:text-7xl lg:text-[6.4rem]">
            INVESTING TODAY. <span className="text-gold-gradient">BUILDING TOMORROW.</span>
          </h1>
          <div className="mt-10 flex max-w-4xl flex-col gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-white/72 md:text-lg">
              Martins Investments is a private holding company building and backing businesses that
              inspire, serve and stand the test of time.
            </p>
            <GoldLink to="/portfolio">Explore the portfolio</GoldLink>
          </div>
          <div className="mt-8 flex gap-2" aria-label="Hero slides">
            {[0, 1, 2].map((slide) => (
              <button
                key={slide}
                type="button"
                aria-label={`Show hero slide ${slide + 1}`}
                aria-current={heroSlide === slide}
                onClick={() => setHeroSlide(slide as 0 | 1 | 2)}
                className={`h-0.5 transition-all duration-500 ${
                  heroSlide === slide ? "w-12 bg-gold" : "w-7 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-ivory border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-gold" />
                <p className="eyebrow">Who We Are</p>
              </div>
              <h2 className="mt-8 text-4xl leading-[1.02] text-foreground md:text-6xl">
                Building ideas.
                <br />
                <span className="text-gold-gradient">Backing legacy.</span>
              </h2>
            </div>

            <div className="flex items-end">
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                We are long-term thinkers with a clear focus on quality ideas, strong execution and
                the freedom to build something real.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Strategic Investment",
                body: "We identify and back ideas with real potential.",
                icon: Lightbulb,
              },
              {
                title: "Active Partnership",
                body: "We work alongside founders and management teams.",
                icon: Handshake,
              },
              {
                title: "Sustainable Growth",
                body: "We build businesses with enduring value.",
                icon: TrendingUp,
              },
              {
                title: "Excellence in Everything",
                body: "We hold high standards across all we do.",
                icon: Award,
              },
            ].map(({ title, body, icon: Icon }, index) => (
              <article
                key={title}
                className="group bg-background p-8 text-white transition-colors duration-500 hover:bg-[#171510] lg:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-black">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm text-gold/60">0{index + 1}</span>
                </div>
                <h3 className="mt-12 text-xl text-white">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-28 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-36">
          <div>
            <p className="eyebrow">The Group</p>
            <p className="mt-5 text-xs tracking-[.18em] uppercase text-muted-foreground">
              Fashion · Experiences · Hospitality
            </p>
          </div>
          <div>
            <h2 className="text-3xl leading-tight md:text-5xl">
              Built together.
              <br />
              Made to stand apart.
            </h2>
            <div className="mt-10 grid gap-8 text-base leading-relaxed text-muted-foreground md:grid-cols-2">
              <p>
                The best businesses have a point of view. Ours begin with a clear feel for the
                people, places and moments that move culture forward.
              </p>
              <p>
                The group brings commercial focus and a steady hand behind the scenes. Out front,
                every brand earns attention in its own way.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-3 text-xs tracking-[.2em] uppercase text-gold"
            >
              Discover the group <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-ivory py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Our core holdings</p>
              <h2 className="mt-6 text-3xl md:text-5xl">Three businesses. One purpose.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Distinct by design. United by values. Built for long-term impact.
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {homepageHoldings.map((holding, index) => (
              <article
                key={holding.slug}
                className="group overflow-hidden border border-border bg-background"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={holding.image}
                    alt={`${holding.name} brand`}
                    className="size-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
                  <span className="absolute left-6 top-6 text-[.62rem] tracking-[.22em] uppercase text-white/65">
                    0{index + 1} · {holding.status}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <p className="text-[.62rem] tracking-[.22em] uppercase text-gold-soft">
                      {holding.category}
                    </p>
                    <h3 className="mt-3 text-3xl uppercase">{holding.name}</h3>
                  </div>
                </div>
                <div className="p-7">
                  <p className="mt-4 text-sm leading-relaxed text-[#5b5448] dark:text-white/70">
                    {holding.description}
                  </p>
                  <Link
                    to="/portfolio"
                    className="mt-7 inline-flex items-center gap-2 text-[.65rem] tracking-[.2em] uppercase text-gold"
                  >
                    View holding <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-onyx">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <p className="eyebrow">Why we exist</p>
          <h2 className="mt-6 text-3xl text-white md:text-5xl">Ideas. Values. Impact.</h2>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Backing ideas that matter",
                "We invest in ideas with purpose, potential and real-world impact.",
              ],
              [
                "02",
                "Building with integrity",
                "We believe trust, transparency and discipline create lasting values.",
              ],
              [
                "03",
                "Freedom to create",
                "We give our businesses the space and support to grow and lead.",
              ],
              [
                "04",
                "Legacy as the goal",
                "We build for the long term — for people, for communities and for generations.",
              ],
            ].map(([number, title, body]) => (
              <div key={title} className="bg-background p-9 lg:p-12">
                <p className="font-display text-gold-deep dark:text-gold-soft">{number}</p>
                <h3 className="mt-16 text-3xl text-[#2a261f] dark:text-white">{title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-[#5b5448] dark:text-white/70">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ivory relative overflow-hidden py-32 lg:py-44">
        <img
          src="/future-monogram.png"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 h-full w-full -translate-y-1/2 object-contain object-right opacity-20 mix-blend-multiply md:w-[58%] md:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f3efe5] via-[#f3efe5]/90 to-transparent md:w-3/5" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">The future is building</p>
          <h2 className="mt-8 max-w-3xl text-4xl leading-tight md:text-6xl">
            The next chapter is already beginning.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            We continue to look forward — exploring new ideas, entering new markets and building
            the next generation of Martins Investments businesses.
          </p>
          <Link
            to="/contact"
            className="mt-12 inline-flex items-center gap-5 border-b border-gold pb-3 text-xs tracking-[.2em] uppercase text-gold"
          >
            Start a conversation <ArrowDownRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
