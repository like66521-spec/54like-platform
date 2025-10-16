"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  DollarSign,
  Settings,
  Menu,
  Navigation,
  Blocks,
  LogOut,
  Database,
  Link2,
  MessageCircle,
  CreditCard,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logoutAction } from "./actions"

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutAction()
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const navigation = [
    { name: "仪表盘", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "文章管理", href: "/admin/articles", icon: FileText },
    { name: "分类管理", href: "/admin/categories", icon: FolderOpen },
    { name: "标签管理", href: "/admin/tags", icon: Tag },
    { name: "菜单管理", href: "/admin/menus", icon: Navigation },
    { name: "友情链接", href: "/admin/links", icon: Link2 },
    { name: "小工具管理", href: "/admin/widgets", icon: Blocks },
    { name: "用户管理", href: "/admin/users", icon: Users },
    { name: "评论管理", href: "/admin/comments", icon: MessageCircle },
    { name: "支付记录", href: "/admin/payments", icon: DollarSign },
    { name: "支付设置", href: "/admin/payment-settings", icon: CreditCard },
    { name: "网站备份", href: "/admin/backup", icon: Database },
    { name: "系统设置", href: "/admin/settings", icon: Settings },
  ]

  const Sidebar = () => (
    <>
      <div className="p-6 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-lg">
            U
          </div>
          <span className="font-bold text-xl">管理后台</span>
        </Link>
      </div>

      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t space-y-2">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors w-full"
        >
          返回前台
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </Button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r bg-card flex-shrink-0 flex-col">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-lg">
            U
          </div>
          <span className="font-bold text-xl">管理后台</span>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <Sidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:mt-0 mt-16">{children}</main>
    </div>
  )
}

