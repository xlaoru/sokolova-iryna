import Footer from "@/components/Footer";
import Header from "@/components/Header";
import About from "@/sections/About";
import Cases from "@/sections/Cases";
import Cta from "@/sections/Cta";
import Documents from "@/sections/Documents";
import Facts from "@/sections/Facts";
import Faq from "@/sections/Faq";
import Hero from "@/sections/Hero";
import Prices from "@/sections/Prices";
import Steps from "@/sections/Steps";
import Testimonials from "@/sections/Testimonials";
import type { AboutMeSectionEntry, CasesSectionEntry, CtaSectionEntry, DocumentsSectionEntry, FactsSectionEntry, FaqSectionEntry, FooterEntry, HeaderEntry, HeroSectionEntry, PageSkeleton, PricesSectionEntry, StepsSectionEntry, TestimonialsSectionEntry } from "@/utils/contentful";
import type { Entry } from "contentful";

type Page = Entry<PageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>
type Section = NonNullable<Page['fields']['sections'][number]>

export default function Sections({ sections }: { sections: Page['fields']['sections'] }) {
    const list = sections.filter((s) => s !== undefined)
    const result = []
    const ctaSlug = (list.find((s) => s.sys.contentType.sys.id === 'ctaSection') as CtaSectionEntry | undefined)?.fields.slug

    for (let i = 0; i < list.length; i++) {
        const section = list[i]
        const next = list[i + 1]

        if (section.sys.contentType.sys.id === 'heroSection' && next?.sys.contentType.sys.id === 'factsSection') {
            result.push(
                <div key={section.sys.id} className="flex flex-col h-[calc(100svh-var(--header-h))] min-h-[600px] max-[765px]:h-auto">
                    {renderSection(section, ctaSlug)}
                    {renderSection(next, ctaSlug)}
                </div>
            )
            i++
            continue
        }

        result.push(renderSection(section, ctaSlug))
    }

    return result
}

function renderSection(section: Section, ctaSlug?: string) {
    switch (section.sys.contentType.sys.id) {
        case 'header':
            return <Header key={section.sys.id} entry={section as HeaderEntry} ctaSlug={ctaSlug} />
        case 'heroSection':
            return <Hero key={section.sys.id} entry={section as HeroSectionEntry} ctaSlug={ctaSlug} />
        case 'factsSection':
            return <Facts key={section.sys.id} entry={section as FactsSectionEntry} />
        case 'aboutMeSection':
            return <About key={section.sys.id} entry={section as AboutMeSectionEntry} />
        case 'stepsSection':
            return <Steps key={section.sys.id} entry={section as StepsSectionEntry} ctaSlug={ctaSlug} />
        case 'casesSection':
            return <Cases key={section.sys.id} entry={section as CasesSectionEntry} ctaSlug={ctaSlug} />
        case 'pricesSection':
            return <Prices key={section.sys.id} entry={section as PricesSectionEntry} ctaSlug={ctaSlug} />
        case 'testimonialsSection':
            return <Testimonials key={section.sys.id} entry={section as TestimonialsSectionEntry} />
        case 'documentsSection':
            return <Documents key={section.sys.id} entry={section as DocumentsSectionEntry} />
        case 'faQSection':
            return <Faq key={section.sys.id} entry={section as FaqSectionEntry} />
        case 'ctaSection':
            return <Cta key={section.sys.id} entry={section as CtaSectionEntry} />
        case 'footer':
            return <Footer key={section.sys.id} entry={section as FooterEntry} />
        default:
            return null
    }
}
