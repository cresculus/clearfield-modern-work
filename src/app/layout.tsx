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
  title: {
    default: "Clearfield — Microsoft 365 & Modern Work consulting",
    template: "%s | Clearfield",
  },
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
      <body className="flex min-h-full flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 bg-white py-10 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">Clearfield</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Modern Work consulting · Microsoft 365, identity, endpoints, security, AVD
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <Link href="/services" className="hover:text-amber-700 dark:hover:text-amber-400">
                Services
              </Link>
              <Link href="/how-it-works" className="hover:text-amber-700 dark:hover:text-amber-400">
                How it works
              </Link>
              <Link href="/contact" className="hover:text-amber-700 dark:hover:text-amber-400">
                Contact
              </Link>
              <Link href="/book" className="hover:text-amber-700 dark:hover:text-amber-400">
                Book
              </Link>
              <Link href="/account" className="hover:text-amber-700 dark:hover:text-amber-400">
                Account
              </Link>
              <Link href="/admin" className="hover:text-amber-700 dark:hover:text-amber-400">
                Admin
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
