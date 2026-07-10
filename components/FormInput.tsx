"use client"

import { FC } from "react"

interface FormInputRegisterProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string
    label: string
    value: string
    setValue: (value: string) => void
    suffix?: React.ReactNode
}

export const FormInput: FC<FormInputRegisterProps> = ({ id, label, value, setValue, suffix, ...inputProps }) => {
    return (
        <fieldset className="grid mt-1">
            <label className="block text-sm font-medium text-[#7b7c7b]" htmlFor={id}>{label}</label>
            <div className="relative flex items-center">
                <input className="w-full pl-2 pr-10 py-1 text-[#545454] border border-[#e8e9e9] outline-none shadow-lg hover:border-[#b1b2b2] focus:border-[#b1b2b2] rounded-lg"
                    name={id}
                    id={id}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...inputProps} />
                {suffix && (
                    <span className="absolute right-2 flex items-center">
                        {suffix}
                    </span>
                )}
            </div>
        </fieldset>
    )
}