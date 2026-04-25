import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
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
  title: "Clearfield — Microsoft 365 & Modern Work consulting",
  description:
    "Hands-on Microsoft 365 consulting: Entra ID, Intune, Defender, AVD, baselines, and rollout execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <p>
            Clearfield · Modern Work consulting ·{" "}
            <Link href="/book" className="text-amber-700 hover:underline dark:text-amber-400">
              Book
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
