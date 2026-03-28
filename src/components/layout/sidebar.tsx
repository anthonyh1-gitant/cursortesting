"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Send,
  KanbanSquare,
  BarChart3,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Creators", href: "/creators", icon: Users },
  { name: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { name: "Outreach", href: "/outreach", icon: Send },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight">
          CreatorReach
          <span className="text-violet-600 dark:text-violet-400"> AI</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5", isActive && "text-violet-600 dark:text-violet-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/50 p-4">
        <div className="rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 p-4 dark:from-violet-950/30 dark:to-indigo-950/30">
          <p className="text-xs font-medium text-violet-700 dark:text-violet-300">
            AI-Assisted Outreach
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Personalized, human-reviewed messages only.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border/50 bg-card transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-64 lg:border-r lg:border-border/50 lg:bg-card">
        <NavContent />
      </aside>
    </>
  );
}
