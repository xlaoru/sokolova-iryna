"use client"

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

type Props = {
    urls: string[]
    activeSlide: number
    setActiveSlide: (index: number) => void
    onClose: () => void
};

export default function DocumentsOverlay({ urls, activeSlide, setActiveSlide, onClose }: Props) {
    const prev = () => setActiveSlide((activeSlide - 1 + urls.length) % urls.length)
    const next = () => setActiveSlide((activeSlide + 1) % urls.length)

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") prev()
            if (e.key === "ArrowRight") next()
        }

        document.addEventListener("keydown", onKeyDown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = ""
        }
    })

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1E1E]/60">
            <X onClick={onClose} className="absolute top-[32px] right-[32px] cursor-pointer size-[32px] text-white hover:opacity-70 transition-opacity duration-300" />
            <ChevronLeft onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-[64px] cursor-pointer size-[52px] p-[10px] text-white border-2 border-white rounded-full hover:opacity-70 transition-opacity duration-300" />
            <img onClick={(e) => e.stopPropagation()} src={urls[activeSlide]} className="max-w-[calc(100vw-320px)] max-h-[calc(100vh-64px)] object-contain bg-white" />
            <ChevronRight onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-[64px] cursor-pointer size-[52px] p-[10px] text-white border-2 border-white rounded-full hover:opacity-70 transition-opacity duration-300" />
        </div>
    )
}
