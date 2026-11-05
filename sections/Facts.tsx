import type { FactsSectionEntry } from "@/utils/contentful";

export default function Facts({ entry }: { entry: FactsSectionEntry }) {
    const { facts } = entry.fields
    return (
        <section>
            <ul>
                {facts.filter((f) => f !== undefined).map((fact) => (
                    <li key={fact.sys.id}>
                        <h3>{fact.fields.fact}</h3>
                        <p>{fact.fields.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
