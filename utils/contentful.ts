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
    variant: EntryFieldTypes.Symbol
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
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
    cta: EntryFieldTypes.EntryLink<ButtonSkeleton>
    background: EntryFieldTypes.AssetLink
  }
}

export type HeroSectionEntry = Entry<HeroSectionSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>

export type PageSkeleton = {
  contentTypeId: 'page'
  fields: {
    internalName: EntryFieldTypes.Symbol
    slug: EntryFieldTypes.Symbol
    sections: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<HeaderSkeleton | HeroSectionSkeleton>
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
