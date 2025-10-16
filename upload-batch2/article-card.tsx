"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Eye, MessageCircle, ThumbsUp, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Article } from "@/lib/types"
import { useState } from "react"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [likes, setLikes] = useState(article.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [views, setViews] = useState(article.views)

  // 解析 JSON 格式的图片数组
  const imageUrls = article.images ? JSON.parse(article.images) as string[] : []
  const hasImages = imageUrls.length > 0
  const isSingleImage = hasImages && imageUrls.length === 1
  const isMultiImage = hasImages && imageUrls.length > 1

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 10000) return `${(num / 10000).toFixed(1)}w`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num
  }

  return (
    <article className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* 标题 */}
        <Link href={`/article/${article.slug}`} className="block mb-2">
          <h2 className="text-[15px] font-bold text-[#333333] hover:text-[#4caf50] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h2>
        </Link>

        {/* 摘要 - 固定200字符左右 */}
        <p className="text-[13px] text-[#666666] leading-relaxed mb-3 line-clamp-3">
          {article.excerpt.slice(0, 200)}
          {article.excerpt.length > 200 ? "..." : ""}
        </p>

        {isSingleImage && (
          <div className="mb-3">
            <div className="relative w-full h-[280px] rounded overflow-hidden bg-[#f5f5f5]">
              <Image src={imageUrls[0] || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
          </div>
        )}

        {isMultiImage && (
          <div className="flex gap-2 mb-3">
            {imageUrls.slice(0, 3).map((image, index) => (
              <div key={index} className="relative flex-1 h-[160px] rounded overflow-hidden bg-[#f5f5f5]">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${article.title} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* 底部信息栏 */}
        <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0]">
          {/* 左侧：作者信息 */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={article.author?.avatar || "/placeholder.svg"} alt={article.author?.name} />
              <AvatarFallback className="text-xs bg-[#e0e0e0]">{article.author?.name?.[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-[#999999]">{article.author?.name}</span>
          </div>

          {/* 右侧：互动数据 */}
          <div className="flex items-center gap-4 text-xs text-[#999999]">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? "text-[#4caf50]" : "hover:text-[#4caf50]"
              }`}
            >
              <ThumbsUp className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
              {likes}
            </button>
            <Link
              href={`/article/${article.slug}#comments`}
              className="flex items-center gap-1 hover:text-[#4caf50] transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {article.comments || 0}
            </Link>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {formatNumber(views)}
            </span>
            <span className="text-[#999999]">
              {new Date(article.publishedAt).toLocaleDateString("zh-CN", {
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* 标签区域 */}
        {article.category && (
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#f0f0f0]">
            <span className="inline-flex items-center gap-1 text-xs text-[#4caf50] hover:underline cursor-pointer">
              <span>赞同讨论</span>
            </span>
          </div>
        )}
      </div>

      {/* 展开按钮 */}
      {article.isPinned && (
        <div className="flex items-center justify-center py-2 bg-[#fafafa] border-t border-[#e0e0e0] cursor-pointer hover:bg-[#f5f5f5] transition-colors">
          <ChevronDown className="h-4 w-4 text-[#999999]" />
        </div>
      )}
    </article>
  )
}
