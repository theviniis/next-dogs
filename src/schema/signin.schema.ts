import { z } from "zod";
import * as common from "./common.schema";

export const signinSchema = z.object({
  username: common.usernameSchema,
  password: common.passwordSchema,
});

export type SigninSchema = z.infer<typeof signinSchema>;
