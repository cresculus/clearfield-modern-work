import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Services | Clearfield",
  description: "AI Agent Operator consulting: workflow design, MCP integration, automation, and operator playbooks.",
};

export default function ServicesPage() {
  return (
    <div className="hero-grid">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-fuchsia-300">Services</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">AI Agent Operator consulting scope</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
          This page explains how we move teams from ad-hoc AI usage to structured agent operations that produce measurable outcomes.
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
              <li>Agent-ready SOPs and repeatable execution playbooks.</li>
              <li>Faster research and delivery loops through multi-step agent workflows.</li>
              <li>Cross-tool automation that reduces manual handoffs and context loss.</li>
              <li>Operator dashboards for customer context, notes, and activity timelines.</li>
            </ul>
          </section>
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white">Engagement format</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300">
              <li>Focused build sessions aligned to a specific workflow or use case.</li>
              <li>Hands-on implementation with your real tools and operating constraints.</li>
              <li>Written specs, operating instructions, and improvement backlog.</li>
              <li>Optional ongoing optimization cadence as teams scale agent usage.</li>
            </ul>
          </section>
        </div>

        <section className="glass mt-8 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Not included by default</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            Full custom software product development and 24/7 managed operations are outside the base consulting scope unless
            explicitly contracted.
          </p>
        </section>

        <section className="glass mt-8 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Suggested starting points</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Knowledge work bottlenecks</p>
              <p className="mt-1 text-sm text-zinc-300">Start with research and drafting loops powered by constrained agents.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Fragmented operations</p>
              <p className="mt-1 text-sm text-zinc-300">Start with tool chaining and handoff automation across your stack.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">No governance model</p>
              <p className="mt-1 text-sm text-zinc-300">Start with agent roles, constraints, and escalation design.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Scale phase</p>
              <p className="mt-1 text-sm text-zinc-300">Start with operator metrics, QA loops, and workflow performance tuning.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Open dashboard
          </Link>
          <Link
            href="/#flow"
            className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
          >
            See operator workflow
          </Link>
        </div>
      </div>
    </div>
  );
}
