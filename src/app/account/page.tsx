"use client";

import { useEffect, useState } from "react";

type Me = {
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
    role: "USER" | "ADMIN";
    account: { id: string; email: string; creditBalance: number };
  };
};

type Pack = { id: string; slug: string; title: string; credits: number; priceCents: number };

export default function AccountPage() {
  const [me, setMe] = useState<Me>({ authenticated: false });
  const [packs, setPacks] = useState<Pack[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadMe() {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    const data = (await res.json()) as Me;
    setMe(data);
  }

  async function loadPacks() {
    const res = await fetch("/api/packs", { cache: "no-store" });
    const data = (await res.json()) as { packs?: Pack[] };
    setPacks(data.packs ?? []);
  }

  useEffect(() => {
    queueMicrotask(() => {
      void loadMe();
      void loadPacks();
    });
  }, []);

  async function register() {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName, company }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Registration failed.");
      await loadMe();
      setMessage("Account created and signed in.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Login failed.");
      await loadMe();
      setMessage("Signed in.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await loadMe();
  }

  async function buyPack(packId: string) {
    setLoading(true);
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
      await loadMe();
      setMessage(`Purchase complete. +${data.creditsGranted ?? 0} credits`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Purchase failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Account & Credits</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Basic SaaS account setup, authentication, and consulting credit purchases.
      </p>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}
      {message && <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</p>}

      {!me.authenticated ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="font-semibold">Create account</h2>
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <input className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
              <input className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button disabled={loading} onClick={() => void register()} className="rounded-full bg-amber-500 px-4 py-2 font-semibold text-zinc-950">Register</button>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="font-semibold">Sign in</h2>
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button disabled={loading} onClick={() => void login()} className="rounded-full bg-zinc-900 px-4 py-2 font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">Sign in</button>
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="font-semibold">Profile</h2>
            <p className="mt-3 text-sm">{me.user?.email}</p>
            <p className="mt-2 text-sm">Role: {me.user?.role}</p>
            <p className="mt-2 text-2xl font-bold">Credits: {me.user?.account.creditBalance ?? 0}</p>
            <button onClick={() => void logout()} className="mt-4 rounded-full border px-4 py-2 text-sm">Sign out</button>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="font-semibold">Purchase credits</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">MVP mode uses manual purchase API; replace with Stripe checkout next.</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {packs.map((p) => (
                <li key={p.id} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
                  <p className="font-medium">{p.title}</p>
                  <p className="mt-1 text-sm">{p.credits} credits</p>
                  <p className="mt-1 text-sm">${(p.priceCents / 100).toFixed(2)}</p>
                  <button disabled={loading} onClick={() => void buyPack(p.id)} className="mt-3 rounded-full bg-amber-500 px-3 py-1.5 text-sm font-semibold text-zinc-950">Buy</button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

