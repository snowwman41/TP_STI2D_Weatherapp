import { pick, t } from "./i18n.js";
import { richText } from "./sanitize.js";
import { getIllustration } from "./illustrations.js";
import { createEditor, buildPreviewDoc } from "./editor.js";
import { renderQuiz } from "./quiz.js";
import { verifyExercise } from "./verify.js";

let currentEditor = null;

function block(labelKey, icon, inner) {
  if (!inner) return "";
  return `<section class="step-block"><h3>${icon} ${t(labelKey)}</h3>${inner}</section>`;
}

export function renderStep(container, step, ctx) {
  // ctx = { onComplete: fn(score), gotoNext, gotoPrev, globalIndex, teacher }
  if (currentEditor) { currentEditor.destroy(); currentEditor = null; }
  const ex = step.exercice;
  const exGates = !!(ex && ex.verification && ex.verification.length);   // exercice à valider
  const quizGates = !!(step.quiz && step.quiz.length);                    // quiz à réussir

  container.innerHTML = `
    <article class="step">
      <h2>${richText(pick(step.titre))}</h2>
      ${step.rappel ? `<aside class="step-rappel">🧭 ${richText(pick(step.rappel))}</aside>` : ""}
      ${block("blockNeed", "🎯", `<p class="need">${richText(pick(step.besoin))}</p>`)}
      ${step.demo ? `<section class="step-block"><h3>🔎 ${t("blockDemo")}</h3><iframe class="demo-frame" sandbox="allow-scripts allow-forms"></iframe></section>` : ""}
      ${block("blockDiscover", "💡", `<p>${richText(pick(step.decouverte))}</p>`)}
      ${block("blockExplain", "📖", `<div>${richText(pick(step.explication))}</div>${step.illustration ? getIllustration(step.illustration) : ""}`)}
      ${step.exemple ? block("blockExample", "👀",
        `<pre class="code"><code>${escapeHtml(step.exemple.code)}</code></pre><p class="hint">${richText(pick(step.exemple.commentaire))}</p>`) : ""}
      ${ex ? `<section class="step-block"><h3>✏️ ${t("blockExercise")}</h3>
        <p>${richText(pick(ex.enonce))}</p>
        <div class="exo-editor"></div>
        <div class="exo-actions"></div>
        <div class="exo-feedback" hidden></div>
        <div class="solution" hidden></div></section>` : ""}
      ${block("blockApply", "🚀", step.application ? `<div>${richText(pick(step.application))}</div>` : "")}
      ${step.defiOptionnel ? `<section class="step-block challenge"><h3>⭐ ${t("optionalChallenge")}</h3><div>${richText(pick(step.defiOptionnel))}</div></section>` : ""}
      ${quizGates ? `<section class="step-block"><h3>✅ ${t("blockQuiz")}</h3><div class="quiz-host"></div></section>` : ""}
      <div class="gate-msg" hidden></div>
      <nav class="step-nav">
        <button class="btn nav-prev">${t("prev")}</button>
        <button class="btn btn-primary nav-next">${t("next")}</button>
      </nav>
    </article>`;

  // Démo interactive (étape de découverte) : on exécute l'app finale dans une iframe sandbox.
  if (step.demo) {
    const f = container.querySelector(".demo-frame");
    if (f) f.srcdoc = buildPreviewDoc(step.demo.html, step.demo.css, step.demo.js);
  }

  const nextBtn = container.querySelector(".nav-next");
  const gateMsg = container.querySelector(".gate-msg");

  // Déblocage combiné : l'étape suivante s'ouvre quand exercice ET quiz sont validés.
  let exOK = !exGates;
  let quizOK = !quizGates;
  let quizRatio = 1;
  let completed = false;
  let gateShown = false;

  const gateOpen = () => ctx.teacher || (exOK && quizOK);

  // Affiche ce qu'il reste à valider (ou un feu vert si tout est bon).
  function renderGate() {
    if (gateOpen()) {
      gateMsg.hidden = false;
      gateMsg.className = "gate-msg ok";
      gateMsg.innerHTML = pick({ fr: "✓ Tout est validé — clique sur « Étape suivante » !", en: "✓ All done — click \"Next step\"!" });
      return;
    }
    const items = [];
    if (exGates) items.push(`<li class="${exOK ? "ok" : "ko"}">${exOK ? "✓" : "✗"} ${pick({ fr: "Réussir l'exercice (bouton « Vérifier »)", en: "Pass the exercise (\"Check\" button)" })}</li>`);
    if (quizGates) items.push(`<li class="${quizOK ? "ok" : "ko"}">${quizOK ? "✓" : "✗"} ${pick({ fr: "Réussir le quiz", en: "Pass the quiz" })}</li>`);
    gateMsg.hidden = false;
    gateMsg.className = "gate-msg ko";
    gateMsg.innerHTML = `<strong>${pick({ fr: "Avant de continuer, il reste à valider :", en: "Before continuing, you still need to:" })}</strong><ul>${items.join("")}</ul>`;
  }

  // Marque l'étape complète dès que les portes sont franchies, et met à jour le message s'il est affiché.
  function maybeComplete() {
    if (gateOpen() && !completed) { completed = true; ctx.onComplete(quizRatio); }
    if (gateShown) renderGate();
  }

  // Exercice
  if (ex) {
    const editor = createEditor(container.querySelector(".exo-editor"), ex.fichiers);
    currentEditor = editor;
    const actions = container.querySelector(".exo-actions");
    const fb = container.querySelector(".exo-feedback");
    const solBox = container.querySelector(".solution");
    const correctionHtml = () => Object.entries(ex.correction || {})
      .map(([k, v]) => `<p class="hint">${k.toUpperCase()}</p><pre class="code"><code>${escapeHtml(v)}</code></pre>`).join("");

    if (exGates) {
      const checkBtn = document.createElement("button");
      checkBtn.className = "btn btn-primary exo-check";
      checkBtn.textContent = t("checkExercise");
      actions.appendChild(checkBtn);
      checkBtn.addEventListener("click", () => {
        const { passed, results } = verifyExercise(ex.verification, editor.getCode());
        fb.hidden = false;
        fb.className = "exo-feedback " + (passed ? "ok" : "ko");
        fb.innerHTML = passed
          ? `<div class="ok">✓ ${t("exercisePassed")}</div>`
          : results.map(r => `<div class="${r.ok ? "ok" : "ko"}">${r.ok ? "✓" : "✗"} ${richText(pick(r.message))}</div>`).join("");
        // Re-vérifie à CHAQUE clic : si le code redevient faux, l'étape se reverrouille.
        exOK = passed;
        if (!passed) {
          // La correction n'apparaît qu'en cas d'erreur, comme une aide.
          solBox.hidden = false;
          solBox.innerHTML = `<p class="hint">${t("solutionHelp")}</p>${correctionHtml()}`;
        }
        maybeComplete();
      });
    } else {
      // Exercice sans règles de vérification : repli sur l'affichage de la correction.
      const solBtn = document.createElement("button");
      solBtn.className = "btn show-sol";
      solBtn.textContent = t("showSolution");
      actions.appendChild(solBtn);
      let shown = false;
      solBtn.addEventListener("click", () => {
        shown = !shown;
        solBox.hidden = !shown;
        solBtn.textContent = shown ? t("hideSolution") : t("showSolution");
        if (shown && !solBox.innerHTML) solBox.innerHTML = correctionHtml();
      });
    }
  }

  // Quiz
  if (quizGates) {
    renderQuiz(container.querySelector(".quiz-host"), step.quiz, step.scoreMinimal ?? 1, (ratio) => {
      quizOK = true;
      quizRatio = ratio;
      maybeComplete();
    });
  }

  // Navigation : si tout est validé on avance ; sinon on affiche ce qu'il reste à faire.
  nextBtn.addEventListener("click", () => {
    if (gateOpen()) { ctx.gotoNext(); }
    else { gateShown = true; renderGate(); }
  });
  container.querySelector(".nav-prev").addEventListener("click", ctx.gotoPrev);
  maybeComplete();   // complète d'emblée les étapes sans porte
}

function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
