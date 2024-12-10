import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_STORAGE_KEY } from "./lib/token";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(TOKEN_STORAGE_KEY)?.value;
  const authenticated = token ? true : false;

  if (!authenticated && path.startsWith("/user/account")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  if (authenticated && path.startsWith("/auth/signin")) {
    return NextResponse.redirect(new URL("/user/account", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/account/:path*", "/auth/login/:path*"],
};
