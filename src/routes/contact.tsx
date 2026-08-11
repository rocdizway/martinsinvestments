import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Martins Investments" },
      {
        name: "description",
        content:
          "Speak with Martins Investments about the group, one of our businesses or a new idea.",
      },
      { property: "og:title", content: "Contact | Martins Investments" },
      {
        property: "og:description",
        content: "Get in touch with Martins Investments.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start the next conversation."
        intro="Connect with us about a core holding, a purposeful business opportunity or a partnership aligned with our long-term vision."
      />

      <section className="relative h-[420px] w-full overflow-hidden border-y border-border lg:h-[560px]">
        <iframe
          title="Martins Investments office on Google Maps"
          src="https://www.google.com/maps?q=207%20Regent%20Street%2C%20London%20W1B%203HH&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
          allowFullScreen
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Your message is with us.", {
                description:
                  "Thank you for taking the time to write. We will respond as soon as we can.",
              });
              (e.target as HTMLFormElement).reset();
            }}
            className="space-y-8"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Telephone" name="telephone" required={false} />
              <Field label="Subject" name="subject" />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
              >
                Your message
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
              Send message
            </button>
          </form>

          <aside className="space-y-10">
            {[
              {
                t: "Phone",
                b: "020 4531 3661",
              },
              {
                t: "Fax",
                b: "020 4531 3661",
              },
              {
                t: "Office",
                b: "Bobby Martins Investments Limited, 3rd Floor, 207 Regent Street, W1B 3HH, London, England",
              },
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
              Use the form for holding enquiries, business introductions and purposeful partnership
              conversations with Martins Investments.
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
      <label htmlFor={name} className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
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
