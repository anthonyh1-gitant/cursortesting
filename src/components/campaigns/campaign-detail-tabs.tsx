"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PipelineBoard } from "@/components/creators/pipeline-board";
import { Campaign, Creator, OutreachMessage, PipelineStage } from "@/lib/types";
import { stageVariant } from "@/lib/presentation";

export function CampaignDetailTabs({
  campaign,
  campaignCreators,
  messages,
}: {
  campaign: Campaign;
  campaignCreators: Creator[];
  messages: OutreachMessage[];
}) {
  return (
    <Tabs defaultValue="creators" className="space-y-4">
      <TabsList>
        <TabsTrigger value="creators">Creators</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="creators">
        <Card>
          <CardHeader>
            <CardTitle>Campaign creators</CardTitle>
            <CardDescription>Track fit, stage, and relationship quality by creator.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {campaignCreators.map((creator) => (
              <div key={creator.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{creator.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{creator.handle}</p>
                  </div>
                  <Badge variant={stageVariant(creator.stage)}>{creator.stage}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {creator.platform} · Fit {creator.fitScore} · {creator.offerType}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="messages">
        <Card>
          <CardHeader>
            <CardTitle>Outreach messages</CardTitle>
            <CardDescription>Editable AI-generated messages tied to campaign creators.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div key={message.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-sm font-semibold">{message.subjectLine}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {message.firstMessage}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Updated {new Date(message.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No messages yet. Use Outreach Studio to generate the first draft.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pipeline">
        <PipelineBoard creators={campaignCreators} title="Campaign pipeline board" />
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Campaign analytics</CardTitle>
            <CardDescription>High-level progress and response performance.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500">Creators</p>
              <p className="mt-2 text-2xl font-semibold">{campaignCreators.length}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500">Ready to send</p>
              <p className="mt-2 text-2xl font-semibold">
                {campaignCreators.filter((c) => c.stage === "Ready to Send").length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500">Interested</p>
              <p className="mt-2 text-2xl font-semibold">
                {campaignCreators.filter((c) => c.stage === "Interested").length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-xs uppercase tracking-wide text-slate-500">Stage spread</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {(Object.entries(
                  campaignCreators.reduce<Record<string, number>>((acc, creator) => {
                    acc[creator.stage] = (acc[creator.stage] ?? 0) + 1;
                    return acc;
                  }, {}),
                ) as [PipelineStage, number][])
                  .slice(0, 4)
                  .map(([stage, count]) => (
                    <Badge key={stage} variant={stageVariant(stage)}>
                      {stage}: {count}
                    </Badge>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Campaign settings</CardTitle>
            <CardDescription>Campaign configuration snapshot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-slate-500 dark:text-slate-400">Product:</span> {campaign.productName}
            </p>
            <p>
              <span className="text-slate-500 dark:text-slate-400">Niche:</span> {campaign.niche}
            </p>
            <p>
              <span className="text-slate-500 dark:text-slate-400">Target audience:</span> {campaign.targetAudience}
            </p>
            <p>
              <span className="text-slate-500 dark:text-slate-400">Tone:</span> {campaign.brandTone}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
