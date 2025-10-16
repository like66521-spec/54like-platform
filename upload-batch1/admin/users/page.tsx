import { Plus, Edit, Trash2, Search, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import prisma from "@/lib/prisma"
import { UserSearchClient } from "./user-search-client"

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { articles: true }
      }
    }
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <Badge className="bg-red-500">超级管理员</Badge>
      case "ADMIN":
        return <Badge className="bg-orange-500">管理员</Badge>
      default:
        return <Badge variant="secondary">普通用户</Badge>
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">用户管理</h1>
          <p className="text-muted-foreground">管理系统中的所有用户</p>
        </div>
      </div>

      <UserSearchClient />

      <div className="border rounded-lg mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用户</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>等级</TableHead>
              <TableHead>硬币</TableHead>
              <TableHead>文章数</TableHead>
              <TableHead>注册时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  暂无用户数据
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || ""} />
                        <AvatarFallback>{user.name?.[0] || user.email[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name || '未设置'}</div>
                        <div className="text-sm text-muted-foreground">ID: {user.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Lv.{user.level}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-amber-600 font-semibold">{user.coins.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{user._count.articles} 篇</span>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString("zh-CN")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" title="编辑">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="管理权限">
                        <UserCog className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="删除"
                        disabled={user.role === "SUPER_ADMIN"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">共 {users.length} 个用户</div>
    </div>
  )
}
