import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // If user is authenticated, continue.
  // could also check for any property on the session object,
  // like role === "admin" or name === "John Doe", etc.
  if (pathname.includes("/api/auth") || pathname.includes("/register") || token)
    return NextResponse.next();

  if (!token && pathname !== "/login") return NextResponse.redirect("/login");
}
