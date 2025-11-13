import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email").min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .min(1, { message: "Password is required" }),
});

export const signupSchema = z
  .object({
    email: z.email("Invalid email").min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .min(1, { message: "Password is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must be the same",
    path: ["confirmPassword"],
  });
