"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function UserSearchClient() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="mb-6">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="搜索用户名或邮箱..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}





