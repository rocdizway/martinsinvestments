import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { LegalDocument } from "./privacy";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Martins Investments" },
      {
        name: "description",
        content: "Cookie and consent choices for the Martins Investments website.",
      },
    ],
  }),
  component: CookiePolicy,
});

function CookiePolicy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie policy."
        intro="The storage and third-party services used by this website—and how you remain in control."
      />
      <LegalDocument
        sections={[
          [
            "What we use",
            "The site uses local browser storage to remember theme and privacy preferences. These necessary settings support the experience and do not require analytics consent.",
          ],
          [
            "Analytics",
            "If enabled, Google Analytics helps us understand aggregated website usage. It is not loaded until you consent. The analytics setting can be refused or withdrawn at any time.",
          ],
          [
            "External media",
            "Embedded third-party services, including Google Maps, may receive technical information such as your IP address. External media remains blocked until you enable it.",
          ],
          [
            "Managing your choices",
            "Use the Cookie settings link in the footer at any time. Rejecting optional services does not prevent access to the site’s core content. Withdrawing consent stops future optional loading on this device.",
          ],
          [
            "Policy updates",
            "We may update this policy if the services used by the website change. Last updated: 15 August 2026.",
          ],
        ]}
      />
    </>
  );
}
