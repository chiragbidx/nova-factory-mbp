"use server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { threads, messages } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

const threadSchema = z.object({
  subject: z.string().min(2),
  clientId: z.string().optional(),
  campaignId: z.string().optional(),
  createdByUserId: z.string().min(1),
});

const messageSchema = z.object({
  threadId: z.string().min(1),
  userId: z.string().min(1),
  body: z.string().min(1),
});

export async function createThread(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = threadSchema.safeParse(values);
  if (!parsed.success) return { error: "Validation failed." };
  const thread = await db.insert(threads).values(parsed.data).returning();
  revalidatePath("/dashboard/communication");
  return { ok: true, thread: thread[0] };
}

export async function createMessage(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = messageSchema.safeParse(values);
  if (!parsed.success) return { error: "Validation failed." };
  const message = await db.insert(messages).values(parsed.data).returning();
  revalidatePath(`/dashboard/communication/${parsed.data.threadId}`);
  return { ok: true, message: message[0] };
}

export async function deleteThread(id: string) {
  await db.delete(threads).where(threads.id.eq(id));
  revalidatePath("/dashboard/communication");
  return { ok: true };
}

export async function deleteMessage(id: string) {
  await db.delete(messages).where(messages.id.eq(id));
  // Cannot revalidate thread path without threadId, so just revalidate list.
  revalidatePath("/dashboard/communication");
  return { ok: true };
}