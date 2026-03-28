import { NextRequest, NextResponse } from "next/server";
import { AIGenerationRequest } from "@/types";
import { generateOutreachMessages } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body: AIGenerationRequest = await request.json();

    // TODO: Replace mock AI with OpenAI API call
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{ role: "system", content: buildSystemPrompt(body) }],
    // });

    const result = await generateOutreachMessages(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate messages" },
      { status: 500 }
    );
  }
}
