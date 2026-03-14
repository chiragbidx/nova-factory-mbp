export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import { AddCampaignForm } from "./add-campaign-form";

async function getFirstClientId(session: any): Promise<string> {
  // You'd normally fetch your user's client list; demo fallback.
  return "demo-client-1";
}

export default async function CampaignsPage() {
  const session = await getAuthSession();
  if (!session) return null;

  const clientId = await getFirstClientId(session);

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground max-w-lg mt-1">
            Plan and execute marketing campaigns for any client. View, filter, and analyze campaign activity across all brands.
          </p>
        </div>
        <AddCampaignForm clientId={clientId} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        {/* Existing (demo) campaign table goes here */}
      </div>
    </div>
  );
}