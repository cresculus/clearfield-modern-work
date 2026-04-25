import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works | Clearfield",
  description: "Credits, sessions, and what to expect when you book Clearfield consulting.",
};

const steps = [
  {
    title: "1. Overview",
    body: "Start on the Book hub. You will see what a session covers, how credits work, and what to prepare.",
  },
  {
    title: "2. Your email",
    body: "We create a lightweight account tied to your work email. New visitors receive one welcome credit for an intro session.",
  },
  {
    title: "3. Pick a time",
    body: "Sessions are 45 minutes, offered during US Eastern business hours. Each booking uses one credit.",
  },
  {
    title: "4. Confirmation",
    body: "You will see a confirmation screen with your slot. Calendar automation can be added later; for now, expect email follow-up.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">How it works</h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        Clearfield is built for busy IT leaders who need sharp Microsoft 365 execution—not generic slide decks.
      </p>

      <ol className="mt-12 space-y-6">
        {steps.map((s) => (
          <li
            key={s.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{s.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
        <h2 className="font-semibold text-zinc-900 dark:text-white">Credits &amp; packs</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          After your welcome credit, you add credits (today via a secured dev API; production typically uses Stripe).
          One credit equals one scheduled block.
        </p>
      </section>

      <Link
        href="/book"
        className="mt-10 inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
      >
        Start booking
      </Link>
    </div>
  );
}
