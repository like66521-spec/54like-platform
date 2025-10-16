"use client"

import Link from "next/link"
import { Search, Heart, MessageCircle, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export function Header() {
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    // 获取分类数据
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data.categories || [])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e0e0e0] shadow-sm">
      <div className="flex h-14 items-center px-4 max-w-[1224px] mx-auto">
        {/* Logo区域 - 与左栏宽度一致 (200px) */}
        <div className="w-[200px] flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4caf50] to-[#45a049] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
            </div>
            <span className="font-bold text-xl text-[#333333]">54like</span>
          </Link>
        </div>

        {/* 搜索栏 - 与中间栏开始位置对齐 (200px + 12px gap) */}
        <div className="w-[300px] ml-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999999]" />
            <Input
              type="search"
              placeholder="搜索 54like"
              className="w-full h-9 pl-10 pr-4 bg-[#f5f5f5] border-none text-sm rounded-full focus-visible:ring-1 focus-visible:ring-[#4caf50]"
            />
          </div>
        </div>

        {/* 菜单栏 - 与搜索栏有间距 */}
        <div className="flex items-center gap-3 ml-6 flex-shrink-0">
          {/* 分类菜单 */}
          {categories.length > 0 ? (
            categories.slice(0, 4).map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-4 text-[#555555] hover:text-[#4caf50] hover:bg-[#f0f9f0] text-base rounded-full border border-transparent hover:border-[#4caf50]/20 transition-all"
                >
                  <span className="font-medium">{category.name}</span>
                </Button>
              </Link>
            ))
          ) : (
            // 默认分类（当API数据不可用时）
            <>
              <Link href="/category/tech">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-4 text-[#555555] hover:text-[#4caf50] hover:bg-[#f0f9f0] text-base rounded-full border border-transparent hover:border-[#4caf50]/20 transition-all"
                >
                  <span className="font-medium">技术</span>
                </Button>
              </Link>
              <Link href="/category/business">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-4 text-[#555555] hover:text-[#4caf50] hover:bg-[#f0f9f0] text-base rounded-full border border-transparent hover:border-[#4caf50]/20 transition-all"
                >
                  <span className="font-medium">商业</span>
                </Button>
              </Link>
              <Link href="/category/life">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-4 text-[#555555] hover:text-[#4caf50] hover:bg-[#f0f9f0] text-base rounded-full border border-transparent hover:border-[#4caf50]/20 transition-all"
                >
                  <span className="font-medium">生活</span>
                </Button>
              </Link>
              <Link href="/category/marketing">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-4 text-[#555555] hover:text-[#4caf50] hover:bg-[#f0f9f0] text-base rounded-full border border-transparent hover:border-[#4caf50]/20 transition-all"
                >
                  <span className="font-medium">营销</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* AI助手和交流群按钮 - 显示在右栏宽度范围内 */}
        <div className="flex items-center gap-2 ml-auto">
          <Button
            size="sm"
            className="h-8 px-3 bg-[#ff1744] hover:bg-[#e91e63] text-white text-sm gap-1.5 rounded-full"
            disabled
            title="敬请期待"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden md:inline">AI助手</span>
          </Button>

          <Button
            size="sm"
            className="h-8 px-3 bg-[#00bcd4] hover:bg-[#00acc1] text-white text-sm gap-1.5 rounded-full"
            disabled
            title="敬请期待"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden md:inline">交流群</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
