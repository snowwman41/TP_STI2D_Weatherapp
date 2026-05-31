// Boîte de dialogue de confirmation maison, au thème du site (remplace window.confirm).
// Retourne une Promise<boolean> : true si l'utilisateur confirme, false sinon.
export function confirmDialog({ message, okLabel = "OK", cancelLabel = "Annuler", danger = false }) {
  return new Promise(resolve => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <p class="modal-msg"></p>
        <div class="modal-actions">
          <button class="btn modal-cancel"></button>
          <button class="btn ${danger ? "btn-danger" : "btn-primary"} modal-ok"></button>
        </div>
      </div>`;
    // Textes injectés via textContent (pas d'injection HTML possible).
    overlay.querySelector(".modal-msg").textContent = message;
    overlay.querySelector(".modal-cancel").textContent = cancelLabel;
    overlay.querySelector(".modal-ok").textContent = okLabel;

    document.body.appendChild(overlay);

    function close(value) {
      document.removeEventListener("keydown", onKey);
      overlay.classList.add("closing");
      setTimeout(() => overlay.remove(), 150);
      resolve(value);
    }
    function onKey(e) {
      if (e.key === "Escape") close(false);
      if (e.key === "Enter") close(true);
    }

    overlay.querySelector(".modal-ok").addEventListener("click", () => close(true));
    overlay.querySelector(".modal-cancel").addEventListener("click", () => close(false));
    overlay.addEventListener("click", e => { if (e.target === overlay) close(false); });
    document.addEventListener("keydown", onKey);
    overlay.querySelector(".modal-cancel").focus();
  });
}
