"use client";

import { Plus } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { CreatorDetailPanel } from "@/components/creators/creator-detail-panel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { activities, outreachMessages } from "@/lib/mock-data";
import { stageVariant } from "@/lib/presentation";
import { Creator, PipelineStage, Platform } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

const platforms: Platform[] = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"];
const stages: PipelineStage[] = [
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

export function CreatorsCrm({ initialCreators }: { initialCreators: Creator[] }) {
  const [creatorsState, setCreatorsState] = useState(initialCreators);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(initialCreators[0]?.id ?? null);
  const [openAdd, setOpenAdd] = useState(false);

  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [niche, setNiche] = useState("");
  const [offerType, setOfferType] = useState("Gifted Product");
  const [followerCount, setFollowerCount] = useState("10000");

  const filteredCreators = useMemo(() => {
    return creatorsState.filter((creator) => {
      const matchesSearch =
        creator.name.toLowerCase().includes(search.toLowerCase()) ||
        creator.handle.toLowerCase().includes(search.toLowerCase()) ||
        creator.niche.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = platformFilter === "all" ? true : creator.platform === platformFilter;
      const matchesStage = stageFilter === "all" ? true : creator.stage === stageFilter;
      return matchesSearch && matchesPlatform && matchesStage;
    });
  }, [creatorsState, platformFilter, search, stageFilter]);

  const selectedCreator = creatorsState.find((creator) => creator.id === selectedCreatorId) ?? null;
  const selectedMessage =
    outreachMessages.find((message) => message.creatorId === selectedCreator?.id) ?? null;
  const selectedTimeline = activities.filter((activity) => activity.creatorId === selectedCreator?.id);

  function handleAddCreator(event: FormEvent) {
    event.preventDefault();
    const id = `crt_manual_${Date.now()}`;
    const nextCreator: Creator = {
      id,
      campaignId: creatorsState[0]?.campaignId ?? "cmp_1",
      name,
      handle,
      platform,
      niche,
      followerCount: Number(followerCount),
      fitScore: 75,
      stage: "New",
      offerType: offerType as Creator["offerType"],
      lastActivity: "Creator manually added",
      notes: "Added manually by user.",
      aiHook: "AI hook will be generated after profile enrichment.",
      summary: "Pending AI summary generation.",
    };
    setCreatorsState((prev) => [nextCreator, ...prev]);
    setSelectedCreatorId(id);
    setOpenAdd(false);
    setName("");
    setHandle("");
    setNiche("");
    setOfferType("Gifted Product");
    setFollowerCount("10000");
    setPlatform("Instagram");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Input
              placeholder="Search creators by name, handle, or niche..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="md:max-w-sm"
            />
            <div className="flex flex-1 gap-2">
              <Select value={platformFilter} onChange={(event) => setPlatformFilter(event.target.value)}>
                <option value="all">All platforms</option>
                {platforms.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)}>
                <option value="all">All stages</option>
                {stages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
            <Button onClick={() => setOpenAdd(true)}>
              <Plus className="h-4 w-4" />
              Add Creator
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-950">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Handle</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Niche</TableHead>
                <TableHead>Follower Count</TableHead>
                <TableHead>Fit Score</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Offer Type</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCreators.length > 0 ? (
                filteredCreators.map((creator) => (
                  <TableRow
                    key={creator.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedCreatorId(creator.id)}
                  >
                    <TableCell className="font-medium">{creator.name}</TableCell>
                    <TableCell>{creator.handle}</TableCell>
                    <TableCell>{creator.platform}</TableCell>
                    <TableCell>{creator.niche}</TableCell>
                    <TableCell>{formatNumber(creator.followerCount)}</TableCell>
                    <TableCell>{creator.fitScore}</TableCell>
                    <TableCell>
                      <Badge variant={stageVariant(creator.stage)}>{creator.stage}</Badge>
                    </TableCell>
                    <TableCell>{creator.offerType}</TableCell>
                    <TableCell>{creator.lastActivity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    No creators match current filters. Try broadening your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CreatorDetailPanel creator={selectedCreator} message={selectedMessage} timeline={selectedTimeline} />

      <Dialog open={openAdd}>
        <DialogContent onClose={() => setOpenAdd(false)}>
          <DialogHeader>
            <DialogTitle>Add creator manually</DialogTitle>
            <DialogDescription>Start with lightweight context and enrich with AI insights later.</DialogDescription>
          </DialogHeader>
          <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleAddCreator}>
            <div className="space-y-1.5">
              <Label htmlFor="creator-name">Name</Label>
              <Input id="creator-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="creator-handle">Handle</Label>
              <Input id="creator-handle" value={handle} onChange={(e) => setHandle(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="creator-platform">Platform</Label>
              <Select
                id="creator-platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
              >
                {platforms.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="creator-niche">Niche</Label>
              <Input id="creator-niche" value={niche} onChange={(e) => setNiche(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="creator-followers">Follower count</Label>
              <Input
                id="creator-followers"
                type="number"
                value={followerCount}
                onChange={(e) => setFollowerCount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="creator-offer">Offer type</Label>
              <Input id="creator-offer" value={offerType} onChange={(e) => setOfferType(e.target.value)} required />
            </div>
            <div className="flex justify-end gap-2 md:col-span-2">
              <Button type="button" variant="ghost" onClick={() => setOpenAdd(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Creator</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
