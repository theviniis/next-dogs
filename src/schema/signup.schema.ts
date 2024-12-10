import { z } from "zod";
import * as common from "./common.schema";
import confirmPasswordRefiner from "./refiners/confirm-password.refiner";

export const signupSchema = z
  .object({
    username: common.usernameSchema,
    email: common.emailSchema,
    password: common.passwordSchema,
    confirmPassword: common.passwordSchema,
  })
  .refine(confirmPasswordRefiner.handler, confirmPasswordRefiner.message);

export type SignupSchema = z.infer<typeof signupSchema>;
