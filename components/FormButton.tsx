import { PropsWithChildren } from "react"

export default function FormButton({ children, className }: PropsWithChildren<{ className?: string }>) {

    return (
        <button className={`w-full mt-4 mb-4 py-2 bg-[#141516] text-[#e0dede] font-semibold rounded-lg shadow-md hover:shadow-none hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b1b2b2] focus:ring-offset-2 cursor-pointer ${className || ""}`}
                type="submit">{children}</button>
    )
}