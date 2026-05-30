import { initTheme } from "./theme.js";
import { getLang, setLang, onLangChange, applyStaticI18n } from "./i18n.js";

initTheme(document.getElementById("theme-toggle"));
document.getElementById("burger").addEventListener("click", () =>
  document.getElementById("sidebar").classList.toggle("open"));

const langSel = document.getElementById("lang");
langSel.value = getLang();
langSel.addEventListener("change", () => setLang(langSel.value));
onLangChange(() => { applyStaticI18n(); /* le routeur re-rendra l'étape (Phase 3+) */ });
applyStaticI18n();

document.getElementById("content").innerHTML = "<p>Initialisation…</p>";
