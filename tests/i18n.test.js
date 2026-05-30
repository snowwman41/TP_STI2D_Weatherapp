import { describe, it, assertEqual } from "./runner.js";
import { pick, t, setLang, getLang } from "../assets/js/i18n.js";

describe("i18n", () => {
  it("pick renvoie la langue active", () => {
    setLang("fr");
    assertEqual(pick({ fr: "Bonjour", en: "Hello" }), "Bonjour");
    setLang("en");
    assertEqual(pick({ fr: "Bonjour", en: "Hello" }), "Hello");
  });
  it("pick tolère une chaîne nue", () => assertEqual(pick("x"), "x"));
  it("t lit une clé d'interface", () => { setLang("fr"); assertEqual(t("quizValidate"), "Valider"); });
  it("getLang reflète setLang", () => { setLang("en"); assertEqual(getLang(), "en"); });
});
