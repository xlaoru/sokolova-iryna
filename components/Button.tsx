"use client"

import React from "react";

type Props = {
    children: React.ReactNode
    variant: "Primary" | "Outline"
    onClick: VoidFunction
    className?: string
};

export default function Button({ children, variant, onClick, className }: Props) {
    return <button onClick={onClick} className={`${className} ${variant === "Primary" ? "btn-primary" : "btn-outline"}`}>{children}</button>;
}
