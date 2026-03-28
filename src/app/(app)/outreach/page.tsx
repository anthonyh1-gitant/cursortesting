"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Copy,
  Check,
  Loader2,
  Minimize2,
  Heart,
  Crown,
  ShieldMinus,
  Award,
  Info,
  RefreshCw,
} from "lucide-react";
import {
  BrandTone,
  OutreachChannel,
  AIGenerationRequest,
  AIGenerationResult,
} from "@/types";
import { generateOutreachMessages, rewriteMessage } from "@/lib/ai";
import { mockCampaigns, mockCreators } from "@/data/mock";

const rewriteActions = [
  { label: "Shorter", instruction: "shorter", icon: Minimize2 },
  { label: "Warmer", instruction: "warmer", icon: Heart },
  { label: "Premium", instruction: "premium", icon: Crown },
  { label: "Less Salesy", instruction: "less salesy", icon: ShieldMinus },
  { label: "Social Proof", instruction: "social proof", icon: Award },
];

type MessageField = "subject" | "initial_message" | "follow_up_1" | "follow_up_2";

export default function OutreachPage() {
  const [loading, setLoading] = useState(false);
  const [rewriting, setRewriting] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [result, setResult] = useState<AIGenerationResult | null>(null);

  const [form, setForm] = useState<AIGenerationRequest>({
    creator_name: mockCreators[0].name,
    creator_handle: mockCreators[0].handle,
    creator_platform: mockCreators[0].platform,
    creator_niche: mockCreators[0].niche,
    creator_bio: mockCreators[0].bio,
    campaign_name: mockCampaigns[0].name,
    product_name: mockCampaigns[0].product_name,
    product_url: mockCampaigns[0].product_url,
    campaign_goal: mockCampaigns[0].campaign_goal,
    offer_type: mockCampaigns[0].offer_type,
    brand_tone: mockCampaigns[0].brand_tone,
    channel: "email",
    cta: "Would you be open to trying it?",
    additional_context: "",
  });

  const handleGenerate = async () => {
    setLoading(true);
    const generated = await generateOutreachMessages(form);
    setResult(generated);
    setLoading(false);
  };

  const handleRewrite = async (field: MessageField, instruction: string) => {
    if (!result) return;
    setRewriting(`${field}-${instruction}`);
    const rewritten = await rewriteMessage(result[field], instruction);
    setResult({ ...result, [field]: rewritten });
    setRewriting(null);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleEditMessage = (field: MessageField, value: string) => {
    if (!result) return;
    setResult({ ...result, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Outreach Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Generate personalized outreach messages with AI assistance.
        </p>
      </div>

      {/* Compliance notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
        <div>
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
            AI-Assisted Outreach Only
          </p>
          <p className="mt-0.5 text-xs text-blue-700/80 dark:text-blue-400/80">
            Messages are generated as drafts for your review. Always send manually through your own accounts. This tool does not auto-send or access social platform APIs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        {/* Form */}
        <Card className="rounded-2xl border-border/50 xl:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Outreach Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Creator</Label>
              <Select
                value={form.creator_name}
                onValueChange={(val) => {
                  const cr = mockCreators.find((c) => c.name === val);
                  if (cr) {
                    setForm({
                      ...form,
                      creator_name: cr.name,
                      creator_handle: cr.handle,
                      creator_platform: cr.platform,
                      creator_niche: cr.niche,
                      creator_bio: cr.bio,
                    });
                  }
                }}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockCreators.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name} ({c.handle})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Campaign</Label>
              <Select
                value={form.campaign_name}
                onValueChange={(val) => {
                  const camp = mockCampaigns.find((c) => c.name === val);
                  if (camp) {
                    setForm({
                      ...form,
                      campaign_name: camp.name,
                      product_name: camp.product_name,
                      product_url: camp.product_url,
                      campaign_goal: camp.campaign_goal,
                      offer_type: camp.offer_type,
                      brand_tone: camp.brand_tone,
                    });
                  }
                }}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockCampaigns.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Channel</Label>
                <Select
                  value={form.channel}
                  onValueChange={(val) => setForm({ ...form, channel: val as OutreachChannel })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="dm">DM</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Tone</Label>
                <Select
                  value={form.brand_tone}
                  onValueChange={(val) => setForm({ ...form, brand_tone: val as BrandTone })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["friendly", "professional", "casual", "premium", "playful", "bold"] as BrandTone[]).map((t) => (
                      <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">CTA / Ask</Label>
              <Input
                value={form.cta}
                onChange={(e) => setForm({ ...form, cta: e.target.value })}
                className="rounded-xl"
                placeholder="e.g. Would you be open to trying it?"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Additional Context (optional)</Label>
              <Textarea
                value={form.additional_context}
                onChange={(e) => setForm({ ...form, additional_context: e.target.value })}
                className="min-h-[60px] rounded-xl"
                placeholder="Any specific details to include..."
              />
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Messages
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="xl:col-span-3 space-y-4">
          {!result ? (
            <Card className="rounded-2xl border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Sparkles className="h-12 w-12 text-muted-foreground/20" />
                <p className="mt-4 font-medium">Ready to generate</p>
                <p className="mt-1 text-sm text-muted-foreground text-center max-w-sm">
                  Fill in the outreach context on the left and click Generate to create personalized messages.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {(
                [
                  { key: "subject" as MessageField, label: "Subject Line", show: form.channel === "email" },
                  { key: "initial_message" as MessageField, label: "Initial Outreach" },
                  { key: "follow_up_1" as MessageField, label: "Follow-up #1" },
                  { key: "follow_up_2" as MessageField, label: "Follow-up #2" },
                ] as { key: MessageField; label: string; show?: boolean }[]
              )
                .filter((m) => m.show !== false)
                .map((msg) => (
                  <Card key={msg.key} className="rounded-2xl border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-semibold">{msg.label}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 rounded-lg text-xs"
                        onClick={() => handleCopy(result[msg.key], msg.key)}
                      >
                        {copiedField === msg.key ? (
                          <>
                            <Check className="mr-1 h-3 w-3" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3 w-3" /> Copy
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        value={result[msg.key]}
                        onChange={(e) => handleEditMessage(msg.key, e.target.value)}
                        className="min-h-[120px] rounded-xl text-sm"
                      />
                      {msg.key !== "subject" && (
                        <div className="flex flex-wrap gap-2">
                          {rewriteActions.map((action) => (
                            <Button
                              key={action.instruction}
                              variant="outline"
                              size="sm"
                              className="h-7 rounded-lg text-xs"
                              disabled={rewriting === `${msg.key}-${action.instruction}`}
                              onClick={() => handleRewrite(msg.key, action.instruction)}
                            >
                              {rewriting === `${msg.key}-${action.instruction}` ? (
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              ) : (
                                <action.icon className="mr-1 h-3 w-3" />
                              )}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Regenerate All
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
