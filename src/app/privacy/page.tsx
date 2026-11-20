import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | EvarTheme Shifter",
  description:
    "EvarTheme Shifter does not collect, store or send any data, passwords or browsing history anywhere.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        EvarTheme Shifter is a free browser extension that adds a proper dark
        theme to your college portal, LMS, Wikipedia, Reddit, GitHub, Stack
        Overflow, Medium, Hacker News and MDN.
      </p>
      <LegalSection title="What we collect">
        <p>
          Nothing. EvarTheme Shifter does not collect, store, send, sell, or
          share any personal data, browsing history, passwords, marks,
          courses, or any other information. It does not use analytics,
          tracking, or ads, now or in the future.
        </p>
      </LegalSection>
      <LegalSection title="What it does on a page">
        <p>
          When you open one of the sites listed above, the extension changes
          only the appearance of that page in your own browser: background,
          text, link, input, table, card, pill, badge, menu and button
          colours, element by element. It does not use a global invert filter,
          and images, logos, videos and PDFs stay normal. It does not read
          your login details, your courses, your marks, or any other page
          content, and it does not send anything anywhere.
        </p>
      </LegalSection>
      <LegalSection title="Settings">
        <p>
          Your on/off state, theme (Dark, OLED black or Dim) and brightness
          (70 to 110 percent) are saved only in your browser&apos;s own sync
          storage, so they follow your browser profile. Nothing is sent to us
          or to any third party.
        </p>
      </LegalSection>
      <LegalSection title="Permissions">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            storage: saves only your own theme settings, as above.
          </li>
          <li>
            Host permissions: limited to the sites the extension themes,
            listed above. The content script only runs on those sites, to
            apply the dark theme. It does not run on any other site.
          </li>
          <li>
            No remote code: all JavaScript and CSS are included in the
            extension package. No external scripts, no eval.
          </li>
        </ul>
      </LegalSection>
      <LegalSection title="Third parties">
        <p>
          No third-party services, no analytics, no tracking, no ads. The
          website itself does not run analytics or tracking either.
        </p>
      </LegalSection>
      <LegalSection title="Children">
        <p>
          EvarTheme Shifter collects no data from anyone, including children,
          because it collects no data at all.
        </p>
      </LegalSection>
      <LegalSection title="Contact">
        <p>
          If you have a question about this policy, contact the developer at{" "}
          <a
            href="mailto:namishyadavv@gmail.com"
            className="underline underline-offset-4 hover:opacity-80"
          >
            namishyadavv@gmail.com
          </a>{" "}
          or through the store listing.
        </p>
      </LegalSection>
      <LegalSection title="Changes">
        <p>
          If this policy changes, the new version will be published with the
          next extension update, and the Last updated date above will change.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
