const yearElement = document.getElementById("year");
const castingForm = document.getElementById("castingForm");
const formNote = document.getElementById("formNote");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (castingForm && formNote) {
  castingForm.addEventListener("submit", (event) => {
    if (!castingForm.checkValidity()) {
      event.preventDefault();
      formNote.textContent = "Completa todos los campos requeridos antes de enviar tu solicitud de audición.";
      castingForm.reportValidity();
      return;
    }

    formNote.textContent = "Enviando tu solicitud de audición...";
  });
}
