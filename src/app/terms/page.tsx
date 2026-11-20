import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | EvarTheme Shifter",
  description:
    "Terms for using EvarTheme Shifter: study only, on your own browser, at your own risk.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        By installing or using EvarTheme Shifter, you agree to these terms.
        If you do not agree, do not install it, and remove it if you already
        have.
      </p>
      <LegalSection title="What it is">
        <p>
          EvarTheme Shifter is a free browser extension that adds a dark theme
          to your college portal, LMS, Wikipedia, Reddit, GitHub, Stack
          Overflow, Medium, Hacker News and MDN, in your own browser only. It
          changes how those pages look on your screen. It does not change the
          sites themselves, and it does not change them for anyone else.
        </p>
      </LegalSection>
      <LegalSection title="Use">
        <ul className="list-disc space-y-2 pl-5">
          <li>Use it for study only, on your own browser, on your own device.</li>
          <li>
            Do not use it during an online proctored exam or quiz. Proctoring
            software may treat any extension as a violation, and that is your
            responsibility, not ours.
          </li>
          <li>
            Do not use it to cheat, to hide activity, or to break any rule of
            your college, your exam, or any site you visit.
          </li>
          <li>
            You are responsible for following the rules of your college and of
            every site you use.
          </li>
        </ul>
      </LegalSection>
      <LegalSection title="No account, no data">
        <p>
          There is no account, no sign up, and no data collected. Your
          settings save only in your browser.
        </p>
      </LegalSection>
      <LegalSection title="As is, no warranty">
        <p>
          EvarTheme Shifter is provided as is, free, with no warranty of any
          kind. It may stop working, or look wrong, if a site changes its
          design. We are not liable for any loss, missed deadline, exam issue,
          or any other problem caused by using it, or by it not working.
        </p>
      </LegalSection>
      <LegalSection title="Changes">
        <p>
          We may update the extension and these terms. The new version will be
          published with the next extension update, and the Last updated date
          above will change. Continuing to use the extension after an update
          means you accept the new terms.
        </p>
      </LegalSection>
      <LegalSection title="Removal">
        <p>
          You can remove the extension at any time from your browser&apos;s
          extensions page. Removing it stops the dark theme and deletes its
          settings from your browser.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
