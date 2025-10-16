import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"

/**
 * 密码安全工具
 */
export class PasswordSecurity {
  // 密码最小长度
  static MIN_LENGTH = 8
  
  // 密码强度要求
  static REQUIREMENTS = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  }

  /**
   * 加密密码
   */
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12) // 使用12轮加密,更安全
    return bcrypt.hash(password, salt)
  }

  /**
   * 验证密码
   */
  static async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  /**
   * 验证密码强度
   */
  static validateStrength(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (password.length < this.REQUIREMENTS.minLength) {
      errors.push(`密码长度至少${this.REQUIREMENTS.minLength}位`)
    }

    if (this.REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push("密码必须包含大写字母")
    }

    if (this.REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
      errors.push("密码必须包含小写字母")
    }

    if (this.REQUIREMENTS.requireNumbers && !/\d/.test(password)) {
      errors.push("密码必须包含数字")
    }

    if (this.REQUIREMENTS.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("密码必须包含特殊字符")
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * 生成安全的随机密码
   */
  static generateSecure(length: number = 16): string {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const special = "!@#$%^&*"
    const all = uppercase + lowercase + numbers + special

    let password = ""
    // 确保至少包含每种字符
    password += uppercase[Math.floor(Math.random() * uppercase.length)]
    password += lowercase[Math.floor(Math.random() * lowercase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += special[Math.floor(Math.random() * special.length)]

    // 填充剩余长度
    for (let i = password.length; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)]
    }

    // 打乱顺序
    return password.split("").sort(() => Math.random() - 0.5).join("")
  }
}

/**
 * 登录尝试限制 (防暴力破解)
 */
export class LoginRateLimiter {
  private static attempts = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>()
  
  // 配置
  static MAX_ATTEMPTS = 5 // 最大尝试次数
  static WINDOW_MS = 15 * 60 * 1000 // 15分钟窗口
  static LOCK_DURATION_MS = 30 * 60 * 1000 // 锁定30分钟

  /**
   * 检查是否被锁定
   */
  static isLocked(identifier: string): boolean {
    const record = this.attempts.get(identifier)
    if (!record) return false

    if (record.lockedUntil && Date.now() < record.lockedUntil) {
      return true
    }

    // 锁定期已过,清除记录
    if (record.lockedUntil && Date.now() >= record.lockedUntil) {
      this.attempts.delete(identifier)
      return false
    }

    return false
  }

  /**
   * 记录失败尝试
   */
  static recordFailedAttempt(identifier: string): { locked: boolean; remainingAttempts: number; lockedUntil?: number } {
    const now = Date.now()
    const record = this.attempts.get(identifier)

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now })
      return { locked: false, remainingAttempts: this.MAX_ATTEMPTS - 1 }
    }

    // 如果超过窗口期,重置计数
    if (now - record.lastAttempt > this.WINDOW_MS) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now })
      return { locked: false, remainingAttempts: this.MAX_ATTEMPTS - 1 }
    }

    // 增加失败次数
    record.count++
    record.lastAttempt = now

    // 检查是否达到锁定阈值
    if (record.count >= this.MAX_ATTEMPTS) {
      record.lockedUntil = now + this.LOCK_DURATION_MS
      return { 
        locked: true, 
        remainingAttempts: 0,
        lockedUntil: record.lockedUntil
      }
    }

    return { 
      locked: false, 
      remainingAttempts: this.MAX_ATTEMPTS - record.count 
    }
  }

  /**
   * 记录成功登录(清除失败记录)
   */
  static recordSuccessfulLogin(identifier: string): void {
    this.attempts.delete(identifier)
  }

  /**
   * 获取剩余锁定时间(秒)
   */
  static getRemainingLockTime(identifier: string): number {
    const record = this.attempts.get(identifier)
    if (!record || !record.lockedUntil) return 0

    const remaining = Math.ceil((record.lockedUntil - Date.now()) / 1000)
    return remaining > 0 ? remaining : 0
  }
}

/**
 * 生成安全的Token
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString("hex")
}

/**
 * 清理和验证输入 (防XSS)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // 移除尖括号
    .replace(/javascript:/gi, "") // 移除javascript:协议
    .replace(/on\w+=/gi, "") // 移除事件处理器
    .trim()
}

/**
 * 验证邮箱格式
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证URL格式
 */
export function validateURL(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

/**
 * IP地址验证和清理
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return "unknown"
}





