import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Martins Investments" },
      {
        name: "description",
        content:
          "How Bobby Martins Investments Limited collects, uses and protects personal information.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy."
        intro="How we handle personal information when you use this website or contact us."
      />
      <LegalDocument
        sections={[
          [
            "Who we are",
            "Bobby Martins Investments Limited is responsible for personal information collected through this website. Our contact address is 3rd Floor, 207 Regent Street, London W1B 3HH, England.",
          ],
          [
            "Information we collect",
            "We may collect information you provide through an enquiry, including your name, email address, telephone number, subject and message. With consent, analytics may collect limited device, browser and usage information.",
          ],
          [
            "How we use information",
            "We use information to respond to enquiries, manage business relationships, keep the website secure, comply with legal obligations and, where consent is given, understand and improve website performance.",
          ],
          [
            "External booking service",
            <>
              The “Book Bobby Martins” link opens SumUp Bookings in a new tab and takes you away
              from this website. SumUp may collect technical and cookie information when its page
              loads. If you make a booking, the personal and appointment details you enter are
              processed through SumUp on our behalf and made available to us so we can arrange and
              manage your request. Where applicable, SumUp processes payment-related information for
              its own purposes. Its privacy practices and terms apply on that site. Please review
              the{" "}
              <a
                href="https://www.sumup.com/en-gb/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline-offset-4 hover:underline"
              >
                SumUp Privacy Policy
              </a>{" "}
              and the notices displayed on the booking page before submitting your information.
            </>,
          ],
          [
            "Our lawful bases",
            "Depending on the context, we process information with your consent, to take steps at your request before a contract, for our legitimate interests in operating and protecting the business, or to comply with legal obligations.",
          ],
          [
            "Sharing and international transfers",
            "We only share information with service providers when needed to operate the website or respond to you. Optional Google services may process data outside the United Kingdom; they load only after the relevant consent is provided.",
          ],
          [
            "Retention and security",
            "We retain personal information only for as long as reasonably required for the purpose collected, legal obligations and dispute handling. We use appropriate organisational and technical measures to protect it.",
          ],
          [
            "Your rights",
            "UK data-protection law may give you rights to access, correct, erase or restrict your information, object to processing, withdraw consent and request data portability. You may also complain to the UK Information Commissioner’s Office.",
          ],
          [
            "Contact and updates",
            "Contact us through the website’s contact page with privacy requests. We may update this policy when our practices or legal requirements change. Last updated: 24 August 2026.",
          ],
        ]}
      />
    </>
  );
}

export function LegalDocument({ sections }: { sections: [string, ReactNode][] }) {
  return (
    <article className="section-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-4xl space-y-12 px-6 lg:px-10">
        {sections.map(([heading, body]) => (
          <section key={heading} className="border-t border-border pt-8">
            <h2 className="text-2xl">{heading}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{body}</p>
          </section>
        ))}
        <p className="border-t border-border pt-8 text-sm text-muted-foreground">
          Questions?{" "}
          <Link to="/contact" className="text-gold underline-offset-4 hover:underline">
            Contact Martins Investments
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
