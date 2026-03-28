import { CreatorInsightInput, OutreachInput } from "@/lib/ai/types";

export function buildCreatorInsightPrompt(input: CreatorInsightInput) {
  return `You are a creator partnership strategist.
Creator: ${input.creatorName} (${input.handle})
Niche: ${input.niche}
Campaign goal: ${input.campaignGoal}
Return: summary, fit_score_0_to_100, personalized_hook`;
}

export function buildOutreachPrompt(input: OutreachInput) {
  return `You are writing personalized outreach.
Creator context: ${input.creatorContext}
Campaign context: ${input.campaignContext}
Channel: ${input.channel}
Tone: ${input.tone}
CTA: ${input.cta}
Offer type: ${input.offerType}
Return: subject line, first outreach message, follow-up 1, follow-up 2.`;
}
