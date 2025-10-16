import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"
import { applyRateLimit } from "@/lib/rate-limit"

// 获取评论列表（管理员）
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const articleId = searchParams.get("articleId")
    const userId = searchParams.get("userId")
    const search = searchParams.get("search")

    const where: any = {}
    
    if (articleId) {
      where.articleId = articleId
    }
    
    if (userId) {
      where.userId = userId
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        include: {
          article: {
            select: {
              id: true,
              title: true,
              slug: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          },
          parent: {
            select: {
              id: true,
              content: true,
              user: {
                select: {
                  name: true
                }
              }
            }
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              }
            },
            orderBy: { createdAt: "asc" }
          },
          _count: {
            select: { likesRelation: true }
          }
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.comment.count({ where })
    ])

    // 如果有搜索条件，进行客户端过滤
    let filteredComments = comments
    if (search) {
      filteredComments = comments.filter(comment => 
        comment.content.toLowerCase().includes(search.toLowerCase()) ||
        comment.article.title.toLowerCase().includes(search.toLowerCase()) ||
        comment.user.name.toLowerCase().includes(search.toLowerCase()) ||
        comment.user.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json({
      comments: filteredComments.map(comment => ({
        ...comment,
        likes: comment._count.likesRelation
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("获取评论列表错误:", error)
    return NextResponse.json({ error: "获取评论列表失败" }, { status: 500 })
  }
}

// 删除评论（管理员）
export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()
    
    const { searchParams } = new URL(request.url)
    const commentId = searchParams.get("id")

    if (!commentId) {
      return NextResponse.json({ error: "缺少评论ID" }, { status: 400 })
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        replies: true
      }
    })

    if (!comment) {
      return NextResponse.json({ error: "评论不存在" }, { status: 404 })
    }

    // 删除评论（级联删除回复）
    await prisma.comment.delete({
      where: { id: commentId }
    })

    return NextResponse.json({ message: "评论删除成功" })
  } catch (error) {
    console.error("删除评论错误:", error)
    return NextResponse.json({ error: "删除评论失败" }, { status: 500 })
  }
}

// 批量删除评论（管理员）
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { commentIds, action } = body

    if (!commentIds || !Array.isArray(commentIds) || commentIds.length === 0) {
      return NextResponse.json({ error: "缺少评论ID列表" }, { status: 400 })
    }

    if (action === "delete") {
      // 批量删除评论
      const result = await prisma.comment.deleteMany({
        where: {
          id: {
            in: commentIds
          }
        }
      })

      return NextResponse.json({ 
        message: `成功删除 ${result.count} 条评论`,
        deletedCount: result.count
      })
    } else {
      return NextResponse.json({ error: "无效的操作" }, { status: 400 })
    }
  } catch (error) {
    console.error("批量操作评论错误:", error)
    return NextResponse.json({ error: "批量操作失败" }, { status: 500 })
  }
}





