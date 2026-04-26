"use client";

import { useEffect, useState } from "react";

const palettes = [
  { id: "fun", label: "Fun" },
  { id: "trustworthy", label: "Trustworthy" },
  { id: "modern", label: "Modern" },
  { id: "sustainable", label: "Sustainable" },
  { id: "sophisticated", label: "Sophisticated" },
  { id: "tech", label: "Tech" },
] as const;

type PaletteId = (typeof palettes)[number]["id"];
const STORAGE_KEY = "cf_palette";

export function PaletteTester() {
  const [current, setCurrent] = useState<PaletteId>("fun");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as PaletteId | null;
    const initial = saved && palettes.some((p) => p.id === saved) ? saved : "fun";
    document.documentElement.setAttribute("data-palette", initial);
    queueMicrotask(() => setCurrent(initial));
  }, []);

  function applyPalette(id: PaletteId) {
    document.documentElement.setAttribute("data-palette", id);
    localStorage.setItem(STORAGE_KEY, id);
    setCurrent(id);
  }

  return (
    <aside className="palette-tester">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/90">Palette Testing</p>
      <p className="mt-1 text-[11px] text-white/75">Try options and keep what feels right.</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {palettes.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPalette(p.id)}
            className={`rounded-md border px-2 py-1.5 text-xs font-medium transition ${
              current === p.id
                ? "border-white/80 bg-white/20 text-white"
                : "border-white/30 bg-white/10 text-white/90 hover:bg-white/20"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
