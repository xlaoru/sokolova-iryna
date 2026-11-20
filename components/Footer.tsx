import type { FooterColumnEntry, FooterEntry } from "@/utils/contentful";

function getColumns(entry: FooterEntry): FooterColumnEntry[] {
    return (entry.fields.texts ?? []).flatMap((item) => {
        if (!item) return []
        return item.sys.contentType.sys.id === "footer"
            ? getColumns(item as FooterEntry)
            : [item as FooterColumnEntry]
    })
}

export default function Footer({ entry }: { entry: FooterEntry }) {
    const columns = getColumns(entry)
    return (
        <footer>
            {columns.map((column) => (
                <ul key={column.sys.id} className="flex flex-col gap-[8px] max-[769px]:gap-[48px]">
                    {column.fields.newFooterItem?.filter((item) => item !== undefined).map((item) => (
                        <li key={item.sys.id} className="text-[#7C89A9] max-[1025px]:text-center max-[769px]:text-lg">
                            {item.fields.link ? (
                                <a href={item.fields.link} {...(item.fields.link.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })} className="underline underline-offset-4 max-[769px]:text-lg">
                                    {item.fields.text}
                                </a>
                            ) : (
                                item.fields.text
                            )}
                        </li>
                    ))}
                </ul>
            ))}
        </footer>
    );
}
