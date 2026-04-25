import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { getCurrentUser } from "@/lib/auth";
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
  const showAdmin = user?.email.toLowerCase() === "brandon.sardelli@gmail.com";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#070810] text-zinc-100">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 bg-[#090b16] py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
            <div>
              <p className="text-sm font-semibold text-white">Clearfield IT</p>
              <p className="mt-1 text-xs text-zinc-400">
                Modern Work consulting
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-300">
              <Link href="/services" className="hover:text-fuchsia-300">
                Services
              </Link>
              <Link href="/how-it-works" className="hover:text-fuchsia-300">
                Flow
              </Link>
              <Link href="/contact" className="hover:text-fuchsia-300">
                Contact
              </Link>
              <Link href="/book" className="hover:text-fuchsia-300">
                Book
              </Link>
              <Link href="/account" className="hover:text-fuchsia-300">
                Account
              </Link>
              {showAdmin && <Link href="/admin" className="hover:text-fuchsia-300">Admin</Link>}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
