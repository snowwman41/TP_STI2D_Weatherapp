const KEY = "tbv:theme";

export function nextTheme(current) {
  return current === "dark" ? "light" : "dark";
}

export function getTheme() {
  return localStorage.getItem(KEY) || "light";
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(KEY, theme);
}

export function initTheme(toggleBtn) {
  applyTheme(getTheme());
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => applyTheme(nextTheme(getTheme())));
  }
}
