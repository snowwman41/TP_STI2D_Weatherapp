import { uiStrings } from "../../content/ui-strings.js";

const KEY = "tbv:lang";
const hasLS = typeof localStorage !== "undefined";
let lang = (hasLS && localStorage.getItem(KEY)) || "fr";
const listeners = new Set();

export function getLang() { return lang; }

export function setLang(next) {
  lang = next === "en" ? "en" : "fr";
  if (hasLS) localStorage.setItem(KEY, lang);
  listeners.forEach(fn => fn(lang));
}

export function onLangChange(fn) { listeners.add(fn); }

export function pick(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] ?? obj.fr ?? "";
}

export function t(key) {
  return pick(uiStrings[key]) || key;
}

export function applyStaticI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
}
