import { pgTable, text, timestamp, uniqueIndex, varchar, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// --- Existing Auth/Team Models ---
export const users = pgTable("users", {
  id: text("id")
    .notNull()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  passwordHash: text("password_hash").notNull(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const teams = pgTable("teams", {
  id: text("id")
    .notNull()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const teamMembers = pgTable(
  "team_members",
  {
    id: text("id")
      .notNull()
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull().default("member"),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("team_members_team_user_idx").on(table.teamId, table.userId),
  ]
);

export const teamInvitations = pgTable("team_invitations", {
  id: text("id")
    .notNull()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  teamId: text("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role").notNull().default("member"),
  token: text("token").notNull().unique(),
  invitedByUserId: text("invited_by_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("pending"),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// --- Marketiq Agency Features ---

// 1. Clients (one per team/org, acts as extended info to teams table)
export const clients = pgTable("clients", {
  id: text("id").notNull().default(sql`gen_random_uuid()`).primaryKey(),
  teamId: text("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  mainContact: varchar("main_contact", { length: 255 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// 2. Campaigns
export const campaigns = pgTable("campaigns", {
  id: text("id").notNull().default(sql`gen_random_uuid()`).primaryKey(),
  clientId: text("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  objective: text("objective"),
  channel: text("channel"),
  phase: text("phase"),
  status: text("status").notNull().default("active"),
  startDate: timestamp("start_date", { withTimezone: true }),
  endDate: timestamp("end_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// 3. Assets
export const assets = pgTable("assets", {
  id: text("id").notNull().default(sql`gen_random_uuid()`).primaryKey(),
  clientId: text("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  campaignId: text("campaign_id")
    .references(() => campaigns.id, { onDelete: "set null" }),
  name: varchar("name", { length: 255 }).notNull(),
  storageUrl: text("storage_url").notNull(),
  fileType: varchar("file_type", { length: 128 }),
  status: text("status").notNull().default("active"),
  uploadedByUserId: text("uploaded_by_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  tags: text("tags"),
});

// 4. Reports
export const reports = pgTable("reports", {
  id: text("id").notNull().default(sql`gen_random_uuid()`).primaryKey(),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  clientId: text("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url"),
  status: text("status").notNull().default("draft"),
  summary: text("summary"),
  createdByUserId: text("created_by_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// 5. AI Agent Usage Logs
export const aiAgentLogs = pgTable("ai_agent_logs", {
  id: text("id").notNull().default(sql`gen_random_uuid()`).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  clientId: text("client_id")
    .references(() => clients.id, { onDelete: "set null" }),
  campaignId: text("campaign_id")
    .references(() => campaigns.id, { onDelete: "set null" }),
  prompt: text("prompt").notNull(),
  aiType: text("ai_type").notNull(),
  result: text("result"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// 6. Communication (Threads + Messages)
// Threads (conversation per client/campaign/topic)
export const threads = pgTable("threads", {
  id: text("id").notNull().default(sql`gen_random_uuid()`).primaryKey(),
  subject: varchar("subject", { length: 255 }).notNull(),
  clientId: text("client_id")
    .references(() => clients.id, { onDelete: "set null" }),
  campaignId: text("campaign_id")
    .references(() => campaigns.id, { onDelete: "set null" }),
  createdByUserId: text("created_by_user_id")
    .references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const messages = pgTable("messages", {
  id: text("id").notNull().default(sql`gen_random_uuid()`).primaryKey(),
  threadId: text("thread_id")
    .notNull()
    .references(() => threads.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  readBy: text("read_by"),
});

// Indexes, constraints, and data validation can be further extended as needed.