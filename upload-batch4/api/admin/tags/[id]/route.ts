import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/app/admin/actions"
import { generateSlug } from "@/lib/pinyin"
import { sanitizeText, validateStringLength } from "@/lib/validation"

// 更新标签
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { name, description, color } = body

    if (!name || !validateStringLength(name, 1, 20)) {
      return NextResponse.json({ error: "标签名称长度必须在1-20字符之间" }, { status: 400 })
    }

    const sanitizedName = sanitizeText(name)
    const slug = generateSlug(sanitizedName)

    // 检查标签是否存在
    const existingTag = await prisma.tag.findUnique({
      where: { id: params.id }
    })

    if (!existingTag) {
      return NextResponse.json({ error: "标签不存在" }, { status: 404 })
    }

    // 检查是否有其他标签使用相同的名称或slug
    const duplicateTag = await prisma.tag.findFirst({
      where: {
        AND: [
          { id: { not: params.id } },
          {
            OR: [
              { name: sanitizedName },
              { slug: slug }
            ]
          }
        ]
      }
    })

    if (duplicateTag) {
      return NextResponse.json({ error: "标签名称已存在" }, { status: 400 })
    }

    const tag = await prisma.tag.update({
      where: { id: params.id },
      data: {
        name: sanitizedName,
        slug: slug,
        description: description ? sanitizeText(description) : null,
        color: color || "#3b82f6"
      }
    })

    return NextResponse.json({ success: true, tag })
  } catch (error) {
    console.error("更新标签失败:", error)
    return NextResponse.json({ error: "更新标签失败" }, { status: 500 })
  }
}

// 删除标签
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()

    // 检查标签是否存在
    const existingTag = await prisma.tag.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            articles: true
          }
        }
      }
    })

    if (!existingTag) {
      return NextResponse.json({ error: "标签不存在" }, { status: 404 })
    }

    // 如果标签有关联的文章，不允许删除
    if (existingTag._count.articles > 0) {
      return NextResponse.json({ 
        error: `无法删除标签，还有 ${existingTag._count.articles} 篇文章使用此标签` 
      }, { status: 400 })
    }

    await prisma.tag.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true, message: "标签删除成功" })
  } catch (error) {
    console.error("删除标签失败:", error)
    return NextResponse.json({ error: "删除标签失败" }, { status: 500 })
  }
}



