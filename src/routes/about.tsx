import { createFileRoute } from "@tanstack/react-router";
import aboutImage from "@/assets/about.jpg";
import { PageHero } from "@/components/page-hero";
import { GoldLink } from "@/components/gold-link";
import { groupIntro, groupPromise } from "@/data/group";

const sisterCompanies = [
  {
    name: "Roc Diz Way",
    label: "A Rocawear label",
    image: "/sister-companies/roc-diz-way.png",
  },
  {
    name: "Roc Away",
    label: "Travel and lifestyle",
    image: "/sister-companies/roc-away.png",
  },
  {
    name: "Roc Parties",
    label: "Events and entertainment",
    image: "/sister-companies/roc-parties.png",
  },
  {
    name: "Roc Cars",
    label: "Cars and luxury mobility",
    image: "/sister-companies/roc-cars.png",
  },
];

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

      <section className="section-ivory py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow">Sister Companies</p>
              <h2 className="mt-6 text-3xl leading-tight md:text-5xl">
                Brands connected to the Martins vision
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:justify-self-end">
              A growing family of Roc brands supports the wider Martins
              Investments offer across fashion, travel, events and mobility.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sisterCompanies.map((company, index) => (
              <article
                key={company.name}
                className="sister-card group"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="sister-card-image relative aspect-square overflow-hidden">
                  <img
                    src={company.image}
                    alt={`${company.name} logo`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="size-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-white/6 opacity-70 transition-opacity duration-700 group-hover:opacity-35" />
                </div>
                <div className="sister-card-panel p-6">
                  <p className="text-[0.65rem] tracking-[0.24em] uppercase text-gold">
                    {company.label}
                  </p>
                  <h3 className="mt-3 text-2xl transition-colors group-hover:text-gold">
                    {company.name}
                  </h3>
                </div>
              </article>
            ))}
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

      <section className="section-ivory py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Service structure</p>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
            Business help, home help and leisure help
          </h2>
          <div className="mt-12 service-structure-panel">
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
                <p className="service-structure-copy">
                  {row.b}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <GoldLink to="/portfolio">See our services</GoldLink>
          </div>
        </div>
      </section>
    </>
  );
}
