import { Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { DashboardKpi } from "@/lib/types";

export function KpiCards({ kpis }: { kpis: DashboardKpi[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{kpi.label}</p>
              <Sparkles className="h-4 w-4 text-slate-400" />
            </div>
            <p className="text-2xl font-semibold tracking-tight">{kpi.value}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{kpi.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
