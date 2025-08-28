import z from "zod";
import { Request, Response } from "express";
import { db } from "../db";
import { refreshTokens, users, userSessions } from "../db/schema";
import { eq } from "drizzle-orm";

import bcrypt from "bcryptjs";
import { authConfig } from "../config/auth";
import { randomUUID } from "crypto";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (existingUser) {
      res.status(400).json({
        error: "User already exists",
        code: "USER_EXISTS",
      });

      return;
    }

    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      authConfig.bcrypt.saltRounds
    );

    const id = randomUUID();
    await db.insert(users).values({
      id,
      email: validatedData.email,
      password: hashedPassword,
    });

    const tokenPayload = {
      userId: id,
      email: validatedData.email,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.insert(refreshTokens).values({
      token: refreshToken,
      userId: id,
      expiresAt,
    });

    await db.insert(userSessions).values({
      userId: id,
      sessionToken: refreshToken,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      expiresAt,
    });

    const newUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error,
        code: "VALIDATION_ERROR",
      });
      return;
    }

    console.error("Registration error:", error);
    res.status(500).json({
      error: "Internal server error",
      code: "INTERNAL_ERROR",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (!user) {
      res.status(400).json({
        error: "User not found",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    const isValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isValid) {
      res.status(400).json({
        error: "Invalid password",
        code: "INVALID_PASSWORD",
      });
      return;
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.insert(refreshTokens).values({
      token: refreshToken,
      userId: user.id,
      expiresAt,
    });

    await db.insert(userSessions).values({
      userId: user.id,
      sessionToken: refreshToken,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      expiresAt,
    });

    res.status(200).json({
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", code: "INTERNAL_ERROR" });
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated", code: "NO_USER" });
      return;
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, req.user.userId),
      columns: {
        id: true,
        email: true,
        createdAt: true,
        isActive: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found", code: "NOT_FOUND" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", code: "INTERNAL_ERROR" });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = refreshTokenSchema.parse(req.body);
    if (!refreshToken) {
      res
        .status(401)
        .json({ error: "Refresh token required!", code: "NO_TOKEN" });
      return;
    }

    const foundToken = await db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.token, refreshToken),
    });

    if (
      !foundToken ||
      foundToken.isRevoked ||
      foundToken.expiresAt < new Date()
    ) {
      res.status(403).json({
        error: "Invalid or expired refresh token",
        code: "TOKEN_INVALID",
      });
      return;
    }

    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      res
        .status(403)
        .json({ error: "Invalid refresh token", code: "TOKEN_INVALID" });
      return;
    }

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({
      error: "Server error",
      code: "INTERNAL_ERROR",
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res
        .status(400)
        .json({ error: "Refresh token required", code: "NO_TOKEN" });
      return;
    }

    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.token, refreshToken));

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Server error", code: "INTERNAL_ERROR" });
  }
};
