"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatSlotEt } from "@/lib/slots";
import { readLastBooking, readBookingEmail } from "@/lib/booking-storage";
import type { LastBooking } from "@/lib/booking-storage";

export default function BookConfirmationPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<LastBooking | null>(null);

  useEffect(() => {
    const b = readLastBooking();
    const email = readBookingEmail();
    if (!email) {
      router.replace("/book/email");
      return;
    }
    if (!b) {
      router.replace("/book/schedule");
      return;
    }
    queueMicrotask(() => setBooking(b));
  }, [router]);

  if (!booking) {
    return <p className="text-sm text-zinc-500">Loading…</p>;
  }

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white shadow-lg shadow-emerald-500/30">
        ✓
      </div>
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">You are booked</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Session type:{" "}
          <strong className="text-zinc-900 dark:text-white">
            {booking.kind === "intro" ? "Intro (welcome credit)" : "Consulting session"}
          </strong>
          <br />
          Time:{" "}
          <strong className="text-zinc-900 dark:text-white">{formatSlotEt(booking.startsAt)}</strong>
        </p>
        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
          Calendar invites are not automated in this MVP—watch your inbox for a follow-up from Clearfield, or reach out
          on the Contact page.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
        <Link
          href="/book/schedule"
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Book another time
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
