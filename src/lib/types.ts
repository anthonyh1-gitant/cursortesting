export type Platform = "Instagram" | "TikTok" | "YouTube" | "LinkedIn" | "X";

export type OfferType =
  | "Affiliate"
  | "Paid Post"
  | "Gifted Product"
  | "Ambassador"
  | "Revenue Share";

export type PipelineStage =
  | "New"
  | "Reviewed"
  | "Drafted"
  | "Ready to Send"
  | "Sent"
  | "Replied"
  | "Interested"
  | "Negotiating"
  | "Won"
  | "Not Interested";

export interface Campaign {
  id: string;
  name: string;
  productName: string;
  productUrl: string;
  niche: string;
  targetAudience: string;
  campaignGoal: string;
  offerType: OfferType;
  brandTone: string;
  description: string;
  createdAt: string;
  status: "active" | "paused" | "completed";
}

export interface Creator {
  id: string;
  campaignId: string;
  name: string;
  handle: string;
  platform: Platform;
  niche: string;
  followerCount: number;
  fitScore: number;
  stage: PipelineStage;
  offerType: OfferType;
  lastActivity: string;
  notes: string;
  aiHook: string;
  summary: string;
}

export interface OutreachMessage {
  id: string;
  campaignId: string;
  creatorId: string;
  subjectLine: string;
  firstMessage: string;
  followUpOne: string;
  followUpTwo: string;
  status: "draft" | "ready" | "sent";
  updatedAt: string;
}

export interface Activity {
  id: string;
  campaignId?: string;
  creatorId?: string;
  action: string;
  detail: string;
  timestamp: string;
}

export interface FunnelPoint {
  label: string;
  value: number;
}

export interface DashboardKpi {
  label: string;
  value: string;
  trend: string;
}
