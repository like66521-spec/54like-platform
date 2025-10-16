"use client"

import { useState, useEffect } from "react"
import { CreditCard, Settings, Save, RefreshCw, QrCode, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface PaymentSettings {
  wechat: {
    enabled: boolean
    qrCodeUrl: string
    accountName: string
  }
  alipay: {
    enabled: boolean
    qrCodeUrl: string
    accountName: string
  }
}

export default function PaymentSettingsPage() {
  const [settings, setSettings] = useState<PaymentSettings>({
    wechat: {
      enabled: false,
      qrCodeUrl: "",
      accountName: ""
    },
    alipay: {
      enabled: false,
      qrCodeUrl: "",
      accountName: ""
    }
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/payment-settings")
      if (response.ok) {
        const data = await response.json()
        setSettings(data.settings || settings)
      } else {
        toast.error("加载支付设置失败")
      }
    } catch (error) {
      console.error("加载支付设置错误:", error)
      toast.error("加载支付设置失败")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/payment-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings })
      })

      const data = await response.json()
      if (data.success) {
        toast.success("支付设置保存成功")
      } else {
        toast.error(data.error || "保存失败")
      }
    } catch (error) {
      console.error("保存支付设置错误:", error)
      toast.error("保存支付设置失败")
    } finally {
      setSaving(false)
    }
  }

  const updateWechatSetting = (key: keyof PaymentSettings['wechat'], value: any) => {
    setSettings(prev => ({
      ...prev,
      wechat: {
        ...prev.wechat,
        [key]: value
      }
    }))
  }

  const updateAlipaySetting = (key: keyof PaymentSettings['alipay'], value: any) => {
    setSettings(prev => ({
      ...prev,
      alipay: {
        ...prev.alipay,
        [key]: value
      }
    }))
  }

  const handleFileUpload = (type: 'wechat' | 'alipay', file: File) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === 'wechat') {
          updateWechatSetting('qrCodeUrl', result)
        } else {
          updateAlipaySetting('qrCodeUrl', result)
        }
        toast.success(`${type === 'wechat' ? '微信' : '支付宝'}收款码上传成功`)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">个人收款设置</h1>
            <p className="text-muted-foreground">配置个人微信和支付宝收款码</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadSettings} disabled={loading} variant="outline" className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </Button>
            <Button onClick={handleSaveSettings} disabled={saving} className="gap-2">
              <Save className="h-4 w-4" />
              {saving ? "保存中..." : "保存设置"}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="wechat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wechat" className="gap-2">
            <QrCode className="h-4 w-4" />
            微信收款码
          </TabsTrigger>
          <TabsTrigger value="alipay" className="gap-2">
            <QrCode className="h-4 w-4" />
            支付宝收款码
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wechat">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                微信收款码配置
              </CardTitle>
              <CardDescription>
                上传个人微信收款码，用户扫码后直接向您转账
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="wechat-enabled">启用微信收款</Label>
                  <p className="text-sm text-muted-foreground">开启后用户可以使用微信扫码向您付款</p>
                </div>
                <Switch
                  id="wechat-enabled"
                  checked={settings.wechat.enabled}
                  onCheckedChange={(checked) => updateWechatSetting('enabled', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wechat-accountName">收款人姓名</Label>
                <Input
                  id="wechat-accountName"
                  value={settings.wechat.accountName}
                  onChange={(e) => updateWechatSetting('accountName', e.target.value)}
                  placeholder="您的真实姓名"
                  disabled={!settings.wechat.enabled}
                />
                <p className="text-xs text-muted-foreground">用于显示给用户确认收款人</p>
              </div>

              <div className="space-y-2">
                <Label>微信收款码</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {settings.wechat.qrCodeUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={settings.wechat.qrCodeUrl} 
                        alt="微信收款码" 
                        className="mx-auto max-w-[200px] max-h-[200px] rounded-lg"
                      />
                      <p className="text-sm text-green-600">✓ 收款码已上传</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <QrCode className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500">请上传微信收款码</p>
                    </div>
                  )}
                  <div className="mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload('wechat', file)
                      }}
                      className="hidden"
                      id="wechat-upload"
                      disabled={!settings.wechat.enabled}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('wechat-upload')?.click()}
                      disabled={!settings.wechat.enabled}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      上传收款码
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alipay">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                支付宝收款码配置
              </CardTitle>
              <CardDescription>
                上传个人支付宝收款码，用户扫码后直接向您转账
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="alipay-enabled">启用支付宝收款</Label>
                  <p className="text-sm text-muted-foreground">开启后用户可以使用支付宝扫码向您付款</p>
                </div>
                <Switch
                  id="alipay-enabled"
                  checked={settings.alipay.enabled}
                  onCheckedChange={(checked) => updateAlipaySetting('enabled', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alipay-accountName">收款人姓名</Label>
                <Input
                  id="alipay-accountName"
                  value={settings.alipay.accountName}
                  onChange={(e) => updateAlipaySetting('accountName', e.target.value)}
                  placeholder="您的真实姓名"
                  disabled={!settings.alipay.enabled}
                />
                <p className="text-xs text-muted-foreground">用于显示给用户确认收款人</p>
              </div>

              <div className="space-y-2">
                <Label>支付宝收款码</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {settings.alipay.qrCodeUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={settings.alipay.qrCodeUrl} 
                        alt="支付宝收款码" 
                        className="mx-auto max-w-[200px] max-h-[200px] rounded-lg"
                      />
                      <p className="text-sm text-green-600">✓ 收款码已上传</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <QrCode className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500">请上传支付宝收款码</p>
                    </div>
                  )}
                  <div className="mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload('alipay', file)
                      }}
                      className="hidden"
                      id="alipay-upload"
                      disabled={!settings.alipay.enabled}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('alipay-upload')?.click()}
                      disabled={!settings.alipay.enabled}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      上传收款码
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">💡 个人收款说明</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 用户选择支付方式后，显示您的收款码</li>
          <li>• 用户扫码后直接向您的账户转账</li>
          <li>• 您需要手动确认收款并更新订单状态</li>
          <li>• 支持真实转账，资金直接到您的个人账户</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ 注意事项</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 请确保收款码清晰可见，建议使用高清图片</li>
          <li>• 收款码不要设置金额限制，让用户自行输入</li>
          <li>• 及时处理用户的支付请求，避免用户等待</li>
          <li>• 建议设置合理的收款金额提醒</li>
        </ul>
      </div>
    </div>
  )
}
