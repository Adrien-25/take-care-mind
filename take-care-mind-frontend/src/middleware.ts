// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // console.log("Middleware - Token:", token);
  // console.log("Middleware - Path:", request.nextUrl.pathname);

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    // console.log("Middleware - Redirecting to login");

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // console.log("Middleware - Allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
