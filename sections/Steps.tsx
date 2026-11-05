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
            <ul className="w-full grid grid-cols-3">
                {steps.filter((s) => s !== undefined).map((step, i) => (
                    <li key={step.sys.id} className="relative flex flex-col gap-[16px] items-center after:absolute after:top-[28px] after:left-[calc(50%+44px)] after:w-[calc(100%-88px)] after:h-px after:bg-gray-200 last:after:hidden">
                        <h3 className="size-[64px] flex items-center justify-center border-2 rounded-full border-neutral-200">{i + 1}</h3>
                        <h3 className="text-black text-center">{step.fields.title}</h3>
                        <p className="max-w-[394px] text-neutral-600 text-center">{step.fields.description}</p>
                    </li>
                ))}
            </ul>
            {cta && <Button variant={cta.fields.variant} onClick={() => { }}>{cta.fields.text}</Button>}
        </section>
    );
}
