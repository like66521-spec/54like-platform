import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"
import { applyRateLimit } from "@/lib/rate-limit"

// 获取支付记录列表
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")
    const method = searchParams.get("method")
    const search = searchParams.get("search")

    const where: any = {}
    
    if (status && status !== "all") {
      where.status = status
    }
    
    if (method && method !== "all") {
      where.method = method
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          article: {
            select: {
              id: true,
              title: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.payment.count({ where })
    ])

    // 如果有搜索条件，进行客户端过滤
    let filteredPayments = payments
    if (search) {
      filteredPayments = payments.filter(payment => 
        payment.article.title.toLowerCase().includes(search.toLowerCase()) ||
        payment.user.name.toLowerCase().includes(search.toLowerCase()) ||
        payment.user.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json({
      payments: filteredPayments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("获取支付记录错误:", error)
    return NextResponse.json({ error: "获取支付记录失败" }, { status: 500 })
  }
}

// 更新支付状态（管理员操作）
export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { paymentId, status, reason } = body

    if (!paymentId || !status) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 })
    }

    const validStatuses = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "无效的状态" }, { status: 400 })
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId }
    })

    if (!payment) {
      return NextResponse.json({ error: "支付记录不存在" }, { status: 404 })
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        updatedAt: new Date()
      },
      include: {
        article: {
          select: {
            id: true,
            title: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ 
      payment: updatedPayment,
      message: "支付状态更新成功"
    })
  } catch (error) {
    console.error("更新支付状态错误:", error)
    return NextResponse.json({ error: "更新支付状态失败" }, { status: 500 })
  }
}

// 删除支付记录（管理员操作）
export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()
    
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get("id")

    if (!paymentId) {
      return NextResponse.json({ error: "缺少支付ID" }, { status: 400 })
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId }
    })

    if (!payment) {
      return NextResponse.json({ error: "支付记录不存在" }, { status: 404 })
    }

    // 只允许删除失败的支付记录
    if (payment.status !== "FAILED") {
      return NextResponse.json({ error: "只能删除失败的支付记录" }, { status: 400 })
    }

    await prisma.payment.delete({
      where: { id: paymentId }
    })

    return NextResponse.json({ message: "支付记录删除成功" })
  } catch (error) {
    console.error("删除支付记录错误:", error)
    return NextResponse.json({ error: "删除支付记录失败" }, { status: 500 })
  }
}





