"use client";

import { Campaign } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Users, Send, MessageSquare, ArrowRight } from "lucide-react";

const statusColors: Record<Campaign["status"], string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
  paused: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
  draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
};

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link href={`/campaigns/${campaign.id}`}>
      <Card className="group rounded-2xl border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-0.5">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm truncate">{campaign.name}</h3>
                <Badge
                  variant="secondary"
                  className={cn("shrink-0 rounded-full text-xs capitalize", statusColors[campaign.status])}
                >
                  {campaign.status}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {campaign.product_name} &middot; {campaign.niche}
              </p>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                {campaign.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-violet-500" />
          </div>

          <div className="mt-4 flex items-center gap-4 border-t border-border/50 pt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{campaign.creator_count || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Send className="h-3.5 w-3.5" />
              <span>{campaign.sent_count || 0} sent</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{campaign.reply_count || 0} replies</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
