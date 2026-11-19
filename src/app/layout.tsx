import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EvarTheme Shifter | Dark Mode Browser Extension",
  description:
    "Dark mode for your college portal, LMS, Wikipedia, Reddit, GitHub and more.",
  openGraph: {
    title: "EvarTheme Shifter | Dark Mode Browser Extension",
    description:
      "Dark mode for your college portal, LMS, Wikipedia, Reddit, GitHub and more.",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ece4d6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
