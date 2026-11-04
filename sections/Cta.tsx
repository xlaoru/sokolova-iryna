import type { CtaSectionEntry } from "@/utils/contentful";

export default function Cta({ entry }: { entry: CtaSectionEntry }) {
    const { title, description, input, button, background } = entry.fields
    const backgroundUrl = background?.fields.file?.url
    return (
        <section
            id="contact"
            style={backgroundUrl ? { backgroundImage: `url(https:${backgroundUrl})` } : undefined}
        >
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <form>
                <input type="tel" name="phone" placeholder={input?.fields.placeholder} required />
                {button && <button type="submit">{button.fields.text}</button>}
            </form>
        </section>
    );
}
