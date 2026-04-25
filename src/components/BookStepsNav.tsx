"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { href: "/book", label: "Overview" },
  { href: "/book/email", label: "Account" },
  { href: "/book/schedule", label: "Pick a time" },
  { href: "/book/confirmation", label: "Done" },
] as const;

export function BookStepsNav() {
  const pathname = usePathname();
  const active = Math.max(
    0,
    steps.findIndex((s) => s.href === pathname),
  );

  return (
    <nav aria-label="Booking steps" className="mb-10 border-b border-white/10 pb-6">
      <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        {steps.map((s, i) => {
          const state = i < active ? "done" : i === active ? "current" : "todo";
          return (
            <li key={s.href} className="flex items-center gap-2">
              {i > 0 && (
                <span className="hidden text-zinc-600 sm:inline" aria-hidden>
                  →
                </span>
              )}
              <Link
                href={s.href}
                className={
                  state === "current"
                    ? "inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md"
                    : state === "done"
                      ? "inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-200 hover:bg-emerald-500/30"
                      : "inline-flex rounded-full border border-transparent px-4 py-1.5 text-sm font-medium text-zinc-400"
                }
              >
                {i + 1}. {s.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
