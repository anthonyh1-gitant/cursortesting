"use client";

import { useState, useMemo } from "react";
import { mockCreators, STAGE_LABELS, STAGE_COLORS } from "@/data/mock";
import { Creator, Platform } from "@/types";
import { AddCreatorDialog } from "@/components/creators/add-creator-dialog";
import { CreatorDetailPanel } from "@/components/creators/creator-detail-panel";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Search, Filter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function CreatorsPage() {
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredCreators = useMemo(() => {
    return mockCreators.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.handle.toLowerCase().includes(search.toLowerCase()) ||
        c.niche.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = platformFilter === "all" || c.platform === platformFilter;
      const matchesStage = stageFilter === "all" || c.stage === stageFilter;
      return matchesSearch && matchesPlatform && matchesStage;
    });
  }, [search, platformFilter, stageFilter]);

  const openDetail = (creator: Creator) => {
    setSelectedCreator(creator);
    setDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creators</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your creator relationships and outreach.
          </p>
        </div>
        <AddCreatorDialog />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, handle, or niche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl pl-10"
          />
        </div>
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-[140px] rounded-xl">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            {(["instagram", "tiktok", "youtube", "twitter", "linkedin"] as Platform[]).map((p) => (
              <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[160px] rounded-xl">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {Object.entries(STAGE_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium">Creator</TableHead>
              <TableHead className="font-medium">Platform</TableHead>
              <TableHead className="font-medium">Niche</TableHead>
              <TableHead className="font-medium text-right">Followers</TableHead>
              <TableHead className="font-medium text-center">Fit Score</TableHead>
              <TableHead className="font-medium">Stage</TableHead>
              <TableHead className="font-medium">Offer</TableHead>
              <TableHead className="font-medium text-right">Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCreators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="flex flex-col items-center">
                    <Filter className="h-8 w-8 text-muted-foreground/30" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No creators found matching your filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCreators.map((creator) => (
                <TableRow
                  key={creator.id}
                  className="cursor-pointer transition-colors"
                  onClick={() => openDetail(creator)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 text-xs font-medium text-violet-700 dark:from-violet-900/50 dark:to-indigo-900/50 dark:text-violet-300">
                        {creator.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{creator.name}</p>
                        <p className="text-xs text-muted-foreground">{creator.handle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm capitalize">{creator.platform}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{creator.niche}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm">{(creator.follower_count / 1000).toFixed(0)}K</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                        creator.fit_score >= 85
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                          : creator.fit_score >= 70
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                      )}
                    >
                      {creator.fit_score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-full text-xs", STAGE_COLORS[creator.stage])}>
                      {STAGE_LABELS[creator.stage]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm capitalize">{creator.offer_type.replace("_", " ")}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(creator.last_activity), { addSuffix: true })}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CreatorDetailPanel
        creator={selectedCreator}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
