export const m0 = {
  titre: { fr: "Découverte & mise en route", en: "Getting started" },
  etapes: [
    {
      titre: { fr: "À quoi va ressembler le projet ?", en: "What will the project look like?" },
      besoin: { fr: "Avant de coder, voyons ce qu'on va construire : un tableau de bord qui affiche la météo de villes du monde.",
                en: "Before coding, let's see what we'll build: a dashboard showing the weather of cities worldwide." },
      decouverte: { fr: "Comprendre l'objectif final aide à savoir <em>pourquoi</em> chaque notion qu'on apprendra est utile.",
                    en: "Understanding the final goal helps us know <em>why</em> each notion we learn matters." },
      explication: { fr: "L'application finale permettra de taper le nom d'une ville et d'afficher une carte avec son pays, son drapeau, sa température, la météo et l'heure locale. On va la construire petit à petit.",
                     en: "The final app will let you type a city name and show a card with its country, flag, temperature, weather and local time. We'll build it step by step." },
      illustration: null,
      exemple: null,
      exercice: null,
      application: { fr: "Voici un aperçu d'une carte de ville finie :<div class='preview-card'>🇯🇵 <strong>Tokyo</strong> — 22° · Ciel dégagé · 14:30</div>",
                     en: "Here's a preview of a finished city card:<div class='preview-card'>🇯🇵 <strong>Tokyo</strong> — 22° · Clear sky · 14:30</div>" },
      quiz: [
        { type: "qcm", question: { fr: "Que va afficher l'application pour chaque ville ?", en: "What will the app show for each city?" },
          options: [{ fr: "Seulement le nom", en: "Only the name" },
                    { fr: "Pays, drapeau, température, météo et heure", en: "Country, flag, temperature, weather and time" },
                    { fr: "Une vidéo", en: "A video" }],
          bonneReponse: 1,
          explication: { fr: "Chaque carte regroupe toutes ces informations.", en: "Each card gathers all this information." } }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Les 3 fichiers du web", en: "The 3 web files" },
      besoin: { fr: "Pour construire une page web, il nous faut trois fichiers qui jouent chacun un rôle.",
                en: "To build a web page, we need three files, each with its own role." },
      decouverte: { fr: "Séparer structure, style et comportement rend le code clair et réutilisable.",
                    en: "Separating structure, style and behavior keeps code clear and reusable." },
      explication: { fr: "<strong>HTML</strong> = la structure (le contenu). <strong>CSS</strong> = le style (l'apparence). <strong>JavaScript</strong> = le comportement (les actions). Comparaison : HTML est le squelette, CSS les vêtements, JS les muscles.",
                     en: "<strong>HTML</strong> = structure (content). <strong>CSS</strong> = style (looks). <strong>JavaScript</strong> = behavior (actions). Analogy: HTML is the skeleton, CSS the clothes, JS the muscles." },
      illustration: null,
      exemple: { code: "index.html   → structure\nstyle.css    → apparence\nscript.js    → comportement",
                 langage: "text", commentaire: { fr: "Les trois fichiers de notre projet.", en: "The three files of our project." } },
      exercice: {
        enonce: { fr: "Relie ce fichier HTML à un CSS et un JS : complète les deux lignes manquantes dans le <head> et avant </body>.",
                  en: "Link this HTML to a CSS and JS file: complete the two missing lines in <head> and before </body>." },
        fichiers: { html: "<!DOCTYPE html>\n<html>\n<head>\n  <!-- relie le CSS ici -->\n</head>\n<body>\n  <h1>Mon projet</h1>\n  <!-- relie le JS ici -->\n</body>\n</html>",
                    css: "h1 { color: #0284c7; }",
                    js: "console.log('JS branché !');" },
        correction: { html: "<!DOCTYPE html>\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Mon projet</h1>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
                      css: "h1 { color: #0284c7; }",
                      js: "console.log('JS branché !');" }
      },
      application: { fr: "Dans ton dossier <code>projet-eleve/</code>, tu retrouves exactement ces trois fichiers, déjà reliés. C'est ton point de départ.",
                     en: "In your <code>projet-eleve/</code> folder you'll find exactly these three files, already linked. That's your starting point." },
      quiz: [
        { type: "qcm", question: { fr: "Quel fichier gère l'apparence ?", en: "Which file handles the looks?" },
          options: [{ fr: "HTML", en: "HTML" }, { fr: "CSS", en: "CSS" }, { fr: "JavaScript", en: "JavaScript" }],
          bonneReponse: 1, explication: { fr: "Le CSS s'occupe du style.", en: "CSS handles styling." } },
        { type: "complete", question: { fr: "Quelle balise relie un fichier JS ? <…src=\"script.js\">", en: "Which tag links a JS file? <…src=\"script.js\">" },
          bonneReponse: "script", explication: { fr: "<script src=\"…\"> charge le JavaScript.", en: "<script src=\"…\"> loads JavaScript." } }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Comment le navigateur lit ta page", en: "How the browser reads your page" },
      besoin: { fr: "Comprendre ce que fait le navigateur quand il ouvre ta page évite beaucoup d'erreurs plus tard.",
                en: "Understanding what the browser does when it opens your page avoids many later mistakes." },
      decouverte: { fr: "Le navigateur lit le HTML de haut en bas, applique le CSS, puis exécute le JS.",
                    en: "The browser reads HTML top to bottom, applies CSS, then runs JS." },
      explication: { fr: "Le navigateur transforme ton HTML en un <strong>arbre</strong> d'éléments (le DOM). Le CSS habille cet arbre, le JS peut le modifier. On reverra le DOM en détail bientôt.",
                     en: "The browser turns your HTML into a <strong>tree</strong> of elements (the DOM). CSS dresses this tree, JS can change it. We'll revisit the DOM soon." },
      illustration: "dom-tree",
      exemple: null,
      exercice: null,
      application: { fr: "Ton projet est une page que le navigateur lira ainsi à chaque rechargement.",
                     en: "Your project is a page the browser reads this way on every reload." },
      quiz: [
        { type: "vraifaux", question: { fr: "Le navigateur transforme le HTML en un arbre appelé le DOM.", en: "The browser turns HTML into a tree called the DOM." },
          bonneReponse: true, explication: { fr: "Oui, c'est le Document Object Model.", en: "Yes — the Document Object Model." } }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
