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

interface CategoryDialogProps {
  children: React.ReactNode
  category?: {
    id: string
    name: string
    slug: string
    description: string | null
  }
}

export function CategoryDialog({ children, category }: CategoryDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(category?.name || "")
  const [slug, setSlug] = useState(category?.slug || "")
  const [description, setDescription] = useState(category?.description || "")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = category 
        ? `/api/categories/${category.id}` 
        : '/api/categories'
      
      const response = await fetch(url, {
        method: category ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, description })
      })

      if (response.ok) {
        setOpen(false)
        router.refresh()
        // 重置表单
        if (!category) {
          setName("")
          setSlug("")
          setDescription("")
        }
      } else {
        alert('操作失败')
      }
    } catch (error) {
      alert('操作失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 自动生成slug
  const handleNameChange = (value: string) => {
    setName(value)
    if (!category) {
      // 只在新建时自动生成slug
      const autoSlug = value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-\u4e00-\u9fa5]+/g, '')
      setSlug(autoSlug)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{category ? '编辑分类' : '新建分类'}</DialogTitle>
            <DialogDescription>
              {category ? '修改分类信息' : '创建一个新的文章分类'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">分类名称</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="例如: 技术"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="slug">别名 (URL)</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="例如: tech"
                required
                className="mt-1.5 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                用于URL,只能包含字母、数字和连字符
              </p>
            </div>
            <div>
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="分类描述..."
                rows={3}
                className="mt-1.5"
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





