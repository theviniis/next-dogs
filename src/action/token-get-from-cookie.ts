import { TOKEN_STORAGE_KEY } from "@/lib/token";
import { cookies } from "next/headers";

export async function getTokenFromCookie() {
  try {
    const cookie = await cookies();
    const token = cookie.get(TOKEN_STORAGE_KEY);
    return token?.value as string;
  } catch {
    return null;
  }
}
