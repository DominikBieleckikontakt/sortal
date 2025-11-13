import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  requireEmailVerification: false,
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema,
  }),
  user: {
    modelName: "users",
  },
  session: {
    modelName: "sessions",
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  account: {
    modelName: "accounts",
  },
  verification: {
    modelName: "verification_tokens",
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  emailAndPassword: { enabled: true },
});
