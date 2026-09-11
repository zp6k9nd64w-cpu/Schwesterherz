const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-menu");

menuButton.addEvemtListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    document.body.styles.overflow = isOpen ? "hidden" : "";
})

document.querySelectorAll(".main-menu a").forEach((Link) => {
    Link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    })
})

/*====================
    Hörproben
====================*/
const playButtons = document.querySelectorAll(".play-button");

playButtons.forEach((button), () => {
    button.addEventListener("click", () => {
        const audioId = button.dataset.audio;
        const audio = document.getElementById(audioId);

        if (audio.paused) {
            audio.play ();
            button.textContent ="||";
        }

        else {
            audio.pause();
            button.textContent = "▶"
        }
    })
    audio.addEventListener("ended", () => {
        button.textContent = "▶"
    })
})