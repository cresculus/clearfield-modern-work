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
              Build an AI Agent Operator capability inside your business.
            </h1>
            <p className="landing-tagline">From AI education to integrated agent systems that execute real work.</p>
            <p className="landing-subtitle">
              The next role every company needs is the Agent Operator: someone who designs agent workflows, connects tools and
              data, monitors performance, and turns business goals into repeatable execution systems.
            </p>

            <div className="landing-pills">
              <span className="landing-pill landing-pill--cyan">MCP integration</span>
              <span className="landing-pill landing-pill--violet">CLI-first automation</span>
              <span className="landing-pill landing-pill--emerald">Human + agent operations</span>
            </div>

            <HeroJourney />

            <div className="landing-actions">
              <Link href="/dashboard" className="landing-btn landing-btn-primary">
                Open customer dashboard
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
          <p className="landing-section-title">Who you work with</p>
          <h2 className="landing-section-heading">Brandon Sardelli</h2>
          <p className="landing-lead">
            AI Agent Operator consultant focused on operational transformation. I help teams learn AI, integrate it into workflows,
            and deploy practical automation that compounds output.
          </p>
          <dl className="landing-facts">
            <div className="landing-fact">
              <dt>Core focus</dt>
              <dd>Agent-enabled workflows across marketing, operations, legal, finance, and technical teams.</dd>
            </div>
            <div className="landing-fact">
              <dt>Session format</dt>
              <dd>Hands-on operating sessions: strategy, system design, implementation, and operator training.</dd>
            </div>
            <div className="landing-fact">
              <dt>Output</dt>
              <dd>Playbooks, automation plans, and executable next steps your team can run immediately.</dd>
            </div>
          </dl>
          <div className="landing-card-grid mt-6">
            <div className="landing-card">
              <h3>When teams usually reach out</h3>
              <p>They are using AI tools, but outcomes are scattered and there is no operator model or system ownership.</p>
            </div>
            <div className="landing-card">
              <h3>What happens after each session</h3>
              <p>You get a tighter workflow map, clearer agent roles, and concrete implementation actions for the next sprint.</p>
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
          <p className="landing-section-title">How it works</p>
          <h2 className="landing-section-heading">From AI curiosity to operational systems</h2>
          <div className="landing-steps">
            {[
              { k: "01", title: "Assess workflow leverage", body: "Identify where agents can remove bottlenecks and multiply team output." },
              { k: "02", title: "Design operator playbooks", body: "Define roles, constraints, memory, tools, and escalation paths." },
              { k: "03", title: "Deploy and optimize", body: "Implement automation, monitor quality, and iterate performance continuously." },
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
              Founders, operators, and team leads who want a practical Human + Agent operating model, not disconnected AI experiments.
            </p>
          </div>
        </section>

        <section className="landing-section border-t border-white/5">
          <p className="landing-section-title">FAQ</p>
          <h2 className="landing-section-heading">Common questions</h2>
          <div className="landing-card-grid">
            <article className="landing-card">
              <h3>Is this AI training or implementation?</h3>
              <p>Both. You learn while we build systems your team can run and improve.</p>
            </article>
            <article className="landing-card">
              <h3>Do we need engineers for this?</h3>
              <p>Not always. Many workflows can be deployed with operator playbooks + integrations before custom engineering.</p>
            </article>
            <article className="landing-card">
              <h3>What skills will our team develop?</h3>
              <p>MCP literacy, CLI workflow fluency, clear spec writing, and practical agent governance.</p>
            </article>
            <article className="landing-card">
              <h3>Can this be used across departments?</h3>
              <p>Yes. Marketing, legal, finance, operations, and technical functions are all becoming agent-compatible.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="landing-section border-t border-white/5 pb-24 scroll-mt-24">
          <div className="landing-cta-panel">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Ready when you are</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-300">
              Start building your Agent Operator function now. Learn the model, integrate it into workflows, and ship automation with confidence.
            </p>
            <div className="landing-actions !mt-6 !justify-start">
              <Link href="/dashboard" className="landing-btn landing-btn-primary">
                Open dashboard
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
