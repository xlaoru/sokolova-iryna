"use client"

import React from "react";

type Props = {
    children: React.ReactNode
    variant: "Primary" | "Outline"
    onClick?: VoidFunction
    className?: string
    type?: "button" | "submit"
    disabled?: boolean
};

export default function Button({ children, variant, onClick, className, type = "button", disabled }: Props) {
    return <button type={type} disabled={disabled} onClick={onClick} className={`${className} ${variant === "Primary" ? "btn-primary" : "btn-outline"}`}>{children}</button>;
}
