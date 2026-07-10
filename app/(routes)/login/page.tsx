import type { Metadata } from "next";
import { FormLogin } from "@/components/FormLogin";
import { redirect } from "next/navigation";
import { API_BASE_URL, validateEmail, validatePassword, setAuthCookie } from "@/libs/utils";
const PAGE_TITLE = "Login"

export const metadata: Metadata = {
    title: PAGE_TITLE,
};

export default function Login() {
    
    const handleLogin = async (_: string, formData: FormData) => {
        "use server"

        const email = formData.get("email")?.toString()
        const password = formData.get("password")?.toString()

        if (!email || !password) {
            return "Preencha todos os campos para fazer login"
        }

        const emailError = validateEmail(email)
        if (emailError) return emailError

        const passwordError = validatePassword(password)
        if (passwordError) return passwordError

        const res = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()

        if (!res.ok) {
            return data.error || "Erro ao fazer login"
        }

        if (!data.token) {
            return data.message
        } else {
            await setAuthCookie(data.token)
            redirect("/tasks")
        }


    }

    return (
        <>
            <h1 className="text-4xl text-center font-bold">{PAGE_TITLE}</h1>
            <div>
                <FormLogin action={handleLogin} />
            </div>
        </>
    )
}