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
    <div className="hero-grid border-t border-white/10">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm text-zinc-400">
          <Link href="/" className="font-medium text-fuchsia-300 hover:underline">
            ← Home
          </Link>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Book a session
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-300">
          Four quick steps: overview, account check, choose a time (US Eastern business hours), then confirmation.
          Credits are tied to your signed-in account.
        </p>
        <div className="mt-4 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">1 credit = 45 minutes</div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Intro credit for new users</div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Focused next-step summary included</div>
        </div>
        <div className="mt-6">
          <ExtensionTip />
        </div>
        <div className="mt-8">
          <BookStepsNav />
        </div>
        <div className="glass rounded-2xl p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
