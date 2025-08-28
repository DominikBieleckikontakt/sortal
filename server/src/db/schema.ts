import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// Tables

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 256 }).primaryKey().default(randomUUID()),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    isActive: boolean("is_active").default(true),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  })
);

export const refreshTokens = mysqlTable(
  "refresh_tokens",
  {
    id: varchar("id", { length: 256 }).primaryKey().default(randomUUID()),
    token: varchar("token", { length: 256 }).notNull().unique(),
    userId: varchar("user_id", { length: 256 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    isRevoked: boolean("is_revoked").default(false),
  },
  (table) => ({
    tokenIdx: index("token_idx").on(table.token),
    userIdIdx: index("user_id_idx").on(table.userId),
  })
);

export const userSessions = mysqlTable("user_sessions", {
  id: varchar("id", { length: 256 }).primaryKey().default(randomUUID()),
  userId: varchar("user_id", { length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sessionToken: varchar("session_token", { length: 256 }).notNull().unique(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: varchar("user_agent", { length: 256 }),
  lastActivity: timestamp("last_activity").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations

export const userRelations = relations(users, ({ many }) => ({
  refreshTokens: many(refreshTokens),
  userSessions: many(userSessions),
}));

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, { fields: [refreshTokens.userId], references: [users.id] }),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, { fields: [userSessions.userId], references: [users.id] }),
}));

// Types

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type NewUserSession = typeof userSessions.$inferInsert;

export type SafeUser = Omit<User, "password">;
