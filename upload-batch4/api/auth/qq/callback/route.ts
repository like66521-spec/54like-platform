import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getOAuthSettings } from "@/lib/settings"

// 创建Prisma客户端实例
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code) {
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 获取OAuth设置
    const oauthSettings = await getOAuthSettings()
    
    // 使用code换取access_token
    const tokenResponse = await fetch(
      `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${oauthSettings.qq.appId}&client_secret=${oauthSettings.qq.appSecret}&code=${code}&redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/api/auth/qq/callback`)}`,
    )
    const tokenText = await tokenResponse.text()
    const tokenParams = new URLSearchParams(tokenText)
    const accessToken = tokenParams.get("access_token")

    if (!accessToken) {
      console.error("QQ token获取失败:", tokenText)
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 获取OpenID
    const openIdResponse = await fetch(`https://graph.qq.com/oauth2.0/me?access_token=${accessToken}`)
    const openIdText = await openIdResponse.text()
    const openIdMatch = openIdText.match(/"openid":"(\w+)"/)
    const openId = openIdMatch ? openIdMatch[1] : null

    if (!openId) {
      console.error("QQ OpenID获取失败:", openIdText)
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 获取用户信息
    const userResponse = await fetch(
      `https://graph.qq.com/user/get_user_info?access_token=${accessToken}&oauth_consumer_key=${oauthSettings.qq.appId}&openid=${openId}`,
    )
    const userData = await userResponse.json()

    if (userData.ret !== 0) {
      console.error("QQ用户信息获取失败:", userData)
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 创建或更新用户
    const user = await prisma.user.upsert({
      where: { email: `qq_${openId}@qq.com` },
      update: {
        name: userData.nickname || "QQ用户",
        avatar: userData.figureurl_qq_2 || userData.figureurl_qq_1 || null,
        lastLoginAt: new Date(),
      },
      create: {
        email: `qq_${openId}@qq.com`,
        name: userData.nickname || "QQ用户",
        avatar: userData.figureurl_qq_2 || userData.figureurl_qq_1 || null,
        password: "qq_oauth", // 占位密码
        role: "USER",
        lastLoginAt: new Date(),
      },
    })

    // 重定向到登录成功页面，并传递用户信息
    const redirectUrl = new URL("/?login=success", request.url)
    redirectUrl.searchParams.set("user", user.name)
    redirectUrl.searchParams.set("provider", "qq")
    
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error("QQ回调错误:", error)
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
  }
}
