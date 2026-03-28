"use client";

import { Creator } from "@/types";
import { STAGE_LABELS, STAGE_COLORS, mockCampaigns } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Mail,
  Sparkles,
  Lightbulb,
  Clock,
  Copy,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  creator: Creator | null;
  open: boolean;
  onClose: () => void;
}

export function CreatorDetailPanel({ creator, open, onClose }: Props) {
  if (!creator) return null;

  const campaign = mockCampaigns.find((c) => c.id === creator.campaign_id);
  const initials = creator.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 text-sm font-semibold text-violet-700 dark:from-violet-900/50 dark:to-indigo-900/50 dark:text-violet-300">
                {initials}
              </div>
              <div>
                <SheetTitle className="text-left text-lg">{creator.name}</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  {creator.handle} &middot;{" "}
                  <span className="capitalize">{creator.platform}</span>
                </p>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="px-6 space-y-5 pb-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-accent/50 p-3 text-center">
              <p className="text-lg font-bold">{(creator.follower_count / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="rounded-xl bg-accent/50 p-3 text-center">
              <p className="text-lg font-bold">{creator.engagement_rate || "—"}%</p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
            <div className="rounded-xl bg-accent/50 p-3 text-center">
              <p className="text-lg font-bold">{creator.fit_score}</p>
              <p className="text-xs text-muted-foreground">Fit Score</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <Badge className={cn("rounded-full", STAGE_COLORS[creator.stage])}>
              {STAGE_LABELS[creator.stage]}
            </Badge>
            <Badge variant="secondary" className="rounded-full capitalize">
              {creator.offer_type.replace("_", " ")}
            </Badge>
            {campaign && (
              <Badge variant="outline" className="rounded-full text-xs">
                {campaign.name}
              </Badge>
            )}
          </div>

          {/* Bio */}
          {creator.bio && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Bio</p>
              <p className="text-sm">{creator.bio}</p>
            </div>
          )}

          {/* Contact */}
          {creator.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{creator.email}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => navigator.clipboard.writeText(creator.email || "")}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          )}

          <Separator />

          {/* AI Summary */}
          {creator.ai_summary && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="h-4 w-4 text-violet-500" />
                <p className="text-xs font-medium">AI Summary</p>
              </div>
              <p className="text-sm text-muted-foreground">{creator.ai_summary}</p>
            </div>
          )}

          {/* AI Hooks */}
          {creator.ai_hooks && creator.ai_hooks.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <p className="text-xs font-medium">Personalization Hooks</p>
              </div>
              <ul className="space-y-1.5">
                {creator.ai_hooks.map((hook, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                    {hook}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notes */}
          {creator.notes && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Notes</p>
              <p className="text-sm">{creator.notes}</p>
            </div>
          )}

          <Separator />

          {/* Activity */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Last activity{" "}
            {formatDistanceToNow(new Date(creator.last_activity), { addSuffix: true })}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700" asChild>
              <a href="/outreach">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Outreach
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
