"use server";

import { TOKEN_STORAGE_KEY } from "@/lib/token";
import { cookies } from "next/headers";
export async function tokenGet() {
  try {
    const cookie = await cookies();
    const token = cookie.get(TOKEN_STORAGE_KEY);
    if (!token) return null;
    return token;
  } catch {
    return null;
  }
}
