import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Clearfield",
  description: "Get in touch with Clearfield for Microsoft 365 and Modern Work consulting.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-white">Contact</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
        Reach out directly, or move fastest by creating an account and booking. This page explains which path to use.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="glass rounded-2xl p-8">
          <p className="text-sm font-medium text-zinc-400">Direct contact</p>
          <p className="mt-2 text-zinc-100">Email: brandon.sardelli@gmail.com</p>
          <p className="mt-1 text-zinc-100">LinkedIn: linkedin.com/in/brandonsardelli</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            Best for custom scope questions, partnership conversations, and project-fit checks.
          </p>
        </section>

        <section className="glass rounded-2xl p-8">
          <p className="text-sm font-medium text-zinc-400">Fastest start</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            If you already know you need hands-on Microsoft 365 help, skip the back-and-forth:
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-zinc-300">
            <li>Create account.</li>
            <li>Use intro credit or buy a pack.</li>
            <li>Book your first session.</li>
          </ol>
          <div className="mt-5 flex gap-3">
            <Link
              href="/account"
              className="inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Create account
            </Link>
            <Link
              href="/book"
              className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Book now
            </Link>
          </div>
        </section>
      </div>

      <section className="glass mt-8 rounded-2xl p-8">
        <h2 className="text-lg font-semibold text-white">When to use contact first</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300">
          <li>You need custom project scoping before booking.</li>
          <li>You want a multi-session plan aligned to a migration timeline.</li>
          <li>You are exploring a longer engagement than ad hoc sessions.</li>
        </ul>
      </section>
    </div>
  );
}
