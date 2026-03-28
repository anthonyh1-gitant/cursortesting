import { NextRequest, NextResponse } from "next/server";

import { generateCreatorInsights } from "@/lib/ai/service";
import { CreatorInsightInput } from "@/lib/ai/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreatorInsightInput;
    const { result, provider } = await generateCreatorInsights(body);
    return NextResponse.json({ result, provider });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate creator insights." },
      { status: 500 },
    );
  }
}
