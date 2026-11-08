"use client"

import Button from "@/components/Button";
import type { HeroSectionEntry } from "@/utils/contentful";

export default function Hero({ entry }: { entry: HeroSectionEntry }) {
    const { title, description, cta, background, slug } = entry.fields
    const backgroundUrl = background?.fields.file?.url
    return (
        <section id={slug} style={backgroundUrl ? { backgroundImage: `url(https:${backgroundUrl})` } : undefined} className="full-bleed flex-1 min-h-0 flex items-center justify-center bg-cover bg-center bg-no-repeat">
            <div className="w-[582px] flex flex-col gap-[24px] justify-center items-center">
                <h1 className="text-black">{title}</h1>
                <p className="text-neutral-600 text-center">{description}</p>
                {cta && <Button className="w-fit" variant={cta.fields.variant} onClick={() => { }}>{cta.fields.text}</Button>}
            </div>
        </section >
    );
}
