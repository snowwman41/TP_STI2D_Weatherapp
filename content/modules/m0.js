import { demoApp } from "../demo-app.js";

export const m0 = {
  titre: { fr: "Découverte & mise en route", en: "Getting started" },
  etapes: [
    {
      titre: { fr: "À quoi va ressembler le projet ?", en: "What will the project look like?" },
      besoin: { fr: "Avant de coder, voyons ce qu'on va construire : un tableau de bord qui affiche la météo de villes du monde. La démo ci-dessous est <strong>la vraie application finale</strong> — essaie d'ajouter une ville !",
                en: "Before coding, let's see what we'll build: a dashboard showing the weather of cities worldwide. The demo below is <strong>the real finished app</strong> — try adding a city!" },
      demo: demoApp,
      decouverte: { fr: "Comprendre l'objectif final aide à savoir <em>pourquoi</em> chaque notion qu'on apprendra est utile.",
                    en: "Understanding the final goal helps us know <em>why</em> each notion we learn matters." },
      explication: { fr: "L'application finale permettra de taper le nom d'une ville et d'afficher une carte avec son pays, son drapeau, sa température, la météo et l'heure locale. On va la construire petit à petit.",
                     en: "The final app will let you type a city name and show a card with its country, flag, temperature, weather and local time. We'll build it step by step." },
      illustration: null,
      exemple: null,
      exercice: null,
      application: { fr: "Voici un aperçu d'une carte de ville finie : <strong>🇯🇵 Tokyo — 22° · Ciel dégagé · 14:30</strong>",
                     en: "Here's a preview of a finished city card: <strong>🇯🇵 Tokyo — 22° · Clear sky · 14:30</strong>" },
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
      explication: { fr: "<strong>HTML</strong> est le fichier central : c'est lui que le navigateur ouvre et <strong>affiche</strong>. Il définit la <strong>structure</strong> (le contenu) de la page. On lui <strong>relie</strong> ensuite deux fichiers : un <strong>CSS</strong> pour le <strong>style</strong> (l'apparence) et un <strong>JavaScript</strong> pour le <strong>comportement</strong> (l'interactivité). Image : HTML est le squelette, CSS les vêtements, JS les muscles.<br><br><strong>Où relier ces fichiers ?</strong> Le <code><link></code> du CSS va dans le <code><head></code>. Le <code><script></code> du JS se place <strong>tout à la fin</strong>, juste avant <code></body></code> : ainsi le HTML est déjà chargé quand le JavaScript s'exécute (sinon il chercherait des éléments qui n'existent pas encore).",
                     en: "<strong>HTML</strong> is the central file: it's the one the browser opens and <strong>displays</strong>. It defines the page's <strong>structure</strong> (the content). You then <strong>link</strong> two files to it: a <strong>CSS</strong> file for <strong>style</strong> (looks) and a <strong>JavaScript</strong> file for <strong>behavior</strong> (interactivity). Picture it: HTML is the skeleton, CSS the clothes, JS the muscles.<br><br><strong>Where do you link them?</strong> The CSS <code><link></code> goes in the <code><head></code>. The JS <code><script></code> goes <strong>at the very end</strong>, just before <code></body></code>: that way the HTML is already loaded when the JavaScript runs (otherwise it would look for elements that don't exist yet)." },
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
                      js: "console.log('JS branché !');" },
        verification: [
          { fichier: "html", contient: "<link", message: { fr: "Relie le fichier CSS avec une balise <link> dans le <head>.", en: "Link the CSS file with a <link> tag in the <head>." } },
          { fichier: "html", contient: "href=\"style.css\"", message: { fr: "Le <link> doit pointer vers href=\"style.css\".", en: "The <link> must point to href=\"style.css\"." } },
          { fichier: "html", contient: "<script", message: { fr: "Relie le fichier JS avec une balise <script> juste avant </body>.", en: "Link the JS file with a <script> tag just before </body>." } },
          { fichier: "html", contient: "src=\"script.js\"", message: { fr: "Le <script> doit avoir src=\"script.js\".", en: "The <script> must have src=\"script.js\"." } }
        ]
      },
      application: { fr: "Dans ton dossier <code>projet-eleve/</code>, tu retrouves exactement ces trois fichiers, déjà reliés. C'est ton point de départ.",
                     en: "In your <code>projet-eleve/</code> folder you'll find exactly these three files, already linked. That's your starting point." },
      quiz: [
        { type: "qcm", question: { fr: "Quel fichier gère l'apparence ?", en: "Which file handles the looks?" },
          options: [{ fr: "HTML", en: "HTML" }, { fr: "CSS", en: "CSS" }, { fr: "JavaScript", en: "JavaScript" }],
          bonneReponse: 1, explication: { fr: "Le CSS s'occupe du style.", en: "CSS handles styling." } },
        { type: "complete", question: { fr: "Quelle balise relie un fichier JS ? <…src=\"script.js\">", en: "Which tag links a JS file? <…src=\"script.js\">" },
          bonneReponse: "script", explication: { fr: "<script src=\"…\"> charge le JavaScript.", en: "<script src=\"…\"> loads JavaScript." } },
        { type: "qcm", question: { fr: "Où place-t-on le <code><script></code> du JavaScript ?", en: "Where do you put the JavaScript <code><script></code>?" },
          options: [{ fr: "Dans le <code><head></code>, tout en haut", en: "In the <code><head></code>, at the top" },
                    { fr: "Juste avant <code></body></code>, à la fin", en: "Just before <code></body></code>, at the end" },
                    { fr: "N'importe où, ça ne change rien", en: "Anywhere, it makes no difference" }],
          bonneReponse: 1, explication: { fr: "À la fin du <code><body></code>, le HTML est déjà chargé : le JS peut donc manipuler les éléments de la page.", en: "At the end of the <code><body></code>, the HTML is already loaded, so the JS can work with the page's elements." } }
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
