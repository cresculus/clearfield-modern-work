import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works | Clearfield",
  description: "Credits, sessions, and what to expect when you book Clearfield consulting.",
};

const steps = [
  {
    title: "1. Review scope",
    body: "Start on the Book page. Confirm this is the right fit and identify the most important blocker to discuss first.",
  },
  {
    title: "2. Create account",
    body: "Register with work or Gmail. Your profile stores credits, booking history, and account details in one place.",
  },
  {
    title: "3. Use credits and choose time",
    body: "New accounts get an intro credit. Additional sessions use purchased credit packs. Sessions are 45 minutes in US Eastern hours.",
  },
  {
    title: "4. Execute and follow up",
    body: "After booking, you receive confirmation and a focused session. You leave with practical next steps, not generic talking points.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-white">How booking works</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">
        This flow keeps everything clear: account, credits, booking, then execution. No hidden process and no vague outcomes.
      </p>

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
        <h2 className="font-semibold text-white">Credit model and expectations</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
          <li>1 credit = 45-minute session + brief written next-steps summary.</li>
          <li>Credits are consumed when a slot is booked.</li>
          <li>Response/coordination target after booking: one business day.</li>
          <li>Managed/on-call operations are out-of-scope unless separately contracted.</li>
        </ul>
      </section>

      <section className="glass mt-6 rounded-2xl p-6">
        <h2 className="font-semibold text-white">What to prepare before your session</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
          <li>Your current pain points and desired outcome.</li>
          <li>Tenant context: size, licensing, and current tooling where relevant.</li>
          <li>Any deadlines or active projects we must align to.</li>
        </ul>
      </section>

      <section className="glass mt-6 rounded-2xl p-6">
        <h2 className="font-semibold text-white">After the session</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
          <li>You get a short implementation-oriented summary.</li>
          <li>Prioritized next actions are listed in execution order.</li>
          <li>If needed, book follow-up sessions to work through remaining blockers.</li>
        </ul>
      </section>

      <Link
        href="/book"
        className="mt-10 inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
      >
        Continue to booking
      </Link>
    </div>
  );
}
