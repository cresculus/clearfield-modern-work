"use client";

import { useState } from "react";

/** Password-manager extensions often spam the console; set expectations. */
export function ExtensionTip() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/90 px-4 py-3 text-sm text-sky-950 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-100">
      <div className="flex items-start justify-between gap-3">
        <p className="leading-relaxed">
          <strong className="font-semibold">Seeing red errors in the console?</strong> Scripts named{" "}
          <code className="rounded bg-black/5 px-1 dark:bg-white/10">vendor.js</code> /{" "}
          <code className="rounded bg-black/5 px-1 dark:bg-white/10">content.js</code> usually come from a{" "}
          <strong>browser extension</strong> (Dashlane, Grammarly, etc.), not this site. Use a{" "}
          <strong>private window with extensions off</strong> if you want a clean console.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-sky-800 hover:bg-sky-100 dark:text-sky-200 dark:hover:bg-sky-900/50"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
