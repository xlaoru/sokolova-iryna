export function navigate(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    history.replaceState(null, "", `#${id}`)
}
