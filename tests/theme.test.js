import { describe, it, assertEqual } from "./runner.js";
import { nextTheme } from "../assets/js/theme.js";

describe("theme", () => {
  it("bascule clair -> sombre", () => assertEqual(nextTheme("light"), "dark"));
  it("bascule sombre -> clair", () => assertEqual(nextTheme("dark"), "light"));
  it("valeur inconnue -> dark", () => assertEqual(nextTheme(null), "dark"));
});
