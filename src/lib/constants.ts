import { PipelineStage } from "@/lib/types";

export const APP_NAME = "CreatorReach AI";

export const PIPELINE_STAGES: PipelineStage[] = [
  "New",
  "Reviewed",
  "Drafted",
  "Ready to Send",
  "Sent",
  "Replied",
  "Interested",
  "Negotiating",
  "Won",
  "Not Interested",
];

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/app" },
  { label: "Campaigns", href: "/app/campaigns" },
  { label: "Creators", href: "/app/creators" },
  { label: "Outreach", href: "/app/outreach" },
  { label: "Analytics", href: "/app/analytics" },
  { label: "Settings", href: "/app/settings" },
] as const;

export const COMPLIANCE_NOTE =
  "CreatorReach AI is designed for AI-assisted campaign planning and message drafting. It does not support prohibited automation, social credential scraping, or bulk auto-sending on social platforms.";
