import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Services | Clearfield",
  description: "Microsoft 365, Entra ID, Intune, Defender, AVD, and go-live consulting services.",
};

export default function ServicesPage() {
  return (
    <div className="hero-grid">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-fuchsia-300">Services</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">Microsoft 365 consulting scope</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
          This page explains exactly what Clearfield does, what deliverables you get, and how to choose the right starting point.
        </p>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <li
              key={s.title}
              className="glass rounded-2xl p-5 transition hover:translate-y-[-2px]"
            >
              <h2 className="text-lg font-semibold text-white">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{s.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white">Typical outcomes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300">
              <li>Conditional Access baseline with safer rollout sequence.</li>
              <li>Intune compliance and configuration profile cleanup.</li>
              <li>Defender policy tuning with prioritized remediation list.</li>
              <li>AVD host-pool, image, and patching recommendations.</li>
            </ul>
          </section>
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white">Engagement format</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300">
              <li>45-minute focused sessions (1 credit each).</li>
              <li>Agenda-driven calls aligned to your active projects.</li>
              <li>Brief written summary with next steps after each session.</li>
              <li>No long-term lock-in required.</li>
            </ul>
          </section>
        </div>

        <section className="glass mt-8 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Not included by default</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            This offer is consulting and implementation guidance. Ongoing managed services, after-hours incident response, and
            24/7 support are only available via separate agreement.
          </p>
        </section>

        <section className="glass mt-8 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Suggested starting points</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Security posture drift</p>
              <p className="mt-1 text-sm text-zinc-300">Start with Defender + Conditional Access review and rollout guardrails.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Intune rollout friction</p>
              <p className="mt-1 text-sm text-zinc-300">Start with enrollment, compliance conflicts, and baseline cleanup plan.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">AVD stability concerns</p>
              <p className="mt-1 text-sm text-zinc-300">Start with host pool sizing, image lifecycle, and patching pattern.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Go-live preparation</p>
              <p className="mt-1 text-sm text-zinc-300">Start with execution checklist and deployment sequencing before launch.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/book"
            className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Book now
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
          >
            See process and credits
          </Link>
        </div>
      </div>
    </div>
  );
}
