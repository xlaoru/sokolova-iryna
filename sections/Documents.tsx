"use client"

import Button from "@/components/Button";
import DocumentPreview from "@/components/DocumentPreview";
import DocumentsOverlay from "@/components/DocumentsOverlay";
import type { DocumentsSectionEntry } from "@/utils/contentful";
import { useEffect, useRef, useState } from "react";

const CARD_WIDTH = 188
const GAP = 24
const ROWS = 1
const TABLET_QUERY = "(width < 826px)"
const TABLET_COLUMNS = 2
const TABLET_ROWS = 4
const MOBILE_QUERY = "(width < 526px)"
const MOBILE_COLUMNS = 1
const MOBILE_ROWS = 4

export default function Documents({ entry }: { entry: DocumentsSectionEntry }) {
    const { title, description, documents, cta, slug } = entry.fields

    const listRef = useRef<HTMLUListElement>(null)
    const [limit, setLimit] = useState(6 * ROWS)

    useEffect(() => {
        const list = listRef.current
        if (!list) return
        const observer = new ResizeObserver(([e]) => {
            if (window.matchMedia(MOBILE_QUERY).matches) {
                setLimit(MOBILE_COLUMNS * MOBILE_ROWS)
                return
            }
            if (window.matchMedia(TABLET_QUERY).matches) {
                setLimit(TABLET_COLUMNS * TABLET_ROWS)
                return
            }
            const columns = Math.max(1, Math.floor((e.contentRect.width + GAP) / (CARD_WIDTH + GAP)))
            setLimit(columns * ROWS)
        })
        observer.observe(list)
        return () => observer.disconnect()
    }, [])

    const [isExtended, setExtended] = useState(false)

    const [isOpen, setOpen] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)

    const validDocuments = documents.filter((d) => d !== undefined && d.fields.file?.url)
    const visibleDocuments = isExtended ? validDocuments : validDocuments.slice(0, limit)
    const hasMore = validDocuments.length > limit
    const urls = validDocuments.map((d) => `https:${d!.fields.file!.url}`)

    return (
        <section id={slug} className="flex flex-col items-center gap-[48px] py-[64px]">
            <div className="flex flex-col gap-[16px] items-center">
                <h2 className="text-black text-center">{title}</h2>
                {description && <p className="text-neutral-600 text-center">{description}</p>}
            </div>
            <ul ref={listRef} className="grid w-full grid-cols-[repeat(auto-fit,188px)] max-[826px]:grid-cols-[repeat(2,188px)] max-[526px]:grid-cols-1 justify-center gap-[24px]">
                {visibleDocuments.map((document, index) => (
                    <li key={document!.sys.id}>
                        <DocumentPreview url={urls[index]} onClick={() => { setActiveSlide(index); setOpen(true) }} />
                    </li>
                ))}
            </ul>
            {hasMore && cta && <Button className="!w-fit" variant={cta.fields.variant} onClick={() => { setExtended(!isExtended) }}>{isExtended ? cta.fields.secondaryText ?? cta.fields.text : cta.fields.text}</Button>}
            {isOpen && <DocumentsOverlay urls={urls} activeSlide={activeSlide} setActiveSlide={setActiveSlide} onClose={() => setOpen(false)} />}
        </section>
    );
}
