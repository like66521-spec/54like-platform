import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { CategoryDialog } from "./category-dialog"
import { DeleteCategoryButton } from "./delete-button"

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { articles: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">分类管理</h1>
          <p className="text-muted-foreground">管理文章分类</p>
        </div>
        <CategoryDialog>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            新建分类
          </Button>
        </CategoryDialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-8 text-center text-muted-foreground">
              暂无分类,点击右上角创建第一个分类
            </CardContent>
          </Card>
        ) : (
          categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category.name}</span>
                  <div className="flex items-center gap-1">
                    <CategoryDialog category={category}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CategoryDialog>
                    <DeleteCategoryButton 
                      categoryId={category.id} 
                      hasArticles={category._count.articles > 0}
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description || '暂无描述'}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">文章数量</span>
                  <span className="font-medium">{category._count.articles} 篇</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">别名</span>
                  <span className="font-mono text-xs">{category.slug}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
