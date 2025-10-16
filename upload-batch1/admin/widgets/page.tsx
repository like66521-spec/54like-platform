"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react"
import { mockSidebarWidgets } from "@/lib/mock-data"
import type { SidebarWidget } from "@/lib/types"

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<SidebarWidget[]>(mockSidebarWidgets)
  const [isEditing, setIsEditing] = useState(false)
  const [editingWidget, setEditingWidget] = useState<SidebarWidget | null>(null)

  const handleAdd = () => {
    const newWidget: SidebarWidget = {
      id: Date.now().toString(),
      type: "html",
      title: "新小工具",
      content: "",
      order: widgets.length + 1,
      isActive: true,
      createdAt: new Date(),
    }
    setWidgets([...widgets, newWidget])
    setEditingWidget(newWidget)
    setIsEditing(true)
  }

  const handleEdit = (widget: SidebarWidget) => {
    setEditingWidget(widget)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id))
  }

  const handleSave = () => {
    if (editingWidget) {
      setWidgets(widgets.map((w) => (w.id === editingWidget.id ? editingWidget : w)))
    }
    setIsEditing(false)
    setEditingWidget(null)
  }

  const handleToggle = (id: string) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w)))
  }

  const getWidgetTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      html: "HTML卡片",
      image: "图片卡片",
      "hot-articles": "热门文章",
      "latest-articles": "最新文章",
      links: "友情链接",
      "user-rank": "用户排行",
    }
    return labels[type] || type
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">小工具管理</h1>
          <p className="text-muted-foreground">管理右侧边栏的小工具卡片</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          添加小工具
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>小工具列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {widgets
                .sort((a, b) => a.order - b.order)
                .map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{widget.title}</div>
                      <div className="text-sm text-muted-foreground">{getWidgetTypeLabel(widget.type)}</div>
                    </div>
                    <Switch checked={widget.isActive} onCheckedChange={() => handleToggle(widget.id)} />
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(widget)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(widget.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {isEditing && editingWidget && (
          <Card>
            <CardHeader>
              <CardTitle>编辑小工具</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">标题</Label>
                <Input
                  id="title"
                  value={editingWidget.title}
                  onChange={(e) => setEditingWidget({ ...editingWidget, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">类型</Label>
                <Select
                  value={editingWidget.type}
                  onValueChange={(value) =>
                    setEditingWidget({ ...editingWidget, type: value as SidebarWidget["type"] })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">HTML卡片</SelectItem>
                    <SelectItem value="image">图片卡片</SelectItem>
                    <SelectItem value="hot-articles">热门文章</SelectItem>
                    <SelectItem value="latest-articles">最新文章</SelectItem>
                    <SelectItem value="links">友情链接</SelectItem>
                    <SelectItem value="user-rank">用户排行</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editingWidget.type === "html" && (
                <div className="space-y-2">
                  <Label htmlFor="content">HTML内容</Label>
                  <Textarea
                    id="content"
                    value={editingWidget.content || ""}
                    onChange={(e) => setEditingWidget({ ...editingWidget, content: e.target.value })}
                    rows={6}
                    placeholder="<div>自定义HTML内容</div>"
                  />
                </div>
              )}

              {editingWidget.type === "image" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">图片URL</Label>
                    <Input
                      id="imageUrl"
                      value={editingWidget.imageUrl || ""}
                      onChange={(e) => setEditingWidget({ ...editingWidget, imageUrl: e.target.value })}
                      placeholder="/image.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkUrl">链接URL（可选）</Label>
                    <Input
                      id="linkUrl"
                      value={editingWidget.linkUrl || ""}
                      onChange={(e) => setEditingWidget({ ...editingWidget, linkUrl: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                </>
              )}

              {editingWidget.type === "links" && (
                <div className="space-y-2">
                  <Label>友情链接</Label>
                  <p className="text-sm text-muted-foreground">在代码中配置链接列表</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="order">排序</Label>
                <Input
                  id="order"
                  type="number"
                  value={editingWidget.order}
                  onChange={(e) => setEditingWidget({ ...editingWidget, order: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="active"
                  checked={editingWidget.isActive}
                  onCheckedChange={(checked) => setEditingWidget({ ...editingWidget, isActive: checked })}
                />
                <Label htmlFor="active">启用</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  保存
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setEditingWidget(null)
                  }}
                  className="flex-1"
                >
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
