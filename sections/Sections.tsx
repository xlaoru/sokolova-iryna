import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import type { HeaderEntry, HeroSectionEntry, PageSkeleton } from "@/utils/contentful";
import type { Entry } from "contentful";

type Page = Entry<PageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export default function Sections({ sections }: { sections: Page['fields']['sections'] }) {
    return sections.map((section) => {
        if (!section) return null

        switch (section.sys.contentType.sys.id) {
            case 'header':
                return <Header key={section.sys.id} entry={section as HeaderEntry} />
            case 'heroSection':
                return <Hero key={section.sys.id} entry={section as HeroSectionEntry} />
            default:
                return null
        }
    })
}
