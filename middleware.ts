import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/admin"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      // Clear invalid token
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.set("auth-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      })
      return response
    }
  }

  // API routes authentication
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/")) {
    const publicApiRoutes = ["/api/analytics"]
    const isPublicApiRoute = publicApiRoutes.some((route) => pathname.startsWith(route))

    if (!isPublicApiRoute) {
      const token = request.cookies.get("auth-token")?.value

      if (!token) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 })
      }

      const decoded = verifyToken(token)
      if (!decoded) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*", "/api/:path*"],
}
