import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Crown, Download, Menu, Play, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { founderChapters } from "@/data/founder-story";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "The Founder’s Story | Bobby Martins · Roc Boss" },
      {
        name: "description",
        content:
          "The eight-chapter story of Bobby Martins—Roc Boss, recording artist, entrepreneur and founder of Martins Investments.",
      },
    ],
  }),
  component: FounderStorybook,
});

function FounderStorybook() {
  const [page, setPage] = useState(-1);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [contentsOpen, setContentsOpen] = useState(false);
  const chapter = page >= 0 ? founderChapters[page] : undefined;

  useEffect(() => {
    const hash = window.location.hash.replace("#chapter-", "");
    const index = founderChapters.findIndex((item) => item.slug === hash);
    if (index >= 0) setPage(index);
  }, []);

  const goTo = (nextPage: number) => {
    setDirection(nextPage >= page ? "next" : "previous");
    setPage(nextPage);
    setContentsOpen(false);
    const nextChapter = founderChapters[nextPage];
    history.replaceState(
      null,
      "",
      nextChapter ? `#chapter-${nextChapter.slug}` : window.location.pathname,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!chapter)
    return (
      <BookCover
        onOpen={() => goTo(0)}
        onContents={() => setContentsOpen(true)}
        contentsOpen={contentsOpen}
        closeContents={() => setContentsOpen(false)}
        goTo={goTo}
      />
    );

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground" data-no-reveal>
      <header className="fixed inset-x-0 top-20 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => goTo(-1)}
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase hover:text-gold"
          >
            <BookOpen className="size-4" /> Cover
          </button>
          <p className="text-[0.62rem] tracking-[0.2em] text-gold uppercase">
            Chapter {chapter.number} of 08
          </p>
          <button
            onClick={() => setContentsOpen(true)}
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase hover:text-gold"
          >
            <Menu className="size-4" /> Contents
          </button>
        </div>
      </header>

      <div
        key={chapter.slug}
        className={direction === "next" ? "founder-page-turn-next" : "founder-page-turn-previous"}
      >
        <Chapter chapter={chapter} />
      </div>

      <nav className="border-y border-border bg-onyx" aria-label="Founder story navigation">
        <div className="mx-auto grid max-w-7xl grid-cols-2">
          <button
            onClick={() => goTo(page - 1)}
            className="group border-r border-border p-7 text-left sm:p-10"
          >
            <span className="flex items-center gap-3 text-[0.62rem] tracking-[0.2em] text-gold uppercase">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />{" "}
              {page === 0 ? "Book cover" : "Previous chapter"}
            </span>
            <span className="mt-4 block font-display text-xl sm:text-3xl">
              {page === 0 ? "The Founder’s Story" : founderChapters[page - 1]?.title}
            </span>
          </button>
          <button
            onClick={() => (page === founderChapters.length - 1 ? goTo(-1) : goTo(page + 1))}
            className="group p-7 text-right sm:p-10"
          >
            <span className="flex items-center justify-end gap-3 text-[0.62rem] tracking-[0.2em] text-gold uppercase">
              {page === founderChapters.length - 1 ? "Close the book" : "Next chapter"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-4 block font-display text-xl sm:text-3xl">
              {page === founderChapters.length - 1
                ? "The story continues"
                : founderChapters[page + 1]?.title}
            </span>
          </button>
        </div>
      </nav>
      <Contents open={contentsOpen} onClose={() => setContentsOpen(false)} goTo={goTo} />
    </main>
  );
}

type ChapterType = (typeof founderChapters)[number];

function BookCover({
  onOpen,
  onContents,
  contentsOpen,
  closeContents,
  goTo,
}: {
  onOpen: () => void;
  onContents: () => void;
  contentsOpen: boolean;
  closeContents: () => void;
  goTo: (page: number) => void;
}) {
  return (
    <main className="bg-background text-foreground" data-no-reveal>
      <section className="relative min-h-[100svh] overflow-hidden bg-black pt-20 text-white">
        <div className="absolute inset-0 lg:left-[42%]">
          <img
            src="/founder/archive/bobby-portrait.jpeg"
            alt="Bobby Martins, known professionally as Roc Boss"
            className="hero-ken-burns h-full w-full object-cover object-[50%_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 lg:hidden" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-end px-6 pb-14 lg:items-center lg:px-10 lg:pb-0">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-gold">
              <Crown className="size-4" />
              <p className="eyebrow">An official Martins Investments story</p>
            </div>
            <h1 className="mt-7 text-5xl leading-[0.9] sm:text-7xl lg:text-[7rem]">
              Bobby <span className="text-gold-gradient">Martins.</span>
            </h1>
            <p className="mt-7 font-display text-2xl text-white/85 sm:text-3xl">Roc Boss</p>
            <p className="mt-3 text-xs tracking-[0.26em] text-white/55 uppercase">
              The Founder’s Story
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={onOpen}
                className="inline-flex items-center gap-4 bg-gold px-7 py-4 text-xs tracking-[0.2em] text-gold-foreground uppercase hover:bg-gold-soft"
              >
                <BookOpen className="size-4" /> Explore the profile
              </button>
              <button
                onClick={onContents}
                className="inline-flex items-center gap-3 border border-white/25 px-7 py-4 text-xs tracking-[0.18em] uppercase hover:border-gold hover:text-gold"
              >
                <Menu className="size-4" /> View chapters
              </button>
            </div>
          </div>
        </div>
      </section>
      <Contents open={contentsOpen} onClose={closeContents} goTo={goTo} />
    </main>
  );
}

function Chapter({ chapter }: { chapter: ChapterType }) {
  const isLegacy = chapter.slug === "legacy";
  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden bg-black pt-36 text-white">
        <img
          src={chapter.image}
          alt={chapter.imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25" />
        <div className="relative mx-auto flex min-h-[calc(88svh-9rem)] max-w-7xl items-end px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="max-w-4xl">
            <p className="text-[0.68rem] tracking-[0.28em] text-gold uppercase">
              The Founder’s Story · Chapter {chapter.number}
            </p>
            <h1 className="mt-6 text-5xl leading-[0.94] sm:text-7xl lg:text-8xl">
              {chapter.title}
            </h1>
            <p className="mt-6 font-display text-2xl text-white/75 sm:text-3xl">
              {chapter.subtitle}
            </p>
            <p className="mt-5 text-xs tracking-[0.2em] text-white/45 uppercase">{chapter.year}</p>
          </div>
        </div>
      </section>
      <article className="section-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <blockquote className="max-w-4xl font-display text-3xl leading-snug text-gold-deep sm:text-4xl lg:text-5xl">
            “{chapter.quote}”
          </blockquote>
          <div className="mt-20 space-y-20">
            {chapter.sections.map((section, index) => (
              <Fragment key={`${chapter.slug}-${index}`}>
                <section className="grid gap-8 border-t border-border pt-10 md:grid-cols-[0.42fr_1fr] md:gap-16">
                  <div>
                    <p className="text-[0.62rem] tracking-[0.22em] text-gold uppercase">
                      {chapter.number}.{String(index + 1).padStart(2, "0")}
                    </p>
                    {section.heading ? (
                      <h2 className="mt-4 text-2xl sm:text-3xl">{section.heading}</h2>
                    ) : null}
                  </div>
                  <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {chapter.slug === "roc-boss" &&
                    section.heading === "Consulting, advisory and speaking" ? (
                      <FounderConsultingVideo />
                    ) : null}
                    {section.cta ? (
                      <Link
                        to="/contact"
                        className="mt-8 inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs tracking-[0.18em] text-gold-foreground uppercase transition-colors hover:bg-gold-soft"
                      >
                        {section.cta} <ArrowRight className="size-4" />
                      </Link>
                    ) : null}
                  </div>
                </section>
                <ChapterInterlude slug={chapter.slug} sectionIndex={index} />
              </Fragment>
            ))}
          </div>
        </div>
      </article>
      {chapter.slug === "roc-boss" ? <RocBossStatement /> : null}
      {isLegacy ? <MediaResource /> : null}
    </>
  );
}

function FounderConsultingVideo() {
  return (
    <figure className="overflow-hidden border border-border bg-black shadow-2xl">
      <video
        controls
        playsInline
        preload="metadata"
        poster="/founder/bobby-martins-consulting-poster.png"
        aria-label="Bobby Martins discussing consulting, advisory and speaking"
        className="aspect-[690/463] w-full bg-black object-contain"
      >
        <source src="/founder/bobby-martins-consulting.mp4" type="video/mp4" />
        Your browser does not support embedded video.
      </video>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-white sm:px-6">
        <span className="text-[0.62rem] tracking-[0.2em] text-gold uppercase">
          Founder perspective
        </span>
        <span className="text-xs text-white/55">Consulting · Advisory · Speaking</span>
      </figcaption>
    </figure>
  );
}

function Contents({
  open,
  onClose,
  goTo,
}: {
  open: boolean;
  onClose: () => void;
  goTo: (page: number) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-black/70 p-4 backdrop-blur-sm">
      <div className="founder-contents-in ml-auto h-full w-full max-w-xl overflow-y-auto bg-background p-7 text-foreground shadow-2xl sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">The Founder’s Story</p>
            <h2 className="mt-3 text-3xl">Contents</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contents"
            className="grid size-11 place-items-center border border-border hover:border-gold"
          >
            <X className="size-5" />
          </button>
        </div>
        <ol className="mt-10 border-t border-border">
          {founderChapters.map((item, index) => (
            <li key={item.slug} className="border-b border-border">
              <button
                onClick={() => goTo(index)}
                className="group grid w-full grid-cols-[3rem_1fr_auto] items-center py-5 text-left"
              >
                <span className="font-display text-gold">{item.number}</span>
                <span>
                  <span className="block font-display text-xl">{item.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{item.subtitle}</span>
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ChapterInterlude({ slug, sectionIndex }: { slug: string; sectionIndex: number }) {
  const photographs: Record<
    string,
    Record<number, { src: string; alt: string; label: string; caption: string }>
  > = {
    nigeria: {
      0: {
        src: "/founder/archive/bobby-childhood.jpeg",
        alt: "Bobby Martins during his childhood in Nigeria",
        label: "Personal archive · Nigeria",
        caption: "Bobby Martins in childhood—the earliest surviving chapter of the story.",
      },
    },
    "dark-alley": {
      1: {
        src: "/founder/archive/bobby-young-artist.jpeg",
        alt: "A young Bobby Martins during his recording career",
        label: "Artist archive · The music years",
        caption: "Bobby Martins during the creative period from which Dark Alley emerged.",
      },
    },
    britain: {
      0: {
        src: "/founder/archive/bobby-contemplative.jpeg",
        alt: "Bobby Martins in a reflective portrait",
        label: "Personal archive · Reinvention",
        caption: "A reflective portrait from the wider journey between artist and entrepreneur.",
      },
    },
    education: {
      0: {
        src: "/founder/archive/bobby-portrait.jpeg",
        alt: "Portrait of Bobby Martins",
        label: "Founder archive · London",
        caption: "Bobby Martins—creative experience strengthened by formal business education.",
      },
    },
    entrepreneurship: {
      0: {
        src: "/founder/archive/bobby-evening.jpeg",
        alt: "Bobby Martins in London",
        label: "Personal archive · The entrepreneurial years",
        caption: "Bobby Martins as the creative journey expanded into brands and experiences.",
      },
    },
    "martins-investments": {
      1: {
        src: "/founder/archive/bobby-portrait.jpeg",
        alt: "Bobby Martins, Founder and Chief Executive Officer",
        label: "Founder portrait · Martins Investments",
        caption: "Bobby Martins, Founder and Chief Executive Officer of Martins Investments.",
      },
    },
    "roc-boss": {
      0: {
        src: "/founder/archive/bobby-lifestyle.jpeg",
        alt: "Bobby Martins, known professionally as Roc Boss",
        label: "Personal archive · Roc Boss",
        caption: "Roc Boss—the identity connecting music, culture, personal style and business.",
      },
    },
    legacy: {
      0: {
        src: "/founder/archive/bobby-contemplative.jpeg",
        alt: "Bobby Martins reflecting on a life across music, culture and business",
        label: "Founder archive · The story continues",
        caption: "A life shaped across music, culture, enterprise and the work still to come.",
      },
    },
  };

  const photograph = photographs[slug]?.[sectionIndex];
  const darkAlley = slug === "dark-alley" && sectionIndex < 3;
  const venture = slug === "entrepreneurship" && sectionIndex > 0;

  if (!photograph && !darkAlley && !venture) return null;

  return (
    <div className="space-y-10">
      {photograph ? <FounderPhotoFeature {...photograph} /> : null}
      {darkAlley ? <DarkAlleyArchive part={sectionIndex} /> : null}
      {venture ? <BusinessPortfolio ventureIndex={sectionIndex - 1} /> : null}
    </div>
  );
}

function FounderPhotoFeature({
  src,
  alt,
  label,
  caption,
}: {
  src: string;
  alt: string;
  label: string;
  caption: string;
}) {
  return (
    <figure className="overflow-hidden border border-border bg-black">
      <div className="grid lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
        <div className="flex min-h-[28rem] items-center justify-center bg-black p-4 sm:p-8">
          <img src={src} alt={alt} loading="lazy" className="max-h-[44rem] w-full object-contain" />
        </div>
        <figcaption className="flex flex-col justify-end border-t border-white/10 p-7 text-white sm:p-10 lg:border-t-0 lg:border-l">
          <p className="text-[0.62rem] tracking-[0.2em] text-gold uppercase">{label}</p>
          <p className="mt-5 font-display text-2xl leading-snug text-white/85">{caption}</p>
          <p className="mt-8 text-[0.6rem] tracking-[0.16em] text-white/40 uppercase">
            Martins Investments founder archive
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

function DarkAlleyArchive({ part }: { part: number }) {
  const credits = [
    ["Bobby Martins", "Lead vocals · editing · design concept"],
    ["Berkley Jones", "Producer"],
    ["Monday Oki", "Audio engineer"],
    ["Olubayo Aro", "Audio engineer · mixing"],
    ["Ed Jatto", "Assistant engineer"],
    ["Sunny Uka", "Assistant engineer"],
    ["Nkono Teles", "Synthesizer"],
    ["Lemmy Jackson", "Additional synthesizer"],
    ["Basil Barap", "Bass guitar"],
    ["Oscar", "Guitar"],
    ["Sol", "Guitar"],
    ["Moustique", "Drums"],
    ["Laolu “Akins” Akintobi", "Cowbell"],
    ["Chiko Ab.", "Percussion"],
    ["Charlimo", "Photography"],
    ["Ajayi Kanayo Mokwenyei", "Sleeve design"],
  ];

  if (part === 0) {
    const tracks = [
      "Dark Alley",
      "Take It Slowly",
      "Crazy Love",
      "Hot Coco",
      "Stay",
      "Poor Not Crazy",
    ];
    return (
      <aside className="overflow-hidden border border-border bg-black text-white">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <figure>
            <img
              src="/founder/archive/dark-alley-cover.jpeg"
              alt="Dark Alley by Bobby Martins, archival album artwork"
              className="h-full min-h-80 w-full object-cover"
            />
            <figcaption className="sr-only">Dark Alley archival album image, 1982</figcaption>
          </figure>
          <div className="p-7 sm:p-10">
            <p className="eyebrow">Archive 001 · HMV (N) 025</p>
            <h3 className="mt-5 text-4xl">Inside the record.</h3>
            <div className="mt-8 grid grid-cols-2 gap-8">
              {["Side A", "Side B"].map((side, sideIndex) => (
                <div key={side}>
                  <p className="font-display text-xl">{side}</p>
                  <ol className="mt-4 space-y-3 text-sm text-white/60">
                    {tracks.slice(sideIndex * 3, sideIndex * 3 + 3).map((track, index) => (
                      <li key={track} className="flex gap-3">
                        <span className="text-gold">0{index + 1}</span>
                        {track}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  if (part === 1) {
    return (
      <aside className="border-y border-border bg-background py-2">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Original recording credits</p>
            <h3 className="mt-3 text-3xl">The people behind the music.</h3>
          </div>
          <span className="hidden text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase sm:block">
            Nigeria · 1982
          </span>
        </div>
        <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {credits.map(([name, role]) => (
            <div key={name} className="border-t border-border py-5">
              <p className="text-sm">{name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{role}</p>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="grid gap-8 border border-border bg-onyx p-7 sm:p-10 md:grid-cols-[0.72fr_1.28fr] md:items-center">
      <div>
        <p className="eyebrow">The archive lives on</p>
        <h3 className="mt-4 text-3xl">Hear it. Trace it. Preserve it.</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href="https://www.discogs.com/release/4951569-Bobby-Dark-Alley"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-gold px-6 py-4 text-xs tracking-[0.16em] text-gold-foreground uppercase"
        >
          <Play className="size-4" /> Listen To Dark Alley Album
        </a>
        <a
          href="https://www.discogs.com/artist/5309699-Bobby-Martins"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 border border-border px-6 py-4 text-xs tracking-[0.16em] uppercase hover:border-gold"
        >
          Collector reference <ArrowRight className="size-4" />
        </a>
      </div>
    </aside>
  );
}

function BusinessPortfolio({ ventureIndex }: { ventureIndex: number }) {
  const ventures = [
    ["Roc*Parties", "Events · Experiences · Lifestyle", "More than an invitation."],
    ["RocDizWay", "Fashion · Culture · Commerce", "Curated Sovereign👑"],
    ["Roc*Away", "Food · Hospitality · Experiences", "Good food. Warm energy. Reasons to stay."],
  ];
  const venture = ventures[ventureIndex];
  if (!venture) return null;
  return (
    <aside className="grid gap-6 border border-border bg-onyx p-7 sm:grid-cols-[1fr_auto] sm:items-end sm:p-10">
      <div>
        <p className="text-[0.62rem] tracking-[0.18em] text-gold uppercase">Portfolio chapter</p>
        <h3 className="mt-4 text-4xl">{venture[0]}</h3>
        <p className="mt-3 text-xs tracking-[0.16em] text-muted-foreground uppercase">
          {venture[1]}
        </p>
      </div>
      <p className="max-w-sm font-display text-2xl text-gold-deep sm:text-right">{venture[2]}</p>
    </aside>
  );
}
function RocBossStatement() {
  return (
    <section className="relative overflow-hidden bg-black py-28 text-center text-white">
      <img
        src="/founder/archive/bobby-contemplative.jpeg"
        alt="Roc Boss"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="relative mx-auto max-w-4xl px-6">
        <p className="eyebrow">Music · Business · Culture · Legacy</p>
        <p className="mt-8 font-display text-5xl leading-tight sm:text-6xl">
          Defy trends.
          <br />
          Define legacy.
        </p>
      </div>
    </section>
  );
}
function MediaResource() {
  return (
    <section className="border-y border-border bg-onyx py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <img
          src="/founder/archive/official-biography-book.jpeg"
          alt="Roc Boss: The Official Biography book presentation"
          className="w-full border border-border object-cover shadow-2xl"
        />
        <div>
          <p className="eyebrow">Press &amp; media</p>
          <h2 className="mt-4 text-3xl">The definitive profile of Bobby Martins.</h2>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            Prepared by Martins Investments, the authorised media profile brings together the
            Founder’s biography, archive, business history and approved editorial reference.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/media/martins-investments-founder-profile.pdf"
              download="Martins_Investments_Founder_Profile.pdf"
              className="inline-flex w-fit items-center gap-3 bg-gold px-7 py-4 text-xs tracking-[0.18em] text-gold-foreground uppercase"
            >
              <Download className="size-4" /> Download profile
            </a>
            <a
              href="/media/martins-investments-founder-profile.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-3 border border-border px-7 py-4 text-xs tracking-[0.18em] uppercase hover:border-gold hover:text-gold"
            >
              View PDF <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
