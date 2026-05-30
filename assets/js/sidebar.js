import { modules, flatSteps, globalIndex } from "../../content/modules.js";
import { pick } from "./i18n.js";
import { isUnlocked, isCompleted } from "./progress.js";
import { buildHash } from "./router.js";

export function renderSidebar(current) {
  const el = document.getElementById("sidebar");
  const total = flatSteps.length;
  const done = flatSteps.filter((s, i) => isCompleted(i)).length;
  let html = `<div class="progress-bar"><span style="width:${total ? Math.round(done / total * 100) : 0}%"></span></div>`;
  modules.forEach((mod, mi) => {
    html += `<div class="mod-group"><h4>${pick(mod.titre)}</h4>`;
    mod.etapes.forEach((step, ei) => {
      const gi = globalIndex(mi, ei);
      const unlocked = isUnlocked(gi);
      const isCur = current && current.module === mi && current.etape === ei;
      const state = isCompleted(gi) ? "✓" : unlocked ? "▸" : "🔒";
      const cls = ["step-link", isCur ? "current" : "", unlocked ? "" : "locked"].join(" ");
      const href = unlocked ? buildHash(mi, ei) : "#";
      html += `<a class="${cls}" href="${href}"><span class="state">${state}</span>${pick(step.titre)}</a>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
}
