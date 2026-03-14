export const dynamic = "force-dynamic";

import { db } from "@/lib/db/client";
import { getAuthSession } from "@/lib/auth/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// For demo, static; would later use a campaigns DB table with team/client mappings.
const demoCampaigns = [
  {
    id: "cmp-1",
    name: "Spring Launch 2026",
    client: "Acme Brands",
    objective: "Awareness",
    channel: "Social",
    phase: "Planning",
    status: "Active",
  },
  {
    id: "cmp-2",
    name: "Summer Promo - 10% OFF",
    client: "OL Marketing",
    objective: "Leads",
    channel: "Email",
    phase: "Execution",
    status: "Paused",
  },
  {
    id: "cmp-3",
    name: "Black Friday Push",
    client: "Acme Brands",
    objective: "Sales",
    channel: "Paid Ads",
    phase: "Performance",
    status: "Active",
  },
];

export default async function CampaignsPage() {
  const session = await getAuthSession();
  if (!session) return null;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground max-w-lg mt-1">
            Plan and execute marketing campaigns for any client. View, filter, and analyze campaign activity across all brands.
          </p>
        </div>
        <Button asChild variant="default">
          <Link href="/dashboard/campaigns/new">New Campaign</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/60 text-xs uppercase">
              <th className="px-4 py-2 text-left font-semibold">Campaign</th>
              <th className="px-4 py-2 text-left font-semibold">Client</th>
              <th className="px-4 py-2 text-left font-semibold">Objective</th>
              <th className="px-4 py-2 text-left font-semibold">Channel</th>
              <th className="px-4 py-2 text-left font-semibold">Phase</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Manage</th>
            </tr>
          </thead>
          <tbody>
            {demoCampaigns.map((c) => (
              <tr key={c.id} className="border-b hover:bg-accent/40 transition-all">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3">{c.client}</td>
                <td className="px-4 py-3">{c.objective}</td>
                <td className="px-4 py-3">{c.channel}</td>
                <td className="px-4 py-3">{c.phase}</td>
                <td className="px-4 py-3">{c.status}</td>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/campaigns/${c.id}`}>
                    <Button variant="outline" size="sm">Open</Button>
                  </Link>
                </td>
              </tr>
            ))}
            {demoCampaigns.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  No campaigns yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}