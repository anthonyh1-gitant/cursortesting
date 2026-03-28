import { PipelineStage } from "@/lib/types";

export function stageVariant(stage: PipelineStage): "default" | "secondary" | "success" | "warning" {
  if (stage === "Won" || stage === "Interested" || stage === "Negotiating") {
    return "success";
  }
  if (stage === "Not Interested") {
    return "warning";
  }
  if (stage === "Ready to Send" || stage === "Drafted" || stage === "Sent") {
    return "secondary";
  }
  return "default";
}
