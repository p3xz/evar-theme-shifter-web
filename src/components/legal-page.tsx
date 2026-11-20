import type { ReactNode } from "react";
import Link from "next/link";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#07080c", color: "#eef3fa" }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-5 pt-6 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-2 py-1.5 text-base font-semibold tracking-tight underline-offset-4 hover:underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/evar-theme-shifter-logo-red.png"
            alt="EvarTheme Shifter logo"
            className="h-9 w-9 shrink-0 object-contain"
          />
          <span>EvarTheme Shifter</span>
        </Link>
        <Link
          href="/"
          className="rounded-md px-2.5 py-1.5 text-sm font-medium underline-offset-4 hover:underline"
          style={{ color: "#b6c7de" }}
        >
          Back to home
        </Link>
      </header>
      <main
        id="main-content"
        className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8"
      >
        <article
          className="rounded-3xl border p-8 backdrop-blur-md sm:p-12"
          style={{
            backgroundColor: "rgba(7, 8, 12, 0.74)",
            borderColor: "rgba(185, 204, 228, 0.28)",
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.16em]"
            style={{ color: "#b9cce4" }}
          >
            EvarTheme Shifter
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#b6c7de" }}>
            Last updated: 20 November 2026. Version: 1.4.6
          </p>
          <div className="mt-8 space-y-8 text-base leading-relaxed">
            {children}
          </div>
        </article>
      </main>
      <footer
        className="border-t px-5 py-10 sm:px-8"
        style={{
          borderColor: "rgba(185, 204, 228, 0.28)",
          backgroundColor: "rgba(7, 8, 12, 0.74)",
        }}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
            <span className="font-semibold">EvarTheme Shifter</span>
            <Link href="/privacy" className="underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <Link href="/legal" className="underline-offset-4 hover:underline">
              Legal
            </Link>
          </div>
          <p className="text-sm" style={{ color: "#b6c7de" }}>
            Built for college students.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3" style={{ color: "#b6c7de" }}>
        {children}
      </div>
    </section>
  );
}
