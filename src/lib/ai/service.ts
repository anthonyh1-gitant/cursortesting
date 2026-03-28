import { buildCreatorInsightPrompt, buildOutreachPrompt } from "@/lib/ai/prompt-template";
import { generateCreatorInsightsMock, generateOutreachMock, rewriteOutreachMock } from "@/lib/ai/mock-generator";
import { generateCreatorInsightsWithOpenAI, generateOutreachWithOpenAI } from "@/lib/ai/openai-provider";
import { CreatorInsightInput, OutreachInput } from "@/lib/ai/types";

const USE_MOCK_AI = process.env.NEXT_PUBLIC_USE_MOCK_AI !== "false";

export async function generateCreatorInsights(input: CreatorInsightInput) {
  const prompt = buildCreatorInsightPrompt(input);

  if (USE_MOCK_AI) {
    const result = await generateCreatorInsightsMock(input);
    return { prompt, result, provider: "mock" as const };
  }

  const result = await generateCreatorInsightsWithOpenAI(input);
  return { prompt, result, provider: "openai" as const };
}

export async function generateOutreach(input: OutreachInput) {
  const prompt = buildOutreachPrompt(input);

  if (USE_MOCK_AI) {
    const result = await generateOutreachMock(input);
    return { prompt, result, provider: "mock" as const };
  }

  const result = await generateOutreachWithOpenAI(input);
  return { prompt, result, provider: "openai" as const };
}

export async function rewriteOutreach(message: string, action: string) {
  const normalized =
    action === "shorter" ||
    action === "warmer" ||
    action === "premium" ||
    action === "less_salesy" ||
    action === "social_proof"
      ? action
      : "shorter";

  return rewriteOutreachMock(message, normalized);
}
