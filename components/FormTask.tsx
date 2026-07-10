"use client"

import { useActionState, useEffect, useState } from "react";
import FormButton from "./FormButton";
import { FormInput } from "./FormInput";

type FormTasksProps = {
    action: (_: string, formData: FormData) => Promise<string>
}

export const FormTasks = ({ action }: FormTasksProps) => {

    const [task, setTask] = useState("")

    const [errorMessage, formAction, isPending] = useActionState(action, "")
    
    useEffect(() => {
        if (!isPending && !errorMessage) {
            setTask("")
        }
    }, [isPending, errorMessage]);

    return (
        <>
            <form className="relative" action={formAction}>
                <FormInput
                    id="task"
                    label="Task"
                    value={task}
                    setValue={setTask}
                    placeholder="Digite a tarefa"
                    suffix={
                        <FormButton className="absolute right-5">➕</FormButton>
                    }
                />
            </form>
        </>
    )
}