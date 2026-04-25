import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Services | Clearfield",
  description: "Microsoft 365, Entra ID, Intune, Defender, AVD, and go-live consulting services.",
};

export default function ServicesPage() {
  return (
    <div className="hero-grid">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-fuchsia-300">Services</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">Microsoft 365 execution scope</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
          Focused consulting across identity, endpoint management, security, and AVD.
        </p>

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {SERVICES.map((s) => (
          <li
            key={s.title}
            className="glass rounded-2xl p-5 transition hover:translate-y-[-2px]"
          >
            <h2 className="text-lg font-semibold text-white">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{s.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/book"
          className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Book now
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
        >
          See flow
        </Link>
      </div>
      </div>
    </div>
  );
}
