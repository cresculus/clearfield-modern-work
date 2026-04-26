import Link from "next/link";
import { NavSignOutButton } from "@/components/NavSignOutButton";
import { getCurrentUser, isOwnerEmail } from "@/lib/auth";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#flow", label: "Flow" },
  { href: "/account", label: "Account" },
  { href: "/#contact", label: "Contact" },
] as const;

export async function SiteNav() {
  const user = await getCurrentUser();
  const showAdmin = user?.email && isOwnerEmail(user.email);

  return (
    <header className="site-nav sticky top-0 z-40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-white">Clearfield</span>
          <span className="hidden text-xs font-medium uppercase tracking-wider text-fuchsia-100 sm:inline">
            IT
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="site-nav-link rounded-lg px-2.5 py-2 text-sm font-medium transition sm:px-3"
            >
              {l.label}
            </Link>
          ))}
          {showAdmin && (
            <Link
              href="/admin"
              className="site-nav-admin rounded-lg px-2.5 py-2 text-sm font-medium transition sm:px-3"
            >
              Admin
            </Link>
          )}
          {user && (
            <Link
              href="/dashboard"
              className="site-nav-link rounded-lg px-2.5 py-2 text-sm font-medium transition sm:px-3"
            >
              Dashboard
            </Link>
          )}
          {user && <NavSignOutButton />}
          <Link
            href="/book"
            className="cta-gradient ml-1 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:scale-[1.02]"
          >
            Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
