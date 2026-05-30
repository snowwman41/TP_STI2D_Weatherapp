import { m0 } from "./modules/m0.js";
import { m1 } from "./modules/m1.js";
import { m2 } from "./modules/m2.js";
import { m3 } from "./modules/m3.js";
import { m4 } from "./modules/m4.js";
import { m5 } from "./modules/m5.js";
import { m6 } from "./modules/m6.js";
import { m7 } from "./modules/m7.js";
import { m8 } from "./modules/m8.js";

export const modules = [m0, m1, m2, m3, m4, m5, m6, m7, m8];

// Liste plate des étapes dans l'ordre, avec leur position (module, etape).
export const flatSteps = modules.flatMap((mod, mi) =>
  mod.etapes.map((step, ei) => ({ ...step, module: mi, etape: ei, moduleTitre: mod.titre }))
);

export function stepAt(module, etape) {
  return flatSteps.find(s => s.module === module && s.etape === etape) || null;
}

export function globalIndex(module, etape) {
  return flatSteps.findIndex(s => s.module === module && s.etape === etape);
}
