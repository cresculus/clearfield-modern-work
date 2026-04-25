import Link from "next/link";
import { SERVICES } from "@/lib/services-content";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export default function Home() {
  return (
    <div className="hero-grid">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="fade-up text-sm font-semibold uppercase tracking-widest text-fuchsia-300">Clearfield IT</p>
          <h1 className="fade-up-delay mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Microsoft 365 consulting
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
              with hands-on execution.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300">
            Intune, Entra ID, Defender, AVD. Buy credits. Book sessions. Ship improvements quickly.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.02]"
            >
              Book now
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur hover:bg-white/10"
            >
              Login / Register
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <section className="glass rounded-3xl p-8">
          <p className="text-xs uppercase tracking-widest text-zinc-400">About</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Brandon Sardelli</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-300">
            Modern Work and endpoint consultant focused on practical M365 outcomes for MSPs and enterprise teams.
          </p>
        </section>

        <section id="services" className="scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">What I handle</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="glass float rounded-2xl p-5"
              >
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 grid gap-5 md:grid-cols-3">
          {[
            { title: "Buy credits", body: "Starter, bench, or field packs." },
            { title: "Book a slot", body: "Pick an open ET time in minutes." },
            { title: "Get outcomes", body: "Session + concise action summary." },
          ].map((step, i) => (
            <div key={step.title} className="glass rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-300">Step {i + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-zinc-300">{step.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white">Client feedback</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300">
              &ldquo;Fast, clear, and technical. We shipped policy changes in the same week.&rdquo;
            </blockquote>
            <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300">
              &ldquo;Exactly what our team needed: practical guidance, not generic consulting.&rdquo;
            </blockquote>
          </div>
        </section>

        <section className="mt-10 glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white">Simple model</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
            1 credit = 45 minutes. Buy credits, book time, move forward.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Start booking
            </Link>
            <Link
              href="/account"
              className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Buy credits
            </Link>
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">Join the list</h3>
            <NewsletterSignup />
          </div>
        </section>
      </div>
    </div>
  );
}
