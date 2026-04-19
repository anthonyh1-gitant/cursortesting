"use client";

import { Activity } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  Megaphone,
  UserPlus,
  FileText,
  Send,
  MessageSquare,
  ArrowRightLeft,
  Trophy,
} from "lucide-react";

const activityIcons: Record<Activity["type"], typeof Megaphone> = {
  campaign_created: Megaphone,
  creator_added: UserPlus,
  message_drafted: FileText,
  message_sent: Send,
  reply_received: MessageSquare,
  stage_changed: ArrowRightLeft,
  creator_won: Trophy,
};

const activityColors: Record<Activity["type"], string> = {
  campaign_created: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
  creator_added: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
  message_drafted: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  message_sent: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400",
  reply_received: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
  stage_changed: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
  creator_won: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",
};

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  return (
    <Card className="rounded-2xl border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 px-4 pb-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-accent/50"
            >
              <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", activityColors[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight">{activity.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
