"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/lib/types";

export function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  if (campaigns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No campaigns yet</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-500 dark:text-slate-400">
          Create your first campaign to start adding creators and generating outreach drafts.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {campaigns.map((campaign) => (
        <Link key={campaign.id} href={`/app/campaigns/${campaign.id}`}>
          <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="line-clamp-1">{campaign.name}</CardTitle>
                <Badge
                  variant={
                    campaign.status === "active"
                      ? "success"
                      : campaign.status === "paused"
                        ? "warning"
                        : "default"
                  }
                >
                  {campaign.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{campaign.productName}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-slate-500 dark:text-slate-400">Niche:</span> {campaign.niche}
              </p>
              <p>
                <span className="text-slate-500 dark:text-slate-400">Goal:</span> {campaign.campaignGoal}
              </p>
              <p>
                <span className="text-slate-500 dark:text-slate-400">Offer:</span> {campaign.offerType}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
