import type { HeroSectionEntry } from "@/utils/contentful";

export default function Hero({ entry }: { entry: HeroSectionEntry }) {
    const { title, description, cta, background } = entry.fields
    const backgroundUrl = background?.fields.file?.url
    return (
        <section style={backgroundUrl ? { backgroundImage: `url(https:${backgroundUrl})` } : undefined}>
            <h1>{title}</h1>
            <p>{description}</p>
            {cta && <button>{cta.fields.text}</button>}
        </section>
    );
}
