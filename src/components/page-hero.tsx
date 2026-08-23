import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  backgroundImage,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  backgroundImage?: string | undefined;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden border-b pt-40 pb-20 ${
        backgroundImage
          ? "flex min-h-[34rem] items-end border-white/15 bg-black text-white md:min-h-[40rem] md:pb-24"
          : "border-border bg-onyx"
      }`}
    >
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 -z-30 size-full object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-gradient-to-r from-black/95 via-black/70 to-black/30"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-gradient-to-t from-black/80 via-black/15 to-black/35"
          />
        </>
      ) : null}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-40 right-[-10%] -z-10 size-[34rem] rounded-full ${backgroundImage ? "opacity-[0.14]" : "opacity-[0.07]"}`}
        style={{ background: "var(--gradient-gold)", filter: "blur(120px)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] md:text-6xl">{title}</h1>
        {intro ? (
          <p
            className={`mt-8 max-w-2xl text-base leading-relaxed md:text-lg ${
              backgroundImage ? "text-white/80" : "text-muted-foreground"
            }`}
          >
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
