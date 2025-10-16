"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react"
import { mockMenuItems } from "@/lib/mock-data"
import type { MenuItem } from "@/lib/types"

export default function MenusPage() {
  const [menus, setMenus] = useState<MenuItem[]>(mockMenuItems)
  const [isEditing, setIsEditing] = useState(false)
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)

  const handleAdd = () => {
    const newMenu: MenuItem = {
      id: Date.now().toString(),
      label: "新菜单",
      icon: "Circle",
      href: "/new-page",
      order: menus.length + 1,
      isActive: true,
      createdAt: new Date(),
    }
    setMenus([...menus, newMenu])
    setEditingMenu(newMenu)
    setIsEditing(true)
  }

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    setMenus(menus.filter((m) => m.id !== id))
  }

  const handleSave = () => {
    if (editingMenu) {
      setMenus(menus.map((m) => (m.id === editingMenu.id ? editingMenu : m)))
    }
    setIsEditing(false)
    setEditingMenu(null)
  }

  const handleToggle = (id: string) => {
    setMenus(menus.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m)))
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">菜单管理</h1>
          <p className="text-muted-foreground">管理顶部导航栏的菜单项</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          添加菜单
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>菜单列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {menus
                .sort((a, b) => a.order - b.order)
                .map((menu) => (
                  <div
                    key={menu.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{menu.label}</div>
                      <div className="text-sm text-muted-foreground">{menu.href}</div>
                    </div>
                    <Switch checked={menu.isActive} onCheckedChange={() => handleToggle(menu.id)} />
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(menu)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(menu.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {isEditing && editingMenu && (
          <Card>
            <CardHeader>
              <CardTitle>编辑菜单</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label">菜单名称</Label>
                <Input
                  id="label"
                  value={editingMenu.label}
                  onChange={(e) => setEditingMenu({ ...editingMenu, label: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="href">链接地址</Label>
                <Input
                  id="href"
                  value={editingMenu.href || ""}
                  onChange={(e) => setEditingMenu({ ...editingMenu, href: e.target.value })}
                  placeholder="/page-url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">图标名称</Label>
                <Input
                  id="icon"
                  value={editingMenu.icon || ""}
                  onChange={(e) => setEditingMenu({ ...editingMenu, icon: e.target.value })}
                  placeholder="MessageSquare"
                />
                <p className="text-xs text-muted-foreground">使用 Lucide 图标名称</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">颜色（可选）</Label>
                <Input
                  id="color"
                  value={editingMenu.color || ""}
                  onChange={(e) => setEditingMenu({ ...editingMenu, color: e.target.value })}
                  placeholder="#4caf50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">排序</Label>
                <Input
                  id="order"
                  type="number"
                  value={editingMenu.order}
                  onChange={(e) => setEditingMenu({ ...editingMenu, order: Number.parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="active"
                  checked={editingMenu.isActive}
                  onCheckedChange={(checked) => setEditingMenu({ ...editingMenu, isActive: checked })}
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
                    setEditingMenu(null)
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
