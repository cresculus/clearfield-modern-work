"use client";

import { useEffect, useState } from "react";

type Overview = {
  accounts: number;
  users: number;
  bookings: number;
  subscribers: number;
  purchases: number;
};

type Pack = {
  id: string;
  slug: string;
  title: string;
  credits: number;
  priceCents: number;
  displayOrder: number;
  isActive: boolean;
};

export default function AdminPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ slug: "", title: "", credits: "5", priceCents: "75000", displayOrder: "10" });

  async function load() {
    setError(null);
    const [o, p] = await Promise.all([
      fetch("/api/admin/overview", { cache: "no-store" }),
      fetch("/api/admin/packs", { cache: "no-store" }),
    ]);
    if (!o.ok) {
      const e = (await o.json()) as { error?: string };
      throw new Error(e.error ?? "Admin overview failed.");
    }
    if (!p.ok) {
      const e = (await p.json()) as { error?: string };
      throw new Error(e.error ?? "Admin packs failed.");
    }
    setOverview(await o.json());
    setPacks((await p.json()).packs as Pack[]);
  }

  useEffect(() => {
    queueMicrotask(() => {
      void load().catch((e) => setError(e instanceof Error ? e.message : "Failed loading admin."));
    });
  }, []);

  async function savePack() {
    setError(null);
    const res = await fetch("/api/admin/packs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: form.slug,
        title: form.title,
        credits: Number(form.credits),
        priceCents: Number(form.priceCents),
        displayOrder: Number(form.displayOrder),
      }),
    });
    if (!res.ok) {
      const e = (await res.json()) as { error?: string };
      setError(e.error ?? "Save failed.");
      return;
    }
    await load();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Admin</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Manage packs, monitor users, subscribers, and purchases.</p>
      {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}

      {overview && (
        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {Object.entries(overview).map(([k, v]) => (
            <div key={k} className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
              <p className="text-xs uppercase tracking-wide text-zinc-500">{k}</p>
              <p className="mt-1 text-2xl font-bold">{v}</p>
            </div>
          ))}
        </div>
      )}

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="font-semibold">Credit packs</h2>
        <ul className="mt-4 space-y-2">
          {packs.map((p) => (
            <li key={p.id} className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700">
              {p.title} ({p.slug}) - {p.credits} credits - ${(p.priceCents / 100).toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="mt-5 grid gap-2 sm:grid-cols-5">
          <input className="rounded-lg border px-2 py-1.5 bg-white dark:bg-zinc-900" placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <input className="rounded-lg border px-2 py-1.5 bg-white dark:bg-zinc-900" placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="rounded-lg border px-2 py-1.5 bg-white dark:bg-zinc-900" placeholder="credits" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })} />
          <input className="rounded-lg border px-2 py-1.5 bg-white dark:bg-zinc-900" placeholder="priceCents" value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: e.target.value })} />
          <button onClick={() => void savePack()} className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950">Save pack</button>
        </div>
      </section>
    </div>
  );
}

