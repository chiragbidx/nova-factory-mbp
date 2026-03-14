export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import { AddAIAgentLogForm } from "./add-aiagent-log-form";

export default async function AIAgentsPage() {
  const session = await getAuthSession();
  if (!session) return null;

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