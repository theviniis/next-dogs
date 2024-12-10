"use server";

import service from "@/lib/service";
import { SignupSchema } from "@/schema/signup.schema";
import { signin } from "./auth-signin";

export const userCreate = async (data: SignupSchema) => {
  try {
    const response = await service.user.create(data);

    if (response.status !== 200) {
      throw new Error("Invalid user data creation");
    }

    const token = await signin(data);

    if (!token) throw new Error("Token not found");

    return token;
  } catch (err) {
    throw new Error(err);
  }
};
