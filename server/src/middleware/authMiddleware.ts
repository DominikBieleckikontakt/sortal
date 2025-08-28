import { Request, Response, NextFunction } from "express";

import { db } from "../db";
import { users, userSessions } from "../db/schema";
import { JwtPayload, verifyToken } from "../utils/jwt";
import { and, eq } from "drizzle-orm";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      res.status(401).json({
        error: "Access token required",
        code: "NO_TOKEN",
      });
      return;
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      res.status(401).json({
        error: "Invalid or expired token",
        code: "INVALID_TOKEN",
      });
      return;
    }

    const user = await db.query.users.findFirst({
      where: and(eq(users.id, decodedToken.userId), eq(users.isActive, true)),
      columns: {
        id: true,
        email: true,
        isActive: true,
      },
    });

    if (!user) {
      res.status(401).json({
        error: "User not found or inactive",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      error: "Internal server error",
      code: "INTERNAL_ERROR",
    });
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        const user = await db.query.users.findFirst({
          where: and(eq(users.id, decoded.userId), eq(users.isActive, true)),
          columns: {
            id: true,
            email: true,
            isActive: true,
          },
        });

        if (user) {
          req.user = decoded;
        }
      }
    }

    next();
  } catch (error) {
    // For optional auth, we don't fail on errors
    next();
  }
};
