import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isLoggedIn(req: NextRequest): boolean {
  const names = ["refreshToken", "refresh_token", "rt"];
  return names.some((n) => Boolean(req.cookies.get(n)?.value));
}

function isAuthRoute(path: string): boolean {
  return path.startsWith("/auth") || path === "/confirm-google-auth";
}

function isPrivateRoute(path: string): boolean {
  return (
    path === "/" ||
    path.startsWith("/journey") ||
    path.startsWith("/diary") ||
    path.startsWith("/profile")
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = isLoggedIn(req);

  if (isPrivateRoute(pathname) && !loggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/register";
    return NextResponse.redirect(url);
  }

  if (isAuthRoute(pathname) && loggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/journey/:path*",
    "/diary/:path*",
    "/profile/:path*",
    "/auth/:path*",
    "/confirm-google-auth",
  ],
};


