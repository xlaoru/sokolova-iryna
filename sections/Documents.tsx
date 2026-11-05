import type { DocumentsSectionEntry } from "@/utils/contentful";

export default function Documents({ entry }: { entry: DocumentsSectionEntry }) {
    const { title, description, documents, cta, slug } = entry.fields
    return (
        <section id={slug}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <ul>
                {documents.filter((d) => d !== undefined).map((document) => {
                    const url = document.fields.file?.url
                    if (!url) return null
                    return (
                        <li key={document.sys.id}>
                            <a href={`https:${url}`} target="_blank" rel="noopener noreferrer">
                                <img src={`https:${url}`} alt={document.fields.description || document.fields.title || title} />
                            </a>
                        </li>
                    )
                })}
            </ul>
            {cta && <button>{cta.fields.text}</button>}
        </section>
    );
}
