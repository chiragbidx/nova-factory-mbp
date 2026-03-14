"use server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { aiAgentLogs } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

const logSchema = z.object({
  userId: z.string().min(1),
  clientId: z.string().optional(),
  campaignId: z.string().optional(),
  prompt: z.string().min(3),
  aiType: z.string().min(2),
  result: z.string().optional(),
});

export async function createAIAgentLog(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = logSchema.safeParse(values);
  if (!parsed.success) return { error: "Validation failed." };
  const log = await db.insert(aiAgentLogs).values(parsed.data).returning();
  revalidatePath("/dashboard/ai-agents");
  return { ok: true, log: log[0] };
}

export async function updateAIAgentLog(id: string, updates: Record<string, any>) {
  const parsed = logSchema.partial().safeParse(updates);
  if (!parsed.success) return { error: "Validation failed." };
  await db.update(aiAgentLogs).set(parsed.data).where(aiAgentLogs.id.eq(id));
  revalidatePath("/dashboard/ai-agents");
  return { ok: true };
}

export async function deleteAIAgentLog(id: string) {
  await db.delete(aiAgentLogs).where(aiAgentLogs.id.eq(id));
  revalidatePath("/dashboard/ai-agents");
  return { ok: true };
}