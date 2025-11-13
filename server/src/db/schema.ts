import { boolean } from "drizzle-orm/mysql-core";
import {
  index,
  mysqlTable,
  timestamp,
  varchar,
  text,
  type MySqlTableWithColumns,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
    emailVerified: boolean("email_verified").default(false),
    image: text("image"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  },
  (table) => [index("email_idx").on(table.email)]
);

export const sessions: MySqlTableWithColumns<any> = mysqlTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: varchar("user_agent", { length: 256 }),
  },
  (table) => [index("user_id_idx").on(table.userId)]
);

export const accounts: MySqlTableWithColumns<any> = mysqlTable(
  "accounts",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    accountId: varchar("account_id", { length: 255 }).notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    providerType: varchar("provider_type", { length: 255 }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    expiresAt: timestamp("expires_at"),
    password: text("password"),
    scope: text("scope"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  },
  (table) => [
    index("provider_providerAccountId_idx").on(
      table.providerId,
      table.accountId
    ),
  ]
);

export const verificationTokens: MySqlTableWithColumns<any> = mysqlTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
  },
  (table) => [
    index("verification_tokens_idx").on(table.identifier, table.token),
  ]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Sessions = typeof sessions.$inferSelect;
export type Accounts = typeof accounts.$inferSelect;
export type VerificationTokens = typeof verificationTokens.$inferSelect;

export type SafeUser = Omit<User, "password">;
