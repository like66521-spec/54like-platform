"use client"

import { useState, useEffect } from "react"
import { Tag, Plus, Edit2, Trash2, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface TagData {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  isActive: boolean
  createdAt: string
  articleCount: number
}

export default function TagManagementPage() {
  const [tags, setTags] = useState<TagData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<TagData | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3b82f6"
  })

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/tags")
      if (response.ok) {
        const data = await response.json()
        setTags(data.tags || [])
      } else {
        toast.error("加载标签失败")
      }
    } catch (error) {
      console.error("加载标签错误:", error)
      toast.error("加载标签失败")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTag = async () => {
    try {
      const response = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (data.success) {
        toast.success("标签创建成功")
        setIsDialogOpen(false)
        setFormData({ name: "", description: "", color: "#3b82f6" })
        loadTags()
      } else {
        toast.error(data.error || "创建失败")
      }
    } catch (error) {
      console.error("创建标签错误:", error)
      toast.error("创建标签失败")
    }
  }

  const handleUpdateTag = async () => {
    if (!editingTag) return

    try {
      const response = await fetch(`/api/admin/tags/${editingTag.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (data.success) {
        toast.success("标签更新成功")
        setIsDialogOpen(false)
        setEditingTag(null)
        setFormData({ name: "", description: "", color: "#3b82f6" })
        loadTags()
      } else {
        toast.error(data.error || "更新失败")
      }
    } catch (error) {
      console.error("更新标签错误:", error)
      toast.error("更新标签失败")
    }
  }

  const handleDeleteTag = async (tagId: string) => {
    try {
      const response = await fetch(`/api/admin/tags/${tagId}`, {
        method: "DELETE"
      })

      const data = await response.json()
      if (data.success) {
        toast.success("标签删除成功")
        loadTags()
      } else {
        toast.error(data.error || "删除失败")
      }
    } catch (error) {
      console.error("删除标签错误:", error)
      toast.error("删除标签失败")
    }
  }

  const handleEditTag = (tag: TagData) => {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      description: tag.description || "",
      color: tag.color || "#3b82f6"
    })
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingTag(null)
    setFormData({ name: "", description: "", color: "#3b82f6" })
  }

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">标签管理</h1>
            <p className="text-muted-foreground">管理文章标签，支持自动生成和手动创建</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadTags} disabled={loading} variant="outline" className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  新建标签
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingTag ? "编辑标签" : "新建标签"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingTag ? "修改标签信息" : "创建一个新的标签"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">标签名称</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="输入标签名称"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">标签描述</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="输入标签描述（可选）"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">标签颜色</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="color"
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        className="w-16 h-10"
                      />
                      <Input
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        placeholder="#3b82f6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handleDialogClose}>
                    取消
                  </Button>
                  <Button onClick={editingTag ? handleUpdateTag : handleCreateTag}>
                    {editingTag ? "更新" : "创建"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索标签名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9"
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">标签</TableHead>
              <TableHead>描述</TableHead>
              <TableHead className="w-[100px]">文章数量</TableHead>
              <TableHead className="w-[120px]">创建时间</TableHead>
              <TableHead className="w-[100px]">状态</TableHead>
              <TableHead className="w-[120px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                  加载中...
                </TableCell>
              </TableRow>
            ) : filteredTags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "未找到匹配的标签" : "暂无标签"}
                </TableCell>
              </TableRow>
            ) : (
              filteredTags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      <Badge variant="secondary" className="gap-1">
                        <Tag className="h-3 w-3" />
                        {tag.name}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {tag.description || "无描述"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tag.articleCount}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(tag.createdAt).toLocaleDateString("zh-CN")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tag.isActive ? "default" : "secondary"}>
                      {tag.isActive ? "启用" : "禁用"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTag(tag)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除标签？</AlertDialogTitle>
                            <AlertDialogDescription>
                              此操作将永久删除标签 "{tag.name}"。此操作不可撤销。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTag(tag.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              确认删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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



