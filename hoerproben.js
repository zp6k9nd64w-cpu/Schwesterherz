/* ========================================

   BURGER-MENÜ

======================================== */

const menuButton = document.querySelector(".menu-toggle");

const menu = document.querySelector(".main-menu");

if (menuButton && menu) {

    menuButton.addEventListener("click", () => {

        const isOpen = menu.classList.toggle("is-open");

        menuButton.setAttribute(

            "aria-expanded",

            String(isOpen)

        );

        document.body.style.overflow =

            isOpen ? "hidden" : "";

    });

    document.querySelectorAll(".main-menu a").forEach((link) => {

        link.addEventListener("click", () => {

            menu.classList.remove("is-open");

            menuButton.setAttribute(

                "aria-expanded",

                "false"

            );

            document.body.style.overflow = "";

        });

    });

}

/* ========================================

   HÖRPROBEN

======================================== */

const playButtons =

    document.querySelectorAll(".play-button");

playButtons.forEach((button) => {

    const audioId = button.dataset.audio;

    const audio =

        document.getElementById(audioId);

    if (!audio) {

        console.error(

            "Audio nicht gefunden:",

            audioId

        );

        return;

    }

    button.addEventListener("click", async () => {

        try {

            if (audio.paused) {

                await audio.play();

                button.textContent = "Ⅱ";

            } else {

                audio.pause();

                button.textContent = "▶";

            }

        } catch (error) {

            console.error(

                "Audio konnte nicht abgespielt werden:",

                error

            );

        }

    });

    audio.addEventListener("ended", () => {

        button.textContent = "▶";

    });

});