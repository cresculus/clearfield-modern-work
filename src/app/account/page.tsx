"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
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
      if (returnTo) router.push(returnTo);
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
      if (returnTo) router.push(returnTo);
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
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">Account & Credits</h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-300">
        This page is your control center for sign-in, credits, and booking access. Use Gmail or work email. Credits are tied
        to your account so booking history and balance stay synchronized.
      </p>

      {error && <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
      {message && <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{message}</p>}

      {!me.authenticated ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white">Register</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              New accounts can use the intro credit to book a first session.
            </p>
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-400" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <input className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-400" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
              <input className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-400" placeholder="Email (gmail or work)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-400" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button disabled={loading} onClick={() => void register()} className="rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 font-semibold text-white">Create account</button>
            </div>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white">Sign in</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Returning clients can sign in to manage credits and book time.
            </p>
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-400" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-400" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button disabled={loading} onClick={() => void login()} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold text-white">Sign in</button>
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <section className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white">Profile</h2>
            <p className="mt-3 text-sm text-zinc-300">{me.user?.email}</p>
            <p className="mt-2 text-sm text-zinc-400">{me.user?.role}</p>
            <p className="mt-2 text-3xl font-bold text-white">{me.user?.account.creditBalance ?? 0} credits</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              1 credit = 45-minute session.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => void logout()} className="rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-200">Sign out</button>
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white"
              >
                Open dashboard
              </button>
            </div>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white">Buy credits</h2>
            <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-zinc-300">
              <p><strong>1 credit:</strong> one 45-minute session + short action summary.</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              After purchase, credits apply immediately to your account and are available on the booking page.
            </p>
            {packs.length === 0 ? (
              <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                Credit packs are loading. Refresh in a moment if they do not appear.
              </div>
            ) : (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {packs.map((p) => (
                  <li key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="font-medium text-white">{p.title}</p>
                    <p className="mt-1 text-sm text-zinc-300">{p.credits} credits</p>
                    <p className="mt-1 text-sm text-zinc-300">${(p.priceCents / 100).toFixed(2)}</p>
                    <button disabled={loading} onClick={() => void buyPack(p.id)} className="mt-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-3 py-1.5 text-sm font-semibold text-white">Buy</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

