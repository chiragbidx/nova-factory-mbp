export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import { createReport } from "./actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

function AddReportForm({ userId }: { userId: string }) {
  "use client";
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    url: "",
    campaignId: "",
    clientId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.set("title", form.title);
    if (form.summary) formData.set("summary", form.summary);
    if (form.url) formData.set("url", form.url);
    // To be replaced by real selection/modals later
    formData.set("campaignId", form.campaignId || "demo-campaign-id");
    formData.set("clientId", form.clientId || "demo-client-id");
    formData.set("createdByUserId", userId);

    const result = await createReport(formData);
    setLoading(false);
    if (result?.ok) {
      setOpen(false);
      setForm({ title: "", summary: "", url: "", campaignId: "", clientId: "" });
    } else {
      setError(result?.error || "Failed to create report.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">New Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Report Title</label>
            <input
              className="input input-bordered w-full"
              required
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Summary</label>
            <textarea
              className="input input-bordered w-full"
              value={form.summary}
              onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Report URL</label>
            <input
              className="input input-bordered w-full"
              value={form.url}
              onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
            />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Report"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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