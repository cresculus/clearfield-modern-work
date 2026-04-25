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
      <h1 className="text-4xl font-bold tracking-tight text-white">Flow</h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-300">Simple, fast, no fluff.</p>

      <ol className="mt-12 space-y-6">
        {steps.map((s) => (
          <li
            key={s.title}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-white">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{s.body}</p>
          </li>
        ))}
      </ol>

      <section className="glass mt-12 rounded-2xl p-6">
        <h2 className="font-semibold text-white">Credits</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
          <li>1 credit = 45-minute session + brief written next-steps summary.</li>
          <li>Booked-session response target: one business day.</li>
          <li>Managed/on-call operations are out-of-scope unless explicitly contracted.</li>
        </ul>
      </section>

      <Link
        href="/book"
        className="mt-10 inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
      >
        Start booking
      </Link>
    </div>
  );
}
