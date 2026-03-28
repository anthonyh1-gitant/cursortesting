import {
  Activity,
  Campaign,
  Creator,
  DashboardKpi,
  FunnelPoint,
  OutreachMessage,
  PipelineStage,
} from "@/lib/types";
import { formatNumber, formatPercent } from "@/lib/utils";

export const campaigns: Campaign[] = [
  {
    id: "cmp_1",
    name: "Spring UGC Push",
    productName: "Aurora Sleep Gummies",
    productUrl: "https://example.com/aurora-gummies",
    niche: "Wellness",
    targetAudience: "Busy professionals, 24-38",
    campaignGoal: "Drive creator-led UGC and trial purchases",
    offerType: "Gifted Product",
    brandTone: "Warm, science-backed, premium",
    description:
      "Partner with nano and micro creators focused on productivity, sleep routines, and healthy habits.",
    createdAt: "2026-03-10T10:25:00.000Z",
    status: "active",
  },
  {
    id: "cmp_2",
    name: "Founder Story Series",
    productName: "ScaleFlow CRM",
    productUrl: "https://example.com/scaleflow",
    niche: "B2B SaaS",
    targetAudience: "Early-stage startup founders",
    campaignGoal: "Book demos through trusted founder creators",
    offerType: "Affiliate",
    brandTone: "Direct, operator-first, smart",
    description:
      "Creator partnerships centered around transparent founder workflows and GTM lessons.",
    createdAt: "2026-03-14T08:15:00.000Z",
    status: "active",
  },
  {
    id: "cmp_3",
    name: "Summer Launch Ambassadors",
    productName: "Horizon Running Club",
    productUrl: "https://example.com/horizon",
    niche: "Fitness",
    targetAudience: "Runners and hybrid athletes",
    campaignGoal: "Recruit ambassadors for launch month",
    offerType: "Ambassador",
    brandTone: "Energetic, premium, community-led",
    description:
      "Blend paid activations and long-term creator ambassadors for retention-driven growth.",
    createdAt: "2026-03-20T13:40:00.000Z",
    status: "paused",
  },
];

export const creators: Creator[] = [
  {
    id: "crt_1",
    campaignId: "cmp_1",
    name: "Mina Patel",
    handle: "@mindfulmina",
    platform: "Instagram",
    niche: "Wellness",
    followerCount: 34500,
    fitScore: 91,
    stage: "Ready to Send",
    offerType: "Gifted Product",
    lastActivity: "Generated first outreach draft",
    notes:
      "Strong audience overlap. Her last 5 reels average 6.2% engagement and feature nightly routines.",
    aiHook:
      "Your 30-second 'sleep reset' reel aligns perfectly with our science-backed gummy launch.",
    summary:
      "High-fit wellness creator with strong short-form retention and purchase-oriented audience behavior.",
  },
  {
    id: "crt_2",
    campaignId: "cmp_1",
    name: "Jordan Hale",
    handle: "@buildwithjordan",
    platform: "TikTok",
    niche: "Productivity",
    followerCount: 81200,
    fitScore: 84,
    stage: "Drafted",
    offerType: "Paid Post",
    lastActivity: "Added AI hook suggestion",
    notes:
      "Frequent audience Q&A; asks for product receipts. Should include social proof in first message.",
    aiHook:
      "Loved your 'night-before deep work prep' format—our product naturally supports that routine.",
    summary:
      "Mid-sized productivity creator with strong trust indicators and conversion-ready comment threads.",
  },
  {
    id: "crt_3",
    campaignId: "cmp_2",
    name: "Sara Kim",
    handle: "@sarakimfounder",
    platform: "LinkedIn",
    niche: "Startup Ops",
    followerCount: 15600,
    fitScore: 88,
    stage: "Interested",
    offerType: "Affiliate",
    lastActivity: "Positive reply received",
    notes:
      "Requests co-created educational post instead of direct promo. Potential long-term partner.",
    aiHook:
      "Your post on 'founder-led sales' would pair well with a live teardown of our CRM workflow.",
    summary:
      "High-credibility B2B creator with decision-maker audience and thoughtful educational content.",
  },
  {
    id: "crt_4",
    campaignId: "cmp_2",
    name: "Diego Torres",
    handle: "@diego.builds",
    platform: "YouTube",
    niche: "SaaS Systems",
    followerCount: 49200,
    fitScore: 79,
    stage: "Sent",
    offerType: "Affiliate",
    lastActivity: "Outreach sent by founder",
    notes:
      "Long-form channel. Pitch should emphasize recurring commission and case study access.",
    aiHook:
      "Your recurring 'tool-stack teardown' episodes are exactly where our onboarding flow stands out.",
    summary:
      "Long-form educator with high-intent audience and above-average click-through behavior.",
  },
  {
    id: "crt_5",
    campaignId: "cmp_3",
    name: "Avery Stone",
    handle: "@averyrunsdaily",
    platform: "Instagram",
    niche: "Running",
    followerCount: 22800,
    fitScore: 86,
    stage: "Reviewed",
    offerType: "Ambassador",
    lastActivity: "Creator manually added",
    notes:
      "Great local community engagement. Could anchor city-based activation content.",
    aiHook:
      "Your weekly run-club recaps match the community-driven launch experience we are building.",
    summary:
      "Community-centered running creator with local authority and high replay value on stories.",
  },
  {
    id: "crt_6",
    campaignId: "cmp_3",
    name: "Nina Woods",
    handle: "@ninafitjournal",
    platform: "TikTok",
    niche: "Hybrid Training",
    followerCount: 67800,
    fitScore: 83,
    stage: "New",
    offerType: "Revenue Share",
    lastActivity: "Imported from watchlist",
    notes:
      "Strong creator economy fluency; likely to negotiate structured offer terms.",
    aiHook:
      "Your honest training diary format would make a compelling launch-week creator partnership.",
    summary:
      "Growth-stage fitness creator with persuasive storytelling and strong conversion comments.",
  },
];

export const outreachMessages: OutreachMessage[] = [
  {
    id: "msg_1",
    campaignId: "cmp_1",
    creatorId: "crt_1",
    subjectLine: "Loved your night routine content, Mina",
    firstMessage:
      "Hi Mina — I’m reaching out from Aurora. Your recent sleep reset reel stood out to our team, especially how practical and trustworthy it felt. We’re launching science-backed sleep gummies and would love to send you a package for honest feedback and potential collab if it feels right.",
    followUpOne:
      "Quick follow-up in case this got buried. Happy to share audience insights and examples of creator posts that performed best for similar launches.",
    followUpTwo:
      "Last nudge from me — no pressure either way. If timing is better next month, I can reach out then.",
    status: "ready",
    updatedAt: "2026-03-26T09:10:00.000Z",
  },
];

export const activities: Activity[] = [
  {
    id: "act_1",
    campaignId: "cmp_1",
    creatorId: "crt_1",
    action: "Draft Generated",
    detail: "AI generated outreach sequence for Mina Patel.",
    timestamp: "2026-03-27T15:00:00.000Z",
  },
  {
    id: "act_2",
    campaignId: "cmp_2",
    creatorId: "crt_3",
    action: "Reply Received",
    detail: "Positive reply received from Sara Kim.",
    timestamp: "2026-03-27T13:20:00.000Z",
  },
  {
    id: "act_3",
    campaignId: "cmp_2",
    creatorId: "crt_4",
    action: "Outreach Sent",
    detail: "First outreach sent to Diego Torres.",
    timestamp: "2026-03-27T11:45:00.000Z",
  },
  {
    id: "act_4",
    campaignId: "cmp_3",
    creatorId: "crt_6",
    action: "Creator Added",
    detail: "Nina Woods added manually from watchlist.",
    timestamp: "2026-03-27T10:10:00.000Z",
  },
];

export const dashboardChartData = [
  { week: "W1", drafted: 8, sent: 5, replied: 2 },
  { week: "W2", drafted: 14, sent: 10, replied: 4 },
  { week: "W3", drafted: 18, sent: 13, replied: 6 },
  { week: "W4", drafted: 22, sent: 18, replied: 9 },
];

export const funnelData: FunnelPoint[] = [
  { label: "Creators Added", value: 62 },
  { label: "Drafted", value: 51 },
  { label: "Sent", value: 38 },
  { label: "Replied", value: 17 },
  { label: "Won", value: 9 },
];

export function getDashboardKpis(): DashboardKpi[] {
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active").length;
  const creatorsAdded = creators.length;
  const readyToSend = creators.filter((creator) => creator.stage === "Ready to Send").length;
  const replies = creators.filter((creator) =>
    ["Replied", "Interested", "Negotiating", "Won"].includes(creator.stage),
  ).length;
  const positiveReplies = creators.filter((creator) =>
    ["Interested", "Negotiating", "Won"].includes(creator.stage),
  ).length;
  const positiveReplyRate = replies === 0 ? 0 : (positiveReplies / replies) * 100;

  return [
    { label: "Active Campaigns", value: String(activeCampaigns), trend: "+12% vs last period" },
    {
      label: "Creators Added",
      value: formatNumber(creatorsAdded),
      trend: "+9 creators this week",
    },
    {
      label: "Ready to Send",
      value: formatNumber(readyToSend),
      trend: "3 new drafts approved",
    },
    { label: "Replies", value: formatNumber(replies), trend: "+4 this week" },
    {
      label: "Positive Reply Rate",
      value: formatPercent(positiveReplyRate),
      trend: "Benchmark: 24.0%",
    },
  ];
}

export function getCampaignById(id: string) {
  return campaigns.find((campaign) => campaign.id === id) ?? null;
}

export function getCreatorsByCampaign(campaignId: string) {
  return creators.filter((creator) => creator.campaignId === campaignId);
}

export function getCreatorById(creatorId: string) {
  return creators.find((creator) => creator.id === creatorId) ?? null;
}

export function getPipelineByStage(): Record<PipelineStage, Creator[]> {
  return {
    New: creators.filter((creator) => creator.stage === "New"),
    Reviewed: creators.filter((creator) => creator.stage === "Reviewed"),
    Drafted: creators.filter((creator) => creator.stage === "Drafted"),
    "Ready to Send": creators.filter((creator) => creator.stage === "Ready to Send"),
    Sent: creators.filter((creator) => creator.stage === "Sent"),
    Replied: creators.filter((creator) => creator.stage === "Replied"),
    Interested: creators.filter((creator) => creator.stage === "Interested"),
    Negotiating: creators.filter((creator) => creator.stage === "Negotiating"),
    Won: creators.filter((creator) => creator.stage === "Won"),
    "Not Interested": creators.filter((creator) => creator.stage === "Not Interested"),
  };
}
