import type { TestimonialsSectionEntry } from "@/utils/contentful";

export default function Testimonials({ entry }: { entry: TestimonialsSectionEntry }) {
    const { title, description, testimonials, background } = entry.fields
    const backgroundUrl = background?.fields.file?.url
    return (
        <section
            id="testimonials"
            style={backgroundUrl ? { backgroundImage: `url(https:${backgroundUrl})` } : undefined}
        >
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <ul>
                {testimonials.filter((t) => t !== undefined).map((item) => {
                    const { quote, avatar, name, description } = item.fields
                    const avatarUrl = avatar?.fields.file?.url
                    return (
                        <li key={item.sys.id}>
                            <figure>
                                <blockquote>{quote}</blockquote>
                                <figcaption>
                                    {avatarUrl && <img src={`https:${avatarUrl}`} alt={name} />}
                                    <p>{name}</p>
                                    {description && <p>{description}</p>}
                                </figcaption>
                            </figure>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
