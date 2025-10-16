"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface Setting {
  id: string
  key: string
  value: string
  label: string
  type: string
  group: string
  order: number
}

interface GroupedSettings {
  [group: string]: Setting[]
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<GroupedSettings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  // 加载设置
  const loadSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/settings")
      const data = await response.json()
      
      if (data.settings) {
        setSettings(data.settings)
      } else {
        // 如果没有设置，创建默认设置
        await createDefaultSettings()
        await loadSettings()
      }
    } catch (error) {
      console.error("加载设置失败:", error)
      toast.error("加载设置失败")
    } finally {
      setLoading(false)
    }
  }

  // 创建默认设置
  const createDefaultSettings = async () => {
    const defaultSettings = [
      // 微信登录设置
      { key: "wechat_app_id", value: "", label: "微信App ID", type: "text", group: "oauth", order: 1 },
      { key: "wechat_app_secret", value: "", label: "微信App Secret", type: "text", group: "oauth", order: 2 },
      { key: "wechat_enabled", value: "false", label: "启用微信登录", type: "boolean", group: "oauth", order: 3 },
      
      // QQ登录设置
      { key: "qq_app_id", value: "", label: "QQ App ID", type: "text", group: "oauth", order: 4 },
      { key: "qq_app_secret", value: "", label: "QQ App Secret", type: "text", group: "oauth", order: 5 },
      { key: "qq_enabled", value: "false", label: "启用QQ登录", type: "boolean", group: "oauth", order: 6 },
      
      // 网站设置
      { key: "site_name", value: "54LIKE", label: "网站名称", type: "text", group: "general", order: 1 },
      { key: "site_url", value: "http://localhost:3002", label: "网站URL", type: "text", group: "general", order: 2 },
      { key: "site_description", value: "优质内容分享平台", label: "网站描述", type: "textarea", group: "general", order: 3 },
      
      // 评论设置
      { key: "comment_require_login", value: "true", label: "评论需要登录", type: "boolean", group: "comment", order: 1 },
      { key: "comment_allow_anonymous", value: "false", label: "允许匿名评论", type: "boolean", group: "comment", order: 2 },
    ]

    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: defaultSettings })
      })
    } catch (error) {
      console.error("创建默认设置失败:", error)
    }
  }

  // 更新设置值
  const updateSetting = (key: string, value: string) => {
    setSettings(prev => {
      const newSettings = { ...prev }
      Object.keys(newSettings).forEach(group => {
        newSettings[group] = newSettings[group].map(setting => 
          setting.key === key ? { ...setting, value } : setting
        )
      })
      return newSettings
    })
  }

  // 保存设置
  const saveSettings = async () => {
    try {
      setSaving(true)
      setMessage("")

      // 收集所有设置
      const allSettings = Object.values(settings).flat()
      
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: allSettings })
      })

      const data = await response.json()
      
      if (data.success) {
        setMessage("设置保存成功！")
        toast.success("设置保存成功")
      } else {
        setMessage("保存失败：" + data.error)
        toast.error("保存失败：" + data.error)
      }
    } catch (error) {
      console.error("保存设置失败:", error)
      setMessage("保存失败：" + error)
      toast.error("保存失败")
    } finally {
      setSaving(false)
    }
  }

  // 渲染设置项
  const renderSetting = (setting: Setting) => {
    const { key, value, label, type } = setting

    switch (type) {
      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={value === "true"}
              onCheckedChange={(checked) => updateSetting(key, checked.toString())}
            />
            <Label className="text-sm font-medium">{label}</Label>
          </div>
        )
      
      case "textarea":
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{label}</Label>
            <Textarea
              value={value}
              onChange={(e) => updateSetting(key, e.target.value)}
              placeholder={`请输入${label}`}
              rows={3}
            />
          </div>
        )
      
      default:
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{label}</Label>
            <Input
              type={type === "number" ? "number" : "text"}
              value={value}
              onChange={(e) => updateSetting(key, e.target.value)}
              placeholder={`请输入${label}`}
            />
          </div>
        )
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">加载设置中...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">系统设置</h1>
          <p className="text-muted-foreground">管理网站的各种配置选项</p>
        </div>
        <Button onClick={saveSettings} disabled={saving} className="flex items-center gap-2">
          {saving ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "保存中..." : "保存设置"}
        </Button>
      </div>

      {message && (
        <div className={`flex items-center gap-2 p-4 rounded-lg ${
          message.includes("成功") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {message.includes("成功") ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          {message}
        </div>
      )}

      <Tabs defaultValue="oauth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="oauth">第三方登录</TabsTrigger>
          <TabsTrigger value="general">基本设置</TabsTrigger>
          <TabsTrigger value="comment">评论设置</TabsTrigger>
        </TabsList>

        <TabsContent value="oauth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>微信登录配置</CardTitle>
              <CardDescription>配置微信OAuth登录功能</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.oauth?.filter(s => s.key.startsWith("wechat")).map(setting => (
                <div key={setting.key}>
                  {renderSetting(setting)}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>QQ登录配置</CardTitle>
              <CardDescription>配置QQ OAuth登录功能</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.oauth?.filter(s => s.key.startsWith("qq")).map(setting => (
                <div key={setting.key}>
                  {renderSetting(setting)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>网站基本信息</CardTitle>
              <CardDescription>配置网站的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.general?.map(setting => (
                <div key={setting.key}>
                  {renderSetting(setting)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>评论系统设置</CardTitle>
              <CardDescription>配置评论系统的行为</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.comment?.map(setting => (
                <div key={setting.key}>
                  {renderSetting(setting)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}