"use server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { clients } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const clientSchema = z.object({
  companyName: z.string().min(2).max(255),
  mainContact: z.string().min(2).max(255).optional(),
  notes: z.string().optional(),
  teamId: z.string().min(1),
});

export async function createClient(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = clientSchema.safeParse(values);
  if (!parsed.success) return { error: "Validation failed." };
  const client = await db
    .insert(clients)
    .values({
      teamId: parsed.data.teamId,
      companyName: parsed.data.companyName,
      mainContact: parsed.data.mainContact,
      notes: parsed.data.notes,
    })
    .returning();
  revalidatePath("/dashboard/clients");
  return { ok: true, client: client[0] };
}

export async function updateClient(clientId: string, updates: Record<string, any>) {
  const parsed = clientSchema.partial().safeParse(updates);
  if (!parsed.success) return { error: "Validation failed." };
  await db
    .update(clients)
    .set(parsed.data)
    .where(eq(clients.id, clientId));
  revalidatePath("/dashboard/clients");
  return { ok: true };
}

export async function deleteClient(clientId: string) {
  await db.delete(clients).where(eq(clients.id, clientId));
  revalidatePath("/dashboard/clients");
  return { ok: true };
}