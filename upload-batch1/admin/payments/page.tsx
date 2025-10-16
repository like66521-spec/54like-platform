"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, XCircle, RefreshCw, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface Payment {
  id: string
  amount: number
  method: "WECHAT" | "ALIPAY"
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  transactionId?: string
  createdAt: string
  updatedAt: string
  article: {
    id: string
    title: string
  }
  user: {
    id: string
    name: string
    email: string
  }
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterMethod, setFilterMethod] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/payments")
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments || [])
      } else {
        console.error("加载支付记录失败")
      }
    } catch (error) {
      console.error("加载支付记录错误:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3" />
            已完成
          </Badge>
        )
      case "PENDING":
        return (
          <Badge variant="outline" className="gap-1 text-amber-600 border-amber-600">
            <Clock className="h-3 w-3" />
            待支付
          </Badge>
        )
      case "FAILED":
        return (
          <Badge variant="outline" className="gap-1 text-red-600 border-red-600">
            <XCircle className="h-3 w-3" />
            失败
          </Badge>
        )
      case "REFUNDED":
        return (
          <Badge variant="outline" className="gap-1 text-blue-600 border-blue-600">
            <XCircle className="h-3 w-3" />
            已退款
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus
    const matchesMethod = filterMethod === "all" || payment.method === filterMethod
    const matchesSearch = searchTerm === "" || 
      payment.article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesMethod && matchesSearch
  })

  const totalAmount = filteredPayments
    .filter(p => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalCount = filteredPayments.length
  const completedCount = filteredPayments.filter(p => p.status === "COMPLETED").length

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">支付记录</h1>
            <p className="text-muted-foreground">查看所有支付交易记录</p>
          </div>
          <Button onClick={loadPayments} disabled={loading} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">¥{totalAmount.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">总收入</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{completedCount}</div>
            <div className="text-sm text-muted-foreground">已完成订单</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-600">{totalCount}</div>
            <div className="text-sm text-muted-foreground">总订单数</div>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">筛选:</span>
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="PENDING">待支付</SelectItem>
              <SelectItem value="COMPLETED">已完成</SelectItem>
              <SelectItem value="FAILED">失败</SelectItem>
              <SelectItem value="REFUNDED">已退款</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterMethod} onValueChange={setFilterMethod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="支付方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部方式</SelectItem>
              <SelectItem value="WECHAT">微信支付</SelectItem>
              <SelectItem value="ALIPAY">支付宝</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="搜索文章标题或用户名..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>文章标题</TableHead>
              <TableHead>用户</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>支付方式</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                  加载中...
                </TableCell>
              </TableRow>
            ) : filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  暂无支付记录
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="line-clamp-2">{payment.article.title}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.user.name}</div>
                      <div className="text-sm text-muted-foreground">{payment.user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">¥{payment.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {payment.method === "WECHAT" ? "微信支付" : "支付宝"}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{new Date(payment.createdAt).toLocaleString("zh-CN")}</TableCell>
                  <TableCell>{new Date(payment.updatedAt).toLocaleString("zh-CN")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
