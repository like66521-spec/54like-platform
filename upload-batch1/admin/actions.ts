"use server"

import { signIn, signOut, auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function loginAction(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { error: result.error }
    }

    if (!result) {
      return { error: "登录失败，请检查邮箱和密码" }
    }

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "登录过程中发生错误，请重试" }
  }
}

export async function logoutAction() {
  await signOut({ redirect: false })
}

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

export async function requireAuth() {
  const session = await auth()
  if (!session) {
    redirect("/admin/login")
  }
  return session.user
}

export async function requireAdmin() {
  const session = await auth()
  if (!session || session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN") {
    redirect("/admin/login")
  }
  return session.user
}

export async function createUser(email: string, password: string, name: string, role: "USER" | "ADMIN" | "SUPER_ADMIN" = "USER") {
  try {
    const hashedPassword = await hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    })

    return { success: true, user }
  } catch (error) {
    console.error("Create user error:", error)
    return { error: "创建用户失败" }
  }
}

export async function updateUserPassword(userId: string, newPassword: string) {
  try {
    const hashedPassword = await hash(newPassword, 12)
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    console.error("Update password error:", error)
    return { error: "密码更新失败" }
  }
}


