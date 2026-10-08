export function loadtheme() {
    document.querySelector("html")?.classList.add(localStorage.getItem("theme")!);
}