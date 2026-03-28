import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/lib/types";

export function RecentCampaigns({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent campaigns</CardTitle>
        <CardDescription>Jump into campaign-level execution and outreach.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            href={`/app/campaigns/${campaign.id}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
          >
            <div>
              <p className="font-medium">{campaign.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{campaign.productName}</p>
            </div>
            <Badge variant={campaign.status === "active" ? "success" : campaign.status === "paused" ? "warning" : "default"}>
              {campaign.status}
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
