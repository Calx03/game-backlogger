import * as z from "zod";

// These aren't really necessary at the moment to be honest
// But they are nice to have just in case bad data is sent, somehow.

export const newBacklogEntrySchema = z.object({
  rawgId: z.number().int().positive(),
  background_image: z.string().optional().nullable(),
  status: z.enum(["backlog", "playing", "completed", "dropped"]),
  rating: z.number().int().min(1).max(10).optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const updateBacklogEntrySchema = z.object({
  status: z.enum(["backlog", "playing", "completed", "dropped"]).optional(),
  rating: z.number().int().min(1).max(10).optional().nullable(),
  notes: z.string().optional().nullable(),
});
