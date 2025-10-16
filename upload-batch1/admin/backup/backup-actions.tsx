"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Database, FolderArchive, Download, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function BackupActions() {
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()

  const handleDatabaseBackup = async () => {
    setIsBackingUp(true)
    setMessage(null)
    
    try {
      const response = await fetch('/api/backup/database', {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `数据库备份成功! 文件: ${data.filename}` })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: data.error || '备份失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '备份失败,请稍后重试' })
    } finally {
      setIsBackingUp(false)
    }
  }

  const handleFullBackup = async () => {
    setIsBackingUp(true)
    setMessage(null)
    
    try {
      const response = await fetch('/api/backup/full', {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `完整备份成功! 文件: ${data.filename}` })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: data.error || '备份失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '备份失败,请稍后重试' })
    } finally {
      setIsBackingUp(false)
    }
  }

  return (
    <div className="space-y-4">
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">数据库备份</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            仅备份数据库文件,包含所有文章、用户、评论等数据
          </p>
          <Button 
            onClick={handleDatabaseBackup} 
            disabled={isBackingUp}
            className="w-full"
            variant="outline"
          >
            {isBackingUp ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                备份中...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                备份数据库
              </>
            )}
          </Button>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <FolderArchive className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">完整备份</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            备份数据库和上传的文件,推荐定期执行完整备份
          </p>
          <Button 
            onClick={handleFullBackup} 
            disabled={isBackingUp}
            className="w-full"
          >
            {isBackingUp ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                备份中...
              </>
            ) : (
              <>
                <FolderArchive className="mr-2 h-4 w-4" />
                完整备份
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">导入备份</h3>
            <p className="text-sm text-muted-foreground">
              从备份文件恢复数据(谨慎操作,会覆盖现有数据)
            </p>
          </div>
          <Button variant="outline" disabled>
            <Upload className="mr-2 h-4 w-4" />
            导入备份
          </Button>
        </div>
      </div>

      <Alert>
        <AlertDescription className="text-xs">
          💡 提示: 建议每周至少进行一次完整备份,并将备份文件下载到本地保存。
        </AlertDescription>
      </Alert>
    </div>
  )
}





