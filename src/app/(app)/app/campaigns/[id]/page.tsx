import { notFound } from "next/navigation";

import { CampaignDetailTabs } from "@/components/campaigns/campaign-detail-tabs";
import { PageHeader } from "@/components/layout/page-header";
import { outreachMessages, getCampaignById, getCreatorsByCampaign } from "@/lib/mock-data";

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const campaign = getCampaignById(id);

  if (!campaign) {
    notFound();
  }

  const campaignCreators = getCreatorsByCampaign(campaign.id);
  const campaignMessages = outreachMessages.filter((message) => message.campaignId === campaign.id);

  return (
    <div>
      <PageHeader title={campaign.name} description={campaign.description} />
      <CampaignDetailTabs campaign={campaign} campaignCreators={campaignCreators} messages={campaignMessages} />
    </div>
  );
}
