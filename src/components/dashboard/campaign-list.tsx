"use client";

import { Campaign } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const statusColors: Record<Campaign["status"], string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
  paused: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
  draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
};

export function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <Card className="rounded-2xl border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
        <Link
          href="/campaigns"
          className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2 px-4 pb-4">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className="flex items-center justify-between rounded-xl p-3 transition-all hover:bg-accent/50"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{campaign.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {campaign.product_name} &middot; {campaign.niche}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs text-muted-foreground">
                  {campaign.creator_count} creators &middot; {campaign.reply_count} replies
                </p>
              </div>
              <Badge
                variant="secondary"
                className={cn("rounded-full text-xs capitalize", statusColors[campaign.status])}
              >
                {campaign.status}
              </Badge>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
