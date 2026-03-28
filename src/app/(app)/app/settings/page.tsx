"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { COMPLIANCE_NOTE } from "@/lib/constants";

export default function SettingsPage() {
  const [aiDraftsEnabled, setAiDraftsEnabled] = useState(true);
  const [manualTrackingEnabled, setManualTrackingEnabled] = useState(true);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Settings"
        description="Configure workspace defaults and review safe outreach boundaries."
      />
      <Card>
        <CardHeader>
          <CardTitle>Outreach preferences</CardTitle>
          <CardDescription>Defaults that shape AI-assisted draft generation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <div>
              <p className="text-sm font-medium">Enable AI draft suggestions</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Keep human review before any outbound message is sent.
              </p>
            </div>
            <Switch checked={aiDraftsEnabled} onCheckedChange={setAiDraftsEnabled} />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <div>
              <p className="text-sm font-medium">Track manual sending events</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Helps keep analytics accurate without platform auto-posting.
              </p>
            </div>
            <Switch checked={manualTrackingEnabled} onCheckedChange={setManualTrackingEnabled} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Safety and compliance</CardTitle>
          <CardDescription>Usage policy reminder for responsible creator outreach.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="rounded-xl border border-amber-300/60 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            {COMPLIANCE_NOTE}
          </p>
          <ul className="list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
            <li>No social platform credential scraping.</li>
            <li>No bulk social auto-send features in this version.</li>
            <li>Manual review and approval is required before outreach is sent.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
