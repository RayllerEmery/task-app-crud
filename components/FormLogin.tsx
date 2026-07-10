"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { FormInput } from "./FormInput"
import FormButton from "./FormButton"
import { FormError } from "./FormError"

type FormLoginProps = {
action: (_: string, formData: FormData) => Promise<string>
}

export const FormLogin = ({ action }: FormLoginProps) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [errorMessage, formAction, isPending] = useActionState(action, "")

    return (
        <>
            {!isPending && <FormError message={errorMessage} />}
            <form action={formAction}>

                <FormInput id="email" label="E-mail" value={email} setValue={setEmail} />

                <FormInput
                    id="password"
                    label="Password"
                    value={password}
                    setValue={setPassword}
                    type={showPassword ? "text" : "password"}
                    suffix={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer leading-none">
                            👀
                        </button>
                    }
                />

                <FormButton>{isPending ? "Entrando..." : "Entrar"}</FormButton>
            </form>
        </>
    );
}