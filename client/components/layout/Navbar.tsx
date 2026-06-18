"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { getPageTitle } from "@/lib/navigation";

export function Navbar() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-base font-semibold">{title}</h1>

      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {user.name}
          </span>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <LogOut className="h-4 w-4" />
            خروج
          </button>
        </div>
      )}
    </header>
  );
}
