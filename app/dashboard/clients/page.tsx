export const dynamic = "force-dynamic";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { teams, teamMembers } from "@/lib/db/schema";
import { getAuthSession } from "@/lib/auth/session";
import { AddClientForm } from "./add-client-form";

export default async function ClientsPage() {
  const session = await getAuthSession();
  if (!session) return null;

  // Fetch all client teams where user is a member (owner/admin/member).
  const memberships = await db
    .select({
      teamId: teamMembers.teamId,
      role: teamMembers.role,
      name: teams.name,
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, session.userId));

  // Assume user's first team is agency main team for add; real multi-team selection can be added as enhancement.
  const userTeamId = memberships[0]?.teamId || "";

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Clients</h1>
          <p className="text-muted-foreground max-w-lg mt-1">
            Manage client accounts, assign team members, track engagement, and keep all client details organized. Invite clients for collaboration and reporting.
          </p>
        </div>
        <AddClientForm teamId={userTeamId} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/60 text-xs uppercase">
              <th className="px-4 py-2 text-left font-semibold">Client Name</th>
              <th className="px-4 py-2 text-left font-semibold">Role</th>
              <th className="px-4 py-2 text-left font-semibold">Manage</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m.teamId} className="border-b hover:bg-accent/40 transition-all">
                <td className="px-4 py-3">{m.name}</td>
                <td className="px-4 py-3 capitalize">{m.role}</td>
                <td className="px-4 py-3">
                  <a href={`/dashboard/clients/${m.teamId}`}>
                    <button className="btn btn-outline btn-sm">Open</button>
                  </a>
                </td>
              </tr>
            ))}
            {memberships.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-muted-foreground">
                  You have no client organizations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}