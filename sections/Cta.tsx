"use client"

import Button from "@/components/Button";
import type { CtaSectionEntry } from "@/utils/contentful";

export default function Cta({ entry }: { entry: CtaSectionEntry }) {
    const { title, description, input, button, background } = entry.fields
    const backgroundUrl = background?.fields.file?.url
    return (
        <section
            className="full-bleed flex flex-col gap-[48px] py-[128px] items-center bg-cover bg-center bg-no-repeat max-[769px]:px-[16px]"
            id="contact"
            style={backgroundUrl ? { backgroundImage: `url(https:${backgroundUrl})` } : undefined}
        >
            <div className="flex flex-col gap-[16px]">
                <h2 className="text-white text-center">{title}</h2>
                {description && <p className="text-white text-center">{description}</p>}
            </div>
            <form className="flex flex-row gap-[8px] max-[625px]:flex-col max-[625px]:self-stretch">
                <label className="flex flex-row items-center gap-[2px] h-[52px] px-[16px] w-[237px] max-[625px]:w-full rounded-[2px] border-1 border-blue-300 bg-blue-950 text-white focus-within:border-blue-200 transition-colors">
                    <span>+380</span>
                    <input className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-[#7C89A9]" type="tel" name="phone" placeholder={input?.fields.placeholder} required />
                </label>
                {button && <Button className="max-[625px]:w-full" variant={button.fields.variant} onClick={() => { }} >{button.fields.text}</Button>}
            </form>
        </section>
    );
}
