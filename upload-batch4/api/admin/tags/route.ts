import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"
import { generateSlug } from "@/lib/pinyin"
import { sanitizeText, validateStringLength } from "@/lib/validation"

// 获取所有标签
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            articles: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    const tagsWithCount = tags.map(tag => ({
      ...tag,
      articleCount: tag._count.articles
    }))

    return NextResponse.json({ tags: tagsWithCount })
  } catch (error) {
    console.error("获取标签失败:", error)
    return NextResponse.json({ error: "获取标签失败" }, { status: 500 })
  }
}

// 创建新标签
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { name, description, color } = body

    if (!name || !validateStringLength(name, 1, 20)) {
      return NextResponse.json({ error: "标签名称长度必须在1-20字符之间" }, { status: 400 })
    }

    const sanitizedName = sanitizeText(name)
    const slug = generateSlug(sanitizedName)

    // 检查标签是否已存在
    const existingTag = await prisma.tag.findFirst({
      where: {
        OR: [
          { name: sanitizedName },
          { slug: slug }
        ]
      }
    })

    if (existingTag) {
      return NextResponse.json({ error: "标签名称已存在" }, { status: 400 })
    }

    const tag = await prisma.tag.create({
      data: {
        name: sanitizedName,
        slug: slug,
        description: description ? sanitizeText(description) : null,
        color: color || "#3b82f6"
      }
    })

    return NextResponse.json({ success: true, tag })
  } catch (error) {
    console.error("创建标签失败:", error)
    return NextResponse.json({ error: "创建标签失败" }, { status: 500 })
  }
}



