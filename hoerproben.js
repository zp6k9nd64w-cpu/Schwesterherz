/* ========================================
   HÖRPROBEN
======================================== */

const playButtons = document.querySelectorAll(".play-button");
const allAudios = document.querySelectorAll("audio");


/* ========================================
   ZEIT FORMATIEREN
======================================== */

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

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}


/* ========================================
   PLAY-BUTTONS ZURÜCKSETZEN
======================================== */

function resetPlayButtons() {

    playButtons.forEach((button) => {

        button.textContent = "▶";

    });

}


/* ========================================
   AUDIO-PLAYER
======================================== */

playButtons.forEach((button) => {

    const audioId = button.dataset.audio;

    const audio =
        document.getElementById(audioId);


    const progress =
        document.querySelector(
            `[data-progress="${audioId}"]`
        );


    const track =
        progress?.parentElement;


    /*
        Prüfen, ob alle benötigten Elemente
        vorhanden sind.
    */

    if (!audio || !progress || !track) {

        console.error(
            "Audio-Player konnte nicht gefunden werden:",
            audioId
        );

        return;
    }


    /* ========================================
       ZEITANZEIGE ERSTELLEN
    ======================================== */

    /*
        Die Zeitanzeige wird automatisch
        mit JavaScript erstellt.

        Dadurch musst du sie nicht bei jedem
        Song einzeln ins HTML schreiben.
    */

    const timeDisplay =
        document.createElement("span");

    timeDisplay.classList.add("player-time");

    timeDisplay.textContent =
        "0:00 / 0:00";

    track.insertAdjacentElement(
        "afterend",
        timeDisplay
    );


    /* ========================================
       PLAY / PAUSE
    ======================================== */

    button.addEventListener("click", async () => {

        try {

            /*
                Wenn der ausgewählte Song
                gerade nicht läuft.
            */

            if (audio.paused) {


                /* ========================================
                   ANDERE SONGS STOPPEN
                ======================================== */

                allAudios.forEach((otherAudio) => {

                    /*
                        Nur andere Songs zurücksetzen.

                        Der Song, auf den gerade geklickt
                        wurde, wird nicht verändert.
                    */

                    if (otherAudio !== audio) {

                        /*
                            Anderen Song pausieren.
                        */

                        otherAudio.pause();


                        /*
                            Anderen Song auf
                            0:00 zurücksetzen.
                        */

                        otherAudio.currentTime = 0;

                    }

                });


                /*
                    Alle Play-Buttons wieder
                    auf ▶ setzen.
                */

                resetPlayButtons();


                /*
                    Ausgewählten Song starten.
                */

                await audio.play();


                /*
                    Button zeigt jetzt Pause an.
                */

                button.textContent = "Ⅱ";


            } else {


                /* ========================================
                   AKTUELLEN SONG PAUSIEREN
                ======================================== */

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


    /* ========================================
       GESAMTDAUER ANZEIGEN
    ======================================== */

    audio.addEventListener(
        "loadedmetadata",
        () => {

            timeDisplay.textContent =
                `0:00 / ${formatTime(audio.duration)}`;

        }
    );


    /* ========================================
       FORTSCHRITTSBALKEN + ZEIT
    ======================================== */

    audio.addEventListener(
        "timeupdate",
        () => {

            if (!Number.isFinite(audio.duration)) {
                return;
            }


            /*
                Prozent berechnen, wie weit
                der Song abgespielt wurde.
            */

            const progressPercentage =
                (audio.currentTime / audio.duration) * 100;


            /*
                Fortschrittsbalken aktualisieren.
            */

            progress.style.width =
                `${progressPercentage}%`;


            /*
                Aktuelle Zeit anzeigen.

                Beispiel:
                0:32 / 2:14
            */

            timeDisplay.textContent =
                `${formatTime(audio.currentTime)} / ` +
                `${formatTime(audio.duration)}`;

        }
    );


    /* ========================================
       IM FORTSCHRITTSBALKEN SPRINGEN
    ======================================== */

    track.addEventListener(
        "click",
        (event) => {

            if (!Number.isFinite(audio.duration)) {
                return;
            }


            /*
                Position und Breite des
                Fortschrittsbalkens bestimmen.
            */

            const trackPosition =
                track.getBoundingClientRect();


            /*
                Herausfinden, wo auf den
                Balken geklickt wurde.
            */

            const clickedPosition =
                event.clientX - trackPosition.left;


            /*
                Klickposition in Prozent
                umrechnen.
            */

            const clickedPercentage =
                clickedPosition /
                trackPosition.width;


            /*
                Audio an die entsprechende
                Stelle springen lassen.
            */

            audio.currentTime =
                clickedPercentage *
                audio.duration;

        }
    );


    /* ========================================
       SONG IST ZU ENDE
    ======================================== */

    audio.addEventListener(
        "ended",
        () => {


            /*
                Song wieder auf
                0:00 setzen.
            */

            audio.currentTime = 0;


            /*
                Play-Symbol wieder anzeigen.
            */

            button.textContent = "▶";


            /*
                Fortschrittsbalken wieder
                komplett zurücksetzen.
            */

            progress.style.width = "0%";


            /*
                Zeitanzeige wieder auf
                0:00 setzen.
            */

            timeDisplay.textContent =
                `0:00 / ${formatTime(audio.duration)}`;

        }
    );

});