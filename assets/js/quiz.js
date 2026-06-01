import { pick, t } from "./i18n.js";
import { richText } from "./sanitize.js";
import { celebrate } from "./confetti.js";

function correct(q, ans) {
  if (q.type === "complete")
    return String(ans).trim().toLowerCase() === String(q.bonneReponse).trim().toLowerCase();
  return ans === q.bonneReponse;
}

export function scoreQuiz(questions, answers) {
  const good = questions.reduce((n, q, i) => n + (correct(q, answers[i]) ? 1 : 0), 0);
  return { good, total: questions.length, ratio: questions.length ? good / questions.length : 1 };
}

// Rend le quiz dans `container`. Appelle onPass(score) si réussi (>= seuil).
export function renderQuiz(container, questions, seuil, onPass) {
  const answers = new Array(questions.length).fill(undefined);
  container.innerHTML = `<div class="quiz">${questions.map((q, i) => `
    <div class="qz" data-i="${i}">
      <p class="qz-q">${i + 1}. ${richText(pick(q.question))}</p>
      <div class="qz-opts">${renderInput(q, i)}</div>
      <p class="qz-explain" hidden>${richText(pick(q.explication))}</p>
    </div>`).join("")}
    <button class="btn btn-primary qz-validate">${t("quizValidate")}</button>
    <p class="qz-result" hidden></p></div>`;

  container.querySelectorAll(".qz").forEach(node => {
    const i = Number(node.dataset.i);
    node.querySelectorAll("[data-val]").forEach(inp =>
      inp.addEventListener("input", () => { answers[i] = readVal(questions[i], inp); }));
  });

  const validateBtn = container.querySelector(".qz-validate");
  let passed = false;
  validateBtn.addEventListener("click", () => {
    const score = scoreQuiz(questions, answers);
    const didPass = score.ratio >= seuil;
    container.querySelectorAll(".qz-explain").forEach(e => e.hidden = false);
    const res = container.querySelector(".qz-result");
    res.hidden = false;
    res.textContent = `${score.good}/${score.total} — ` + (didPass ? t("quizPassed") : t("quizFailed"));
    res.className = "qz-result " + (didPass ? "ok" : "ko");
    if (didPass) {
      // Confettis à chaque validation réussie (répétable).
      const r = validateBtn.getBoundingClientRect();
      celebrate(r.left + r.width / 2, r.top + r.height / 2);
      // La complétion de l'étape ne se déclenche qu'une fois.
      if (!passed) { passed = true; onPass(score.ratio); }
    }
  });
}

function renderInput(q, i) {
  if (q.type === "complete")
    return `<input class="qz-input" data-val type="text" placeholder="…">`;
  if (q.type === "vraifaux")
    return `<label><input type="radio" name="q${i}" data-val value="true"> ${pick({fr:"Vrai",en:"True"})}</label>
            <label><input type="radio" name="q${i}" data-val value="false"> ${pick({fr:"Faux",en:"False"})}</label>`;
  return q.options.map((o, k) =>
    `<label><input type="radio" name="q${i}" data-val value="${k}"> ${richText(pick(o))}</label>`).join("");
}

function readVal(q, inp) {
  if (q.type === "complete") return inp.value;
  if (!inp.checked) return undefined;
  if (q.type === "vraifaux") return inp.value === "true";
  return Number(inp.value);
}
