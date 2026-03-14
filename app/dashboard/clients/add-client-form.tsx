"use client";

import { createClient } from "./actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function AddClientForm({ teamId }: { teamId: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ companyName: "", mainContact: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set("companyName", form.companyName);
    formData.set("mainContact", form.mainContact);
    formData.set("notes", form.notes);
    formData.set("teamId", teamId);

    const result = await createClient(formData);
    setLoading(false);

    if (result?.ok) {
      setOpen(false);
      setForm({ companyName: "", mainContact: "", notes: "" });
    } else {
      setError(result?.error || "Failed to create client.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add New Client</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              className="input input-bordered w-full"
              required
              value={form.companyName}
              onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Main Contact</label>
            <input
              className="input input-bordered w-full"
              value={form.mainContact}
              onChange={e => setForm(f => ({ ...f, mainContact: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              className="input input-bordered w-full"
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Client"}
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