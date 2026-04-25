import Link from "next/link";
import type { Metadata } from "next";
import { BookStepsNav } from "@/components/BookStepsNav";
import { ExtensionTip } from "@/components/ExtensionTip";

export const metadata: Metadata = {
  title: "Book",
  description: "Schedule a Microsoft 365 / Modern Work consulting session with Clearfield.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="font-medium text-amber-700 hover:underline dark:text-amber-400">
            ← Home
          </Link>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Book a session
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          Four quick steps: overview, account check, choose a time (US Eastern business hours), then confirmation.
          Credits are tied to your signed-in account.
        </p>
        <div className="mt-6">
          <ExtensionTip />
        </div>
        <div className="mt-8">
          <BookStepsNav />
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-xl shadow-zinc-200/40 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
