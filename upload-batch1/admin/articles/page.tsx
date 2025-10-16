import Link from "next/link"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import prisma from "@/lib/prisma"
import { DeleteArticleButton } from "./delete-button"

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      author: {
        select: { name: true }
      }
    }
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">文章管理</h1>
          <p className="text-muted-foreground">管理您的所有文章内容</p>
        </div>
        <Link href="/admin/articles/edit">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            新建文章
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>分类</TableHead>
              <TableHead>作者</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>发布日期</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  暂无文章,点击右上角创建第一篇文章
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium max-w-md">
                    <div className="line-clamp-2">{article.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{article.category?.name || '未分类'}</Badge>
                  </TableCell>
                  <TableCell>{article.author?.name || '匿名'}</TableCell>
                  <TableCell>
                    {article.status === 'PUBLISHED' ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        已发布
                      </Badge>
                    ) : (
                      <Badge variant="outline">草稿</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(article.createdAt).toLocaleDateString("zh-CN")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/article/${article.slug}`} target="_blank">
                        <Button variant="ghost" size="icon" title="预览文章">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/articles/edit?id=${article.id}`}>
                        <Button variant="ghost" size="icon" title="编辑文章">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteArticleButton articleId={article.id} />
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
