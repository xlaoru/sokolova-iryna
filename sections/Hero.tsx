"use client"

import Button from "@/components/Button";
import type { HeroSectionEntry } from "@/utils/contentful";
import { navigate } from "@/utils/navigate";

export default function Hero({ entry }: { entry: HeroSectionEntry }) {
    const { title, description, cta, background, slug } = entry.fields
    const backgroundUrl = background?.fields.file?.url
    return (
        <section id={slug} style={backgroundUrl ? { backgroundImage: `url(https:${backgroundUrl})` } : undefined} className="full-bleed flex-1 min-h-0 max-[765px]:flex-none max-[765px]:min-h-[calc(100svh-var(--header-h))] flex items-center justify-center bg-cover bg-center bg-no-repeat max-[769px]:px-[16px]">
            <div className="w-[582px] flex flex-col gap-[24px] justify-center items-center">
                <h1 className="max-[769px]:w-[70%] text-black text-center">{title}</h1>
                <p className="max-[769px]:w-[70%] text-neutral-600 text-center">{description}</p>
                {cta && <Button className="w-fit max-[476px]:w-full" variant={cta.fields.variant} onClick={() => { navigate("contact") }}>{cta.fields.text}</Button>}
            </div>
        </section >
    );
}
