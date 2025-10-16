import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LinkDialog } from "./link-dialog"
import { DeleteLinkButton } from "./delete-button"

// 模拟数据 - 实际应该从数据库读取
const mockLinks = [
  { id: "1", name: "赚客导航", url: "https://example.com", description: "赚客资源导航", order: 1, isActive: true },
  { id: "2", name: "崔晃晃博客", url: "https://cuihuanghuang.com", description: "个人博客", order: 2, isActive: true },
  { id: "3", name: "出海工具箱", url: "https://example.com", description: "出海必备工具", order: 3, isActive: true },
  { id: "4", name: "独立开发者", url: "https://example.com", description: "独立开发者社区", order: 4, isActive: false },
]

export default function LinksPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">友情链接</h1>
          <p className="text-muted-foreground">管理网站的友情链接</p>
        </div>
        <LinkDialog>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            添加链接
          </Button>
        </LinkDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>链接列表</CardTitle>
          <CardDescription>显示在网站右侧边栏的友情链接</CardDescription>
        </CardHeader>
        <CardContent>
          {mockLinks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              暂无友情链接,点击右上角添加第一个链接
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>排序</TableHead>
                    <TableHead>网站名称</TableHead>
                    <TableHead>链接地址</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell className="font-medium">{link.order}</TableCell>
                      <TableCell className="font-medium">{link.name}</TableCell>
                      <TableCell>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          {link.url}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{link.description || '-'}</TableCell>
                      <TableCell>
                        {link.isActive ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            启用
                          </Badge>
                        ) : (
                          <Badge variant="outline">禁用</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <LinkDialog link={link}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </LinkDialog>
                          <DeleteLinkButton linkId={link.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• 友情链接将显示在网站右侧边栏的"友情链接"区域</p>
          <p>• 可以通过拖拽调整链接的显示顺序(暂未实现)</p>
          <p>• 禁用的链接不会在前台显示</p>
          <p>• 建议链接数量控制在6-10个以内</p>
        </CardContent>
      </Card>
    </div>
  )
}





