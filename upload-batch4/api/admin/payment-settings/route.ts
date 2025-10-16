import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/app/admin/actions"

// 获取支付设置
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    // 从环境变量或数据库获取支付设置
    const settings = {
      wechat: {
        enabled: process.env.WECHAT_PAY_ENABLED === 'true',
        qrCodeUrl: process.env.WECHAT_QR_CODE_URL || "",
        accountName: process.env.WECHAT_ACCOUNT_NAME || ""
      },
      alipay: {
        enabled: process.env.ALIPAY_ENABLED === 'true',
        qrCodeUrl: process.env.ALIPAY_QR_CODE_URL || "",
        accountName: process.env.ALIPAY_ACCOUNT_NAME || ""
      }
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("获取支付设置失败:", error)
    return NextResponse.json({ error: "获取支付设置失败" }, { status: 500 })
  }
}

// 保存支付设置
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { settings } = body

    if (!settings) {
      return NextResponse.json({ error: "缺少设置数据" }, { status: 400 })
    }

    // 验证设置数据
    if (settings.wechat) {
      if (settings.wechat.enabled) {
        if (!settings.wechat.qrCodeUrl || !settings.wechat.accountName) {
          return NextResponse.json({ error: "微信收款码和收款人姓名不能为空" }, { status: 400 })
        }
      }
    }

    if (settings.alipay) {
      if (settings.alipay.enabled) {
        if (!settings.alipay.qrCodeUrl || !settings.alipay.accountName) {
          return NextResponse.json({ error: "支付宝收款码和收款人姓名不能为空" }, { status: 400 })
        }
      }
    }

    // 在实际应用中，这里应该将设置保存到数据库或环境变量
    // 为了演示，我们只返回成功响应
    console.log("个人收款设置已更新:", settings)

    return NextResponse.json({ 
      success: true, 
      message: "个人收款设置保存成功" 
    })
  } catch (error) {
    console.error("保存支付设置失败:", error)
    return NextResponse.json({ error: "保存支付设置失败" }, { status: 500 })
  }
}
