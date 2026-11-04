import type { HeaderEntry } from "@/utils/contentful";

export default function Header({ entry }: { entry: HeaderEntry }) {
    const { brandName, brandSubtitle, bookmarks, button } = entry.fields
    return (
        <header>
            <div>
                <p>{brandName}</p>
                <p>{brandSubtitle}</p>
            </div>
            <nav>
                {bookmarks.filter((b) => b !== undefined).map((bookmark) => (
                    <a key={bookmark.sys.id} href={bookmark.fields.ref}>
                        {bookmark.fields.title}
                    </a>
                ))}
            </nav>
            {button && <button>{button.fields.text}</button>}
        </header>
    );
}
