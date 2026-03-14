export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import { AddReportForm } from "./add-report-form";

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
        <AddReportForm userId={session.userId} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        {/* existing report table */}
      </div>
    </div>
  );
}