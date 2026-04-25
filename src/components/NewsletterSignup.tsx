"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("idle");
    const res = await fetch("/api/email/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullName: name, source: "homepage" }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setState("err");
      setMsg(data.error ?? "Subscription failed.");
      return;
    }
    setState("ok");
    setMsg("Subscribed. We will send updates and launch notes.");
    setEmail("");
    setName("");
  }

  return (
    <form onSubmit={(e) => void submit(e)} className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
      <input
        className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-400"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        type="email"
        className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-400"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 font-semibold text-white">
        Join
      </button>
      {state !== "idle" && (
        <p className={`text-sm ${state === "ok" ? "text-emerald-300" : "text-red-300"}`}>{msg}</p>
      )}
    </form>
  );
}

