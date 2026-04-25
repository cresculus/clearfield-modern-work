import Link from "next/link";

export function SiteNav() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Clearfield
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Modern Work consulting
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/#services"
            className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Services
          </Link>
          <Link
            href="/book"
            className="rounded-full bg-amber-500 px-4 py-2 text-zinc-950 shadow-sm transition hover:bg-amber-400"
          >
            Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
