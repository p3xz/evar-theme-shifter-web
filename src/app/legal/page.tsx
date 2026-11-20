import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Legal | EvarTheme Shifter",
  description:
    "EvarTheme Shifter is not an official college product, and is not endorsed by any college or site it themes.",
};

export default function LegalTermsPage() {
  return (
    <LegalPage title="Legal">
      <LegalSection title="Not an official product">
        <p>
          EvarTheme Shifter is not an official product of any college,
          university, or any of the sites it themes. It is not endorsed by,
          sponsored by, or connected to any college, university, or any of
          those sites. It is an independent student built tool.
        </p>
      </LegalSection>
      <LegalSection title="No affiliation">
        <p>
          The college portal and college LMS are referred to on this site only
          as college portal and college LMS. No college name, logo, crest,
          banner, or branding is used anywhere on this site or in the
          extension, except where the extension must match the site&apos;s own
          logo files to keep them visible on a dark background, which is a
          technical need, not branding.
        </p>
      </LegalSection>
      <LegalSection title="Intellectual property">
        <p>
          The sites EvarTheme Shifter themes belong to their owners.
          EvarTheme Shifter does not copy, host, or redistribute their
          content. It only changes how their pages look in your own browser.
        </p>
      </LegalSection>
      <LegalSection title="Liability">
        <p>
          EvarTheme Shifter is provided as is, free, with no warranty. We are
          not liable for any loss, exam issue, or any other problem caused by
          using it, or by it not working. Do not use it during an online
          proctored exam or quiz.
        </p>
      </LegalSection>
      <LegalSection title="Contact">
        <p>
          If you have a legal question, contact the developer through the
          store listing.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
