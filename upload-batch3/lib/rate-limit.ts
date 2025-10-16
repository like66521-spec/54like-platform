import { NextRequest, NextResponse } from "next/server"
import { getClientIP } from "./security"

interface RateLimitConfig {
  windowMs: number // 时间窗口(毫秒)
  maxRequests: number // 最大请求数
}

class RateLimiter {
  private requests = new Map<string, number[]>()

  /**
   * 检查是否超过速率限制
   */
  check(identifier: string, config: RateLimitConfig): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now()
    const windowStart = now - config.windowMs

    // 获取该标识符的请求记录
    let timestamps = this.requests.get(identifier) || []

    // 过滤掉窗口外的请求
    timestamps = timestamps.filter(time => time > windowStart)

    // 检查是否超限
    const allowed = timestamps.length < config.maxRequests
    const remaining = Math.max(0, config.maxRequests - timestamps.length - (allowed ? 1 : 0))

    if (allowed) {
      timestamps.push(now)
      this.requests.set(identifier, timestamps)
    }

    // 计算重置时间
    const oldestTimestamp = timestamps[0] || now
    const resetAt = oldestTimestamp + config.windowMs

    return { allowed, remaining, resetAt }
  }

  /**
   * 清理过期记录
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, timestamps] of this.requests.entries()) {
      const validTimestamps = timestamps.filter(time => time > now - 3600000) // 保留1小时内的
      if (validTimestamps.length === 0) {
        this.requests.delete(key)
      } else {
        this.requests.set(key, validTimestamps)
      }
    }
  }
}

// 全局速率限制器实例
const globalLimiter = new RateLimiter()

// 定期清理过期记录
if (typeof window === "undefined") {
  setInterval(() => {
    globalLimiter.cleanup()
  }, 60000) // 每分钟清理一次
}

/**
 * API速率限制配置
 */
export const RATE_LIMITS = {
  // 严格限制 - 登录、注册等敏感操作
  strict: {
    windowMs: 15 * 60 * 1000, // 15分钟
    maxRequests: 5, // 5次请求
  },
  // 中等限制 - 一般API操作
  moderate: {
    windowMs: 60 * 1000, // 1分钟
    maxRequests: 30, // 30次请求
  },
  // 宽松限制 - 读取操作
  lenient: {
    windowMs: 60 * 1000, // 1分钟
    maxRequests: 100, // 100次请求
  },
}

/**
 * 应用速率限制
 */
export function applyRateLimit(
  request: NextRequest,
  config: RateLimitConfig = RATE_LIMITS.moderate
): NextResponse | null {
  const ip = getClientIP(request)
  const path = new URL(request.url).pathname
  const identifier = `${ip}:${path}`

  const result = globalLimiter.check(identifier, config)

  if (!result.allowed) {
    return NextResponse.json(
      {
        error: "请求过于频繁,请稍后再试",
        retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": config.maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": result.resetAt.toString(),
          "Retry-After": Math.ceil((result.resetAt - Date.now()) / 1000).toString(),
        },
      }
    )
  }

  return null // 允许通过
}

/**
 * 速率限制装饰器函数
 */
export function withRateLimit(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  config: RateLimitConfig = RATE_LIMITS.moderate
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const rateLimitResponse = applyRateLimit(request, config)
    if (rateLimitResponse) {
      return rateLimitResponse
    }
    return handler(request, ...args)
  }
}





