"use client";

import { Copy, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COMPLIANCE_NOTE } from "@/lib/constants";
import { OfferType } from "@/lib/types";

type GeneratedState = {
  subjectLine: string;
  firstOutreachMessage: string;
  followUpOne: string;
  followUpTwo: string;
} | null;

const rewriteActions = [
  { label: "Rewrite shorter", action: "shorter" },
  { label: "Make warmer", action: "warmer" },
  { label: "Make more premium", action: "premium" },
  { label: "Make less salesy", action: "less_salesy" },
  { label: "Add social proof", action: "social_proof" },
] as const;

export function OutreachStudio() {
  const [creatorContext, setCreatorContext] = useState("");
  const [campaignContext, setCampaignContext] = useState("");
  const [channel, setChannel] = useState<"Email" | "Instagram DM" | "LinkedIn Message">("Email");
  const [tone, setTone] = useState("Warm and credible");
  const [cta, setCta] = useState("Open to a short call next week?");
  const [offerType, setOfferType] = useState<OfferType>("Affiliate");
  const [loading, setLoading] = useState(false);
  const [rewritingKey, setRewritingKey] = useState<
    "subjectLine" | "firstOutreachMessage" | "followUpOne" | "followUpTwo" | null
  >(null);
  const [result, setResult] = useState<GeneratedState>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch("/api/ai/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorContext,
          campaignContext,
          channel,
          tone,
          cta,
          offerType,
        }),
      });
      const data = await response.json();
      setResult(data.result);
      setStatus(`Generated with ${data.provider} provider.`);
    } catch {
      setStatus("Failed to generate outreach.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRewrite(
    key: "subjectLine" | "firstOutreachMessage" | "followUpOne" | "followUpTwo",
    action: string,
  ) {
    if (!result) return;
    setRewritingKey(key);
    try {
      const response = await fetch("/api/ai/outreach", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: result[key],
          action,
        }),
      });
      const data = await response.json();
      setResult({
        ...result,
        [key]: data.result,
      });
    } finally {
      setRewritingKey(null);
    }
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
    setStatus("Copied to clipboard.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>AI Outreach Studio</CardTitle>
          <CardDescription>Generate personalized outreach drafts with safe, campaign-aware context.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="creator-context">Creator context</Label>
            <Textarea
              id="creator-context"
              value={creatorContext}
              onChange={(e) => setCreatorContext(e.target.value)}
              placeholder="Recent content themes, audience behavior, style..."
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="campaign-context">Campaign context</Label>
            <Textarea
              id="campaign-context"
              value={campaignContext}
              onChange={(e) => setCampaignContext(e.target.value)}
              placeholder="Product, unique angle, constraints, social proof..."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="channel">Channel</Label>
              <Select id="channel" value={channel} onChange={(e) => setChannel(e.target.value as typeof channel)}>
                <option value="Email">Email</option>
                <option value="Instagram DM">Instagram DM</option>
                <option value="LinkedIn Message">LinkedIn Message</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="offer-type">Offer type</Label>
              <Select
                id="offer-type"
                value={offerType}
                onChange={(e) => setOfferType(e.target.value as OfferType)}
              >
                <option value="Affiliate">Affiliate</option>
                <option value="Paid Post">Paid Post</option>
                <option value="Gifted Product">Gifted Product</option>
                <option value="Ambassador">Ambassador</option>
                <option value="Revenue Share">Revenue Share</option>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tone">Tone</Label>
            <Input id="tone" value={tone} onChange={(e) => setTone(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cta">CTA</Label>
            <Input id="cta" value={cta} onChange={(e) => setCta(e.target.value)} />
          </div>
          <p className="rounded-xl border border-amber-300/60 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            {COMPLIANCE_NOTE}
          </p>
          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            <Sparkles className="h-4 w-4" />
            {loading ? "Generating..." : "Generate outreach sequence"}
          </Button>
          {status ? <p className="text-sm text-slate-500 dark:text-slate-400">{status}</p> : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated drafts</CardTitle>
          <CardDescription>Edit, refine, and copy messages before sending manually.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result ? (
            ([
              ["subjectLine", "Outreach subject line"],
              ["firstOutreachMessage", "First outreach message"],
              ["followUpOne", "Follow-up 1"],
              ["followUpTwo", "Follow-up 2"],
            ] as const).map(([key, label]) => (
              <div key={key} className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{label}</p>
                  <Button size="sm" variant="ghost" onClick={() => copyText(result[key])}>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
                {key === "subjectLine" ? (
                  <Input
                    value={result[key]}
                    onChange={(e) => setResult({ ...result, [key]: e.target.value })}
                  />
                ) : (
                  <Textarea
                    value={result[key]}
                    onChange={(e) => setResult({ ...result, [key]: e.target.value })}
                    className="min-h-[120px]"
                  />
                )}
                <div className="flex flex-wrap gap-2">
                  {rewriteActions.map((item) => (
                    <Button
                      key={item.action}
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={rewritingKey === key}
                      onClick={() => handleRewrite(key, item.action)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Add campaign + creator context, then generate your first outreach draft sequence.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
