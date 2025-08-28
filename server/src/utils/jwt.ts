import { sign, decode, verify } from "jsonwebtoken";
import { authConfig } from "../config/auth";

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

const secret: string = authConfig.jwt.secret;

export const generateAccessToken = (
  payload: Omit<JwtPayload, "iat" | "exp">
): string => {
  return sign(payload, secret, {
    expiresIn: authConfig.jwt.accessTokenExpiry,
  });
};

export const generateRefreshToken = (
  payload: Omit<JwtPayload, "iat" | "exp">
): string => {
  return sign(payload, secret, {
    expiresIn: authConfig.jwt.refreshTokenExpiry,
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return verify(token, secret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};
