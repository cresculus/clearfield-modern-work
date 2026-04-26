"use client";

import { useRouter } from "next/navigation";

export function NavSignOutButton() {
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={() => void signOut()}
      className="site-nav-link rounded-lg px-2.5 py-2 text-sm font-medium transition sm:px-3"
    >
      Sign out
    </button>
  );
}
