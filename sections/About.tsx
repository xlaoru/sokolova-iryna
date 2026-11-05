import type { AboutMeSectionEntry } from "@/utils/contentful";

export default function About({ entry }: { entry: AboutMeSectionEntry }) {
    const { title, body, bulletList, image, slug } = entry.fields
    const imageUrl = image?.fields.file?.url
    return (
        <section id={slug}>
            {imageUrl && <img src={`https:${imageUrl}`} alt={image?.fields.title ?? title} />}
            <div>
                <h2>{title}</h2>
                <p>{body}</p>
                {bulletList && (
                    <ul>
                        {bulletList.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
