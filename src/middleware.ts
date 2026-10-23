/**
 * @file src/middleware.ts
 * @purpose Middleware checking presence of session cookie on /admin routes.
 * @tags middleware, auth, admin, session
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME || "bilbili_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE);
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
