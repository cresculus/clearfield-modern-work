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
      <h1 className="text-3xl font-bold tracking-tight text-white">Admin</h1>
      <p className="mt-2 text-sm text-zinc-300">Owner dashboard</p>
      {error && <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

      {overview && (
        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {Object.entries(overview).map(([k, v]) => (
            <div key={k} className="glass rounded-xl p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-zinc-400">{k}</p>
              <p className="mt-1 text-2xl font-bold text-white">{v}</p>
            </div>
          ))}
        </div>
      )}

      <section className="glass mt-8 rounded-2xl p-6">
        <h2 className="font-semibold text-white">Credit packs</h2>
        <ul className="mt-4 space-y-2">
          {packs.map((p) => (
            <li key={p.id} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200">
              {p.title} ({p.slug}) - {p.credits} credits - ${(p.priceCents / 100).toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="mt-5 grid gap-2 sm:grid-cols-5">
          <input className="rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 text-white placeholder:text-zinc-400" placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <input className="rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 text-white placeholder:text-zinc-400" placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 text-white placeholder:text-zinc-400" placeholder="credits" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })} />
          <input className="rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 text-white placeholder:text-zinc-400" placeholder="priceCents" value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: e.target.value })} />
          <button onClick={() => void savePack()} className="rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white">Save</button>
        </div>
      </section>
    </div>
  );
}

