"use client";

import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PIPELINE_STAGES } from "@/lib/constants";
import { stageVariant } from "@/lib/presentation";
import { Creator, PipelineStage } from "@/lib/types";
import { cn } from "@/lib/utils";

function DraggableCreatorCard({ creator }: { creator: Creator }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: creator.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(isDragging && "opacity-50")}
    >
      <Card className="cursor-grab border-slate-200 bg-white p-3 active:cursor-grabbing dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-semibold">{creator.name}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {creator.platform} · {creator.offerType}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="secondary">Fit {creator.fitScore}</Badge>
          <Badge variant={stageVariant(creator.stage)}>{creator.stage}</Badge>
        </div>
      </Card>
    </div>
  );
}

function PipelineColumn({ stage, creators }: { stage: PipelineStage; creators: Creator[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: stage,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[180px] space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 transition dark:border-slate-800 dark:bg-slate-900/40",
        isOver && "border-slate-400 dark:border-slate-500",
      )}
    >
      <div className="mb-1 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{stage}</p>
        <Badge variant="outline">{creators.length}</Badge>
      </div>
      {creators.length > 0 ? (
        creators.map((creator) => <DraggableCreatorCard key={creator.id} creator={creator} />)
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Drop creator here
        </div>
      )}
    </div>
  );
}

export function PipelineBoard({ creators, title }: { creators: Creator[]; title?: string }) {
  const [boardCreators, setBoardCreators] = useState(creators);

  function handleDragEnd(event: DragEndEvent) {
    if (!event.over) {
      return;
    }
    const targetStage = event.over.id as PipelineStage;
    const creatorId = String(event.active.id);
    setBoardCreators((current) =>
      current.map((creator) =>
        creator.id === creatorId ? { ...creator, stage: targetStage } : creator,
      ),
    );
  }

  const grouped = useMemo(
    () =>
      PIPELINE_STAGES.reduce<Record<PipelineStage, Creator[]>>((acc, stage) => {
        acc[stage] = boardCreators.filter((creator) => creator.stage === stage);
        return acc;
      }, {} as Record<PipelineStage, Creator[]>),
    [boardCreators],
  );

  return (
    <div className="space-y-4">
      {title ? <h3 className="text-base font-semibold tracking-tight">{title}</h3> : null}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid gap-3 xl:grid-cols-5">
          {PIPELINE_STAGES.map((stage) => (
            <PipelineColumn key={stage} stage={stage} creators={grouped[stage]} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
