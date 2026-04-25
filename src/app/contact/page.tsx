import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Clearfield",
  description: "Get in touch with Clearfield for Microsoft 365 and Modern Work consulting.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Contact</h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        Prefer to talk before booking? Use the session scheduler—intro calls use your welcome credit—or reach out via
        the channels you publish for your practice (LinkedIn, work email, etc.).
      </p>
      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Next step</p>
        <p className="mt-2 text-zinc-800 dark:text-zinc-100">
          Add your preferred contact details here in the codebase (this page is a professional placeholder).
        </p>
        <Link
          href="/book"
          className="mt-6 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Book a session
        </Link>
      </div>
    </div>
  );
}
