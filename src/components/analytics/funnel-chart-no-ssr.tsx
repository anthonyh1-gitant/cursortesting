"use client";

import dynamic from "next/dynamic";

import type { ComponentProps } from "react";

import { FunnelChart } from "@/components/analytics/funnel-chart";

type FunnelChartProps = ComponentProps<typeof FunnelChart>;

export const FunnelChartNoSsr = dynamic<FunnelChartProps>(
  () => import("@/components/analytics/funnel-chart").then((mod) => mod.FunnelChart),
  { ssr: false },
);
