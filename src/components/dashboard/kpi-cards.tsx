"use client";

import { Card, CardContent } from "@/components/ui/card";
import { KPIData } from "@/types";
import { TrendingUp, TrendingDown, Minus, Megaphone, Users, Send, MessageSquare, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [Megaphone, Users, Send, MessageSquare, ThumbsUp];

const gradients = [
  "from-violet-500/10 to-violet-500/5",
  "from-blue-500/10 to-blue-500/5",
  "from-amber-500/10 to-amber-500/5",
  "from-emerald-500/10 to-emerald-500/5",
  "from-rose-500/10 to-rose-500/5",
];

const iconColors = [
  "text-violet-600 dark:text-violet-400",
  "text-blue-600 dark:text-blue-400",
  "text-amber-600 dark:text-amber-400",
  "text-emerald-600 dark:text-emerald-400",
  "text-rose-600 dark:text-rose-400",
];

export function KPICards({ data }: { data: KPIData[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {data.map((kpi, index) => {
        const Icon = icons[index] || Megaphone;
        const TrendIcon =
          kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;

        return (
          <Card
            key={kpi.label}
            className="group relative overflow-hidden rounded-2xl border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", gradients[index])} />
            <CardContent className="relative p-5">
              <div className="flex items-center justify-between">
                <Icon className={cn("h-5 w-5", iconColors[index])} />
                {kpi.change !== undefined && (
                  <div
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                      kpi.trend === "up"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                        : kpi.trend === "down"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    )}
                  >
                    <TrendIcon className="h-3 w-3" />
                    {kpi.change > 0 ? "+" : ""}
                    {kpi.change}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
