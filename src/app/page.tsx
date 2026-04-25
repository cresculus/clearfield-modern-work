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
            Modern Work consulting,
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
              fast and executable.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300">
            Microsoft 365, Intune, Entra ID, Defender, AVD. Book credits, get answers, ship faster.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.02]"
            >
              Book session
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

        <section className="mt-20 glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white">Simple model</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
            1 credit = 45 minutes. Buy credits, book time, get outcomes.
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
            <h3 className="font-semibold text-white">Get updates</h3>
            <NewsletterSignup />
          </div>
        </section>
      </div>
    </div>
  );
}
