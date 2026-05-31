import { pick, t } from "./i18n.js";
import { richText } from "./sanitize.js";
import { getIllustration } from "./illustrations.js";
import { createEditor } from "./editor.js";
import { renderQuiz } from "./quiz.js";

let currentEditor = null;

function block(labelKey, icon, inner) {
  if (!inner) return "";
  return `<section class="step-block"><h3>${icon} ${t(labelKey)}</h3>${inner}</section>`;
}

export function renderStep(container, step, ctx) {
  // ctx = { onComplete: fn(score), gotoNext: fn, gotoPrev: fn, globalIndex }
  if (currentEditor) { currentEditor.destroy(); currentEditor = null; }
  const ex = step.exercice;
  container.innerHTML = `
    <article class="step">
      <h2>${richText(pick(step.titre))}</h2>
      ${block("blockNeed", "🎯", `<p class="need">${richText(pick(step.besoin))}</p>`)}
      ${block("blockDiscover", "💡", `<p>${richText(pick(step.decouverte))}</p>`)}
      ${block("blockExplain", "📖", `<div>${richText(pick(step.explication))}</div>${step.illustration ? getIllustration(step.illustration) : ""}`)}
      ${step.exemple ? block("blockExample", "👀",
        `<pre class="code"><code>${escapeHtml(step.exemple.code)}</code></pre><p class="hint">${richText(pick(step.exemple.commentaire))}</p>`) : ""}
      ${ex ? `<section class="step-block"><h3>✏️ ${t("blockExercise")}</h3>
        <p>${richText(pick(ex.enonce))}</p>
        <div class="exo-editor"></div>
        <button class="btn show-sol">${t("showSolution")}</button>
        <div class="solution" hidden></div></section>` : ""}
      ${block("blockApply", "🚀", step.application ? `<div>${richText(pick(step.application))}</div>` : "")}
      ${step.defiOptionnel ? `<section class="step-block challenge"><h3>⭐ ${t("optionalChallenge")}</h3><div>${richText(pick(step.defiOptionnel))}</div></section>` : ""}
      ${step.quiz && step.quiz.length ? `<section class="step-block"><h3>✅ ${t("blockQuiz")}</h3><div class="quiz-host"></div></section>` : ""}
      <nav class="step-nav">
        <button class="btn nav-prev">${t("prev")}</button>
        <button class="btn btn-primary nav-next" ${step.quiz && step.quiz.length ? "disabled" : ""}>${t("next")}</button>
      </nav>
    </article>`;

  // Éditeur d'exercice
  if (ex) {
    currentEditor = createEditor(container.querySelector(".exo-editor"), ex.fichiers);
    const solBtn = container.querySelector(".show-sol");
    const solBox = container.querySelector(".solution");
    let shown = false;
    solBtn.addEventListener("click", () => {
      shown = !shown;
      solBox.hidden = !shown;
      solBtn.textContent = shown ? t("hideSolution") : t("showSolution");
      if (shown) solBox.innerHTML = Object.entries(ex.correction)
        .map(([k, v]) => `<p class="hint">${k.toUpperCase()}</p><pre class="code"><code>${escapeHtml(v)}</code></pre>`).join("");
    });
  }

  // Quiz bloquant
  const nextBtn = container.querySelector(".nav-next");
  if (step.quiz && step.quiz.length) {
    renderQuiz(container.querySelector(".quiz-host"), step.quiz, step.scoreMinimal ?? 1, (ratio) => {
      nextBtn.disabled = false;
      ctx.onComplete(ratio);
    });
    if (ctx.teacher) nextBtn.disabled = false;
  } else {
    nextBtn.addEventListener("click", () => ctx.onComplete(1));
  }
  nextBtn.addEventListener("click", ctx.gotoNext);
  container.querySelector(".nav-prev").addEventListener("click", ctx.gotoPrev);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
