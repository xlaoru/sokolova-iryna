import type { AboutMeSectionEntry } from "@/utils/contentful";
import { Check } from "lucide-react";

export default function About({ entry }: { entry: AboutMeSectionEntry }) {
    const { title, body, bulletList, image, slug } = entry.fields
    const imageUrl = image?.fields.file?.url

    return (
        <section id={slug} className="flex flex-row gap-[24px] py-[64px]">
            {imageUrl && <img src={`https:${imageUrl}`} alt={image?.fields.title ?? title} className="size-[612px] rounded-[2px]" />}
            <div className="bg-neutral-50 p-[24px] rounded-[2px] w-full flex flex-row items-center justify-center">
                <div className="w-[439px] flex flex-col gap-[16px]">
                    <h2 className="text-black">{title}</h2>
                    <ul className="flex flex-col gap-[12px]">
                        {body.map((item, index) => (
                            <li key={index} className="text-neutral-600">{item}</li>
                        ))}
                    </ul>
                    {bulletList && (
                        <ul className="flex flex-col gap-[12px]">
                            {bulletList.map((item) => (
                                <li key={item} className="text-neutral-800 flex flex-row items-center gap-[8px]"><Check className="size-[24px] text-blue-300" /> {item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
