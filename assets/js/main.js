const yearElement = document.getElementById("year");
const castingForm = document.getElementById("castingForm");
const formNote = document.getElementById("formNote");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (castingForm && formNote) {
  castingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!castingForm.checkValidity()) {
      formNote.textContent = "Completa todos los campos requeridos antes de enviar tu solicitud de audición.";
      castingForm.reportValidity();
      return;
    }

    const formData = new FormData(castingForm);
    const nombre = String(formData.get("nombreCompleto") || "").trim();
    const correo = String(formData.get("correo") || "").trim();
    const nombreArtistico = String(formData.get("nombreArtistico") || "").trim();

    formNote.textContent = `Gracias, ${nombre}. Tu solicitud de audición como "${nombreArtistico}" ha sido registrada correctamente. Nuestro equipo de casting se pondrá en contacto en ${correo} si tu perfil avanza a la siguiente etapa.`;
    castingForm.reset();
  });
}
