const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-menu");

menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    document.body.style.overflow = isOpen ? "hidden" : "";
});

document.querySelector(".main-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow ="";
    })
})