import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required!" });
  }

  if (!email.includes("@")) {
    res.status(400).json({ error: "Invalid email!" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await db
      .insert(users)
      .values({
        email,
        password: passwordHash,
      })
      .$returningId();

    const userId = result[0].id;
    const [user] = await db.select().from(users).where(eq(users.id, userId));

    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: "User already exists!" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required!" });
  }

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    res.status(401).json({ error: "User not found!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid password!" });
  }

  const token = generateToken({ userId: user.id });
  res.json({ token, user: { id: user.id, email: user.email } });
};

export const getMe = async (req: Request, res: Response) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, req.body.user.userId));
  res.json({ user: { id: user.id, email: user.email } });
};
