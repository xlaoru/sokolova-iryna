"use client"

import Button from "@/components/Button";
import type { StepsSectionEntry } from "@/utils/contentful";

export default function Steps({ entry }: { entry: StepsSectionEntry }) {
    const { title, description, steps, cta, slug } = entry.fields
    return (
        <section id={slug} className="flex flex-col gap-[48px] justify-center items-center py-[64px]">
            <div className="flex flex-col gap-[16px]">
                <h2 className="text-black text-center">{title}</h2>
                {description && <p className="text-neutral-600 text-center">{description}</p>}
            </div>
            <ul className="w-full grid grid-cols-3 max-[1025px]:grid-cols-1 max-[1025px]:w-fit max-[1025px]:gap-[16px]">
                {steps.filter((s) => s !== undefined).map((step, i) => (
                    <li key={step.sys.id} className="relative flex flex-col gap-[16px] items-center after:absolute after:top-[28px] after:left-[calc(50%+44px)] after:w-[calc(100%-88px)] after:h-px after:bg-gray-200 last:after:hidden max-[1025px]:flex-row max-[1025px]:items-start max-[1025px]:gap-[24px] max-[1025px]:after:top-[76px] max-[1025px]:after:left-[31px] max-[1025px]:after:w-px max-[1025px]:after:h-[57px] max-[1025px]:min-h-[129px] max-[1025px]:last:min-h-0">
                        <h3 className="shrink-0 size-[64px] flex items-center justify-center border-2 rounded-full border-neutral-200">{i + 1}</h3>
                        <div className="flex flex-col gap-[16px] items-center max-[1025px]:items-start">
                            <h3 className="text-black text-center max-[1025px]:text-left">{step.fields.title}</h3>
                            <p className="max-w-[394px] text-neutral-600 text-center max-[1025px]:text-left max-[1025px]:max-w-none">{step.fields.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {cta && <Button className="max-[476px]:w-full" variant={cta.fields.variant} onClick={() => { }}>{cta.fields.text}</Button>}
        </section>
    );
}
