const DESTINO = "index.html";
const SESSION_KEY = "manifiestoVisto";

const enterBtn = document.getElementById("manifestEnter");

if (enterBtn) {
  enterBtn.addEventListener("click", () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    window.location.href = DESTINO;
  });
}
