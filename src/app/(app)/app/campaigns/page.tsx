import { CampaignList } from "@/components/campaigns/campaign-list";
import { CreateCampaignDialog } from "@/components/campaigns/create-campaign-dialog";
import { PageHeader } from "@/components/layout/page-header";
import { campaigns } from "@/lib/mock-data";

export default function CampaignsPage() {
  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Design focused creator campaigns with clear goals, tone, and offer structure."
        action={<CreateCampaignDialog />}
      />
      <CampaignList campaigns={campaigns} />
    </div>
  );
}
