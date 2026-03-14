export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Demo messages list
const demoThreads = [
  {
    id: "thread-1",
    subject: "Client Feedback: Black Friday Push",
    participants: "Acme Brands • John, Sarah",
    lastMessage: "Let's review the performance report on Monday.",
    updated: "9 minutes ago",
  },
  {
    id: "thread-2",
    subject: "Asset Approval",
    participants: "OL Marketing • Olivia",
    lastMessage: "Approved the new creative for the campaign.",
    updated: "Yesterday",
  },
];

export default async function CommunicationPage() {
  const session = await getAuthSession();
  if (!session) return null;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Communication</h1>
          <p className="text-muted-foreground max-w-lg mt-1">
            Message clients, share deliverables, and keep feedback in one place. Stay in sync with your team and clients.
          </p>
        </div>
        <Button asChild variant="default">
          <Link href="/dashboard/communication/new">New Thread</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-secondary bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/60 text-xs uppercase">
              <th className="px-4 py-2 text-left font-semibold">Subject</th>
              <th className="px-4 py-2 text-left font-semibold">Participants</th>
              <th className="px-4 py-2 text-left font-semibold">Last message</th>
              <th className="px-4 py-2 text-left font-semibold">Updated</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoThreads.map((t) => (
              <tr key={t.id} className="border-b hover:bg-accent/40 transition-all">
                <td className="px-4 py-3">{t.subject}</td>
                <td className="px-4 py-3">{t.participants}</td>
                <td className="px-4 py-3">{t.lastMessage}</td>
                <td className="px-4 py-3">{t.updated}</td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/communication/${t.id}`}>Open</Link>
                  </Button>
                </td>
              </tr>
            ))}
            {demoThreads.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  No communication threads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}