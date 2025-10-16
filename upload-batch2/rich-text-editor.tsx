"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  Eye
} from "lucide-react"
import { sanitizeHTML } from "@/lib/validation"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onSave?: () => void
  placeholder?: string
  showPreview?: boolean
  showPaidSeparator?: boolean
}

export function RichTextEditor({ 
  content, 
  onChange, 
  onSave,
  placeholder = "开始编写文章内容...",
  showPreview = true,
  showPaidSeparator = true
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // 初始化编辑器内容
  useEffect(() => {
    if (editorRef.current && !isPreview && !isInitialized) {
      editorRef.current.innerHTML = content || ""
      setIsInitialized(true)
    }
  }, [content, isPreview, isInitialized])

  // 处理输入事件
  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      onChange(newContent)
    }
  }

  // 执行命令
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  // 插入链接
  const insertLink = () => {
    const url = prompt("请输入链接地址:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  // 插入图片
  const insertImage = () => {
    const url = prompt("请输入图片地址:")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  // 插入付费内容区域（开始+结束+中间空白）
  const insertPaidContent = () => {
    const paidContentBlock = `
      <div style="
        border: 3px solid #ff9800; 
        padding: 10px; 
        margin: 15px 0; 
        text-align: center; 
        background: #fff3e0; 
        border-radius: 5px;
        font-weight: bold;
        color: #ff9800;
      ">
        🔒 付费内容开始 🔒
      </div>
      
      <div style="
        padding: 20px; 
        margin: 10px 0; 
        border: 2px dashed #ccc; 
        background: #f9f9f9; 
        border-radius: 5px;
        min-height: 100px;
      ">
        <p style="color: #666; text-align: center; margin: 0;">在此处编写付费内容...</p>
      </div>
      
      <div style="
        border: 3px solid #4caf50; 
        padding: 10px; 
        margin: 15px 0; 
        text-align: center; 
        background: #e8f5e8; 
        border-radius: 5px;
        font-weight: bold;
        color: #4caf50;
      ">
        ✅ 付费内容结束 ✅
      </div>
    `
    execCommand("insertHTML", paidContentBlock)
  }

  // 渲染预览
  const renderPreview = (html: string) => {
    return (
      <div 
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(html) }}
      />
    )
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="bg-gray-50 border-b border-gray-300 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* 文本格式 */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("bold")}
              className="h-8 w-8 p-0"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("italic")}
              className="h-8 w-8 p-0"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("underline")}
              className="h-8 w-8 p-0"
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("strikeThrough")}
              className="h-8 w-8 p-0"
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          </div>

          {/* 标题 */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("formatBlock", "h1")}
              className="h-8 w-8 p-0"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("formatBlock", "h2")}
              className="h-8 w-8 p-0"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("formatBlock", "h3")}
              className="h-8 w-8 p-0"
            >
              <Heading3 className="h-4 w-4" />
            </Button>
          </div>

          {/* 列表 */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("insertUnorderedList")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("insertOrderedList")}
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          {/* 对齐 */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("justifyLeft")}
              className="h-8 w-8 p-0"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("justifyCenter")}
              className="h-8 w-8 p-0"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("justifyRight")}
              className="h-8 w-8 p-0"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          {/* 其他功能 */}
          <div className="flex border-r border-gray-300 pr-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("formatBlock", "blockquote")}
              className="h-8 w-8 p-0"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand("formatBlock", "pre")}
              className="h-8 w-8 p-0"
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertLink}
              className="h-8 w-8 p-0"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertImage}
              className="h-8 w-8 p-0"
            >
              <Image className="h-4 w-4" />
            </Button>
          </div>

          {/* 付费内容区域 */}
          {showPaidSeparator && (
            <div className="flex border-r border-gray-300 pr-2 mr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={insertPaidContent}
                className="h-8 px-3 text-orange-600 hover:text-orange-700"
                title="插入付费内容区域（包含开始、内容区域、结束）"
              >
                <span className="text-xs">💰 付费内容</span>
              </Button>
            </div>
          )}

          {/* 预览/编辑切换 */}
          {showPreview && (
            <div className="flex">
              <Button
                variant={isPreview ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
                className="h-8 px-3"
              >
                <Eye className="h-4 w-4 mr-1" />
                {isPreview ? "编辑" : "预览"}
              </Button>
            </div>
          )}

          {/* 保存按钮 */}
          {onSave && (
            <div className="flex ml-auto">
              <Button
                variant="default"
                size="sm"
                onClick={onSave}
                className="h-8 px-3"
              >
                <Save className="h-4 w-4 mr-1" />
                保存
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 编辑器内容 */}
      <div className="min-h-[400px]">
        {isPreview ? (
          <div className="p-4">
            {renderPreview(content)}
          </div>
        ) : (
          <div
            ref={editorRef}
            contentEditable
            className="p-4 min-h-[400px] focus:outline-none"
            onInput={handleInput}
            style={{
              lineHeight: "1.6",
              fontSize: "14px",
            }}
            suppressContentEditableWarning={true}
          />
        )}
      </div>
    </div>
  )
}