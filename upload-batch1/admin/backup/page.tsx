import { Database, Download, Clock, HardDrive, FileArchive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import prisma from "@/lib/prisma"
import { BackupActions } from "./backup-actions"
import { AutoBackupSettings } from "./auto-backup-settings"
import fs from "fs"
import path from "path"

export default async function BackupPage() {
  // 获取备份目录中的所有备份文件
  const backupDir = path.join(process.cwd(), 'backups')
  let backups: Array<{
    name: string
    size: number
    date: Date
    type: string
  }> = []

  try {
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }
    
    const files = fs.readdirSync(backupDir)
    backups = files
      .filter(file => file.endsWith('.zip') || file.endsWith('.db'))
      .map(file => {
        const filePath = path.join(backupDir, file)
        const stats = fs.statSync(filePath)
        return {
          name: file,
          size: stats.size,
          date: stats.mtime,
          type: file.endsWith('.zip') ? '完整备份' : '数据库备份'
        }
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  } catch (error) {
    console.error('读取备份目录失败:', error)
  }

  // 获取数据库统计信息
  const [totalArticles, totalUsers, totalCategories] = await Promise.all([
    prisma.article.count(),
    prisma.user.count(),
    prisma.category.count(),
  ])

  // 计算数据库大小
  let dbSize = 0
  try {
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath)
      dbSize = stats.size
    }
  } catch (error) {
    console.error('获取数据库大小失败:', error)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">网站备份</h1>
        <p className="text-muted-foreground">管理网站数据备份和恢复</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">数据库大小</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(dbSize)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalArticles} 篇文章 · {totalUsers} 个用户
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">备份数量</CardTitle>
            <FileArchive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backups.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {backups.filter(b => b.type === '完整备份').length} 个完整备份
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">备份空间</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBytes(backups.reduce((sum, b) => sum + b.size, 0))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">总占用空间</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">最近备份</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {backups.length > 0 ? new Date(backups[0].date).toLocaleDateString('zh-CN') : '无'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {backups.length > 0 ? new Date(backups[0].date).toLocaleTimeString('zh-CN') : '还未创建备份'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* 快速操作 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>立即创建备份或恢复数据</CardDescription>
          </CardHeader>
          <CardContent>
            <BackupActions />
          </CardContent>
        </Card>

        {/* 自动备份设置 */}
        <Card>
          <CardHeader>
            <CardTitle>自动备份</CardTitle>
            <CardDescription>配置定时备份任务</CardDescription>
          </CardHeader>
          <CardContent>
            <AutoBackupSettings />
          </CardContent>
        </Card>
      </div>

      {/* 备份历史 */}
      <Card>
        <CardHeader>
          <CardTitle>备份历史</CardTitle>
          <CardDescription>查看和管理所有备份文件</CardDescription>
        </CardHeader>
        <CardContent>
          {backups.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileArchive className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无备份记录</p>
              <p className="text-sm mt-2">点击上方按钮创建第一个备份</p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>文件名</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>大小</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.name}>
                      <TableCell className="font-medium font-mono text-sm">
                        {backup.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant={backup.type === '完整备份' ? 'default' : 'secondary'}>
                          {backup.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatBytes(backup.size)}</TableCell>
                      <TableCell>
                        {new Date(backup.date).toLocaleString('zh-CN')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <a href={`/api/backup/download?file=${backup.name}`} download>
                              <Download className="h-4 w-4 mr-1" />
                              下载
                            </a>
                          </Button>
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
    </div>
  )
}





