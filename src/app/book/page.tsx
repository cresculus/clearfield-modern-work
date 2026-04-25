import Link from "next/link";

export default function BookOverviewPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">What you get</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "45-minute live session (video or phone—coordinate by email after booking).",
            "Microsoft 365, Entra ID, Intune, Defender, or AVD—your agenda drives the call.",
            "Actionable next steps: policies, rollout order, risks, and quick wins.",
            "First session for new emails uses your free welcome credit.",
          ].map((t) => (
            <li
              key={t}
              className="glass flex gap-3 rounded-xl p-4 text-sm leading-relaxed text-zinc-200"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-xs font-bold text-white">
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-xl p-5">
        <h2 className="font-semibold text-white">Credits</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Each booking consumes <strong>one credit</strong> (one scheduled block). After your welcome credit, add packs
          via the developer API today—Stripe checkout can replace that when you are ready.
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/book/email"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          Start
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
        >
          View flow
        </Link>
      </div>
    </div>
  );
}
