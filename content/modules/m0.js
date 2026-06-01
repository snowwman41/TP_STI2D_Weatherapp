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
      titre: { fr: "C'est quoi le web ? C'est quoi HTML ?", en: "What is the web? What is HTML?" },
      besoin: { fr: "Avant d'écrire la moindre ligne, posons les bases : de quoi est faite une page web, et quel est le rôle du HTML ?",
                en: "Before writing a single line, let's lay the foundation: what is a web page made of, and what is HTML's role?" },
      decouverte: { fr: "Une page web repose sur trois langages qui se partagent le travail : <strong>HTML</strong> pour la <strong>structure</strong> (le contenu), <strong>CSS</strong> pour le <strong>style</strong> (l'apparence) et <strong>JavaScript</strong> pour le <strong>comportement</strong> (l'interactivité). Image simple : HTML est le squelette, CSS les vêtements, JS les muscles. On commence par le HTML, la base de tout.",
                    en: "A web page rests on three languages that share the work: <strong>HTML</strong> for <strong>structure</strong> (content), <strong>CSS</strong> for <strong>style</strong> (looks) and <strong>JavaScript</strong> for <strong>behavior</strong> (interactivity). Simple picture: HTML is the skeleton, CSS the clothes, JS the muscles. We start with HTML, the foundation of everything." },
      explication: { fr: "Le HTML s'écrit avec des <strong>balises</strong>. Une balise <strong>entoure</strong> du contenu : une balise <strong>ouvrante</strong> <code>&lt;h1&gt;</code>, puis le contenu, puis une balise <strong>fermante</strong> <code>&lt;/h1&gt;</code> (la même, avec une barre oblique <code>/</code>). Par exemple, <code>&lt;h1&gt;Bonjour&lt;/h1&gt;</code> affiche le grand titre « Bonjour ». C'est tout le principe du HTML : on entoure du texte avec des balises pour lui donner un sens. Le CSS et le JavaScript viendront se brancher sur ce HTML plus tard.",
                     en: "HTML is written with <strong>tags</strong>. A tag <strong>wraps</strong> content: an <strong>opening</strong> tag <code>&lt;h1&gt;</code>, then the content, then a <strong>closing</strong> tag <code>&lt;/h1&gt;</code> (the same one, with a slash <code>/</code>). For example, <code>&lt;h1&gt;Bonjour&lt;/h1&gt;</code> shows the big heading « Bonjour ». That's the whole idea of HTML: you wrap text with tags to give it meaning. CSS and JavaScript will plug into this HTML later." },
      illustration: null,
      exemple: {
        code: "<h1>Bonjour</h1>\n<p>Ceci est un paragraphe.</p>",
        langage: "html",
        commentaire: { fr: "<code>&lt;h1&gt;</code> est un grand titre, <code>&lt;p&gt;</code> un paragraphe. Chaque balise s'ouvre puis se ferme.",
                       en: "<code>&lt;h1&gt;</code> is a big heading, <code>&lt;p&gt;</code> a paragraph. Each tag opens then closes." }
      },
      exercice: {
        enonce: { fr: "Écris un titre avec la balise <code>&lt;h1&gt;</code> qui affiche « Ma première page ». Ensuite, complète le paragraphe en ajoutant la balise fermante <code>&lt;/p&gt;</code> qui manque.",
                  en: "Write a heading with the <code>&lt;h1&gt;</code> tag showing « Ma première page ». Then complete the paragraph by adding the missing closing <code>&lt;/p&gt;</code> tag." },
        fichiers: {
          html: "<!-- Écris ici un titre h1 avec le texte : Ma première page -->\n\n<p>Bienvenue sur le web !"
        },
        correction: {
          html: "<h1>Ma première page</h1>\n\n<p>Bienvenue sur le web !</p>"
        },
        verification: [
          { fichier: "html", contient: "<h1>", message: { fr: "Ajoute une balise ouvrante <h1>.", en: "Add an opening <h1> tag." } },
          { fichier: "html", contient: "Ma première page", message: { fr: "Le titre doit contenir le texte « Ma première page ».", en: "The heading must contain « Ma première page »." } },
          { fichier: "html", contient: "</h1>", message: { fr: "N'oublie pas de fermer le titre avec </h1>.", en: "Don't forget to close the heading with </h1>." } },
          { fichier: "html", contient: "</p>", message: { fr: "Ajoute la balise fermante </p> à la fin du paragraphe.", en: "Add the closing </p> tag at the end of the paragraph." } }
        ]
      },
      application: null,
      quiz: [
        { type: "qcm", question: { fr: "À quoi sert le HTML dans une page web ?", en: "What is HTML for in a web page?" },
          options: [{ fr: "À définir la structure et le contenu", en: "To define the structure and content" },
                    { fr: "À gérer uniquement les couleurs", en: "To handle only the colors" },
                    { fr: "À rendre la page interactive", en: "To make the page interactive" }],
          bonneReponse: 0,
          explication: { fr: "Le HTML définit la structure et le contenu de la page. Le CSS s'occupe de l'apparence, et le JavaScript de l'interactivité.",
                         en: "HTML defines the structure and content of the page. CSS handles the looks, and JavaScript the interactivity." } },
        { type: "complete", question: { fr: "Quel caractère, placé devant le nom, transforme une balise ouvrante en balise <em>fermante</em> ? (ex : &lt;…h1&gt;)", en: "Which character, placed before the name, turns an opening tag into a <em>closing</em> tag? (e.g. &lt;…h1&gt;)" },
          bonneReponse: "/",
          explication: { fr: "Une balise fermante reprend le même nom précédé d'une barre oblique : <code>&lt;/h1&gt;</code>.",
                         en: "A closing tag repeats the same name preceded by a slash: <code>&lt;/h1&gt;</code>." } }
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
        fr: "La boucle de travail à retenir est simple : <strong>(1)</strong> tu apprends une notion en ligne dans l'éditeur de la plateforme, tu l'expérimentes ; <strong>(2)</strong> tu reportes ce que tu viens de pratiquer dans tes fichiers Notepad++ (<code>projet-eleve/</code>) ; <strong>(3)</strong> tu enregistres avec <kbd>Ctrl+S</kbd> ; <strong>(4)</strong> tu ouvres ou rafraîchis <code>index.html</code> dans le navigateur — soit par double-clic, soit via <code>serve.cmd</code> — et tu vois <em>ton</em> projet avancer. Pas « faire tout en ligne puis copier-coller à la fin » : module après module, ton vrai projet grandit en parallèle de ton apprentissage.<br><br>Pour démarrer, ouvre le dossier <code>projet-eleve/starter/</code> dans Notepad++ (Fichier → Ouvrir le dossier) et ouvre <code>index.html</code> dans le navigateur."
,
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
