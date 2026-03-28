"use client";

import dynamic from "next/dynamic";

import type { ComponentProps } from "react";

import { OverviewChart } from "@/components/dashboard/overview-chart";

type OverviewChartProps = ComponentProps<typeof OverviewChart>;

export const OverviewChartNoSsr = dynamic<OverviewChartProps>(
  () => import("@/components/dashboard/overview-chart").then((mod) => mod.OverviewChart),
  { ssr: false },
);
