import type { FaqSectionEntry } from "@/utils/contentful";

export default function Faq({ entry }: { entry: FaqSectionEntry }) {
    const { title, faQs, slug } = entry.fields
    return (
        <section id={slug}>
            <h2>{title}</h2>
            <div>
                {faQs.filter((f) => f !== undefined).map((item, index) => (
                    <details key={item.sys.id} name="faq" open={index === 0}>
                        <summary>{item.fields.question}</summary>
                        <p>{item.fields.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
