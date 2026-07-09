import { FormRegister } from "@/components/FormRegister";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Register() {

    const handleRegister = async (_: string, formData: FormData) => {
        "use server"

        const username = formData.get("username")?.toString()
        const email = formData.get("email")?.toString()
        const password = formData.get("password")?.toString()

        if (!username || !email || !password) {
            return "Preencha todos os campos para se cadastrar"
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "E-mail inválido"
        }

        if (password.length < 6) {
            return "A senha deve ter pelo menos 6 caracteres"
        }

        const res = await fetch("http://localhost:3001/register", {
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
            const cookieStore = await cookies()
            cookieStore.set("token", data.token, {
                httpOnly: true,
                secure: true,
                path: "/",
                maxAge: 60 * 60 * 24
            })
            redirect("/tasks")
        }

        
    }

    return (
        <div className="grid gap-y-4 px-8 min-w-100 py-12 bg-[#fdfcfc] rounded-3xl shadow-xl">
            <h1 className="text-4xl text-center font-bold">Cadastro</h1>
            <div>
                <FormRegister action={handleRegister} />
                <div className="justify-center flex gap-2">
                    <Link className="w-full underline text-center" href="/login">Já tenho cadastro</Link>
                </div>
            </div>
        </div>
    );
}