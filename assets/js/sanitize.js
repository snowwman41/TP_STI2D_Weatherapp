// Sanitizer de texte d'auteur.
//
// Le contenu des leçons mélange deux choses : de la mise en forme voulue
// (<strong>, <em>, <code>…) ET des exemples de code littéraux (<script>, <head>,
// <input>…) qui doivent s'AFFICHER tels quels. Injecter ce texte brut dans
// innerHTML est dangereux : une balise RAWTEXT comme <script>/<style>/<title>
// « avale » tout le markup qui suit jusqu'à sa fermeture (bug du bouton Valider).
//
// Stratégie : on échappe TOUT (& < >), puis on ré-autorise UNIQUEMENT une liste
// blanche de balises de mise en forme inline, sans attribut. Résultat : la mise
// en forme fonctionne, et toute balise littérale s'affiche en texte sans rien casser.

const ALLOWED = ["strong", "em", "code", "br", "b", "i", "kbd", "u"];

export function escapeText(value) {
  return String(value ?? "")
    // N'échappe le « & » que s'il n'introduit pas déjà une entité (&lt; &gt; &amp; &#39; …).
    // Le contenu mélange balises littérales (<head>) ET entités (&lt;html&gt;) : les deux
    // doivent s'afficher correctement, sans double-échappement.
    .replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function richText(value) {
  let s = escapeText(value);
  for (const tag of ALLOWED) {
    s = s.replaceAll(`&lt;${tag}&gt;`, `<${tag}>`)
         .replaceAll(`&lt;/${tag}&gt;`, `</${tag}>`);
  }
  // tolère <br/> et <br />
  s = s.replaceAll("&lt;br/&gt;", "<br/>").replaceAll("&lt;br /&gt;", "<br/>");
  return s;
}
