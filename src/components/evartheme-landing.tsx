"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  Check,
  Download,
  ExternalLink,
  FolderOpen,
  Globe,
  Image as ImageIcon,
  Layers,
  Moon,
  Power,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import { Isobar } from "@/components/ui/isobar";

type ThemeId = "frost" | "lilac" | "paper";

type ThemeConfig = {
  id: ThemeId;
  label: string;
  color: string;
  background: string;
  isDark: boolean;
  textPrimary: string;
  textMuted: string;
  surfaceBg: string;
  surfaceStrongBg: string;
  borderColor: string;
  buttonBg: string;
  buttonText: string;
  overlayGradient: string;
};

const THEMES: Record<ThemeId, ThemeConfig> = {
  frost: {
    id: "frost",
    label: "frost",
    color: "#b9cce4",
    background: "#07080c",
    isDark: true,
    textPrimary: "#eef3fa",
    textMuted: "#b6c7de",
    surfaceBg: "rgba(7, 8, 12, 0.74)",
    surfaceStrongBg: "rgba(12, 15, 22, 0.88)",
    borderColor: "rgba(185, 204, 228, 0.28)",
    buttonBg: "#b9cce4",
    buttonText: "#07080c",
    overlayGradient:
      "radial-gradient(circle at 50% 30%, rgba(7, 8, 12, 0.34) 0%, rgba(7, 8, 12, 0.72) 100%)",
  },
  lilac: {
    id: "lilac",
    label: "lilac",
    color: "#c8b9ea",
    background: "#0c0910",
    isDark: true,
    textPrimary: "#f3effa",
    textMuted: "#c5b7e5",
    surfaceBg: "rgba(12, 9, 16, 0.74)",
    surfaceStrongBg: "rgba(18, 14, 25, 0.88)",
    borderColor: "rgba(200, 185, 234, 0.28)",
    buttonBg: "#c8b9ea",
    buttonText: "#0c0910",
    overlayGradient:
      "radial-gradient(circle at 50% 30%, rgba(12, 9, 16, 0.34) 0%, rgba(12, 9, 16, 0.72) 100%)",
  },
  paper: {
    id: "paper",
    label: "paper",
    color: "#2a1830",
    background: "#ece4d6",
    isDark: false,
    textPrimary: "#2a1830",
    textMuted: "#4b3453",
    surfaceBg: "rgba(236, 228, 214, 0.82)",
    surfaceStrongBg: "rgba(244, 238, 228, 0.92)",
    borderColor: "rgba(42, 24, 48, 0.28)",
    buttonBg: "#2a1830",
    buttonText: "#ece4d6",
    overlayGradient:
      "radial-gradient(circle at 50% 30%, rgba(236, 228, 214, 0.36) 0%, rgba(236, 228, 214, 0.72) 100%)",
  },
};

const THEME_ORDER: ThemeId[] = ["paper", "frost", "lilac"];

const EDGE_ADDONS_URL =
  "https://microsoftedge.microsoft.com/addons/detail/aiifdkhhddkaidlikcaponeakogckfmn";
const CHROME_DOWNLOAD_URL =
  "https://github.com/p3xz/evar-theme-shifter/releases/download/v1.4.6/evar-theme-shifter-v4.zip";
const EDGE_DOWNLOAD_URL =
  "https://github.com/p3xz/evar-theme-shifter/releases/download/v1.4.6/evar-theme-shifter-edge-v4.zip";
const FIREFOX_DOWNLOAD_URL =
  "https://github.com/p3xz/evar-theme-shifter/releases/download/v1.4.6/evar-theme-shifter-firefox-v4.zip";

const WHAT_IT_DOES_CARDS = [
  {
    title: "Proper dark theme not invert",
    description:
      "Applies clean dark surfaces, soft borders, and readable light text across pages instead of flipping every color on screen.",
    icon: Moon,
  },
  {
    title: "Works on college portal and LMS",
    description:
      "Covers both the college portal and the college LMS automatically as soon as you open them.",
    icon: Globe,
  },
  {
    title: "Images stay normal",
    description:
      "Photos, logos, lecture videos, and embedded PDFs keep their original colors so nothing looks washed out or negative.",
    icon: ImageIcon,
  },
] as const;

const BROWSER_INSTALL_CARDS = [
  {
    browser: "Chrome",
    steps: [
      "Download the zip from the button above",
      "Unzip it, you will get a folder named evar-theme-shifter",
      "Open chrome://extensions in Chrome",
      "Turn on Developer mode, top right",
      "Click Load unpacked",
      "Select the evar-theme-shifter folder, not the zip",
      "Open your college portal or LMS, the dark theme is on",
    ],
  },
  {
    browser: "Edge",
    steps: [
      "Click Get it on Edge in the Download section below",
      "Click Get on the Edge Add-ons page",
      "Click Add extension when Edge asks",
      "Open your college portal or LMS, the dark theme is on",
      "Manual install instead: download the Edge zip, unzip it, open edge://extensions, turn on Developer mode, click Load unpacked and select the unzipped evar-theme-shifter folder",
    ],
  },
  {
    browser: "Firefox",
    steps: [
      "Download the Firefox zip",
      "Unzip it, you will get a folder named evar-theme-shifter-firefox",
      "Open about:debugging#/runtime/this-firefox in Firefox",
      "Click Load Temporary Add-on",
      "Select the manifest.json file inside the evar-theme-shifter-firefox folder",
      "Note: a temporary add-on is removed when Firefox closes, so repeat this step after a restart, or wait for the store version",
    ],
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Is it free?",
    answer: "Yes.",
  },
  {
    question: "Is it on the Edge store?",
    answer:
      "Yes, EvarTheme Shifter is live on Microsoft Edge Add-ons, install it in one click from the Get it on Edge button in the Download section.",
  },
  {
    question: "Does it work on LMS?",
    answer: "Yes, the college LMS is covered.",
  },
  {
    question: "Will my photos and PDFs turn dark?",
    answer: "No.",
  },
  {
    question: "Does it change the site for everyone?",
    answer: "No, only your own browser.",
  },
] as const;

type PreviewPreset = "Dark" | "OLED black" | "Dim";

export function EvarThemeLanding() {
  const [themeId, setThemeId] = useState<ThemeId>("paper");
  const [hasScrolled, setHasScrolled] = useState(false);

  // Interactive preview controls mirroring the Chrome extension features
  const [previewEnabled, setPreviewEnabled] = useState(true);
  const [previewPreset, setPreviewPreset] = useState<PreviewPreset>("Dark");
  const [previewBrightness, setPreviewBrightness] = useState(100);

  const theme = THEMES[themeId];

  useEffect(() => {
    const schemeMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="color-scheme"]'
    );
    if (schemeMeta) {
      schemeMeta.content = theme.isDark ? "dark" : "light";
    }
    const themeColorMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (themeColorMeta) {
      themeColorMeta.content = theme.background;
    }
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.textPrimary;
  }, [theme]);

  useEffect(() => {
    const updateScroll = () => {
      if (window.scrollY > 80) {
        setHasScrolled(true);
      }
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const handleNeedMeClick = () => {
    const nextIndex = (THEME_ORDER.indexOf(themeId) + 1) % THEME_ORDER.length;
    setThemeId(THEME_ORDER[nextIndex]);

    const downloadSection = document.getElementById("download");
    if (downloadSection) {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      downloadSection.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const panelStyle = {
    backgroundColor: theme.surfaceBg,
    borderColor: theme.borderColor,
    color: theme.textPrimary,
  };

  const strongPanelStyle = {
    backgroundColor: theme.surfaceStrongBg,
    borderColor: theme.borderColor,
    color: theme.textPrimary,
  };

  const previewPresetBg =
    !previewEnabled
      ? "#f6f7f9"
      : previewPreset === "OLED black"
        ? "#000000"
        : previewPreset === "Dim"
          ? "#1b202b"
          : "#10131a";

  const previewPresetText = !previewEnabled ? "#171a21" : "#eef3fa";

  return (
    <div
      className="theme-transition relative min-h-screen w-full overflow-x-clip"
      style={{
        backgroundColor: theme.background,
        color: theme.textPrimary,
      }}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Living Isobar background filling the entire viewport */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
        aria-hidden="true"
      >
        <Isobar
          color={theme.color}
          background={theme.background}
          levels={16}
          cell={12}
          markers={true}
          className="h-full min-h-full w-full"
        >
          <div
            className="pointer-events-none flex h-full items-end justify-between p-6 font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: theme.color, opacity: 0.55 }}
          >
            <span>Surface analysis</span>
            <span>1013 hPa</span>
          </div>
        </Isobar>
      </div>

      {/* Subtle readability gradient over contours while keeping contours visible */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: theme.overlayGradient }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Section 1: Hero (full screen) */}
        <section
          id="hero"
          className="flex min-h-screen flex-col justify-between px-5 pb-16 pt-6 sm:px-8 lg:px-12"
        >
          <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/evar-theme-shifter-logo-red.png"
                alt="EvarTheme Shifter logo"
                className="h-9 w-9 shrink-0 object-contain"
              />
              <div>
                <p className="text-base font-semibold tracking-tight sm:text-lg">
                  EvarTheme Shifter
                </p>
                <p
                  className="font-mono text-xs uppercase tracking-[0.14em]"
                  style={{ color: theme.textMuted }}
                >
                  Dark Mode Extension
                </p>
              </div>
            </div>

            <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 sm:gap-5">
              <a
                href="#about"
                className="rounded-md px-2.5 py-1.5 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                About
              </a>
              <a
                href="#what-it-does"
                className="rounded-md px-2.5 py-1.5 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                Overview
              </a>
              <a
                href="#features"
                className="rounded-md px-2.5 py-1.5 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                Features
              </a>
              <a
                href="#install"
                className="rounded-md px-2.5 py-1.5 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                Install
              </a>
              <a
                href="#download"
                className="rounded-md px-2.5 py-1.5 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                Download
              </a>
              <a
                href="#faq"
                className="rounded-md px-2.5 py-1.5 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                FAQ
              </a>
            </nav>
          </header>

          <div className="mx-auto my-auto flex w-full max-w-4xl flex-col items-center py-12 text-center">
            <div
              className="surface-panel theme-transition w-full rounded-3xl border px-6 py-10 backdrop-blur-md sm:px-12 sm:py-14"
              style={panelStyle}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/evar-theme-shifter-logo-red.png"
                alt="EvarTheme Shifter logo"
                className="mx-auto mb-6 h-24 w-24 object-contain sm:h-28 sm:w-28"
              />

              <p
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em]"
                style={{ color: theme.color }}
              >
                EvarTheme Shifter Browser Extension
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                because they didnt do it so eye did
              </h1>

              <p
                className="mt-5 text-pretty text-lg font-medium sm:text-xl"
                style={{ color: theme.color }}
              >
                for the sake of my eyes i had to im sorry dont sue me
              </p>

              <p
                className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg"
                style={{ color: theme.textMuted }}
              >
                Dark mode for your college portal, LMS, Wikipedia, Reddit,
                GitHub and more.
              </p>

              {/* Theme shifter controls */}
              <div className="mt-9 flex flex-col items-center gap-3">
                <span
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: theme.textMuted }}
                >
                  Choose live page theme
                </span>
                <div
                  role="group"
                  aria-label="Isobar theme shifter"
                  className="flex flex-wrap items-center justify-center gap-3"
                >
                  {THEME_ORDER.map((id) => {
                    const item = THEMES[id];
                    const active = themeId === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setThemeId(id)}
                        aria-pressed={active}
                        className="theme-transition inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold capitalize"
                        style={
                          active
                            ? {
                                backgroundColor: theme.buttonBg,
                                color: theme.buttonText,
                                borderColor: theme.buttonBg,
                              }
                            : {
                                backgroundColor: theme.surfaceStrongBg,
                                color: theme.textPrimary,
                                borderColor: theme.borderColor,
                              }
                        }
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border"
                          style={{
                            backgroundColor: item.background,
                            borderColor: item.color,
                          }}
                          aria-hidden="true"
                        />
                        <span>{item.label}</span>
                        {active ? (
                          <Check className="h-4 w-4" aria-hidden="true" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#download"
                  className="theme-transition inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold"
                  style={{
                    backgroundColor: theme.buttonBg,
                    color: theme.buttonText,
                  }}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Get EvarTheme Shifter</span>
                </a>
                <a
                  href="#install"
                  className="theme-transition inline-flex min-h-[48px] items-center gap-2 rounded-xl border px-6 py-3 text-base font-semibold"
                  style={strongPanelStyle}
                >
                  <span>Read install steps</span>
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
            <a
              href="#what-it-does"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-[0.14em]"
              style={panelStyle}
            >
              <span>Scroll to explore</span>
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </section>

        <main id="main-content" className="flex flex-col">
          {/* About section */}
          <section
            id="about"
            className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-12"
          >
            <div
              className="surface-panel theme-transition rounded-3xl border p-8 backdrop-blur-md sm:p-12"
              style={panelStyle}
            >
              <p
                className="font-mono text-xs uppercase tracking-[0.16em]"
                style={{ color: theme.color }}
              >
                About
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                About EvarTheme Shifter
              </h2>
              <p
                className="mt-5 max-w-4xl text-base leading-relaxed sm:text-lg"
                style={{ color: theme.textMuted }}
              >
                EvarTheme Shifter is a free browser extension that adds a proper
                dark theme to your college portal, LMS, Wikipedia, Reddit,
                GitHub, Stack Overflow, Medium, Hacker News and MDN. It is not
                an invert filter. It darkens each page element by element, so
                pills, badges, tables, buttons and dropdowns stay readable, and
                images, logos, videos and PDFs stay normal. Pick Dark, OLED
                black or Dim, set brightness from 70 to 110 percent, and your
                settings save in the browser. It does not collect, store or send
                any data, passwords or browsing history anywhere. Study only. Do
                not use it during an online proctored exam or quiz.
              </p>
            </div>
          </section>

          {/* Section 2: What it does (3 cards) */}
          <section
            id="what-it-does"
            className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-12"
          >
            <div className="mb-12 max-w-2xl">
              <p
                className="font-mono text-xs uppercase tracking-[0.16em]"
                style={{ color: theme.color }}
              >
                What it does
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Built for late night study sessions
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {WHAT_IT_DOES_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="surface-panel theme-transition flex flex-col justify-between rounded-2xl border p-7 backdrop-blur-md"
                    style={panelStyle}
                  >
                    <div>
                      <div
                        className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                        style={strongPanelStyle}
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" style={{ color: theme.color }} />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {card.title}
                      </h3>
                      <p
                        className="mt-3 text-base leading-relaxed"
                        style={{ color: theme.textMuted }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Section 3: Supported sites */}
          <section
            id="supported-sites"
            className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-12"
          >
            <div
              className="surface-panel theme-transition rounded-3xl border p-8 backdrop-blur-md sm:p-12"
              style={panelStyle}
            >
              <div className="max-w-3xl">
                <p
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: theme.color }}
                >
                  Supported sites
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Two separate college sites, both covered
                </h2>
                <p
                  className="mt-4 text-base leading-relaxed sm:text-lg"
                  style={{ color: theme.textMuted }}
                >
                  The college portal and college LMS are separate sites on
                  different web addresses. EvarTheme Shifter supports both out
                  of the box so you do not have to switch tools between checking
                  attendance and reading course notes.
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div
                  className="surface-panel rounded-2xl border p-6"
                  style={strongPanelStyle}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">College portal</h3>
                    <span
                      className="rounded-full border px-3 py-1 font-mono text-xs"
                      style={{ borderColor: theme.borderColor, color: theme.color }}
                    >
                      Student Portal
                    </span>
                  </div>
                  <p
                    className="mt-3 font-mono text-sm"
                    style={{ color: theme.color }}
                  >
                    college portal
                  </p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                    Covers student login, dashboard cards, attendance tables,
                    marks, and schedules.
                  </p>
                </div>

                <div
                  className="surface-panel rounded-2xl border p-6"
                  style={strongPanelStyle}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">College LMS</h3>
                    <span
                      className="rounded-full border px-3 py-1 font-mono text-xs"
                      style={{ borderColor: theme.borderColor, color: theme.color }}
                    >
                      Learning Portal
                    </span>
                  </div>
                  <p
                    className="mt-3 font-mono text-sm"
                    style={{ color: theme.color }}
                  >
                    college LMS
                  </p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                    Covers the college LMS, course pages, lesson modules,
                    downloads, and quizzes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Features */}
          <section
            id="features"
            className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-12"
          >
            <div className="mb-12 max-w-2xl">
              <p
                className="font-mono text-xs uppercase tracking-[0.16em]"
                style={{ color: theme.color }}
              >
                Features
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple controls that remember your setup
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <ul className="grid gap-4">
                <li
                  className="surface-panel flex items-start gap-4 rounded-2xl border p-5 backdrop-blur-md"
                  style={panelStyle}
                >
                  <Power className="mt-0.5 h-5 w-5 shrink-0" style={{ color: theme.color }} aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold">On/off toggle</h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                      Turn dark mode on or off anytime directly from the
                      extension popup.
                    </p>
                  </div>
                </li>

                <li
                  className="surface-panel flex items-start gap-4 rounded-2xl border p-5 backdrop-blur-md"
                  style={panelStyle}
                >
                  <Layers className="mt-0.5 h-5 w-5 shrink-0" style={{ color: theme.color }} aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Dark / OLED black / Dim themes
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                      Pick between classic Dark, pure OLED black, or softer Dim
                      surfaces.
                    </p>
                  </div>
                </li>

                <li
                  className="surface-panel flex items-start gap-4 rounded-2xl border p-5 backdrop-blur-md"
                  style={panelStyle}
                >
                  <SlidersHorizontal
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: theme.color }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Brightness slider 70 to 110 percent
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                      Adjust screen brightness between 70% and 110% to match
                      your room lighting.
                    </p>
                  </div>
                </li>

                <li
                  className="surface-panel flex items-start gap-4 rounded-2xl border p-5 backdrop-blur-md"
                  style={panelStyle}
                >
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: theme.color }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Settings save in Chrome
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                      Your chosen theme, brightness level, and toggle state stay
                      saved across browser restarts.
                    </p>
                  </div>
                </li>

                <li
                  className="surface-panel flex items-start gap-4 rounded-2xl border p-5 backdrop-blur-md"
                  style={panelStyle}
                >
                  <Globe className="mt-0.5 h-5 w-5 shrink-0" style={{ color: theme.color }} aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Works on login, dashboard, tables, lessons and quizzes
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                      Every main view across the college portal and college LMS
                      stays styled and easy to read.
                    </p>
                  </div>
                </li>
              </ul>

              {/* Interactive preview of extension controls */}
              <div
                className="surface-panel flex flex-col justify-between rounded-2xl border p-7 backdrop-blur-md"
                style={panelStyle}
              >
                <div>
                  <p
                    className="font-mono text-xs uppercase tracking-[0.16em]"
                    style={{ color: theme.color }}
                  >
                    Interactive control preview
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    Try the EvarTheme Shifter popup settings
                  </h3>

                  <div className="mt-6 space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium">
                        Extension power
                      </span>
                      <button
                        type="button"
                        aria-pressed={previewEnabled}
                        onClick={() => setPreviewEnabled((v) => !v)}
                        className="inline-flex min-h-[38px] cursor-pointer items-center gap-2 rounded-lg border px-4 py-1.5 text-sm font-semibold"
                        style={
                          previewEnabled
                            ? {
                                backgroundColor: theme.buttonBg,
                                color: theme.buttonText,
                                borderColor: theme.buttonBg,
                              }
                            : strongPanelStyle
                        }
                      >
                        {previewEnabled ? (
                          <Moon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Sun className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span>{previewEnabled ? "On" : "Off"}</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-sm font-medium">
                        Extension theme preset
                      </span>
                      <div className="mt-2.5 grid grid-cols-3 gap-2">
                        {(["Dark", "OLED black", "Dim"] as PreviewPreset[]).map(
                          (preset) => {
                            const selected = previewPreset === preset;
                            return (
                              <button
                                key={preset}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => setPreviewPreset(preset)}
                                className="min-h-[40px] cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold sm:text-sm"
                                style={
                                  selected
                                    ? {
                                        backgroundColor: theme.buttonBg,
                                        color: theme.buttonText,
                                        borderColor: theme.buttonBg,
                                      }
                                    : strongPanelStyle
                                }
                              >
                                {preset}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <label
                          htmlFor="brightness-preview"
                          className="text-sm font-medium"
                        >
                          Brightness slider (70 to 110 percent)
                        </label>
                        <span
                          className="font-mono text-sm font-semibold"
                          style={{ color: theme.color }}
                        >
                          {previewBrightness}%
                        </span>
                      </div>
                      <input
                        id="brightness-preview"
                        type="range"
                        min={70}
                        max={110}
                        value={previewBrightness}
                        onChange={(e) =>
                          setPreviewBrightness(Number(e.target.value))
                        }
                        className="mt-3 h-2 w-full cursor-pointer accent-current"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="mt-7 rounded-xl border p-5 transition-colors"
                  style={{
                    backgroundColor: previewPresetBg,
                    color: previewPresetText,
                    borderColor: theme.borderColor,
                    filter: `brightness(${previewBrightness / 100})`,
                  }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.14em] opacity-75">
                    Sample LMS Dashboard Card
                  </p>
                  <p className="mt-2 text-base font-semibold">
                    Attendance and Course Notes
                  </p>
                  <p className="mt-1 text-sm opacity-80">
                    Mode: {previewEnabled ? previewPreset : "Original light site"}{" "}
                    at {previewBrightness}% brightness.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: How to install tutorial */}
          <section
            id="install"
            className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-12"
          >
            <div
              className="surface-panel theme-transition rounded-3xl border p-8 backdrop-blur-md sm:p-12"
              style={panelStyle}
            >
              <div className="max-w-2xl">
                <p
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: theme.color }}
                >
                  Install tutorial
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  How to install
                </h2>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {BROWSER_INSTALL_CARDS.map((card) => (
                  <article
                    key={card.browser}
                    className="surface-panel flex flex-col rounded-2xl border p-6"
                    style={strongPanelStyle}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-bold">{card.browser}</h3>
                      <FolderOpen
                        className="h-5 w-5 shrink-0"
                        style={{ color: theme.color }}
                        aria-hidden="true"
                      />
                    </div>
                    <ol className="mt-5 space-y-3 text-sm leading-relaxed sm:text-base">
                      {card.steps.map((step, index) => (
                        <li key={step} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold"
                            style={{
                              backgroundColor: theme.buttonBg,
                              color: theme.buttonText,
                            }}
                          >
                            {index + 1}
                          </span>
                          <span style={{ color: theme.textMuted }}>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>

              <p
                className="mt-8 text-xs leading-relaxed sm:text-sm"
                style={{ color: theme.textMuted }}
              >
                To turn it off, click the EvarTheme Shifter icon in the toolbar
                and switch it off. To remove it, go to your extensions page and
                click Remove.
              </p>
            </div>
          </section>

          {/* Section 6: Big scrolled theme button */}
          <section
            aria-label="Quick theme switch and jump to download"
            className="mx-auto flex w-full max-w-6xl items-center justify-center px-5 py-16 sm:px-8 lg:px-12"
          >
            <div
              className={`theme-transition flex flex-col items-center text-center ${
                hasScrolled
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 focus-within:opacity-100"
              }`}
            >
              <button
                type="button"
                onClick={handleNeedMeClick}
                className="theme-transition inline-flex min-h-[68px] cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 px-10 py-5 text-2xl font-bold tracking-tight shadow-2xl hover:scale-[1.02] sm:px-14 sm:py-6 sm:text-3xl"
                style={{
                  backgroundColor: theme.buttonBg,
                  color: theme.buttonText,
                  borderColor: theme.color,
                }}
              >
                <span>oh god you need me</span>
              </button>
              <p
                className="mt-3 font-mono text-xs uppercase tracking-[0.14em]"
                style={{ color: theme.textMuted }}
              >
                Switches the Isobar theme and jumps to download
              </p>
            </div>
          </section>

          {/* Section 7: Download section */}
          <section
            id="download"
            className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-12"
          >
            <div
              className="surface-panel theme-transition flex flex-col items-center rounded-3xl border px-6 py-14 text-center backdrop-blur-md sm:px-12"
              style={panelStyle}
            >
              <p
                className="font-mono text-xs uppercase tracking-[0.16em]"
                style={{ color: theme.color }}
              >
                Download
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
                Get EvarTheme Shifter
              </h2>
              <p
                className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: theme.textMuted }}
              >
                Get it in one click from Microsoft Edge Add-ons, or download
                the zip for Chrome and Firefox and follow the browser install
                steps above.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={EDGE_ADDONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="theme-transition inline-flex min-h-[60px] items-center gap-3 rounded-2xl px-9 py-4 text-lg font-bold shadow-lg hover:scale-[1.02]"
                  style={{
                    backgroundColor: theme.buttonBg,
                    color: theme.buttonText,
                  }}
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  <span>Get it on Edge</span>
                </a>

                <span
                  className="inline-flex min-h-[44px] items-center rounded-xl border px-4 py-2 font-mono text-sm font-semibold"
                  style={strongPanelStyle}
                >
                  v1.4.6
                </span>
              </div>

              <p
                className="mt-4 text-sm"
                style={{ color: theme.textMuted }}
              >
                Official Edge Add-ons listing, one click install, version
                1.4.6.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
                <a
                  href={CHROME_DOWNLOAD_URL}
                  className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:opacity-80"
                  style={{ color: theme.textPrimary }}
                >
                  <span>Download for Chrome (manual install)</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={EDGE_DOWNLOAD_URL}
                  className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:opacity-80"
                  style={{ color: theme.textPrimary }}
                >
                  <span>Edge zip (manual install)</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={FIREFOX_DOWNLOAD_URL}
                  className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:opacity-80"
                  style={{ color: theme.textPrimary }}
                >
                  <span>Firefox</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          {/* Section 8: Credits, Privacy Policy and Legal Terms */}
          <section
            id="legal"
            className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-12"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <article
                className="surface-panel theme-transition rounded-2xl border p-7 backdrop-blur-md"
                style={panelStyle}
              >
                <p
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: theme.color }}
                >
                  Credits
                </p>
                <h2 className="mt-2 text-xl font-bold">Who built this</h2>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  Built by Namish Yadav for college students.
                </p>
              </article>

              <article
                className="surface-panel theme-transition rounded-2xl border p-7 backdrop-blur-md"
                style={panelStyle}
              >
                <p
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: theme.color }}
                >
                  Privacy Policy
                </p>
                <h2 className="mt-2 text-xl font-bold">Your data stays local</h2>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  EvarTheme Shifter runs only in your browser, it does not
                  collect, store or send your data, passwords or browsing
                  history anywhere.
                </p>
                <a
                  href="/privacy"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:opacity-80"
                  style={{ color: theme.textPrimary }}
                >
                  <span>Read the full Privacy Policy</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>

              <article
                className="surface-panel theme-transition rounded-2xl border p-7 backdrop-blur-md"
                style={panelStyle}
              >
                <p
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: theme.color }}
                >
                  Terms of Service
                </p>
                <h2 className="mt-2 text-xl font-bold">Study only</h2>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  By installing EvarTheme Shifter you agree to use it for
                  study only, on your own browser, at your own risk.
                </p>
                <a
                  href="/terms"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:opacity-80"
                  style={{ color: theme.textPrimary }}
                >
                  <span>Read the full Terms of Service</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>

              <article
                className="surface-panel theme-transition rounded-2xl border p-7 backdrop-blur-md"
                style={panelStyle}
              >
                <p
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: theme.color }}
                >
                  Legal Terms
                </p>
                <h2 className="mt-2 text-xl font-bold">Study use notice</h2>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  EvarTheme Shifter is not an official college product, use it
                  for study only, do not use it during an online proctored exam
                  or quiz.
                </p>
                <a
                  href="/legal"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:opacity-80"
                  style={{ color: theme.textPrimary }}
                >
                  <span>Read the full Legal Terms</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>
            </div>
          </section>

          {/* Section 9: FAQ */}
          <section
            id="faq"
            className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-12"
          >
            <div
              className="surface-panel theme-transition rounded-3xl border p-8 backdrop-blur-md sm:p-12"
              style={panelStyle}
            >
              <div className="max-w-2xl">
                <p
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: theme.color }}
                >
                  FAQ
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Common questions
                </h2>
              </div>

              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                {FAQ_ITEMS.map((item) => (
                  <div
                    key={item.question}
                    className="surface-panel rounded-2xl border p-6"
                    style={strongPanelStyle}
                  >
                    <dt className="text-lg font-semibold">{item.question}</dt>
                    <dd
                      className="mt-2 text-base leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </main>

        {/* Section 10: Footer */}
        <footer
          className="mt-10 border-t px-5 py-10 backdrop-blur-md sm:px-8 lg:px-12"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: theme.surfaceBg,
          }}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="font-semibold">EvarTheme Shifter</span>
              <span style={{ color: theme.color }}>Dark Mode Extension</span>
              <a
                href="/privacy"
                className="underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                Terms of Service
              </a>
              <a
                href="/legal"
                className="underline-offset-4 hover:underline"
                style={{ color: theme.textMuted }}
              >
                Legal
              </a>
            </div>
            <p className="text-sm" style={{ color: theme.textMuted }}>
              Built for college students.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
