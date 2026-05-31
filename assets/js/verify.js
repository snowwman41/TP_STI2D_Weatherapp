// Vérification d'un exercice : compare le code tapé par l'élève à une liste de règles.
//
// Une règle = { fichier: "html"|"css"|"js", contient: "texte attendu", message: {fr,en} }.
// L'exercice est réussi quand TOUTES les règles sont satisfaites (le fichier visé
// contient la sous-chaîne attendue). `results` détaille chaque règle pour le feedback.
export function verifyExercise(rules, code) {
  code = code || {};
  const results = (rules || []).map(r => ({
    ok: String(code[r.fichier] ?? "").includes(r.contient),
    message: r.message
  }));
  return { passed: results.every(r => r.ok), results };
}
