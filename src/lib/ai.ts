import { AIGenerationRequest, AIGenerationResult } from "@/types";

/**
 * Mock AI generation — structured to be replaced with OpenAI API calls.
 * Each function simulates AI output with realistic placeholder content.
 */

export async function generateOutreachMessages(
  request: AIGenerationRequest
): Promise<AIGenerationResult> {
  await simulateDelay();

  const { creator_name, creator_handle, product_name, campaign_goal, offer_type, brand_tone, channel } = request;
  const firstName = creator_name.split(" ")[0];
  const isEmail = channel === "email";

  const toneAdjective = {
    friendly: "warm and approachable",
    professional: "polished and direct",
    casual: "relaxed and conversational",
    premium: "elevated and exclusive",
    playful: "fun and energetic",
    bold: "confident and direct",
  }[brand_tone];

  const offerText = {
    gifted: `send you ${product_name} to try`,
    paid: `discuss a paid collaboration around ${product_name}`,
    affiliate: `explore an affiliate partnership for ${product_name}`,
    revenue_share: `propose a revenue share partnership for ${product_name}`,
    barter: `explore a value exchange around ${product_name}`,
    other: `collaborate on something around ${product_name}`,
  }[offer_type];

  return {
    subject: isEmail
      ? `Love your content ${creator_handle} — quick collab idea?`
      : "",
    initial_message: `Hi ${firstName},\n\nI've been following your content and really appreciate the ${toneAdjective} way you connect with your audience.\n\nI'm reaching out because we'd love to ${offerText}. ${campaign_goal}\n\nWould you be open to chatting about it? No pressure at all — just thought it could be a great fit.\n\nBest,\nYour Name`,
    follow_up_1: `Hey ${firstName},\n\nJust circling back on my note from last week. I know your inbox is probably packed!\n\nWe're still excited about the possibility of working together on ${product_name}. Happy to answer any questions or keep it simple.\n\nLet me know either way — totally understand if the timing isn't right.\n\nCheers`,
    follow_up_2: `Hi ${firstName},\n\nLast follow-up, I promise! 😊\n\nIf you're interested in trying ${product_name}, I'd love to make it happen. If not, no worries at all — I'll stop bugging you.\n\nEither way, keep creating amazing content!\n\nBest`,
  };
}

export async function generateCreatorSummary(
  name: string,
  handle: string,
  platform: string,
  niche: string,
  bio?: string
): Promise<string> {
  await simulateDelay();
  return `${name} (${handle}) is a ${niche.toLowerCase()} creator on ${platform} known for authentic, engaging content. ${
    bio ? `Their bio suggests a focus on "${bio.slice(0, 80)}..."` : ""
  } They appear to be a strong candidate for brand partnerships in the ${niche.toLowerCase()} space.`;
}

export async function generateFitScore(
  creatorNiche: string,
  campaignNiche: string,
  followerCount: number,
  engagementRate?: number
): Promise<number> {
  await simulateDelay();
  const nicheMatch = creatorNiche.toLowerCase().includes(campaignNiche.toLowerCase().split(" ")[0]) ? 40 : 15;
  const sizeScore = followerCount > 100000 ? 25 : followerCount > 50000 ? 20 : 15;
  const engagementScore = engagementRate ? Math.min(engagementRate * 5, 25) : 15;
  const randomVariance = Math.floor(Math.random() * 10);
  return Math.min(Math.round(nicheMatch + sizeScore + engagementScore + randomVariance), 100);
}

export async function generatePersonalizedHooks(
  creatorName: string,
  creatorNiche: string,
  productName: string
): Promise<string[]> {
  await simulateDelay();
  return [
    `Reference their recent ${creatorNiche.toLowerCase()} content and tie to ${productName}`,
    `Highlight how ${productName} aligns with their audience interests`,
    `Mention a specific post or video that resonated with you`,
    `Connect their personal brand values to your product mission`,
  ];
}

export async function rewriteMessage(
  message: string,
  instruction: string
): Promise<string> {
  await simulateDelay();

  const modifications: Record<string, (text: string) => string> = {
    shorter: (text) => {
      const sentences = text.split(/(?<=[.!?])\s+/);
      return sentences.slice(0, Math.ceil(sentences.length * 0.6)).join(" ");
    },
    warmer: (text) =>
      text
        .replace(/Hi /g, "Hey ")
        .replace(/Best,/g, "Warmly,")
        .replace(/\./g, "! ")
        .replace(/!  /g, "! "),
    premium: (text) =>
      text
        .replace(/Hey /g, "Dear ")
        .replace(/love to/g, "be delighted to")
        .replace(/great fit/g, "exceptional alignment"),
    "less salesy": (text) =>
      text
        .replace(/we'd love to/g, "I was curious if you'd be open to")
        .replace(/excited about/g, "genuinely interested in")
        .replace(/partnership/g, "collaboration"),
    "social proof": (text) =>
      text.replace(
        /Best,/g,
        "P.S. We've already partnered with creators like @example1 and @example2 who loved the experience.\n\nBest,"
      ),
  };

  const modifier = modifications[instruction.toLowerCase()];
  return modifier ? modifier(message) : message;
}

function simulateDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));
}
