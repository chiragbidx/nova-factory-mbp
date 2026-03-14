"use server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { campaigns } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const campaignSchema = z.object({
  clientId: z.string().min(1),
  name: z.string().min(2),
  objective: z.string().optional(),
  channel: z.string().optional(),
  phase: z.string().optional(),
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export async function createCampaign(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = campaignSchema.safeParse(values);
  if (!parsed.success) return { error: "Validation failed." };
  const campaign = await db
    .insert(campaigns)
    .values({
      ...parsed.data,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    })
    .returning();
  revalidatePath("/dashboard/campaigns");
  return { ok: true, campaign: campaign[0] };
}

export async function updateCampaign(campaignId: string, updates: Record<string, any>) {
  const parsed = campaignSchema.partial().safeParse(updates);
  if (!parsed.success) return { error: "Validation failed." };
  await db.update(campaigns).set(parsed.data).where(eq(campaigns.id, campaignId));
  revalidatePath("/dashboard/campaigns");
  return { ok: true };
}

export async function deleteCampaign(campaignId: string) {
  await db.delete(campaigns).where(eq(campaigns.id, campaignId));
  revalidatePath("/dashboard/campaigns");
  return { ok: true };
}