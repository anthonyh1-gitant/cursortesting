import { CreatorsCrm } from "@/components/creators/creators-crm";
import { PageHeader } from "@/components/layout/page-header";
import { creators } from "@/lib/mock-data";

export default function CreatorsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Creators CRM"
        description="Manage creator relationships with searchable profiles, fit scoring, and stage tracking."
      />
      <CreatorsCrm initialCreators={creators} />
    </div>
  );
}
