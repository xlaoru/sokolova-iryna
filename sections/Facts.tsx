import type { FactsSectionEntry } from "@/utils/contentful";

export default function Facts({ entry }: { entry: FactsSectionEntry }) {
    const { facts } = entry.fields
    return (
        <section className="pb-[64px]">
            <ul className="flex justify-between max-[765px]:flex-col max-[765px]:items-center max-[765px]:gap-[24px]">
                {facts.filter((f) => f !== undefined).map((fact) => (
                    <li key={fact.sys.id}>
                        <p className="display text-black max-[765px]:text-center">{fact.fields.fact}</p>
                        <p className="text-neutral-600 max-[765px]:text-center">{fact.fields.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
