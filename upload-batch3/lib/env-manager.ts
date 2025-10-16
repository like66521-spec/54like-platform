// 环境变量配置接口
export interface EnvConfig {
  DATABASE_URL: string
  NEXTAUTH_URL: string
  NEXTAUTH_SECRET: string
  NEXT_PUBLIC_SITE_URL: string
  NEXT_PUBLIC_SITE_NAME: string
  [key: string]: string
}

// 默认环境变量
const DEFAULT_ENV: EnvConfig = {
  DATABASE_URL: 'file:./prisma/dev.db',
  NEXTAUTH_URL: 'http://localhost:3002',
  NEXTAUTH_SECRET: '',
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3002',
  NEXT_PUBLIC_SITE_NAME: '54LIKE'
}

// 读取环境变量文件（兼容 Edge Runtime）
export function loadEnvFile(filePath: string = '.env'): EnvConfig {
  // 在 Edge Runtime 中，直接使用 process.env
  if (typeof window === 'undefined' && typeof process !== 'undefined') {
    return {
      DATABASE_URL: process.env.DATABASE_URL || DEFAULT_ENV.DATABASE_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || DEFAULT_ENV.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || DEFAULT_ENV.NEXTAUTH_SECRET,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_ENV.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || DEFAULT_ENV.NEXT_PUBLIC_SITE_NAME,
    }
  }
  
  // 在客户端或 Node.js 环境中，返回默认值
  return { ...DEFAULT_ENV }
}

// 保存环境变量文件（仅在 Node.js 环境中可用）
export function saveEnvFile(config: EnvConfig, filePath: string = '.env'): void {
  // 检查是否在 Node.js 环境中
  if (typeof window !== 'undefined' || typeof process === 'undefined') {
    console.warn('saveEnvFile 只能在 Node.js 环境中使用')
    return
  }

  // 动态导入 Node.js 模块
  const fs = require('fs')
  const path = require('path')
  
  const fullPath = path.resolve(filePath)
  
  // 备份现有文件
  if (fs.existsSync(fullPath)) {
    const backupPath = `${fullPath}.backup.${Date.now()}`
    fs.copyFileSync(fullPath, backupPath)
    console.log(`已备份现有环境文件到: ${backupPath}`)
  }
  
  // 生成环境文件内容
  const content = Object.entries(config)
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n')
  
  fs.writeFileSync(fullPath, content)
  console.log(`环境文件已保存到: ${fullPath}`)
}

// 更新数据库URL（仅在 Node.js 环境中可用）
export function updateDatabaseUrl(url: string, filePath: string = '.env'): void {
  if (typeof window !== 'undefined' || typeof process === 'undefined') {
    console.warn('updateDatabaseUrl 只能在 Node.js 环境中使用')
    return
  }
  
  const config = loadEnvFile(filePath)
  config.DATABASE_URL = url
  saveEnvFile(config, filePath)
}

// 更新NextAuth配置（仅在 Node.js 环境中可用）
export function updateNextAuthConfig(
  url: string, 
  secret: string, 
  filePath: string = '.env'
): void {
  if (typeof window !== 'undefined' || typeof process === 'undefined') {
    console.warn('updateNextAuthConfig 只能在 Node.js 环境中使用')
    return
  }
  
  const config = loadEnvFile(filePath)
  config.NEXTAUTH_URL = url
  config.NEXTAUTH_SECRET = secret
  saveEnvFile(config, filePath)
}

// 验证必需的环境变量
export function validateEnvConfig(config: EnvConfig): {
  valid: boolean
  missing: string[]
  errors: string[]
} {
  const missing: string[] = []
  const errors: string[] = []
  
  // 检查必需的变量
  const required = ['DATABASE_URL', 'NEXTAUTH_URL', 'NEXTAUTH_SECRET']
  required.forEach(key => {
    if (!config[key] || config[key].trim() === '') {
      missing.push(key)
    }
  })
  
  // 验证DATABASE_URL格式
  if (config.DATABASE_URL) {
    try {
      new URL(config.DATABASE_URL)
    } catch {
      errors.push('DATABASE_URL 格式无效')
    }
  }
  
  // 验证NEXTAUTH_SECRET长度
  if (config.NEXTAUTH_SECRET && config.NEXTAUTH_SECRET.length < 32) {
    errors.push('NEXTAUTH_SECRET 长度至少需要32个字符')
  }
  
  return {
    valid: missing.length === 0 && errors.length === 0,
    missing,
    errors
  }
}

// 生成随机密钥
export function generateSecret(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
