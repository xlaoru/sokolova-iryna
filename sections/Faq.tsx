import type { FaqSectionEntry } from "@/utils/contentful";
import { Minus, Plus } from "lucide-react";

export default function Faq({ entry }: { entry: FaqSectionEntry }) {
    const { title, faQs, slug } = entry.fields
    return (
        <section id={slug} className="flex flex-col items-center gap-[48px] pt-[64px] pb-[128px]">
            <h2 className="text-black text-center">{title}</h2>
            <div className="flex flex-col w-full border-t border-neutral-200">
                {faQs.filter((f) => f !== undefined).map((item, index) => (
                    <details key={item.sys.id} name="faq" open={index === 0} className="group border-b border-neutral-200 transition-colors duration-300 open:bg-neutral-50 open:px-[24px]">
                        <summary className="flex flex-row justify-between items-center gap-[16px] py-[16px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                            <h4 className="text-black group-[:not([open]):hover]:opacity-70">{item.fields.question}</h4>
                            <Plus className="shrink-0 size-[24px] text-blue-600 group-open:hidden group-hover:opacity-70" size={24} strokeWidth={1.5} />
                            <Minus className="shrink-0 size-[24px] text-blue-600 hidden group-open:block" size={24} strokeWidth={1.5} />
                        </summary>
                        <p className="text-neutral-600 mb-[16px]">{item.fields.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
