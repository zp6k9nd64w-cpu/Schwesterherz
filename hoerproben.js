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

const playButtons = document.querySelectorAll(".play-button");
const allAudios = document.querySelectorAll("audio");

/*
    Wandelt Sekunden in eine lesbare Zeit um.

    Beispiel:
    65 Sekunden werden zu 1:05.
*/
function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}

/*
    Setzt alle Play-Buttons wieder auf das Play-Symbol.
*/
function resetPlayButtons() {
    playButtons.forEach((button) => {
        button.textContent = "▶";
    });
}

playButtons.forEach((button) => {
    const audioId = button.dataset.audio;
    const audio = document.getElementById(audioId);

    const progress = document.querySelector(
        `[data-progress="${audioId}"]`
    );

    const track = progress?.parentElement;

    if (!audio || !progress || !track) {
        console.error(
            "Audio-Player konnte nicht gefunden werden:",
            audioId
        );

        return;
    }

    /*
        Die Zeitanzeige wird automatisch erstellt.

        Deshalb musst du dein HTML nicht bei jedem
        einzelnen Song verändern.
    */
    const timeDisplay = document.createElement("span");

    timeDisplay.classList.add("player-time");
    timeDisplay.textContent = "0:00 / 0:00";

    track.insertAdjacentElement("afterend", timeDisplay);

    /*
        Spielt den ausgewählten Song ab oder pausiert ihn.
    */
    button.addEventListener("click", async () => {
        try {
            if (audio.paused) {
                /*
                    Alle anderen Audiodateien pausieren.
                */
                allAudios.forEach((otherAudio) => {
                    if (otherAudio !== audio) {
                        otherAudio.pause();
                    }
                });

                resetPlayButtons();

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

    /*
        Zeigt die Gesamtdauer an, sobald die
        Informationen der Audiodatei geladen sind.
    */
    audio.addEventListener("loadedmetadata", () => {
        timeDisplay.textContent =
            `0:00 / ${formatTime(audio.duration)}`;
    });

    /*
        Aktualisiert während des Abspielens
        den Fortschrittsbalken und die Zeitanzeige.
    */
    audio.addEventListener("timeupdate", () => {
        if (!Number.isFinite(audio.duration)) {
            return;
        }

        const progressPercentage =
            (audio.currentTime / audio.duration) * 100;

        progress.style.width = `${progressPercentage}%`;

        timeDisplay.textContent =
            `${formatTime(audio.currentTime)} / ` +
            `${formatTime(audio.duration)}`;
    });

    /*
        Mit einem Klick auf den Balken kann man
        zu einer anderen Stelle im Song springen.
    */
    track.addEventListener("click", (event) => {
        if (!Number.isFinite(audio.duration)) {
            return;
        }

        const trackPosition =
            track.getBoundingClientRect();

        const clickedPosition =
            event.clientX - trackPosition.left;

        const clickedPercentage =
            clickedPosition / trackPosition.width;

        audio.currentTime =
            clickedPercentage * audio.duration;
    });

    /*
        Wenn ein Song zu Ende ist, wird der Player
        wieder auf den Anfang gesetzt.
    */
    audio.addEventListener("ended", () => {
        button.textContent = "▶";
        progress.style.width = "0%";

        timeDisplay.textContent =
            `0:00 / ${formatTime(audio.duration)}`;
    });
});