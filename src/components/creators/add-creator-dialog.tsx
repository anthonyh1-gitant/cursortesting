"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { Platform, OfferType } from "@/types";
import { mockCampaigns } from "@/data/mock";

export function AddCreatorDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Creator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Creator</DialogTitle>
          <DialogDescription>Manually add a creator to your CRM.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="creatorName">Name</Label>
              <Input id="creatorName" placeholder="e.g. Sarah Chen" className="rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handle">Handle</Label>
              <Input id="handle" placeholder="e.g. @sarahglows" className="rounded-xl" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select defaultValue="instagram">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["instagram", "tiktok", "youtube", "twitter", "linkedin"] as Platform[]).map((p) => (
                    <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="niche">Niche</Label>
              <Input id="niche" placeholder="e.g. Skincare" className="rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="followers">Follower Count</Label>
              <Input id="followers" type="number" placeholder="e.g. 50000" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Offer Type</Label>
              <Select defaultValue="gifted">
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["gifted", "paid", "affiliate", "revenue_share", "barter", "other"] as OfferType[]).map((t) => (
                    <SelectItem key={t} value={t} className="capitalize">{t.replace("_", " ")}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="creator@example.com" className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label>Campaign</Label>
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Assign to campaign (optional)" />
              </SelectTrigger>
              <SelectContent>
                {mockCampaigns.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any notes about this creator..." className="min-h-[60px] rounded-xl" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Creator
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
