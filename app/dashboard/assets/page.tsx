export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import { AddAssetForm } from "./add-asset-form";

export default async function AssetsPage() {
  const session = await getAuthSession();
  if (!session) return null;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assets & Content Library</h1>
          <p className="text-muted-foreground max-w-lg mt-1">
            Organize, search, and share content/creative for every client and campaign.
          </p>
        </div>
        <AddAssetForm userId={session.userId} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        {/* Existing asset table/content goes here */}
      </div>
    </div>
  );
}