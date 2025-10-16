"use client"

import { useState } from "react"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  images: string
  categoryId: string
  category: {
    id: string
    name: string
    slug: string
  }
  authorId: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  isPaid: boolean
  isPinned: boolean
  views: number
  likes: number
  comments: number
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

interface HomePageClientProps {
  articles: Article[]
}

export function HomePageClient({ articles }: HomePageClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 8
  
  const totalPages = Math.ceil(articles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentArticles = articles.slice(startIndex, endIndex)

  return (
    <>
      <div className="space-y-3">
        {currentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* 分页按钮 */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg border border-[#e0e0e0] p-6 mt-6">
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 hover:bg-[#f5f5f5]"
            >
              上一页
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 p-0 ${
                    currentPage === page 
                      ? "bg-[#4caf50] text-white hover:bg-[#45a049]" 
                      : "hover:bg-[#f5f5f5]"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 hover:bg-[#f5f5f5]"
            >
              下一页
            </Button>
          </div>
        </div>
      )}

      {/* 底部装饰区域 */}
      <div className="bg-white rounded-lg border border-[#e0e0e0] p-6 mt-6 text-center">
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-base font-semibold text-[#333333] mb-2">感谢您的阅读</h3>
        <p className="text-[#666666] text-sm mb-3">
          更多精彩内容，敬请期待...
        </p>
        <div className="flex justify-center gap-4 text-xs text-[#999999]">
          <span>© 2024 54LIKE</span>
          <span>•</span>
          <span>专注赚美金</span>
        </div>
      </div>
    </>
  )
}
