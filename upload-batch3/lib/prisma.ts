import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 获取数据库URL（兼容 Edge Runtime）
function getDatabaseUrl(): string {
  // 优先使用环境变量
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }
  
  // 默认值
  return 'file:./prisma/dev.db'
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl()
    }
  }
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma


