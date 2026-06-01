export const m4 = {
  titre: { fr: "Créer des cartes — le DOM en écriture", en: "Creating cards — writing the DOM" },
  etapes: [
    {
      titre: { fr: "Garder les villes dans un tableau", en: "Keeping cities in an array" },
      rappel: { fr: "Tu sais réagir à un clic et lire ce que l'utilisateur tape. Maintenant tu vas <strong>créer des éléments HTML depuis JavaScript</strong> pour afficher une carte par ville.",
                en: "You can react to a click and read what the user types. Now you'll <strong>create HTML elements from JavaScript</strong> to show a card per city." },
      besoin: {
        fr: "Avant de créer des cartes visuelles, il faut <strong>mémoriser</strong> les villes ajoutées par l'utilisateur — un tableau JavaScript est l'outil idéal pour cela.",
        en: "Before creating visual cards, we need to <strong>remember</strong> the cities added by the user — a JavaScript array is the perfect tool for this."
      },
      decouverte: {
        fr: "Un tableau (<code>array</code>) est une liste ordonnée de valeurs. On le déclare avec <code>const villes = []</code> (crochets vides pour un tableau vide). La méthode <code>villes.push(valeur)</code> ajoute une valeur <strong>à la fin</strong> du tableau.",
        en: "An array is an ordered list of values. We declare it with <code>const villes = []</code> (empty brackets for an empty array). The method <code>villes.push(value)</code> adds a value <strong>at the end</strong> of the array."
      },
      explication: {
        fr: "On déclare <code>villes</code> avec <code>const</code> car le tableau lui-même ne sera pas remplacé — seul son <em>contenu</em> évolue. Chaque fois que l'utilisateur soumet le formulaire, on <code>push</code> le nom de la ville dans le tableau, puis on affiche le tableau dans la console pour vérifier.",
        en: "We declare <code>villes</code> with <code>const</code> because the array itself won't be replaced — only its <em>contents</em> grow. Each time the user submits the form, we <code>push</code> the city name into the array, then log the array to the console to verify."
      },
      illustration: null,
      exemple: {
        code: "const villes = [];\n\nvilles.push(\"Paris\");\nvilles.push(\"Tokyo\");\nvilles.push(\"New York\");\n\nconsole.log(villes); // [\"Paris\", \"Tokyo\", \"New York\"]\nconsole.log(villes.length); // 3",
        langage: "js",
        commentaire: {
          fr: "<code>push</code> ajoute chaque ville à la suite. <code>villes.length</code> donne le nombre d'éléments dans le tableau.",
          en: "<code>push</code> appends each city in turn. <code>villes.length</code> gives the number of elements in the array."
        }
      },
      exercice: {
        enonce: {
          fr: "À chaque soumission du formulaire, récupère le nom de ville saisi et ajoute-le au tableau <code>villes</code> avec <code>push</code>. Affiche ensuite le tableau dans la console pour voir la liste s'allonger.",
          en: "On each form submission, read the typed city name and add it to the <code>villes</code> array with <code>push</code>. Then log the array to the console to watch the list grow."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de villes</title>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\n\n// Déclare un tableau vide pour stocker les villes\nconst villes = [];\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n\n  // Ajoute la ville au tableau\n  // ...\n\n  // Affiche le tableau dans la console\n  // ...\n\n  champ.value = \"\";\n});"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de villes</title>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\n\nconst villes = [];\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n  villes.push(ville);\n  console.log(villes);\n  champ.value = \"\";\n});"
        },
        verification: [
          { fichier: "js", contient: "villes.push", message: { fr: "Utilise villes.push() pour ajouter la ville au tableau.", en: "Use villes.push() to add the city to the array." } },
          { fichier: "js", contient: "const villes = []", message: { fr: "Déclare le tableau villes avec const villes = [].", en: "Declare the villes array with const villes = []." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Quelle méthode ajoute un élément à la FIN d'un tableau ?",
            en: "Which method adds an element to the END of an array?"
          },
          options: [
            { fr: "<code>add()</code>", en: "<code>add()</code>" },
            { fr: "<code>push()</code>", en: "<code>push()</code>" },
            { fr: "<code>append()</code>", en: "<code>append()</code>" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "<code>push()</code> est la méthode standard pour ajouter un élément à la fin d'un tableau en JavaScript. <code>add()</code> n'existe pas sur les tableaux, et <code>append()</code> est réservé au DOM.",
            en: "<code>push()</code> is the standard method to add an element at the end of a JavaScript array. <code>add()</code> does not exist on arrays, and <code>append()</code> is reserved for the DOM."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Créer un élément avec JavaScript", en: "Creating an element with JavaScript" },
      besoin: {
        fr: "On sait stocker les villes — maintenant il faut <strong>créer un élément HTML</strong> en JavaScript pour l'afficher sur la page.",
        en: "We know how to store cities — now we need to <strong>create an HTML element</strong> in JavaScript to display it on the page."
      },
      decouverte: {
        fr: "<code>document.createElement(\"div\")</code> crée un nouvel élément <code>&lt;div&gt;</code> en mémoire, sans l'ajouter à la page. On lui donne un texte avec <code>element.textContent</code>, une classe CSS avec <code>element.className</code>, puis on l'insère dans la page avec <code>conteneur.append(element)</code>.",
        en: "<code>document.createElement(\"div\")</code> creates a new <code>&lt;div&gt;</code> element in memory, without adding it to the page. We give it text with <code>element.textContent</code>, a CSS class with <code>element.className</code>, then insert it into the page with <code>container.append(element)</code>."
      },
      explication: {
        fr: "La création d'un élément se fait en trois temps : <strong>créer</strong> l'élément avec <code>createElement</code>, <strong>configurer</strong> ses propriétés (texte, classe, style…), puis <strong>attacher</strong> au DOM avec <code>append</code>. Tant que l'élément n'est pas attaché, il reste invisible.",
        en: "Creating an element follows three steps: <strong>create</strong> the element with <code>createElement</code>, <strong>configure</strong> its properties (text, class, style…), then <strong>attach</strong> it to the DOM with <code>append</code>. Until it is attached, the element remains invisible."
      },
      illustration: "dom-tree",
      exemple: {
        code: "const conteneur = document.querySelector(\"#cartes\");\n\n// 1. Créer l'élément\nconst carte = document.createElement(\"div\");\n\n// 2. Le configurer\ncarte.textContent = \"Paris\";\ncarte.className = \"carte\";\n\n// 3. L'ajouter à la page\nconteneur.append(carte);",
        langage: "js",
        commentaire: {
          fr: "<code>createElement</code> crée l'élément, <code>textContent</code> et <code>className</code> le configurent, <code>append</code> l'insère dans le conteneur.",
          en: "<code>createElement</code> creates the element, <code>textContent</code> and <code>className</code> configure it, <code>append</code> inserts it into the container."
        }
      },
      exercice: {
        enonce: {
          fr: "Crée un <code>&lt;div&gt;</code> avec la classe <code>carte</code>, donne-lui comme texte le nom d'une ville de ton choix, puis ajoute-le dans <code>#cartes</code>.",
          en: "Create a <code>&lt;div&gt;</code> with the class <code>carte</code>, set its text to a city name of your choice, then append it to <code>#cartes</code>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Créer une carte</title>\n  <style>\n    .carte { border: 2px solid #333; padding: 12px; margin: 8px; border-radius: 6px; display: inline-block; }\n  </style>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const conteneur = document.querySelector(\"#cartes\");\n\n// 1. Crée un élément <div>\nconst carte = // ...\n\n// 2. Donne-lui la classe 'carte'\n// ...\n\n// 3. Donne-lui un texte (une ville)\n// ...\n\n// 4. Ajoute-le dans #cartes\n// ..."
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Créer une carte</title>\n  <style>\n    .carte { border: 2px solid #333; padding: 12px; margin: 8px; border-radius: 6px; display: inline-block; }\n  </style>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const conteneur = document.querySelector(\"#cartes\");\n\nconst carte = document.createElement(\"div\");\ncarte.className = \"carte\";\ncarte.textContent = \"Paris\";\nconteneur.append(carte);"
        },
        verification: [
          { fichier: "js", contient: "createElement", message: { fr: "Utilise document.createElement() pour créer un élément HTML.", en: "Use document.createElement() to create an HTML element." } },
          { fichier: "js", contient: "className", message: { fr: "Attribue la classe \"carte\" avec .className.", en: "Assign the class \"carte\" using .className." } },
          { fichier: "js", contient: "append", message: { fr: "Utilise .append() pour insérer la carte dans #cartes.", en: "Use .append() to insert the card into #cartes." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quelle méthode CRÉE un nouvel élément HTML en JavaScript ?",
            en: "Which method CREATES a new HTML element in JavaScript?"
          },
          bonneReponse: "createElement",
          explication: {
            fr: "<code>document.createElement(\"div\")</code> crée un nouvel élément HTML en mémoire. Il faut ensuite l'attacher au DOM avec <code>append</code> pour qu'il soit visible.",
            en: "<code>document.createElement(\"div\")</code> creates a new HTML element in memory. You then need to attach it to the DOM with <code>append</code> for it to be visible."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Construire le HTML d'une carte (template literals)", en: "Building a card's HTML (template literals)" },
      besoin: {
        fr: "Une carte avec juste du texte brut, c'est limité — on veut pouvoir insérer du <strong>vrai HTML</strong> avec des balises, tout en y intégrant des variables JavaScript.",
        en: "A card with plain text is limited — we want to insert <strong>real HTML</strong> with tags while embedding JavaScript variables inside."
      },
      decouverte: {
        fr: "Les <strong>template literals</strong> s'écrivent avec des <em>backticks</em> (<code>` `</code>) au lieu de guillemets. On y insère une variable avec <code>${variable}</code>. En combinant cela avec <code>element.innerHTML</code>, on peut définir le contenu HTML complet d'un élément.",
        en: "<strong>Template literals</strong> use <em>backticks</em> (<code>` `</code>) instead of quotes. You embed a variable with <code>${variable}</code>. Combined with <code>element.innerHTML</code>, you can set the full HTML content of an element."
      },
      explication: {
        fr: "<code>innerHTML</code> interprète la chaîne comme du HTML — contrairement à <code>textContent</code> qui l'affiche tel quel. Les template literals évitent la concaténation maladroite avec <code>+</code> : le code est plus lisible et les variables s'insèrent naturellement au milieu du HTML.",
        en: "<code>innerHTML</code> interprets the string as HTML — unlike <code>textContent</code> which displays it as-is. Template literals avoid awkward <code>+</code> concatenation: the code is more readable and variables fit naturally inside the HTML."
      },
      illustration: null,
      exemple: {
        code: "const ville = \"Tokyo\";\nconst carte = document.createElement(\"div\");\ncarte.className = \"carte\";\n\n// Template literal : backticks + ${variable}\ncarte.innerHTML = `\n  <h2>${ville}</h2>\n  <p>Pays : —</p>\n  <p>Météo : —</p>\n`;\n\ndocument.querySelector(\"#cartes\").append(carte);",
        langage: "js",
        commentaire: {
          fr: "Les backticks permettent d'écrire le HTML sur plusieurs lignes et d'insérer <code>${ville}</code> directement dans la chaîne.",
          en: "Backticks allow writing HTML on multiple lines and inserting <code>${ville}</code> directly inside the string."
        }
      },
      exercice: {
        enonce: {
          fr: "Crée une carte dont <code>innerHTML</code> est construit avec un template literal. La carte doit contenir un <code>&lt;h2&gt;</code> affichant le nom de la ville, et deux paragraphes <code>&lt;p&gt;</code> avec des valeurs fictives pour le pays et la météo.",
          en: "Create a card whose <code>innerHTML</code> is built with a template literal. The card must contain an <code>&lt;h2&gt;</code> showing the city name, and two <code>&lt;p&gt;</code> tags with placeholder values for country and weather."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Template literals</title>\n  <style>\n    .carte { border: 2px solid #333; padding: 12px; margin: 8px; border-radius: 6px; display: inline-block; min-width: 150px; }\n    .carte h2 { margin: 0 0 8px; font-size: 1.1rem; }\n    .carte p { margin: 4px 0; color: #555; }\n  </style>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\nconst conteneur = document.querySelector(\"#cartes\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n\n  const carte = document.createElement(\"div\");\n  carte.className = \"carte\";\n\n  // Utilise un template literal pour construire l'HTML de la carte\n  carte.innerHTML = // `...${ville}...`\n\n  conteneur.append(carte);\n  champ.value = \"\";\n});"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Template literals</title>\n  <style>\n    .carte { border: 2px solid #333; padding: 12px; margin: 8px; border-radius: 6px; display: inline-block; min-width: 150px; }\n    .carte h2 { margin: 0 0 8px; font-size: 1.1rem; }\n    .carte p { margin: 4px 0; color: #555; }\n  </style>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\nconst conteneur = document.querySelector(\"#cartes\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n\n  const carte = document.createElement(\"div\");\n  carte.className = \"carte\";\n  carte.innerHTML = `\n    <h2>${ville}</h2>\n    <p>Pays : —</p>\n    <p>Météo : —</p>\n  `;\n\n  conteneur.append(carte);\n  champ.value = \"\";\n});"
        },
        verification: [
          { fichier: "js", contient: "innerHTML", message: { fr: "Utilise .innerHTML pour définir le contenu HTML de la carte.", en: "Use .innerHTML to set the HTML content of the card." } },
          { fichier: "js", contient: "${ville}", message: { fr: "Insère la variable ville dans le template literal avec ${ville}.", en: "Insert the ville variable into the template literal with ${ville}." } },
          { fichier: "js", contient: "<h2>", message: { fr: "La carte doit contenir un <h2> avec le nom de la ville.", en: "The card must contain an <h2> with the city name." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "vraifaux",
          question: {
            fr: "Dans une template literal, <code>${ville}</code> insère la valeur de la variable <code>ville</code>.",
            en: "In a template literal, <code>${ville}</code> inserts the value of the variable <code>ville</code>."
          },
          bonneReponse: true,
          explication: {
            fr: "Vrai. La syntaxe <code>${...}</code> dans un template literal évalue l'expression entre accolades et insère son résultat directement dans la chaîne.",
            en: "True. The <code>${...}</code> syntax inside a template literal evaluates the expression in the braces and inserts its result directly into the string."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Afficher toutes les villes (une boucle)", en: "Displaying all cities (a loop)" },
      besoin: {
        fr: "Quand plusieurs villes sont stockées dans le tableau, il faut créer une carte pour <strong>chacune d'elles</strong> — une boucle permet d'automatiser ce travail.",
        en: "When several cities are stored in the array, we need to create a card for <strong>each one</strong> — a loop automates this work."
      },
      decouverte: {
        fr: "La boucle <code>for...of</code> parcourt chaque élément d'un tableau : <code>for (const ville of villes) { ... }</code>. On peut aussi utiliser <code>villes.forEach(ville =&gt; { ... })</code>. La stratégie recommandée est de <strong>vider</strong> le conteneur (<code>conteneur.innerHTML = \"\"</code>) puis de <strong>recréer toutes les cartes</strong> à chaque ajout.",
        en: "The <code>for...of</code> loop iterates over each element in an array: <code>for (const ville of villes) { ... }</code>. You can also use <code>villes.forEach(ville =&gt; { ... })</code>. The recommended strategy is to <strong>clear</strong> the container (<code>conteneur.innerHTML = \"\"</code>) then <strong>recreate all cards</strong> on each addition."
      },
      explication: {
        fr: "En vidant et recréant toutes les cartes à chaque ajout, on s'assure que l'affichage correspond toujours exactement au contenu du tableau. C'est le principe fondateur des interfaces modernes : le DOM reflète l'état des données, jamais l'inverse. La fonction <code>afficher()</code> regroupe cette logique pour qu'elle soit facilement appelable.",
        en: "By clearing and recreating all cards on each addition, we ensure the display always exactly matches the array's content. This is the founding principle of modern interfaces: the DOM reflects the state of the data, never the other way around. The <code>afficher()</code> function groups this logic so it can be called easily."
      },
      illustration: null,
      exemple: {
        code: "const villes = [];\nconst conteneur = document.querySelector(\"#cartes\");\n\nfunction afficher() {\n  // Vider le conteneur\n  conteneur.innerHTML = \"\";\n\n  // Recréer une carte pour chaque ville\n  for (const ville of villes) {\n    const carte = document.createElement(\"div\");\n    carte.className = \"carte\";\n    carte.innerHTML = `<h2>${ville}</h2><p>Pays : —</p><p>Météo : —</p>`;\n    conteneur.append(carte);\n  }\n}\n\n// Appel après chaque push\nvilles.push(\"Paris\");\nafficher();\nvilles.push(\"Tokyo\");\nafficher();",
        langage: "js",
        commentaire: {
          fr: "On vide d'abord <code>#cartes</code>, puis la boucle <code>for...of</code> recrée une carte pour chaque ville du tableau.",
          en: "We first clear <code>#cartes</code>, then the <code>for...of</code> loop recreates a card for each city in the array."
        }
      },
      exercice: {
        enonce: {
          fr: "Écris une fonction <code>afficher()</code> qui vide <code>#cartes</code> et recrée une carte pour chaque ville du tableau <code>villes</code>. Appelle-la après chaque <code>push</code> dans l'écouteur du formulaire.",
          en: "Write an <code>afficher()</code> function that clears <code>#cartes</code> and recreates a card for each city in the <code>villes</code> array. Call it after each <code>push</code> in the form listener."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord des villes</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #cartes { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }\n    .carte { border: 2px solid #4a6fa5; padding: 16px; border-radius: 8px; min-width: 140px; background: #f0f4ff; }\n    .carte h2 { margin: 0 0 8px; font-size: 1.1rem; color: #1a3a6b; }\n    .carte p { margin: 4px 0; color: #555; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\nconst conteneur = document.querySelector(\"#cartes\");\n\nconst villes = [];\n\n// Écris la fonction afficher() ici\nfunction afficher() {\n  // 1. Vide le conteneur\n\n  // 2. Pour chaque ville du tableau, crée une carte et ajoute-la\n\n}\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n  if (ville === \"\") return;\n  villes.push(ville);\n\n  // Appelle afficher() pour mettre à jour l'écran\n\n  champ.value = \"\";\n});"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tableau de bord des villes</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #cartes { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }\n    .carte { border: 2px solid #4a6fa5; padding: 16px; border-radius: 8px; min-width: 140px; background: #f0f4ff; }\n    .carte h2 { margin: 0 0 8px; font-size: 1.1rem; color: #1a3a6b; }\n    .carte p { margin: 4px 0; color: #555; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\nconst conteneur = document.querySelector(\"#cartes\");\n\nconst villes = [];\n\nfunction afficher() {\n  conteneur.innerHTML = \"\";\n  for (const ville of villes) {\n    const carte = document.createElement(\"div\");\n    carte.className = \"carte\";\n    carte.innerHTML = `\n      <h2>${ville}</h2>\n      <p>Pays : —</p>\n      <p>Météo : —</p>\n    `;\n    conteneur.append(carte);\n  }\n}\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n  if (ville === \"\") return;\n  villes.push(ville);\n  afficher();\n  champ.value = \"\";\n});"
        },
        verification: [
          { fichier: "js", contient: "function afficher()", message: { fr: "Déclare une fonction afficher() pour mettre à jour l'affichage.", en: "Declare an afficher() function to update the display." } },
          { fichier: "js", contient: "conteneur.innerHTML = \"\"", message: { fr: "Dans afficher(), vide le conteneur avec conteneur.innerHTML = \"\".", en: "Inside afficher(), clear the container with conteneur.innerHTML = \"\"." } },
          { fichier: "js", contient: "for (const ville of villes)", message: { fr: "Utilise une boucle for...of pour parcourir le tableau villes.", en: "Use a for...of loop to iterate over the villes array." } }
        ]
      },
      application: {
        fr: "Chaque ville ajoutée produit maintenant une vraie carte sur le tableau de bord, avec des données fictives en attendant. Dans le module suivant, on remplacera ces tirets par de vraies informations récupérées depuis une API (pays, météo en temps réel) ! <br><br>👉 <strong>Dans Notepad++ :</strong> ouvre <code>script.js</code> de ton dossier <code>projet-eleve/</code>, reporte-y ce que tu viens de pratiquer, enregistre (Ctrl+S), puis rafraîchis <code>index.html</code> dans le navigateur. Ton projet doit maintenant créer une carte par ville ajoutée.",
        en: "Each added city now produces a real card on the dashboard, with placeholder data for now. In the next module, we will replace those dashes with real information fetched from an API (country, live weather data)! <br><br>👉 <strong>In Notepad++:</strong> open <code>script.js</code> from your <code>projet-eleve/</code> folder, transfer what you just practised, save (Ctrl+S), then refresh <code>index.html</code> in the browser. Your project should now create a card for each city added."
      },
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Pourquoi utilise-t-on une boucle ici ?",
            en: "Why do we use a loop here?"
          },
          options: [
            { fr: "Pour répéter le formulaire plusieurs fois", en: "To repeat the form multiple times" },
            { fr: "Pour créer une carte pour CHAQUE ville du tableau", en: "To create a card for EACH city in the array" },
            { fr: "Pour vider le conteneur <code>#cartes</code>", en: "To clear the <code>#cartes</code> container" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "La boucle parcourt chaque ville du tableau et crée une carte pour elle. Sans boucle, il faudrait écrire manuellement autant de lignes qu'il y a de villes — impossible si le nombre varie.",
            en: "The loop iterates over each city in the array and creates a card for it. Without a loop, we would have to manually write as many lines as there are cities — impossible when the count varies."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
