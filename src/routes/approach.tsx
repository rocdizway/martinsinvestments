import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import { pillars, groupIntro, groupPromise } from "@/data/group";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "How We Help | Martins Investments" },
      {
        name: "description",
        content:
          "How Martins Investments helps clients with business support, personal services, leisure and finance needs.",
      },
      { property: "og:title", content: "How We Help | Martins Investments" },
      {
        property: "og:description",
        content: "How Martins Investments helps clients turn plans into action.",
      },
    ],
  }),
  component: Approach,
});

const stages = [
  {
    t: "Get in touch",
    b: "Send your details, subject and requirements through the contact form, by phone or by fax.",
  },
  {
    t: "Explain the need",
    b: "Tell us whether you need business support, help at home, transport, creative work, property guidance or finance support.",
  },
  {
    t: "Match the service",
    b: "We connect the enquiry to the relevant Martins Investments service area and clarify the practical next step.",
  },
  {
    t: "Make it happen",
    b: "The focus is simple: help you enjoy your leisure, maximize your business and move the task forward.",
  },
];

function Approach() {
  return (
    <>
      <PageHero
        eyebrow="How We Help"
        title="From first contact to practical support"
        intro={groupIntro}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title}>
              <div className="rule-gold" />
              <h2 className="mt-8 text-xl">{p.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-6 text-3xl md:text-4xl">
            It all starts when you get in touch
          </h2>
          <div className="mt-14 border-l border-border">
            {stages.map((s, i) => (
              <div key={s.t} className="relative grid gap-4 py-10 pl-10 md:grid-cols-[200px_1fr]">
                <span className="absolute left-0 top-12 h-px w-6 bg-gold/60" />
                <h3 className="text-xl text-gold">
                  <span className="mr-4 font-display text-sm text-gold/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Contact us</p>
            <h2 className="mt-6 text-3xl md:text-4xl">
              Tell us what you need help with today
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>{groupPromise}</p>
            <p>
              Contact us for more details and we will get back to you as soon as
              we can.
            </p>
            <GoldLink to="/contact" variant="outline">
              Contact Martins Investments
            </GoldLink>
          </div>
        </div>
      </section>
    </>
  );
}
