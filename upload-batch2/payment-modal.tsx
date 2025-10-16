"use client"

import { useState } from "react"
import Image from "next/image"
import { Lock, Check, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Article } from "@/lib/types"

interface PaymentModalProps {
  article: Article
  onSuccess?: () => void
}

export function PaymentModal({ article, onSuccess }: PaymentModalProps) {
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"wechat" | "alipay">("wechat")
  const [isPaid, setIsPaid] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")

  const handleCreatePayment = async () => {
    setIsProcessing(true)

    try {
      // Create payment using specific payment method API
      const response = await fetch(`/api/payment/${paymentMethod}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId: article.id,
          amount: article.price,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setQrCodeUrl(data.payment.qrCodeUrl)
        // Start polling for payment status
        pollPaymentStatus(data.payment.id)
      }
    } catch (error) {
      console.error("[v0] Payment creation failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const pollPaymentStatus = async (paymentId: string) => {
    // Poll every 2 seconds for payment status
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId }),
        })

        const data = await response.json()

        if (data.success && data.status === "completed") {
          clearInterval(interval)
          setIsPaid(true)
          setTimeout(() => {
            setOpen(false)
            onSuccess?.()
          }, 2000)
        }
      } catch (error) {
        console.error("[v0] Payment verification failed:", error)
      }
    }, 2000)

    // Stop polling after 5 minutes
    setTimeout(() => clearInterval(interval), 300000)
  }

  const handleSimulatePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsPaid(true)
      setIsProcessing(false)
      setTimeout(() => {
        setOpen(false)
        onSuccess?.()
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Lock className="h-4 w-4" />
          解锁文章 ¥{article.price}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>解锁付费内容</DialogTitle>
          <DialogDescription>选择支付方式完成购买</DialogDescription>
        </DialogHeader>

        {!isPaid ? (
          <div className="space-y-6">
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-2">{article.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">作者：{article.author?.name}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">支付金额</span>
                <span className="text-2xl font-bold text-primary">¥{article.price}</span>
              </div>
            </div>

            <Tabs
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as "wechat" | "alipay")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="wechat">微信支付</TabsTrigger>
                <TabsTrigger value="alipay">支付宝</TabsTrigger>
              </TabsList>

              <TabsContent value="wechat" className="mt-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-64 h-64 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30">
                    {qrCodeUrl ? (
                      <Image
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="微信支付二维码"
                        width={240}
                        height={240}
                        className="rounded"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p className="text-sm">点击下方按钮生成支付二维码</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {qrCodeUrl ? "请使用微信扫描二维码完成支付" : "生成二维码后使用微信扫描支付"}
                  </p>
                  {!qrCodeUrl ? (
                    <Button onClick={handleCreatePayment} disabled={isProcessing} className="w-full">
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        "生成支付二维码"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSimulatePayment}
                      disabled={isProcessing}
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          处理中...
                        </>
                      ) : (
                        "模拟支付完成（测试用）"
                      )}
                    </Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="alipay" className="mt-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-64 h-64 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30">
                    {qrCodeUrl ? (
                      <Image
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="支付宝二维码"
                        width={240}
                        height={240}
                        className="rounded"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p className="text-sm">点击下方按钮生成支付二维码</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {qrCodeUrl ? "请使用支付宝扫描二维码完成支付" : "生成二维码后使用支付宝扫描支付"}
                  </p>
                  {!qrCodeUrl ? (
                    <Button onClick={handleCreatePayment} disabled={isProcessing} className="w-full">
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        "生成支付二维码"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSimulatePayment}
                      disabled={isProcessing}
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          处理中...
                        </>
                      ) : (
                        "模拟支付完成（测试用）"
                      )}
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">支付成功！</h3>
            <p className="text-muted-foreground text-center">正在为您解锁文章内容...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
