import { z } from "zod";

export const createGameSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  category: z.string().min(1, "Category is required").max(100),
  tags: z.array(z.string().max(50)).min(0).default([]),
  metacriticScore: z.number().int().min(0).max(100),
  hoursToBeat: z.number().positive("Hours must be greater than 0"),
});

export const updateGameSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  category: z.string().min(1).max(100).optional(),
  tags: z.array(z.string().max(50)).optional(),
  metacriticScore: z.number().int().min(0).max(100).optional(),
  hoursToBeat: z.number().positive("Hours must be greater than 0").optional(),
});

export const completeGameSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  completionNotes: z.string().max(1000).optional(),
});

export const listGamesSchema = z.object({
  sort: z.enum(["score", "completed", "in_progress", "priority"]).optional(),
  tag: z.string().optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  completed: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  alias: z.string().min(1, "Alias is required").max(50),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type CreateGameInput = z.infer<typeof createGameSchema>;
export type UpdateGameInput = z.infer<typeof updateGameSchema>;
export type CompleteGameInput = z.infer<typeof completeGameSchema>;
export type ListGamesQuery = z.infer<typeof listGamesSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;