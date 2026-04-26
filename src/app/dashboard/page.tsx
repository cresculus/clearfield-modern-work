"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  startsAt: string;
  endsAt: string;
  kind: string;
  status: string;
};

type Note = {
  id: string;
  subject: string | null;
  body: string;
  createdAt: string;
  booking: { id: string; startsAt: string; kind: string; status: string } | null;
};

type Invoice = {
  id: string;
  createdAt: string;
  status: string;
  amountCents: number;
  creditsGranted: number;
  quantity: number;
  packTitle: string;
};

type Pack = {
  id: string;
  title: string;
  credits: number;
  priceCents: number;
};

type PortalData = {
  generatedAt: string;
  account: { email: string; creditBalance: number };
  stats: { meetingsBooked: number; meetingsUpcoming: number; invoices: number; totalSpentCents: number };
  bookings: Booking[];
  notes: Note[];
  invoices: Invoice[];
  packs: Pack[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [portal, setPortal] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ subject: "", body: "", bookingId: "" });

  const upcomingBookings = useMemo(
    () => {
      const baseline = portal ? Date.parse(portal.generatedAt) : 0;
      return (portal?.bookings ?? [])
        .filter((b) => new Date(b.startsAt).getTime() >= baseline)
        .slice(0, 5);
    },
    [portal],
  );
  const recentBookings = useMemo(() => (portal?.bookings ?? []).slice(0, 8), [portal]);

  async function loadPortal() {
    const res = await fetch("/api/dashboard/portal", { cache: "no-store" });
    if (res.status === 401) {
      router.replace("/account?returnTo=/dashboard");
      return;
    }
    const data = (await res.json()) as PortalData & { error?: string };
    if (!res.ok) throw new Error(data.error ?? "Failed loading dashboard.");
    setPortal(data);
  }

  useEffect(() => {
    queueMicrotask(() => {
      void (async () => {
        setLoading(true);
        setError(null);
        try {
          await loadPortal();
        } catch (e) {
          setError(e instanceof Error ? e.message : "Failed loading dashboard.");
        } finally {
          setLoading(false);
        }
      })();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addNote() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/dashboard/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: newNote.subject,
          body: newNote.body,
          bookingId: newNote.bookingId || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not save note.");
      setMessage("Session note saved.");
      setNewNote({ subject: "", body: "", bookingId: "" });
      await loadPortal();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save note.");
    } finally {
      setSaving(false);
    }
  }

  async function buyPack(packId: string) {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId, quantity: 1 }),
      });
      const data = (await res.json()) as { error?: string; creditsGranted?: number };
      if (!res.ok) throw new Error(data.error ?? "Purchase failed.");
      setMessage(`Purchase complete. +${data.creditsGranted ?? 0} credits`);
      await loadPortal();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Purchase failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-200">Customer dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Client Portal</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-100/90">
            Book meetings, view previous-call notes, buy credits, and review billing + invoice history.
          </p>
        </div>
        <div className="glass rounded-2xl px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-zinc-100/70">Signed in</p>
          <p className="mt-1 text-sm font-semibold text-white">{portal?.account.email ?? "..."}</p>
        </div>
      </div>

      {error && <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">{error}</p>}
      {message && <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">{message}</p>}
      {loading && <p className="mt-4 text-sm text-zinc-100/80">Loading your dashboard...</p>}

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-100/70">Credits</p>
          <p className="mt-2 text-3xl font-bold text-white">{portal?.account.creditBalance ?? 0}</p>
          <p className="mt-1 text-xs text-zinc-100/70">1 credit = 45-minute session</p>
        </article>
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-100/70">Meetings booked</p>
          <p className="mt-2 text-3xl font-bold text-white">{portal?.stats.meetingsBooked ?? 0}</p>
          <p className="mt-1 text-xs text-zinc-100/70">{portal?.stats.meetingsUpcoming ?? 0} upcoming</p>
        </article>
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-100/70">Invoices</p>
          <p className="mt-2 text-3xl font-bold text-white">{portal?.stats.invoices ?? 0}</p>
          <p className="mt-1 text-xs text-zinc-100/70">Purchase history records</p>
        </article>
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-100/70">Total spent</p>
          <p className="mt-2 text-3xl font-bold text-white">
            ${((portal?.stats.totalSpentCents ?? 0) / 100).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-zinc-100/70">Across paid purchases</p>
        </article>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Meetings</h2>
            <button
              onClick={() => router.push("/book")}
              className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Book meeting
            </button>
          </div>
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-zinc-100/70">Upcoming</p>
            {upcomingBookings.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-100/80">No upcoming meetings.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {upcomingBookings.map((b) => (
                  <li key={b.id} className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-zinc-100">
                    {new Date(b.startsAt).toLocaleString()} ({b.kind})
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-zinc-100/70">Recent meetings</p>
            {recentBookings.length === 0 ? (
              <p className="mt-2 text-sm text-zinc-100/80">No meeting history yet.</p>
            ) : (
              <ul className="mt-2 max-h-52 space-y-2 overflow-auto pr-1">
                {recentBookings.map((b) => (
                  <li key={b.id} className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-zinc-100">
                    {new Date(b.startsAt).toLocaleString()} - {b.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Buy credits</h2>
            <button
              onClick={() => router.push("/account")}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
            >
              Open account
            </button>
          </div>
          {(portal?.packs ?? []).length === 0 ? (
            <p className="mt-4 text-sm text-zinc-100/80">No credit packs available right now.</p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {portal?.packs.map((p) => (
                <li key={p.id} className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="font-semibold text-white">{p.title}</p>
                  <p className="mt-1 text-sm text-zinc-100/85">{p.credits} credits</p>
                  <p className="mt-1 text-sm text-zinc-100/85">${(p.priceCents / 100).toLocaleString()}</p>
                  <button
                    disabled={saving}
                    onClick={() => void buyPack(p.id)}
                    className="mt-3 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    Buy credits
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Notes from previous calls</h2>
          <p className="mt-1 text-sm text-zinc-100/80">Attach notes to a session or save general meeting notes.</p>
          <div className="mt-4 space-y-3">
            <select
              className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white"
              value={newNote.bookingId}
              onChange={(e) => setNewNote((s) => ({ ...s, bookingId: e.target.value }))}
            >
              <option value="" className="text-black">No session linked</option>
              {(portal?.bookings ?? []).map((b) => (
                <option key={b.id} value={b.id} className="text-black">
                  {new Date(b.startsAt).toLocaleString()} - {b.kind}
                </option>
              ))}
            </select>
            <input
              className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-200/70"
              placeholder="Subject (optional)"
              value={newNote.subject}
              onChange={(e) => setNewNote((s) => ({ ...s, subject: e.target.value }))}
            />
            <textarea
              className="min-h-28 w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-200/70"
              placeholder="Session note details"
              value={newNote.body}
              onChange={(e) => setNewNote((s) => ({ ...s, body: e.target.value }))}
            />
            <button
              disabled={saving}
              onClick={() => void addNote()}
              className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              Save note
            </button>
          </div>
          <div className="mt-5 space-y-2">
            {(portal?.notes ?? []).length === 0 ? (
              <p className="text-sm text-zinc-100/80">No notes yet.</p>
            ) : (
              portal?.notes.map((n) => (
                <article key={n.id} className="rounded-lg border border-white/20 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{n.subject || "Session note"}</p>
                  <p className="mt-1 text-sm text-zinc-100/90">{n.body}</p>
                  <p className="mt-1 text-xs text-zinc-100/70">
                    {new Date(n.createdAt).toLocaleString()}
                    {n.booking ? ` · linked to ${new Date(n.booking.startsAt).toLocaleString()}` : ""}
                  </p>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Billing and invoices</h2>
          <p className="mt-1 text-sm text-zinc-100/80">View purchase history and invoice-like transaction records.</p>
          {(portal?.invoices ?? []).length === 0 ? (
            <p className="mt-4 text-sm text-zinc-100/80">No invoices yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-zinc-100">
                <thead className="text-xs uppercase tracking-wide text-zinc-200/75">
                  <tr>
                    <th className="px-2 py-2">Invoice</th>
                    <th className="px-2 py-2">Date</th>
                    <th className="px-2 py-2">Pack</th>
                    <th className="px-2 py-2">Credits</th>
                    <th className="px-2 py-2">Amount</th>
                    <th className="px-2 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {portal?.invoices.map((inv) => (
                    <tr key={inv.id} className="border-t border-white/10">
                      <td className="px-2 py-2 font-mono text-xs">{inv.id.slice(0, 8).toUpperCase()}</td>
                      <td className="px-2 py-2">{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td className="px-2 py-2">{inv.packTitle}</td>
                      <td className="px-2 py-2">{inv.creditsGranted}</td>
                      <td className="px-2 py-2">${(inv.amountCents / 100).toLocaleString()}</td>
                      <td className="px-2 py-2">{inv.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
