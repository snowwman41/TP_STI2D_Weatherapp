export const m8 = {
  titre: { fr: "Défis optionnels", en: "Optional challenges" },
  etapes: [
    // ─── Étape 1 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Une icône météo dynamique", en: "A dynamic weather icon" },
      besoin: {
        fr: "L'API météo renvoie un champ <code>weather_code</code> (ex : <code>0</code> pour soleil, <code>61</code> pour pluie). Plutôt qu'afficher ce nombre brut, on peut le transformer en <strong>emoji expressif</strong> — ☀️, ⛅, 🌧️, ❄️, ⛈️ — pour rendre les cartes bien plus parlantes d'un seul coup d'œil !",
        en: "The weather API returns a <code>weather_code</code> field (e.g. <code>0</code> for clear sky, <code>61</code> for rain). Rather than displaying this raw number, we can turn it into an <strong>expressive emoji</strong> — ☀️, ⛅, 🌧️, ❄️, ⛈️ — to make the cards much more readable at a glance!"
      },
      decouverte: {
        fr: "L'astuce consiste à écrire une fonction <code>iconeMeteo(code)</code> qui reçoit le <code>weather_code</code> et retourne l'emoji correspondant. On peut utiliser une série de <code>if / else if</code> ou un objet-dictionnaire <code>{ 0: \"☀️\", 2: \"⛅\", ... }</code>. La liste complète des codes est fournie par Open-Meteo (WMO Weather interpretation codes) — les principaux : <code>0</code> → ciel dégagé, <code>2/3</code> → partiellement nuageux, <code>61/63/65</code> → pluie, <code>71</code> → neige, <code>95</code> → orage.",
        en: "The trick is to write an <code>iconeMeteo(code)</code> function that receives the <code>weather_code</code> and returns the matching emoji. You can use a series of <code>if / else if</code> statements or a dictionary object <code>{ 0: \"☀️\", 2: \"⛅\", ... }</code>. The full code list is provided by Open-Meteo (WMO Weather interpretation codes) — the main ones: <code>0</code> → clear sky, <code>2/3</code> → partly cloudy, <code>61/63/65</code> → rain, <code>71</code> → snow, <code>95</code> → thunderstorm."
      },
      explication: {
        fr: "Dans la carte de chaque ville, après avoir récupéré <code>meteo.current.weather_code</code>, appelle simplement <code>iconeMeteo(weather_code)</code> pour obtenir l'emoji. Affiche-le à côté de la température : <code>\"☀️ 24 °C\"</code>. Si le code ne correspond à aucun cas connu, retourne <code>\"🌡️\"</code> comme valeur par défaut — ainsi la carte reste lisible même pour des codes rares.",
        en: "In each city card, after fetching <code>meteo.current.weather_code</code>, simply call <code>iconeMeteo(weather_code)</code> to get the emoji. Display it next to the temperature: <code>\"☀️ 24 °C\"</code>. If the code matches no known case, return <code>\"🌡️\"</code> as a default — so the card stays readable even for rare codes."
      },
      illustration: null,
      exemple: {
        code: "// Fonction qui traduit un weather_code en emoji\nfunction iconeMeteo(code) {\n  if (code === 0)                          return \"☀️\";  // ciel dégagé\n  if (code === 1 || code === 2 || code === 3) return \"⛅\";  // partiellement nuageux\n  if (code === 61 || code === 63 || code === 65) return \"🌧️\"; // pluie\n  if (code === 71 || code === 73 || code === 75) return \"❄️\"; // neige\n  if (code === 95 || code === 96 || code === 99) return \"⛈️\"; // orage\n  return \"🌡️\"; // valeur par défaut\n}\n\n// Utilisation dans la carte :\nconst wc = meteo.current.weather_code;  // ex : 0, 61, 95…\nconst temp = meteo.current.temperature_2m;\ncarte.textContent = iconeMeteo(wc) + \" \" + temp + \" °C\";",
        langage: "js",
        commentaire: {
          fr: "<code>weather_code</code> vient de <code>meteo.current.weather_code</code> — le même objet JSON que tu utilises pour la température. Pas de requête supplémentaire nécessaire !",
          en: "<code>weather_code</code> comes from <code>meteo.current.weather_code</code> — the same JSON object you already use for temperature. No extra request needed!"
        }
      },
      exercice: {
        enonce: {
          fr: "Complète la fonction <code>iconeMeteo(code)</code> dans le fichier <code>script.js</code> pour qu'elle retourne l'emoji correct selon le <code>weather_code</code>. Teste avec plusieurs codes pour vérifier que les bons emojis s'affichent dans la div <code>#resultat</code>.",
          en: "Complete the <code>iconeMeteo(code)</code> function in <code>script.js</code> so it returns the correct emoji based on the <code>weather_code</code>. Test with several codes to verify the right emojis appear in the <code>#resultat</code> div."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Icône météo</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #resultat { font-size: 2rem; margin-top: 12px; }\n    button { padding: 6px 12px; margin: 4px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h2>Testeur d'icônes météo</h2>\n  <p>Clique sur un code pour voir l'icône correspondante.</p>\n  <button onclick=\"tester(0)\">Code 0 (soleil)</button>\n  <button onclick=\"tester(2)\">Code 2 (nuageux)</button>\n  <button onclick=\"tester(61)\">Code 61 (pluie)</button>\n  <button onclick=\"tester(71)\">Code 71 (neige)</button>\n  <button onclick=\"tester(95)\">Code 95 (orage)</button>\n  <div id=\"resultat\">—</div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// À compléter : retourne l'emoji correspondant au weather_code\nfunction iconeMeteo(code) {\n  if (code === 0)                                    return /* ☀️ */\"\";\n  if (code === 1 || code === 2 || code === 3)        return /* ⛅ */\"\";\n  if (code === 61 || code === 63 || code === 65)     return /* 🌧️ */\"\";\n  if (code === 71 || code === 73 || code === 75)     return /* ❄️ */\"\";\n  if (code === 95 || code === 96 || code === 99)     return /* ⛈️ */\"\";\n  return \"🌡️\"; // valeur par défaut\n}\n\nfunction tester(code) {\n  document.querySelector(\"#resultat\").textContent =\n    \"Code \" + code + \" → \" + iconeMeteo(code);\n}"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Icône météo</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #resultat { font-size: 2rem; margin-top: 12px; }\n    button { padding: 6px 12px; margin: 4px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h2>Testeur d'icônes météo</h2>\n  <p>Clique sur un code pour voir l'icône correspondante.</p>\n  <button onclick=\"tester(0)\">Code 0 (soleil)</button>\n  <button onclick=\"tester(2)\">Code 2 (nuageux)</button>\n  <button onclick=\"tester(61)\">Code 61 (pluie)</button>\n  <button onclick=\"tester(71)\">Code 71 (neige)</button>\n  <button onclick=\"tester(95)\">Code 95 (orage)</button>\n  <div id=\"resultat\">—</div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "function iconeMeteo(code) {\n  if (code === 0)                                return \"☀️\";\n  if (code === 1 || code === 2 || code === 3)    return \"⛅\";\n  if (code === 61 || code === 63 || code === 65) return \"🌧️\";\n  if (code === 71 || code === 73 || code === 75) return \"❄️\";\n  if (code === 95 || code === 96 || code === 99) return \"⛈️\";\n  return \"🌡️\";\n}\n\nfunction tester(code) {\n  document.querySelector(\"#resultat\").textContent =\n    \"Code \" + code + \" → \" + iconeMeteo(code);\n}"
        }
      },
      application: null,
      quiz: [],
      scoreMinimal: 0,
      defiOptionnel: {
        fr: "Écris une fonction <code>iconeMeteo(code)</code> qui prend un <code>weather_code</code> en paramètre et retourne l'emoji correspondant : <code>0</code> → ☀️, <code>1/2/3</code> → ⛅, <code>61/63/65</code> → 🌧️, <code>71</code> → ❄️, <code>95</code> → ⛈️. <strong>Indice :</strong> utilise une série de <code>if / else if</code> et prévois un emoji par défaut (<code>🌡️</code>) pour les codes non reconnus. Intègre ensuite la fonction dans tes cartes de ville pour remplacer le code brut !",
        en: "Write an <code>iconeMeteo(code)</code> function that takes a <code>weather_code</code> as a parameter and returns the matching emoji: <code>0</code> → ☀️, <code>1/2/3</code> → ⛅, <code>61/63/65</code> → 🌧️, <code>71</code> → ❄️, <code>95</code> → ⛈️. <strong>Hint:</strong> use a series of <code>if / else if</code> statements and plan for a default emoji (<code>🌡️</code>) for unrecognised codes. Then plug the function into your city cards to replace the raw number!"
      }
    },

    // ─── Étape 2 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Trier les villes ou ajouter des favoris", en: "Sorting cities or adding favourites" },
      besoin: {
        fr: "Quand le tableau de bord contient plusieurs villes, il peut être utile de les <strong>trier par température</strong> (de la plus froide à la plus chaude) pour repérer rapidement les extrêmes. On peut aussi imaginer <strong>marquer une ville favorite</strong> pour qu'elle remonte toujours en haut de la liste.",
        en: "When the dashboard contains several cities, it can be useful to <strong>sort them by temperature</strong> (coldest to hottest) to quickly spot the extremes. You can also imagine <strong>marking a city as a favourite</strong> so it always appears at the top of the list."
      },
      decouverte: {
        fr: "JavaScript propose la méthode <code>Array.prototype.sort()</code> qui accepte une <strong>fonction de comparaison</strong> : <code>villes.sort((a, b) => a.temp - b.temp)</code> trie les villes par température croissante. Si <code>a.temp - b.temp</code> est négatif, <code>a</code> passe avant <code>b</code> ; positif, <code>b</code> passe avant <code>a</code>. <strong>Attention :</strong> <code>sort()</code> modifie le tableau en place — si tu veux conserver l'ordre original, travaille sur une copie : <code>[...villes].sort(...)</code>.",
        en: "JavaScript provides the <code>Array.prototype.sort()</code> method that accepts a <strong>comparison function</strong>: <code>villes.sort((a, b) => a.temp - b.temp)</code> sorts cities by ascending temperature. If <code>a.temp - b.temp</code> is negative, <code>a</code> comes before <code>b</code>; positive, <code>b</code> comes before <code>a</code>. <strong>Note:</strong> <code>sort()</code> modifies the array in place — if you want to keep the original order, work on a copy: <code>[...villes].sort(...)</code>."
      },
      explication: {
        fr: "Ajoute un bouton « Trier par température » dans ton interface. Au clic, tri le tableau <code>villes</code> avec <code>villes.sort((a, b) => a.temp - b.temp)</code>, puis rappelle <code>afficherTout()</code> pour régénérer les cartes dans le nouvel ordre. Pour trier par température décroissante (la plus chaude d'abord), inverse simplement : <code>(a, b) => b.temp - a.temp</code>. Le champ <code>temp</code> doit être stocké dans chaque objet ville lors de l'ajout.",
        en: "Add a \"Sort by temperature\" button to your interface. On click, sort the <code>villes</code> array with <code>villes.sort((a, b) => a.temp - b.temp)</code>, then call <code>afficherTout()</code> again to regenerate the cards in the new order. To sort by descending temperature (hottest first), simply reverse it: <code>(a, b) => b.temp - a.temp</code>. The <code>temp</code> field must be stored in each city object when it is added."
      },
      illustration: null,
      exemple: {
        code: "// Tableau de villes avec température (stockée lors de l'ajout)\nlet villes = [\n  { nom: \"Oslo\",   temp: 5  },\n  { nom: \"Dakar\",  temp: 34 },\n  { nom: \"Paris\",  temp: 18 },\n  { nom: \"Moscou\", temp: -2 }\n];\n\n// Trier du plus froid au plus chaud\nvilles.sort((a, b) => a.temp - b.temp);\nconsole.log(villes.map(v => v.nom));\n// → [\"Moscou\", \"Oslo\", \"Paris\", \"Dakar\"]\n\n// Trier du plus chaud au plus froid\nvilles.sort((a, b) => b.temp - a.temp);\nconsole.log(villes.map(v => v.nom));\n// → [\"Dakar\", \"Paris\", \"Oslo\", \"Moscou\"]\n\n// Afficher après tri\nafficherTout();",
        langage: "js",
        commentaire: {
          fr: "La fonction de comparaison <code>(a, b) => a.temp - b.temp</code> est la forme la plus concise pour trier des nombres. Un résultat négatif place <code>a</code> avant <code>b</code>, positif place <code>b</code> avant <code>a</code>, zéro laisse l'ordre inchangé.",
          en: "The comparison function <code>(a, b) => a.temp - b.temp</code> is the most concise form for sorting numbers. A negative result places <code>a</code> before <code>b</code>, positive places <code>b</code> before <code>a</code>, zero leaves the order unchanged."
        }
      },
      exercice: {
        enonce: {
          fr: "Le tableau <code>villes</code> contient des objets avec un champ <code>temp</code>. Ajoute un bouton « Trier par température ↑ » qui trie ce tableau du plus froid au plus chaud, puis réaffiche les cartes. En bonus, ajoute un deuxième bouton pour trier dans l'ordre décroissant.",
          en: "The <code>villes</code> array contains objects with a <code>temp</code> field. Add a \"Sort by temperature ↑\" button that sorts the array from coldest to hottest, then re-renders the cards. As a bonus, add a second button to sort in descending order."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Trier les villes</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    button { padding: 6px 12px; margin: 4px; cursor: pointer; }\n    .carte { background: #f0f4ff; border-radius: 8px; padding: 10px; margin: 6px 0; }\n  </style>\n</head>\n<body>\n  <h2>Tableau de bord — tri</h2>\n  <button onclick=\"trierCroissant()\">Trier par température ↑</button>\n  <button onclick=\"trierDecroissant()\">Trier par température ↓</button>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "let villes = [\n  { nom: \"Oslo\",    temp: 5  },\n  { nom: \"Dakar\",   temp: 34 },\n  { nom: \"Paris\",   temp: 18 },\n  { nom: \"Moscou\",  temp: -2 },\n  { nom: \"Bangkok\", temp: 32 }\n];\n\nafficherTout();\n\nfunction trierCroissant() {\n  // Trie villes du plus froid au plus chaud, puis réaffiche\n  /* villes.sort(...); */\n  afficherTout();\n}\n\nfunction trierDecroissant() {\n  // Trie villes du plus chaud au plus froid, puis réaffiche\n  /* villes.sort(...); */\n  afficherTout();\n}\n\nfunction afficherTout() {\n  const conteneur = document.querySelector(\"#cartes\");\n  conteneur.innerHTML = \"\";\n  villes.forEach(function(v) {\n    const div = document.createElement(\"div\");\n    div.className = \"carte\";\n    div.textContent = v.nom + \" — \" + v.temp + \" °C\";\n    conteneur.appendChild(div);\n  });\n}"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Trier les villes</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    button { padding: 6px 12px; margin: 4px; cursor: pointer; }\n    .carte { background: #f0f4ff; border-radius: 8px; padding: 10px; margin: 6px 0; }\n  </style>\n</head>\n<body>\n  <h2>Tableau de bord — tri</h2>\n  <button onclick=\"trierCroissant()\">Trier par température ↑</button>\n  <button onclick=\"trierDecroissant()\">Trier par température ↓</button>\n  <div id=\"cartes\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "let villes = [\n  { nom: \"Oslo\",    temp: 5  },\n  { nom: \"Dakar\",   temp: 34 },\n  { nom: \"Paris\",   temp: 18 },\n  { nom: \"Moscou\",  temp: -2 },\n  { nom: \"Bangkok\", temp: 32 }\n];\n\nafficherTout();\n\nfunction trierCroissant() {\n  villes.sort((a, b) => a.temp - b.temp);\n  afficherTout();\n}\n\nfunction trierDecroissant() {\n  villes.sort((a, b) => b.temp - a.temp);\n  afficherTout();\n}\n\nfunction afficherTout() {\n  const conteneur = document.querySelector(\"#cartes\");\n  conteneur.innerHTML = \"\";\n  villes.forEach(function(v) {\n    const div = document.createElement(\"div\");\n    div.className = \"carte\";\n    div.textContent = v.nom + \" — \" + v.temp + \" °C\";\n    conteneur.appendChild(div);\n  });\n}"
        }
      },
      application: null,
      quiz: [],
      scoreMinimal: 0,
      defiOptionnel: {
        fr: "Ajoute un bouton « Trier par température » dans ton tableau de bord. Au clic, trie le tableau <code>villes</code> avec <code>villes.sort((a, b) => a.temp - b.temp)</code>, puis rappelle <code>afficherTout()</code> pour afficher les cartes dans le nouvel ordre. <strong>Indice :</strong> assure-toi que chaque objet ville stocke bien la température dans un champ <code>temp</code> lors de l'ajout. Pour aller plus loin, tu peux même ajouter un bouton ⭐ sur chaque carte pour marquer des favoris !",
        en: "Add a \"Sort by temperature\" button to your dashboard. On click, sort the <code>villes</code> array with <code>villes.sort((a, b) => a.temp - b.temp)</code>, then call <code>afficherTout()</code> to display the cards in the new order. <strong>Hint:</strong> make sure each city object stores the temperature in a <code>temp</code> field when it is added. To go further, you could even add a ⭐ button on each card to mark favourites!"
      }
    },

    // ─── Étape 3 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Ma position (géolocalisation)", en: "My location (geolocation)" },
      besoin: {
        fr: "Et si le tableau de bord affichait automatiquement la météo de <strong>l'endroit où tu te trouves</strong> ? L'API de géolocalisation du navigateur permet d'obtenir la latitude et la longitude de l'utilisateur en quelques lignes — il suffit ensuite d'appeler directement l'API Open-Meteo avec ces coordonnées.",
        en: "What if the dashboard automatically displayed the weather for <strong>where you currently are</strong>? The browser geolocation API lets you get the user's latitude and longitude in just a few lines — then you simply call the Open-Meteo API directly with those coordinates."
      },
      decouverte: {
        fr: "<code>navigator.geolocation.getCurrentPosition()</code> est l'API native du navigateur pour obtenir la position GPS de l'utilisateur. Elle reçoit une fonction de rappel (<em>callback</em>) appelée avec un objet <code>position</code> qui contient <code>position.coords.latitude</code> et <code>position.coords.longitude</code>. <strong>Important :</strong> le navigateur affichera une <strong>demande de permission</strong> — l'utilisateur doit accepter pour que ça fonctionne.",
        en: "<code>navigator.geolocation.getCurrentPosition()</code> is the browser's native API for getting the user's GPS position. It receives a callback function called with a <code>position</code> object containing <code>position.coords.latitude</code> and <code>position.coords.longitude</code>. <strong>Important:</strong> the browser will show a <strong>permission request</strong> — the user must accept for it to work."
      },
      explication: {
        fr: "Une fois les coordonnées obtenues, construis l'URL de l'API météo directement avec <code>latitude</code> et <code>longitude</code> — pas besoin de passer par le géocodage ! L'URL ressemble à : <code>https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto</code>. Tu peux aussi gérer l'erreur (refus de permission ou GPS indisponible) avec le second paramètre de <code>getCurrentPosition</code> : <code>(pos, err) => { if (err) ... }</code>.",
        en: "Once you have the coordinates, build the weather API URL directly with <code>latitude</code> and <code>longitude</code> — no need to go through geocoding! The URL looks like: <code>https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto</code>. You can also handle errors (permission denied or GPS unavailable) with the second parameter of <code>getCurrentPosition</code>: <code>(pos, err) => { if (err) ... }</code>."
      },
      illustration: null,
      exemple: {
        code: "// Demande la position GPS de l'utilisateur\nnavigator.geolocation.getCurrentPosition(\n  async function(pos) {\n    const lat = pos.coords.latitude;\n    const lon = pos.coords.longitude;\n    console.log(\"Position :\", lat, lon);\n\n    // Appel direct à l'API météo avec les coordonnées\n    const url = `https://api.open-meteo.com/v1/forecast`\n      + `?latitude=${lat}&longitude=${lon}`\n      + `&current=temperature_2m,weather_code&timezone=auto`;\n\n    const reponse = await fetch(url);\n    const meteo = await reponse.json();\n\n    const temp = meteo.current.temperature_2m;\n    const code = meteo.current.weather_code;\n    console.log(`Météo ici : ${temp} °C, code ${code}`);\n  },\n  function(erreur) {\n    console.error(\"Géolocalisation refusée ou indisponible :\", erreur.message);\n  }\n);",
        langage: "js",
        commentaire: {
          fr: "Le navigateur demande la permission avant de fournir les coordonnées. Si l'utilisateur refuse (ou si le GPS est désactivé), la fonction d'erreur est appelée avec un objet <code>erreur</code> qui décrit le problème.",
          en: "The browser asks for permission before providing coordinates. If the user refuses (or GPS is off), the error function is called with an <code>erreur</code> object describing the problem."
        }
      },
      exercice: {
        enonce: {
          fr: "Clique sur le bouton « Ma position » pour lancer la géolocalisation. Récupère la latitude et la longitude avec <code>navigator.geolocation.getCurrentPosition()</code>, puis appelle l'API Open-Meteo avec ces coordonnées pour afficher la température de ta position actuelle dans la div <code>#resultat</code>.",
          en: "Click the \"My location\" button to trigger geolocation. Retrieve the latitude and longitude with <code>navigator.geolocation.getCurrentPosition()</code>, then call the Open-Meteo API with those coordinates to display the temperature at your current position in the <code>#resultat</code> div."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Ma position</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    button { padding: 8px 16px; cursor: pointer; font-size: 1rem; }\n    #resultat { margin-top: 16px; font-size: 1.4rem; color: #2563eb; min-height: 32px; }\n    #erreur  { color: #e74c3c; margin-top: 8px; }\n  </style>\n</head>\n<body>\n  <h2>Météo — ma position</h2>\n  <button onclick=\"maPosition()\">📍 Ma position</button>\n  <div id=\"resultat\">—</div>\n  <div id=\"erreur\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "function maPosition() {\n  const res = document.querySelector(\"#resultat\");\n  const err = document.querySelector(\"#erreur\");\n  res.textContent = \"Localisation en cours…\";\n  err.textContent = \"\";\n\n  // Utilise navigator.geolocation.getCurrentPosition pour obtenir lat/lon\n  navigator.geolocation.getCurrentPosition(\n    async function(pos) {\n      const lat = pos.coords.latitude;\n      const lon = pos.coords.longitude;\n\n      // Construis l'URL de l'API Open-Meteo avec lat et lon\n      const url = /* \"https://api.open-meteo.com/v1/forecast?latitude=\" + lat + ... */\"\";\n\n      // Fais le fetch et affiche la température dans #resultat\n    },\n    function(erreur) {\n      res.textContent = \"—\";\n      err.textContent = \"Erreur : \" + erreur.message;\n    }\n  );\n}"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Ma position</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    button { padding: 8px 16px; cursor: pointer; font-size: 1rem; }\n    #resultat { margin-top: 16px; font-size: 1.4rem; color: #2563eb; min-height: 32px; }\n    #erreur  { color: #e74c3c; margin-top: 8px; }\n  </style>\n</head>\n<body>\n  <h2>Météo — ma position</h2>\n  <button onclick=\"maPosition()\">📍 Ma position</button>\n  <div id=\"resultat\">—</div>\n  <div id=\"erreur\"></div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "function maPosition() {\n  const res = document.querySelector(\"#resultat\");\n  const err = document.querySelector(\"#erreur\");\n  res.textContent = \"Localisation en cours…\";\n  err.textContent = \"\";\n\n  navigator.geolocation.getCurrentPosition(\n    async function(pos) {\n      const lat = pos.coords.latitude;\n      const lon = pos.coords.longitude;\n\n      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;\n\n      try {\n        const reponse = await fetch(url);\n        const meteo = await reponse.json();\n        const temp = meteo.current.temperature_2m;\n        const code = meteo.current.weather_code;\n        res.textContent = `📍 Ici : ${temp} °C (code ${code})`;\n      } catch (e) {\n        res.textContent = \"—\";\n        err.textContent = \"Erreur réseau : \" + e.message;\n      }\n    },\n    function(erreur) {\n      res.textContent = \"—\";\n      err.textContent = \"Erreur : \" + erreur.message;\n    }\n  );\n}"
        }
      },
      application: null,
      quiz: [],
      scoreMinimal: 0,
      defiOptionnel: {
        fr: "Ajoute un bouton « 📍 Ma position » dans ton tableau de bord. Au clic, utilise <code>navigator.geolocation.getCurrentPosition(pos => { const {latitude, longitude} = pos.coords; ... })</code> pour récupérer tes coordonnées GPS, puis appelle directement l'API météo avec : <code>https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto</code>. <strong>Indice :</strong> le navigateur demandera la permission — accepte-la pour que ça fonctionne, et pense à gérer le refus avec le second paramètre de la fonction !",
        en: "Add a \"📍 My location\" button to your dashboard. On click, use <code>navigator.geolocation.getCurrentPosition(pos => { const {latitude, longitude} = pos.coords; ... })</code> to get your GPS coordinates, then call the weather API directly with: <code>https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto</code>. <strong>Hint:</strong> the browser will ask for permission — accept it for it to work, and remember to handle a refusal with the second parameter of the function!"
      }
    }
  ]
};
