// Vérification d'un exercice : compare le code tapé par l'élève à une liste de règles.
//
// Une règle = { fichier: "html"|"css"|"js", contient: "texte attendu", message: {fr,en} }.
// L'exercice est réussi quand TOUTES les règles sont satisfaites (le fichier visé
// contient la sous-chaîne attendue). `results` détaille chaque règle pour le feedback.
// Compare sans tenir compte des espaces : un élève qui écrit `color:#0284c7`
// au lieu de `color: #0284c7` ne doit pas être bloqué à tort.
const sansEspaces = s => String(s ?? "").replace(/\s+/g, "");

export function verifyExercise(rules, code) {
  code = code || {};
  const results = (rules || []).map(r => ({
    ok: sansEspaces(code[r.fichier]).includes(sansEspaces(r.contient)),
    message: r.message
  }));
  return { passed: results.every(r => r.ok), results };
}
