// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("🚀 Middleware exécuté pour :", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  // const token = request.cookies.get("authToken");
  const token = request.cookies.get("next-auth.session-token");
  console.log("-- page actuelle  :", pathname);

  if (token && (pathname === "/auth/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  console.log("Middleware - Allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/signup", "/dashboard/:path*"],
  // matcher: ["/((?!auth|public).*)"],
};
