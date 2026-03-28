import { CreatorInsightInput, CreatorInsightResult, OutreachInput, OutreachOutput } from "@/lib/ai/types";

const rewritePresets: Record<string, string> = {
  shorter: "Keep every sentence concise and remove filler.",
  warmer: "Increase warmth, appreciation, and gratitude.",
  premium: "Use elevated positioning and premium language.",
  less_salesy: "Lower pressure and make the ask collaborative.",
  social_proof: "Include one concrete social proof element.",
};

export async function generateCreatorInsightsMock(input: CreatorInsightInput): Promise<CreatorInsightResult> {
  const fitBase = Math.max(70, Math.min(96, 78 + input.niche.length % 13));
  return {
    summary: `${input.creatorName} appears aligned with the ${input.niche} audience and can support "${input.campaignGoal}" with authentic, creator-native storytelling.`,
    fitScore: fitBase,
    personalizedHook: `Your recent ${input.niche.toLowerCase()} content style feels like a strong fit for this campaign's objective.`,
  };
}

export async function generateOutreachMock(input: OutreachInput): Promise<OutreachOutput> {
  const subjectLine = `Loved your recent content — potential ${input.offerType.toLowerCase()} collab`;
  const firstOutreachMessage = `Hey there — I lead partnerships at CreatorReach AI. I really liked your recent content, especially how clearly you explain ideas your audience can act on. We're running a campaign and thought your perspective could be a great fit. If you're open, I can share a simple concept with timeline, deliverables, and ${input.offerType.toLowerCase()} terms.`;
  const followUpOne = `Quick follow-up in case this got buried. Happy to tailor the idea to your content format and preferred workflow.`;
  const followUpTwo = `Final bump from me. If now is not ideal, I can reconnect later with a lighter brief.`;

  return {
    subjectLine,
    firstOutreachMessage:
      input.channel === "Email" ? firstOutreachMessage : firstOutreachMessage.replace("subject", "message"),
    followUpOne,
    followUpTwo,
  };
}

export async function rewriteOutreachMock(message: string, action: keyof typeof rewritePresets) {
  const modifier = rewritePresets[action] ?? "Refine clarity and personalization.";
  return `${message}\n\n[Rewrite guidance applied: ${modifier}]`;
}
