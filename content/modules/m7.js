export const m7 = {
  titre: { fr: "Finitions — heure locale & persistance", en: "Finishing touches — local time & persistence" },
  etapes: [
    // ─── Étape 1 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Afficher l'heure locale", en: "Displaying the local time" },
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
        }
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
        }
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
        }
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
        }
      },
      application: {
        fr: "Bravo, le tableau de bord est maintenant <strong>complet</strong> ! Il affiche l'heure locale de chaque ville, sauvegarde la liste entre les rechargements, permet de supprimer des villes, et s'accompagne d'états de chargement et d'animations soignées. Tu as construit une vraie application web de A à Z. Le Module 8 propose des <strong>défis optionnels</strong> pour aller encore plus loin — à toi de jouer !",
        en: "Well done, the dashboard is now <strong>complete</strong>! It displays the local time for each city, saves the list between reloads, lets you delete cities, and comes with polished loading states and animations. You have built a real web application from scratch. Module 8 offers <strong>optional challenges</strong> to go even further — it is your turn!"
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
    }
  ]
};
