import prisma from "@/lib/prisma"
import { EditClient } from "./edit-client"

export default async function EditArticlePage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: 'asc' }
  })

  let article = null
  if (searchParams.id) {
    article = await prisma.article.findUnique({
      where: { id: searchParams.id },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        categoryId: true,
        status: true,
      }
    })
  }

  return <EditClient categories={categories} article={article} />
}
