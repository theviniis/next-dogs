"use server";

import service from "@/lib/service";
import { TOKEN_STORAGE_KEY } from "@/lib/token";
import { SigninSchema } from "@/schema/signin.schema";
import { addDays } from "date-fns";
import { cookies } from "next/headers";

export interface HttpJwtResponse {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

export async function signin(data: SigninSchema) {
  const cookie = await cookies();

  const setCookies = async (token: string) => {
    cookie.set(TOKEN_STORAGE_KEY, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: addDays(new Date(), 7).getTime(),
    });
  };

  try {
    cookie.delete(TOKEN_STORAGE_KEY);
    const response = await service.auth.signin(data);
    await setCookies(response.data.token);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
