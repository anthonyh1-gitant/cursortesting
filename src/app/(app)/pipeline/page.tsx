"use client";

import { useState, useCallback } from "react";
import { mockCreators, STAGE_LABELS } from "@/data/mock";
import { Creator, OutreachStage } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

const PIPELINE_STAGES: OutreachStage[] = [
  "new",
  "reviewed",
  "drafted",
  "ready_to_send",
  "sent",
  "replied",
  "interested",
  "negotiating",
  "won",
  "not_interested",
];

export default function PipelinePage() {
  const [creators, setCreators] = useState<Creator[]>(mockCreators);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    setCreators((prev) =>
      prev.map((c) =>
        c.id === draggableId
          ? { ...c, stage: destination.droppableId as OutreachStage }
          : c
      )
    );
  }, []);

  const getCreatorsByStage = (stage: OutreachStage) =>
    creators.filter((c) => c.stage === stage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pipeline</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Drag and drop creators through your outreach pipeline.
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4" style={{ minWidth: `${PIPELINE_STAGES.length * 260}px` }}>
            {PIPELINE_STAGES.map((stage) => {
              const stageCreators = getCreatorsByStage(stage);
              return (
                <div
                  key={stage}
                  className="w-[250px] shrink-0"
                >
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {STAGE_LABELS[stage]}
                      </h3>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium">
                        {stageCreators.length}
                      </span>
                    </div>
                  </div>

                  <Droppable droppableId={stage}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                          "min-h-[200px] space-y-2 rounded-2xl border border-dashed border-border/50 p-2 transition-colors",
                          snapshot.isDraggingOver && "border-violet-300 bg-violet-50/50 dark:border-violet-700 dark:bg-violet-950/20"
                        )}
                      >
                        {stageCreators.map((creator, index) => (
                          <Draggable
                            key={creator.id}
                            draggableId={creator.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  className={cn(
                                    "rounded-xl border-border/50 transition-all",
                                    snapshot.isDragging && "shadow-lg shadow-violet-500/10 rotate-1"
                                  )}
                                >
                                  <CardContent className="p-3">
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 text-[10px] font-medium text-violet-700 dark:from-violet-900/50 dark:to-indigo-900/50 dark:text-violet-300">
                                          {creator.name.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                        <div>
                                          <p className="text-xs font-medium leading-tight">
                                            {creator.name}
                                          </p>
                                          <p className="text-[10px] text-muted-foreground">
                                            {creator.handle}
                                          </p>
                                        </div>
                                      </div>
                                      <span
                                        className={cn(
                                          "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold",
                                          creator.fit_score >= 85
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                                            : creator.fit_score >= 70
                                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                                        )}
                                      >
                                        {creator.fit_score}
                                      </span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1.5">
                                      <Badge variant="secondary" className="rounded-full text-[10px] px-1.5 py-0 capitalize">
                                        {creator.platform}
                                      </Badge>
                                      <Badge variant="outline" className="rounded-full text-[10px] px-1.5 py-0 capitalize">
                                        {creator.offer_type.replace("_", " ")}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {stageCreators.length === 0 && (
                          <div className="flex items-center justify-center py-8 text-xs text-muted-foreground/50">
                            Drop here
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DragDropContext>
    </div>
  );
}
