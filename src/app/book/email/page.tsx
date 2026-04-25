"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveBookingSession } from "@/lib/booking-storage";

export default function BookEmailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      void (async () => {
        setLoading(true);
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        const me = (await meRes.json()) as {
          authenticated?: boolean;
          user?: { account?: { email: string; creditBalance: number } };
        };
        if (!me.authenticated || !me.user?.account) {
          setError("Sign in to continue booking.");
          setLoading(false);
          return;
        }
        saveBookingSession({
          email: me.user.account.email,
          creditBalance: me.user.account.creditBalance,
          isNew: false,
        });
        router.replace("/book/schedule");
      })();
    });
  }, [router]);

  async function goToAccount() {
    setError(null);
    router.push("/account?returnTo=/book/schedule");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Account check</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Booking is tied to your signed-in account so credits and sessions stay synced.
        </p>
      </div>

      {loading && <p className="text-sm text-zinc-500">Checking session…</p>}

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100">
          {error}
        </p>
      )}

      {!loading && error && (
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Back
          </Link>
          <button
            type="button"
            onClick={() => void goToAccount()}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-md transition hover:bg-amber-400"
          >
            Go to account
          </button>
        </div>
      )}
    </div>
  );
}
