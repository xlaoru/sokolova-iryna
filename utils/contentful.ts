import { createClient, type Entry, type EntryFieldTypes, type EntrySkeletonType } from 'contentful'
import { cacheLife, cacheTag } from 'next/cache'

const usePreview = process.env.CONTENTFUL_USE_PREVIEW === 'true'

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
  accessToken: usePreview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!
    : process.env.CONTENTFUL_ACCESS_TOKEN!,
  host: usePreview ? 'preview.contentful.com' : 'cdn.contentful.com',
})

export async function getEntries<T extends EntrySkeletonType>(contentType?: T['contentTypeId']) {
  'use cache'
  cacheLife('hours')
  cacheTag('contentful', `contentful:${contentType ?? 'all'}`)

  const res = await contentfulClient.withoutUnresolvableLinks.getEntries<T>(
    contentType ? { content_type: contentType } : {},
  )
  return res.items
}

export async function getEntry<T extends EntrySkeletonType>(id: string) {
  'use cache'
  cacheLife('hours')
  cacheTag('contentful', `contentful:entry:${id}`)

  return contentfulClient.withoutUnresolvableLinks.getEntry<T>(id)
}

export type ButtonSkeleton = {
  contentTypeId: 'button'
  fields: {
    text: EntryFieldTypes.Symbol
    variant: EntryFieldTypes.Symbol<'Primary' | 'Outline'>
  }
}

export type HeaderBookmarkSkeleton = {
  contentTypeId: 'header_bookmark'
  fields: {
    title: EntryFieldTypes.Symbol
    ref: EntryFieldTypes.Symbol
  }
}

export type HeaderSkeleton = {
  contentTypeId: 'header'
  fields: {
    internalName: EntryFieldTypes.Symbol
    brandName: EntryFieldTypes.Symbol
    brandSubtitle: EntryFieldTypes.Symbol
    bookmarks: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<HeaderBookmarkSkeleton>>
    button: EntryFieldTypes.EntryLink<ButtonSkeleton>
  }
}

export type HeaderEntry = Entry<HeaderSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type HeroSectionSkeleton = {
  contentTypeId: 'heroSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
    cta: EntryFieldTypes.EntryLink<ButtonSkeleton>
    background: EntryFieldTypes.AssetLink
  }
}

export type HeroSectionEntry = Entry<HeroSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type FactSkeleton = {
  contentTypeId: 'fact'
  fields: {
    internalName: EntryFieldTypes.Symbol
    fact: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
  }
}

export type FactsSectionSkeleton = {
  contentTypeId: 'factsSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    facts: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<FactSkeleton>>
  }
}

export type FactsSectionEntry = Entry<FactsSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type AboutMeSectionSkeleton = {
  contentTypeId: 'aboutMeSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    body: EntryFieldTypes.Text
    bulletList: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    image: EntryFieldTypes.AssetLink
  }
}

export type AboutMeSectionEntry = Entry<AboutMeSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type StepSkeleton = {
  contentTypeId: 'step'
  fields: {
    internalName: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
  }
}

export type StepsSectionSkeleton = {
  contentTypeId: 'stepsSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
    steps: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<StepSkeleton>>
    cta: EntryFieldTypes.EntryLink<ButtonSkeleton>
  }
}

export type StepsSectionEntry = Entry<StepsSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type CaseSkeleton = {
  contentTypeId: 'case'
  fields: {
    internalName: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    body: EntryFieldTypes.Text
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    cta: EntryFieldTypes.EntryLink<ButtonSkeleton>
  }
}

export type CasesSectionSkeleton = {
  contentTypeId: 'casesSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
    cases: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<CaseSkeleton>>
  }
}

export type CasesSectionEntry = Entry<CasesSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type PriceSkeleton = {
  contentTypeId: 'prices'
  fields: {
    internalName: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
    bulletList: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    price: EntryFieldTypes.Symbol
    cta: EntryFieldTypes.EntryLink<ButtonSkeleton>
    image: EntryFieldTypes.AssetLink
  }
}

export type PricesSectionSkeleton = {
  contentTypeId: 'pricesSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
    prices: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<PriceSkeleton>>
  }
}

export type PricesSectionEntry = Entry<PricesSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type TestimonialSkeleton = {
  contentTypeId: 'testimonial'
  fields: {
    internalName: EntryFieldTypes.Symbol
    quote: EntryFieldTypes.Symbol
    avatar: EntryFieldTypes.AssetLink
    name: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
  }
}

export type TestimonialsSectionSkeleton = {
  contentTypeId: 'testimonialsSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
    testimonials: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TestimonialSkeleton>>
    background: EntryFieldTypes.AssetLink
  }
}

export type TestimonialsSectionEntry = Entry<
  TestimonialsSectionSkeleton,
  'WITHOUT_UNRESOLVABLE_LINKS'
>

export type DocumentsSectionSkeleton = {
  contentTypeId: 'documentsSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
    documents: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
    cta: EntryFieldTypes.EntryLink<ButtonSkeleton>
  }
}

export type DocumentsSectionEntry = Entry<DocumentsSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type FaqItemSkeleton = {
  contentTypeId: 'faQItem'
  fields: {
    internalName: EntryFieldTypes.Symbol
    question: EntryFieldTypes.Symbol
    answer: EntryFieldTypes.Symbol
  }
}

export type FaqSectionSkeleton = {
  contentTypeId: 'faQSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    faQs: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<FaqItemSkeleton>>
  }
}

export type FaqSectionEntry = Entry<FaqSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type InputSkeleton = {
  contentTypeId: 'input'
  fields: {
    placeholder: EntryFieldTypes.Symbol
  }
}

export type CtaSectionSkeleton = {
  contentTypeId: 'ctaSection'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Symbol
    input: EntryFieldTypes.EntryLink<InputSkeleton>
    button: EntryFieldTypes.EntryLink<ButtonSkeleton>
    background: EntryFieldTypes.AssetLink
  }
}

export type CtaSectionEntry = Entry<CtaSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type FooterItemSkeleton = {
  contentTypeId: 'footerItem'
  fields: {
    internalName: EntryFieldTypes.Symbol
    texts: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
  }
}

export type FooterSkeleton = {
  contentTypeId: 'footer'
  fields: {
    internalName: EntryFieldTypes.Symbol
    texts: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<FooterItemSkeleton>>
  }
}

export type FooterEntry = Entry<FooterSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type PageSkeleton = {
  contentTypeId: 'page'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    sections: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<
        | HeaderSkeleton
        | HeroSectionSkeleton
        | FactsSectionSkeleton
        | AboutMeSectionSkeleton
        | StepsSectionSkeleton
        | CasesSectionSkeleton
        | PricesSectionSkeleton
        | TestimonialsSectionSkeleton
        | DocumentsSectionSkeleton
        | FaqSectionSkeleton
        | CtaSectionSkeleton
        | FooterSkeleton
      >
    >
  }
}

export async function getPage(slug: string) {
  'use cache'
  cacheLife('hours')
  cacheTag('contentful', `contentful:page:${slug}`)

  const res = await contentfulClient.withoutUnresolvableLinks.getEntries<PageSkeleton>({
    content_type: 'page',
    'fields.slug': slug,
    include: 10,
    limit: 1,
  })
  return res.items[0]
}
