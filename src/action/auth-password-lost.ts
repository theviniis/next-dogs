"use server";

import service from "@/lib/service";
import { PasswordLostSchema } from "@/schema/password-lost";

export const passwordLost = async (data: PasswordLostSchema, url: string) => {
  try {
    const response = await service.auth.passwordLost({
      login: data.email,
      url,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
