import { signout } from "@/action/auth-signout";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REDIRECT_URL = "/auth/signin";

export async function GET(req: NextRequest) {
  revalidatePath("/", "layout");
  await signout();
  const url = new URL(REDIRECT_URL, req.nextUrl);
  return NextResponse.redirect(url, {
    headers: {
      "Clear-Site-Data": `"*"`,
      "Cache-Control": "no-store",
    },
  });
}
