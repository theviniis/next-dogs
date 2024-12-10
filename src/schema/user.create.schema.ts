import { z } from "zod";
import { passwordSchema, usernameSchema } from "./common.schema";

export const userCreateSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
