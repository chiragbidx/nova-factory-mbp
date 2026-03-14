export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Demo reporting tiles. Wire to real analytics in future.
const demoReports = [
  {
    id: "rep-1",
    name: "Quarterly Performance Report",
    client: "Acme Brands",
    status: "Delivered",
    createdAt: "2026-04-09",
  },
  {
    id: "rep-2",
    name: "New Campaign Summary",
    client: "OL Marketing",
    status: "Draft",
    createdAt: "2026-04-02",
  },
];

export default async function ReportsPage() {
  const session = await getAuthSession();
  if (!session) return null;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reporting & Analytics</h1>
          <p className="text-muted-foreground max-w-lg mt-1">
            Generate reports, track KPIs, and export actionable analytics for every client and campaign.
          </p>
        </div>
        <Button asChild variant="default">
          <Link href="/dashboard/reports/new">New Report</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/60 text-xs uppercase">
              <th className="px-4 py-2 text-left font-semibold">Report</th>
              <th className="px-4 py-2 text-left font-semibold">Client</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoReports.map((r) => (
              <tr key={r.id} className="border-b hover:bg-accent/40 transition-all">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.client}</td>
                <td className="px-4 py-3">{r.status}</td>
                <td className="px-4 py-3">{r.createdAt}</td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/reports/${r.id}`}>Open</Link>
                  </Button>
                </td>
              </tr>
            ))}
            {demoReports.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  No reports yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}