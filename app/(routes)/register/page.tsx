import type { Metadata } from "next";
import { FormRegister } from "@/components/FormRegister";
import Link from "next/link";
import { redirect } from "next/navigation";
import { API_BASE_URL, validateEmail, validatePassword, setAuthCookie } from "@/libs/utils";


const PAGE_TITLE = "Cadastro"

export const metadata: Metadata = {
    title: PAGE_TITLE,
};

export default function Register() {

    const handleRegister = async (_: string, formData: FormData) => {
        "use server"

        const username = formData.get("username")?.toString()
        const email = formData.get("email")?.toString()
        const password = formData.get("password")?.toString()

        if (!username || !email || !password) {
            return "Preencha todos os campos para se cadastrar"
        }

        const emailError = validateEmail(email)
        if (emailError) return emailError

        const passwordError = validatePassword(password)
        if (passwordError) return passwordError

        const res = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()

        if (!res.ok) {
            return data.error || "Erro ao cadastrar usuário"
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
                <FormRegister action={handleRegister} />
                <div className="justify-center flex gap-2">
                    <Link className="w-full underline text-center" href="/login">Já tenho cadastro</Link>
                </div>
            </div>
        </>
    )
}