import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // 添加安全头
  response.headers.set("X-Frame-Options", "DENY") // 防止点击劫持
  response.headers.set("X-Content-Type-Options", "nosniff") // 防止MIME类型嗅探
  response.headers.set("X-XSS-Protection", "1; mode=block") // XSS保护
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin") // 引用策略
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()") // 权限策略
  
  // 内容安全策略 (CSP)
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none';"
  )

  // 只对 /admin 路由进行认证检查
  if (pathname.startsWith("/admin")) {
    // 登录相关页面直接放行
    if (pathname === "/admin/login" || pathname === "/admin/simple-login" || pathname === "/admin/test") {
      return response
    }

    // 其他 /admin 路由检查认证
    const session = await auth()
    
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // 检查管理员权限
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
}


