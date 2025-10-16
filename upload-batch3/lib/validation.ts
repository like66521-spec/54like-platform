import DOMPurify from "isomorphic-dompurify"

/**
 * 输入验证和清理工具 (防XSS, SQL注入等)
 */

/**
 * 清理HTML内容 (防XSS)
 */
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "a", "img", "blockquote", "code", "pre",
      "table", "thead", "tbody", "tr", "th", "td"
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
    ALLOW_DATA_ATTR: false,
  })
}

/**
 * 清理用户输入的文本
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, "") // 移除尖括号
    .replace(/javascript:/gi, "") // 移除javascript:协议
    .replace(/on\w+=/gi, "") // 移除事件处理器
    .replace(/data:/gi, "") // 移除data:协议
    .trim()
}

/**
 * 验证和清理邮箱
 */
export function validateAndSanitizeEmail(email: string): string | null {
  const sanitized = email.toLowerCase().trim()
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  
  if (!emailRegex.test(sanitized)) {
    return null
  }
  
  return sanitized
}

/**
 * 验证和清理URL
 */
export function validateAndSanitizeURL(url: string): string | null {
  try {
    const sanitized = url.trim()
    const parsed = new URL(sanitized)
    
    // 只允许http和https协议
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null
    }
    
    // 检查是否包含危险字符
    if (sanitized.includes("<") || sanitized.includes(">") || sanitized.includes("javascript:")) {
      return null
    }
    
    return sanitized
  } catch {
    return null
  }
}

/**
 * 验证slug (URL别名)
 */
export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

/**
 * 清理slug
 */
export function sanitizeSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-\u4e00-\u9fa5]/g, "") // 只保留字母、数字、空格、连字符和中文
    .replace(/\s+/g, "-") // 空格转连字符
    .replace(/-+/g, "-") // 多个连字符转单个
    .replace(/^-|-$/g, "") // 移除首尾连字符
}

/**
 * 验证文件名 (防路径遍历)
 */
export function validateFileName(filename: string): boolean {
  // 不允许包含路径分隔符和特殊字符
  const dangerousChars = /[\/\\<>:"|?*\x00-\x1f]/
  const pathTraversal = /\.\./
  
  return !dangerousChars.test(filename) && !pathTraversal.test(filename)
}

/**
 * 清理文件名
 */
export function sanitizeFileName(filename: string): string {
  return filename
    .replace(/[\/\\<>:"|?*\x00-\x1f]/g, "") // 移除危险字符
    .replace(/\.\./g, "") // 移除路径遍历
    .replace(/\s+/g, "_") // 空格转下划线
    .slice(0, 255) // 限制长度
}

/**
 * 验证整数
 */
export function validateInteger(value: any, min?: number, max?: number): number | null {
  const num = parseInt(value, 10)
  
  if (isNaN(num)) {
    return null
  }
  
  if (min !== undefined && num < min) {
    return null
  }
  
  if (max !== undefined && num > max) {
    return null
  }
  
  return num
}

/**
 * 验证字符串长度
 */
export function validateStringLength(str: string, min: number, max: number): boolean {
  const length = str.length
  return length >= min && length <= max
}

/**
 * 防SQL注入 - 清理查询参数
 */
export function sanitizeSQLInput(input: string): string {
  // Prisma已经自动防止SQL注入,但额外清理一层
  return input
    .replace(/['";]/g, "") // 移除SQL特殊字符
    .replace(/--/g, "") // 移除SQL注释
    .replace(/\/\*/g, "") // 移除多行注释开始
    .replace(/\*\//g, "") // 移除多行注释结束
    .trim()
}

/**
 * 验证JSON
 */
export function validateJSON(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * 清理对象中的所有字符串字段
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeText(value)
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized as T
}

/**
 * 验证请求体大小
 */
export function validateRequestSize(contentLength: string | null, maxSize: number = 10 * 1024 * 1024): boolean {
  if (!contentLength) return true // 如果没有Content-Length头,允许通过
  
  const size = parseInt(contentLength, 10)
  return !isNaN(size) && size <= maxSize
}





