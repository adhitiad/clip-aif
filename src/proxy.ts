import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isOwnerRoute =
    pathname.startsWith("/dashboard/owner") ||
    pathname.startsWith("/dashboard/admin");

  // 1. Redirect to login if accessing dashboard without token
  if (isDashboardRoute && !token) {
    const loginUrl = new URL("/signin", request.url);
    // Optional: add callback
    // loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Role-based protection for Owner routes
  if (isOwnerRoute && userRole !== "owner") {
    // If not owner, redirect to regular dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Redirect logged-in users away from auth pages
  if (token && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
