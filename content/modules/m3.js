export const m3 = {
  titre: { fr: "Réagir aux actions — événements & JS", en: "Reacting — events & JS" },
  etapes: [
    {
      titre: { fr: "Variables et fonctions", en: "Variables and functions" },
      besoin: {
        fr: "Avant de manipuler la page, il faut savoir stocker des valeurs et regrouper des instructions dans des fonctions réutilisables.",
        en: "Before manipulating the page, we need to know how to store values and group instructions into reusable functions."
      },
      decouverte: {
        fr: "<code>const</code> déclare une variable dont la valeur <strong>ne changera pas</strong>. <code>let</code> déclare une variable qu'on pourra <strong>modifier</strong> plus tard. Une <code>function</code> est un bloc de code qu'on nomme pour pouvoir le réutiliser.",
        en: "<code>const</code> declares a variable whose value <strong>will not change</strong>. <code>let</code> declares a variable that can be <strong>reassigned</strong> later. A <code>function</code> is a named block of code you can reuse."
      },
      explication: {
        fr: "Préfère <code>const</code> par défaut — cela rend le code plus lisible en signalant clairement ce qui ne change pas. N'utilise <code>let</code> que quand tu sais que la valeur va évoluer (un compteur, par exemple). Une fonction peut recevoir des <strong>paramètres</strong> (des valeurs en entrée) et retourner un résultat avec <code>return</code>.",
        en: "Prefer <code>const</code> by default — it makes code more readable by clearly signalling what won't change. Only use <code>let</code> when you know the value will evolve (a counter, for instance). A function can receive <strong>parameters</strong> (input values) and return a result with <code>return</code>."
      },
      illustration: null,
      exemple: {
        code: "const prenom = \"Alice\";\nlet age = 16;\n\nfunction direBonjour(nom) {\n  return \"Bonjour, \" + nom + \" !\";\n}\n\nconsole.log(direBonjour(prenom)); // Bonjour, Alice !",
        langage: "js",
        commentaire: {
          fr: "<code>const</code> pour une valeur fixe, <code>let</code> pour une valeur modifiable, <code>function</code> pour nommer un bloc réutilisable.",
          en: "<code>const</code> for a fixed value, <code>let</code> for a mutable one, <code>function</code> to name a reusable block."
        }
      },
      exercice: {
        enonce: {
          fr: "Complète la fonction <code>direBonjour(nom)</code> dans le fichier JS pour qu'elle retourne (et affiche dans la console) le message <em>\"Bonjour, [nom] !\"</em>. Appelle-la avec le nom de ton choix.",
          en: "Complete the <code>direBonjour(nom)</code> function in the JS file so it returns (and logs) the message <em>\"Bonjour, [nom] !\"</em>. Call it with a name of your choice."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Variables & fonctions</title>\n</head>\n<body>\n  <h1>Ouvre la console pour voir le résultat !</h1>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// 1. Déclare une constante 'prenom' avec ton prénom\nconst prenom = \"Marie\";\n\n// 2. Complète la fonction\nfunction direBonjour(nom) {\n  // retourne \"Bonjour, [nom] !\"\n}\n\n// 3. Appelle la fonction et affiche le résultat\nconsole.log(direBonjour(prenom));"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Variables & fonctions</title>\n</head>\n<body>\n  <h1>Ouvre la console pour voir le résultat !</h1>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const prenom = \"Marie\";\n\nfunction direBonjour(nom) {\n  return \"Bonjour, \" + nom + \" !\";\n}\n\nconsole.log(direBonjour(prenom)); // Bonjour, Marie !"
        },
        verification: [
          { fichier: "js", contient: "return", message: { fr: "La fonction direBonjour doit utiliser return pour retourner le message.", en: "The direBonjour function must use return to return the message." } },
          { fichier: "js", contient: "Bonjour, ", message: { fr: "Le message retourné doit commencer par \"Bonjour, \".", en: "The returned message must start with \"Bonjour, \"." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Quelle est la différence entre <code>const</code> et <code>let</code> ?",
            en: "What is the difference between <code>const</code> and <code>let</code>?"
          },
          options: [
            { fr: "<code>const</code> est pour les nombres, <code>let</code> pour les textes", en: "<code>const</code> is for numbers, <code>let</code> for strings" },
            { fr: "<code>const</code> ne peut pas être réassigné, <code>let</code> oui", en: "<code>const</code> cannot be reassigned, <code>let</code> can" },
            { fr: "Il n'y a aucune différence, les deux sont identiques", en: "There is no difference, they are identical" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "<code>const</code> fige la variable : toute tentative de réassignation provoque une erreur. <code>let</code> autorise les modifications, utile pour les compteurs ou les valeurs qui évoluent.",
            en: "<code>const</code> freezes the variable: any attempt to reassign it causes an error. <code>let</code> allows modifications, useful for counters or values that change."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Trouver un élément de la page", en: "Finding a page element" },
      besoin: {
        fr: "Pour que le JavaScript puisse modifier ou lire un élément HTML, il doit d'abord le <strong>trouver</strong> dans la page.",
        en: "For JavaScript to modify or read an HTML element, it must first <strong>find</strong> it on the page."
      },
      decouverte: {
        fr: "<code>document.querySelector(\"sélecteur CSS\")</code> renvoie le <strong>premier élément</strong> qui correspond au sélecteur. On peut utiliser n'importe quel sélecteur CSS : <code>#monId</code>, <code>.maClasse</code>, <code>button</code>…",
        en: "<code>document.querySelector(\"CSS selector\")</code> returns the <strong>first element</strong> matching the selector. Any CSS selector works: <code>#myId</code>, <code>.myClass</code>, <code>button</code>…"
      },
      explication: {
        fr: "Le résultat est un <strong>objet JavaScript</strong> qui représente l'élément HTML. Si aucun élément ne correspond, la méthode retourne <code>null</code>. On stocke généralement le résultat dans une <code>const</code> pour le réutiliser facilement.",
        en: "The result is a <strong>JavaScript object</strong> representing the HTML element. If no element matches, the method returns <code>null</code>. We usually store the result in a <code>const</code> to reuse it easily."
      },
      illustration: "dom-tree",
      exemple: {
        code: "// Sélectionner par id\nconst champVille = document.querySelector(\"#champ-ville\");\n\n// Sélectionner par balise\nconst bouton = document.querySelector(\"button\");\n\nconsole.log(champVille); // <input id=\"champ-ville\" …>\nconsole.log(bouton);     // <button …>Ajouter</button>",
        langage: "js",
        commentaire: {
          fr: "<code>#champ-ville</code> cible l'élément avec cet id ; <code>button</code> cible le premier bouton de la page.",
          en: "<code>#champ-ville</code> targets the element with that id; <code>button</code> targets the first button on the page."
        }
      },
      exercice: {
        enonce: {
          fr: "À partir du HTML fourni, sélectionne le bouton (avec le sélecteur <code>#form-ville button</code>) et le champ texte (avec <code>#champ-ville</code>) avec <code>querySelector</code>, puis affiche-les dans la console.",
          en: "Using the provided HTML, select the button (with the selector <code>#form-ville button</code>) and the text field (with <code>#champ-ville</code>) with <code>querySelector</code>, then log them to the console."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Sélectionner des éléments</title>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// Sélectionne le bouton avec '#form-ville button'\nconst bouton = // ...\n\n// Sélectionne le champ texte par son id 'champ-ville'\nconst champ = // ...\n\n// Affiche-les dans la console\nconsole.log(bouton);\nconsole.log(champ);"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Sélectionner des éléments</title>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const bouton = document.querySelector(\"#form-ville button\");\nconst champ = document.querySelector(\"#champ-ville\");\n\nconsole.log(bouton);\nconsole.log(champ);"
        },
        verification: [
          { fichier: "js", contient: "querySelector", message: { fr: "Utilise document.querySelector() pour sélectionner les éléments.", en: "Use document.querySelector() to select elements." } },
          { fichier: "js", contient: "#form-ville button", message: { fr: "Sélectionne le bouton avec le sélecteur \"#form-ville button\".", en: "Select the button with the selector \"#form-ville button\"." } },
          { fichier: "js", contient: "#champ-ville", message: { fr: "Sélectionne le champ texte avec le sélecteur \"#champ-ville\".", en: "Select the text field with the selector \"#champ-ville\"." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quelle méthode permet de sélectionner un élément par son sélecteur CSS ?",
            en: "Which method selects an element by its CSS selector?"
          },
          bonneReponse: "querySelector",
          explication: {
            fr: "<code>document.querySelector(\"sélecteur\")</code> renvoie le premier élément correspondant dans la page.",
            en: "<code>document.querySelector(\"selector\")</code> returns the first matching element on the page."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Réagir au clic", en: "Reacting to a click" },
      besoin: {
        fr: "La page doit faire quelque chose quand l'utilisateur clique sur le bouton ou soumet le formulaire — c'est le rôle des <strong>événements</strong>.",
        en: "The page must do something when the user clicks the button or submits the form — that is the role of <strong>events</strong>."
      },
      decouverte: {
        fr: "<code>element.addEventListener(\"type\", fonction)</code> écoute un événement et appelle la fonction à chaque déclenchement. Les types les plus courants sont <code>\"click\"</code> (clic sur un élément) et <code>\"submit\"</code> (soumission d'un formulaire). La fonction reçoit un objet <code>event</code> qui décrit ce qui s'est passé.",
        en: "<code>element.addEventListener(\"type\", function)</code> listens for an event and calls the function each time it fires. The most common types are <code>\"click\"</code> (click on an element) and <code>\"submit\"</code> (form submission). The function receives an <code>event</code> object describing what happened."
      },
      explication: {
        fr: "Quand on écoute <code>\"submit\"</code> sur un formulaire, le navigateur recharge la page par défaut. Pour l'éviter, on appelle <code>event.preventDefault()</code> au début de la fonction — cela annule le comportement natif et laisse notre JavaScript prendre le relais.",
        en: "When listening to <code>\"submit\"</code> on a form, the browser reloads the page by default. To prevent this, we call <code>event.preventDefault()</code> at the start of the function — it cancels the native behavior and lets our JavaScript take over."
      },
      illustration: null,
      exemple: {
        code: "const formulaire = document.querySelector(\"#form-ville\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault(); // empêche le rechargement\n  console.log(\"Formulaire soumis !\");\n});",
        langage: "js",
        commentaire: {
          fr: "<code>addEventListener</code> sur le formulaire avec le type <code>\"submit\"</code> ; <code>preventDefault()</code> bloque le rechargement de la page.",
          en: "<code>addEventListener</code> on the form with type <code>\"submit\"</code>; <code>preventDefault()</code> blocks the page reload."
        }
      },
      exercice: {
        enonce: {
          fr: "Ajoute un écouteur d'événement <code>\"submit\"</code> sur le formulaire. Dans la fonction, appelle <code>event.preventDefault()</code> puis affiche <code>\"Bouton cliqué !\"</code> dans la console.",
          en: "Add a <code>\"submit\"</code> event listener on the form. Inside the function, call <code>event.preventDefault()</code> then log <code>\"Bouton cliqué !\"</code> to the console."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Événements</title>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\n\n// Ajoute un écouteur 'submit' sur le formulaire\nformulaire.addEventListener(\"submit\", function(event) {\n  // 1. Empêche le rechargement de la page\n\n  // 2. Affiche \"Bouton cliqué !\" dans la console\n\n});"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Événements</title>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  console.log(\"Bouton cliqué !\");\n});"
        },
        verification: [
          { fichier: "js", contient: "addEventListener", message: { fr: "Utilise addEventListener pour écouter les événements.", en: "Use addEventListener to listen for events." } },
          { fichier: "js", contient: "\"submit\"", message: { fr: "Écoute l'événement \"submit\" sur le formulaire.", en: "Listen for the \"submit\" event on the form." } },
          { fichier: "js", contient: "event.preventDefault()", message: { fr: "Appelle event.preventDefault() pour empêcher le rechargement.", en: "Call event.preventDefault() to prevent the page reload." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "À quoi sert <code>event.preventDefault()</code> dans un formulaire ?",
            en: "What does <code>event.preventDefault()</code> do in a form?"
          },
          options: [
            { fr: "Supprimer le formulaire de la page", en: "Remove the form from the page" },
            { fr: "Empêcher la page de se recharger", en: "Prevent the page from reloading" },
            { fr: "Envoyer les données au serveur", en: "Send data to the server" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "Par défaut, soumettre un formulaire recharge la page. <code>event.preventDefault()</code> annule ce comportement natif pour que notre JavaScript puisse gérer les données à la place.",
            en: "By default, submitting a form reloads the page. <code>event.preventDefault()</code> cancels that native behavior so our JavaScript can handle the data instead."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Lire ce que l'utilisateur a tapé", en: "Reading what the user typed" },
      besoin: {
        fr: "L'utilisateur tape un nom de ville dans le champ — il faut maintenant récupérer ce texte en JavaScript pour s'en servir.",
        en: "The user types a city name in the field — we now need to retrieve that text in JavaScript to use it."
      },
      decouverte: {
        fr: "Chaque <code>&lt;input&gt;</code> possède une propriété <code>value</code> qui contient le texte actuellement saisi. On y accède simplement avec <code>monInput.value</code> — pas besoin d'une méthode, c'est une propriété directe.",
        en: "Every <code>&lt;input&gt;</code> has a <code>value</code> property containing the currently typed text. We access it with <code>myInput.value</code> — no method needed, it's a direct property."
      },
      explication: {
        fr: "On lit <code>champ.value</code> <em>à l'intérieur</em> de l'écouteur d'événement, au moment où l'utilisateur soumet le formulaire, pour avoir la valeur la plus récente. Si le champ est vide, <code>value</code> vaut une chaîne vide <code>\"\"</code>.",
        en: "We read <code>champ.value</code> <em>inside</em> the event listener, at the moment the user submits the form, to get the most recent value. If the field is empty, <code>value</code> is an empty string <code>\"\"</code>."
      },
      illustration: null,
      exemple: {
        code: "const champ = document.querySelector(\"#champ-ville\");\nconst formulaire = document.querySelector(\"#form-ville\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n  console.log(\"Ville :\", ville);\n});",
        langage: "js",
        commentaire: {
          fr: "<code>champ.value</code> lit le texte tapé par l'utilisateur au moment de la soumission.",
          en: "<code>champ.value</code> reads the text typed by the user at the moment of submission."
        }
      },
      exercice: {
        enonce: {
          fr: "Dans l'écouteur <code>submit</code> du formulaire, lis la valeur du champ <code>#champ-ville</code> et affiche <code>\"Ville : [valeur saisie]\"</code> dans la console.",
          en: "Inside the form's <code>submit</code> listener, read the value of the <code>#champ-ville</code> field and log <code>\"Ville : [typed value]\"</code> to the console."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Lire la valeur</title>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n\n  // Lis la valeur du champ et stocke-la dans 'ville'\n  const ville = // ...\n\n  // Affiche \"Ville : \" suivi du nom tapé\n  console.log(\"Ville :\", ville);\n});"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Lire la valeur</title>\n</head>\n<body>\n  <form id=\"form-ville\">\n    <input type=\"text\" id=\"champ-ville\" placeholder=\"Entrez une ville…\">\n    <button type=\"submit\">Ajouter</button>\n  </form>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n  console.log(\"Ville :\", ville);\n});"
        },
        verification: [
          { fichier: "js", contient: "champ.value", message: { fr: "Lis la propriété .value du champ pour obtenir le texte saisi.", en: "Read the .value property of the field to get the typed text." } },
          { fichier: "js", contient: "addEventListener", message: { fr: "N'oublie pas d'utiliser addEventListener pour écouter le submit.", en: "Don't forget to use addEventListener to listen for submit." } }
        ]
      },
      application: {
        fr: "Le bouton \"Ajouter\" de ton projet lit maintenant le nom de ville saisi et l'affiche dans la console. Dans le module suivant, on utilisera cette valeur pour créer une vraie carte sur le tableau de bord ! <br><br>👉 <strong>Dans Notepad++ :</strong> ouvre <code>script.js</code> de ton dossier <code>projet-eleve/</code>, reporte-y ce que tu viens de pratiquer, enregistre (Ctrl+S), puis rafraîchis <code>index.html</code> dans le navigateur. Ton projet doit maintenant réagir au clic et lire la ville saisie (console).",
        en: "Your project's \"Ajouter\" button now reads the typed city name and logs it to the console. In the next module, we'll use that value to create a real card on the dashboard! <br><br>👉 <strong>In Notepad++:</strong> open <code>script.js</code> from your <code>projet-eleve/</code> folder, transfer what you just practised, save (Ctrl+S), then refresh <code>index.html</code> in the browser. Your project should now react to a click and read the typed city (console)."
      },
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quelle propriété donne le texte saisi dans un <code>&lt;input&gt;</code> ?",
            en: "Which property gives the text typed in an <code>&lt;input&gt;</code>?"
          },
          bonneReponse: "value",
          explication: {
            fr: "<code>input.value</code> contient le texte actuellement tapé dans le champ. C'est une propriété, pas une méthode — pas besoin de parenthèses.",
            en: "<code>input.value</code> holds the text currently typed in the field. It's a property, not a method — no parentheses needed."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
