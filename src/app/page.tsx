import Link from "next/link";
import { SERVICES } from "@/lib/services-content";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export default function Home() {
  return (
    <div>
      <section className="border-b border-zinc-200 bg-gradient-to-b from-amber-50/40 via-white to-zinc-50 dark:border-zinc-800 dark:from-amber-950/20 dark:via-zinc-950 dark:to-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-800 dark:text-amber-400">
            Clearfield
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
            Modern Work consulting you can <span className="text-amber-600 dark:text-amber-400">actually ship</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            Microsoft 365, Entra ID, Intune, Defender, and AVD—clear guidance when you need a decision, hands-on
            execution when you need it done. Book structured sessions with credits; your first intro credit is on us.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              Book a session
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/80 px-8 py-3.5 text-sm font-semibold text-zinc-800 backdrop-blur hover:bg-white dark:border-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              View services
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <section id="services" className="scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Platform scope
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{s.body}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/services"
            className="mt-8 inline-block text-sm font-semibold text-amber-700 hover:underline dark:text-amber-400"
          >
            Full services page →
          </Link>
        </section>

        <section className="mt-20 rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white p-10 dark:border-amber-900/40 dark:from-amber-950/30 dark:to-zinc-900">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Ready when you are</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Multi-step booking keeps scope clear: overview → email → time → confirmation. Full SaaS account mode is
            now available with login, purchases, and admin tooling.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Open booking
            </Link>
            <Link
              href="/account"
              className="inline-flex rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
            >
              Account & credits
            </Link>
          </div>
          <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-white/80 p-5 dark:border-zinc-700 dark:bg-zinc-900/60">
            <h3 className="font-semibold text-zinc-900 dark:text-white">Join the email list</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Product updates, pack releases, and consulting availability.
            </p>
            <NewsletterSignup />
          </div>
        </section>
      </div>
    </div>
  );
}
