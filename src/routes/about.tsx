import { createFileRoute } from "@tanstack/react-router";
import aboutImage from "@/assets/about.jpg";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import { groupIntro, groupPromise } from "@/data/group";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Martins Investments" },
      {
        name: "description",
        content:
          "Martins Investments helps clients enjoy leisure and maximize business through practical business support and personal services.",
      },
      { property: "og:title", content: "About | Martins Investments" },
      {
        property: "og:description",
        content: "Business support and personal services from Martins Investments.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Martins Investments"
        title="Let your dreams take off"
        intro={groupIntro}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <img
            src={aboutImage}
            alt="Dark boardroom with black marble table and gold lighting"
            loading="lazy"
            width={1600}
            height={1000}
            className="w-full border border-border object-cover"
          />
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="eyebrow">Who we are</p>
            <p>
              Martins Investments works with clients who need business support,
              personal assistance or specialist services that make daily life and
              work easier.
            </p>
            <p>
              Our services span landscape design, transport and removals, cars
              and limo, music and video, fashion, web design, home cookery, Girl
              Friday, property and finance.
            </p>
            <p>
              {groupPromise} Contact us for more details and we will be happy to
              help you today.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-onyx py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-3 lg:px-10">
          {[
            {
              t: "Mission",
              b: "To work with clients to lift capabilities, solve practical problems and turn dreams into reality.",
            },
            {
              t: "Vision",
              b: "A trusted service company helping customers enjoy their leisure, maximize business and make quality time richer.",
            },
            {
              t: "Values",
              b: "Helpful service, practical delivery, clear contact and a focus on what the client actually needs.",
            },
          ].map((item) => (
            <div key={item.t}>
              <div className="rule-gold" />
              <h2 className="mt-8 text-2xl">{item.t}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">Service structure</p>
        <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
          Business help, home help and leisure help
        </h2>
        <div className="mt-12 border border-border">
          {[
            {
              t: "Martins Investments",
              b: "The main point of contact for clients who want help with business, home, leisure or finance needs.",
            },
            {
              t: "Service areas",
              b: "Clear categories that organise the services available from Martins Investments.",
            },
            {
              t: "Specialist services",
              b: "Practical offers such as Dial-a-Chef, Roc Diz Way fashion, web design, transport, removals, property and finance.",
            },
          ].map((row, i) => (
            <div
              key={row.t}
              className={`grid gap-6 p-10 md:grid-cols-[240px_1fr] ${i > 0 ? "border-t border-border" : ""}`}
            >
              <h3 className="text-xl text-gold">{row.t}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {row.b}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <GoldLink to="/portfolio">See our services</GoldLink>
        </div>
      </section>
    </>
  );
}
