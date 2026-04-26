"use client";

import { useEffect, useState } from "react";
import { AGENT_OPERATOR_OFFERS } from "@/lib/agent-operator-offers";

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
  const [savingRates, setSavingRates] = useState(false);

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

  async function applyMarketRates() {
    setSavingRates(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/packs/market-rates", { method: "POST" });
      if (!res.ok) {
        const e = (await res.json()) as { error?: string };
        throw new Error(e.error ?? "Failed applying market rates.");
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed applying market rates.");
    } finally {
      setSavingRates(false);
    }
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold text-white">Credit packs</h2>
          <button
            onClick={() => void applyMarketRates()}
            disabled={savingRates}
            className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
          >
            {savingRates ? "Applying..." : "Apply market-rate pricing"}
          </button>
        </div>
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

      <section className="glass mt-8 rounded-2xl p-6">
        <h2 className="font-semibold text-white">AI Agent Operator service pipeline</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Admin view: repository-derived service catalog with step-by-step execution pipeline and suggested market-rate credit pricing.
        </p>
        <div className="mt-5 space-y-4">
          {AGENT_OPERATOR_OFFERS.map((offer) => (
            <article key={offer.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-400">{offer.repoName}</p>
                  <h3 className="mt-1 text-base font-semibold text-white">{offer.service}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{offer.product}</p>
                  <a href={offer.repoUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-cyan-200 underline">
                    {offer.repoUrl}
                  </a>
                </div>
                <div className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-right">
                  <p className="text-xs uppercase tracking-wide text-zinc-400">Suggested pricing</p>
                  <p className="mt-1 text-sm font-semibold text-white">{offer.marketRateCredits} credits</p>
                  <p className="text-xs text-zinc-300">${(offer.marketRatePriceCents / 100).toLocaleString()}</p>
                </div>
              </div>
              <ol className="mt-3 grid gap-2 text-sm text-zinc-200 md:grid-cols-2">
                {offer.pipeline.map((step, i) => (
                  <li key={step} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    <span className="mr-1 text-cyan-200">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

