import type { StepsSectionEntry } from "@/utils/contentful";

export default function Steps({ entry }: { entry: StepsSectionEntry }) {
    const { title, description, steps, cta, slug } = entry.fields
    return (
        <section id={slug}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <ol>
                {steps.filter((s) => s !== undefined).map((step) => (
                    <li key={step.sys.id}>
                        <h3>{step.fields.title}</h3>
                        <p>{step.fields.description}</p>
                    </li>
                ))}
            </ol>
            {cta && <button>{cta.fields.text}</button>}
        </section>
    );
}
