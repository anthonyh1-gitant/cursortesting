import { PageHeader } from "@/components/layout/page-header";
import { OutreachStudio } from "@/components/outreach/outreach-studio";

export default function OutreachPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Outreach"
        description="Generate personalized outreach and follow-up drafts with human-in-the-loop controls."
      />
      <OutreachStudio />
    </div>
  );
}
