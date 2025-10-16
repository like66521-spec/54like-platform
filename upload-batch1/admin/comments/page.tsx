"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Trash2, RefreshCw, Filter, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface Comment {
  id: string
  content: string
  likes: number
  createdAt: string
  updatedAt: string
  article: {
    id: string
    title: string
    slug: string
  }
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  parent?: {
    id: string
    content: string
    user: {
      name: string
    }
  }
  replies: Comment[]
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterArticle, setFilterArticle] = useState<string>("all")

  useEffect(() => {
    loadComments()
  }, [])

  const loadComments = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/comments")
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      } else {
        console.error("加载评论失败")
      }
    } catch (error) {
      console.error("加载评论错误:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/admin/comments?id=${commentId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId))
        setSelectedComments(selectedComments.filter(id => id !== commentId))
      } else {
        const error = await response.json()
        alert(error.error || "删除失败")
      }
    } catch (error) {
      console.error("删除评论错误:", error)
      alert("删除失败，请重试")
    }
  }

  const handleBatchDelete = async () => {
    if (selectedComments.length === 0) return

    try {
      const response = await fetch("/api/admin/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          commentIds: selectedComments,
          action: "delete"
        })
      })

      if (response.ok) {
        const data = await response.json()
        setComments(comments.filter(comment => !selectedComments.includes(comment.id)))
        setSelectedComments([])
        alert(data.message)
      } else {
        const error = await response.json()
        alert(error.error || "批量删除失败")
      }
    } catch (error) {
      console.error("批量删除错误:", error)
      alert("批量删除失败，请重试")
    }
  }

  const handleSelectComment = (commentId: string, checked: boolean) => {
    if (checked) {
      setSelectedComments([...selectedComments, commentId])
    } else {
      setSelectedComments(selectedComments.filter(id => id !== commentId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedComments(filteredComments.map(comment => comment.id))
    } else {
      setSelectedComments([])
    }
  }

  const filteredComments = comments.filter(comment => {
    const matchesSearch = searchTerm === "" || 
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const totalComments = filteredComments.length
  const totalLikes = filteredComments.reduce((sum, comment) => sum + comment.likes, 0)

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">评论管理</h1>
            <p className="text-muted-foreground">管理所有用户评论</p>
          </div>
          <Button onClick={loadComments} disabled={loading} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{totalComments}</div>
            <div className="text-sm text-muted-foreground">总评论数</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{totalLikes}</div>
            <div className="text-sm text-muted-foreground">总点赞数</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-orange-600">{selectedComments.length}</div>
            <div className="text-sm text-muted-foreground">已选择</div>
          </div>
        </div>

        {/* 筛选和搜索 */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">筛选:</span>
          </div>
          
          <Input
            placeholder="搜索评论内容、文章标题或用户名..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80"
          />

          {selectedComments.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  批量删除 ({selectedComments.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认批量删除</AlertDialogTitle>
                  <AlertDialogDescription>
                    您确定要删除选中的 {selectedComments.length} 条评论吗？此操作不可撤销。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBatchDelete}>
                    确认删除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>评论内容</TableHead>
              <TableHead>文章</TableHead>
              <TableHead>用户</TableHead>
              <TableHead>点赞数</TableHead>
              <TableHead>回复数</TableHead>
              <TableHead>时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                  加载中...
                </TableCell>
              </TableRow>
            ) : filteredComments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  暂无评论
                </TableCell>
              </TableRow>
            ) : (
              filteredComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedComments.includes(comment.id)}
                      onCheckedChange={(checked) => handleSelectComment(comment.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="space-y-2">
                      <div className="line-clamp-3">{comment.content}</div>
                      {comment.parent && (
                        <div className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                          回复 @{comment.parent.user.name}: {comment.parent.content}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium line-clamp-2">{comment.article.title}</div>
                      <div className="text-sm text-muted-foreground">/{comment.article.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{comment.user.name}</div>
                      <div className="text-sm text-muted-foreground">{comment.user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {comment.likes}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {comment.replies.length}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(comment.createdAt).toLocaleDateString("zh-CN")}</div>
                      <div className="text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleTimeString("zh-CN")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="gap-1">
                          <Trash2 className="h-3 w-3" />
                          删除
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除评论</AlertDialogTitle>
                          <AlertDialogDescription>
                            您确定要删除这条评论吗？此操作不可撤销。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteComment(comment.id)}>
                            确认删除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}




