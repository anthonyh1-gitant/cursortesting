import { FunnelChartNoSsr } from "@/components/analytics/funnel-chart-no-ssr";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { funnelData } from "@/lib/mock-data";
import { formatPercent } from "@/lib/utils";

export default function AnalyticsPage() {
  const sent = funnelData.find((item) => item.label === "Sent")?.value ?? 0;
  const replied = funnelData.find((item) => item.label === "Replied")?.value ?? 0;
  const won = funnelData.find((item) => item.label === "Won")?.value ?? 0;
  const replyRate = sent === 0 ? 0 : (replied / sent) * 100;
  const conversionRate = sent === 0 ? 0 : (won / sent) * 100;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Analytics"
        description="Review outreach funnel health and response conversion performance."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Reply rate</CardDescription>
            <CardTitle>{formatPercent(replyRate)}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-500 dark:text-slate-400">
            Percentage of sent outreach messages that received a reply.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Conversion rate</CardDescription>
            <CardTitle>{formatPercent(conversionRate)}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-500 dark:text-slate-400">
            Percentage of sent outreach messages that reached a won outcome.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Outreach funnel</CardTitle>
          <CardDescription>Creators progressing from list building through won partnerships.</CardDescription>
        </CardHeader>
        <CardContent>
          <FunnelChartNoSsr data={funnelData} />
        </CardContent>
      </Card>
    </div>
  );
}
