export const m7 = {
  titre: { fr: "Finitions — heure locale & persistance", en: "Finishing touches — local time & persistence" },
  etapes: [
    // ─── Étape 1 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Afficher l'heure locale", en: "Displaying the local time" },
      rappel: { fr: "Ton application fonctionne ! Ici tu ajoutes les <strong>finitions</strong> : heure locale, sauvegarde des villes, mode sombre et petites animations.",
                en: "Your app works! Here you add the <strong>finishing touches</strong>: local time, saving cities, dark mode and small animations." },
      besoin: {
        fr: "Chaque ville a son propre fuseau horaire. Afficher l'heure de Paris à Tokyo n'a aucun sens ! L'API de géocodage nous donne un champ <code>timezone</code> (ex : <code>\"Europe/Paris\"</code>) — utilisons-le pour afficher l'<strong>heure locale exacte</strong> de chaque ville.",
        en: "Every city has its own timezone. Showing Paris time in Tokyo makes no sense! The geocoding API gives us a <code>timezone</code> field (e.g. <code>\"Europe/Paris\"</code>) — let's use it to display the <strong>exact local time</strong> for each city."
      },
      decouverte: {
        fr: "JavaScript intègre <code>Intl.DateTimeFormat</code>, un outil puissant pour <strong>formater les dates et heures</strong> selon n'importe quel fuseau horaire et locale. On lui passe la locale (<code>\"fr-FR\"</code>), des options de format (<code>hour</code>, <code>minute</code>) et surtout l'option <code>timeZone</code> avec le nom du fuseau (ex : <code>\"Asia/Tokyo\"</code>). Ensuite, <code>.format(new Date())</code> retourne l'heure locale actuelle sous forme de chaîne prête à afficher.",
        en: "JavaScript includes <code>Intl.DateTimeFormat</code>, a powerful tool for <strong>formatting dates and times</strong> according to any timezone and locale. We pass it the locale (<code>\"fr-FR\"</code>), format options (<code>hour</code>, <code>minute</code>), and most importantly the <code>timeZone</code> option with the zone name (e.g. <code>\"Asia/Tokyo\"</code>). Then <code>.format(new Date())</code> returns the current local time as a ready-to-display string."
      },
      explication: {
        fr: "La syntaxe complète est : <code>new Intl.DateTimeFormat(\"fr-FR\", { hour: \"2-digit\", minute: \"2-digit\", timeZone: tz }).format(new Date())</code>. Le paramètre <code>tz</code> est la chaîne de fuseau horaire reçue du géocodage, par exemple <code>\"America/New_York\"</code>. Le résultat est une chaîne du type <code>\"14:05\"</code> — l'heure qu'il est en ce moment dans cette ville, affichée à deux chiffres.",
        en: "The full syntax is: <code>new Intl.DateTimeFormat(\"fr-FR\", { hour: \"2-digit\", minute: \"2-digit\", timeZone: tz }).format(new Date())</code>. The <code>tz</code> parameter is the timezone string received from geocoding, for example <code>\"America/New_York\"</code>. The result is a string like <code>\"14:05\"</code> — the current time in that city, displayed with two digits."
      },
      illustration: null,
      exemple: {
        code: "// Le timezone vient de l'API de géocodage : geo.results[0].timezone\nconst tz = \"Asia/Tokyo\"; // ex : \"Europe/Paris\", \"America/New_York\"\n\n// Formater l'heure locale avec Intl.DateTimeFormat\nconst heureLocale = new Intl.DateTimeFormat(\"fr-FR\", {\n  hour: \"2-digit\",\n  minute: \"2-digit\",\n  timeZone: tz\n}).format(new Date());\n\nconsole.log(\"Il est\", heureLocale, \"à Tokyo\");\n// → \"Il est 22:37 à Tokyo\"  (selon l'heure actuelle)\n\n// Dans la carte de la ville :\nconst carte = document.querySelector(\"#carte-tokyo\");\ncarte.querySelector(\".heure\").textContent = heureLocale;",
        langage: "js",
        commentaire: {
          fr: "<code>new Date()</code> donne l'instant présent. <code>Intl.DateTimeFormat</code> se charge de le convertir dans le bon fuseau avant d'afficher — pas besoin de calcul manuel.",
          en: "<code>new Date()</code> gives the current instant. <code>Intl.DateTimeFormat</code> handles converting it to the correct timezone before displaying — no manual calculation needed."
        }
      },
      exercice: {
        enonce: {
          fr: "On te donne un fuseau horaire sous forme de chaîne. Utilise <code>Intl.DateTimeFormat</code> pour afficher l'heure locale actuelle dans la div <code>#heure</code>. Teste avec plusieurs fuseaux : <code>\"Pacific/Auckland\"</code>, <code>\"America/Los_Angeles\"</code>, <code>\"Asia/Kolkata\"</code>.",
          en: "You are given a timezone string. Use <code>Intl.DateTimeFormat</code> to display the current local time in the <code>#heure</code> div. Test with several timezones: <code>\"Pacific/Auckland\"</code>, <code>\"America/Los_Angeles\"</code>, <code>\"Asia/Kolkata\"</code>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Heure locale</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #heure { font-size: 2rem; font-weight: bold; margin-top: 12px; color: #2563eb; }\n  </style>\n</head>\n<body>\n  <h2>Heure locale</h2>\n  <p>Fuseau : <code id=\"tz-affiche\"></code></p>\n  <div id=\"heure\">--:--</div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// Remplace ce fuseau pour tester différentes villes\nconst tz = \"Pacific/Auckland\";\n\ndocument.querySelector(\"#tz-affiche\").textContent = tz;\n\n// Utilise Intl.DateTimeFormat pour obtenir l'heure locale\nconst heureLocale = /* ... */;\n\ndocument.querySelector(\"#heure\").textContent = heureLocale;"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Heure locale</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #heure { font-size: 2rem; font-weight: bold; margin-top: 12px; color: #2563eb; }\n  </style>\n</head>\n<body>\n  <h2>Heure locale</h2>\n  <p>Fuseau : <code id=\"tz-affiche\"></code></p>\n  <div id=\"heure\">--:--</div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const tz = \"Pacific/Auckland\";\n\ndocument.querySelector(\"#tz-affiche\").textContent = tz;\n\nconst heureLocale = new Intl.DateTimeFormat(\"fr-FR\", {\n  hour: \"2-digit\",\n  minute: \"2-digit\",\n  timeZone: tz\n}).format(new Date());\n\ndocument.querySelector(\"#heure\").textContent = heureLocale;"
        },
        verification: [
          { fichier: "js", contient: "Intl.DateTimeFormat", message: { fr: "Utilise Intl.DateTimeFormat pour formater l'heure locale.", en: "Use Intl.DateTimeFormat to format the local time." } },
          { fichier: "js", contient: "timeZone: tz", message: { fr: "Passe l'option timeZone: tz à Intl.DateTimeFormat.", en: "Pass the option timeZone: tz to Intl.DateTimeFormat." } },
          { fichier: "js", contient: "format(new Date())", message: { fr: "Appelle .format(new Date()) pour obtenir l'heure actuelle.", en: "Call .format(new Date()) to get the current time." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quel objet JavaScript permet de formater une date/heure selon un fuseau horaire ?",
            en: "Which JavaScript object allows formatting a date/time according to a timezone?"
          },
          bonneReponse: "Intl.DateTimeFormat",
          explication: {
            fr: "<code>Intl.DateTimeFormat</code> (ou <code>Intl</code>) est l'objet natif de JavaScript pour formater dates et heures selon une locale et un fuseau horaire. Il fait partie de l'API d'internationalisation <code>Intl</code> intégrée aux navigateurs modernes.",
            en: "<code>Intl.DateTimeFormat</code> (or <code>Intl</code>) is JavaScript's native object for formatting dates and times according to a locale and timezone. It is part of the <code>Intl</code> internationalisation API built into modern browsers."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },

    // ─── Étape 2 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Sauvegarder les villes (localStorage)", en: "Saving cities (localStorage)" },
      besoin: {
        fr: "Pour l'instant, si l'utilisateur recharge la page, toutes ses villes disparaissent. Ce n'est pas pratique ! <code>localStorage</code> permet de <strong>conserver des données dans le navigateur</strong> — elles survivent au rechargement et même à la fermeture de l'onglet.",
        en: "Right now, if the user reloads the page, all their cities disappear. That's not great! <code>localStorage</code> lets us <strong>keep data in the browser</strong> — it survives page reloads and even closing the tab."
      },
      decouverte: {
        fr: "<code>localStorage</code> fonctionne comme un mini dictionnaire persistant dans le navigateur : on <strong>sauvegarde</strong> avec <code>setItem(clé, valeur)</code> et on <strong>relit</strong> avec <code>getItem(clé)</code>. Comme il ne stocke que des chaînes de texte, on convertit le tableau <code>villes</code> en JSON avec <code>JSON.stringify</code> à l'écriture, et on le reconvertit en tableau avec <code>JSON.parse</code> à la lecture.",
        en: "<code>localStorage</code> works like a small persistent dictionary in the browser: we <strong>save</strong> with <code>setItem(key, value)</code> and <strong>read back</strong> with <code>getItem(key)</code>. Because it only stores text strings, we convert the <code>villes</code> array to JSON with <code>JSON.stringify</code> when writing, and back to an array with <code>JSON.parse</code> when reading."
      },
      explication: {
        fr: "Pour sauvegarder : <code>localStorage.setItem(\"villes\", JSON.stringify(villes))</code>. Pour charger au démarrage : <code>JSON.parse(localStorage.getItem(\"villes\") || \"[]\")</code>. Le <code>|| \"[]\"</code> garantit qu'on obtient un tableau vide si rien n'a encore été sauvegardé (premier lancement). Il faut appeler <code>setItem</code> à chaque modification du tableau — après un ajout ou une suppression.",
        en: "To save: <code>localStorage.setItem(\"villes\", JSON.stringify(villes))</code>. To load at startup: <code>JSON.parse(localStorage.getItem(\"villes\") || \"[]\")</code>. The <code>|| \"[]\"</code> ensures we get an empty array if nothing has been saved yet (first launch). We must call <code>setItem</code> on every change to the array — after adding or removing a city."
      },
      illustration: null,
      exemple: {
        code: "// Charger les villes sauvegardées au démarrage\nlet villes = JSON.parse(localStorage.getItem(\"villes\") || \"[]\");\n\n// Afficher les cartes existantes\nafficherTout();\n\nfunction ajouterVille(infos) {\n  villes.push(infos);                              // ajoute au tableau\n  localStorage.setItem(\"villes\", JSON.stringify(villes)); // sauvegarde\n  afficherTout();                                  // rafraîchit l'affichage\n}\n\n// Tester dans la console :\nconsole.log(\"Villes sauvegardées :\", villes.length);\n// Recharge la page → les villes sont toujours là !",
        langage: "js",
        commentaire: {
          fr: "On lit <code>localStorage</code> une seule fois au démarrage, et on écrit après chaque modification. Le <code>|| \"[]\"</code> évite une erreur si <code>getItem</code> retourne <code>null</code> (première visite).",
          en: "We read <code>localStorage</code> once at startup, and write after every change. The <code>|| \"[]\"</code> avoids an error if <code>getItem</code> returns <code>null</code> (first visit)."
        }
      },
      exercice: {
        enonce: {
          fr: "Au chargement de la page, lis les villes depuis <code>localStorage</code> et affiche-les. Quand on ajoute une ville, sauvegarde le tableau mis à jour dans <code>localStorage</code>. Vérifie en rechargant la page que les villes persistent.",
          en: "When the page loads, read the cities from <code>localStorage</code> and display them. When a city is added, save the updated array to <code>localStorage</code>. Verify by reloading the page that the cities persist."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>localStorage</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    input { padding: 6px; margin-right: 6px; }\n    button { padding: 6px 12px; cursor: pointer; }\n    .carte { background: #f0f4ff; border-radius: 8px; padding: 10px; margin: 6px 0; }\n  </style>\n</head>\n<body>\n  <h2>Tableau de bord — avec persistance</h2>\n  <input id=\"ville\" type=\"text\" placeholder=\"Nom de la ville\">\n  <button onclick=\"ajouter()\">Ajouter</button>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// 1. Charge les villes depuis localStorage (ou tableau vide)\nlet villes = /* JSON.parse(localStorage.getItem(...) || \"[]\") */;\n\n// Affiche les cartes au démarrage\nafficherTout();\n\nfunction ajouter() {\n  const nom = document.querySelector(\"#ville\").value.trim();\n  if (!nom) return;\n  villes.push({ nom });\n  // 2. Sauvegarde dans localStorage\n  /* localStorage.setItem(\"villes\", JSON.stringify(villes)); */\n  afficherTout();\n}\n\nfunction afficherTout() {\n  const conteneur = document.querySelector(\"#cartes\");\n  conteneur.innerHTML = \"\";\n  villes.forEach(function(v) {\n    const div = document.createElement(\"div\");\n    div.className = \"carte\";\n    div.textContent = v.nom;\n    conteneur.appendChild(div);\n  });\n}"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>localStorage</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    input { padding: 6px; margin-right: 6px; }\n    button { padding: 6px 12px; cursor: pointer; }\n    .carte { background: #f0f4ff; border-radius: 8px; padding: 10px; margin: 6px 0; }\n  </style>\n</head>\n<body>\n  <h2>Tableau de bord — avec persistance</h2>\n  <input id=\"ville\" type=\"text\" placeholder=\"Nom de la ville\">\n  <button onclick=\"ajouter()\">Ajouter</button>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "let villes = JSON.parse(localStorage.getItem(\"villes\") || \"[]\");\n\nafficherTout();\n\nfunction ajouter() {\n  const nom = document.querySelector(\"#ville\").value.trim();\n  if (!nom) return;\n  villes.push({ nom });\n  localStorage.setItem(\"villes\", JSON.stringify(villes));\n  afficherTout();\n}\n\nfunction afficherTout() {\n  const conteneur = document.querySelector(\"#cartes\");\n  conteneur.innerHTML = \"\";\n  villes.forEach(function(v) {\n    const div = document.createElement(\"div\");\n    div.className = \"carte\";\n    div.textContent = v.nom;\n    conteneur.appendChild(div);\n  });\n}"
        },
        verification: [
          { fichier: "js", contient: "localStorage.getItem(\"villes\")", message: { fr: "Charge les villes avec localStorage.getItem(\"villes\").", en: "Load the cities with localStorage.getItem(\"villes\")." } },
          { fichier: "js", contient: "localStorage.setItem(\"villes\",", message: { fr: "Sauvegarde avec localStorage.setItem(\"villes\", ...) après chaque ajout.", en: "Save with localStorage.setItem(\"villes\", ...) after each addition." } },
          { fichier: "js", contient: "JSON.stringify(villes)", message: { fr: "Convertis le tableau en JSON avec JSON.stringify(villes) avant de sauvegarder.", en: "Convert the array to JSON with JSON.stringify(villes) before saving." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "À quoi sert <code>localStorage</code> ?",
            en: "What is <code>localStorage</code> used for?"
          },
          options: [
            { fr: "À stocker des fichiers sur le serveur web", en: "To store files on the web server" },
            { fr: "À conserver des données dans le navigateur même après rechargement", en: "To keep data in the browser even after reloading" },
            { fr: "À envoyer des données à une API externe", en: "To send data to an external API" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "<code>localStorage</code> stocke des données côté client, dans le navigateur. Contrairement aux variables JavaScript, ces données persistent entre les rechargements de page et même après fermeture de l'onglet. Elles restent accessibles jusqu'à ce qu'on les efface explicitement.",
            en: "<code>localStorage</code> stores data on the client side, in the browser. Unlike JavaScript variables, this data persists across page reloads and even after closing the tab. It stays accessible until explicitly cleared."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },

    // ─── Étape 3 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Supprimer une ville", en: "Deleting a city" },
      besoin: {
        fr: "L'utilisateur doit pouvoir retirer une ville du tableau de bord. Il faut ajouter un bouton de suppression sur chaque carte, et quand il est cliqué, <strong>retirer la ville du tableau</strong> et <strong>mettre à jour l'affichage</strong> — ainsi que le <code>localStorage</code>.",
        en: "The user must be able to remove a city from the dashboard. We need to add a delete button on each card, and when it is clicked, <strong>remove the city from the array</strong> and <strong>update the display</strong> — as well as <code>localStorage</code>."
      },
      decouverte: {
        fr: "Deux approches classiques pour retirer un élément d'un tableau : <code>villes.splice(i, 1)</code> modifie le tableau en place en retirant l'élément à l'index <code>i</code>. <code>villes.filter(function(v, j) { return j !== i; })</code> crée un <strong>nouveau tableau</strong> sans l'élément à l'index <code>i</code>. Les deux fonctionnent ; <code>filter</code> est considéré comme plus moderne et prévisible car il ne modifie pas le tableau original.",
        en: "Two classic approaches for removing an element from an array: <code>villes.splice(i, 1)</code> modifies the array in place by removing the element at index <code>i</code>. <code>villes.filter(function(v, j) { return j !== i; })</code> creates a <strong>new array</strong> without the element at index <code>i</code>. Both work; <code>filter</code> is considered more modern and predictable because it does not modify the original array."
      },
      explication: {
        fr: "Lors de la création de chaque carte, on ajoute un bouton ✕ et on lui attache un gestionnaire d'événement qui connaît l'index <code>i</code> de la ville. Au clic, on filtre le tableau <code>villes</code> pour exclure cet index, on sauvegarde dans <code>localStorage</code>, puis on rappelle <code>afficherTout()</code> pour régénérer toutes les cartes. L'index est capturé dans la fermeture (<em>closure</em>) de la fonction.",
        en: "When building each card, we add a ✕ button and attach an event handler that knows the city's index <code>i</code>. On click, we filter the <code>villes</code> array to exclude that index, save to <code>localStorage</code>, then call <code>afficherTout()</code> again to regenerate all cards. The index is captured in the function's closure."
      },
      illustration: null,
      exemple: {
        code: "function afficherTout() {\n  const conteneur = document.querySelector(\"#cartes\");\n  conteneur.innerHTML = \"\";\n\n  villes.forEach(function(v, i) {\n    const carte = document.createElement(\"div\");\n    carte.className = \"carte\";\n    carte.textContent = v.nom;\n\n    // Bouton de suppression\n    const btn = document.createElement(\"button\");\n    btn.textContent = \"✕\";\n    btn.addEventListener(\"click\", function() {\n      // Crée un nouveau tableau sans la ville à l'index i\n      villes = villes.filter(function(_, j) { return j !== i; });\n      localStorage.setItem(\"villes\", JSON.stringify(villes));\n      afficherTout(); // réaffiche tout\n    });\n\n    carte.appendChild(btn);\n    conteneur.appendChild(carte);\n  });\n}",
        langage: "js",
        commentaire: {
          fr: "<code>filter</code> avec <code>j !== i</code> garde toutes les villes <em>sauf</em> celle à l'index <code>i</code>. On réaffecte <code>villes</code> avec le nouveau tableau et on resauvegarde.",
          en: "<code>filter</code> with <code>j !== i</code> keeps all cities <em>except</em> the one at index <code>i</code>. We reassign <code>villes</code> with the new array and save again."
        }
      },
      exercice: {
        enonce: {
          fr: "Ajoute un bouton ✕ sur chaque carte de ville. Quand on clique dessus, la ville est retirée du tableau <code>villes</code>, <code>localStorage</code> est mis à jour et les cartes sont réaffichées. Utilise <code>filter</code> pour créer le nouveau tableau.",
          en: "Add a ✕ button on each city card. When clicked, the city is removed from the <code>villes</code> array, <code>localStorage</code> is updated, and the cards are re-rendered. Use <code>filter</code> to build the new array."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Supprimer une ville</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    input { padding: 6px; margin-right: 6px; }\n    .carte { background: #f0f4ff; border-radius: 8px; padding: 10px; margin: 6px 0; display: flex; justify-content: space-between; align-items: center; }\n    .carte button { background: #e74c3c; color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h2>Tableau de bord</h2>\n  <input id=\"ville\" type=\"text\" placeholder=\"Nom de la ville\">\n  <button onclick=\"ajouter()\">Ajouter</button>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "let villes = JSON.parse(localStorage.getItem(\"villes\") || \"[]\");\nafficherTout();\n\nfunction ajouter() {\n  const nom = document.querySelector(\"#ville\").value.trim();\n  if (!nom) return;\n  villes.push({ nom });\n  localStorage.setItem(\"villes\", JSON.stringify(villes));\n  afficherTout();\n}\n\nfunction afficherTout() {\n  const conteneur = document.querySelector(\"#cartes\");\n  conteneur.innerHTML = \"\";\n\n  villes.forEach(function(v, i) {\n    const carte = document.createElement(\"div\");\n    carte.className = \"carte\";\n    carte.textContent = v.nom;\n\n    // Ajoute ici un bouton ✕ qui supprime la ville à l'index i\n    // et met à jour localStorage et l'affichage\n\n    conteneur.appendChild(carte);\n  });\n}"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Supprimer une ville</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    input { padding: 6px; margin-right: 6px; }\n    .carte { background: #f0f4ff; border-radius: 8px; padding: 10px; margin: 6px 0; display: flex; justify-content: space-between; align-items: center; }\n    .carte button { background: #e74c3c; color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h2>Tableau de bord</h2>\n  <input id=\"ville\" type=\"text\" placeholder=\"Nom de la ville\">\n  <button onclick=\"ajouter()\">Ajouter</button>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "let villes = JSON.parse(localStorage.getItem(\"villes\") || \"[]\");\nafficherTout();\n\nfunction ajouter() {\n  const nom = document.querySelector(\"#ville\").value.trim();\n  if (!nom) return;\n  villes.push({ nom });\n  localStorage.setItem(\"villes\", JSON.stringify(villes));\n  afficherTout();\n}\n\nfunction afficherTout() {\n  const conteneur = document.querySelector(\"#cartes\");\n  conteneur.innerHTML = \"\";\n\n  villes.forEach(function(v, i) {\n    const carte = document.createElement(\"div\");\n    carte.className = \"carte\";\n    carte.textContent = v.nom;\n\n    const btn = document.createElement(\"button\");\n    btn.textContent = \"✕\";\n    btn.addEventListener(\"click\", function() {\n      villes = villes.filter(function(_, j) { return j !== i; });\n      localStorage.setItem(\"villes\", JSON.stringify(villes));\n      afficherTout();\n    });\n\n    carte.appendChild(btn);\n    conteneur.appendChild(carte);\n  });\n}"
        },
        verification: [
          { fichier: "js", contient: "createElement(\"button\")", message: { fr: "Crée un bouton de suppression avec document.createElement(\"button\").", en: "Create a delete button with document.createElement(\"button\")." } },
          { fichier: "js", contient: "villes.filter(", message: { fr: "Utilise villes.filter() pour créer le nouveau tableau sans la ville supprimée.", en: "Use villes.filter() to create the new array without the deleted city." } },
          { fichier: "js", contient: "j !== i", message: { fr: "Dans le filter, garde les villes dont l'index j est différent de i.", en: "In the filter, keep cities whose index j differs from i." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quelle méthode de tableau crée un nouveau tableau en gardant seulement certains éléments ?",
            en: "Which array method creates a new array keeping only certain elements?"
          },
          bonneReponse: "filter",
          explication: {
            fr: "<code>filter</code> parcourt le tableau et appelle une fonction de test sur chaque élément. Les éléments pour lesquels la fonction retourne <code>true</code> sont conservés dans le nouveau tableau. Le tableau original n'est pas modifié.",
            en: "<code>filter</code> iterates over the array and calls a test function on each element. Elements for which the function returns <code>true</code> are kept in the new array. The original array is not modified."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },

    // ─── Étape 4 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "États de chargement & animations", en: "Loading states & animations" },
      besoin: {
        fr: "Quand un <code>fetch</code> est en cours, l'utilisateur ne sait pas si l'appli a bien reçu sa demande — il peut penser qu'elle est bloquée. Afficher un <strong>message de chargement</strong> et ajouter des <strong>transitions CSS douces</strong> sur les cartes améliore considérablement l'expérience.",
        en: "When a <code>fetch</code> is in progress, the user does not know whether the app has received their request — they might think it is frozen. Showing a <strong>loading message</strong> and adding <strong>smooth CSS transitions</strong> to the cards considerably improves the experience."
      },
      decouverte: {
        fr: "Le principe est simple : avant de lancer le <code>fetch</code>, on affiche « Chargement… » (ou un spinner) dans l'interface. Dès que les données arrivent (dans le <code>await</code>), on retire ce message et on affiche la carte. Côté style, la propriété CSS <code>transition</code> permet d'animer automatiquement les changements de <code>opacity</code>, <code>transform</code> ou <code>background-color</code>, donnant un aspect plus soigné aux cartes.",
        en: "The principle is simple: before launching the <code>fetch</code>, display « Loading… » (or a spinner) in the interface. Once the data arrives (in the <code>await</code>), remove that message and display the card. On the style side, the CSS <code>transition</code> property automatically animates changes to <code>opacity</code>, <code>transform</code>, or <code>background-color</code>, giving cards a more polished look."
      },
      explication: {
        fr: "On insère un élément « Chargement… » <strong>avant</strong> le <code>await fetch</code>, et on le supprime (ou le remplace) <strong>après</strong>. Pour les animations CSS, <code>transition: opacity 0.3s ease, transform 0.3s ease</code> sur la carte, combiné à une classe CSS qui change l'<code>opacity</code> de 0 à 1, crée un effet d'apparition en douceur. Même un simple <code>transition: box-shadow 0.2s</code> sur le survol suffit à rendre l'interface plus vivante.",
        en: "We insert a « Loading… » element <strong>before</strong> the <code>await fetch</code>, and remove (or replace) it <strong>after</strong>. For CSS animations, <code>transition: opacity 0.3s ease, transform 0.3s ease</code> on the card, combined with a CSS class that changes <code>opacity</code> from 0 to 1, creates a smooth fade-in effect. Even a simple <code>transition: box-shadow 0.2s</code> on hover is enough to make the interface feel more alive."
      },
      illustration: null,
      exemple: {
        code: "// ── JavaScript : état de chargement ──\nasync function charger() {\n  const msg = document.querySelector(\"#message\");\n\n  // Affiche le chargement AVANT le fetch\n  msg.textContent = \"Chargement…\";\n  msg.style.display = \"block\";\n\n  try {\n    const reponse = await fetch(\"https://api.open-meteo.com/...\");\n    const data = await reponse.json();\n\n    // Cache le message APRÈS la réponse\n    msg.style.display = \"none\";\n    afficherCarte(data);\n  } catch (e) {\n    msg.textContent = \"Erreur de chargement.\";\n  }\n}\n\n/* ── CSS : transition douce sur les cartes ──\n.carte {\n  opacity: 0;\n  transform: translateY(8px);\n  transition: opacity 0.3s ease, transform 0.3s ease;\n}\n.carte.visible {\n  opacity: 1;\n  transform: translateY(0);\n}\n*/",
        langage: "js",
        commentaire: {
          fr: "Le message « Chargement… » apparaît immédiatement, avant même que le réseau réponde. La classe <code>.visible</code> ajoutée après le rendu déclenche la transition CSS automatiquement.",
          en: "The « Loading… » message appears immediately, before the network even responds. The <code>.visible</code> class added after rendering triggers the CSS transition automatically."
        }
      },
      exercice: {
        enonce: {
          fr: "Dans la fonction <code>chercher()</code>, affiche le texte « Chargement… » dans la div <code>#message</code> juste avant le <code>fetch</code>, et retire-le (ou remplace-le par le résultat) une fois les données reçues. En bonus : ajoute une transition CSS <code>opacity 0.3s</code> sur les cartes pour qu'elles apparaissent en douceur.",
          en: "In the <code>chercher()</code> function, display the text « Loading… » in the <code>#message</code> div just before the <code>fetch</code>, and remove it (or replace it with the result) once the data is received. Bonus: add a <code>opacity 0.3s</code> CSS transition on the cards so they fade in smoothly."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>État de chargement</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #message { color: #6b7280; font-style: italic; margin: 8px 0; min-height: 24px; }\n    .carte {\n      background: #f0f4ff;\n      border-radius: 8px;\n      padding: 12px 16px;\n      margin: 8px 0;\n      /* Ajoute ici une transition opacity et transform */\n    }\n  </style>\n</head>\n<body>\n  <h2>Tableau de bord</h2>\n  <input id=\"ville\" type=\"text\" placeholder=\"Nom de la ville\" value=\"Seoul\">\n  <button onclick=\"chercher()\">Chercher</button>\n  <div id=\"message\"></div>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "async function chercher() {\n  const nom = document.querySelector(\"#ville\").value.trim();\n  const msg = document.querySelector(\"#message\");\n  const conteneur = document.querySelector(\"#cartes\");\n\n  // 1. Affiche \"Chargement…\" ici\n\n  try {\n    const urlGeo = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + nom + \"&count=1&language=fr\";\n    const repGeo = await fetch(urlGeo);\n    const geo = await repGeo.json();\n\n    if (!geo.results) {\n      msg.textContent = \"Ville introuvable.\";\n      return;\n    }\n\n    const lat = geo.results[0].latitude;\n    const lon = geo.results[0].longitude;\n\n    const urlMeteo = \"https://api.open-meteo.com/v1/forecast?latitude=\" + lat\n      + \"&longitude=\" + lon + \"&current=temperature_2m,weather_code&timezone=auto\";\n    const repMeteo = await fetch(urlMeteo);\n    const meteo = await repMeteo.json();\n\n    // 2. Retire le message de chargement ici\n\n    const carte = document.createElement(\"div\");\n    carte.className = \"carte\";\n    carte.textContent = geo.results[0].name + \" — \" + meteo.current.temperature_2m + \" °C\";\n    conteneur.appendChild(carte);\n\n  } catch (e) {\n    msg.textContent = \"Erreur : \" + e.message;\n  }\n}"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>État de chargement</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #message { color: #6b7280; font-style: italic; margin: 8px 0; min-height: 24px; }\n    .carte {\n      background: #f0f4ff;\n      border-radius: 8px;\n      padding: 12px 16px;\n      margin: 8px 0;\n      opacity: 0;\n      transform: translateY(6px);\n      transition: opacity 0.3s ease, transform 0.3s ease;\n    }\n    .carte.visible {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  </style>\n</head>\n<body>\n  <h2>Tableau de bord</h2>\n  <input id=\"ville\" type=\"text\" placeholder=\"Nom de la ville\" value=\"Seoul\">\n  <button onclick=\"chercher()\">Chercher</button>\n  <div id=\"message\"></div>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "async function chercher() {\n  const nom = document.querySelector(\"#ville\").value.trim();\n  const msg = document.querySelector(\"#message\");\n  const conteneur = document.querySelector(\"#cartes\");\n\n  msg.textContent = \"Chargement…\";\n\n  try {\n    const urlGeo = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + nom + \"&count=1&language=fr\";\n    const repGeo = await fetch(urlGeo);\n    const geo = await repGeo.json();\n\n    if (!geo.results) {\n      msg.textContent = \"Ville introuvable.\";\n      return;\n    }\n\n    const lat = geo.results[0].latitude;\n    const lon = geo.results[0].longitude;\n\n    const urlMeteo = \"https://api.open-meteo.com/v1/forecast?latitude=\" + lat\n      + \"&longitude=\" + lon + \"&current=temperature_2m,weather_code&timezone=auto\";\n    const repMeteo = await fetch(urlMeteo);\n    const meteo = await repMeteo.json();\n\n    msg.textContent = \"\";\n\n    const carte = document.createElement(\"div\");\n    carte.className = \"carte\";\n    carte.textContent = geo.results[0].name + \" — \" + meteo.current.temperature_2m + \" °C\";\n    conteneur.appendChild(carte);\n\n    // Déclenche la transition CSS après insertion dans le DOM\n    requestAnimationFrame(function() { carte.classList.add(\"visible\"); });\n\n  } catch (e) {\n    msg.textContent = \"Erreur : \" + e.message;\n  }\n}"
        },
        verification: [
          { fichier: "js", contient: "msg.textContent = \"Chargement…\"", message: { fr: "Affiche \"Chargement…\" dans #message avant le fetch.", en: "Display \"Chargement…\" in #message before the fetch." } },
          { fichier: "js", contient: "requestAnimationFrame", message: { fr: "Utilise requestAnimationFrame pour déclencher l'animation CSS après l'insertion dans le DOM.", en: "Use requestAnimationFrame to trigger the CSS animation after DOM insertion." } },
          { fichier: "html", contient: "transition:", message: { fr: "Ajoute une propriété CSS transition sur les cartes.", en: "Add a CSS transition property to the cards." } }
        ]
      },
      application: {
        fr: "Le tableau de bord gère maintenant les états de chargement et les animations — l'expérience est soignée. Dans la prochaine étape, tu assembleras les trois fichiers complets pour obtenir l'application finale fonctionnelle.",
        en: "The dashboard now handles loading states and animations — the experience is polished. In the next step you will assemble the three complete files to get the final working application."
      },
      quiz: [
        {
          type: "vraifaux",
          question: {
            fr: "Afficher un état de chargement pendant l'attente améliore l'expérience utilisateur.",
            en: "Showing a loading state while waiting improves the user experience."
          },
          bonneReponse: true,
          explication: {
            fr: "Vrai. Sans retour visuel, l'utilisateur ne sait pas si l'appli a bien reçu sa demande et peut penser qu'elle est bloquée. Un message « Chargement… » ou un indicateur de progression rassure immédiatement et rend l'application plus professionnelle.",
            en: "True. Without visual feedback, the user does not know whether the app has received their request and may think it is frozen. A « Loading… » message or progress indicator immediately reassures them and makes the application feel more professional."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },

    // ─── Étape 5 (Capstone) ──────────────────────────────────────────────────────
    {
      titre: { fr: "Assemble ton projet complet", en: "Assemble your complete project" },
      besoin: {
        fr: "Tu as appris et pratiqué chaque brique séparément : la structure HTML, le style CSS, les événements, le DOM, les APIs, la persistance et l'heure locale. Il est temps de les <strong>faire travailler ensemble</strong> dans un seul projet cohérent.",
        en: "You have learned and practised each building block separately: HTML structure, CSS style, events, the DOM, APIs, persistence, and local time. It is now time to make them <strong>work together</strong> in one coherent project."
      },
      decouverte: {
        fr: "Une application web n'est pas la somme de morceaux indépendants — c'est un tout où le HTML définit les éléments que le CSS habille et que le JavaScript anime. Assembler le projet complet dans tes fichiers <code>projet-eleve/</code> est le meilleur moyen de voir cette synergie en action.",
        en: "A web application is not just a sum of independent pieces — it is a whole where HTML defines the elements that CSS dresses and JavaScript animates. Assembling the complete project in your <code>projet-eleve/</code> files is the best way to see this synergy in action."
      },
      explication: {
        fr: "Le fichier <code>index.html</code> pose la structure (formulaire, conteneur de cartes, message). Le fichier <code>style.css</code> habille cette structure (grille responsive, cartes dégradées, boutons). Le fichier <code>script.js</code> donne la vie : il lit le formulaire, interroge deux APIs (géocodage + météo), construit les cartes avec drapeau, température et heure locale, sauvegarde dans <code>localStorage</code> et gère la suppression. Chaque fichier a un rôle précis — ensemble, ils forment l'application que tu as vue dans la démo du Module 0.",
        en: "The <code>index.html</code> file lays the structure (form, card container, message). The <code>style.css</code> file dresses that structure (responsive grid, gradient cards, buttons). The <code>script.js</code> file brings it to life: it reads the form, queries two APIs (geocoding + weather), builds cards with flag, temperature and local time, saves to <code>localStorage</code>, and handles deletion. Each file has a precise role — together they form the application you saw in the Module 0 demo."
      },
      illustration: null,
      exemple: null,
      exercice: {
        enonce: {
          fr: "Assemble les trois fichiers complets dans ton dossier <code>projet-eleve/</code> avec Notepad++. Le HTML et le CSS sont déjà complets — complète les lignes marquées <code>// À compléter</code> dans le JS pour que l'application soit entièrement fonctionnelle. Tu peux tester ici, puis copier ta correction dans Notepad++.",
          en: "Assemble the three complete files in your <code>projet-eleve/</code> folder using Notepad++. The HTML and CSS are already complete — fill in the lines marked <code>// À compléter</code> in the JS to make the application fully functional. You can test here, then copy your correction into Notepad++."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Tableau de bord des villes</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <header>\n    <h1>🌍 Tableau de bord des villes</h1>\n    <form id=\"form-ville\">\n      <input id=\"champ-ville\" type=\"text\" placeholder=\"Entrez une ville…\" required>\n      <button type=\"submit\">Ajouter</button>\n    </form>\n    <p id=\"message\" class=\"message\"></p>\n  </header>\n  <main id=\"cartes\" class=\"grille\"></main>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          css: ":root { --grad-a: #0ea5e9; --grad-b: #2563eb; --bg: #f6f9fc; --text: #0f172a; }\n* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }\nheader { padding: 24px; text-align: center; }\n#form-ville { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }\n#champ-ville { padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; min-width: 220px; }\n#form-ville button { padding: 10px 18px; border: 0; border-radius: 8px; background: #0284c7; color: #fff; font-weight: 700; cursor: pointer; }\n.message { color: #dc2626; min-height: 20px; }\n.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; padding: 0 24px 40px; }\n.carte { position: relative; border-radius: 16px; padding: 18px; color: #fff;\n  background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); box-shadow: 0 8px 20px rgba(2,132,199,.25); }\n.carte h2 { margin: 0 0 4px; }\n.carte .temp { font-size: 34px; font-weight: 800; }\n.carte .meta { opacity: .9; font-size: 14px; }\n.carte .suppr { position: absolute; top: 8px; right: 10px; background: rgba(255,255,255,.25); border: 0; color: #fff; border-radius: 999px; width: 26px; height: 26px; cursor: pointer; }\n.carte.loading { opacity: .6; }\n@media (max-width: 500px) { .grille { grid-template-columns: 1fr; } }",
          js: "const form = document.getElementById(\"form-ville\");\nconst champ = document.getElementById(\"champ-ville\");\nconst conteneur = document.getElementById(\"cartes\");\nconst message = document.getElementById(\"message\");\n\nlet villes = JSON.parse(localStorage.getItem(\"villes\") || \"[]\");\n\nconst WMO = { 0:\"Ciel dégagé\",1:\"Plutôt dégagé\",2:\"Partiellement nuageux\",3:\"Couvert\",45:\"Brouillard\",\n  51:\"Bruine\",61:\"Pluie faible\",63:\"Pluie\",65:\"Pluie forte\",71:\"Neige\",80:\"Averses\",95:\"Orage\" };\n\nform.addEventListener(\"submit\", async (e) => {\n  e.preventDefault();\n  const nom = champ.value.trim();\n  if (!nom) return;\n  message.textContent = \"\";\n  champ.value = \"\";\n  try {\n    const ville = await chercherVille(nom);\n    villes.push(ville);\n    sauvegarder();\n    afficher();\n  } catch (err) {\n    message.textContent = err.message;\n  }\n});\n\nasync function chercherVille(nom) {\n  // À compléter : fetch géocodage puis fetch météo, retourner l'objet ville\n  // (voir le script de référence dans projet-eleve/etapes/module-7/)\n}\n\nfunction heureLocale(tz) {\n  return new Intl.DateTimeFormat(\"fr-FR\", { hour: \"2-digit\", minute: \"2-digit\", timeZone: tz }).format(new Date());\n}\n\nfunction afficher() {\n  conteneur.innerHTML = \"\";\n  // À compléter : boucle villes.forEach pour créer chaque carte avec innerHTML\n  // (drapeau flagcdn, temp, météo, heureLocale, bouton suppr)\n  conteneur.querySelectorAll(\".suppr\").forEach(b =>\n    b.addEventListener(\"click\", () => {\n      // À compléter : villes = villes.filter(...) pour supprimer la ville\n      sauvegarder();\n      afficher();\n    }));\n}\n\nfunction sauvegarder() {\n  // À compléter : localStorage.setItem\n}\n\nafficher();"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Tableau de bord des villes</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <header>\n    <h1>🌍 Tableau de bord des villes</h1>\n    <form id=\"form-ville\">\n      <input id=\"champ-ville\" type=\"text\" placeholder=\"Entrez une ville…\" required>\n      <button type=\"submit\">Ajouter</button>\n    </form>\n    <p id=\"message\" class=\"message\"></p>\n  </header>\n  <main id=\"cartes\" class=\"grille\"></main>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          css: ":root { --grad-a: #0ea5e9; --grad-b: #2563eb; --bg: #f6f9fc; --text: #0f172a; }\n* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }\nheader { padding: 24px; text-align: center; }\n#form-ville { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }\n#champ-ville { padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; min-width: 220px; }\n#form-ville button { padding: 10px 18px; border: 0; border-radius: 8px; background: #0284c7; color: #fff; font-weight: 700; cursor: pointer; }\n.message { color: #dc2626; min-height: 20px; }\n.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; padding: 0 24px 40px; }\n.carte { position: relative; border-radius: 16px; padding: 18px; color: #fff;\n  background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); box-shadow: 0 8px 20px rgba(2,132,199,.25); }\n.carte h2 { margin: 0 0 4px; }\n.carte .temp { font-size: 34px; font-weight: 800; }\n.carte .meta { opacity: .9; font-size: 14px; }\n.carte .suppr { position: absolute; top: 8px; right: 10px; background: rgba(255,255,255,.25); border: 0; color: #fff; border-radius: 999px; width: 26px; height: 26px; cursor: pointer; }\n.carte.loading { opacity: .6; }\n@media (max-width: 500px) { .grille { grid-template-columns: 1fr; } }",
          js: "const form = document.getElementById(\"form-ville\");\nconst champ = document.getElementById(\"champ-ville\");\nconst conteneur = document.getElementById(\"cartes\");\nconst message = document.getElementById(\"message\");\n\nlet villes = JSON.parse(localStorage.getItem(\"villes\") || \"[]\");\n\nconst WMO = { 0:\"Ciel dégagé\",1:\"Plutôt dégagé\",2:\"Partiellement nuageux\",3:\"Couvert\",45:\"Brouillard\",\n  51:\"Bruine\",61:\"Pluie faible\",63:\"Pluie\",65:\"Pluie forte\",71:\"Neige\",80:\"Averses\",95:\"Orage\" };\n\nform.addEventListener(\"submit\", async (e) => {\n  e.preventDefault();\n  const nom = champ.value.trim();\n  if (!nom) return;\n  message.textContent = \"\";\n  champ.value = \"\";\n  try {\n    const ville = await chercherVille(nom);\n    villes.push(ville);\n    sauvegarder();\n    afficher();\n  } catch (err) {\n    message.textContent = err.message;\n  }\n});\n\nasync function chercherVille(nom) {\n  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nom)}&count=1&language=fr`).then(r => r.json());\n  if (!geo.results || !geo.results.length) throw new Error(`Ville introuvable : ${nom}`);\n  const g = geo.results[0];\n  const meteo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,weather_code&timezone=auto`).then(r => r.json());\n  return {\n    nom: g.name, pays: g.country, code: g.country_code.toLowerCase(), timezone: g.timezone,\n    temp: Math.round(meteo.current.temperature_2m), météo: WMO[meteo.current.weather_code] || \"Météo inconnue\"\n  };\n}\n\nfunction heureLocale(tz) {\n  return new Intl.DateTimeFormat(\"fr-FR\", { hour: \"2-digit\", minute: \"2-digit\", timeZone: tz }).format(new Date());\n}\n\nfunction afficher() {\n  conteneur.innerHTML = \"\";\n  villes.forEach((v, i) => {\n    const carte = document.createElement(\"div\");\n    carte.className = \"carte\";\n    carte.innerHTML = `\n      <button class=\"suppr\" data-i=\"${i}\" aria-label=\"Supprimer\">✕</button>\n      <h2><img src=\"https://flagcdn.com/${v.code}.svg\" width=\"22\" alt=\"\"> ${v.nom}</h2>\n      <div class=\"meta\">${v.pays}</div>\n      <div class=\"temp\">${v.temp}°</div>\n      <div class=\"meta\">${v.météo} · ${heureLocale(v.timezone)}</div>`;\n    conteneur.appendChild(carte);\n  });\n  conteneur.querySelectorAll(\".suppr\").forEach(b =>\n    b.addEventListener(\"click\", () => { villes.splice(Number(b.dataset.i), 1); sauvegarder(); afficher(); }));\n}\n\nfunction sauvegarder() { localStorage.setItem(\"villes\", JSON.stringify(villes)); }\n\nafficher();"
        },
        verification: [
          { fichier: "js", contient: "addEventListener(\"submit\"", message: { fr: "Le formulaire doit écouter l'événement submit avec addEventListener.", en: "The form must listen for the submit event with addEventListener." } },
          { fichier: "js", contient: "await fetch", message: { fr: "Utilise await fetch pour interroger les APIs de manière asynchrone.", en: "Use await fetch to query the APIs asynchronously." } },
          { fichier: "js", contient: "flagcdn.com", message: { fr: "Construis l'URL du drapeau avec flagcdn.com et le code pays en minuscules.", en: "Build the flag URL using flagcdn.com with the lowercase country code." } },
          { fichier: "js", contient: "localStorage.setItem(\"villes\"", message: { fr: "Sauvegarde la liste des villes avec localStorage.setItem(\"villes\", ...).", en: "Save the city list with localStorage.setItem(\"villes\", ...)." } },
          { fichier: "js", contient: "Intl.DateTimeFormat", message: { fr: "Affiche l'heure locale avec Intl.DateTimeFormat.", en: "Display the local time with Intl.DateTimeFormat." } },
          { fichier: "js", contient: "villes.splice(", message: { fr: "Supprime une ville du tableau avec villes.splice() dans le gestionnaire de clic.", en: "Remove a city from the array with villes.splice() in the click handler." } }
        ]
      },
      application: {
        fr: "🎉 <strong>Bravo, ton projet est complet !</strong> Tu viens d'assembler une vraie application web de A à Z : structure HTML, style CSS responsive, appels APIs, persistance, heure locale et gestion d'erreurs. Enregistre les trois fichiers dans ton dossier <code>projet-eleve/</code>, ouvre <code>index.html</code> dans le navigateur et ajoute quelques villes — tu verras TON tableau de bord fonctionner pour de vrai. Le Module 8 propose des <strong>défis optionnels</strong> pour aller encore plus loin (mode sombre, export, météo étendue…) — à toi de jouer !",
        en: "🎉 <strong>Congratulations, your project is complete!</strong> You have just assembled a real web application from scratch: HTML structure, responsive CSS styling, API calls, persistence, local time, and error handling. Save all three files in your <code>projet-eleve/</code> folder, open <code>index.html</code> in the browser, and add a few cities — you will see YOUR dashboard working for real. Module 8 offers <strong>optional challenges</strong> to go even further (dark mode, export, extended weather…) — it is your turn!"
      },
      quiz: [
        {
          type: "vraifaux",
          question: {
            fr: "Une application web réunit HTML (structure), CSS (style) et JavaScript (comportement) qui travaillent ensemble.",
            en: "A web application brings together HTML (structure), CSS (style) and JavaScript (behaviour) working together."
          },
          bonneReponse: true,
          explication: {
            fr: "Vrai. Les trois fichiers jouent des rôles complémentaires : HTML pose le squelette, CSS l'habille, JavaScript lui donne vie. C'est leur collaboration qui produit une application web complète.",
            en: "True. The three files play complementary roles: HTML provides the skeleton, CSS dresses it, JavaScript brings it to life. It is their collaboration that produces a complete web application."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
