import { NextResponse } from "next/server"
import { getOAuthSettings } from "@/lib/settings"

export async function POST() {
  try {
    // 获取OAuth设置
    const oauthSettings = await getOAuthSettings()
    
    // 检查QQ登录是否启用
    if (!oauthSettings.qq.enabled) {
      return NextResponse.json({ error: "QQ登录未启用" }, { status: 400 })
    }
    
    // QQ OAuth配置
    const appId = oauthSettings.qq.appId
    const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/api/auth/qq/callback`)
    const state = Math.random().toString(36).substring(7)

    // 构建QQ授权URL
    const authUrl = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=${state}&scope=get_user_info`

    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error("QQ登录错误:", error)
    return NextResponse.json({ error: "登录失败" }, { status: 500 })
  }
}
