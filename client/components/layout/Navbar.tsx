"use client";

import { usePathname } from "next/navigation";
import { getPageTitle } from "@/lib/navigation";

export function Navbar() {
  const title = getPageTitle(usePathname());

  return (
    <header className="border-b border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-base font-semibold">{title}</h1>
    </header>
  );
}
