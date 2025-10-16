"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { mockArticles } from "@/lib/mock-data"

interface SidebarCard {
  id: string
  type: "html" | "image" | "hot-articles" | "latest-articles" | "user-ranking" | "links"
  title: string
  content?: any
  order: number
}

export function SidebarRight() {

  const sidebarCards: SidebarCard[] = [
    {
      id: "ad-banner",
      type: "html",
      title: "广告位",
      order: 1,
    },
    {
      id: "hot-articles",
      type: "hot-articles",
      title: "热门文章",
      order: 2,
    },
    {
      id: "latest-articles",
      type: "latest-articles",
      title: "最新文章",
      order: 3,
    },
    {
      id: "links",
      type: "links",
      title: "友情链接",
      order: 4,
    },
  ]

  // 热门文章 - 按浏览量排序，取前5篇
  const hotArticles = [...mockArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((article) => {
      const imageUrls = article.images ? JSON.parse(article.images) as string[] : []
      return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        image: imageUrls[0] || article.coverImage || "/placeholder.jpg",
        views: article.views,
      }
    })

  // 最新文章 - 按发布时间排序，取前5篇
  const latestArticles = [...mockArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)
    .map((article) => {
      const imageUrls = article.images ? JSON.parse(article.images) as string[] : []
      return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        image: imageUrls[0] || article.coverImage || "/placeholder.jpg",
        publishedAt: new Date(article.publishedAt).toLocaleDateString("zh-CN"),
      }
    })

  const friendLinks = [
    { id: 1, name: "赚客导航", url: "https://example.com" },
    { id: 2, name: "崔晃晃博客", url: "https://example.com" },
    { id: 3, name: "出海工具箱", url: "https://example.com" },
    { id: 4, name: "独立开发者", url: "https://example.com" },
    { id: 5, name: "AI 工具集", url: "https://example.com" },
    { id: 6, name: "跨境电商社区", url: "https://example.com" },
  ]

  return (
    <aside className="flex-shrink-0 hidden xl:block sticky top-16 self-start">
      <div className="space-y-4 p-4">
        {/* 广告位 */}
        <div className="bg-white rounded-lg p-8 text-center relative overflow-hidden shadow-md border border-[#e0e0e0]">
          {/* 背景装饰层 */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 opacity-60"></div>
          
          {/* 背景装饰圆圈 */}
          <div className="absolute top-2 left-4 w-16 h-16 bg-orange-300 rounded-full opacity-40"></div>
          <div className="absolute top-8 right-6 w-12 h-12 bg-orange-300 rounded-full opacity-35"></div>
          <div className="absolute top-16 left-8 w-8 h-8 bg-orange-300 rounded-full opacity-30"></div>
          <div className="absolute bottom-4 right-8 w-10 h-10 bg-orange-300 rounded-full opacity-25"></div>
          
          <div className="relative z-10">
            <div className="text-lg font-bold mb-8 text-orange-500" style={{ fontFamily: 'cursive' }}>
              随时随地 发现新鲜事
            </div>
            
            <Button className="bg-[#28a745] text-white hover:bg-[#218838] w-full rounded-lg font-semibold text-lg py-4 shadow-lg hover:shadow-xl transition-all mb-6">
              立即登录
            </Button>
            
            <div className="text-sm">
              <span className="text-gray-700">还没有账号？</span>
              <span className="font-medium ml-1 text-[#28a745] cursor-pointer hover:underline">立即注册！</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#e0e0e0] p-4">
          <h3 className="text-sm font-bold text-[#333333] mb-3">热门文章</h3>
          <div className="space-y-3">
            {hotArticles.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="flex gap-2 group cursor-pointer hover:bg-[#f9f9f9] p-2 -m-2 rounded transition-colors"
              >
                <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-[#f5f5f5]">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-[#333333] line-clamp-2 group-hover:text-[#4caf50] transition-colors leading-relaxed">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#999999] mt-1">{article.views.toLocaleString()} 浏览</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#e0e0e0] p-4">
          <h3 className="text-sm font-bold text-[#333333] mb-3">最新文章</h3>
          <div className="space-y-3">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="flex gap-2 group cursor-pointer hover:bg-[#f9f9f9] p-2 -m-2 rounded transition-colors"
              >
                <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-[#f5f5f5]">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-[#333333] line-clamp-2 group-hover:text-[#4caf50] transition-colors leading-relaxed">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#999999] mt-1">{article.publishedAt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#e0e0e0] p-4">
          <h3 className="text-sm font-bold text-[#333333] mb-3">友情链接</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {friendLinks.map((link) => (
              <span
                key={link.id}
                className="text-[#4caf50] cursor-pointer py-1 px-2 rounded hover:bg-[#f8f9fa] transition-colors"
                title="敬请期待"
              >
                {link.name}
              </span>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-[#f0f0f0]">
            <button className="text-xs text-[#999999] hover:text-[#4caf50] transition-colors px-2 py-1 rounded hover:bg-[#f8f9fa]">+ 申请友链</button>
          </div>
        </div>

        {/* 底部装饰区域 */}
        <div className="bg-white rounded-lg border border-[#e0e0e0] p-3 text-center">
          <div className="text-xl mb-2">💡</div>
          <p className="text-xs text-[#666666] mb-1">更多精彩内容</p>
          <p className="text-xs text-[#999999]">敬请期待...</p>
        </div>
        
        {/* 底部填充区域，确保所有内容都能显示 */}
        <div className="h-16 bg-transparent"></div>
      </div>
    </aside>
  )
}

