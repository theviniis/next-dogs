import { z } from "zod";
import { emailSchema } from "./common.schema";

export const passwordLostSchema = z.object({ email: emailSchema, url: z.string().optional() });

export type PasswordLostSchema = z.infer<typeof passwordLostSchema>;
