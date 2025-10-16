"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { loginAction } from "../actions"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await loginAction(formData.email, formData.password)

      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // 登录成功后重定向
      window.location.href = "/admin/dashboard"
    } catch (error) {
      setError("登录失败，请重试")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md mx-4 shadow-2xl border-0 relative z-10 backdrop-blur-sm bg-white/95">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <span className="text-white text-3xl font-bold">54</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            管理后台登录
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-600">
            请输入您的账号密码登录系统
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@54like.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
                className="h-11 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : (
                "登录"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 py-3">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">默认管理员账号：</span>
                <span className="text-indigo-600 font-mono">admin@54like.com</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">默认密码：</span>
                <span className="text-indigo-600 font-mono">admin123</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

