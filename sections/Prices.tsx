"use client"

import Button from "@/components/Button";
import type { PricesSectionEntry } from "@/utils/contentful";
import { Check } from "lucide-react";

export default function Prices({ entry }: { entry: PricesSectionEntry }) {
    const { title, description, prices, slug } = entry.fields
    return (
        <section id={slug} className="flex flex-col gap-[48px] py-[64px]">
            <div className="flex flex-col items-center gap-[16px]">
                <h2 className="text-black">{title}</h2>
                {description && <p className="text-neutral-600">{description}</p>}
            </div>
            <ul className="flex flex-row justify-between gap-[24px]">
                {prices.filter((p) => p !== undefined).map((item) => {
                    const { title, description, bulletList, price, cta, image } = item.fields
                    const imageUrl = image?.fields.file?.url
                    return (
                        <li key={item.sys.id} className="w-[380px] h-[577px]">
                            {imageUrl && <img src={`https:${imageUrl}`} alt={image?.fields.title ?? title} />}
                            <div className="flex flex-col gap-[24px] border border-neutral-200 pt-[16px] px-[24px] pb-[24px] border-t-0 rounded-[2px]">
                                <div className="flex flex-col gap-[12px]">
                                    <h3 className="text-black w-[60%]">{title}</h3>
                                    <p className="text-neutral-600">{description}</p>
                                </div>
                                {bulletList && (
                                    <ul className="flex flex-col gap-[12px]">
                                        {bulletList.map((bullet) => (
                                            <li key={bullet} className="text-neutral-800 flex flex-row items-center gap-[8px]"><Check className="size-[24px] text-blue-300" /> {bullet}</li>
                                        ))}
                                    </ul>
                                )}
                                <h4 className="text-black">{price}</h4>
                                {cta && <Button variant={cta.fields.variant} onClick={() => { }}>{cta.fields.text}</Button>}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
