import Link from "next/link";

const links = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/account", label: "Account" },
  { href: "/admin", label: "Admin" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/90 bg-white/85 backdrop-blur-md dark:border-zinc-800/90 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Clearfield</span>
          <span className="hidden text-xs font-medium uppercase tracking-wider text-zinc-500 sm:inline dark:text-zinc-400">
            Modern Work
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white sm:px-3"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="ml-1 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-amber-400"
          >
            Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
