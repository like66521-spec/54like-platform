import type React from "react"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // 登录页面专用布局，不包含任何侧边栏或导航
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  )
}
