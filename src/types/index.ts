export type Platform = "instagram" | "tiktok" | "youtube" | "twitter" | "linkedin";

export type OutreachStage =
  | "new"
  | "reviewed"
  | "drafted"
  | "ready_to_send"
  | "sent"
  | "replied"
  | "interested"
  | "negotiating"
  | "won"
  | "not_interested";

export type OfferType =
  | "gifted"
  | "paid"
  | "affiliate"
  | "revenue_share"
  | "barter"
  | "other";

export type BrandTone =
  | "friendly"
  | "professional"
  | "casual"
  | "premium"
  | "playful"
  | "bold";

export type OutreachChannel = "email" | "dm" | "linkedin" | "other";

export interface User {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  product_name: string;
  product_url: string;
  niche: string;
  target_audience: string;
  campaign_goal: string;
  offer_type: OfferType;
  brand_tone: BrandTone;
  description: string;
  status: "active" | "paused" | "completed" | "draft";
  created_at: string;
  updated_at: string;
  creator_count?: number;
  sent_count?: number;
  reply_count?: number;
}

export interface Creator {
  id: string;
  user_id: string;
  campaign_id?: string;
  name: string;
  handle: string;
  platform: Platform;
  niche: string;
  follower_count: number;
  engagement_rate?: number;
  fit_score: number;
  stage: OutreachStage;
  offer_type: OfferType;
  email?: string;
  bio?: string;
  avatar_url?: string;
  notes?: string;
  ai_hooks?: string[];
  ai_summary?: string;
  last_activity: string;
  created_at: string;
}

export interface OutreachMessage {
  id: string;
  creator_id: string;
  campaign_id: string;
  channel: OutreachChannel;
  type: "initial" | "follow_up_1" | "follow_up_2" | "custom";
  subject?: string;
  body: string;
  status: "draft" | "ready" | "sent" | "replied";
  sent_at?: string;
  created_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  type: "campaign_created" | "creator_added" | "message_drafted" | "message_sent" | "reply_received" | "stage_changed" | "creator_won";
  title: string;
  description: string;
  campaign_id?: string;
  creator_id?: string;
  created_at: string;
}

export interface AIGenerationRequest {
  creator_name: string;
  creator_handle: string;
  creator_platform: Platform;
  creator_niche: string;
  creator_bio?: string;
  campaign_name: string;
  product_name: string;
  product_url: string;
  campaign_goal: string;
  offer_type: OfferType;
  brand_tone: BrandTone;
  channel: OutreachChannel;
  cta: string;
  additional_context?: string;
}

export interface AIGenerationResult {
  subject: string;
  initial_message: string;
  follow_up_1: string;
  follow_up_2: string;
}

export interface KPIData {
  label: string;
  value: number | string;
  change?: number;
  trend?: "up" | "down" | "neutral";
}

export interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
}
