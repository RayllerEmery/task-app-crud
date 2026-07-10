"use client"

import {PropsWithChildren} from "react";

interface TaskCardProps extends PropsWithChildren {
    id: string,
    completeAction: (formData: FormData) => Promise<void>,
    completed: boolean,
    deleteCompleted?: (formData: FormData) => Promise<void>
}

export const TaskCard = ({id, completeAction, children, completed, deleteCompleted}: TaskCardProps) => {
    return (
        <li className="grid grid-cols-[auto_1fr_auto] p-4 gap-x-2 itens-center text-[#7b7c7b] border-[#e8e9e9] rounded-lg hover:border-[#b1b2b2]">
            <form className="flex" action={completeAction}>
                <input type="hidden" name="id" value={id}/>
                <input className="accent-[#141516]"
                       name="completed"
                       type="checkbox"
                       defaultChecked={completed}
                       disabled={completed}
                       onChange={
                           (e) => e.target.form!.requestSubmit()
                       }/>
            </form>
            <span className={completed ? "line-through opacity-50" : ""}>{children}</span>
            <form className="flex" action={deleteCompleted}>
                <input type="hidden" name="id" value={id}/>
                <button className="cursor-pointer hover:[&_svg_path]:stroke-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={completed}
                >
                    <svg
                        className="size-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                    >
                        <path
                            className="stroke-red-700"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7L6-6M7 7l-6 6"
                        ></path>

                    </svg>
                </button>
            </form>
        </li>
    );
}