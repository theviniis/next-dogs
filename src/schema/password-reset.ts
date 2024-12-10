import { z } from "zod";
import { passwordSchema } from "./common.schema";
import confirmPasswordRefiner from "./refiners/confirm-password.refiner";

export const passwordResetSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(confirmPasswordRefiner.handler, confirmPasswordRefiner.message);

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;
