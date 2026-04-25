"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveBookingSession } from "@/lib/booking-storage";

export default function BookEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        creditBalance?: number;
        isNew?: boolean;
        error?: string;
        code?: string;
      };
      if (!res.ok) {
        const msg =
          typeof data.error === "string"
            ? data.code
              ? `${data.error} (${data.code})`
              : data.error
            : `Request failed (${res.status})`;
        throw new Error(msg);
      }
      saveBookingSession({
        email: email.trim().toLowerCase(),
        creditBalance: data.creditBalance ?? 0,
        isNew: Boolean(data.isNew),
      });
      router.push("/book/schedule");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Your work email</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          We use this to create your Clearfield account, track credits, and list your upcoming sessions. Use a mailbox
          you check—no password is stored here.
        </p>
      </div>

      <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Work email</span>
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-inner outline-none ring-0 transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </label>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Back
          </Link>
          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-md transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving…" : "Continue to times"}
          </button>
        </div>
      </form>
    </div>
  );
}
