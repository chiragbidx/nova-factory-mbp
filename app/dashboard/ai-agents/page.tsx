import { getAuthSession } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Demo list of AI agents. Wire up to backend and actions later.
const aiAgents = [
  {
    id: "ai-1",
    name: "Content Creator",
    description: "Generates copy, content briefs, and campaign posts.",
    runs: 243,
    status: "Active",
  },
  {
    id: "ai-2",
    name: "Campaign Optimizer",
    description: "Analyzes campaign data and recommends improvements.",
    runs: 167,
    status: "Active",
  },
  {
    id: "ai-3",
    name: "Analytics Reporter",
    description: "Builds actionable reports and summaries for clients.",
    runs: 88,
    status: "In Beta",
  },
];

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
        <Button asChild variant="default">
          <Link href="/dashboard/ai-agents/new">Add AI Agent</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/60 text-xs uppercase">
              <th className="px-4 py-2 text-left font-semibold">AI Agent Name</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
              <th className="px-4 py-2 text-left font-semibold">Total Runs</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {aiAgents.map((a) => (
              <tr key={a.id} className="border-b hover:bg-accent/40 transition-all">
                <td className="px-4 py-3">{a.name}</td>
                <td className="px-4 py-3">{a.description}</td>
                <td className="px-4 py-3">{a.runs}</td>
                <td className="px-4 py-3">{a.status}</td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/ai-agents/${a.id}`}>View</Link>
                  </Button>
                </td>
              </tr>
            ))}
            {aiAgents.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  No AI agents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}