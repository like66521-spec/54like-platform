"use client"

import { User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"

export function ContentHeader() {
  const handleAction = (action: string) => {
    toast.info(`${action}功能开发中，敬请期待！`)
  }

  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] mb-4 overflow-hidden">
      {/* 用户状态区 */}
      <Link href="/admin/login">
        <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] border-b border-[#e0e0e0] hover:from-[#e9ecef] hover:to-[#dee2e6] transition-all cursor-pointer group">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-[#4caf50] to-[#45a049] shadow-sm group-hover:shadow-md transition-shadow">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-base font-medium text-[#333333] mb-1">欢迎来到 54LIKE</p>
            <p className="text-sm text-[#666666]">登录后享受更多功能</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#4caf50] font-medium group-hover:text-[#45a049] transition-colors">立即登录</span>
            <svg className="h-4 w-4 text-[#4caf50] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>

      {/* 快捷操作标签 */}
      <div className="grid grid-cols-2 gap-0 border-b border-[#e0e0e0]">
        <Button
          variant="ghost"
          className="h-12 rounded-none border-r border-[#e0e0e0] hover:bg-[#f5f5f5] flex items-center justify-center gap-2 text-sm"
          onClick={() => handleAction("发帖子")}
        >
          <div className="flex items-center justify-center h-6 w-6 rounded bg-[#9c27b0] text-white">
            <FileText className="h-3.5 w-3.5" />
          </div>
          <span className="text-[#333333]">发帖子</span>
        </Button>

        <Button
          variant="ghost"
          className="h-12 rounded-none hover:bg-[#f5f5f5] flex items-center justify-center gap-2 text-sm"
          onClick={() => handleAction("发文章")}
        >
          <div className="flex items-center justify-center h-6 w-6 rounded bg-[#2196f3] text-white">
            <FileText className="h-3.5 w-3.5" />
          </div>
          <span className="text-[#333333]">发文章</span>
        </Button>
      </div>
    </div>
  )
}
