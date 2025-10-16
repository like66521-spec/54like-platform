import type { Article, Category, Author, MenuItem, SidebarWidget } from "./types"

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "科技",
    slug: "tech",
    description: "科技资讯与评论",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "生活",
    slug: "life",
    description: "生活方式与文化",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    name: "商业",
    slug: "business",
    description: "商业分析与趋势",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    name: "设计",
    slug: "design",
    description: "设计灵感与教程",
    createdAt: new Date("2024-01-01"),
  },
]

export const mockAuthors: Author[] = [
  {
    id: "1",
    name: "opuliya88680",
    avatar: "/author-avatar.png",
    bio: "专注跨境电商和数字营销",
  },
  {
    id: "2",
    name: "一个乙天",
    avatar: "/author-avatar-2.jpg",
    bio: "8年老机场运营经验",
  },
  {
    id: "3",
    name: "admin",
    avatar: "/author-avatar-3.jpg",
    bio: "网站管理员",
  },
  {
    id: "4",
    name: "techGuru",
    avatar: "/author-avatar.png",
    bio: "技术专家",
  },
]

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "每天都有C免费批量分享。天天都有惊喜。",
    slug: "daily-free-batch-sharing",
    excerpt:
      "每天都有C分享。天天都有惊喜。原来在我这边买过真了在何的互动的相思人员。。可以直接来需要再次购买，直接来找我一下，免费批量...",
    content: `# 每天都有C免费批量分享

## 前言

每天都有C分享。天天都有惊喜。原来在我这边买过真了在何的互动的相思人员，可以直接来需要再次购买，直接来找我一下，免费批量。

## 详细内容

这是一篇关于资源分享的文章。我们会定期更新各种有价值的资源，帮助大家在工作和学习中提升效率。

### 主要内容包括

- 每日更新的优质资源
- 实用工具推荐
- 操作技巧分享
- 问题解答和支持

### 获取方式

如果你之前购买过我们的服务，现在可以免费获取这些资源。只需要联系我们，我们会为你提供批量下载链接。

## 总结

我们致力于为用户提供最优质的服务和资源。感谢大家的支持！`,
    images: "",
    categoryId: "1",
    category: mockCategories[0],
    authorId: "1",
    author: mockAuthors[0],
    isPaid: false,
    isPinned: true,
    views: 35,
    likes: 1,
    comments: 2,
    publishedAt: new Date("2024-01-15T10:25:00"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "推荐个用了8年的老机场",
    slug: "8-year-old-airport-recommendation",
    excerpt:
      "这个机场我已经用了8年了，节点多，速度快，可解锁各大流媒体/ChatGPT，最关键的时候稳定，并全部时候也不掉链子，支持多种协议，全球节点覆盖，连年使用多年，口碑极好，支持多种协议，全球节点覆盖，连年使用多年，口碑极好，技术支持到位。",
    content: `# 推荐个用了8年的老机场

## 使用体验

这个机场我已经用了8年了，节点多，速度快，可解锁各大流媒体/ChatGPT。最关键的是稳定，无论什么时候都不掉链子。

## 主要特点

- **稳定性强**：8年使用经验，几乎零故障
- **节点丰富**：全球多个国家和地区的节点
- **速度快**：高速专线，看4K视频无压力
- **支持多协议**：Shadowsocks、V2Ray、Trojan等
- **解锁能力强**：Netflix、Disney+、ChatGPT全部可用

## 使用建议

建议选择年付套餐，性价比最高。客服响应速度也很快，有问题基本都能及时解决。

## 总结

用了这么多年，确实是最稳定的一个。强烈推荐给需要的朋友！`,
    categoryId: "1",
    category: mockCategories[0],
    authorId: "2",
    author: mockAuthors[1],
    isPaid: false,
    views: 59700,
    likes: 3,
    comments: 6,
    publishedAt: new Date("2023-09-07T11:13:00"),
    createdAt: new Date("2023-09-07"),
    updatedAt: new Date("2023-09-07"),
  },
  {
    id: "3",
    title: "TG 飞机打广告，引流工具，群发软件。",
    slug: "telegram-ads-tool",
    excerpt:
      "低价引流，自动打广告软件，自动加群，群发软件，有想打广告的朋友过来，只需要TG协议号可以联系我我。专业的TG营销工具，支持批量操作，自动化管理，提高工作效率。适合各类营销需求，价格实惠，效果显著。",
    content: `# TG飞机营销工具全攻略

## 工具介绍

专业的Telegram营销工具，支持自动打广告、批量加群、群发消息等功能。适合各类营销需求，价格实惠，效果显著。

## 主要功能

- **自动打广告**：自动在群组和频道中发布广告
- **批量加群**：自动搜索并加入目标群组
- **群发软件**：一键群发消息给所有联系人
- **自动回复**：设置关键词自动回复
- **数据统计**：实时查看营销效果

<!--PAID_CONTENT-->

## 使用教程（付费内容 ¥99）

### 第一步：获取TG协议号

首先你需要准备一个TG协议号，这是使用工具的前提...

### 第二步：配置工具参数

打开工具后，需要配置以下参数：
- API ID 和 API Hash
- 目标群组链接
- 广告文案内容
- 发送间隔时间

### 第三步：开始营销

配置完成后，点击"开始运行"按钮，工具会自动执行任务...

### 高级技巧

1. 如何避免被封号
2. 最佳发送时间段
3. 文案撰写技巧
4. 群组筛选策略

### 工具下载链接

购买后提供最新版本下载链接和详细使用手册。

## 价格说明

- 月卡：¥99
- 季卡：¥259（优惠40元）
- 年卡：¥899（优惠289元）`,
    images: JSON.stringify(["/telegram-advertising-dashboard.jpg", "/analytics-chart.png", "/vpn-proxy-network.jpg"]),
    categoryId: "1",
    category: mockCategories[0],
    authorId: "1",
    author: mockAuthors[0],
    isPaid: true,
    price: 99,
    views: 2300,
    likes: 5,
    comments: 6,
    publishedAt: new Date("2024-10-10T12:28:00"),
    createdAt: new Date("2024-10-10"),
    updatedAt: new Date("2024-10-10"),
  },
  {
    id: "4",
    title: "Facebook 最新制作余额号 完整图片教程，增强绑卡机率，充...",
    slug: "facebook-balance-account-tutorial",
    excerpt:
      "老教程依然有效，新教程更加详细和完整，充值或可以让你成功率更高！美卡有的制作方法内容都在下面了，详细步骤配图说明，新手也能轻松上手。包含所有注意事项和常见问题解决方案。跟着教程一步步操作，成功率大大提升。",
    content: `# Facebook余额号制作教程

## 前言

老教程依然有效，新教程更加详细和完整。本教程将教你如何制作Facebook余额号，提高绑卡成功率！

## 准备工作

在开始之前，你需要准备：
- 一个新注册的Facebook账号（最好养号3-7天）
- 一张美国虚拟信用卡
- 稳定的代理IP（美国原生IP最佳）
- 手机号码（用于接收验证码）

## 基础步骤（免费部分）

### 1. 账号准备
- 完善个人资料
- 添加几个好友
- 发布1-2条动态
- 加入几个兴趣小组

### 2. 创建广告账户
进入Business Manager，按照提示创建广告账户...

<!--PAID_CONTENT-->

## 核心教程（付费 ¥199）

### 3. 制作余额号的关键步骤

这是最关键的部分，按照以下步骤操作，成功率可达90%以上：

**步骤一：设置BM**
1. 打开Business Manager设置
2. 配置支付方式（重点！）
3. 添加付款信息的正确顺序
4. 避免触发风控的技巧

**步骤二：绑卡技巧**
1. 最佳绑卡时间段
2. 卡片信息填写格式
3. 地址匹配技巧
4. CVV验证通过方法

**步骤三：充值操作**
1. 首次充值金额建议
2. 充值间隔时间
3. 余额激活方法
4. 常见错误码解决

### 4. 高级技巧

- 如何提高账号稳定性
- 批量制作余额号的方法
- 账号被封后的申诉技巧
- 长期养号策略

### 5. 常见问题解决

Q: 绑卡时提示"支付方式被拒绝"怎么办？
A: ...（详细解答）

Q: 充值成功但余额没到账？  
A: ...（详细解答）

### 6. 附赠资源

- 最新可用虚拟卡渠道
- BM设置截图详解
- 自动化工具推荐
- 私密交流群邀请

## 总结

按照本教程操作，成功率可达90%以上。有任何问题欢迎在评论区留言！`,
    images: JSON.stringify(["/facebook-business-manager-dashboard.jpg"]),
    categoryId: "3",
    category: mockCategories[2],
    authorId: "3",
    author: mockAuthors[2],
    isPaid: true,
    price: 199,
    views: 8200,
    likes: 123,
    comments: 45,
    publishedAt: new Date("2024-01-13T15:42:00"),
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
  {
    id: "5",
    title: "一个一般没有封禁的跑FB的代理",
    slug: "stable-facebook-proxy",
    excerpt:
      "推荐一个稳定的Facebook代理服务，使用多年基本没有遇到过封禁问题。支持多个地区IP切换，速度快，延迟低。特别适合需要长期稳定运营FB账号的用户。提供7天免费试用，满意后再付费。已有超过500+用户在使用，好评率98%以上。",
    content: `# 稳定的Facebook代理推荐

## 为什么需要专用代理

做Facebook营销，最怕的就是IP被封。普通的VPN或代理很容易被Facebook检测到，导致账号受限甚至封号。

## 我的使用经验

这个代理服务我已经用了3年多，基本没遇到过封禁问题。主要优势：

### 稳定性

- **高可用性**：99.9%在线时间
- **低封号率**：使用原生住宅IP
- **智能切换**：自动检测并切换异常IP

### 速度表现

- **低延迟**：平均延迟50ms以下
- **高带宽**：支持多账号同时运行
- **无限流量**：不限制使用流量

### 支持地区

- 美国（多个州可选）
- 英国
- 加拿大
- 澳大利亚
- 欧洲主要国家

## 使用建议

1. **选择地区**：根据目标客户所在地选择对应IP
2. **固定IP**：长期运营建议使用固定IP
3. **定期更换**：如果做多账号，建议每个账号独立IP
4. **配合指纹浏览器**：效果更佳

## 价格套餐

- 月付：$29/月
- 季付：$79/季（优惠8美金）
- 年付：$289/年（优惠59美金）

## 试用方式

提供7天免费试用，无需信用卡。试用满意后再付费，非常人性化。

## 购买链接

[点击这里获取7天免费试用](https://example.com)

## 总结

如果你在找稳定的Facebook代理，这个是我用过最好的。强烈推荐！`,
    images: JSON.stringify(["/vpn-proxy-network.jpg"]),
    categoryId: "1",
    category: mockCategories[0],
    authorId: "4",
    author: mockAuthors[3],
    isPaid: false,
    views: 3876,
    likes: 78,
    comments: 23,
    publishedAt: new Date("2024-01-12T09:15:00"),
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "6",
    title: "有偿提供注册和购买Midjourney账号的服务",
    slug: "midjourney-account-service",
    excerpt:
      "提供专业的Midjourney账号注册和购买服务。由于Midjourney官方限制了部分地区的注册，很多朋友无法正常使用。我们提供一站式解决方案，包括账号注册、订阅付费、使用教程等。所有账号均为正规渠道获取，安全可靠。支持多种套餐选择。",
    content: `# Midjourney账号注册服务

由于Midjourney官方限制了部分地区的注册，很多国内朋友无法正常使用这个强大的AI绘画工具。我们提供一站式解决方案，让你轻松使用Midjourney。

## 我们的服务

- 全程代注册，使用海外IP
- 确保账号安全，立即可用
- 基础版：$10/月 | 标准版：$30/月 | 专业版：$60/月

## 购买流程

1. 联系客服说明需求
2. 选择合适的套餐
3. 支付宝/微信付款
4. 1小时内交付账号

正规渠道，快速交付，售后保障，7天内免费换号。新手也能快速上手！`,
    images: JSON.stringify(["/abstract-ai-art.png"]),
    categoryId: "4",
    category: mockCategories[3],
    authorId: "1",
    author: mockAuthors[0],
    isPaid: true,
    price: 49,
    views: 6543,
    likes: 178,
    comments: 56,
    publishedAt: new Date("2024-01-10T14:20:00"),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "7",
    title: "9月29号最新FB商务管理平台开户方法",
    slug: "facebook-business-manager-setup",
    excerpt:
      "最新更新的Facebook商务管理平台开户完整教程。Facebook的政策经常变化，这是2024年9月29号最新的开户方法。包括账号准备、资料填写、审核技巧等详细步骤。特别注意了一些容易被拒的细节问题，帮助大家提高通过率。同时也分享了开户后的账号养护技巧。",
    content: `# Facebook商务管理平台开户指南（2024最新）

Facebook的政策经常变化，这是2024年9月29号最新的开户方法。按照本教程操作，通过率可达95%以上。

## 准备工作
- Facebook个人账号（注册30天以上）
- 营业执照或个人身份证  
- 绑定的支付方式
- 稳定的网络环境

## 开户步骤

### 第一步：创建BM账户
1. 访问 business.facebook.com
2. 点击"创建账户"
3. 填写企业信息（企业名称要与营业执照一致，地址填写要详细）

### 第二步：验证身份
上传证件注意事项：证件要清晰完整、确保没有反光、文字信息可识别、建议使用扫描件

### 第三步：添加支付方式  
- 先不要急着投广告
- 绑定国内信用卡即可
- 地址信息要匹配

## 常见问题

**Q: 审核不通过怎么办？**
A: 检查资料是否完整，可以重新提交

**Q: 审核通过后多久能投广告？**
A: 建议先养号3-5天

按照本教程操作，成功率很高！`,
    images: JSON.stringify(["/account-setup.jpg"]),
    categoryId: "3",
    category: mockCategories[2],
    authorId: "3",
    author: mockAuthors[2],
    isPaid: false,
    isPinned: true,
    views: 9876,
    likes: 267,
    comments: 89,
    publishedAt: new Date("2024-09-29T16:30:00"),
    createdAt: new Date("2024-09-29"),
    updatedAt: new Date("2024-09-29"),
  },
  {
    id: "8",
    title: "最新Instagram营销工具推荐",
    slug: "instagram-marketing-tools",
    excerpt:
      "分享几款好用的Instagram营销工具，包括自动点赞、自动关注、数据分析等功能。这些工具可以大大提高你的Instagram运营效率，帮助你快速增长粉丝。所有工具都经过实测，安全可靠。适合个人博主和企业账号使用。提供详细的使用教程和技巧分享。",
    content: `# Instagram营销工具推荐

分享几款我常用的Instagram营销工具，都是经过实测验证的。

## 1. Later - 内容排期工具
- 可视化内容日历、批量上传图片、自动发布、数据分析
- 价格：免费版够用，付费版$18/月

## 2. Canva - 图片设计
- 海量模板、简单易用、支持中文、免费素材
- 价格：免费版功能强大，Pro版$12.99/月

## 3. Hashtag Expert - 标签工具
- 智能推荐标签、分析标签热度、查看竞品标签、保存标签组  
- 价格：$9.99/月

## 4. Iconosquare - 数据分析
- 详细数据报告、竞品分析、粉丝洞察、最佳发布时间
- 价格：14天免费试用，$49/月起

## 使用建议
1. 新手先用免费工具
2. 有一定粉丝后再用付费工具  
3. 定期分析数据优化策略
4. 工具只是辅助，内容最重要

选对工具可以大大提升运营效率！`,
    images: JSON.stringify(["/analytics-chart.png"]),
    categoryId: "1",
    category: mockCategories[0],
    authorId: "2",
    author: mockAuthors[1],
    isPaid: false,
    views: 4521,
    likes: 156,
    comments: 34,
    publishedAt: new Date("2024-01-08T11:45:00"),
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: "9",
    title: "Google Ads完整投放教程：从0到日入$500",
    slug: "google-ads-complete-guide",
    excerpt:
      "手把手教你如何通过Google Ads投放广告赚钱。包括账号注册、广告创建、关键词选择、出价策略、数据分析等全流程。分享我如何从新手做到日入$500的实战经验。附带真实案例和ROI优化技巧，帮助你快速上手并盈利。",
    content: `# Google Ads完整投放教程：从0到日入$500

## 前言

大家好，我是一名专注Google Ads投放的数字营销从业者。经过3年的实战经验，我的广告账户已经实现稳定盈利，日均收入在$500左右。今天我将毫无保留地分享我的完整投放策略。

## 第一部分：账号准备（免费内容）

### 1. 注册Google Ads账号

首先，你需要准备：
- 一个Google账号（Gmail）
- 一张国际信用卡（Visa/Mastercard）
- 一个落地页网站

访问 ads.google.com，点击"立即开始"按钮，按照提示完成注册。

**重要提示：** 新账号通常会有$500的广告赠金，记得领取！

### 2. 账号设置优化

注册完成后，先不要急着创建广告，需要先完善这些设置：
- 设置正确的时区和货币
- 绑定Google Analytics（必做！）
- 设置转化追踪代码
- 配置账号结构

### 3. 前期准备工作

在正式投放前，你需要：
- 研究竞争对手的广告
- 准备至少10组广告素材
- 设定每日预算（建议$50起步）
- 明确你的目标ROI

<!--PAID_CONTENT-->

## 第二部分：核心投放策略（付费内容 ¥299）

### 4. 关键词研究的终极方法

这是我用了2年时间总结出来的关键词挖掘策略，帮我找到了上百个高转化、低竞争的关键词...

**关键词选择的3个黄金法则：**
1. 长尾关键词优先策略
2. 竞争度分析公式：...
3. 出价甜蜜点计算方法：...

### 5. 广告文案撰写秘籍

转化率从2%提升到8%的文案模板...

**我的高转化文案公式：**
- 标题：[数字] + [动词] + [结果] + [时间]
- 描述1：痛点 + 解决方案
- 描述2：社会证明 + CTA

### 6. 出价策略（重点！）

这是最关键的部分，很多人就是因为出价策略不对导致血本无归...

**我的出价策略矩阵：**
- 新广告组：手动CPC，起始价$0.5
- 测试期（7天）：每天调整2-3次
- 稳定期：切换到目标CPA
- 扩量期：...

### 7. 落地页优化

一个好的落地页能让你的转化率翻3倍...

**我的落地页结构：**
- 首屏：5秒原则设计
- 信任背书：客户案例展示技巧
- CTA按钮：颜色、文案、位置的黄金组合

### 8. ROI优化技巧

这是我每天必做的优化动作...

**每日优化清单：**
- 早上8点：检查昨日数据，暂停ROI<1的关键词
- 中午12点：...
- 晚上8点：...

### 9. 实战案例分析

案例1：如何用$1000预算测试出爆款产品
- 详细的投放数据截图
- 完整的优化过程记录
- ROI从0.3到4.5的转变过程

案例2：我的第一个日入$500的广告系列
- 完整的后台设置截图
- 关键词和出价表格
- 30天数据变化曲线

### 10. 进阶技巧

- 再营销广告的正确玩法
- 如何用$10找到高价值受众
- 自动化规则设置模板
- 扩量不降ROI的秘密

## 附赠资源

购买后你将获得：
- Google Ads投放检查清单（Excel）
- 50个高转化文案模板
- 10个落地页设计案例
- 我的每日优化工作表
- 私密社群名额（价值$199）

---

**限时优惠：** 原价 ¥499，现价 ¥299
**购买后永久有效，免费更新**`,
    images: JSON.stringify(["/analytics-chart.png", "/account-setup.jpg"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "1",
    author: mockAuthors[0],
    isPaid: true,
    price: 299,
    views: 15680,
    likes: 432,
    comments: 156,
    publishedAt: new Date("2024-01-07T09:30:00"),
    createdAt: new Date("2024-01-07"),
    updatedAt: new Date("2024-01-07"),
  },
  {
    id: "10",
    title: "Facebook Ads投放避坑指南：新手必看的10个错误",
    slug: "facebook-ads-mistakes-to-avoid",
    excerpt:
      "总结了Facebook广告投放中最常见的10个错误，每一个都可能让你损失数千美元。包括受众定位错误、预算分配不当、落地页优化不足、像素安装问题等。通过避免这些错误，你的广告ROI至少能提升50%以上。真实案例解析，血泪经验分享。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/facebook-business-manager-dashboard.jpg"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "3",
    author: mockAuthors[2],
    isPaid: false,
    views: 23450,
    likes: 678,
    comments: 234,
    publishedAt: new Date("2024-01-06T14:20:00"),
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-06"),
  },
  {
    id: "11",
    title: "TikTok Ads暴力起号：7天GMV破10万美金实操",
    slug: "tiktok-ads-fast-scaling",
    excerpt:
      "TikTok现在是最值得投放的平台！流量便宜，转化率高。我用7天时间把一个新店铺做到GMV 10万美金。详细分享选品策略、素材制作、广告投放、数据优化全流程。包含真实后台数据截图和广告素材案例。现在进入还不晚，抓住红利期！",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/analytics-chart.png", "/earning-navigation-banner.jpg"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "2",
    author: mockAuthors[1],
    isPaid: true,
    price: 399,
    views: 34567,
    likes: 1234,
    comments: 456,
    publishedAt: new Date("2024-01-05T16:45:00"),
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "12",
    title: "YouTube联盟营销月入过万：我的完整策略",
    slug: "youtube-affiliate-marketing-strategy",
    excerpt:
      "通过YouTube做联盟营销（Affiliate Marketing）是最稳定的被动收入方式之一。我的频道现在每月稳定收入1.5万美金，其中70%来自联盟佣金。分享选品策略、视频制作技巧、SEO优化、流量获取等核心要点。零基础也能快速上手。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/remote-work-desk-setup.jpg"]),
    categoryId: "4",
    category: mockCategories[3],
    authorId: "4",
    author: mockAuthors[3],
    isPaid: true,
    price: 199,
    views: 18900,
    likes: 567,
    comments: 189,
    publishedAt: new Date("2024-01-04T10:15:00"),
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
  {
    id: "13",
    title: "Shopify独立站从0到1：我的第一桶金实战记录",
    slug: "shopify-store-success-story",
    excerpt:
      "分享我如何用3个月时间把Shopify店铺从0做到月销20万美金的全过程。包括选品、建站、营销、物流、客服等各个环节的实操经验。遇到的所有坑都帮你踩过了，附带详细的工具推荐和资源清单。想做独立站的朋友必看！",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/business-promotion-banner.jpg", "/analytics-chart.png"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "1",
    author: mockAuthors[0],
    isPaid: true,
    price: 499,
    views: 28900,
    likes: 890,
    comments: 345,
    publishedAt: new Date("2024-01-03T13:30:00"),
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    id: "14",
    title: "亚马逊FBA选品秘籍：如何找到月销10万+的产品",
    slug: "amazon-fba-product-research",
    excerpt:
      "做亚马逊最重要的就是选品！选对产品就成功了一半。我通过这套选品方法，已经找到了5个月销超10万美金的产品。详细讲解选品工具使用、市场分析、竞争评估、利润计算等核心技能。附带我的选品检查清单和数据分析模板。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/analytics-chart.png"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "3",
    author: mockAuthors[2],
    isPaid: false,
    views: 12340,
    likes: 456,
    comments: 123,
    publishedAt: new Date("2024-01-02T11:00:00"),
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "15",
    title: "Pinterest Ads投放指南：被低估的流量金矿",
    slug: "pinterest-ads-guide",
    excerpt:
      "Pinterest是最被低估的广告平台！流量成本比Facebook便宜50%，但转化率却不输。特别适合做电商、家居、时尚、美妆等品类。详细分享账号设置、Pin图制作、广告投放、数据优化等技巧。我用Pinterest每月稳定获取5000+精准流量。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/minimalist-room.png"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "2",
    author: mockAuthors[1],
    isPaid: false,
    views: 8760,
    likes: 234,
    comments: 67,
    publishedAt: new Date("2024-01-01T15:20:00"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "16",
    title: "ChatGPT+SEO：打造自动化内容营销系统",
    slug: "chatgpt-seo-automation",
    excerpt:
      "用ChatGPT做SEO内容营销，效率提升10倍！我搭建了一套自动化系统，每天能产出30篇高质量SEO文章，自然流量增长300%。分享完整的Prompt模板、工具组合、内容优化、发布流程。不需要写作经验，只要会用ChatGPT就能做。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/ai-technology-1.jpg", "/analytics-chart.png"]),
    categoryId: "4",
    category: mockCategories[3],
    authorId: "4",
    author: mockAuthors[3],
    isPaid: true,
    price: 149,
    views: 19800,
    likes: 678,
    comments: 234,
    publishedAt: new Date("2023-12-30T09:40:00"),
    createdAt: new Date("2023-12-30"),
    updatedAt: new Date("2023-12-30"),
  },
  {
    id: "17",
    title: "Etsy开店指南：手工艺品如何月入$5000",
    slug: "etsy-shop-guide",
    excerpt:
      "Etsy是手工艺品、数字产品、定制商品的绝佳平台。我的店铺现在月收入稳定在5000美金以上。分享如何找到热门品类、创建吸引人的listing、优化SEO、处理订单、提升评价等实用技巧。即使不会手工制作，也能通过POD（按需打印）模式盈利。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/minimalist-desk.jpg"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "1",
    author: mockAuthors[0],
    isPaid: false,
    views: 10230,
    likes: 345,
    comments: 89,
    publishedAt: new Date("2023-12-28T14:10:00"),
    createdAt: new Date("2023-12-28"),
    updatedAt: new Date("2023-12-28"),
  },
  {
    id: "18",
    title: "Twitter(X)蓝V赚钱攻略：广告分成+内容变现",
    slug: "twitter-monetization-guide",
    excerpt:
      "Twitter改名X后推出了创作者广告分成计划，现在发推文也能赚钱了！我每月通过X赚取1500-2500美金。详细讲解如何开通蓝V、创作高互动内容、增长粉丝、获得广告分成等技巧。附带爆款推文模板和内容日历安排。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/startup-team-meeting.jpg"]),
    categoryId: "1",
    category: mockCategories[0],
    authorId: "2",
    author: mockAuthors[1],
    isPaid: false,
    views: 14560,
    likes: 456,
    comments: 145,
    publishedAt: new Date("2023-12-26T16:30:00"),
    createdAt: new Date("2023-12-26"),
    updatedAt: new Date("2023-12-26"),
  },
  {
    id: "19",
    title: "ClickBank联盟营销完整教程：新手月入$3000+",
    slug: "clickbank-affiliate-marketing",
    excerpt:
      "ClickBank是全球最大的数字产品联盟营销平台，佣金高达75%！适合新手入门。详细讲解如何注册账号、选择高佣金产品、搭建落地页、引流获客、提升转化率等核心技能。我从零开始3个月做到月收入3000美金，分享所有实操经验。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/earning-navigation-banner.jpg"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "3",
    author: mockAuthors[2],
    isPaid: true,
    price: 179,
    views: 16780,
    likes: 534,
    comments: 178,
    publishedAt: new Date("2023-12-24T10:50:00"),
    createdAt: new Date("2023-12-24"),
    updatedAt: new Date("2023-12-24"),
  },
  {
    id: "20",
    title: "Google AdSense优化指南：让你的网站收入翻倍",
    slug: "google-adsense-optimization",
    excerpt:
      "同样的流量，优化好AdSense能让收入翻2-3倍！分享广告位置优化、广告类型选择、CPC提升技巧、无效点击规避等实用方法。我管理的网站通过优化，RPM从$5提升到$15。附带完整的优化检查清单和A/B测试方案。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/analytics-chart.png"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "4",
    author: mockAuthors[3],
    isPaid: false,
    views: 11230,
    likes: 389,
    comments: 112,
    publishedAt: new Date("2023-12-22T13:15:00"),
    createdAt: new Date("2023-12-22"),
    updatedAt: new Date("2023-12-22"),
  },
  {
    id: "21",
    title: "Fiverr接单赚美金：零成本副业月入$2000",
    slug: "fiverr-freelancing-guide",
    excerpt:
      "Fiverr是全球最大的自由职业平台之一，不需要任何投资就能开始赚钱。我在Fiverr上提供设计服务，现在月收入稳定在2000美金。分享如何创建吸引人的Gig、定价策略、获取第一单、提升评价、扩大业务等技巧。适合设计、编程、写作、配音等各类技能。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/remote-work-desk-setup.jpg"]),
    categoryId: "1",
    category: mockCategories[0],
    authorId: "1",
    author: mockAuthors[0],
    isPaid: false,
    views: 9870,
    likes: 298,
    comments: 87,
    publishedAt: new Date("2023-12-20T11:25:00"),
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2023-12-20"),
  },
  {
    id: "22",
    title: "Walmart第三方卖家入驻指南：对抗亚马逊的新机会",
    slug: "walmart-marketplace-guide",
    excerpt:
      "Walmart正在大力扶持第三方卖家，竞争远比亚马逊小！现在入驻还有流量扶持。详细讲解入驻条件、资料准备、审核技巧、产品上架、营销推广等全流程。我的店铺上线2个月就实现盈利，月销已达3万美金。分享选品策略和运营经验。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/business-promotion-banner.jpg"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "3",
    author: mockAuthors[2],
    isPaid: true,
    price: 249,
    views: 13450,
    likes: 423,
    comments: 156,
    publishedAt: new Date("2023-12-18T15:40:00"),
    createdAt: new Date("2023-12-18"),
    updatedAt: new Date("2023-12-18"),
  },
  {
    id: "23",
    title: "Instagram Reels带货变现：单条视频收益$500+",
    slug: "instagram-reels-monetization",
    excerpt:
      "Instagram Reels现在是最好的带货渠道！我的一条Reels视频播放量100万+，直接带来500美金佣金。分享如何制作爆款Reels、选择高佣金产品、添加联盟链接、提升转化率等技巧。不需要大量粉丝，小账号也能快速变现。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/minimalist-room.png", "/ai-technology-2.jpg"]),
    categoryId: "1",
    category: mockCategories[0],
    authorId: "2",
    author: mockAuthors[1],
    isPaid: false,
    views: 21340,
    likes: 789,
    comments: 267,
    publishedAt: new Date("2023-12-16T09:55:00"),
    createdAt: new Date("2023-12-16"),
    updatedAt: new Date("2023-12-16"),
  },
  {
    id: "24",
    title: "Udemy课程制作与销售：打造被动收入管道",
    slug: "udemy-course-creation-guide",
    excerpt:
      "在Udemy上发布在线课程是创造被动收入的最佳方式之一。我的课程现在每月带来1000-1500美金收入，而且完全自动化。详细讲解选题策略、课程大纲设计、视频录制、定价策略、营销推广等全流程。不需要是行业专家，只要有一技之长就能做。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/startup-team-meeting.jpg"]),
    categoryId: "4",
    category: mockCategories[3],
    authorId: "4",
    author: mockAuthors[3],
    isPaid: true,
    price: 199,
    views: 15670,
    likes: 478,
    comments: 189,
    publishedAt: new Date("2023-12-14T14:20:00"),
    createdAt: new Date("2023-12-14"),
    updatedAt: new Date("2023-12-14"),
  },
  {
    id: "25",
    title: "eBay跨境电商实战：从选品到发货全攻略",
    slug: "ebay-cross-border-ecommerce",
    excerpt:
      "eBay是老牌跨境电商平台，门槛低、规则稳定，适合新手入门。我做eBay已经3年，现在月收入稳定在8000美金左右。分享注册流程、选品技巧、listing优化、物流方案、客户服务、账号安全等核心经验。附带eBay政策解读和常见问题解决方案。",
    content: `# 文章标题

## 内容简介

本文详细介绍了相关主题的核心内容和实用技巧，帮助读者快速理解和掌握关键知识点。

## 主要内容

文章系统地讲解了以下几个方面：

- **核心概念**：深入浅出地解释了基本原理
- **实践方法**：提供了可操作的具体步骤  
- **案例分析**：通过真实案例加深理解
- **经验总结**：分享了作者的实战心得

## 操作步骤

### 第一步：准备工作
在开始之前，需要做好充分的准备...

### 第二步：具体实施
按照以下步骤进行操作...

### 第三步：优化调整
根据实际情况进行优化...

## 注意事项

在实践过程中需要注意以下几点：
1. 确保基础条件满足
2. 按照步骤循序渐进
3. 及时总结和调整
4. 保持学习和更新

## 工具推荐

为了更好地完成任务，推荐使用以下工具...

## 常见问题

**Q: 如何快速上手？**
A: 建议先阅读文档，然后从简单的开始实践

**Q: 遇到问题怎么办？**  
A: 可以查看官方文档或在社区提问

## 总结

通过本文的学习，相信你已经掌握了相关知识和技能。记住，实践是最好的老师，多动手才能真正掌握。

如有任何问题，欢迎在评论区交流讨论！`,
    images: JSON.stringify(["/payment-methods.png"]),
    categoryId: "2",
    category: mockCategories[1],
    authorId: "1",
    author: mockAuthors[0],
    isPaid: false,
    views: 10890,
    likes: 356,
    comments: 98,
    publishedAt: new Date("2023-12-12T10:30:00"),
    createdAt: new Date("2023-12-12"),
    updatedAt: new Date("2023-12-12"),
  },
]

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    label: "讨论",
    icon: "MessageSquare",
    href: "/discussion",
    order: 1,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    label: "话题",
    icon: "Hash",
    href: "/topics",
    order: 2,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    label: "商城",
    icon: "ShoppingCart",
    href: "/shop",
    order: 3,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    label: "AI助手",
    icon: "Heart",
    href: "/ai-assistant",
    color: "#ff1744",
    order: 4,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    label: "交流群",
    icon: "MessageCircle",
    href: "/community",
    color: "#00bcd4",
    order: 5,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
]

export const mockSidebarWidgets: SidebarWidget[] = [
  {
    id: "1",
    type: "image",
    title: "赚钱导航",
    imageUrl: "/earning-navigation-banner.jpg",
    linkUrl: "https://example.com/earning",
    order: 1,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    type: "hot-articles",
    title: "热门文章",
    articles: mockArticles.slice(0, 5),
    order: 2,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    type: "latest-articles",
    title: "最新文章",
    articles: mockArticles.slice(0, 5),
    order: 3,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    type: "links",
    title: "友情链接",
    links: [
      { name: "Google", url: "https://google.com" },
      { name: "GitHub", url: "https://github.com" },
      { name: "Stack Overflow", url: "https://stackoverflow.com" },
    ],
    order: 4,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    type: "html",
    title: "自定义内容",
    content: "<div class='p-4 bg-blue-50 rounded-lg'><p class='text-sm'>这是一个自定义HTML卡片</p></div>",
    order: 5,
    isActive: false,
    createdAt: new Date("2024-01-01"),
  },
]
