"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface OverviewChartProps {
  data: Array<{
    week: string;
    drafted: number;
    sent: number;
    replied: number;
  }>;
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" tickLine={false} axisLine={false} width={28} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.3)",
              background: "rgba(255,255,255,0.95)",
            }}
          />
          <Line dataKey="drafted" stroke="#6366f1" strokeWidth={2.5} dot={false} />
          <Line dataKey="sent" stroke="#0ea5e9" strokeWidth={2.5} dot={false} />
          <Line dataKey="replied" stroke="#10b981" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
