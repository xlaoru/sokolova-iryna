export function navigate(id?: string) {
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    history.replaceState(null, "", `#${id}`)
}
