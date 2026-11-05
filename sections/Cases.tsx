import type { CasesSectionEntry } from "@/utils/contentful";

export default function Cases({ entry }: { entry: CasesSectionEntry }) {
    const { title, description, cases, slug } = entry.fields
    return (
        <section id={slug}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <ul>
                {cases.filter((c) => c !== undefined).map((item) => (
                    <li key={item.sys.id}>
                        <h3>{item.fields.title}</h3>
                        <p>{item.fields.body}</p>
                        {item.fields.tags && (
                            <ul>
                                {item.fields.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        )}
                        {item.fields.cta && <button>{item.fields.cta.fields.text}</button>}
                    </li>
                ))}
            </ul>
        </section>
    );
}
