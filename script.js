const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-menu");

menuButton.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
});

document.querySelectorAll(".main-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

document.querySelectorAll(".play-button").forEach((button) => {
  button.addEventListener("click", () => {
    const wasPlaying = button.classList.contains("is-playing");
    document.querySelectorAll(".play-button").forEach((item) => {
      item.classList.remove("is-playing");
      item.textContent = "▶";
    });
    if (!wasPlaying) {
      button.classList.add("is-playing");
      button.textContent = "Ⅱ";
    }
  });
});
