"use client"

import type { TestimonialsSectionEntry } from "@/utils/contentful";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

export default function Testimonials({ entry }: { entry: TestimonialsSectionEntry }) {
    const { title, description, testimonials, background, slug } = entry.fields
    const backgroundUrl = background?.fields.file?.url

    const items = testimonials.filter((t) => t !== undefined)
    const [activeSlide, setActiveSlide] = useState(0)
    const active = items[activeSlide]

    if (!active) return null

    const { quote, avatar, name, description: role } = active.fields
    const avatarUrl = avatar?.fields.file?.url

    return (
        <section
            id={slug}
            style={backgroundUrl ? { backgroundImage: `url(https:${backgroundUrl})` } : undefined}
            className="full-bleed bg-cover bg-center bg-no-repeat"
        >
            <div className="max-w-[1920px] mx-auto px-[96px] flex flex-col gap-[48px] py-[64px]">
            <div className="flex flex-col gap-[16px]">
                <h2 className="text-black text-center">{title}</h2>
                {description && <p className="text-neutral-600 text-center">{description}</p>}
            </div>
            <div className="flex flex-row justify-between items-center">
                <ChevronLeft onClick={() => setActiveSlide((prev) => (prev - 1 + items.length) % items.length)} className={`cursor-pointer size-[52px] p-[10px] text-blue-600 border-2 border-blue-600 rounded-full hover:opacity-70 transition-colors duration-800 ease-out`} />
                <ul className="w-[610px] flex flex-col items-center">
                    <li key={active.sys.id} className="flex flex-col gap-[32px]">
                        <figure className="flex flex-col gap-[32px]">
                            <div className="flex flex-col items-center gap-[32px]">
                                <Quote className="text-neutral-400 fill-current w-[40px] h-[33px]" />
                                <blockquote className="text-black text-center">{quote}</blockquote>
                            </div>
                            <figcaption className="flex flex-col items-center gap-[8px]">
                                {avatarUrl && <img src={`https:${avatarUrl}`} alt={name} className="size-[48px]" />}
                                <div className="flex flex-col gap-[0px]">
                                    <p className="text-black text-center">{name}</p>
                                    {role && <p className="text-neutral-600 text-center">{role}</p>}
                                </div>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
                <ChevronRight onClick={() => setActiveSlide((prev) => (prev + 1) % items.length)} className={`cursor-pointer size-[52px] p-[10px] text-blue-600 border-2 border-blue-600 rounded-full hover:opacity-70 transition-colors duration-800 ease-out`} />
            </div>
            </div>
        </section>
    );
}
