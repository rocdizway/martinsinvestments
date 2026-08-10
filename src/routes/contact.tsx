import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Martins Investments" },
      {
        name: "description",
        content:
          "Contact Martins Investments for partnership, investment, media and general group enquiries.",
      },
      { property: "og:title", content: "Contact | Martins Investments" },
      {
        property: "og:description",
        content: "Partnership, investment and media enquiries for the group.",
      },
    ],
  }),
  component: Contact,
});

const enquiryTypes = [
  "Partnership",
  "Investment",
  "Media & press",
  "General enquiry",
];

function Contact() {
  const [type, setType] = useState(enquiryTypes[0]);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with the group"
        intro="For partnership, investment, media or general enquiries relating to Martins Investments or any business within the portfolio."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thank you — your enquiry has been noted.", {
                description: "A member of the group team will respond shortly.",
              });
              (e.target as HTMLFormElement).reset();
            }}
            className="space-y-8"
          >
            <div className="flex flex-wrap gap-3">
              {enquiryTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-5 py-3 text-[0.7rem] tracking-[0.18em] uppercase transition-colors duration-500 ${
                    type === t
                      ? "bg-gold text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Full name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Organisation" name="org" required={false} />
              <Field label="Subject" name="subject" />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="mt-3 w-full border border-border bg-transparent px-4 py-4 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="bg-gold px-10 py-4 text-[0.75rem] tracking-[0.2em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-gold-soft"
            >
              Submit enquiry
            </button>
          </form>

          <aside className="space-y-10">
            {[
              {
                t: "Group enquiries",
                b: "enquiries@martinsinvestments.com",
              },
              {
                t: "Partnerships & investment",
                b: "partnerships@martinsinvestments.com",
              },
              { t: "Press & media", b: "press@martinsinvestments.com" },
            ].map((c) => (
              <div key={c.t}>
                <div className="rule-gold" />
                <p className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {c.t}
                </p>
                <p className="mt-2 text-gold">{c.b}</p>
              </div>
            ))}
            <p className="text-sm leading-relaxed text-muted-foreground">
              Enquiries about a specific brand within the group will be directed
              to the relevant operating company.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}
