import { PrismaClient } from '@prisma/client'

// 数据库配置接口
export interface DatabaseConfig {
  url: string
  type: 'sqlite' | 'postgresql' | 'mysql'
  host?: string
  port?: number
  database?: string
  username?: string
  password?: string
}

// 解析数据库URL
export function parseDatabaseUrl(url: string): DatabaseConfig {
  try {
    const urlObj = new URL(url)
    
    if (urlObj.protocol === 'file:') {
      return {
        url,
        type: 'sqlite'
      }
    }
    
    if (urlObj.protocol === 'postgresql:' || urlObj.protocol === 'postgres:') {
      return {
        url,
        type: 'postgresql',
        host: urlObj.hostname,
        port: parseInt(urlObj.port) || 5432,
        database: urlObj.pathname.slice(1),
        username: urlObj.username,
        password: urlObj.password
      }
    }
    
    if (urlObj.protocol === 'mysql:') {
      return {
        url,
        type: 'mysql',
        host: urlObj.hostname,
        port: parseInt(urlObj.port) || 3306,
        database: urlObj.pathname.slice(1),
        username: urlObj.username,
        password: urlObj.password
      }
    }
    
    throw new Error(`不支持的数据库类型: ${urlObj.protocol}`)
  } catch (error) {
    throw new Error(`无效的数据库URL: ${url}`)
  }
}

// 生成数据库连接字符串
export function generateDatabaseUrl(config: Omit<DatabaseConfig, 'url'>): string {
  switch (config.type) {
    case 'sqlite':
      return `file:./prisma/dev.db`
    
    case 'postgresql':
      return `postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
    
    case 'mysql':
      return `mysql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
    
    default:
      throw new Error(`不支持的数据库类型: ${config.type}`)
  }
}

// 检查数据库连接
export async function checkDatabaseConnection(url: string): Promise<boolean> {
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: { url }
      }
    })
    
    await prisma.$connect()
    await prisma.$disconnect()
    return true
  } catch (error) {
    console.error('数据库连接失败:', error)
    return false
  }
}

// 获取数据库状态
export async function getDatabaseStatus(): Promise<{
  connected: boolean
  type: string
  tables: string[]
  error?: string
}> {
  try {
    const prisma = new PrismaClient()
    await prisma.$connect()
    
    // 获取表信息
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ` as Array<{ name: string }>
    
    await prisma.$disconnect()
    
    return {
      connected: true,
      type: 'sqlite',
      tables: tables.map(t => t.name)
    }
  } catch (error) {
    return {
      connected: false,
      type: 'unknown',
      tables: [],
      error: error instanceof Error ? error.message : '未知错误'
    }
  }
}



