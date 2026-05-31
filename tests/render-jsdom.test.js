// Test de régression headless du RENDU réel des étapes.
// Les 26 autres tests couvrent la logique pure ; celui-ci monte un vrai DOM (jsdom)
// et appelle renderStep sur les 37 étapes pour détecter toute exception au rendu
// et tout quiz dont le bouton « Valider » aurait été avalé (bug d'injection HTML).
//
// jsdom est une devDependency optionnelle : si elle n'est pas installée, ce test
// est ignoré (les autres tests tournent sans aucune dépendance). `npm install` l'active.
import { describe, it, assertTrue } from "./runner.js";

let JSDOM = null;
try { ({ JSDOM } = await import("jsdom")); } catch { /* non installé → skip */ }

if (!JSDOM) {
  describe("render (jsdom)", () => {
    it("ignoré — jsdom non installé (lance `npm install` pour l'activer)", () => assertTrue(true));
  });
} else {
  const dom = new JSDOM("<!DOCTYPE html><body></body>", { url: "http://localhost/" });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  // Utiliser l'AbortController de jsdom (même realm que window.addEventListener,
  // sinon jsdom rejette un signal venant du global Node).
  if (dom.window.AbortController) globalThis.AbortController = dom.window.AbortController;

  const { flatSteps } = await import("../content/modules.js");
  const { renderStep } = await import("../assets/js/step-template.js");

  const errors = [];
  const missingBtn = [];
  flatSteps.forEach((s, i) => {
    const host = dom.window.document.createElement("div");
    try {
      renderStep(host, s, { globalIndex: i, teacher: false, onComplete() {}, gotoNext() {}, gotoPrev() {} });
      if (s.quiz && s.quiz.length && !host.querySelector(".qz-validate")) missingBtn.push(s.titre.fr);
    } catch (e) {
      errors.push(`${(s.titre && s.titre.fr) || i} : ${e.message}`);
    }
  });

  describe("render (jsdom) — les 39 étapes", () => {
    it("aucune étape ne lève d'exception au rendu", () =>
      assertTrue(errors.length === 0, "exceptions → " + errors.join("  |  ")));
    it("chaque étape à quiz expose son bouton Valider", () =>
      assertTrue(missingBtn.length === 0, "bouton avalé sur → " + missingBtn.join("  |  ")));
  });

  // Verrouillage combiné exercice + quiz (étape « Les 3 fichiers du web » = M0/E1).
  const step2 = flatSteps.find(s => s.module === 0 && s.etape === 1);
  const host = dom.window.document.createElement("div");
  let navigated = 0;
  renderStep(host, step2, { globalIndex: 1, teacher: false, onComplete() {}, gotoNext() { navigated++; }, gotoPrev() {} });
  const next = host.querySelector(".nav-next");
  const check = host.querySelector(".exo-check");
  const area = host.querySelector(".editor-area");      // onglet HTML actif par défaut
  const solution = host.querySelector(".solution");
  const gate = host.querySelector(".gate-msg");

  // 1) clic sur Suivant verrouillé → message affiché, pas de navigation
  next.click();
  const lockedShowsMsg = !gate.hidden && navigated === 0;
  // 2) échec de l'exercice → la correction s'affiche en aide
  check.click();
  const failShowsHelp = !solution.hidden;
  // 3) on corrige le HTML : exercice OK mais quiz à faire → Suivant ne navigue toujours pas
  area.value = step2.exercice.correction.html;
  area.dispatchEvent(new dom.window.Event("input"));
  check.click();
  next.click();
  const stillLockedQuizPending = navigated === 0 && !gate.hidden;

  describe("render (jsdom) — verrouillage exercice+quiz", () => {
    it("clic sur Suivant verrouillé → affiche ce qu'il reste, sans naviguer", () => assertTrue(lockedShowsMsg));
    it("échec → la correction s'affiche en aide", () => assertTrue(failShowsHelp));
    it("exercice réussi mais quiz à faire → ne navigue pas", () => assertTrue(stillLockedQuizPending));
  });
}
