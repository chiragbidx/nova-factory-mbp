"use client";

import { createAsset } from "./actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function AddAssetForm({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    storageUrl: "",
    fileType: "",
    status: "active",
    clientId: "",
    campaignId: "",
    tags: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder for upload; replace with real upload handler
  async function uploadFile(file: File): Promise<string> {
    // Simulate upload: in production, connect to S3, Cloud Storage, or similar.
    return Promise.resolve(`/uploads/${file.name}`);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let storageUrl = form.storageUrl;
    if (file) {
      storageUrl = await uploadFile(file);
    }
    // Build FormData for server action
    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("fileType", form.fileType);
    formData.set("status", form.status);
    formData.set("clientId", form.clientId || "demo-client-id");
    if (form.campaignId) formData.set("campaignId", form.campaignId);
    if (form.tags) formData.set("tags", form.tags);
    formData.set("uploadedByUserId", userId);
    formData.set("storageUrl", storageUrl);

    const result = await createAsset(formData);
    setLoading(false);
    if (result?.ok) {
      setOpen(false);
      setForm({
        name: "",
        storageUrl: "",
        fileType: "",
        status: "active",
        clientId: "",
        campaignId: "",
        tags: "",
      });
      setFile(null);
    } else {
      setError(result?.error || "Failed to upload asset.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Upload Asset</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Asset</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Asset Name</label>
            <input
              className="input input-bordered w-full"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">File</label>
            <input
              type="file"
              className="input w-full"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">File Type</label>
            <input
              className="input input-bordered w-full"
              value={form.fileType}
              onChange={e => setForm(f => ({ ...f, fileType: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tags</label>
            <input
              className="input input-bordered w-full"
              value={form.tags}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
            />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
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