import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GoldLink } from "@/components/gold-link";
import { sectors, businesses, pillars, groupIntro, groupPromise } from "@/data/group";

const heroSlides = [
  {
    id: "martins-video",
    eyebrow: "Business Support · Personal Services",
    title: "Let your dreams",
    accent: "take off",
    intro: groupIntro,
    videoUrl:
      "https://www.youtube-nocookie.com/embed/IxRVa1DbSAg?autoplay=1&mute=1&controls=0&loop=1&playlist=IxRVa1DbSAg&playsinline=1&rel=0&modestbranding=1&disablekb=1",
  },
];

const homepageStats = [
  { target: sectors.length, start: 30, suffix: "", label: "Service areas" },
  { target: businesses.length, start: 60, suffix: "", label: "Services listed" },
  { target: 20, start: 80, suffix: "+", label: "Years web experience" },
  { target: 24, start: 96, suffix: "-hour", label: "Chauffeur bookings" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Martins Investments — Business Support & Personal Services" },
      {
        name: "description",
        content:
          "Martins Investments works with clients to lift capabilities, turn dreams to reality, enjoy leisure and maximize business.",
      },
      { property: "og:title", content: "Martins Investments — Business Support & Personal Services" },
      {
        property: "og:description",
        content:
          "Services across landscaping, transport, cars, music and video, fashion, web design, home cookery, Girl Friday, property and finance.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const activeSlide = heroSlides[0];

  return (
    <>
      <section className="relative min-h-screen overflow-hidden text-white">
        <div className="absolute inset-0 bg-black">
          {heroSlides.map((slide) => (
            <iframe
              key={slide.id}
              title="Martins Investments hero video"
              src={slide.videoUrl}
              className="hero-video-frame"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-40 lg:px-10">
          <p className="eyebrow">{activeSlide.eyebrow}</p>
          <h1 className="mt-8 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            {activeSlide.title}{" "}
            <span className="text-gold-gradient">{activeSlide.accent}</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/78 md:text-lg">
            {activeSlide.intro}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <GoldLink to="/portfolio">Explore our services</GoldLink>
            <GoldLink to="/about" variant="outline">
              About Martins
            </GoldLink>
          </div>
          <div
            className="mt-12 flex items-center gap-3"
            aria-label="Hero slider position"
          >
            {heroSlides.map((slide, index) => (
              <span
                key={slide.id}
                className="h-px w-12 bg-gold"
                aria-label={`Slide ${index + 1} of ${heroSlides.length}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 lg:grid-cols-4 lg:px-10">
          {homepageStats.map((s) => (
            <div key={s.label} className="py-14 text-center">
              <AnimatedStat
                start={s.start}
                target={s.target}
                suffix={s.suffix}
              />
              <p className="mt-3 text-center text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-ivory">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="eyebrow">What We Do</p>
            <h2 className="mt-6 text-3xl leading-tight md:text-5xl">
              Business support and personal services in one place
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Whether you are looking for business support or help to make your
              quality personal time richer and more relaxing, Martins
              Investments works with you to lift your capabilities and turn
              dreams to reality.
            </p>
            <p>
              Services span landscaping, transport and removals, cars and limo
              hire, music and video production, fashion, web design, home
              cookery, Girl Friday support, property and finance.
            </p>
            <Link
              to="/about"
              className="inline-block border-b border-gold/60 pb-1 text-xs tracking-[0.2em] uppercase text-gold transition-colors hover:border-gold"
            >
              Read more
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-onyx py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Service Areas</p>
              <h2 className="mt-6 text-3xl md:text-5xl">How we can help</h2>
            </div>
            <Link
              to="/portfolio"
              className="text-xs tracking-[0.2em] uppercase text-gold transition-opacity hover:opacity-70"
            >
              View all
            </Link>
          </div>

          <div className="mt-16 grid gap-px border border-border md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Link
                key={s.slug}
                to="/portfolio/$sector"
                params={{ sector: s.slug }}
                className="group border-border p-10 transition-colors duration-500 hover:bg-elevated md:border-r md:border-b [&:nth-child(2n)]:md:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <span className="font-display text-sm text-gold/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-2xl transition-colors group-hover:text-gold">
                  {s.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ivory">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <p className="eyebrow">Selected Services</p>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-5xl">
            Practical support for work, home and leisure
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {businesses.slice(0, 3).map((b) => (
              <Link
                key={b.slug}
                to="/businesses/$business"
                params={{ business: b.slug }}
                className="surface-card block p-10"
              >
                <p className="text-[0.65rem] tracking-[0.24em] uppercase text-gold">
                  {b.stage}
                </p>
                <h3 className="mt-6 text-2xl">{b.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {b.tagline}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-14">
            <GoldLink to="/businesses" variant="outline">
              All services
            </GoldLink>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Our Approach</p>
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title}>
                <div className="rule-gold" />
                <h3 className="mt-8 text-xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ivory">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center lg:px-10">
          <p className="eyebrow">Future Vision</p>
          <h2 className="mx-auto mt-8 max-w-3xl text-3xl leading-tight md:text-5xl">
            Enjoy your leisure and maximize your business
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            {groupPromise} Contact us for more details and tell us what you need
            help with today.
          </p>
          <div className="mt-12 flex justify-center">
            <GoldLink to="/contact">Contact the group</GoldLink>
          </div>
        </div>
      </section>
    </>
  );
}

function AnimatedStat({
  start,
  target,
  suffix,
}: {
  start: number;
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(start);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const duration = 1500;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start - (start - target) * eased));

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    const frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [shouldAnimate, start, target]);

  return (
    <p ref={ref} className="font-display text-4xl text-gold">
      {value}
      {suffix}
    </p>
  );
}
