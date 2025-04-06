import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE);
  const currentPath = request.nextUrl.pathname;

  if (sessionCookie && currentPath === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && currentPath === "/dashboard") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard"]
};
