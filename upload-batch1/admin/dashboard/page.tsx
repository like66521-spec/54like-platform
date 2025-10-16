import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, DollarSign, Eye } from "lucide-react"
import prisma from "@/lib/prisma"

export default async function AdminDashboardPage() {
  // 从数据库获取真实统计数据
  const [totalUsers, totalArticles, totalCategories, recentArticles] = await Promise.all([
    prisma.user.count(),
    prisma.article.count(),
    prisma.category.count(),
    prisma.article.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        author: {
          select: { name: true }
        }
      }
    })
  ])

  // 计算总浏览量(如果有views字段的话)
  const totalViews = 381468 // 模拟数据,后续可以从数据库聚合
  const totalRevenue = 25190 // 模拟数据,后续可以从支付记录计算

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">仪表盘</h1>
        <p className="text-muted-foreground">欢迎回来，这是您的内容管理概览</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">总文章数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground mt-1">共有 {totalCategories} 个分类</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">总阅读量</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">平均每篇 {totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0} 次</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">本月收入</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">注册用户</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">平台注册用户</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <Card>
        <CardHeader>
          <CardTitle>最近文章</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-1">{article.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{article.category?.name || '未分类'}</span>
                    <span>·</span>
                    <span>{article.author?.name || '匿名'}</span>
                    <span>·</span>
                    <span>{new Date(article.createdAt).toLocaleDateString("zh-CN")}</span>
                  </div>
                </div>
                <div className="ml-4 text-sm font-medium text-green-600">{article.status === 'PUBLISHED' ? '已发布' : '草稿'}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
