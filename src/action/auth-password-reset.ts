"use server";

import service from "@/lib/service";
import { PasswordResetSchema } from "@/schema/password-reset";

export const passwordReset = async (data: PasswordResetSchema & SearchParams) => {
  try {
    const response = await service.auth.passwordReset(data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
