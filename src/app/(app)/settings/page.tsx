"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Info, AlertTriangle, User, Bell, Palette } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and application preferences.
        </p>
      </div>

      {/* Profile */}
      <Card className="rounded-2xl border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Profile</CardTitle>
          </div>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Alex Kim" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="alex@creatorreach.ai" className="rounded-xl" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" defaultValue="CreatorReach AI" className="rounded-xl" />
          </div>
          <Button className="rounded-xl">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="rounded-2xl border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Appearance</CardTitle>
          </div>
          <CardDescription>Customize how the app looks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle between light and dark themes.</p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="rounded-2xl border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Notifications</CardTitle>
          </div>
          <CardDescription>Choose what you get notified about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Reply Alerts</p>
              <p className="text-xs text-muted-foreground">Get notified when a creator replies.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Campaign Updates</p>
              <p className="text-xs text-muted-foreground">Updates about campaign milestones.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Weekly Summary</p>
              <p className="text-xs text-muted-foreground">Weekly digest of outreach performance.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Safety & Compliance */}
      <Card className="rounded-2xl border-border/50 border-blue-200 dark:border-blue-900">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-base">Safety & Compliance</CardTitle>
            <Badge variant="secondary" className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
              Important
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  AI-Assisted Outreach Platform
                </p>
                <p className="text-xs text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
                  CreatorReach AI is designed to help you create personalized, thoughtful outreach to creators and influencers. All messages are generated as drafts for your review and manual sending.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium">No automated sending</p>
                <p className="text-xs text-muted-foreground">
                  Messages are generated as drafts. You always send manually through your own accounts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium">No credential scraping</p>
                <p className="text-xs text-muted-foreground">
                  We never ask for or store your social media login credentials.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium">No bulk auto-DM features</p>
                <p className="text-xs text-muted-foreground">
                  This platform is not a mass-messaging tool. Each outreach is personalized and individually reviewed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Platform compliance</p>
                <p className="text-xs text-muted-foreground">
                  We encourage following each platform&apos;s terms of service and community guidelines when reaching out.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-xs text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                Users are responsible for ensuring their outreach practices comply with applicable laws and platform terms. CreatorReach AI provides tools for campaign management and message drafting, not automated platform abuse.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
