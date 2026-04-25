import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

const links = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "Flow" },
  { href: "/account", label: "Account" },
  { href: "/contact", label: "Contact" },
] as const;

export async function SiteNav() {
  const user = await getCurrentUser();
  const showAdmin = user?.email.toLowerCase() === "brandon.sardelli@gmail.com";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-white">Clearfield</span>
          <span className="hidden text-xs font-medium uppercase tracking-wider text-indigo-200/70 sm:inline">
            IT
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white sm:px-3"
            >
              {l.label}
            </Link>
          ))}
          {showAdmin && (
            <Link
              href="/admin"
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-indigo-200 transition hover:bg-indigo-500/20 hover:text-indigo-100 sm:px-3"
            >
              Admin
            </Link>
          )}
          <Link
            href="/book"
            className="ml-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.02] hover:from-fuchsia-400 hover:to-indigo-400"
          >
            Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
