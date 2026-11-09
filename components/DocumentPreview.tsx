type Props = { url: string, alt?: string, onClick?: () => void };

export default function DocumentPreview({ url, alt, onClick }: Props) {
    return (
        <div onClick={onClick} className="relative cursor-pointer flex after:absolute after:inset-0 after:transition-colors hover:after:bg-[#1E1E1E]/10 items-center justify-center size-[188px] max-[526px]:w-full max-[526px]:h-auto max-[526px]:aspect-square border border-blue-50 bg-neutral-50 transition-colors duration-800 ease-out">
            <img src={url} alt={alt} className="size-full object-contain" />
        </div>
    )
}
