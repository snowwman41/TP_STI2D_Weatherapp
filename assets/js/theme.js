const KEY = "tbv:theme";
const hasLS = typeof localStorage !== "undefined";

export function nextTheme(current) {
  return current === "dark" ? "light" : "dark";
}

export function getTheme() {
  return (hasLS && localStorage.getItem(KEY)) || "dark";
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (hasLS) localStorage.setItem(KEY, theme);
}

export function initTheme(toggleBtn) {
  applyTheme(getTheme());
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => applyTheme(nextTheme(getTheme())));
  }
}
