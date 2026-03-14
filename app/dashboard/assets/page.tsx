export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Demo assets
const demoAssets = [
  {
    id: "ast-1",
    name: "Campaign Brief - Acme.pdf",
    client: "Acme Brands",
    type: "Document",
    uploaded: "2026-03-01",
    status: "Active",
  },
  {
    id: "ast-2",
    name: "Summer Banner.png",
    client: "OL Marketing",
    type: "Image",
    uploaded: "2026-03-15",
    status: "Active",
  },
  {
    id: "ast-3",
    name: "Client Logo.svg",
    client: "Acme Brands",
    type: "Image",
    uploaded: "2026-02-11",
    status: "Archived",
  },
];

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
        <Button asChild variant="default">
          <Link href="/dashboard/assets/new">Upload Asset</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/60 text-xs uppercase">
              <th className="px-4 py-2 text-left font-semibold">Asset Name</th>
              <th className="px-4 py-2 text-left font-semibold">Client</th>
              <th className="px-4 py-2 text-left font-semibold">Type</th>
              <th className="px-4 py-2 text-left font-semibold">Uploaded</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoAssets.map((a) => (
              <tr key={a.id} className="border-b hover:bg-accent/40 transition-all">
                <td className="px-4 py-3">{a.name}</td>
                <td className="px-4 py-3">{a.client}</td>
                <td className="px-4 py-3">{a.type}</td>
                <td className="px-4 py-3">{a.uploaded}</td>
                <td className="px-4 py-3">{a.status}</td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/assets/${a.id}`}>Info</Link>
                  </Button>
                </td>
              </tr>
            ))}
            {demoAssets.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}