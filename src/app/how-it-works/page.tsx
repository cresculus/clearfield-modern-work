import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works | Clearfield",
  description: "How Clearfield builds AI Agent Operator systems: assessment, design, implementation, and optimization.",
};

const steps = [
  {
    title: "1. Identify leverage",
    body: "Map where your team loses time and where agents can execute work loops with the highest operational leverage.",
  },
  {
    title: "2. Design agent behavior",
    body: "Translate business objectives into roles, constraints, memory, and tool interactions that agents can execute safely.",
  },
  {
    title: "3. Build workflow systems",
    body: "Connect MCPs, CLIs, documents, and data into repeatable pipelines that support real daily operations.",
  },
  {
    title: "4. Operate and optimize",
    body: "Monitor outputs, correct drift, and continuously improve agent performance as teams become human + agent hybrids.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-white">How the Agent Operator model works</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">
        The goal is not just using AI tools. The goal is operating agent systems that produce measurable business outcomes.
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
        <h2 className="font-semibold text-white">Required operator capabilities</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
          <li>MCP fluency for structured tool and context access.</li>
          <li>CLI comfort for programmable, repeatable workflows.</li>
          <li>Clear writing for specs, instructions, and agent definitions.</li>
          <li>Business acumen to automate leverage, not noise.</li>
        </ul>
      </section>

      <section className="glass mt-6 rounded-2xl p-6">
        <h2 className="font-semibold text-white">What to prepare before kickoff</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
          <li>Your highest-friction workflows and current bottlenecks.</li>
          <li>Current tools, data systems, and where handoffs break.</li>
          <li>Target outcomes: speed, quality, capacity, or cost reduction.</li>
        </ul>
      </section>

      <section className="glass mt-6 rounded-2xl p-6">
        <h2 className="font-semibold text-white">After the session</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
          <li>You get an implementation-focused operator plan.</li>
          <li>We define next build steps, guardrails, and measurement points.</li>
          <li>Follow-up execution sessions can scale the system across teams.</li>
        </ul>
      </section>

      <Link
        href="/dashboard"
        className="mt-10 inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
      >
        Open dashboard
      </Link>
    </div>
  );
}
