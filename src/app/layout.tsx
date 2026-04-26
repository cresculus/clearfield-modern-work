import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { PaletteTester } from "@/components/PaletteTester";
import { getCurrentUser, isOwnerEmail } from "@/lib/auth";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const showAdmin = user?.email && isOwnerEmail(user.email);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col text-zinc-100">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="site-footer py-10 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
            <div>
              <p className="text-sm font-semibold text-white">Clearfield IT</p>
              <p className="mt-1 text-xs text-zinc-200/80">
                Modern Work consulting
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-100">
              <Link href="/#services" className="site-footer-link">
                Services
              </Link>
              <Link href="/#flow" className="site-footer-link">
                Flow
              </Link>
              <Link href="/#contact" className="site-footer-link">
                Contact
              </Link>
              <Link href="/dashboard" className="site-footer-link">
                Dashboard
              </Link>
              <Link href="/account" className="site-footer-link">
                Account
              </Link>
              {showAdmin && <Link href="/admin" className="site-footer-link">Admin</Link>}
            </div>
          </div>
        </footer>
        <PaletteTester />
      </body>
    </html>
  );
}
