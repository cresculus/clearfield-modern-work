"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { formatSlotEt } from "@/lib/slots";

type Slot = { startsAt: string };
type BookingRow = { id: string; startsAt: string; endsAt: string; kind: string };

export function BookClient() {
  const [email, setEmail] = useState("");
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isNew, setIsNew] = useState<boolean | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadSlots = useCallback(async () => {
    const res = await fetch("/api/slots", { cache: "no-store" });
    const data = (await res.json()) as { slots?: Slot[]; error?: string };
    if (!res.ok) throw new Error(data.error ?? "Could not load times.");
    setSlots(data.slots ?? []);
  }, []);

  const continueWithEmail = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        creditBalance?: number;
        bookings?: BookingRow[];
        isNew?: boolean;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Could not continue.");
      setCreditBalance(data.creditBalance ?? 0);
      setBookings(data.bookings ?? []);
      setIsNew(Boolean(data.isNew));
      setStep(2);
      await loadSlots();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const bookSlot = async (startsAt: string) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, startsAt }),
      });
      const data = (await res.json()) as {
        creditBalance?: number;
        booking?: { startsAt: string; kind: string };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Booking failed.");
      setCreditBalance(data.creditBalance ?? 0);
      setSuccess(
        `Booked (${data.booking?.kind === "intro" ? "intro session" : "session"}). Check your email for a calendar invite soon.`,
      );
      const r2 = await fetch("/api/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const d2 = (await r2.json()) as { bookings?: BookingRow[] };
      if (r2.ok && d2.bookings) setBookings(d2.bookings);
      await loadSlots();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const zeroCredits = useMemo(
    () => creditBalance !== null && creditBalance < 1,
    [creditBalance],
  );

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="text-amber-600 hover:underline dark:text-amber-400">
          ← Back
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Book a session
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        New visitors get <strong>one free credit</strong> (one intro session). After that,
        purchase consultant credits and keep booking here. Each booking uses one credit for a{" "}
        <strong>45-minute</strong> block (US Eastern business hours).
      </p>

      {step === 1 && (
        <div className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Work email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none ring-amber-500/0 transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </label>
          <button
            type="button"
            disabled={loading || !email.trim()}
            onClick={() => void continueWithEmail()}
            className="w-full rounded-full bg-amber-500 py-2.5 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Working…" : "Continue"}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Signed in as <span className="font-medium text-zinc-900 dark:text-zinc-100">{email}</span>
            </p>
            <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Credits: {creditBalance ?? "—"}
            </p>
            {isNew && (
              <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
                Welcome — your first credit is on the house.
              </p>
            )}
          </div>

          {success && (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
              {success}
            </p>
          )}
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </p>
          )}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Upcoming times (ET)
            </h2>
            {zeroCredits ? (
              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
                <p>You are out of credits. Add a pack via the API (dev) or reach out to add paid credits.</p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">
                  {`curl -X POST http://localhost:3000/api/credits/purchase-dev \\\n  -H "Content-Type: application/json" \\\n  -d "{\\"email\\":\\"${email || "you@company.com"}\\",\\"pack\\":\\"bench\\",\\"secret\\":\\"YOUR_DEV_PURCHASE_SECRET\\"}"`}
                </pre>
                <p className="mt-2 text-xs text-amber-900/80 dark:text-amber-200/80">
                  Packs: starter=3, bench=8, field=20 credits. Set <code className="rounded bg-black/10 px-1">DEV_PURCHASE_SECRET</code> in{" "}
                  <code className="rounded bg-black/10 px-1">.env</code>.
                </p>
              </div>
            ) : (
              <ul className="mt-3 grid gap-2">
                {slots.map((s) => (
                  <li key={s.startsAt}>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => void bookSlot(s.startsAt)}
                      className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-zinc-800 shadow-sm transition hover:border-amber-400 hover:bg-amber-50/50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-amber-500 dark:hover:bg-amber-950/20"
                    >
                      <span>{formatSlotEt(s.startsAt)}</span>
                      <span className="text-xs font-normal text-amber-700 dark:text-amber-400">Book →</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {bookings.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Your bookings
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                {bookings.map((b) => (
                  <li key={b.id}>
                    {formatSlotEt(b.startsAt)}{" "}
                    <span className="text-zinc-400">({b.kind})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setStep(1);
              setSuccess(null);
              setError(null);
            }}
            className="text-sm text-zinc-500 underline hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            Use a different email
          </button>
        </div>
      )}
    </div>
  );
}
