"use server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { assets } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

const assetSchema = z.object({
  clientId: z.string().min(1),
  campaignId: z.string().optional(),
  name: z.string().min(2),
  storageUrl: z.string().min(2),
  fileType: z.string().optional(),
  status: z.string().optional(),
  uploadedByUserId: z.string().min(1),
  tags: z.string().optional(),
});

export async function createAsset(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = assetSchema.safeParse(values);
  if (!parsed.success) return { error: "Validation failed." };
  const asset = await db.insert(assets).values(parsed.data).returning();
  revalidatePath("/dashboard/assets");
  return { ok: true, asset: asset[0] };
}

export async function updateAsset(id: string, updates: Record<string, any>) {
  const parsed = assetSchema.partial().safeParse(updates);
  if (!parsed.success) return { error: "Validation failed." };
  await db.update(assets).set(parsed.data).where(assets.id.eq(id));
  revalidatePath("/dashboard/assets");
  return { ok: true };
}

export async function deleteAsset(id: string) {
  await db.delete(assets).where(assets.id.eq(id));
  revalidatePath("/dashboard/assets");
  return { ok: true };
}