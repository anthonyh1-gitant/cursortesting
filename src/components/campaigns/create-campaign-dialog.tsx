"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { OfferType } from "@/lib/types";

const offerTypes: OfferType[] = ["Affiliate", "Paid Post", "Gifted Product", "Ambassador", "Revenue Share"];

export function CreateCampaignDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [niche, setNiche] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [campaignGoal, setCampaignGoal] = useState("");
  const [offerType, setOfferType] = useState<OfferType>("Affiliate");
  const [brandTone, setBrandTone] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function resetForm() {
    setName("");
    setProductName("");
    setProductUrl("");
    setNiche("");
    setTargetAudience("");
    setCampaignGoal("");
    setOfferType("Affiliate");
    setBrandTone("");
    setDescription("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("Campaign draft captured in UI. Connect this form to Supabase insert to persist.");
    resetForm();
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Campaign</Button>
      <Dialog open={open}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Create new campaign</DialogTitle>
            <DialogDescription>
              Define campaign goals, offer structure, and positioning for AI-assisted outreach.
            </DialogDescription>
          </DialogHeader>
          <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="campaign-name">Campaign name</Label>
              <Input id="campaign-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="product-name">Product name</Label>
              <Input id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="product-url">Product URL</Label>
              <Input
                id="product-url"
                type="url"
                placeholder="https://"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="niche">Niche</Label>
              <Input id="niche" value={niche} onChange={(e) => setNiche(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="target-audience">Target audience</Label>
              <Input
                id="target-audience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="campaign-goal">Campaign goal</Label>
              <Input
                id="campaign-goal"
                value={campaignGoal}
                onChange={(e) => setCampaignGoal(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="offer-type">Offer type</Label>
              <Select
                id="offer-type"
                value={offerType}
                onChange={(e) => setOfferType(e.target.value as OfferType)}
              >
                {offerTypes.map((offer) => (
                  <option key={offer} value={offer}>
                    {offer}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brand-tone">Brand tone</Label>
              <Input id="brand-tone" value={brandTone} onChange={(e) => setBrandTone(e.target.value)} required />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            {message ? <p className="text-sm text-emerald-600 md:col-span-2 dark:text-emerald-400">{message}</p> : null}
            <div className="flex justify-end gap-2 md:col-span-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Campaign</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
