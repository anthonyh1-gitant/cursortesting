"use client";

import { BarChart3, FolderKanban, LayoutGrid, Megaphone, Settings, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/app", icon: LayoutGrid },
  { label: "Campaigns", href: "/app/campaigns", icon: FolderKanban },
  { label: "Creators", href: "/app/creators", icon: Users2 },
  { label: "Outreach", href: "/app/outreach", icon: Megaphone },
  { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
  { label: "Settings", href: "/app/settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200/80 bg-white/70 p-5 backdrop-blur xl:block dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mb-8">
        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {APP_NAME}
        </div>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">AI-assisted creator outreach CRM.</p>
      </div>
      <nav className="space-y-1">
        {nav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
