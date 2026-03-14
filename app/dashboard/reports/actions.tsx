"use server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { reports } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const reportSchema = z.object({
  campaignId: z.string().min(1),
  clientId: z.string().min(1),
  title: z.string().min(2),
  url: z.string().optional(),
  status: z.string().optional(),
  summary: z.string().optional(),
  createdByUserId: z.string().min(1),
});

export async function createReport(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = reportSchema.safeParse(values);
  if (!parsed.success) return { error: "Validation failed." };
  const report = await db.insert(reports).values(parsed.data).returning();
  revalidatePath("/dashboard/reports");
  return { ok: true, report: report[0] };
}

export async function updateReport(id: string, updates: Record<string, any>) {
  const parsed = reportSchema.partial().safeParse(updates);
  if (!parsed.success) return { error: "Validation failed." };
  await db.update(reports).set(parsed.data).where(eq(reports.id, id));
  revalidatePath("/dashboard/reports");
  return { ok: true };
}

export async function deleteReport(id: string) {
  await db.delete(reports).where(eq(reports.id, id));
  revalidatePath("/dashboard/reports");
  return { ok: true };
}