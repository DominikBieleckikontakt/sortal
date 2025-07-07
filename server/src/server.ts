const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysqldb",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/api/ping", async (req: any, res: any) => {
  const [rows] = await pool.query("SELECT 1 + 1 AS result");
  res.json({ result: rows[0].result });
});

app.listen(5000, () => console.log("Backend listening on 5000"));
