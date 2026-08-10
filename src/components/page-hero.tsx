import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-onyx pt-40 pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[34rem] rounded-full opacity-[0.07]"
        style={{ background: "var(--gradient-gold)", filter: "blur(120px)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] md:text-6xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
