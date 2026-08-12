const EDAD_MINIMA = 18;
const DESTINO = "manifiesto.html";
const REDIRECCION_MENOR = "https://www.disneyplus.com/es-mx/";
const SESSION_KEY = "edadVerificada";

const gateForm = document.getElementById("gateForm");
const birthdateInput = document.getElementById("birthdate");
const gateError = document.getElementById("gateError");
const facebookBtn = document.getElementById("facebookAccess");
const googleBtn = document.getElementById("googleAccess");

// Si ya se verificó la edad en esta sesión, se salta directamente al sitio principal.
if (sessionStorage.getItem(SESSION_KEY) === "true") {
  window.location.replace(DESTINO);
}

function calcularEdad(fechaNacimientoISO) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimientoISO);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const meses = hoy.getMonth() - nacimiento.getMonth();

  if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad -= 1;
  }

  return edad;
}

function verificarAcceso() {
  const valor = birthdateInput.value;

  // Sin fecha de nacimiento no hay forma de confirmar la mayoría de edad: se envía a contenido apto para todo público.
  if (!valor) {
    window.location.href = REDIRECCION_MENOR;
    return false;
  }

  const nacimiento = new Date(valor);

  if (Number.isNaN(nacimiento.getTime()) || nacimiento > new Date()) {
    gateError.textContent = "Ingresa una fecha de nacimiento válida.";
    return false;
  }

  const edad = calcularEdad(valor);

  if (edad < EDAD_MINIMA) {
    window.location.href = REDIRECCION_MENOR;
    return false;
  }

  gateError.textContent = "";
  sessionStorage.setItem(SESSION_KEY, "true");
  sessionStorage.setItem("edadVerificadaEn", new Date().toISOString());
  window.location.href = DESTINO;
  return true;
}

if (gateForm) {
  gateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    verificarAcceso();
  });
}

// El acceso con Facebook o Google también exige confirmar la mayoría de edad antes de continuar.
[facebookBtn, googleBtn].forEach((boton) => {
  if (!boton) {
    return;
  }

  boton.addEventListener("click", () => {
    verificarAcceso();
  });
});
