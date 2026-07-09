"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { FormInput } from "./FormInput"
import FormButton from "./FormButton"
import { FormError } from "./FormError"

type FormRegisterProps = {
    action: (_: string, formData: FormData) => Promise<string>
}

export const FormRegister = ({ action }: FormRegisterProps) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [errorMessage, formAction, isPending] = useActionState(action, "")

    return (
        <>
            {!isPending && <FormError message={errorMessage} />}
            <form action={formAction}>
        
                <FormInput id="username" label="Usuário" value={username} setValue={setUsername} />
            
                <FormInput id="email" label="E-mail" value={email} setValue={setEmail} />
                
                <FormInput id="password" label="Password" value={password} setValue={setPassword} type={showPassword ? "text" : "password"} />
                <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-2">
                    👀
                </button>

                <FormButton>{isPending ? "Cadastrando..." : "Cadastrar"}</FormButton>
            </form>
        </>
    );
}