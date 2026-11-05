import type { PricesSectionEntry } from "@/utils/contentful";

export default function Prices({ entry }: { entry: PricesSectionEntry }) {
    const { title, description, prices, slug } = entry.fields
    return (
        <section id={slug}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <ul>
                {prices.filter((p) => p !== undefined).map((item) => {
                    const { title, description, bulletList, price, cta, image } = item.fields
                    const imageUrl = image?.fields.file?.url
                    return (
                        <li key={item.sys.id}>
                            {imageUrl && <img src={`https:${imageUrl}`} alt={image?.fields.title ?? title} />}
                            <h3>{title}</h3>
                            <p>{description}</p>
                            {bulletList && (
                                <ul>
                                    {bulletList.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                            )}
                            <p>{price}</p>
                            {cta && <button>{cta.fields.text}</button>}
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
