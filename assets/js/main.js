import { initTheme } from "./theme.js";

initTheme(document.getElementById("theme-toggle"));
document.getElementById("burger").addEventListener("click", () =>
  document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("content").innerHTML = "<p>Initialisation…</p>";
