"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { APP_NAME, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="xl:hidden" onClick={() => setOpen((v) => !v)}>
            <Menu className="h-4 w-4" />
          </Button>
          <p className="text-sm font-semibold tracking-tight">{APP_NAME}</p>
        </div>
        <ThemeToggle />
      </div>
      <div className={cn("border-t border-slate-200 px-4 py-3 xl:hidden dark:border-slate-800", !open && "hidden")}>
        <nav className="grid gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
