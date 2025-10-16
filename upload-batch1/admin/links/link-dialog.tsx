"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface LinkDialogProps {
  children: React.ReactNode
  link?: {
    id: string
    name: string
    url: string
    description: string | null
    order: number
    isActive: boolean
  }
}

export function LinkDialog({ children, link }: LinkDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(link?.name || "")
  const [url, setUrl] = useState(link?.url || "")
  const [description, setDescription] = useState(link?.description || "")
  const [order, setOrder] = useState(link?.order?.toString() || "1")
  const [isActive, setIsActive] = useState(link?.isActive ?? true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: 调用API保存链接
      console.log({
        name,
        url,
        description,
        order: parseInt(order),
        isActive
      })
      
      setTimeout(() => {
        setOpen(false)
        router.refresh()
        if (!link) {
          setName("")
          setUrl("")
          setDescription("")
          setOrder("1")
          setIsActive(true)
        }
        alert(link ? '链接已更新' : '链接已添加')
      }, 500)
    } catch (error) {
      alert('操作失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{link ? '编辑链接' : '添加链接'}</DialogTitle>
            <DialogDescription>
              {link ? '修改友情链接信息' : '添加一个新的友情链接'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">网站名称 *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如: 赚客导航"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="url">链接地址 *</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="简短描述这个网站..."
                rows={2}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="order">排序</Label>
              <Input
                id="order"
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                min="1"
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                数字越小越靠前
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="active">启用链接</Label>
                <p className="text-xs text-muted-foreground">
                  禁用后不会在前台显示
                </p>
              </div>
              <Switch
                id="active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '保存中...' : '保存'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}





