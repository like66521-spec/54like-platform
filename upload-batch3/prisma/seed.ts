import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("开始初始化数据库...")

  // 创建管理员账号
  const adminPassword = await bcrypt.hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@54like.com" },
    update: {},
    create: {
      email: "admin@54like.com",
      name: "管理员",
      password: adminPassword,
      role: "SUPER_ADMIN",
      coins: 100000,
      level: 99,
      bio: "系统管理员",
    },
  })
  console.log("✓ 创建管理员账号:", admin.email)

  // 创建分类
  const categories = [
    { name: "技术", slug: "tech", description: "技术资讯与教程" },
    { name: "生活", slug: "life", description: "生活方式与文化" },
    { name: "商业", slug: "business", description: "商业分析与趋势" },
    { name: "营销", slug: "marketing", description: "营销策略与案例" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }
  console.log("✓ 创建分类:", categories.length, "个")

  // 创建菜单项
  const menuItems = [
    { label: "讨论", icon: "MessageSquare", href: "/discussion", order: 1 },
    { label: "话题", icon: "Hash", href: "/topics", order: 2 },
    { label: "商城", icon: "ShoppingCart", href: "/shop", order: 3 },
    { label: "AI助手", icon: "Heart", href: "/ai-assistant", color: "#ff1744", order: 4 },
    { label: "交流群", icon: "MessageCircle", href: "/community", color: "#00bcd4", order: 5 },
  ]

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.label },
      update: {},
      create: { id: item.label, ...item },
    })
  }
  console.log("✓ 创建菜单项:", menuItems.length, "个")

  // 创建系统设置
  const settings = [
    { key: "site_name", value: "54LIKE", label: "网站名称", group: "general", order: 1 },
    {
      key: "site_description",
      value: "发现优质内容，分享知识与见解",
      label: "网站描述",
      type: "textarea",
      group: "general",
      order: 2,
    },
    { key: "site_url", value: "https://54like.com", label: "网站URL", group: "general", order: 3 },
    { key: "contact_email", value: "contact@54like.com", label: "联系邮箱", group: "general", order: 4 },
    { key: "enable_registration", value: "true", label: "开放注册", type: "boolean", group: "system", order: 1 },
    { key: "enable_comments", value: "true", label: "启用评论", type: "boolean", group: "system", order: 2 },
    { key: "default_user_coins", value: "100", label: "新用户初始硬币", type: "number", group: "system", order: 3 },
  ]

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }
  console.log("✓ 创建系统设置:", settings.length, "个")

  console.log("✅ 数据库初始化完成!")
  console.log("\n登录信息:")
  console.log("邮箱: admin@54like.com")
  console.log("密码: admin123")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ 初始化失败:", e)
    await prisma.$disconnect()
    process.exit(1)
  })


