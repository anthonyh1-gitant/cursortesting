"use client";

import { KPICards } from "@/components/dashboard/kpi-cards";
import { OutreachChart } from "@/components/dashboard/outreach-chart";
import { CampaignList } from "@/components/dashboard/campaign-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { mockKPIs, mockCampaigns, mockActivities } from "@/data/mock";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your creator outreach at a glance.
        </p>
      </div>

      <KPICards data={mockKPIs} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OutreachChart />
        <CampaignList campaigns={mockCampaigns.slice(0, 4)} />
      </div>

      <ActivityFeed activities={mockActivities} />
    </div>
  );
}
