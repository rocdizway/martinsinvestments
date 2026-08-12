import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Crown, Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoldLink } from "@/components/gold-link";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Bobby Martins — Founder, Artist & Entrepreneur | Martins Investments" },
      {
        name: "description",
        content:
          "The official story of Bobby Martins BA (Hons), known as Roc Boss: recording artist, entrepreneur and founder of Martins Investments.",
      },
    ],
  }),
  component: Founder,
});

const timeline = [
  ["Early years", "Nigeria", "A creative life shaped by music, fashion and culture."],
  ["1982", "Dark Alley", "The debut album is released through His Master’s Voice."],
  ["Next chapter", "Britain", "A new life begins and creative instinct evolves into enterprise."],
  [
    "Education",
    "First-Class Honours",
    "Business Management at the University of Sunderland in London.",
  ],
  ["2009", "Roc*Parties", "Events, experiences and lifestyle become a growing venture."],
  ["Portfolio", "RocDizWay & Roc*Away", "Fashion, culture and hospitality join the wider vision."],
  ["2022", "Martins Investments", "The ventures come together under a parent-company philosophy."],
  ["The future", "Legacy in motion", "Building distinctive brands designed to endure."],
];

const tracks = ["Dark Alley", "Take It Slowly", "Crazy Love", "Hot Coco", "Stay", "Poor Not Crazy"];

const credits = [
  ["Bobby Martins", "Lead vocals · editing · design concept"],
  ["Berkley Jones", "Producer"],
  ["Monday Oki · Olubayo Aro", "Engineering · mixing"],
  ["Ed Jatto · Sunny Uka", "Assistant engineers"],
  ["Nkono Teles · Lemmy Jackson", "Synthesizers"],
  ["Basil Barap", "Bass guitar"],
  ["Oscar · Sol", "Guitars"],
  ["Moustique", "Drums"],
  ["Laolu “Akins” Akintobi · Chiko Ab.", "Cowbell · percussion"],
  ["Charlimo · Ajayi Kanayo Mokwenyei", "Photography · sleeve design"],
];

const chapters = [
  {
    number: "01",
    title: "Nigeria — the journey begins",
    kicker: "Before the businesses, there was creativity.",
    body: [
      "Growing up in Nigeria, Bobby Martins came of age during an important period in the country’s cultural development. Music and fashion were powerful forms of expression, and the creative environment around him helped shape his perspective.",
      "Those early influences led him into the recording industry. Music would become more than a career: it became the first chapter of a much larger story.",
    ],
  },
  {
    number: "02",
    title: "Britain — reinvention and education",
    kicker: "The artist began to evolve into the entrepreneur.",
    body: [
      "Following his music career, Bobby relocated to the United Kingdom. The transition from artist to entrepreneur was not a rejection of the past, but an evolution of it: creativity and cultural awareness remained, while his focus shifted towards business, strategy and brand development.",
      "He studied Business Management at the University of Sunderland in London, graduating with First-Class Honours. Formal study in strategy, marketing, leadership, entrepreneurship, finance and innovation gave structure to a lifetime of creative instinct.",
    ],
  },
  {
    number: "03",
    title: "Entrepreneurship — ideas become brands",
    kicker: "Music taught creativity. Business introduced discipline.",
    body: [
      "Bobby’s entrepreneurial journey developed across entertainment, fashion, hospitality and commerce. The objective grew beyond individual projects: to create distinct businesses with a common philosophy and the freedom to retain their own identities.",
      "Roc*Parties, whose origins date to 2009, builds VIP events, concierge, lifestyle and hospitality experiences. RocDizWay curates authentic archive and Y2K-era fashion as culture worth preserving. Roc*Away brings food, music, warmth and atmosphere together.",
    ],
  },
  {
    number: "04",
    title: "Martins Investments — the wider vision",
    kicker: "Create. Build. Evolve.",
    body: [
      "Martins Investments is the parent-company expression of that journey: a premium portfolio in which RocDizWay, Roc*Parties and Roc*Away each serve a different audience while contributing to a larger story.",
      "The ambition is not simply to build bigger, but to build better: brands with identity, businesses with purpose, opportunities for others and experiences that remain valuable tomorrow.",
    ],
  },
];

const gallery = [
  ["/founder/archive/bobby-childhood.jpeg", "Early years", "Nigeria · The first chapter"],
  ["/founder/archive/bobby-young-artist.jpeg", "The artist", "A creative life begins"],
  ["/founder/archive/bobby-contemplative.jpeg", "Roc Boss", "Culture · identity · perspective"],
  ["/founder/archive/bobby-evening.jpeg", "The founder today", "London · The story continues"],
];

function Founder() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative min-h-[96svh] overflow-hidden bg-[#0c0c0c] pt-20 text-white">
        <div className="absolute inset-0 lg:left-[44%]">
          <img
            src="/founder/archive/bobby-portrait.jpeg"
            alt="Bobby Martins, founder and chief executive officer of Martins Investments"
            className="hero-ken-burns h-full w-full object-cover object-[50%_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 lg:hidden" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(96svh-5rem)] max-w-7xl items-end px-6 pb-14 lg:items-center lg:px-10 lg:pb-0">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-gold">
              <Crown className="size-4" />
              <p className="eyebrow">The official founder’s biography</p>
            </div>
            <h1 className="mt-7 text-5xl leading-[0.92] sm:text-7xl lg:text-[7.2rem]">
              Bobby <span className="text-gold-gradient">Martins.</span>
            </h1>
            <p className="mt-7 font-display text-xl text-white/85 sm:text-2xl">
              Music. Business. Culture. Legacy.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Founder · Entrepreneur · Recording Artist · Business Strategist
            </p>
            <a
              href="#story"
              className="mt-10 inline-flex items-center gap-3 text-[0.7rem] tracking-[0.24em] uppercase text-gold hover:text-gold-soft"
            >
              Enter the story <ArrowDown className="size-4" />
            </a>
          </div>
        </div>
        <p className="absolute right-10 bottom-10 hidden text-[0.65rem] tracking-[0.3em] text-white/40 uppercase lg:block">
          Defy trends. Define legacy.
        </p>
      </section>

      <section id="story" className="section-ivory py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-10">
          <div>
            <p className="eyebrow">A life built in chapters</p>
            <p className="mt-8 font-display text-3xl leading-snug text-gold-deep md:text-4xl">
              “Some people follow a career. Others create a journey.”
            </p>
          </div>
          <div>
            <h2 className="text-4xl leading-tight md:text-6xl">From vinyl to vision.</h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                The story of Bobby Martins, known professionally as Roc Boss, is one of creativity,
                reinvention, entrepreneurship and an enduring relationship with culture.
              </p>
              <p>
                It began in Nigeria with music. It developed through education, evolved through
                business and continues today through a growing portfolio under Martins Investments.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
              {[
                "Music / beginning",
                "Business / evolution",
                "Culture / constant",
                "Legacy / objective",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-background px-4 py-5 text-[0.68rem] tracking-[0.12em] uppercase"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="eyebrow">The founder’s timeline</p>
            <h2 className="mt-5 text-3xl sm:text-4xl">The journey at a glance.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Eight defining milestones—from Bobby’s early creative years in Nigeria to the
              continuing vision behind Martins Investments.
            </p>
          </div>
          <ol className="relative mt-12 border-l border-gold/35 sm:grid sm:grid-cols-2 sm:border-l-0 lg:grid-cols-4">
            {timeline.map(([era, title, description], index) => (
              <li
                key={`${era}-${title}`}
                className="relative border-b border-border py-7 pl-8 last:border-b-0 sm:min-h-52 sm:border-t sm:border-b-0 sm:px-6 sm:py-8 sm:first:pl-0"
              >
                <span className="absolute top-9 -left-1.5 size-3 rounded-full border border-gold bg-onyx sm:top-[-0.4rem] sm:left-6" />
                <p className="text-[0.62rem] tracking-[0.22em] text-gold uppercase">{era}</p>
                <h3 className="mt-3 text-xl">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
                <span className="absolute top-7 right-5 font-display text-3xl text-foreground/[0.07]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#0c0c0c] py-24 text-white lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
            <div className="relative">
              <img
                src="/founder/archive/bobby-young-artist.jpeg"
                alt="A young Bobby Martins during his early music years"
                className="aspect-square w-full object-cover grayscale"
              />
              <div className="absolute -right-4 -bottom-4 border border-gold/40 bg-[#111] px-7 py-5 sm:-right-8 sm:-bottom-8">
                <p className="font-display text-4xl text-gold">1982</p>
                <p className="mt-1 text-[0.62rem] tracking-[0.22em] text-white/50 uppercase">
                  Nigeria
                </p>
              </div>
            </div>
            <div>
              <p className="eyebrow">The music years · Archive 001</p>
              <h2 className="mt-6 text-5xl leading-none md:text-7xl">Dark Alley.</h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
                Bobby Martins’ first major creative expression—and an enduring physical document
                from the beginning of his story.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-white/10 py-8 text-sm">
                {[
                  ["Label", "His Master’s Voice"],
                  ["Catalogue", "HMV (N) 025"],
                  ["Format", "LP / Album"],
                  ["Country", "Nigeria"],
                ].map(([term, value]) => (
                  <div key={term}>
                    <dt className="text-[0.6rem] tracking-[0.2em] text-gold uppercase">{term}</dt>
                    <dd className="mt-2 text-white/80">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.youtube.com/results?search_query=Bobby+Martins+Dark+Alley+RocDizWay"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-gold px-6 py-4 text-xs tracking-[0.16em] text-gold-foreground uppercase hover:bg-gold-soft"
                >
                  <Play className="size-4" /> Find the RocDizWay archive
                </a>
                <a
                  href="https://www.afrosunny.com/bobby-dark-alley-80s-nigerian-boogie-disco-funk-soul-music-album-lp/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-white/25 px-6 py-4 text-xs tracking-[0.16em] uppercase hover:border-gold"
                >
                  <ArrowUpRight className="size-4" /> Collector record
                </a>
              </div>
            </div>
          </div>

          <div className="mt-24 grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">The record</p>
              <div className="mt-7 grid grid-cols-2 gap-8">
                {["Side A", "Side B"].map((side, sideIndex) => (
                  <div key={side}>
                    <p className="font-display text-2xl">{side}</p>
                    <ol className="mt-5 space-y-3 text-sm text-white/60">
                      {tracks.slice(sideIndex * 3, sideIndex * 3 + 3).map((track, index) => (
                        <li key={track} className="flex gap-4">
                          <span className="text-gold">0{index + 1}</span>
                          {track}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">The people behind Dark Alley</p>
              <div className="mt-7 grid gap-x-6 sm:grid-cols-2">
                {credits.map(([name, role]) => (
                  <div key={name} className="border-t border-white/10 py-4">
                    <p className="text-sm text-white/85">{name}</p>
                    <p className="mt-1 text-xs leading-5 text-white/45">{role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-ivory py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-10">
          <div>
            <p className="eyebrow">The founder’s story</p>
            <h2 className="mt-6 text-4xl leading-tight md:text-6xl">Read the chapters.</h2>
            <p className="mt-6 max-w-sm leading-7 text-muted-foreground">
              Open each chapter to explore the full journey without losing the shape of the story.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            defaultValue="chapter-0"
            className="border-t border-border"
          >
            {chapters.map((chapter, index) => (
              <AccordionItem key={chapter.number} value={`chapter-${index}`}>
                <AccordionTrigger className="gap-5 py-7 hover:no-underline">
                  <span className="text-gold">{chapter.number}</span>
                  <span className="mr-auto font-display text-xl font-normal sm:text-2xl">
                    {chapter.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pl-0 sm:pl-14">
                  <p className="font-display text-xl text-gold-deep">{chapter.kicker}</p>
                  <div className="mt-4 max-w-2xl space-y-4 leading-7 text-muted-foreground">
                    {chapter.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="eyebrow">Founder’s gallery</p>
            <h2 className="mt-6 text-4xl md:text-6xl">A life in frames.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map(([src, title, caption]) => (
              <div key={src} className="group relative overflow-hidden bg-onyx">
                <img
                  src={src}
                  alt={`${title} — ${caption}`}
                  className="aspect-[3/4] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 pt-20 text-white">
                  <p className="font-display text-xl">{title}</p>
                  <p className="mt-1 text-xs text-white/55">{caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-black py-28 text-white lg:py-40">
        <img
          src="/founder/archive/bobby-lifestyle.jpeg"
          alt="Bobby Martins, known professionally as Roc Boss"
          className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px]"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow">The founder’s philosophy</p>
          <blockquote className="mt-8 font-display text-3xl leading-tight sm:text-5xl lg:text-6xl">
            “I believe the greatest brands are built by preserving authenticity rather than simply
            following trends.”
          </blockquote>
          <p className="mt-8 text-xs tracking-[0.25em] text-gold uppercase">— Bobby Martins</p>
        </div>
      </section>

      <section className="section-ivory py-24 text-center lg:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <p className="eyebrow">Vision for the future</p>
          <h2 className="mt-7 text-4xl leading-tight md:text-6xl">
            Building beyond today.
            <br />
            Creating a legacy for tomorrow.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl leading-8 text-muted-foreground">
            The greatest measure of success is not simply what can be built today. It is what can
            still have value tomorrow. The next chapter remains unwritten.
          </p>
          <div className="mt-10 flex justify-center">
            <GoldLink to="/portfolio">Explore the portfolio</GoldLink>
          </div>
        </div>
      </section>
    </main>
  );
}
