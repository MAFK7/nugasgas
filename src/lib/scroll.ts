export type SectionId = "home" | "tugas" | "contact";

export function scrollToSection(id: SectionId) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    if (id === "home") {
        window.scrollTo({ top: 0, behavior });
        return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}