import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { applyRateLimit } from "@/lib/rate-limit"
import { sanitizeText, validateAndSanitizeEmail } from "@/lib/validation"

// 微信登录API
export async function POST(request: NextRequest) {
  try {
    // 应用速率限制
    const rateLimitResponse = applyRateLimit(request, { windowMs: 15 * 60 * 1000, maxRequests: 10 })
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const body = await request.json()
    const { code, state } = body

    if (!code) {
      return NextResponse.json({ error: "缺少授权码" }, { status: 400 })
    }

    // 调用微信API获取access_token
    const tokenResponse = await fetch(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APP_ID}&secret=${process.env.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`
    )

    const tokenData = await tokenResponse.json()

    if (tokenData.errcode) {
      return NextResponse.json({ 
        error: "微信授权失败", 
        details: tokenData.errmsg 
      }, { status: 400 })
    }

    // 获取用户信息
    const userResponse = await fetch(
      `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenData.access_token}&openid=${tokenData.openid}`
    )

    const userData = await userResponse.json()

    if (userData.errcode) {
      return NextResponse.json({ 
        error: "获取用户信息失败", 
        details: userData.errmsg 
      }, { status: 400 })
    }

    // 查找或创建用户
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: `wechat_${userData.openid}@wechat.com` },
          { name: userData.nickname }
        ]
      }
    })

    if (!user) {
      // 创建新用户
      user = await prisma.user.create({
        data: {
          email: `wechat_${userData.openid}@wechat.com`,
          name: sanitizeText(userData.nickname || "微信用户"),
          password: "wechat_login", // 微信登录用户不需要密码
          avatar: userData.headimgurl || null,
          role: "USER"
        }
      })
    } else {
      // 更新用户信息
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: sanitizeText(userData.nickname || user.name),
          avatar: userData.headimgurl || user.avatar
        }
      })
    }

    // 创建会话
    const session = await auth()
    if (session) {
      // 这里应该设置session，但NextAuth需要特殊处理
      // 暂时返回用户信息，前端处理登录状态
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      },
      message: "微信登录成功"
    })

  } catch (error) {
    console.error("微信登录错误:", error)
    return NextResponse.json({ error: "登录失败" }, { status: 500 })
  }
}

// 获取微信登录URL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const redirectUri = searchParams.get("redirect_uri") || `${process.env.NEXTAUTH_URL}/admin/login`

    const wechatAuthUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${process.env.WECHAT_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=snsapi_login&state=wechat_login#wechat_redirect`

    return NextResponse.json({
      authUrl: wechatAuthUrl
    })
  } catch (error) {
    console.error("获取微信登录URL错误:", error)
    return NextResponse.json({ error: "获取登录URL失败" }, { status: 500 })
  }
}
