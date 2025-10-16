import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth } from "@/lib/auth"
import { applyRateLimit } from "@/lib/rate-limit"

const prisma = new PrismaClient()

// 获取所有设置
export async function GET(request: NextRequest) {
  try {
    // 应用速率限制
    const rateLimitResponse = applyRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const session = await auth()
    if (!session || session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "无权限访问" }, { status: 403 })
    }

    const settings = await prisma.settings.findMany({
      orderBy: [
        { group: "asc" },
        { order: "asc" }
      ]
    })

    // 按组分类
    const groupedSettings = settings.reduce((acc, setting) => {
      if (!acc[setting.group]) {
        acc[setting.group] = []
      }
      acc[setting.group].push(setting)
      return acc
    }, {} as Record<string, typeof settings>)

    return NextResponse.json({ settings: groupedSettings })
  } catch (error) {
    console.error("获取设置失败:", error)
    return NextResponse.json({ error: "获取设置失败" }, { status: 500 })
  }
}

// 更新设置
export async function POST(request: NextRequest) {
  try {
    // 应用速率限制
    const rateLimitResponse = applyRateLimit(request, { windowMs: 60 * 1000, maxRequests: 10 })
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const session = await auth()
    if (!session || session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "无权限访问" }, { status: 403 })
    }

    const body = await request.json()
    const { settings } = body

    if (!settings || !Array.isArray(settings)) {
      return NextResponse.json({ error: "无效的设置数据" }, { status: 400 })
    }

    // 批量更新设置
    const updatePromises = settings.map((setting: any) =>
      prisma.settings.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: {
          key: setting.key,
          value: setting.value,
          label: setting.label || setting.key,
          type: setting.type || "text",
          group: setting.group || "general",
          order: setting.order || 0
        }
      })
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ success: true, message: "设置更新成功" })
  } catch (error) {
    console.error("更新设置失败:", error)
    return NextResponse.json({ error: "更新设置失败" }, { status: 500 })
  }
}