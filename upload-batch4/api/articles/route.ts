import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"
import { sanitizeText, validateStringLength, sanitizeObject } from "@/lib/validation"
import { applyRateLimit } from "@/lib/rate-limit"
import { generateSlug, generateTags } from "@/lib/pinyin"

// 获取文章列表
export async function GET(request: NextRequest) {
  try {
    // 应用速率限制
    const rateLimitResponse = applyRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const where: any = {}
    
    if (category) {
      where.categoryId = category
    }
    
    if (search) {
      // 清理搜索输入
      const sanitizedSearch = sanitizeText(search)
      if (sanitizedSearch && validateStringLength(sanitizedSearch, 1, 100)) {
        where.OR = [
          { title: { contains: sanitizedSearch } },
          { excerpt: { contains: sanitizedSearch } },
        ]
      }
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: true,
          author: true,
          _count: {
            select: { comments: true }
          }
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.article.count({ where })
    ])

    return NextResponse.json({
      articles: articles.map(article => ({
        ...article,
        comments: article._count.comments
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Get articles error:", error)
    return NextResponse.json({ error: "获取文章列表失败" }, { status: 500 })
  }
}

// 创建文章
export async function POST(request: NextRequest) {
  try {
    // 应用严格速率限制
    const rateLimitResponse = applyRateLimit(request, { windowMs: 15 * 60 * 1000, maxRequests: 5 })
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const session = await requireAdmin()
    
    const body = await request.json()
    const { title, slug, content, excerpt, categoryId, status, autoTags } = sanitizeObject(body)

    // 验证输入
    if (!title || !validateStringLength(title, 1, 200)) {
      return NextResponse.json({ error: "标题不能为空且长度不超过200字符" }, { status: 400 })
    }

    if (content && !validateStringLength(content, 0, 50000)) {
      return NextResponse.json({ error: "内容长度不能超过50000字符" }, { status: 400 })
    }

    // 生成 slug 和标签
    const finalSlug = slug || generateSlug(title)
    const tags = autoTags || generateTags(title, content || "")

    // 创建或获取标签
    const tagIds: string[] = []
    for (const tagName of tags) {
      let tag = await prisma.tag.findUnique({
        where: { name: tagName }
      })
      
      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagName,
            slug: generateSlug(tagName)
          }
        })
      }
      
      tagIds.push(tag.id)
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug: finalSlug,
        content: content || "",
        excerpt: excerpt || content?.slice(0, 200) || "",
        categoryId: categoryId || null,
        authorId: session.user.id,
        status: status || 'DRAFT',
        tags: {
          create: tagIds.map(tagId => ({
            tagId: tagId
          }))
        }
      },
      include: {
        category: true,
        author: true,
      }
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Create article error:", error)
    return NextResponse.json({ error: "创建文章失败" }, { status: 500 })
  }
}

