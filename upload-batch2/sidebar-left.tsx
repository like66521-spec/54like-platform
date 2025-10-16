"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Sparkles, TrendingUp, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarLeft() {
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: "首页", href: "/", enabled: true },
    { icon: Sparkles, label: "最新", href: "/latest", enabled: true },
    { icon: TrendingUp, label: "热门", href: "/hot", enabled: true },
    { icon: Heart, label: "推荐", href: "/recommend", enabled: true },
  ]

  return (
    <aside className="w-[200px] flex-shrink-0 bg-white border-r border-[#e0e0e0] hidden lg:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide">
      <nav className="py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href && item.enabled
            return (
              <li key={item.label}>
                {item.enabled ? (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-4 px-6 py-4 text-base transition-all",
                            isActive
                              ? "bg-[#e8f5e9] text-[#4caf50] font-semibold"
                              : "text-[#555555] hover:bg-[#f5f5f5] hover:text-[#4caf50]",
                          )}
                        >
                          <item.icon className="h-6 w-6 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                ) : (
                  <div
                    className="flex items-center gap-4 px-6 py-4 text-base text-[#999999] cursor-not-allowed"
                    title="敬请期待"
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
