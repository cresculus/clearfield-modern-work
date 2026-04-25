"use client";

import { useState } from "react";

/** Password-manager extensions often spam the console; set expectations. */
export function ExtensionTip() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">
      <div className="flex items-start justify-between gap-3">
        <p className="leading-relaxed">
          <strong className="font-semibold">Seeing red errors in the console?</strong> Scripts named{" "}
          <code className="rounded bg-white/10 px-1">vendor.js</code> /{" "}
          <code className="rounded bg-white/10 px-1">content.js</code> usually come from a{" "}
          <strong>browser extension</strong> (Dashlane, Grammarly, etc.), not this site. Use a{" "}
          <strong>private window with extensions off</strong> if you want a clean console.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-indigo-100 hover:bg-white/10"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
