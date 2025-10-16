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
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${oauthSettings.wechat.appId}&secret=${oauthSettings.wechat.appSecret}&code=${code}&grant_type=authorization_code`,
    )
    const tokenData = await tokenResponse.json()

    if (tokenData.errcode) {
      console.error("微信token获取失败:", tokenData)
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 获取用户信息
    const userResponse = await fetch(
      `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenData.access_token}&openid=${tokenData.openid}`,
    )
    const userData = await userResponse.json()

    if (userData.errcode) {
      console.error("微信用户信息获取失败:", userData)
      return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
    }

    // 创建或更新用户
    const user = await prisma.user.upsert({
      where: { email: `wechat_${tokenData.openid}@wechat.com` },
      update: {
        name: userData.nickname || "微信用户",
        avatar: userData.headimgurl || null,
        lastLoginAt: new Date(),
      },
      create: {
        email: `wechat_${tokenData.openid}@wechat.com`,
        name: userData.nickname || "微信用户",
        avatar: userData.headimgurl || null,
        password: "wechat_oauth", // 占位密码
        role: "USER",
        lastLoginAt: new Date(),
      },
    })

    // 重定向到登录成功页面，并传递用户信息
    const redirectUrl = new URL("/?login=success", request.url)
    redirectUrl.searchParams.set("user", user.name)
    redirectUrl.searchParams.set("provider", "wechat")
    
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error("微信回调错误:", error)
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
  }
}
