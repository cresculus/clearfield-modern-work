import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Clearfield",
  description: "Get in touch with Clearfield for Microsoft 365 and Modern Work consulting.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-white">Contact</h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-300">
        Fastest path: buy credits and book directly.
      </p>
      <div className="glass mt-10 rounded-2xl p-8">
        <p className="text-sm font-medium text-zinc-400">Direct</p>
        <p className="mt-2 text-zinc-100">Email: brandon.sardelli@gmail.com</p>
        <p className="mt-1 text-zinc-100">LinkedIn: linkedin.com/in/brandonsardelli</p>
        <Link
          href="/book"
          className="mt-6 inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Book now
        </Link>
      </div>
    </div>
  );
}
