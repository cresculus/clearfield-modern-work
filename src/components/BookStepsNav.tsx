"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { href: "/book", label: "Overview" },
  { href: "/book/email", label: "Your email" },
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
    <nav aria-label="Booking steps" className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        {steps.map((s, i) => {
          const state = i < active ? "done" : i === active ? "current" : "todo";
          return (
            <li key={s.href} className="flex items-center gap-2">
              {i > 0 && (
                <span className="hidden text-zinc-300 sm:inline dark:text-zinc-600" aria-hidden>
                  →
                </span>
              )}
              <Link
                href={s.href}
                className={
                  state === "current"
                    ? "inline-flex rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-zinc-950 shadow-md"
                    : state === "done"
                      ? "inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-900 hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60"
                      : "inline-flex rounded-full border border-transparent px-4 py-1.5 text-sm font-medium text-zinc-400 dark:text-zinc-500"
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
