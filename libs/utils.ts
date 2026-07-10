import { cookies } from "next/headers"

export const API_BASE_URL = process.env.BACKEND_URL || "http://localhost:3001"

export function validateEmail(email: string): string | null {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "E-mail inválido"
    }
    return null
}

export function validatePassword(password: string): string | null {
    if (password.length < 6) {
        return "A senha deve ter pelo menos 6 caracteres"
    }
    return null
}

export async function setAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24,
    })
}

export async function getAuthCookie(): Promise<string | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")
    return token?.value || null
}

export async function fetchWithTokenPost(url: string, token: string, body: string): Promise<Response> {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body,
    })
    return res
}

export async function fetchWithTokenGet(url: string, token: string): Promise<Response> {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
        cache: "no-store",
    })
    return res
}

export async function fetchWithTokenPut(url: string, token: string): Promise<Response> {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
    })
    return res
}

export async function fetchWithTokenDelete(url: string, token: string): Promise<Response> {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
    })
    return res
}
