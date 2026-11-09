import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Sections from "@/sections/Sections";
import { getPage } from "@/utils/contentful";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("/")
  if (!page) return {}

  const { title, description, favicon } = page.fields
  const faviconUrl = favicon?.fields.file?.url

  return {
    title,
    description,
    icons: faviconUrl ? { icon: `https:${faviconUrl}` } : undefined,
    openGraph: { title, description },
  }
}

export default async function Home() {
  const page = await getPage("/")

  if (!page) notFound()

  return <Sections sections={page.fields.sections} />;
}
