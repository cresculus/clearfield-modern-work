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
            <p className="landing-banner">Clearfield · Modern Work</p>
            <h1 className="landing-title landing-gradient-text">
              Microsoft 365 problems solved with execution, not fluff.
            </h1>
            <p className="landing-tagline">For MSPs and internal IT teams that need outcomes fast.</p>
            <p className="landing-subtitle">
              Clearfield is a focused consulting workflow: create an account, use intro credits, book a session, and leave with
              a concrete implementation plan you can apply immediately.
            </p>

            <div className="landing-pills">
              <span className="landing-pill landing-pill--cyan">Identity &amp; CA</span>
              <span className="landing-pill landing-pill--violet">Endpoint baselines</span>
              <span className="landing-pill landing-pill--emerald">Secure Score motion</span>
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
            Modern Work consultant and go-live engineer. You get enterprise-grade standards adapted to your tenant size, risk profile,
            and timeline.
          </p>
          <dl className="landing-facts">
            <div className="landing-fact">
              <dt>Core focus</dt>
              <dd>Microsoft 365 identity, endpoint, security, and AVD delivery.</dd>
            </div>
            <div className="landing-fact">
              <dt>Session format</dt>
              <dd>45-minute technical sessions with direct implementation guidance.</dd>
            </div>
            <div className="landing-fact">
              <dt>Output</dt>
              <dd>Clear next-step summary for your admin, architect, or IT lead.</dd>
            </div>
          </dl>
          <div className="landing-card-grid mt-6">
            <div className="landing-card">
              <h3>When teams usually reach out</h3>
              <p>Conditional Access gaps, Intune rollout friction, Defender tuning, noisy Secure Score findings, or AVD stability issues.</p>
            </div>
            <div className="landing-card">
              <h3>What happens after each session</h3>
              <p>Action summary, recommended sequence, and practical “do this next” guidance for engineers and decision makers.</p>
            </div>
          </div>
        </section>

        <section id="services" className="landing-section scroll-mt-24 border-t border-white/5">
          <p className="landing-section-title">Capabilities</p>
          <h2 className="landing-section-heading">What I take end-to-end</h2>
          <p className="landing-lead">Deep Microsoft stack coverage. Pick what is blocking you first.</p>
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
              Need help choosing scope? Start with one booking and we will prioritize by business impact and rollout risk.
            </p>
          </div>
        </section>

        <section id="flow" className="landing-section border-t border-white/5 scroll-mt-24">
          <p className="landing-section-title">How it works</p>
          <h2 className="landing-section-heading">Credits, calendar, outcomes</h2>
          <div className="landing-steps">
            {[
              { k: "01", title: "Create account", body: "Email + password. Your org is stored for credits and bookings." },
              { k: "02", title: "Use intro credit or buy packs", body: "New accounts start with an intro credit. Add packs when you need more time." },
              { k: "03", title: "Book and execute", body: "1 credit = 45 minutes. We focus on blockers, sequencing, and implementation details." },
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
          <h2 className="landing-section-heading">What clients say</h2>
          <div className="landing-quote-grid">
            <blockquote className="landing-quote">
              &ldquo;Fast, clear, and technical. We shipped policy changes in the same week.&rdquo;
            </blockquote>
            <blockquote className="landing-quote">
              &ldquo;Practical guidance—not generic consulting decks we would never implement.&rdquo;
            </blockquote>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold text-white">Who this is for</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              IT leaders, architects, and admins who need specific Microsoft guidance they can act on now, not generic strategy-only advisory.
            </p>
          </div>
        </section>

        <section className="landing-section border-t border-white/5">
          <p className="landing-section-title">FAQ</p>
          <h2 className="landing-section-heading">Common questions</h2>
          <div className="landing-card-grid">
            <article className="landing-card">
              <h3>Do I need to commit long term?</h3>
              <p>No. Start with one booking. Add credits only when you need more sessions.</p>
            </article>
            <article className="landing-card">
              <h3>What if we have multiple blockers?</h3>
              <p>We prioritize by risk and business impact, then sequence follow-up sessions.</p>
            </article>
            <article className="landing-card">
              <h3>Can this support project go-lives?</h3>
              <p>Yes. The process is built around rollout readiness, validation, and handoff planning.</p>
            </article>
            <article className="landing-card">
              <h3>Is this managed services?</h3>
              <p>No. This is targeted consulting + execution guidance unless separately contracted.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="landing-section border-t border-white/5 pb-24 scroll-mt-24">
          <div className="landing-cta-panel">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Ready when you are</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-300">
              Use your intro credit, or buy a pack if you already know you need multiple sessions. All bookings are shown in Eastern Time.
            </p>
            <div className="landing-actions !mt-6 !justify-start">
              <Link href="/book" className="landing-btn landing-btn-primary">
                Start booking
              </Link>
              <Link href="/account" className="landing-btn landing-btn-secondary">
                Buy credits
              </Link>
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-sm font-semibold text-white">Updates</h3>
              <p className="mt-1 text-xs text-zinc-400">Low-volume list: M365 notes and availability.</p>
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
