import type { FooterEntry } from "@/utils/contentful";

export default function Footer({ entry }: { entry: FooterEntry }) {
    const { texts } = entry.fields
    return (
        <footer>
            {texts.filter((t) => t !== undefined).map((item) => (
                <ul key={item.sys.id}>
                    {item.fields.texts?.map((text) => (
                        <li key={text} className="text-[#7C89A9] max-[1025px]:text-center">{text}</li>
                    ))}
                </ul>
            ))}
        </footer>
    );
}
