"use server";

import service from "@/lib/service";
import { signout } from "./auth-signout";
import { getTokenFromCookie } from "./token-get-from-cookie";

export async function tokenValidate() {
  try {
    const token = await getTokenFromCookie();
    if (!token) throw new Error("Token not found");
    const response = await service.auth.tokenValidate(token);
    return response;
  } catch (err) {
    await signout();
    throw new Error(err.message);
  }
}
