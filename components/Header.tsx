"use client"

import type { HeaderEntry } from "@/utils/contentful";
import Button from "./Button";

export default function Header({ entry }: { entry: HeaderEntry }) {
    const { brandName, brandSubtitle, bookmarks, button } = entry.fields
    return (
        <header>
            <a href="#" className="text-center">
                <p className="text-black font-bold text-[20px] leading-[28px]">{brandName}</p>
                <p className="text-neutral-600 font-semibold text-[10px] leading-[18px]">{brandSubtitle}</p>
            </a>
            <div className="flex flex-row items-center gap-[48px]">
                <nav>
                    {bookmarks.filter((b) => b !== undefined).map((bookmark) => (
                        <a key={bookmark.sys.id} href={bookmark.fields.ref}>
                            {bookmark.fields.title}
                        </a>
                    ))}
                </nav>
                {button && <Button className="!h-[40px] !px-[24]" variant={button.fields.variant} onClick={() => { }}>{button.fields.text}</Button>}
            </div>
        </header >
    );
}
