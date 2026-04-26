"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Activity = {
  id: string;
  type: "NOTE" | "CONVERSATION" | "MEETING";
  subject: string | null;
  body: string;
  occurredAt: string;
};

type Customer = {
  id: string;
  fullName: string;
  email: string | null;
  company: string | null;
  status: string;
  consultedAt: string | null;
  nextFollowUpAt: string | null;
  activities: Activity[];
};

type Me = {
  authenticated: boolean;
  user?: { email: string; account: { creditBalance: number } };
};

const statusOptions = ["lead", "active", "consulted", "paused", "closed"] as const;

export default function DashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<Me>({ authenticated: false });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    email: "",
    company: "",
    status: "lead",
    consultedAt: "",
    nextFollowUpAt: "",
  });
  const [newActivity, setNewActivity] = useState({
    type: "NOTE" as Activity["type"],
    subject: "",
    body: "",
    occurredAt: "",
  });

  const selected = useMemo(() => customers.find((c) => c.id === selectedId) ?? null, [customers, selectedId]);
  const consultedCount = useMemo(
    () => customers.filter((c) => c.status.toLowerCase() === "consulted").length,
    [customers],
  );
  const totalActivities = useMemo(
    () => customers.reduce((sum, c) => sum + c.activities.length, 0),
    [customers],
  );
  const upcomingFollowups = useMemo(
    () => customers.filter((c) => Boolean(c.nextFollowUpAt)).length,
    [customers],
  );

  async function loadMe() {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    const data = (await res.json()) as Me;
    if (!data.authenticated) {
      router.replace("/account?returnTo=/dashboard");
      return false;
    }
    setMe(data);
    return true;
  }

  async function loadCustomers() {
    const res = await fetch("/api/dashboard/customers", { cache: "no-store" });
    if (res.status === 401) {
      router.replace("/account?returnTo=/dashboard");
      return;
    }
    const data = (await res.json()) as { customers?: Customer[]; error?: string };
    if (!res.ok) throw new Error(data.error ?? "Failed loading dashboard.");
    const list = data.customers ?? [];
    setCustomers(list);
    if (list.length > 0 && !selectedId) setSelectedId(list[0].id);
  }

  useEffect(() => {
    queueMicrotask(() => {
      void (async () => {
        setLoading(true);
        setError(null);
        try {
          const ok = await loadMe();
          if (!ok) return;
          await loadCustomers();
        } catch (e) {
          setError(e instanceof Error ? e.message : "Failed loading dashboard.");
        } finally {
          setLoading(false);
        }
      })();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createCustomer() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/dashboard/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      const data = (await res.json()) as { error?: string; customer?: Customer };
      if (!res.ok) throw new Error(data.error ?? "Could not create customer.");
      setMessage("Customer created.");
      setNewCustomer({ fullName: "", email: "", company: "", status: "lead", consultedAt: "", nextFollowUpAt: "" });
      await loadCustomers();
      if (data.customer?.id) setSelectedId(data.customer.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create customer.");
    } finally {
      setSaving(false);
    }
  }

  async function addActivity() {
    if (!selected) return;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/dashboard/customers/${selected.id}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivity),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not add activity.");
      setMessage("Timeline entry saved.");
      setNewActivity({ type: "NOTE", subject: "", body: "", occurredAt: "" });
      await loadCustomers();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add activity.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-200">Customer dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Operator Command Center</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-100/90">
            A clean, Salesforce-style workspace for credits, customer records, conversations, notes, and follow-up dates.
          </p>
        </div>
        <div className="glass rounded-2xl px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-zinc-100/70">Signed in</p>
          <p className="mt-1 text-sm font-semibold text-white">{me.user?.email ?? "..."}</p>
        </div>
      </div>

      {error && <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">{error}</p>}
      {message && <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">{message}</p>}

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-100/70">Credits</p>
          <p className="mt-2 text-3xl font-bold text-white">{me.user?.account.creditBalance ?? 0}</p>
          <p className="mt-1 text-xs text-zinc-100/70">1 credit = 45-minute session</p>
        </article>
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-100/70">Customers</p>
          <p className="mt-2 text-3xl font-bold text-white">{customers.length}</p>
          <p className="mt-1 text-xs text-zinc-100/70">Total customer records</p>
        </article>
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-100/70">Consulted</p>
          <p className="mt-2 text-3xl font-bold text-white">{consultedCount}</p>
          <p className="mt-1 text-xs text-zinc-100/70">In consulted status</p>
        </article>
        <article className="glass rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wider text-zinc-100/70">Timeline entries</p>
          <p className="mt-2 text-3xl font-bold text-white">{totalActivities}</p>
          <p className="mt-1 text-xs text-zinc-100/70">{upcomingFollowups} with upcoming follow-up</p>
        </article>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_2fr]">
        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Add customer record</h2>
          <p className="mt-1 text-sm text-zinc-100/80">Capture profile, status, and key dates in one step.</p>
          <div className="mt-4 space-y-3">
            <input className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-200/70" placeholder="Full name" value={newCustomer.fullName} onChange={(e) => setNewCustomer((s) => ({ ...s, fullName: e.target.value }))} />
            <input className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-200/70" placeholder="Email" value={newCustomer.email} onChange={(e) => setNewCustomer((s) => ({ ...s, email: e.target.value }))} />
            <input className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-200/70" placeholder="Company" value={newCustomer.company} onChange={(e) => setNewCustomer((s) => ({ ...s, company: e.target.value }))} />
            <select className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white" value={newCustomer.status} onChange={(e) => setNewCustomer((s) => ({ ...s, status: e.target.value }))}>
              {statusOptions.map((s) => (
                <option key={s} value={s} className="text-black">{s}</option>
              ))}
            </select>
            <label className="block text-xs text-zinc-100/80">Consulted date</label>
            <input type="date" className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white" value={newCustomer.consultedAt} onChange={(e) => setNewCustomer((s) => ({ ...s, consultedAt: e.target.value }))} />
            <label className="block text-xs text-zinc-100/80">Next follow-up</label>
            <input type="date" className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white" value={newCustomer.nextFollowUpAt} onChange={(e) => setNewCustomer((s) => ({ ...s, nextFollowUpAt: e.target.value }))} />
            <button disabled={saving} onClick={() => void createCustomer()} className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              Save customer
            </button>
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Customer records</h2>
          {loading ? (
            <p className="mt-4 text-sm text-zinc-100/80">Loading customers...</p>
          ) : customers.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-100/80">No customers yet. Add your first customer record.</p>
          ) : (
            <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.35fr]">
              <aside className="space-y-2">
                {customers.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={`w-full rounded-xl border px-3 py-3 text-left text-sm transition ${
                      selectedId === c.id
                        ? "border-cyan-200/70 bg-cyan-400/20 text-white"
                        : "border-white/20 bg-white/5 text-zinc-100 hover:bg-white/10"
                    }`}
                  >
                    <p className="font-semibold">{c.fullName}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-zinc-200/80">{c.status}</p>
                    <p className="mt-1 text-xs text-zinc-200/80">{c.company || "No company"}</p>
                  </button>
                ))}
              </aside>

              {selected && (
                <div className="rounded-xl border border-white/20 bg-white/5 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selected.fullName}</h3>
                      <p className="mt-1 text-sm text-zinc-100/85">{selected.email || "No email"} · {selected.company || "No company"}</p>
                    </div>
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-zinc-100">
                      {selected.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-100/75">
                    Consulted: {selected.consultedAt ? new Date(selected.consultedAt).toLocaleDateString() : "Not set"} | Follow-up:{" "}
                    {selected.nextFollowUpAt ? new Date(selected.nextFollowUpAt).toLocaleDateString() : "Not set"}
                  </p>

                  <div className="mt-4 rounded-xl border border-white/20 bg-white/10 p-3">
                    <h4 className="text-sm font-semibold text-white">Add timeline entry</h4>
                    <div className="mt-3 space-y-2">
                      <select className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white" value={newActivity.type} onChange={(e) => setNewActivity((s) => ({ ...s, type: e.target.value as Activity["type"] }))}>
                        <option value="NOTE" className="text-black">Note</option>
                        <option value="CONVERSATION" className="text-black">Conversation</option>
                        <option value="MEETING" className="text-black">Meeting</option>
                      </select>
                      <input className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-200/70" placeholder="Subject (optional)" value={newActivity.subject} onChange={(e) => setNewActivity((s) => ({ ...s, subject: e.target.value }))} />
                      <textarea className="min-h-24 w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-200/70" placeholder="Details" value={newActivity.body} onChange={(e) => setNewActivity((s) => ({ ...s, body: e.target.value }))} />
                      <input type="datetime-local" className="w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white" value={newActivity.occurredAt} onChange={(e) => setNewActivity((s) => ({ ...s, occurredAt: e.target.value }))} />
                      <button disabled={saving} onClick={() => void addActivity()} className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                        Save entry
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold text-white">Recent timeline</h4>
                    {selected.activities.length === 0 ? (
                      <p className="text-xs text-zinc-100/75">No notes or conversations yet.</p>
                    ) : (
                      selected.activities.map((a) => (
                        <article key={a.id} className="rounded-lg border border-white/20 bg-white/5 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">{a.type}</p>
                          {a.subject && <p className="mt-1 text-sm font-semibold text-white">{a.subject}</p>}
                          <p className="mt-1 text-sm text-zinc-100/90">{a.body}</p>
                          <p className="mt-1 text-xs text-zinc-100/70">{new Date(a.occurredAt).toLocaleString()}</p>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
