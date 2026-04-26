import Link from "next/link";

export default function BookOverviewPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">What this booking includes</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-300">
          The session is designed for active Microsoft 365 workstreams, not generic discovery calls.
        </p>
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
        <h2 className="font-semibold text-white">Credits and scheduling</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Each booking consumes <strong>one credit</strong> (one scheduled 45-minute block). New accounts receive an intro
          credit, then you can add packs from the account page.
        </p>
      </section>

      <section className="glass rounded-xl p-5">
        <h2 className="font-semibold text-white">Before you continue</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-zinc-300">
          <li>Have your top 1-2 technical goals ready.</li>
          <li>Bring relevant tenant context (licenses, device scope, current blockers).</li>
          <li>If this is urgent production support, contact directly first.</li>
        </ul>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/book/email"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          Continue
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
