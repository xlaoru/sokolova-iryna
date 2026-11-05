import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import Facts from "@/sections/Facts";
import About from "@/sections/About";
import Steps from "@/sections/Steps";
import Cases from "@/sections/Cases";
import Prices from "@/sections/Prices";
import Testimonials from "@/sections/Testimonials";
import Documents from "@/sections/Documents";
import Faq from "@/sections/Faq";
import Cta from "@/sections/Cta";
import Footer from "@/components/Footer";
import type { AboutMeSectionEntry, FactsSectionEntry, CasesSectionEntry, CtaSectionEntry, DocumentsSectionEntry, FaqSectionEntry, FooterEntry, HeaderEntry, HeroSectionEntry, PageSkeleton, PricesSectionEntry, StepsSectionEntry, TestimonialsSectionEntry } from "@/utils/contentful";
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
            case 'factsSection':
                return <Facts key={section.sys.id} entry={section as FactsSectionEntry} />
            case 'aboutMeSection':
                return <About key={section.sys.id} entry={section as AboutMeSectionEntry} />
            case 'stepsSection':
                return <Steps key={section.sys.id} entry={section as StepsSectionEntry} />
            case 'casesSection':
                return <Cases key={section.sys.id} entry={section as CasesSectionEntry} />
            case 'pricesSection':
                return <Prices key={section.sys.id} entry={section as PricesSectionEntry} />
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
    })
}
