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
        className="rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        type="email"
        className="rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="rounded-full bg-amber-500 px-4 py-2 font-semibold text-zinc-950">Join list</button>
      {state !== "idle" && (
        <p className={`text-sm ${state === "ok" ? "text-emerald-700" : "text-red-700"}`}>{msg}</p>
      )}
    </form>
  );
}

