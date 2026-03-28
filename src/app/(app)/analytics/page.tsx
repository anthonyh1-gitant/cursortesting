"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockFunnelData, mockChartData } from "@/data/mock";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { TrendingUp, Users, Send, MessageSquare, Trophy, Target } from "lucide-react";

const funnelColors = ["#8b5cf6", "#7c3aed", "#6d28d9", "#06b6d4", "#0891b2", "#10b981"];

const kpis = [
  { label: "Total Creators", value: 47, icon: Users, color: "text-violet-600 dark:text-violet-400", bg: "from-violet-500/10 to-violet-500/5" },
  { label: "Messages Sent", value: 25, icon: Send, color: "text-blue-600 dark:text-blue-400", bg: "from-blue-500/10 to-blue-500/5" },
  { label: "Replies Received", value: 17, icon: MessageSquare, color: "text-cyan-600 dark:text-cyan-400", bg: "from-cyan-500/10 to-cyan-500/5" },
  { label: "Deals Won", value: 6, icon: Trophy, color: "text-emerald-600 dark:text-emerald-400", bg: "from-emerald-500/10 to-emerald-500/5" },
  { label: "Reply Rate", value: "68%", icon: Target, color: "text-amber-600 dark:text-amber-400", bg: "from-amber-500/10 to-amber-500/5" },
  { label: "Win Rate", value: "24%", icon: TrendingUp, color: "text-rose-600 dark:text-rose-400", bg: "from-rose-500/10 to-rose-500/5" },
];

const conversionData = [
  { name: "Reply Rate", value: 68 },
  { name: "Interest Rate", value: 48 },
  { name: "Win Rate", value: 24 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your outreach funnel and conversion metrics.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="group relative overflow-hidden rounded-2xl border-border/50 transition-all hover:shadow-lg hover:shadow-violet-500/5">
            <div className={`absolute inset-0 bg-gradient-to-br opacity-50 ${kpi.bg}`} />
            <CardContent className="relative p-4 text-center">
              <kpi.icon className={`mx-auto h-5 w-5 ${kpi.color}`} />
              <p className="mt-2 text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Funnel Chart */}
        <Card className="rounded-2xl border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Outreach Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockFunnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="stage" tick={{ fontSize: 12 }} width={60} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                      fontSize: "13px",
                    }}
                    formatter={(value, _name, item) => [
                      `${value} (${(item as unknown as { payload: { percentage: number } }).payload.percentage}%)`,
                      "Count",
                    ]}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {mockFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={funnelColors[index % funnelColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="rounded-2xl border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sentGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="repliedGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="wonGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                      fontSize: "13px",
                    }}
                  />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "13px" }} />
                  <Area type="monotone" dataKey="sent" stroke="#8b5cf6" fill="url(#sentGrad2)" strokeWidth={2} />
                  <Area type="monotone" dataKey="replied" stroke="#06b6d4" fill="url(#repliedGrad2)" strokeWidth={2} />
                  <Area type="monotone" dataKey="won" stroke="#10b981" fill="url(#wonGrad2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion rates */}
      <Card className="rounded-2xl border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Conversion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {conversionData.map((item) => (
              <div key={item.name} className="rounded-xl bg-accent/50 p-4 text-center">
                <p className="text-3xl font-bold text-foreground">{item.value}%</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.name}</p>
                <div className="mt-3 h-2 w-full rounded-full bg-border/50">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
