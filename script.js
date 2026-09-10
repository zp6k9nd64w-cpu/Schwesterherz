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

/* ================================

   HÖRPROBEN

   ================================ */

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

/* ================================

   SEKTEEMPFANG

   ================================ */

const weddingType = document.getElementById("wedding-type");

const sektempfangGroup = document.getElementById("sektempfang-group");

const sektempfang = document.getElementById("sektempfang");

function updateSektempfangField() {

  const showField =

    weddingType.value === "freie-trauung" ||

    weddingType.value === "kirchliche-trauung";

  sektempfangGroup.hidden = !showField;

  sektempfang.required = showField;

  if (!showField) {

    sektempfang.value = "";

  }

}

weddingType.addEventListener("change", updateSektempfangField);

updateSektempfangField();

/* ================================

   KONTAKTFORMULAR

   ================================ */

const form = document.querySelector(".contact-form");

form.addEventListener("submit", async function(event) {

  event.preventDefault();

  const nameInput = document.querySelector("#name");

  const emailInput = document.querySelector("#email");

  const locationInput = document.querySelector("#location");

  const weddingTypeInput = document.querySelector("#wedding-type");

  const sektempfangInput = document.querySelector("#sektempfang");

  const dateInput = document.querySelector("#date");

  const timeInput = document.querySelector("#time");

  const messageInput = document.querySelector("#message");

  const nameValue = nameInput.value;

  const emailValue = emailInput.value;

  const locationValue = locationInput.value;

  const weddingTypeValue = weddingTypeInput.value;

  const sektempfangValue = sektempfangInput.value;

  const dateValue = dateInput.value;

  const timeValue = timeInput.value;

  const messageValue = messageInput.value;

  const formData = new FormData();

  formData.append("access_key", "a52d325a-5009-4cd3-9b31-76ecd3b59890");

  formData.append("name", nameValue);

  formData.append("email", emailValue);

  formData.append("location", locationValue);

  formData.append("wedding-type", weddingTypeValue);

  formData.append("sektempfang", sektempfangValue);

  formData.append("date", dateValue);

  formData.append("time", timeValue);

  formData.append("message", messageValue);

  try {

    const response = await fetch(

      "https://api.web3forms.com/submit",

      {

        method: "POST",

        body: formData

      }

    );

    const result = await response.json();

    if (result.success) {

      alert("Vielen Dank! Eure Anfrage wurde erfolgreich gesendet.");

      form.reset();

      updateSektempfangField();

    } else {

      alert(

        "Leider ist ein Fehler aufgetreten. Bitte versucht es später erneut."

      );

    }

  } catch (error) {

    alert(

      "Die Anfrage konnte nicht gesendet werden. Bitte überprüft eure Internetverbindung und versucht es erneut."

    );

    console.error(error);

  }

});