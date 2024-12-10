"use server";

import { TOKEN_STORAGE_KEY } from "@/lib/token";
import { cookies } from "next/headers";

export async function signout() {
  const cookie = await cookies();
  cookie.delete(TOKEN_STORAGE_KEY);
}
