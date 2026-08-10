import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "How We Think | Martins Investments" },
      {
        name: "description",
        content: "The instincts and principles that guide Martins Investments.",
      },
    ],
  }),
  component: Approach,
});

const principles = [
  {
    number: "01",
    title: "Find the truth",
    body: "Before logos, launches or expansion plans, we look for the simple truth at the centre of an idea: who is it for, and why should they care?",
  },
  {
    number: "02",
    title: "Give it shape",
    body: "We turn that truth into clear choices—what the business offers, how it behaves and where its energy is best spent.",
  },
  {
    number: "03",
    title: "Let it breathe",
    body: "A brand needs consistency, but it also needs room to respond to its customers, its culture and the opportunities nobody could plan for.",
  },
  {
    number: "04",
    title: "Stay close",
    body: "We remain involved beyond the first idea, asking better questions and helping the team keep momentum without losing its character.",
  },
];

function Approach() {
  return (
    <>
      <PageHero
        eyebrow="How We Think"
        title="Clear enough to guide. Flexible enough to grow."
        intro="We do not force every business into the same mould. We find what is true about each idea, strengthen it and build around it."
      />
      <section className="section-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {principles.map((item) => (
              <article key={item.number} className="bg-background p-9 lg:p-14">
                <p className="font-display text-gold-deep dark:text-gold-soft">{item.number}</p>
                <h2 className="mt-12 text-3xl text-[#2a261f] dark:text-white">{item.title}</h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-[#5b5448] dark:text-white/70">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-onyx py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
          <p className="eyebrow">What earns our attention</p>
          <div>
            <h2 className="text-3xl leading-tight md:text-5xl">
              Not every opportunity needs to be obvious. It does need to be honest.
            </h2>
            <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
              We are drawn to ideas with a clear audience, a founder who understands the details and
              a reason to exist beyond following a trend. Sometimes that is a proven business ready
              for its next stage. Sometimes it is a strong concept waiting for the right structure.
            </p>
            <div className="mt-10">
              <GoldLink to="/contact" variant="outline">
                Share an idea
              </GoldLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
