"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  saveLastBooking,
  updateBalance,
} from "@/lib/booking-storage";
import { formatSlotEt } from "@/lib/slots";

type Slot = { startsAt: string };

export default function BookSchedulePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSlots = useCallback(async () => {
    const res = await fetch("/api/slots", { cache: "no-store" });
    const data = (await res.json()) as { slots?: Slot[]; error?: string; code?: string };
    if (!res.ok) {
      throw new Error(
        typeof data.error === "string"
          ? data.code
            ? `${data.error} (${data.code})`
            : data.error
          : `Failed to load slots (${res.status})`,
      );
    }
    setSlots(data.slots ?? []);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        const me = (await meRes.json()) as {
          authenticated?: boolean;
          user?: { account?: { email: string; creditBalance: number } };
        };
        if (!me.authenticated || !me.user?.account) {
          router.replace("/account?returnTo=/book/schedule");
          return;
        }
        if (!cancelled) {
          setEmail(me.user.account.email);
          setBalance(me.user.account.creditBalance);
          setIsNew(me.user.account.creditBalance === 1);
          updateBalance(me.user.account.creditBalance);
        }
        await loadSlots();
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load times.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadSlots, router]);

  async function pickSlot(startsAt: string) {
    if (!email) return;
    setError(null);
    setBooking(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startsAt }),
      });
      const data = (await res.json()) as {
        booking?: { id: string; startsAt: string; kind: string };
        creditBalance?: number;
        error?: string;
        code?: string;
      };
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/account?returnTo=/book/schedule");
          return;
        }
        const msg =
          typeof data.error === "string"
            ? data.code
              ? `${data.error} (${data.code})`
              : data.error
            : `Booking failed (${res.status})`;
        throw new Error(msg);
      }
      if (data.booking) {
        saveLastBooking({
          id: data.booking.id,
          startsAt: data.booking.startsAt,
          kind: data.booking.kind,
        });
      }
      if (typeof data.creditBalance === "number") {
        updateBalance(data.creditBalance);
        setBalance(data.creditBalance);
      }
      router.push("/book/confirmation");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Booking failed.");
    } finally {
      setBooking(false);
    }
  }

  const zeroCredits = balance !== null && balance < 1;

  if (!email) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-xl font-semibold text-white">Choose a time</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Signed in as <span className="font-medium text-white">{email}</span>
          </p>
        </div>
        <div className="glass rounded-xl px-4 py-3 text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Credits</p>
          <p className="text-2xl font-bold tabular-nums text-white">{balance ?? "—"}</p>
          {isNew && (
            <p className="mt-1 text-xs font-medium text-emerald-300">Includes welcome credit</p>
          )}
        </div>
      </div>

      {loading && <p className="text-sm text-zinc-400">Loading open times…</p>}
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {!loading && zeroCredits && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          <p className="font-medium">You need more credits</p>
          <p className="mt-2 text-amber-100/90">
            Buy a credit pack from your account page, then come back here to book.
          </p>
          <Link
            href="/account"
            className="mt-3 inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white"
          >
            Go to account
          </Link>
        </div>
      )}

      {!loading && !zeroCredits && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {slots.map((s) => (
            <li key={s.startsAt}>
              <button
                type="button"
                disabled={booking}
                onClick={() => void pickSlot(s.startsAt)}
                className="glass flex w-full flex-col items-start rounded-xl px-4 py-3 text-left text-sm transition hover:border-fuchsia-400/40 disabled:opacity-50"
              >
                <span className="font-semibold text-white">{formatSlotEt(s.startsAt)}</span>
                <span className="mt-1 text-xs text-fuchsia-300">Reserve this slot →</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/account"
        className="inline-block text-sm font-medium text-zinc-400 underline hover:text-zinc-200"
      >
        Switch account
      </Link>
    </div>
  );
}
