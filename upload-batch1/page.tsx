"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { ContentHeader } from "@/components/content-header"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { mockArticles } from "@/lib/mock-data"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [loginMessage, setLoginMessage] = useState("")
  const searchParams = useSearchParams()
  const articlesPerPage = 8
  
  const totalPages = Math.ceil(mockArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentArticles = mockArticles.slice(startIndex, endIndex)

  // 检查登录状态
  useEffect(() => {
    const login = searchParams.get("login")
    const user = searchParams.get("user")
    const provider = searchParams.get("provider")
    
    if (login === "success" && user) {
      setLoginMessage(`欢迎回来，${user}！${provider === "wechat" ? "微信" : "QQ"}登录成功！`)
      // 3秒后清除消息
      setTimeout(() => setLoginMessage(""), 3000)
    } else if (login === "error") {
      setLoginMessage("登录失败，请重试")
      setTimeout(() => setLoginMessage(""), 3000)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      {/* 登录消息提示 */}
      {loginMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {loginMessage}
        </div>
      )}

      <div className="flex max-w-[1204px] mx-auto pt-3">
        <SidebarLeft />
        
        <div className="w-0.5"></div>
        
        <main className="w-[700px] flex-shrink-0 ml-[18px]">
          <ContentHeader />

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
        </main>

        <div className="w-0.5"></div>

        <div className="w-[300px] flex-shrink-0 hidden xl:block">
          <SidebarRight />
        </div>
      </div>
    </div>
  )
}
