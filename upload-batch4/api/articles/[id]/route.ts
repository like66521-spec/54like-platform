import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"
import { applyRateLimit } from "@/lib/rate-limit"
import { sanitizeObject, validateStringLength } from "@/lib/validation"

// 获取单个文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 应用速率限制
    const rateLimitResponse = applyRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        author: true,
        comments: {
          include: {
            user: true,
            replies: {
              include: {
                user: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    })

    if (!article) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 })
    }

    // 增加浏览量
    await prisma.article.update({
      where: { id: params.id },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Get article error:", error)
    return NextResponse.json({ error: "获取文章失败" }, { status: 500 })
  }
}

// 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 应用严格速率限制
    const rateLimitResponse = applyRateLimit(request, { windowMs: 15 * 60 * 1000, maxRequests: 5 })
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    await requireAdmin()
    
    const body = await request.json()
    const { title, slug, content, excerpt, categoryId, status } = sanitizeObject(body)

    // 验证输入
    if (!title || !validateStringLength(title, 1, 200)) {
      return NextResponse.json({ error: "标题不能为空且长度不超过200字符" }, { status: 400 })
    }

    if (content && !validateStringLength(content, 0, 50000)) {
      return NextResponse.json({ error: "内容长度不能超过50000字符" }, { status: 400 })
    }

    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content,
        excerpt,
        categoryId: categoryId || null,
        status: status || 'DRAFT',
        updatedAt: new Date(),
      },
      include: {
        category: true,
        author: true,
      }
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Update article error:", error)
    return NextResponse.json({ error: "更新文章失败" }, { status: 500 })
  }
}

// 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 应用严格速率限制
    const rateLimitResponse = applyRateLimit(request, { windowMs: 15 * 60 * 1000, maxRequests: 3 })
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    await requireAdmin()
    
    await prisma.article.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete article error:", error)
    return NextResponse.json({ error: "删除文章失败" }, { status: 500 })
  }
}

