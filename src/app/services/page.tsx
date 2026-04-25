import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Services | Clearfield",
  description: "Microsoft 365, Entra ID, Intune, Defender, AVD, and go-live consulting services.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">Services</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Microsoft 365 &amp; Modern Work scope
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        Clearfield combines advisory clarity with hands-on delivery across identity, endpoints, security, and virtual
        desktop—so your team ships faster with fewer surprises.
      </p>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <li
            key={s.title}
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-amber-300/60 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-amber-700/40"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{s.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link
          href="/book"
          className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-md hover:bg-amber-400"
        >
          Book a session
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          How booking works
        </Link>
      </div>
    </div>
  );
}
