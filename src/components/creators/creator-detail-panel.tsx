"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity, Creator, OutreachMessage } from "@/lib/types";
import { stageVariant } from "@/lib/presentation";

export function CreatorDetailPanel({
  creator,
  message,
  timeline,
}: {
  creator: Creator | null;
  message: OutreachMessage | null;
  timeline: Activity[];
}) {
  if (!creator) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Creator detail</CardTitle>
          <CardDescription>Select a creator from the table to view profile context and AI notes.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>{creator.name}</CardTitle>
        <CardDescription>{creator.handle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={stageVariant(creator.stage)}>{creator.stage}</Badge>
          <Badge variant="secondary">{creator.platform}</Badge>
          <Badge variant="outline">Fit {creator.fitScore}</Badge>
          <Badge variant="outline">{creator.offerType}</Badge>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Profile summary
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">{creator.summary}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Notes</p>
          <p className="text-sm text-slate-700 dark:text-slate-200">{creator.notes}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            AI personalized hook
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">{creator.aiHook}</p>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Generated outreach
          </p>
          {message ? (
            <div className="space-y-2 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
              <p className="font-medium">{message.subjectLine}</p>
              <p className="text-slate-600 dark:text-slate-300">{message.firstMessage}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No generated message yet. Use Outreach Studio to create the first draft.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Activity timeline
          </p>
          {timeline.length > 0 ? (
            timeline.map((activity) => (
              <div key={activity.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{activity.detail}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No timeline events yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
