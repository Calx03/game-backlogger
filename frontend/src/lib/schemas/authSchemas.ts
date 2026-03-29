import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 8 characters long"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});
