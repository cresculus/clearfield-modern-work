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
              Microsoft 365 consulting that ships.
            </h1>
            <p className="landing-tagline">Hands-on, not slide-only.</p>
            <p className="landing-subtitle">
              Entra ID, Intune, Defender, AVD. Sign in, use credits, book time, and walk away with next steps you can execute.
            </p>

            <div className="landing-pills">
              <span className="landing-pill landing-pill--cyan">Identity &amp; CA</span>
              <span className="landing-pill landing-pill--violet">Endpoint baselines</span>
              <span className="landing-pill landing-pill--emerald">Secure Score motion</span>
            </div>

            <HeroJourney />

            <div className="landing-actions">
              <Link href="/book" className="landing-btn landing-btn-primary">
                Book a session
              </Link>
              <Link href="/account" className="landing-btn landing-btn-secondary">
                Login / Register
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
            Same patterns as enterprise go-lives—scoped for your tenant, your MSP, or your internal IT team. Credits keep scheduling predictable.
          </p>
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
        </section>

        <section className="landing-section border-t border-white/5">
          <p className="landing-section-title">How it works</p>
          <h2 className="landing-section-heading">Credits, calendar, outcomes</h2>
          <div className="landing-steps">
            {[
              { k: "01", title: "Create account", body: "Email + password. Your org is stored for credits and bookings." },
              { k: "02", title: "Buy credits", body: "Starter packs for follow-on work after your intro credit." },
              { k: "03", title: "Book & execute", body: "1 credit = 45 minutes. Session notes point to concrete changes." },
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
        </section>

        <section className="landing-section border-t border-white/5 pb-24">
          <div className="landing-cta-panel">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Ready when you are</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-300">
              Use your intro credit or buy a pack, then grab a slot in Eastern Time.
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
