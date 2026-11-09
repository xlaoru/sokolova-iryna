"use client"

import Button from "@/components/Button";
import type { CasesSectionEntry } from "@/utils/contentful";
import { navigate } from "@/utils/navigate";
import { FileSearchCorner } from "lucide-react";
import { useState } from "react";

export default function Cases({ entry }: { entry: CasesSectionEntry }) {
    const { title, description, cases, slug } = entry.fields
    const items = cases.filter((c) => c !== undefined)

    const [activeTab, setActiveTab] = useState(0)
    const activeCase = items[activeTab]

    return (
        <section id={slug} className="flex flex-col gap-[48px] py-[64px] items-center justify-center">
            <div className="flex flex-col gap-[16px]">
                <h2 className="text-black text-center">{title}</h2>
                {description && <p className="text-neutral-600 text-center">{description}</p>}
            </div>
            <div className="flex flex-row gap-[24px]">
                <div className="flex flex-row gap-[24px] max-[1025px]:hidden">
                    <ul className="border-t border-neutral-200 w-[50%]">
                        {items.map((item, index) => (
                            <li key={item.sys.id} onClick={() => setActiveTab(index)} data-active={index === activeTab} className="cursor-pointer hover:opacity-[0.5] py-[24px] border-b border-neutral-200 last:border-b-0 data-[active=true]:bg-neutral-50 data-[active=true]:pl-[24px] data-[active=true]:hover:opacity-[1]">
                                <h3>{item.fields.title}</h3>
                            </li>
                        ))}
                    </ul>
                    {activeCase && (
                        <div className="py-[24px] w-[718px] flex flex-row items-center justify-center bg-neutral-50 rounded-[2px]">
                            <div className="w-[70%] flex flex-col gap-[24px]">
                                <FileSearchCorner className="size-[48px] p-[12px] rounded-[2px] bg-white text-blue-600 border-1 border-neutral-100" />
                                <p className="text-black font-normal text-[24px] leading-[32px]">{activeCase.fields.body}</p>
                                {activeCase.fields.tags && (
                                    <ul className="flex flex-row flex-wrap gap-[8px]">
                                        {activeCase.fields.tags.map((tag) => (
                                            <li className="bg-white text-neutral-600 font-normal text-[12px] leading-[20px] uppercase px-[16px] py-[8px] border-1 border-neutral-100" key={tag}>{tag}</li>
                                        ))}
                                    </ul>
                                )}
                                {activeCase.fields.cta && <Button variant={activeCase.fields.cta.fields.variant} onClick={() => { navigate("contact") }} className="w-fit">{activeCase.fields.cta.fields.text}</Button>}
                            </div>
                        </div>
                    )}
                </div>
                <div className="hidden max-[1025px]:flex flex-col gap-[24px]">
                    {items.map((item, index) => (
                        <div key={index} className="p-[48px] max-[391px]:p-[24px] flex flex-row items-center justify-center bg-neutral-50 rounded-[2px]">
                            <div className="flex flex-col gap-[24px]">
                                <div className="flex flex-row gap-[12px] items-center">
                                    <FileSearchCorner className="size-[48px] p-[12px] rounded-[2px] bg-white text-blue-600 border-1 border-neutral-100" />
                                    <h3>{item.fields.title}</h3>
                                </div>
                                <p className="text-black font-normal text-[18px] leading-[24px] max-[391px]:text-[14px] max-[391px]:leading-[20px]">{item.fields.body}</p>
                                {item.fields.tags && (
                                    <ul className="flex flex-row flex-wrap gap-[8px]">
                                        {item.fields.tags.map((tag) => (
                                            <li className="bg-white text-neutral-600 font-normal text-[12px] leading-[20px] uppercase px-[16px] py-[8px] border-1 border-neutral-100" key={tag}>{tag}</li>
                                        ))}
                                    </ul>
                                )}
                                {item.fields.cta && <Button className="w-full" variant={item.fields.cta.fields.variant} onClick={() => { navigate("contact") }}>{item.fields.cta.fields.text}</Button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
