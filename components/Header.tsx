"use client"

import { useState } from "react";
import type { HeaderEntry } from "@/utils/contentful";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import { navigate } from "@/utils/navigate";

export default function Header({ entry }: { entry: HeaderEntry }) {
    const { brandName, brandSubtitle, bookmarks, button } = entry.fields
    const [isOpen, setIsOpen] = useState(false)
    const links = bookmarks.filter((b) => b !== undefined)
    return (
        <header>
            <a href="#" className="text-center">
                <p className="text-black font-bold text-[20px] leading-[28px]">{brandName}</p>
                <p className="text-neutral-600 font-semibold text-[10px] leading-[18px]">{brandSubtitle}</p>
            </a>
            <div className="flex flex-row items-center gap-[48px] max-[1025px]:gap-[24px]">
                <nav>
                    {links.map((bookmark) => (
                        <a key={bookmark.sys.id} href={bookmark.fields.ref}>
                            {bookmark.fields.title}
                        </a>
                    ))}
                </nav>
                {button && <Button className="!h-[40px] !px-[24] max-[769px]:hidden" variant={button.fields.variant} onClick={() => navigate("contact")}>{button.fields.text}</Button>}
                <button type="button" aria-label="Menu" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="size-[48px] p-[12px] rounded-[2px] border-1 border-neutral-100 bg-white text-black hidden max-[1025px]:flex">
                    {isOpen ? <X className="size-full" /> : <Menu className="size-full" />}
                </button>
            </div>
            <div data-open={isOpen} className="absolute top-full left-0 w-full flex-col gap-[16px] px-[inherit] py-[24px] border-t-1 border-neutral-100 bg-white hidden data-[open=true]:max-[1025px]:flex">
                {links.map((bookmark) => (
                    <a key={bookmark.sys.id} href={bookmark.fields.ref} onClick={() => setIsOpen(false)}>
                        {bookmark.fields.title}
                    </a>
                ))}
                {button && <Button className="!h-[40px] !px-[24] min-[769px]:hidden" variant={button.fields.variant} onClick={() => { setIsOpen(false); navigate("contact") }}>{button.fields.text}</Button>}
            </div>
        </header>
    );
}
