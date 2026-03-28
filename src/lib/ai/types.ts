import { OfferType } from "@/lib/types";

export interface CreatorInsightInput {
  creatorName: string;
  handle: string;
  niche: string;
  campaignGoal: string;
}

export interface CreatorInsightResult {
  summary: string;
  fitScore: number;
  personalizedHook: string;
}

export interface OutreachInput {
  creatorContext: string;
  campaignContext: string;
  channel: "Email" | "Instagram DM" | "LinkedIn Message";
  tone: string;
  cta: string;
  offerType: OfferType;
}

export interface OutreachOutput {
  subjectLine: string;
  firstOutreachMessage: string;
  followUpOne: string;
  followUpTwo: string;
}
