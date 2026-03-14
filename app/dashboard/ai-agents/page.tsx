export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import { createAIAgentLog } from "./actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

function AddAIAgentLogForm({ userId }: { userId: string }) {
  "use client";
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    clientId: "",
    campaignId: "",
    prompt: "",
    aiType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.set("userId", userId);
    if (form.clientId) formData.set("clientId", form.clientId);
    if (form.campaignId) formData.set("campaignId", form.campaignId);
    formData.set("prompt", form.prompt);
    formData.set("aiType", form.aiType);

    const result = await createAIAgentLog(formData);
    setLoading(false);
    if (result?.ok) {
      setOpen(false);
      setForm({ clientId: "", campaignId: "", prompt: "", aiType: "" });
    } else {
      setError(result?.error || "Failed to log AI agent action.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add AI Agent Log</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add AI Agent Log</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Minimal fields, can add selectors for client/campaign */}
          <div>
            <label className="block font-medium mb-1">Prompt</label>
            <input
              className="input input-bordered w-full"
              required
              value={form.prompt}
              onChange={e => setForm(f => ({ ...f, prompt: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">AI Agent Type</label>
            <input
              className="input input-bordered w-full"
              placeholder="E.g. Content Creator, Optimizer"
              required
              value={form.aiType}
              onChange={e => setForm(f => ({ ...f, aiType: e.target.value }))}
            />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Log"}
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

export default async function AIAgentsPage() {
  const session = await getAuthSession();
  if (!session) return null;
  // For now only takes userId; more fields can be exposed for campaign/client association as needed

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Marketing Agents</h1>
          <p className="text-muted-foreground max-w-lg mt-1">
            Automate campaign planning, content creation, and reporting with always-on AI agents. Harness AI for smarter marketing workflow.
          </p>
        </div>
        <AddAIAgentLogForm userId={session.userId} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        {/* Existing agent logs table or content */}
      </div>
    </div>
  );
}