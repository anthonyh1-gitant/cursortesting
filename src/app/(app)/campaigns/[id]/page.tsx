"use client";

import { useParams } from "next/navigation";
import { mockCampaigns, mockCreators, mockOutreachMessages, STAGE_LABELS, STAGE_COLORS } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Users,
  Send,
  MessageSquare,
  BarChart3,
  Settings,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function CampaignDetailPage() {
  const params = useParams();
  const campaign = mockCampaigns.find((c) => c.id === params.id);

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium">Campaign not found</p>
        <Link href="/campaigns" className="mt-2 text-sm text-violet-600 hover:underline">
          Back to campaigns
        </Link>
      </div>
    );
  }

  const campaignCreators = mockCreators.filter((c) => c.campaign_id === campaign.id);
  const campaignMessages = mockOutreachMessages.filter((m) => m.campaign_id === campaign.id);

  const statusColors: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
    paused: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
    draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/campaigns">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{campaign.name}</h1>
            <Badge className={cn("rounded-full capitalize", statusColors[campaign.status])}>
              {campaign.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {campaign.product_name} &middot; {campaign.niche}
          </p>
        </div>
        {campaign.product_url && (
          <Button variant="outline" className="rounded-xl" asChild>
            <a href={campaign.product_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Product
            </a>
          </Button>
        )}
      </div>

      <Tabs defaultValue="creators" className="space-y-4">
        <TabsList className="rounded-xl bg-accent/50 p-1">
          <TabsTrigger value="creators" className="rounded-lg gap-1.5 text-xs">
            <Users className="h-3.5 w-3.5" /> Creators
          </TabsTrigger>
          <TabsTrigger value="messages" className="rounded-lg gap-1.5 text-xs">
            <MessageSquare className="h-3.5 w-3.5" /> Messages
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="rounded-lg gap-1.5 text-xs">
            <Send className="h-3.5 w-3.5" /> Pipeline
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg gap-1.5 text-xs">
            <BarChart3 className="h-3.5 w-3.5" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg gap-1.5 text-xs">
            <Settings className="h-3.5 w-3.5" /> Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creators" className="space-y-4">
          {campaignCreators.length === 0 ? (
            <Card className="rounded-2xl border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-10 w-10 text-muted-foreground/30" />
                <p className="mt-3 font-medium">No creators added yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add creators to this campaign to start outreach.
                </p>
                <Link href="/creators">
                  <Button className="mt-4 rounded-xl" variant="outline">
                    Go to Creators
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {campaignCreators.map((creator) => (
                <Card key={creator.id} className="rounded-2xl border-border/50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 text-sm font-medium text-violet-700 dark:from-violet-900/50 dark:to-indigo-900/50 dark:text-violet-300">
                        {creator.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {creator.handle} &middot; {creator.platform} &middot;{" "}
                          {(creator.follower_count / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-muted-foreground">Fit Score</p>
                        <p className="text-sm font-semibold">{creator.fit_score}</p>
                      </div>
                      <Badge className={cn("rounded-full text-xs", STAGE_COLORS[creator.stage])}>
                        {STAGE_LABELS[creator.stage]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {campaignMessages.length === 0 ? (
            <Card className="rounded-2xl border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-10 w-10 text-muted-foreground/30" />
                <p className="mt-3 font-medium">No messages yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Generate outreach messages using the AI Outreach Studio.
                </p>
                <Link href="/outreach">
                  <Button className="mt-4 rounded-xl" variant="outline">
                    Open Outreach Studio
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {campaignMessages.map((msg) => {
                const creator = mockCreators.find((c) => c.id === msg.creator_id);
                return (
                  <Card key={msg.id} className="rounded-2xl border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium">{creator?.name || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {msg.type.replace(/_/g, " ")} &middot; {msg.channel}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "rounded-full text-xs capitalize",
                            msg.status === "sent"
                              ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400"
                              : msg.status === "draft"
                              ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                          )}
                        >
                          {msg.status}
                        </Badge>
                      </div>
                      {msg.subject && (
                        <p className="text-sm font-medium mb-1">{msg.subject}</p>
                      )}
                      <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-3">
                        {msg.body}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pipeline">
          <Card className="rounded-2xl border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Send className="h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 font-medium">Pipeline View</p>
              <p className="text-sm text-muted-foreground mt-1">
                View the full pipeline board for all campaigns.
              </p>
              <Link href="/pipeline">
                <Button className="mt-4 rounded-xl" variant="outline">
                  Open Pipeline
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold">{campaign.creator_count || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Creators</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold">{campaign.sent_count || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Messages Sent</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold">
                  {campaign.sent_count
                    ? Math.round(((campaign.reply_count || 0) / campaign.sent_count) * 100)
                    : 0}
                  %
                </p>
                <p className="text-xs text-muted-foreground mt-1">Reply Rate</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Campaign Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Offer Type</p>
                  <p className="font-medium capitalize">{campaign.offer_type.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Brand Tone</p>
                  <p className="font-medium capitalize">{campaign.brand_tone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Target Audience</p>
                  <p className="font-medium">{campaign.target_audience}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Campaign Goal</p>
                  <p className="font-medium">{campaign.campaign_goal}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Description</p>
                <p className="text-sm font-medium mt-1">{campaign.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
