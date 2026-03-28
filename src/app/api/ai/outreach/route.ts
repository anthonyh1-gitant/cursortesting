import { NextRequest, NextResponse } from "next/server";

import { generateOutreach, rewriteOutreach } from "@/lib/ai/service";
import { OutreachInput } from "@/lib/ai/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as OutreachInput;
    const { result, provider } = await generateOutreach(body);
    return NextResponse.json({ result, provider });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate outreach." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as { message: string; action: string };
    const result = await rewriteOutreach(body.message, body.action);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to rewrite message." },
      { status: 500 },
    );
  }
}
