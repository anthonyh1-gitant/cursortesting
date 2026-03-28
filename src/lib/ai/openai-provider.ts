import { CreatorInsightInput, CreatorInsightResult, OutreachInput, OutreachOutput } from "@/lib/ai/types";

/**
 * Placeholder adapter for future OpenAI integration.
 * Keep this stable interface so the app can swap from mock to real AI without UI refactors.
 */
export async function generateCreatorInsightsWithOpenAI(
  input: CreatorInsightInput,
): Promise<CreatorInsightResult> {
  void input;
  throw new Error("OpenAI provider not configured yet.");
}

/**
 * Placeholder adapter for future OpenAI integration.
 */
export async function generateOutreachWithOpenAI(input: OutreachInput): Promise<OutreachOutput> {
  void input;
  throw new Error("OpenAI provider not configured yet.");
}
