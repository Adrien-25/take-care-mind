// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("🚀 Middleware exécuté pour :", request.nextUrl.pathname);

  // const token = request.cookies.get("authToken");
  const token = request.cookies.get("next-auth.session-token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  console.log("Middleware - Allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
  // matcher: ["/((?!auth|public).*)"],
};
