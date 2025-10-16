import type React from "react"
import { auth } from "@/lib/auth"
import AdminLayoutClient from "./layout-client"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 检查是否已登录
  const session = await auth()
  
  // 如果已登录,使用完整的后台布局
  if (session) {
    return <AdminLayoutClient>{children}</AdminLayoutClient>
  }
  
  // 如果未登录(访问登录页),只返回children,不使用后台布局
  return <>{children}</>
}
