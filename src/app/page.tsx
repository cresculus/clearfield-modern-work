import Link from "next/link";
import { SERVICES } from "@/lib/services-content";
import { NewsletterSignup } from "@/components/NewsletterSignup";

function HeroJourney() {
  return (
    <div className="landing-journey" aria-hidden="true">
      <svg className="landing-journey-svg" viewBox="0 0 400 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="landing-journey-track"
          d="M 0 16 Q 100 4, 200 16 T 400 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="1"
        />
        <path
          className="landing-journey-draw"
          d="M 0 16 Q 100 4, 200 16 T 400 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
        />
      </svg>
      <div className="landing-journey-labels">
        <span>Account</span>
        <span>Credits</span>
        <span>Book</span>
        <span>Ship</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-glow" aria-hidden="true" />
        <div className="landing-hero-orbs" aria-hidden="true">
          <div
            className="landing-orb h-48 w-48 bg-violet-600/40"
            style={{ top: "8%", left: "5%" }}
          />
          <div
            className="landing-orb h-56 w-56 bg-teal-500/30"
            style={{ bottom: "12%", right: "8%" }}
          />
        </div>

        <div className="landing-container">
          <div className="landing-hero-inner landing-stagger">
            <p className="landing-banner">Clearfield · AI Agent Operator</p>
            <h1 className="landing-title landing-gradient-text">
              Build a 10-year AI + M365 operating advantage.
            </h1>
            <p className="landing-tagline">From modern work consulting to AI operator systems that execute real business workflows.</p>
            <p className="landing-subtitle">
              I help M365-based organizations implement AI agent workflows safely, with governance and measurable business outcomes.
            </p>

            <div className="landing-pills">
              <span className="landing-pill landing-pill--cyan">MCP integration</span>
              <span className="landing-pill landing-pill--violet">CLI-first automation</span>
              <span className="landing-pill landing-pill--emerald">Human + agent operations</span>
            </div>

            <HeroJourney />

            <div className="landing-actions">
              <Link href="/dashboard" className="landing-btn landing-btn-primary">
                Build your roadmap
              </Link>
              <Link href="/account" className="landing-btn landing-btn-secondary">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="landing-container">
        <section className="landing-section border-t border-white/5">
          <p className="landing-section-title">Positioning</p>
          <h2 className="landing-section-heading">Brandon Sardelli</h2>
          <p className="landing-lead">
            AI + Modern Work operator consultant focused on long-term capability building. We combine M365 governance, AI operations,
            and practical automation so your team can ship outcomes consistently.
          </p>
          <dl className="landing-facts">
            <div className="landing-fact">
              <dt>Positioning statement</dt>
              <dd>I help M365-based organizations implement AI agent workflows safely, with governance and measurable business outcomes.</dd>
            </div>
            <div className="landing-fact">
              <dt>Core niche</dt>
              <dd>M365 admin, security, compliance, Copilot adoption, and automation playbooks.</dd>
            </div>
            <div className="landing-fact">
              <dt>Operating model</dt>
              <dd>Human + agent workflows with clear guardrails, escalation paths, and KPI accountability.</dd>
            </div>
          </dl>
          <div className="landing-card-grid mt-6">
            <div className="landing-card">
              <h3>What partners buy</h3>
              <p>Repeatable deliverables: assessment, roadmap, implementation sprint, and managed optimization support.</p>
            </div>
            <div className="landing-card">
              <h3>What partners build</h3>
              <p>A durable in-house operating capability that improves quality, speed, and output every quarter.</p>
            </div>
          </div>
        </section>

        <section id="services" className="landing-section scroll-mt-24 border-t border-white/5">
          <p className="landing-section-title">Capabilities</p>
          <h2 className="landing-section-heading">What an Agent Operator does</h2>
          <p className="landing-lead">Designs agent behavior, connects systems, and orchestrates outcomes over time.</p>
          <ul className="landing-card-grid landing-card-grid--services list-none p-0">
            {SERVICES.map((s) => (
              <li key={s.title} className="landing-card float">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm leading-relaxed text-zinc-300">
              The bottleneck is no longer AI capability. It is implementation inside real-world workflows.
            </p>
          </div>
        </section>

        <section id="flow" className="landing-section border-t border-white/5 scroll-mt-24">
          <p className="landing-section-title">10-year roadmap</p>
          <h2 className="landing-section-heading">A simple long-term build plan for partners</h2>
          <div className="landing-steps">
            {[
              {
                k: "Years 1-2",
                title: "Become elite in one niche",
                body: "Focus on M365 admin, security, compliance, Copilot, and automation playbooks. Ship assessments, roadmaps, and implementation sprints.",
              },
              {
                k: "Years 3-5",
                title: "Productize consulting",
                body: "Turn delivery into fixed packages, templates, SOPs, and onboarding kits. Build recurring revenue through retainers and managed optimization.",
              },
              {
                k: "Years 6-10",
                title: "Build an operator firm",
                body: "Expand with trained operators/contractors while leadership focuses on sales, standards, and design. Add training, licensing, and lightweight SaaS.",
              },
            ].map((step) => (
              <div key={step.k} className="landing-step">
                <p className="landing-step-kicker">{step.k}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section border-t border-white/5">
          <p className="landing-section-title">Proof</p>
          <h2 className="landing-section-heading">Why this role matters now</h2>
          <div className="landing-quote-grid">
            <blockquote className="landing-quote">
              &ldquo;The shift is from humans using software to humans managing autonomous agents that execute work.&rdquo;
            </blockquote>
            <blockquote className="landing-quote">
              &ldquo;One strong Agent Operator can replace fragmented workflows and multiply output without adding headcount.&rdquo;
            </blockquote>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold text-white">Who this is for</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Founders and operators who want stable execution systems they can own, not temporary AI hype.
            </p>
          </div>
        </section>

        <section className="landing-section border-t border-white/5">
          <p className="landing-section-title">What to learn next</p>
          <h2 className="landing-section-heading">Priority stack for long-term stability + growth</h2>
          <div className="landing-card-grid">
            <article className="landing-card">
              <h3>Business architecture</h3>
              <p>Process mapping, KPI design, and ROI framing so automation ties to business outcomes.</p>
            </article>
            <article className="landing-card">
              <h3>AI operations</h3>
              <p>Agent workflows, evaluation loops, guardrails, and monitoring for safe, reliable delivery.</p>
            </article>
            <article className="landing-card">
              <h3>M365 + AI integration</h3>
              <p>Copilot, Power Platform, SharePoint/Teams workflow systems, and governance-first rollout.</p>
            </article>
            <article className="landing-card">
              <h3>Automation stack + leverage</h3>
              <p>Low-code orchestration, API connectivity, proposal/pricing discipline, and distribution through case studies + LinkedIn authority.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="landing-section border-t border-white/5 pb-24 scroll-mt-24">
          <div className="landing-cta-panel">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Ready when you are</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-300">
              Start with the 90-day execution plan: niche definition, offer design, first playbook, first case study, and first repeatable revenue system.
            </p>
            <div className="landing-actions !mt-6 !justify-start">
              <Link href="/dashboard" className="landing-btn landing-btn-primary">
                Start 90-day plan
              </Link>
              <Link href="/account" className="landing-btn landing-btn-secondary">
                Create account
              </Link>
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-sm font-semibold text-white">Updates</h3>
              <p className="mt-1 text-xs text-zinc-400">Low-volume list: AI operations notes, playbooks, and availability.</p>
              <div className="mt-4">
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
