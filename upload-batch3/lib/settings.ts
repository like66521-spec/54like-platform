import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// 获取单个设置值
export async function getSetting(key: string, defaultValue: string = ""): Promise<string> {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key }
    })
    return setting?.value || defaultValue
  } catch (error) {
    console.error(`获取设置 ${key} 失败:`, error)
    return defaultValue
  }
}

// 获取多个设置值
export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  try {
    const settings = await prisma.settings.findMany({
      where: {
        key: {
          in: keys
        }
      }
    })
    
    const result: Record<string, string> = {}
    settings.forEach(setting => {
      result[setting.key] = setting.value
    })
    
    return result
  } catch (error) {
    console.error("获取设置失败:", error)
    return {}
  }
}

// 获取OAuth登录设置
export async function getOAuthSettings() {
  const settings = await getSettings([
    'wechat_app_id',
    'wechat_app_secret', 
    'wechat_enabled',
    'qq_app_id',
    'qq_app_secret',
    'qq_enabled'
  ])
  
  return {
    wechat: {
      appId: settings.wechat_app_id || process.env.WECHAT_APP_ID || 'YOUR_WECHAT_APP_ID',
      appSecret: settings.wechat_app_secret || process.env.WECHAT_APP_SECRET || 'YOUR_WECHAT_APP_SECRET',
      enabled: settings.wechat_enabled === 'true'
    },
    qq: {
      appId: settings.qq_app_id || process.env.QQ_APP_ID || 'YOUR_QQ_APP_ID',
      appSecret: settings.qq_app_secret || process.env.QQ_APP_SECRET || 'YOUR_QQ_APP_SECRET',
      enabled: settings.qq_enabled === 'true'
    }
  }
}
