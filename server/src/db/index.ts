import { drizzle, MySql2DrizzleConfig } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysqldb",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

const config: MySql2DrizzleConfig<typeof schema> = {
  schema,
  mode: "default",
};

export const db = drizzle(pool, config);

export type Database = typeof db;
