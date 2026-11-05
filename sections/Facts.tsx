import type { FactsSectionEntry } from "@/utils/contentful";

export default function Facts({ entry }: { entry: FactsSectionEntry }) {
    const { facts } = entry.fields
    return (
        <section className="pb-[64px]">
            <ul className="flex justify-between">
                {facts.filter((f) => f !== undefined).map((fact) => (
                    <li key={fact.sys.id}>
                        <p className="display text-black">{fact.fields.fact}</p>
                        <p className="text-neutral-600">{fact.fields.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
