import { notFound } from "next/navigation";
import Sections from "@/sections/Sections";
import { getPage } from "@/utils/contentful";

export default async function Home() {
  const page = await getPage("/")

  if (!page) notFound()

  return <Sections sections={page.fields.sections} />;
}
