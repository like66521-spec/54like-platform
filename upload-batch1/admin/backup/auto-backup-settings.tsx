"use client"

import { useState } from "react"
import { Clock, CheckCircle2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function AutoBackupSettings() {
  const [enabled, setEnabled] = useState(false)
  const [frequency, setFrequency] = useState("daily")
  const [time, setTime] = useState("02:00")
  const [keepDays, setKeepDays] = useState("30")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // 这里可以调用API保存设置
    setTimeout(() => {
      setIsSaving(false)
      alert('自动备份设置已保存')
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>启用自动备份</Label>
          <p className="text-xs text-muted-foreground">
            定时自动创建备份
          </p>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>

      {enabled && (
        <>
          <Separator />

          <div className="space-y-2">
            <Label>备份频率</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">每天</SelectItem>
                <SelectItem value="weekly">每周</SelectItem>
                <SelectItem value="monthly">每月</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>备份时间</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="00:00">00:00 (凌晨)</SelectItem>
                <SelectItem value="02:00">02:00 (凌晨)</SelectItem>
                <SelectItem value="04:00">04:00 (凌晨)</SelectItem>
                <SelectItem value="06:00">06:00 (早上)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              建议选择访问量较低的时段
            </p>
          </div>

          <div className="space-y-2">
            <Label>保留天数</Label>
            <Select value={keepDays} onValueChange={setKeepDays}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 天</SelectItem>
                <SelectItem value="14">14 天</SelectItem>
                <SelectItem value="30">30 天</SelectItem>
                <SelectItem value="60">60 天</SelectItem>
                <SelectItem value="90">90 天</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              超过此天数的备份将自动删除
            </p>
          </div>

          <Separator />

          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full"
            size="sm"
          >
            {isSaving ? '保存中...' : '保存设置'}
          </Button>

          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="text-xs text-green-800 dark:text-green-200">
                <p className="font-medium mb-1">下次备份时间</p>
                <p className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(Date.now() + 86400000).toLocaleDateString('zh-CN')} {time}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {!enabled && (
        <div className="text-center py-4 text-sm text-muted-foreground">
          启用自动备份以保护您的数据安全
        </div>
      )}
    </div>
  )
}





