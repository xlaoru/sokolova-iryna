"use client"

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

type Props = {
    urls: string[]
    alts: (string | undefined)[]
    activeSlide: number
    setActiveSlide: (index: number) => void
    onClose: () => void
};

export default function DocumentsOverlay({ urls, alts, activeSlide, setActiveSlide, onClose }: Props) {
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
            <ChevronLeft onClick={(e) => { e.stopPropagation(); prev() }} className="max-[826px]:hidden absolute left-[64px] cursor-pointer size-[52px] p-[10px] text-white border-2 border-white rounded-full hover:opacity-70 transition-opacity duration-300" />
            <div className="flex flex-col items-center gap-[36px]">
                <img onClick={(e) => e.stopPropagation()} src={urls[activeSlide]} alt={alts[activeSlide]} className="max-w-[calc(100vw-320px)] max-h-[calc(100vh-64px)] max-[826px]:max-w-[calc(100vw-32px)] max-[826px]:max-h-[calc(100vh-216px)] object-contain bg-white" />
                <div className="hidden max-[826px]:flex gap-[24px]">
                    <ChevronLeft onClick={(e) => { e.stopPropagation(); prev() }} className="cursor-pointer size-[52px] p-[10px] text-white border-2 border-white rounded-full hover:opacity-70 transition-opacity duration-300" />
                    <ChevronRight onClick={(e) => { e.stopPropagation(); next() }} className="cursor-pointer size-[52px] p-[10px] text-white border-2 border-white rounded-full hover:opacity-70 transition-opacity duration-300" />
                </div>
            </div>
            <ChevronRight onClick={(e) => { e.stopPropagation(); next() }} className="max-[826px]:hidden absolute right-[64px] cursor-pointer size-[52px] p-[10px] text-white border-2 border-white rounded-full hover:opacity-70 transition-opacity duration-300" />
        </div>
    )
}
