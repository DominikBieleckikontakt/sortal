import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { auth } from "./utils/auth";
import { toNodeHandler } from "better-auth/node";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.listen(5000, () => console.log("Backend listening on 5000"));
