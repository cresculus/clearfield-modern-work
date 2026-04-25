import Link from "next/link";

const services = [
  {
    title: "Entra ID & identity",
    body: "Join types, hybrid identity, Conditional Access, MFA posture, guest access, and least-privilege RBAC patterns.",
  },
  {
    title: "Microsoft Intune & endpoints",
    body: "Enrollment, compliance, baselines, Windows Autopilot, Apple Business Manager, apps, Tunnel, scope tags, and multi-tenant hygiene.",
  },
  {
    title: "Defender & Secure Score",
    body: "Defender for Endpoint alignment with Intune, ASR, disk encryption, reporting, and prioritizing remediation.",
  },
  {
    title: "Azure Virtual Desktop",
    body: "Host pools, images, sizing, patching cadence, and Intune integration for session hosts.",
  },
  {
    title: "Baselines & hardening",
    body: "CIS-style controls, Solution Baselines / policy rollout sequencing, drift review, and enforcement planning.",
  },
  {
    title: "Go-live execution",
    body: "Structured kickoff → configuration → validation → handoff—the same motion as enterprise onboarding, for your tenant.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-amber-700 dark:text-amber-400">
          Clearfield
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Modern Work consulting you can <span className="text-amber-600 dark:text-amber-400">actually ship</span>.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          Microsoft 365, Entra ID, Intune, Defender, and AVD—advisory when you need direction, hands-on keyboard when you
          need it done. One free intro session for new visitors; then book with consultant credits.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-amber-400"
          >
            Book a session
          </Link>
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500"
          >
            Services
          </a>
        </div>
      </div>

      <section id="services" className="mt-20 scroll-mt-24">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Microsoft 365 &amp; platform scope
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <li
              key={s.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white p-8 dark:border-amber-900/40 dark:from-amber-950/40 dark:to-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">How booking works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>Reserve a time on the Book page with your work email.</li>
          <li>Your account starts with one free credit for an intro session.</li>
          <li>Buy consultant credits when you need more depth; each credit covers one scheduled block.</li>
        </ol>
        <Link
          href="/book"
          className="mt-6 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Open booking
        </Link>
      </section>
    </div>
  );
}
