import { initTheme } from "./theme.js";
import { getLang, setLang, onLangChange, applyStaticI18n, t, pick } from "./i18n.js";
import { startRouter, onRoute, parseHash, navigate } from "./router.js";
import { flatSteps, stepAt, globalIndex } from "../../content/modules.js";
import { renderSidebar } from "./sidebar.js";
import { renderStep } from "./step-template.js";
import { isUnlocked, markCompleted, unlockAll, getState, resetProgress, initProgress } from "./progress.js";
import { confirmDialog } from "./modal.js";
import { showLogin } from "./login.js";

const content = document.getElementById("content");

function show(route) {
  const gi = globalIndex(route.module, route.etape);
  if (gi === -1 || !isUnlocked(gi)) { content.innerHTML = `<p>${t("locked")}</p>`; renderSidebar(route); return; }
  const step = stepAt(route.module, route.etape);
  renderStep(content, step, {
    globalIndex: gi,
    teacher: getState().teacher,
    onComplete: (ratio) => { markCompleted(gi, ratio); renderSidebar(route); },
    gotoNext: () => { const n = flatSteps[gi + 1]; if (n) navigate(n.module, n.etape); },
    gotoPrev: () => { const p = flatSteps[gi - 1]; if (p) navigate(p.module, p.etape); }
  });
  renderSidebar(route);
  if (mqMobile.matches) closeSidebar();
  window.scrollTo(0, 0);
}

// Init immédiat (avant login)
initTheme(document.getElementById("theme-toggle"));

const sidebarEl = document.getElementById("sidebar");
const backdropEl = document.getElementById("sidebar-backdrop");
const burgerEl = document.getElementById("burger");
const mqMobile = window.matchMedia("(max-width: 800px)");

function setSidebar(open) {
  sidebarEl.classList.toggle("open", open);
  backdropEl.classList.toggle("open", open);
  document.body.classList.toggle("sidebar-open", open);
  burgerEl.setAttribute("aria-expanded", open ? "true" : "false");
}
const closeSidebar = () => setSidebar(false);

burgerEl.addEventListener("click", () => setSidebar(!sidebarEl.classList.contains("open")));
backdropEl.addEventListener("click", closeSidebar);
sidebarEl.addEventListener("click", (e) => {
  const link = e.target.closest("a.step-link");
  if (link && !link.classList.contains("locked")) closeSidebar();
});
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSidebar(); });
mqMobile.addEventListener("change", (e) => { if (!e.matches) closeSidebar(); });

const langSel = document.getElementById("lang");
langSel.value = getLang();
langSel.addEventListener("change", () => setLang(langSel.value));

// Attendre le login avant de démarrer l'app
const { pseudo, savedData } = await showLogin();
initProgress(pseudo, savedData);

document.getElementById('pseudo-display').textContent = `👤 ${pseudo}`;

// Réinitialisation
const resetBtn = document.getElementById("reset");
const applyResetLabel = () => { resetBtn.title = t("reset"); };
resetBtn.addEventListener("click", async () => {
  const ok = await confirmDialog({
    message: pick({
      fr: "⚠️ Réinitialiser effacera TOUTE ta progression (étapes terminées, scores de quiz, déverrouillages). Tu recommenceras depuis le tout début. Continuer ?",
      en: "⚠️ Resetting will erase ALL your progress (completed steps, quiz scores, unlocks). You'll start over from the very beginning. Continue?"
    }),
    okLabel: pick({ fr: "Tout réinitialiser", en: "Reset everything" }),
    cancelLabel: pick({ fr: "Annuler", en: "Cancel" }),
    danger: true
  });
  if (!ok) return;
  resetProgress();
  navigate(0, 0);
  show(parseHash(location.hash));
});

onLangChange(() => { applyStaticI18n(); applyResetLabel(); show(parseHash(location.hash)); });
applyStaticI18n();
applyResetLabel();

// Déverrouillage prof : Ctrl+Shift+U
window.addEventListener("keydown", e => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "u") { unlockAll(); show(parseHash(location.hash)); }
});

onRoute(show);
startRouter();
