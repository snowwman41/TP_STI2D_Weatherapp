// Vérification d'un exercice : compare le code tapé par l'élève à une liste de règles.
//
// Une règle = { fichier: "html"|"css"|"js", contient: "texte attendu", message: {fr,en} }.
// L'exercice est réussi quand TOUTES les règles sont satisfaites (le fichier visé
// contient la sous-chaîne attendue). `results` détaille chaque règle pour le feedback.
// Compare sans tenir compte des espaces : un élève qui écrit `color:#0284c7`
// au lieu de `color: #0284c7` ne doit pas être bloqué à tort.
const sansEspaces = s => String(s ?? "").replace(/\s+/g, "");

// Éléments HTML « vides » (auto-fermants) : ils n'ont pas de balise fermante.
const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr"
]);

// Contrôle que chaque balise ouvrante a sa fermante (hors éléments auto-fermants).
// Retourne le nom de la première balise mal équilibrée, ou null si tout est correct.
function premiereBaliseNonFermee(html) {
  const sansCommentaires = String(html ?? "")
    .replace(/<!--[\s\S]*?-->/g, "")     // ignore les commentaires HTML
    .replace(/<!DOCTYPE[^>]*>/gi, "");   // ignore <!DOCTYPE html>
  const counts = {};
  const ordre = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/?)>/g;
  let m;
  while ((m = re.exec(sansCommentaires)) !== null) {
    const fermante = m[1] === "/";
    const nom = m[2].toLowerCase();
    const autoFermante = m[3] === "/";
    if (VOID_ELEMENTS.has(nom) || autoFermante) continue; // déjà « fermée »
    if (!(nom in counts)) { counts[nom] = 0; ordre.push(nom); }
    counts[nom] += fermante ? -1 : 1;
  }
  for (const nom of ordre) if (counts[nom] !== 0) return nom;
  return null;
}

export function verifyExercise(rules, code) {
  code = code || {};
  rules = rules || [];
  const results = rules.map(r => ({
    ok: sansEspaces(code[r.fichier]).includes(sansEspaces(r.contient)),
    message: r.message
  }));

  // Contrôle automatique : sur un exercice HTML, toutes les balises (hors éléments
  // auto-fermants) doivent être correctement fermées.
  if (rules.some(r => r.fichier === "html") && code.html != null) {
    const nonFermee = premiereBaliseNonFermee(code.html);
    if (nonFermee) {
      results.push({
        ok: false,
        message: {
          fr: `⚠️ Une balise n'est pas correctement fermée : vérifie que chaque <code>&lt;${nonFermee}&gt;</code> a bien sa balise fermante <code>&lt;/${nonFermee}&gt;</code>.`,
          en: `⚠️ A tag is not properly closed: make sure each <code>&lt;${nonFermee}&gt;</code> has its closing <code>&lt;/${nonFermee}&gt;</code>.`
        }
      });
    }
  }

  return { passed: results.every(r => r.ok), results };
}
