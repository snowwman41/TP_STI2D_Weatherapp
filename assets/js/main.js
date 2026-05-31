import { initTheme } from "./theme.js";
import { getLang, setLang, onLangChange, applyStaticI18n, t, pick } from "./i18n.js";
import { startRouter, onRoute, parseHash, navigate } from "./router.js";
import { flatSteps, stepAt, globalIndex } from "../../content/modules.js";
import { renderSidebar } from "./sidebar.js";
import { renderStep } from "./step-template.js";
import { isUnlocked, markCompleted, unlockAll, getState, resetProgress } from "./progress.js";
import { confirmDialog } from "./modal.js";

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
  window.scrollTo(0, 0);
}

// Init
initTheme(document.getElementById("theme-toggle"));
document.getElementById("burger").addEventListener("click", () =>
  document.getElementById("sidebar").classList.toggle("open"));

const langSel = document.getElementById("lang");
langSel.value = getLang();
langSel.addEventListener("change", () => setLang(langSel.value));

// Réinitialisation : efface toute la progression après confirmation (modale au thème du site).
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
