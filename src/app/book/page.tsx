import Link from "next/link";

export default function BookOverviewPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">What you get</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "45-minute live session (video or phone—coordinate by email after booking).",
            "Microsoft 365, Entra ID, Intune, Defender, or AVD—your agenda drives the call.",
            "Actionable next steps: policies, rollout order, risks, and quick wins.",
            "First session for new emails uses your free welcome credit.",
          ].map((t) => (
            <li
              key={t}
              className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-300"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-zinc-950">
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-5 dark:border-amber-900/40 dark:from-amber-950/30 dark:to-zinc-900">
        <h2 className="font-semibold text-zinc-900 dark:text-white">Credits &amp; pricing shape</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          Each booking consumes <strong>one credit</strong> (one scheduled block). After your welcome credit, add packs
          via the developer API today—Stripe checkout can replace that when you are ready.
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/book/email"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-center text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400"
        >
          Start — enter your email
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Read how it works
        </Link>
      </div>
    </div>
  );
}
