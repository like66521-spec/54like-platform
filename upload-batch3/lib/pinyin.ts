// 拼音转换工具
const pinyinMap: { [key: string]: string } = {
  '一': 'yi', '二': 'er', '三': 'san', '四': 'si', '五': 'wu', '六': 'liu', '七': 'qi', '八': 'ba', '九': 'jiu', '十': 'shi',
  '的': 'de', '了': 'le', '在': 'zai', '是': 'shi', '我': 'wo', '有': 'you', '和': 'he', '就': 'jiu', '不': 'bu', '人': 'ren',
  '这': 'zhe', '中': 'zhong', '大': 'da', '为': 'wei', '上': 'shang', '个': 'ge', '国': 'guo', '以': 'yi', '到': 'dao', '说': 'shuo',
  '要': 'yao', '时': 'shi', '来': 'lai', '用': 'yong', '们': 'men', '生': 'sheng', '到': 'dao', '地': 'di', '出': 'chu', '就': 'jiu',
  '分': 'fen', '对': 'dui', '成': 'cheng', '会': 'hui', '可': 'ke', '主': 'zhu', '发': 'fa', '年': 'nian', '动': 'dong', '同': 'tong',
  '工': 'gong', '也': 'ye', '能': 'neng', '下': 'xia', '过': 'guo', '子': 'zi', '他': 'ta', '它': 'ta', '着': 'zhe', '无': 'wu',
  '学': 'xue', '文': 'wen', '明': 'ming', '理': 'li', '知': 'zhi', '道': 'dao', '得': 'de', '行': 'xing', '面': 'mian', '方': 'fang',
  '高': 'gao', '长': 'chang', '现': 'xian', '回': 'hui', '开': 'kai', '关': 'guan', '好': 'hao', '多': 'duo', '少': 'shao', '小': 'xiao',
  '钱': 'qian', '美': 'mei', '新': 'xin', '老': 'lao', '好': 'hao', '坏': 'huai', '快': 'kuai', '慢': 'man', '热': 're', '冷': 'leng',
  '红': 'hong', '绿': 'lv', '蓝': 'lan', '黄': 'huang', '白': 'bai', '黑': 'hei', '灰': 'hui', '紫': 'zi', '粉': 'fen', '橙': 'cheng',
  '赚': 'zhuan', '美': 'mei', '金': 'jin', '元': 'yuan', '块': 'kuai', '毛': 'mao', '分': 'fen', '角': 'jiao', '万': 'wan', '千': 'qian',
  '百': 'bai', '亿': 'yi', '兆': 'zhao', '京': 'jing', '垓': 'gai', '秭': 'zi', '穰': 'rang', '沟': 'gou', '涧': 'jian', '正': 'zheng',
  '载': 'zai', '极': 'ji', '恒河沙': 'henghesha', '阿僧祇': 'asengqi', '那由他': 'nayouta', '不可思议': 'bukesiyi',
  '无量大数': 'wuliangdashu', '大数': 'dashu', '古戈尔': 'gugeer', '古戈尔普勒克斯': 'gugeerpulekesi'
}

// 简单的拼音转换函数
export function toPinyin(text: string): string {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (pinyinMap[char]) {
      result += pinyinMap[char]
    } else if (/[a-zA-Z0-9]/.test(char)) {
      result += char.toLowerCase()
    } else if (/[\u4e00-\u9fff]/.test(char)) {
      // 对于不在映射表中的中文字符，使用简单的音调转换
      result += 'hanzi'
    } else {
      // 其他字符转换为下划线
      result += '_'
    }
  }
  return result
}

// 生成URL友好的slug
export function generateSlug(title: string): string {
  // 转换为拼音
  let slug = toPinyin(title)
  
  // 移除特殊字符，只保留字母、数字、连字符和下划线
  slug = slug.replace(/[^a-zA-Z0-9_-]/g, '-')
  
  // 移除连续的连字符
  slug = slug.replace(/-+/g, '-')
  
  // 移除开头和结尾的连字符
  slug = slug.replace(/^-+|-+$/g, '')
  
  // 限制长度
  if (slug.length > 50) {
    slug = slug.substring(0, 50)
    slug = slug.replace(/-+$/, '') // 移除末尾的连字符
  }
  
  return slug || 'untitled'
}

// 自动生成标签
export function generateTags(title: string, content: string): string[] {
  const tags: string[] = []
  
  // 从标题中提取关键词
  const titleKeywords = extractKeywords(title)
  tags.push(...titleKeywords)
  
  // 从内容中提取关键词
  const contentKeywords = extractKeywords(content)
  tags.push(...contentKeywords)
  
  // 去重并限制数量
  const uniqueTags = [...new Set(tags)].slice(0, 3)
  
  return uniqueTags
}

// 提取关键词
function extractKeywords(text: string): string[] {
  const keywords: string[] = []
  
  // 常见关键词
  const commonKeywords = [
    '赚钱', '美金', '美元', '投资', '理财', '创业', '副业', '兼职', '工作', '职业',
    '技能', '学习', '教育', '培训', '课程', '教程', '方法', '技巧', '经验', '分享',
    '工具', '软件', '应用', '网站', '平台', '服务', '产品', '项目', '机会', '资源',
    '网络', '互联网', '电商', '营销', '推广', '销售', '客户', '用户', '市场', '行业',
    '技术', '开发', '编程', '设计', '运营', '管理', '团队', '合作', '伙伴', '朋友',
    'AI', '人工智能', 'ChatGPT', '自动化', '效率', '优化', '增长', '变现', '收入'
  ]
  
  // 检查文本中是否包含这些关键词
  for (const keyword of commonKeywords) {
    if (text.includes(keyword)) {
      keywords.push(keyword)
    }
  }
  
  // 如果没找到关键词，尝试从标题中提取
  if (keywords.length === 0) {
    const words = text.split(/[\s，。！？；：""''（）【】]/)
    for (const word of words) {
      if (word.length >= 2 && word.length <= 6) {
        keywords.push(word)
        if (keywords.length >= 2) break
      }
    }
  }
  
  return keywords
}
