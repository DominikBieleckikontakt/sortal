export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "supersecret",
    accessTokenExpiry: "1h" as const,
    refreshTokenExpiry: "7d" as const,
  },
  bcrypt: {
    saltRounds: 12,
  },
  session: {
    cookieName: "auth-session",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 15,
  },
};
