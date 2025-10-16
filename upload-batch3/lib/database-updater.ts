import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// 数据库配置接口
export interface DatabaseConfig {
  type: 'mysql' | 'postgresql' | 'sqlite'
  host?: string
  port?: number
  username?: string
  password?: string
  database: string
  url: string
}

// 需要更新的文件列表
const FILES_TO_UPDATE = [
  '.env',
  '.env.local',
  '.env.production',
  'prisma/schema.prisma',
  'lib/prisma.ts',
  'lib/database-config.ts',
  'next.config.mjs',
  'package.json'
]

// 更新环境变量文件
export function updateEnvFiles(config: DatabaseConfig): void {
  console.log('📝 更新环境变量文件...')
  
  const envContent = generateEnvContent(config)
  
  // 更新 .env 文件
  updateFile('.env', envContent)
  
  // 更新 .env.local 文件
  updateFile('.env.local', envContent)
  
  // 更新 .env.production 文件
  const prodContent = generateEnvContent(config, true)
  updateFile('.env.production', prodContent)
  
  console.log('✅ 环境变量文件已更新')
}

// 更新 Prisma Schema
export function updatePrismaSchema(config: DatabaseConfig): void {
  console.log('🔧 更新 Prisma Schema...')
  
  const schemaPath = 'prisma/schema.prisma'
  let schemaContent = fs.readFileSync(schemaPath, 'utf-8')
  
  // 更新数据库提供者
  schemaContent = schemaContent.replace(
    /provider\s*=\s*"[^"]*"/,
    `provider = "${config.type}"`
  )
  
  // 更新数据库URL
  schemaContent = schemaContent.replace(
    /url\s*=\s*env\("DATABASE_URL"\)/,
    'url      = env("DATABASE_URL")'
  )
  
  fs.writeFileSync(schemaPath, schemaContent)
  console.log('✅ Prisma Schema 已更新')
}

// 更新 Prisma 客户端配置
export function updatePrismaClient(config: DatabaseConfig): void {
  console.log('🔧 更新 Prisma 客户端配置...')
  
  const prismaPath = 'lib/prisma.ts'
  let prismaContent = fs.readFileSync(prismaPath, 'utf-8')
  
  // 更新数据库连接配置
  const newConfig = `export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL || process.env.DATABASE_URL || '${config.url}'
    }
  }
})`
  
  prismaContent = prismaContent.replace(
    /export const prisma = globalForPrisma\.prisma \?\? new PrismaClient\([^}]*\}\)/s,
    newConfig
  )
  
  fs.writeFileSync(prismaPath, prismaContent)
  console.log('✅ Prisma 客户端配置已更新')
}

// 更新数据库配置管理文件
export function updateDatabaseConfig(config: DatabaseConfig): void {
  console.log('🔧 更新数据库配置管理文件...')
  
  const configPath = 'lib/database-config.ts'
  let configContent = fs.readFileSync(configPath, 'utf-8')
  
  // 添加默认配置
  const defaultConfig = `
// 默认数据库配置
export const DEFAULT_DATABASE_CONFIG: DatabaseConfig = {
  type: '${config.type}',
  host: '${config.host || 'localhost'}',
  port: ${config.port || 3306},
  username: '${config.username || ''}',
  password: '${config.password || ''}',
  database: '${config.database}',
  url: '${config.url}'
}`
  
  // 在文件末尾添加默认配置
  if (!configContent.includes('DEFAULT_DATABASE_CONFIG')) {
    configContent += defaultConfig
    fs.writeFileSync(configPath, configContent)
  }
  
  console.log('✅ 数据库配置管理文件已更新')
}

// 更新 Next.js 配置
export function updateNextConfig(config: DatabaseConfig): void {
  console.log('🔧 更新 Next.js 配置...')
  
  const nextConfigPath = 'next.config.mjs'
  if (fs.existsSync(nextConfigPath)) {
    let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8')
    
    // 添加数据库相关环境变量
    const dbEnvConfig = `
// 数据库配置
env: {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
},`
    
    if (!nextConfigContent.includes('DATABASE_URL')) {
      nextConfigContent = nextConfigContent.replace(
        /export default config/,
        `${dbEnvConfig}\nexport default config`
      )
      fs.writeFileSync(nextConfigPath, nextConfigContent)
    }
  }
  
  console.log('✅ Next.js 配置已更新')
}

// 更新 package.json 脚本
export function updatePackageJson(config: DatabaseConfig): void {
  console.log('🔧 更新 package.json 脚本...')
  
  const packageJsonPath = 'package.json'
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  
  // 添加数据库相关脚本
  const dbScripts = {
    'db:setup': 'node scripts/setup-mysql.js',
    'db:reset': 'npx prisma db push --force-reset',
    'db:seed': 'npx prisma db seed',
    'db:status': 'node scripts/check-database.js',
    'db:backup': `mysqldump -h${config.host} -P${config.port} -u${config.username} -p${config.password} ${config.database} > backup.sql`
  }
  
  packageJson.scripts = { ...packageJson.scripts, ...dbScripts }
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('✅ package.json 脚本已更新')
}

// 生成环境变量内容
function generateEnvContent(config: DatabaseConfig, isProduction = false): string {
  const baseUrl = isProduction ? 'https://yourdomain.com' : 'http://localhost:3002'
  
  return `# 数据库配置 - ${config.type.toUpperCase()}
DATABASE_URL="${config.url}"

# NextAuth 配置
NEXTAUTH_URL="${baseUrl}"
NEXTAUTH_SECRET="${generateSecret()}"

# 网站配置
NEXT_PUBLIC_SITE_URL="${baseUrl}"
NEXT_PUBLIC_SITE_NAME="54LIKE"

# 支付配置 (可选)
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# 邮件配置 (可选)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM="noreply@54like.com"

# 第三方登录 (可选)
WECHAT_APP_ID=""
WECHAT_APP_SECRET=""
QQ_APP_ID=""
QQ_APP_SECRET=""
`
}

// 更新文件
function updateFile(filePath: string, content: string): void {
  // 备份现有文件
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.backup.${Date.now()}`
    fs.copyFileSync(filePath, backupPath)
    console.log(`📁 已备份 ${filePath} 到 ${backupPath}`)
  }
  
  fs.writeFileSync(filePath, content)
}

// 生成随机密钥
function generateSecret(length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 主更新函数
export function updateAllDatabaseFiles(config: DatabaseConfig): void {
  console.log('🚀 开始更新所有数据库相关文件...\n')
  
  try {
    updateEnvFiles(config)
    updatePrismaSchema(config)
    updatePrismaClient(config)
    updateDatabaseConfig(config)
    updateNextConfig(config)
    updatePackageJson(config)
    
    console.log('\n🎉 所有文件已成功更新！')
    console.log('📝 请运行以下命令重新生成 Prisma 客户端:')
    console.log('   npx prisma generate')
    console.log('   npx prisma db push')
    
  } catch (error) {
    console.error('❌ 更新文件时出错:', error)
    throw error
  }
}



