export const dynamic = "force-dynamic";

import { db } from "@/lib/db/client";
import { getAuthSession } from "@/lib/auth/session";
import { createCampaign } from "./actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

// Minimal campaign form (no client fetch for demo, but normally would populate dropdown from db)
function AddCampaignForm({ clientId }: { clientId: string }) {
  "use client";
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    objective: "",
    channel: "",
    phase: "",
    status: "active",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set("clientId", clientId);
    formData.set("name", form.name);
    formData.set("objective", form.objective);
    formData.set("channel", form.channel);
    formData.set("phase", form.phase);
    formData.set("status", form.status);
    if (form.startDate) formData.set("startDate", form.startDate);
    if (form.endDate) formData.set("endDate", form.endDate);

    const result = await createCampaign(formData);
    setLoading(false);

    if (result?.ok) {
      setOpen(false);
      setForm({ name: "", objective: "", channel: "", phase: "", status: "active", startDate: "", endDate: "" });
    } else {
      setError(result?.error || "Failed to create campaign.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">New Campaign</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Campaign Name</label>
            <input
              className="input input-bordered w-full"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Objective</label>
            <input
              className="input input-bordered w-full"
              value={form.objective}
              onChange={e => setForm(f => ({ ...f, objective: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Channel</label>
            <input
              className="input input-bordered w-full"
              value={form.channel}
              onChange={e => setForm(f => ({ ...f, channel: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phase</label>
            <input
              className="input input-bordered w-full"
              value={form.phase}
              onChange={e => setForm(f => ({ ...f, phase: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={form.startDate}
              onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">End Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={form.endDate}
              onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
            />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Campaign"}
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

// TEMP: Default to first possible client
async function getFirstClientId(session: any): Promise<string> {
  // You'd normally fetch for this user/team, stub as "demo-client-1"
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
        {/* ... */}
      </div>
    </div>
  );
}