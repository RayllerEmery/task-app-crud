import { FormTasks } from "@/components/FormTask";
import {
    API_BASE_URL,
    fetchWithTokenPost,
    fetchWithTokenGet,
    getAuthCookie,
    fetchWithTokenPut,
    fetchWithTokenDelete
} from "@/libs/utils";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import {TaskCard} from "@/components/TaskCard";

const PAGE_TITLE = "Tasks"

export const metadata: Metadata = {
    title: PAGE_TITLE,
};

export default async function Tasks() {

    const handleCreateTask = async (_: string, formData: FormData) => {
        "use server"

        const task = formData.get("task")?.toString()

        console.log("[CHEGOU AQUI] Task:", task)

        if (!task) {
            return "Preencha para criar a tarefa"
        }

        const token = await getAuthCookie()
        if (!token) {
            return "Usuário não autenticado"
        }

        console.log("[CHEGOU AQUI] Body:", JSON.stringify({ task }))

        let response: Response
        try {
            response = await fetchWithTokenPost(API_BASE_URL + "/tasks", token, JSON.stringify({ task }))
        } catch {
            return "Não foi possível conectar ao servidor"
        }

        const data = await response.json()

        if (!response.ok) {
            return data.error || "Erro ao cadastrar tarefa"
        }

        if (!data.task) {
            return data.message
        }

        revalidatePath('/tasks')
    }

    const handleCompleteTask = async (formData: FormData) => {
        "use server"

        const id = formData.get("id")?.toString()

        if (!id) {
            console.error("ID da tarefa não encontrado")
            return
        }

        const token = await getAuthCookie()
        if (!token) {
            console.error("Usuário não autenticado")
            return
        } else {
            const response = await fetchWithTokenPut(`${API_BASE_URL}/tasks/${id}/complete`, token)

            if (response.ok) {
                console.log("Tarefa concluída com sucesso")
                revalidatePath('/tasks')
                return
            } else {
                const data = await response.json()
                console.error(data.error || "Erro ao concluir tarefa")
                return
            }
        }

    }

    const handleDeleteTask = async(formData: FormData) => {
        "use server"

        const id = formData.get("id")?.toString()

        if (!id) {
            console.error("ID da tarefa não encontrado")
            return
        }

        const token = await getAuthCookie()
        if (!token) {
            console.error("Usuário não autenticado")
            return
        } else {
            const response = await fetchWithTokenDelete(`${API_BASE_URL}/tasks/${id}`, token)
            if (response.ok) {
                console.log("Tarefa removida")
                revalidatePath('/tasks')
                return
            } else {
                const data = await response.json()
                console.error(data.error || "Erro ao concluir tarefa")
                return
            }
        }
    }

    const token = await getAuthCookie()

    if (!token) return null

    const response = await fetchWithTokenGet(API_BASE_URL + "/tasks", token)
    const data = await response.json()
    const { tasks } = data

    const sortedTasks = [...tasks].sort((a: { completed: boolean }, b: { completed: boolean }) =>
        Number(a.completed) - Number(b.completed)
    )

    return (
        <>
            <h1 className="text-4xl text-center font-bold">{PAGE_TITLE}</h1>
            <FormTasks action={handleCreateTask}/>

            <ul className={"grid gap-y-e"}>
                {sortedTasks.map((task: { id: number; task: string; completed: boolean; created_at: string }) => (
                    <TaskCard key={task.id} id={task.id.toString()} completed={task.completed} completeAction={handleCompleteTask} deleteCompleted={handleDeleteTask}>
                        {task.task}
                    </TaskCard>
                ))}
            </ul>
        </>
    )
}