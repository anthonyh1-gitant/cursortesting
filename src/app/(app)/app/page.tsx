import { PageHeader } from "@/components/layout/page-header";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { OverviewChartNoSsr } from "@/components/dashboard/overview-chart-no-ssr";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activities, campaigns, dashboardChartData, getDashboardKpis } from "@/lib/mock-data";

export default function DashboardPage() {
  const kpis = getDashboardKpis();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Monitor campaign performance, creator pipeline movement, and outreach momentum."
      />
      <div className="space-y-6">
        <KpiCards kpis={kpis} />
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Outreach trend</CardTitle>
              <CardDescription>Drafted vs sent vs replied over the last four weeks.</CardDescription>
            </CardHeader>
            <CardContent>
              <OverviewChartNoSsr data={dashboardChartData} />
            </CardContent>
          </Card>
          <RecentCampaigns campaigns={campaigns.slice(0, 4)} />
        </div>
        <RecentActivity activities={activities.slice(0, 5)} />
      </div>
    </div>
  );
}
