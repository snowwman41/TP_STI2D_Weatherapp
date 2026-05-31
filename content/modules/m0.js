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
    },
    {
      titre: { fr: "Ton espace de travail", en: "Your workspace" },
      besoin: {
        fr: "Tu as deux outils à ta disposition tout au long de la formation : un éditeur en ligne sur cette plateforme et Notepad++ sur ton ordinateur. Comprendre le rôle de chacun va te faire gagner un temps précieux.",
        en: "You have two tools at your disposal throughout this course: an online editor on this platform and Notepad++ on your computer. Understanding the role of each will save you a lot of time."
      },
      decouverte: {
        fr: "<strong>L'éditeur en ligne</strong> te permet d'apprendre et d'expérimenter chaque nouvelle notion avec un résultat instantané dans l'aperçu — pas besoin de sauvegarder ni d'ouvrir un navigateur. <strong>Notepad++</strong>, lui, te sert à construire ton <em>vrai projet</em> dans le dossier <code>projet-eleve/</code> : c'est là que les fichiers <code>index.html</code>, <code>style.css</code> et <code>script.js</code> prennent vie pour de bon.",
        en: "<strong>The online editor</strong> lets you learn and experiment with each new concept, with instant feedback in the preview — no saving or browser needed. <strong>Notepad++</strong> is where you build your <em>real project</em> in the <code>projet-eleve/</code> folder: that is where <code>index.html</code>, <code>style.css</code>, and <code>script.js</code> truly come to life."
      },
      explication: {
        fr: "La boucle de travail à retenir est simple : <strong>(1)</strong> tu apprends une notion en ligne dans l'éditeur de la plateforme, tu l'expérimentes ; <strong>(2)</strong> tu reportes ce que tu viens de pratiquer dans tes fichiers Notepad++ (<code>projet-eleve/</code>) ; <strong>(3)</strong> tu enregistres avec <kbd>Ctrl+S</kbd> ; <strong>(4)</strong> tu ouvres ou rafraîchis <code>index.html</code> dans le navigateur — soit par double-clic, soit via <code>serve.cmd</code> — et tu vois <em>ton</em> projet avancer. Pas « faire tout en ligne puis copier-coller à la fin » : module après module, ton vrai projet grandit en parallèle de ton apprentissage.<br><br>Pour démarrer, ouvre le dossier <code>projet-eleve/starter/</code> dans Notepad++ (Fichier → Ouvrir le dossier) et ouvre <code>index.html</code> dans le navigateur.",
        en: "The workflow to remember is simple: <strong>(1)</strong> you learn a concept online in the platform editor, you experiment; <strong>(2)</strong> you transfer what you just practised into your Notepad++ files (<code>projet-eleve/</code>); <strong>(3)</strong> you save with <kbd>Ctrl+S</kbd>; <strong>(4)</strong> you open or refresh <code>index.html</code> in the browser — either by double-clicking or via <code>serve.cmd</code> — and you watch <em>your</em> project grow. Not « do everything online then copy-paste at the end »: module by module, your real project grows alongside your learning.<br><br>To get started, open the <code>projet-eleve/starter/</code> folder in Notepad++ (File → Open Folder) and open <code>index.html</code> in the browser."
      },
      illustration: null,
      exemple: {
        code: "// La boucle en 4 temps :\n// 1. J'apprends la notion ici, dans l'éditeur en ligne\n// 2. Je reporte dans projet-eleve/ avec Notepad++\n// 3. Ctrl+S pour enregistrer\n// 4. Je rafraîchis index.html dans le navigateur → mon projet avance !",
        langage: "text",
        commentaire: {
          fr: "Chaque module = une nouvelle notion apprise en ligne + reportée dans ton projet réel.",
          en: "Each module = a new concept learned online + carried over into your real project."
        }
      },
      exercice: null,
      application: {
        fr: "Tes fichiers de départ se trouvent dans <code>projet-eleve/starter/</code> — ouvre ce dossier dans Notepad++ maintenant. Tu y verras <code>index.html</code>, <code>style.css</code> et <code>script.js</code> prêts à accueillir tout ce que tu vas construire.",
        en: "Your starter files are in <code>projet-eleve/starter/</code> — open that folder in Notepad++ now. You will find <code>index.html</code>, <code>style.css</code> and <code>script.js</code> ready to receive everything you are about to build."
      },
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Où construis-tu ton vrai projet ?",
            en: "Where do you build your real project?"
          },
          options: [
            { fr: "Uniquement dans l'éditeur en ligne de la plateforme", en: "Only in the platform's online editor" },
            { fr: "Dans les fichiers de projet-eleve/, avec Notepad++", en: "In the projet-eleve/ files, using Notepad++" },
            { fr: "Dans un nouveau dossier créé à chaque module", en: "In a new folder created for each module" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "L'éditeur en ligne sert à apprendre et tester. C'est Notepad++ et le dossier <code>projet-eleve/</code> qui contiennent ton vrai projet, celui que tu peux ouvrir dans le navigateur.",
            en: "The online editor is for learning and testing. Notepad++ and the <code>projet-eleve/</code> folder hold your real project — the one you can open in the browser."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
