// Database types for the blog platform
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: Date
}

export interface Author {
  id: string
  name: string
  avatar?: string
  bio?: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string // 可以使用 <!--PAID_CONTENT--> 分隔免费和付费内容
  coverImage?: string
  images: string // JSON string for image URLs
  categoryId: string
  category?: Category
  authorId: string
  author?: Author
  isPaid: boolean // 是否包含付费内容
  price?: number // 付费内容价格
  views: number
  likes: number
  comments?: number
  isPinned?: boolean
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  articleId: string
  userId: string
  amount: number
  method: "wechat" | "alipay"
  status: "pending" | "completed" | "failed"
  transactionId?: string
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
}

// Article display types
export type ArticleLayout = "no-image" | "single-image" | "multi-image"

// Menu and widget types
export interface MenuItem {
  id: string
  label: string
  icon?: string
  href?: string
  color?: string
  order: number
  isActive: boolean
  createdAt: Date
}

export interface SidebarWidget {
  id: string
  type: "html" | "image" | "hot-articles" | "latest-articles" | "links" | "user-rank"
  title: string
  content?: string // For HTML widget
  imageUrl?: string // For image widget
  linkUrl?: string // For image widget link
  articles?: Article[] // For article widgets
  links?: { name: string; url: string }[] // For links widget
  order: number
  isActive: boolean
  createdAt: Date
}
