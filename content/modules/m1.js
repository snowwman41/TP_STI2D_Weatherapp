export const m1 = {
  titre: { fr: "La structure — HTML", en: "Structure — HTML" },
  etapes: [
    {
      titre: { fr: "Le squelette d'une page", en: "The page skeleton" },
      rappel: { fr: "Tu sais déjà ce qu'est le HTML et une balise. Ici tu vas construire la <strong>structure</strong> complète d'une page : son squelette et ses balises de base.",
                en: "You already know what HTML and a tag are. Here you'll build a page's full <strong>structure</strong>: its skeleton and basic tags." },
      besoin: {
        fr: "Toute page web est un fichier HTML. Comprendre sa structure de base est la première brique indispensable.",
        en: "Every web page is an HTML file. Understanding its basic structure is the first essential building block."
      },
      decouverte: {
        fr: "HTML (HyperText Markup Language) utilise des <strong>balises</strong> pour délimiter le contenu. Les balises s'ouvrent (<code>&lt;html&gt;</code>) et se ferment (<code>&lt;/html&gt;</code>).",
        en: "HTML (HyperText Markup Language) uses <strong>tags</strong> to wrap content. Tags open (<code>&lt;html&gt;</code>) and close (<code>&lt;/html&gt;</code>)."
      },
      explication: {
        fr: "<code>&lt;!DOCTYPE html&gt;</code> indique au navigateur qu'il s'agit d'un document HTML5. Le <code>&lt;head&gt;</code> contient les informations <em>pour le navigateur</em> (titre de l'onglet, liens CSS…) mais rien de visible à l'écran. Le <code>&lt;body&gt;</code> contient tout ce que l'utilisateur voit.",
        en: "<code>&lt;!DOCTYPE html&gt;</code> tells the browser this is an HTML5 document. The <code>&lt;head&gt;</code> holds information <em>for the browser</em> (tab title, CSS links…) but nothing visible on screen. The <code>&lt;body&gt;</code> contains everything the user sees."
      },
      illustration: "dom-tree",
      exemple: {
        code: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Mon projet</title>\n</head>\n<body>\n  <p>Bonjour !</p>\n</body>\n</html>",
        langage: "html",
        commentaire: {
          fr: "Un squelette HTML minimal et valide.",
          en: "A minimal, valid HTML skeleton."
        }
      },
      exercice: {
        enonce: {
          fr: "Le fichier ci-dessous est presque complet. Ajoute la balise ouvrante <code>&lt;body&gt;</code> manquante et son contenu (un paragraphe \"Bonjour !\") avant la balise fermante.",
          en: "The file below is almost complete. Add the missing opening <code>&lt;body&gt;</code> tag and its content (a paragraph \"Bonjour !\") before the closing tag."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Mon projet</title>\n</head>\n<!-- Ajoute le body ici -->\n</html>"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Mon projet</title>\n</head>\n<body>\n  <p>Bonjour !</p>\n</body>\n</html>"
        },
        verification: [
          { fichier: "html", contient: "<body>", message: { fr: "Ajoute la balise ouvrante <body>.", en: "Add the opening <body> tag." } },
          { fichier: "html", contient: "<p>", message: { fr: "Ajoute un paragraphe <p> dans le body.", en: "Add a <p> paragraph inside the body." } },
          { fichier: "html", contient: "Bonjour !", message: { fr: "Le paragraphe doit contenir le texte \"Bonjour !\".", en: "The paragraph must contain the text \"Bonjour !\"." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "À quoi sert la balise <code>&lt;head&gt;</code> ?",
            en: "What is the <code>&lt;head&gt;</code> tag for?"
          },
          options: [
            { fr: "Afficher le contenu principal visible par l'utilisateur", en: "Display the main content visible to the user" },
            { fr: "Contenir les informations pour le navigateur (titre, CSS…), pas le contenu visible", en: "Hold information for the browser (title, CSS…), not visible content" },
            { fr: "Définir le pied de page du site", en: "Define the site footer" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "Le <code>&lt;head&gt;</code> est réservé aux métadonnées et aux ressources : rien de ce qu'il contient ne s'affiche directement à l'écran.",
            en: "The <code>&lt;head&gt;</code> is reserved for metadata and resources: nothing inside it is displayed directly on screen."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Un titre et un conteneur", en: "A heading and a container" },
      besoin: {
        fr: "Notre tableau de bord a besoin d'un grand titre et d'une zone pour accueillir les cartes de villes.",
        en: "Our dashboard needs a big heading and a zone to hold the city cards."
      },
      decouverte: {
        fr: "En HTML, <code>&lt;h1&gt;</code> est le titre le plus important de la page. <code>&lt;div&gt;</code> est une boîte générique, idéale pour regrouper des éléments. L'attribut <code>id</code> donne une identité unique à un élément.",
        en: "In HTML, <code>&lt;h1&gt;</code> is the most important heading on the page. <code>&lt;div&gt;</code> is a generic box, perfect for grouping elements. The <code>id</code> attribute gives a unique identity to an element."
      },
      explication: {
        fr: "On utilise <code>id=\"cartes\"</code> pour pouvoir retrouver ce <code>&lt;div&gt;</code> facilement depuis le JavaScript plus tard. Un <code>id</code> doit être <strong>unique</strong> sur la page — deux éléments ne peuvent pas avoir le même <code>id</code>.",
        en: "We use <code>id=\"cartes\"</code> so we can easily find this <code>&lt;div&gt;</code> from JavaScript later. An <code>id</code> must be <strong>unique</strong> on the page — two elements cannot share the same <code>id</code>."
      },
      illustration: null,
      exemple: {
        code: "<h1>Tableau de bord des villes</h1>\n<div id=\"cartes\">\n  <!-- les cartes de villes apparaîtront ici -->\n</div>",
        langage: "html",
        commentaire: {
          fr: "Le titre principal et le conteneur des cartes.",
          en: "The main heading and the card container."
        }
      },
      exercice: {
        enonce: {
          fr: "Dans le <code>&lt;body&gt;</code> vide ci-dessous, ajoute un <code>&lt;h1&gt;</code> avec le texte <em>Tableau de bord des villes</em> et un <code>&lt;div&gt;</code> avec l'<code>id</code> <em>cartes</em>.",
          en: "Inside the empty <code>&lt;body&gt;</code> below, add an <code>&lt;h1&gt;</code> with the text <em>Tableau de bord des villes</em> and a <code>&lt;div&gt;</code> with the <code>id</code> <em>cartes</em>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord</title>\n</head>\n<body>\n  <!-- Ajoute le h1 et le div#cartes ici -->\n</body>\n</html>"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord</title>\n</head>\n<body>\n  <h1>Tableau de bord des villes</h1>\n  <div id=\"cartes\"></div>\n</body>\n</html>"
        },
        verification: [
          { fichier: "html", contient: "<h1>", message: { fr: "Ajoute une balise <h1> pour le titre.", en: "Add an <h1> tag for the heading." } },
          { fichier: "html", contient: "Tableau de bord des villes", message: { fr: "Le <h1> doit contenir le texte \"Tableau de bord des villes\".", en: "The <h1> must contain the text \"Tableau de bord des villes\"." } },
          { fichier: "html", contient: "id=\"cartes\"", message: { fr: "Ajoute un <div> avec l'attribut id=\"cartes\".", en: "Add a <div> with the attribute id=\"cartes\"." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quelle balise affiche un grand titre principal ? (sans les chevrons)",
            en: "Which tag displays a large main heading? (without angle brackets)"
          },
          bonneReponse: "h1",
          explication: {
            fr: "<code>&lt;h1&gt;</code> est le titre de niveau 1, le plus important d'une page HTML.",
            en: "<code>&lt;h1&gt;</code> is the level-1 heading, the most important on an HTML page."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Le formulaire de saisie", en: "The input form" },
      besoin: {
        fr: "L'utilisateur doit pouvoir taper le nom d'une ville et cliquer sur un bouton pour l'ajouter au tableau de bord.",
        en: "The user must be able to type a city name and click a button to add it to the dashboard."
      },
      decouverte: {
        fr: "Un <code>&lt;form&gt;</code> regroupe les champs de saisie. <code>&lt;input&gt;</code> crée une zone de texte, <code>&lt;button&gt;</code> crée un bouton cliquable. L'attribut <code>placeholder</code> affiche un texte indicatif dans le champ tant qu'il est vide.",
        en: "A <code>&lt;form&gt;</code> groups input fields together. <code>&lt;input&gt;</code> creates a text field, <code>&lt;button&gt;</code> creates a clickable button. The <code>placeholder</code> attribute shows hint text in the field while it is empty."
      },
      explication: {
        fr: "<code>&lt;input type=\"text\"&gt;</code> accepte du texte libre. On ajoute <code>id=\"champ-ville\"</code> pour le retrouver en JavaScript. Le <code>&lt;button&gt;</code> déclenchera notre code JS plus tard — pour l'instant, on pose juste la structure HTML.",
        en: "<code>&lt;input type=\"text\"&gt;</code> accepts free text. We add <code>id=\"champ-ville\"</code> to find it from JavaScript. The <code>&lt;button&gt;</code> will trigger our JS code later — for now, we're just laying out the HTML structure."
      },
      illustration: null,
      exemple: {
        code: "<form id=\"form-ville\">\n  <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n  <button type=\"submit\">Ajouter</button>\n</form>",
        langage: "html",
        commentaire: {
          fr: "Un formulaire simple avec un champ texte et un bouton.",
          en: "A simple form with a text field and a button."
        }
      },
      exercice: {
        enonce: {
          fr: "Complète le <code>&lt;body&gt;</code> en ajoutant un <code>&lt;form&gt;</code> qui contient : un <code>&lt;input type=\"text\"&gt;</code> avec le placeholder <em>Entrez une ville…</em> et un <code>&lt;button&gt;</code> affichant <em>Ajouter</em>.",
          en: "Complete the <code>&lt;body&gt;</code> by adding a <code>&lt;form&gt;</code> containing: an <code>&lt;input type=\"text\"&gt;</code> with the placeholder <em>Entrez une ville…</em> and a <code>&lt;button&gt;</code> showing <em>Ajouter</em>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord</title>\n</head>\n<body>\n  <h1>Tableau de bord des villes</h1>\n  <!-- Ajoute le form ici -->\n  <div id=\"cartes\"></div>\n</body>\n</html>"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord</title>\n</head>\n<body>\n  <h1>Tableau de bord des villes</h1>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n</body>\n</html>"
        },
        verification: [
          { fichier: "html", contient: "<form", message: { fr: "Ajoute un élément <form> dans le body.", en: "Add a <form> element in the body." } },
          { fichier: "html", contient: "<input", message: { fr: "Ajoute un <input> dans le formulaire.", en: "Add an <input> inside the form." } },
          { fichier: "html", contient: "<button", message: { fr: "Ajoute un <button> dans le formulaire.", en: "Add a <button> inside the form." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Quel élément HTML permet à l'utilisateur de <strong>taper</strong> du texte ?",
            en: "Which HTML element lets the user <strong>type</strong> text?"
          },
          options: [
            { fr: "<button>", en: "<button>" },
            { fr: "<input>", en: "<input>" },
            { fr: "<div>", en: "<div>" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "<code>&lt;input type=\"text\"&gt;</code> est le champ de saisie de texte. <code>&lt;button&gt;</code> est un bouton et <code>&lt;div&gt;</code> est un conteneur générique.",
            en: "<code>&lt;input type=\"text\"&gt;</code> is the text input field. <code>&lt;button&gt;</code> is a button and <code>&lt;div&gt;</code> is a generic container."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Relier le CSS et le JavaScript", en: "Linking CSS and JavaScript" },
      besoin: {
        fr: "Tu sais maintenant écrire la structure HTML d'une page. Pour l'<strong>habiller</strong> (CSS) et la rendre <strong>interactive</strong> (JavaScript), il faut relier ces deux fichiers à ton HTML.",
        en: "You now know how to write a page's HTML structure. To <strong>dress it up</strong> (CSS) and make it <strong>interactive</strong> (JavaScript), you must link these two files to your HTML."
      },
      decouverte: {
        fr: "Le HTML est le fichier central : c'est lui que le navigateur ouvre. On lui <strong>relie</strong> un fichier <strong>CSS</strong> (le style) et un fichier <strong>JavaScript</strong> (le comportement). Le <code>&lt;link&gt;</code> du CSS se place dans le <code>&lt;head&gt;</code>. Le <code>&lt;script&gt;</code> du JS se place tout à la fin, juste avant <code>&lt;/body&gt;</code>.",
        en: "HTML is the central file: it's the one the browser opens. You <strong>link</strong> a <strong>CSS</strong> file (style) and a <strong>JavaScript</strong> file (behavior) to it. The CSS <code>&lt;link&gt;</code> goes in the <code>&lt;head&gt;</code>. The JS <code>&lt;script&gt;</code> goes at the very end, just before <code>&lt;/body&gt;</code>."
      },
      explication: {
        fr: "Le <code>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</code> va dans le <code>&lt;head&gt;</code> : le navigateur charge le style avant d'afficher la page. Le <code>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</code> se place <strong>tout à la fin</strong>, juste avant <code>&lt;/body&gt;</code> : ainsi tout le HTML est déjà chargé quand le JavaScript s'exécute (sinon il chercherait des éléments qui n'existent pas encore).",
        en: "The <code>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</code> goes in the <code>&lt;head&gt;</code>: the browser loads the style before displaying the page. The <code>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</code> goes <strong>at the very end</strong>, just before <code>&lt;/body&gt;</code>: that way the whole HTML is already loaded when the JavaScript runs (otherwise it would look for elements that don't exist yet)."
      },
      illustration: null,
      exemple: {
        code: "<!DOCTYPE html>\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Mon projet</h1>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
        langage: "html",
        commentaire: {
          fr: "Le <code>&lt;link&gt;</code> dans le <code>&lt;head&gt;</code>, le <code>&lt;script&gt;</code> juste avant <code>&lt;/body&gt;</code>.",
          en: "The <code>&lt;link&gt;</code> in the <code>&lt;head&gt;</code>, the <code>&lt;script&gt;</code> just before <code>&lt;/body&gt;</code>."
        }
      },
      exercice: {
        enonce: {
          fr: "Relie ce fichier HTML à un CSS et un JS : complète les deux lignes manquantes — le <code>&lt;link&gt;</code> dans le <code>&lt;head&gt;</code> et le <code>&lt;script&gt;</code> avant <code>&lt;/body&gt;</code>.",
          en: "Link this HTML to a CSS and JS file: complete the two missing lines — the <code>&lt;link&gt;</code> in the <code>&lt;head&gt;</code> and the <code>&lt;script&gt;</code> before <code>&lt;/body&gt;</code>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html>\n<head>\n  <!-- relie le CSS ici -->\n</head>\n<body>\n  <h1>Mon projet</h1>\n  <!-- relie le JS ici -->\n</body>\n</html>"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Mon projet</h1>\n  <script src=\"script.js\"></script>\n</body>\n</html>"
        },
        verification: [
          { fichier: "html", contient: "<link", message: { fr: "Relie le fichier CSS avec une balise <link> dans le <head>.", en: "Link the CSS file with a <link> tag in the <head>." } },
          { fichier: "html", contient: "href=\"style.css\"", message: { fr: "Le <link> doit pointer vers href=\"style.css\".", en: "The <link> must point to href=\"style.css\"." } },
          { fichier: "html", contient: "<script", message: { fr: "Relie le fichier JS avec une balise <script> juste avant </body>.", en: "Link the JS file with a <script> tag just before </body>." } },
          { fichier: "html", contient: "src=\"script.js\"", message: { fr: "Le <script> doit avoir src=\"script.js\".", en: "The <script> must have src=\"script.js\"." } }
        ]
      },
      application: {
        fr: "Dans ton dossier <code>app_web_meteo/</code>, c'est à toi de relier tes trois fichiers : ajoute la balise <code>&lt;link&gt;</code> vers <code>style.css</code> dans le <code>&lt;head&gt;</code> et la balise <code>&lt;script&gt;</code> vers <code>script.js</code> juste avant <code>&lt;/body&gt;</code>. C'est ton point de départ pour le vrai projet.",
        en: "In your <code>app_web_meteo/</code> folder, it's up to you to link your three files: add the <code>&lt;link&gt;</code> to <code>style.css</code> in the <code>&lt;head&gt;</code> and the <code>&lt;script&gt;</code> to <code>script.js</code> just before <code>&lt;/body&gt;</code>. That's your starting point for the real project."
      },
      quiz: [
        { type: "qcm", question: { fr: "Où place-t-on le <code>&lt;script&gt;</code> du JavaScript ?", en: "Where do you put the JavaScript <code>&lt;script&gt;</code>?" },
          options: [{ fr: "Dans le <code>&lt;head&gt;</code>, tout en haut", en: "In the <code>&lt;head&gt;</code>, at the top" },
                    { fr: "Juste avant <code>&lt;/body&gt;</code>, à la fin", en: "Just before <code>&lt;/body&gt;</code>, at the end" },
                    { fr: "N'importe où, ça ne change rien", en: "Anywhere, it makes no difference" }],
          bonneReponse: 1,
          explication: { fr: "À la fin du <code>&lt;body&gt;</code>, le HTML est déjà chargé : le JS peut donc manipuler les éléments de la page.", en: "At the end of the <code>&lt;body&gt;</code>, the HTML is already loaded, so the JS can work with the page's elements." } },
        { type: "complete", question: { fr: "Quelle balise relie un fichier JS ? (sans les chevrons) &lt;… src=\"script.js\"&gt;", en: "Which tag links a JS file? (without angle brackets) &lt;… src=\"script.js\"&gt;" },
          bonneReponse: "script",
          explication: { fr: "<code>&lt;script src=\"…\"&gt;</code> charge le JavaScript.", en: "<code>&lt;script src=\"…\"&gt;</code> loads JavaScript." } }
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
      titre: { fr: "On assemble tout dans le projet", en: "Putting it all together" },
      besoin: {
        fr: "Il est temps de rassembler tout ce qu'on a appris pour créer la structure HTML complète du vrai projet.",
        en: "It's time to bring everything we've learned together to create the complete HTML structure of the real project."
      },
      decouverte: {
        fr: "Une bonne structure HTML se lit de haut en bas : d'abord l'en-tête (<code>&lt;h1&gt;</code>), ensuite le formulaire de saisie, enfin le conteneur des cartes. Chaque partie a son rôle.",
        en: "A good HTML structure reads top to bottom: first the heading (<code>&lt;h1&gt;</code>), then the input form, finally the card container. Each part has its role."
      },
      explication: {
        fr: "On place le <code>&lt;h1&gt;</code> en haut pour que le navigateur — et les moteurs de recherche — identifient le sujet de la page. Le formulaire vient juste après : l'utilisateur le voit dès l'ouverture. Enfin, <code>&lt;div id=\"cartes\"&gt;</code> accueillera les cartes générées dynamiquement par JavaScript.",
        en: "We put the <code>&lt;h1&gt;</code> at the top so the browser — and search engines — can identify the page topic. The form comes right after: the user sees it immediately. Finally, <code>&lt;div id=\"cartes\"&gt;</code> will host the cards generated dynamically by JavaScript."
      },
      illustration: null,
      exemple: {
        code: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord des villes</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Tableau de bord des villes</h1>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
        langage: "html",
        commentaire: {
          fr: "La structure complète du fichier index.html du projet.",
          en: "The complete structure of the project's index.html file."
        }
      },
      exercice: {
        enonce: {
          fr: "Complète le fichier <code>index.html</code> partiel : ajoute le <code>&lt;h1&gt;</code>, le <code>&lt;form&gt;</code> avec l'<code>&lt;input&gt;</code> et le <code>&lt;button&gt;</code>, et le <code>&lt;div id=\"cartes\"&gt;</code>.",
          en: "Complete the partial <code>index.html</code>: add the <code>&lt;h1&gt;</code>, the <code>&lt;form&gt;</code> with the <code>&lt;input&gt;</code> and <code>&lt;button&gt;</code>, and the <code>&lt;div id=\"cartes\"&gt;</code>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord des villes</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <!-- 1. Ajoute le titre h1 -->\n  <!-- 2. Ajoute le formulaire avec input et bouton -->\n  <!-- 3. Ajoute le div#cartes -->\n  <script src=\"script.js\"></script>\n</body>\n</html>"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord des villes</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Tableau de bord des villes</h1>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>"
        },
        verification: [
          { fichier: "html", contient: "<h1>", message: { fr: "Ajoute le titre <h1> en haut du body.", en: "Add the <h1> heading at the top of the body." } },
          { fichier: "html", contient: "id=\"form-ville\"", message: { fr: "Ajoute un <form> avec id=\"form-ville\".", en: "Add a <form> with id=\"form-ville\"." } },
          { fichier: "html", contient: "id=\"champ-ville\"", message: { fr: "Ajoute un <input> avec id=\"champ-ville\" dans le formulaire.", en: "Add an <input> with id=\"champ-ville\" inside the form." } },
          { fichier: "html", contient: "id=\"cartes\"", message: { fr: "Ajoute un <div> avec id=\"cartes\" pour les cartes de villes.", en: "Add a <div> with id=\"cartes\" to hold the city cards." } }
        ]
      },
      application: {
        fr: "Tu viens de poser la structure HTML complète de ton projet dans <code>app_web_meteo/index.html</code>. Les modules suivants vont habiller cette structure avec du CSS, puis lui donner vie avec JavaScript. <br><br>👉 <strong>Dans Notepad++ :</strong> ouvre <code>index.html</code> de ton dossier <code>app_web_meteo/</code>, reporte-y ce que tu viens de pratiquer, enregistre (Ctrl+S), puis rafraîchis <code>index.html</code> dans le navigateur. Ton projet doit maintenant afficher l'en-tête, le champ et le bouton.",
        en: "You've just laid the complete HTML structure of your project in <code>app_web_meteo/index.html</code>. The next modules will style this structure with CSS, then bring it to life with JavaScript. <br><br>👉 <strong>In Notepad++:</strong> open <code>index.html</code> from your <code>app_web_meteo/</code> folder, transfer what you just practised, save (Ctrl+S), then refresh <code>index.html</code> in the browser. Your project should now display the header, the input field and the button."
      },
      quiz: [
        {
          type: "vraifaux",
          question: {
            fr: "Un même <code>id</code> peut être utilisé sur plusieurs éléments d'une même page.",
            en: "The same <code>id</code> can be used on multiple elements of the same page."
          },
          bonneReponse: false,
          explication: {
            fr: "Un <code>id</code> doit être <strong>unique</strong> sur la page. Pour appliquer le même style ou comportement à plusieurs éléments, on utilise un <code>class</code> à la place.",
            en: "An <code>id</code> must be <strong>unique</strong> on the page. To apply the same style or behavior to multiple elements, use a <code>class</code> instead."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
