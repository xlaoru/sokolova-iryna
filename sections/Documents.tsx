"use client"

import Button from "@/components/Button";
import DocumentPreview from "@/components/DocumentPreview";
import DocumentsOverlay from "@/components/DocumentsOverlay";
import type { DocumentsSectionEntry } from "@/utils/contentful";
import { useState } from "react";

const LIMIT = 6

export default function Documents({ entry }: { entry: DocumentsSectionEntry }) {
    const { title, description, documents, cta, slug } = entry.fields

    const [isExtended, setExtended] = useState(false)

    const [isOpen, setOpen] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)

    const validDocuments = documents.filter((d) => d !== undefined && d.fields.file?.url)
    const visibleDocuments = isExtended ? validDocuments : validDocuments.slice(0, LIMIT)
    const hasMore = validDocuments.length > LIMIT
    const urls = validDocuments.map((d) => `https:${d!.fields.file!.url}`)

    return (
        <section id={slug} className="flex flex-col items-center gap-[48px] py-[64px]">
            <div className="flex flex-col gap-[16px] items-center">
                <h2 className="text-black text-center">{title}</h2>
                {description && <p className="text-neutral-600 text-center">{description}</p>}
            </div>
            <ul className="grid w-full grid-cols-[repeat(auto-fill,188px)] justify-center gap-[24px]">
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
