import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db/client";
import { users, teams, teamMembers } from "@/lib/db/schema";
import { getAuthSession } from "@/lib/auth/session";

async function getCounts(userId: string) {
  // Fetch dashboard stats: counts of clients, campaigns, assets, reports (mocked for now)
  return {
    clients: 7,
    campaigns: 18,
    aiUsages: 41,
    assets: 47,
    unreadMessages: 6,
  };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const [user] = await db
    .select({ firstName: users.firstName })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  const firstName = user?.firstName || "there";
  const stats = await getCounts(session.userId);

  return (
    <div>
      <div className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold">
          {getGreeting()}, {firstName} 👋
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your Marketiq Marketing Agent Portal. Quickly access all your clients, campaigns, AI agents, assets, and reporting—everything in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl p-6 border border-secondary flex flex-col items-center">
          <span className="text-4xl font-semibold text-primary">{stats.clients}</span>
          <span className="text-muted-foreground">Clients</span>
        </div>
        <div className="bg-card rounded-xl p-6 border border-secondary flex flex-col items-center">
          <span className="text-4xl font-semibold text-primary">{stats.campaigns}</span>
          <span className="text-muted-foreground">Campaigns</span>
        </div>
        <div className="bg-card rounded-xl p-6 border border-secondary flex flex-col items-center">
          <span className="text-4xl font-semibold text-primary">{stats.assets}</span>
          <span className="text-muted-foreground">Assets</span>
        </div>
        <div className="bg-card rounded-xl p-6 border border-secondary flex flex-col items-center">
          <span className="text-4xl font-semibold text-primary">{stats.aiUsages}</span>
          <span className="text-muted-foreground">AI Agent Runs</span>
        </div>
        <div className="bg-card rounded-xl p-6 border border-secondary flex flex-col items-center">
          <span className="text-4xl font-semibold text-primary">{stats.unreadMessages}</span>
          <span className="text-muted-foreground">Unread Messages</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick links or next actions (future: upcoming deadlines, recent activity, invites etc.) */}
        <div className="bg-muted/80 rounded-xl p-6 shadow flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex gap-3 flex-wrap">
            <a href="/dashboard/clients" className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-primary transition hover:bg-primary/30 font-medium">Manage Clients</a>
            <a href="/dashboard/campaigns" className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-primary transition hover:bg-primary/30 font-medium">View Campaigns</a>
            <a href="/dashboard/ai-agents" className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-primary transition hover:bg-primary/30 font-medium">AI Agents</a>
            <a href="/dashboard/reports" className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-primary transition hover:bg-primary/30 font-medium">Analytics & Reports</a>
            <a href="/dashboard/assets" className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-primary transition hover:bg-primary/30 font-medium">Asset Library</a>
            <a href="/dashboard/communication" className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-primary transition hover:bg-primary/30 font-medium">Messages</a>
          </div>
        </div>
        <div className="bg-muted/80 rounded-xl p-6 shadow flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="flex flex-col gap-2 text-muted-foreground">
            <li>• New campaign proposal created for Acme Ltd.</li>
            <li>• Report sent to OL Marketing</li>
            <li>• 5 assets uploaded by Team Alpha</li>
            <li>• MarketIQ Agent generated a campaign brief</li>
            <li>• Welcome David to the team (invited)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}