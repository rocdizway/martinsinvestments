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
          <iframe
            className="hero-video-frame"
            src="https://www.youtube.com/embed/YD_4CgJgHoI?autoplay=1&mute=1&controls=0&loop=1&playlist=YD_4CgJgHoI&playsinline=1&rel=0&modestbranding=1"
            title="Martins Investments hero video"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
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
              <p className="eyebrow">Meet the businesses</p>
              <h2 className="mt-6 text-3xl md:text-5xl">Three brands. Three worlds.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              From a rare streetwear find to a room at its best, each business starts with one
              question: how should this make people feel?
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {holdings.map((holding, index) => (
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
                    <h3 className="mt-3 text-3xl">{holding.name}</h3>
                  </div>
                </div>
                <div className="p-7">
                  <p className="font-display text-xl text-[#2a261f] dark:text-white">
                    {holding.positioning}
                  </p>
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
          <p className="eyebrow">What we bring</p>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {[
              [
                "01",
                "Direction",
                "A strong idea becomes more valuable when every decision points the same way.",
              ],
              [
                "02",
                "Backing",
                "The structure, attention and practical support each team needs to keep moving.",
              ],
              [
                "03",
                "Room",
                "Enough independence for every brand to find its audience and become fully itself.",
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
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 font-display text-[18rem] leading-none text-gold/[.035] md:text-[28rem]">
          MI
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Still in motion</p>
          <h2 className="mt-8 max-w-4xl text-4xl leading-tight md:text-6xl">
            Three businesses today. An open horizon tomorrow.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            We remain curious about original concepts, unexpected connections and the right people
            to build with.
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
