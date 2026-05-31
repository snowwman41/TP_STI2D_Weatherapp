import { describe, it, assertEqual, assertTrue } from "./runner.js";
import { verifyExercise } from "../assets/js/verify.js";

const regles = [
  { fichier: "html", contient: "<link", message: { fr: "CSS relié", en: "CSS linked" } },
  { fichier: "html", contient: "<script", message: { fr: "JS relié", en: "JS linked" } }
];

describe("verify.verifyExercise", () => {
  it("réussi quand toutes les règles sont satisfaites", () => {
    const r = verifyExercise(regles, { html: '<link rel="stylesheet"><script src="x">' });
    assertTrue(r.passed);
  });
  it("échoue si une règle manque, et signale laquelle", () => {
    const r = verifyExercise(regles, { html: '<link rel="stylesheet">' });
    assertEqual(r.passed, false);
    assertEqual(r.results[0].ok, true);
    assertEqual(r.results[1].ok, false);
  });
  it("sans règles → réussi (rien à vérifier)", () =>
    assertEqual(verifyExercise([], { html: "" }).passed, true));
  it("fichier absent du code → règle échoue", () =>
    assertEqual(verifyExercise(regles, {}).passed, false));
  it("tolère les différences d'espaces (color: #x === color:#x)", () => {
    const r = [{ fichier: "css", contient: "color: #0284c7", message: { fr: "x", en: "x" } }];
    assertEqual(verifyExercise(r, { css: "h1{color:#0284c7}" }).passed, true);
  });
});
