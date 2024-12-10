import { z } from "zod";

export const commentPostSchema = z.object({
  comment: z.string().min(1).max(400),
});

export type CommentPostSchema = z.infer<typeof commentPostSchema>;
