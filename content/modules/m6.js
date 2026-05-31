export const m6 = {
  titre: { fr: "Le temps d'attente — async / await", en: "Waiting — async / await" },
  etapes: [
    // ─── Étape 1 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Pourquoi il faut attendre", en: "Why we need to wait" },
      besoin: {
        fr: "Quand on appelle une API, la réponse ne revient pas instantanément — le réseau prend du temps. Si JavaScript attendait sans rien faire, toute la page se <strong>bloquerait</strong>. Il faut donc comprendre ce qu'est le code <strong>asynchrone</strong>.",
        en: "When we call an API, the response does not come back instantly — the network takes time. If JavaScript waited and did nothing, the whole page would <strong>freeze</strong>. We therefore need to understand what <strong>asynchronous</strong> code is."
      },
      decouverte: {
        fr: "JavaScript exécute le code <strong>ligne par ligne</strong>, sans s'arrêter. Quand une opération longue (requête réseau, minuterie) est déclenchée, JavaScript la <em>lance</em> puis <strong>continue</strong> immédiatement les lignes suivantes. La réponse arrivera <em>plus tard</em> — c'est ça, l'asynchronisme. Une <strong>promesse</strong> (<code>Promise</code>) est la valeur « qui arrivera plus tard » : elle est d'abord <em>en attente</em>, puis <em>résolue</em> (succès) ou <em>rejetée</em> (erreur).",
        en: "JavaScript runs code <strong>line by line</strong>, without stopping. When a long operation (network request, timer) is triggered, JavaScript <em>starts</em> it then <strong>immediately continues</strong> to the next lines. The response will arrive <em>later</em> — that is asynchrony. A <strong>promise</strong> (<code>Promise</code>) is that value « that will arrive later »: it starts as <em>pending</em>, then becomes <em>resolved</em> (success) or <em>rejected</em> (error)."
      },
      explication: {
        fr: "<code>setTimeout(fonction, délai)</code> est un exemple simple d'opération asynchrone : la fonction n'est exécutée qu'<strong>après</strong> le délai, mais le code <em>après</em> le <code>setTimeout</code> s'exécute <strong>immédiatement</strong>. Cela crée un ordre d'affichage surprenant dans la console — et illustre exactement pourquoi on ne peut pas lire un résultat réseau sur la ligne suivante du <code>fetch</code>.",
        en: "<code>setTimeout(function, delay)</code> is a simple example of an asynchronous operation: the function only runs <strong>after</strong> the delay, but code <em>after</em> the <code>setTimeout</code> runs <strong>immediately</strong>. This creates a surprising display order in the console — and illustrates exactly why you cannot read a network result on the line right after <code>fetch</code>."
      },
      illustration: "fetch-timeline",
      exemple: {
        code: "console.log(\"1 — début\");\n\nsetTimeout(function() {\n  console.log(\"3 — dans le setTimeout (après 1 s)\");\n}, 1000);\n\nconsole.log(\"2 — après le setTimeout\");\n\n// Ordre réel dans la console :\n// 1 — début\n// 2 — après le setTimeout   ← s'affiche AVANT le 3 !\n// 3 — dans le setTimeout (après 1 s)",
        langage: "js",
        commentaire: {
          fr: "La ligne <code>\"2 — après le setTimeout\"</code> s'affiche <strong>avant</strong> le message du <code>setTimeout</code> même si elle est écrite après. C'est l'asynchronisme : JavaScript n'attend pas.",
          en: "The line <code>\"2 — after setTimeout\"</code> appears <strong>before</strong> the <code>setTimeout</code> message even though it is written after it. That is asynchrony: JavaScript does not wait."
        }
      },
      exercice: {
        enonce: {
          fr: "Observe l'ordre d'affichage dans la console. Ajoute un deuxième <code>setTimeout</code> avec un délai de <strong>2000 ms</strong> qui affiche <code>\"4 — deuxième minuterie\"</code>. Dans quel ordre les messages s'affichent-ils ?",
          en: "Observe the display order in the console. Add a second <code>setTimeout</code> with a delay of <strong>2000 ms</strong> that logs <code>\"4 — second timer\"</code>. In what order do the messages appear?"
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Asynchronisme</title>\n</head>\n<body>\n  <h2>Exercice : ordre d'exécution</h2>\n  <p>Ouvre la console (F12) et observe l'ordre des messages.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "console.log(\"1 — début\");\n\nsetTimeout(function() {\n  console.log(\"3 — première minuterie (1 s)\");\n}, 1000);\n\n// Ajoute ici un deuxième setTimeout de 2000 ms\n// qui affiche \"4 — deuxième minuterie\"\n\nconsole.log(\"2 — après les setTimeout\");"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Asynchronisme</title>\n</head>\n<body>\n  <h2>Exercice : ordre d'exécution</h2>\n  <p>Ouvre la console (F12) et observe l'ordre des messages.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "console.log(\"1 — début\");\n\nsetTimeout(function() {\n  console.log(\"3 — première minuterie (1 s)\");\n}, 1000);\n\nsetTimeout(function() {\n  console.log(\"4 — deuxième minuterie (2 s)\");\n}, 2000);\n\nconsole.log(\"2 — après les setTimeout\");\n\n// Ordre réel :\n// 1 — début\n// 2 — après les setTimeout\n// 3 — première minuterie (1 s)\n// 4 — deuxième minuterie (2 s)"
        },
        verification: [
          { fichier: "js", contient: "setTimeout(function() {", message: { fr: "Ajoute un second setTimeout avec une fonction de callback.", en: "Add a second setTimeout with a callback function." } },
          { fichier: "js", contient: "2000", message: { fr: "Le second setTimeout doit avoir un délai de 2000 ms.", en: "The second setTimeout must have a delay of 2000 ms." } },
          { fichier: "js", contient: "deuxième minuterie", message: { fr: "Affiche le message \"4 — deuxième minuterie\" dans la console.", en: "Log the message \"4 — deuxième minuterie\" to the console." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Pourquoi <code>fetch</code> est-il asynchrone ?",
            en: "Why is <code>fetch</code> asynchronous?"
          },
          options: [
            { fr: "Parce que JavaScript ne supporte pas les requêtes réseau", en: "Because JavaScript does not support network requests" },
            { fr: "Parce que récupérer des données distantes prend du temps", en: "Because retrieving remote data takes time" },
            { fr: "Parce que les APIs refusent les connexions instantanées", en: "Because APIs refuse instant connections" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "Récupérer des données depuis un serveur distant prend un temps variable (réseau, charge du serveur). <code>fetch</code> est asynchrone pour que JavaScript puisse continuer à s'exécuter pendant l'attente, sans bloquer la page.",
            en: "Retrieving data from a remote server takes variable time (network, server load). <code>fetch</code> is asynchronous so JavaScript can keep running while waiting, without freezing the page."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },

    // ─── Étape 2 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "async et await", en: "async and await" },
      besoin: {
        fr: "La syntaxe <code>.then().then()</code> fonctionne, mais elle devient vite difficile à lire quand les étapes s'enchaînent. <code>async</code> / <code>await</code> permettent d'écrire du code asynchrone qui <strong>se lit comme du code normal</strong>, ligne par ligne.",
        en: "The <code>.then().then()</code> syntax works, but quickly becomes hard to read when steps chain together. <code>async</code> / <code>await</code> let you write asynchronous code that <strong>reads like normal code</strong>, line by line."
      },
      decouverte: {
        fr: "On place le mot-clé <code>async</code> devant le mot <code>function</code> pour déclarer une fonction asynchrone. À l'intérieur, <code>await</code> met le code <strong>en pause</strong> jusqu'à ce que la promesse soit résolue — sans bloquer le reste de la page. C'est exactement ce que faisait <code>.then()</code>, mais en bien plus lisible.",
        en: "We place the keyword <code>async</code> before <code>function</code> to declare an asynchronous function. Inside, <code>await</code> <strong>pauses</strong> the code until the promise resolves — without blocking the rest of the page. That is exactly what <code>.then()</code> did, but much more readable."
      },
      explication: {
        fr: "<code>await fetch(url)</code> attend que la requête se termine et retourne la réponse. <code>await reponse.json()</code> attend la conversion en objet JavaScript. On peut ensuite utiliser <code>data</code> directement sur la ligne suivante — comme si c'était du code synchrone. <strong>Important :</strong> <code>await</code> ne fonctionne qu'à l'intérieur d'une fonction <code>async</code>.",
        en: "<code>await fetch(url)</code> waits for the request to finish and returns the response. <code>await reponse.json()</code> waits for the conversion to a JavaScript object. You can then use <code>data</code> directly on the next line — as if it were synchronous code. <strong>Important:</strong> <code>await</code> only works inside an <code>async</code> function."
      },
      illustration: null,
      exemple: {
        code: "// Version .then() — difficile à lire\nfetch(\"https://geocoding-api.open-meteo.com/v1/search?name=Rome&count=1&language=fr\")\n  .then(function(r) { return r.json(); })\n  .then(function(data) { console.log(data.results[0].name); });\n\n// Version async/await — beaucoup plus claire\nasync function chercher(ville) {\n  const url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n  const reponse = await fetch(url);   // attend la réponse du serveur\n  const data = await reponse.json(); // attend la conversion JSON\n  console.log(data.results[0].name);  // \"Rome\"\n  console.log(data.results[0].country); // \"Italie\"\n}\n\nchercher(\"Rome\");",
        langage: "js",
        commentaire: {
          fr: "Avec <code>async</code>/<code>await</code>, chaque ligne s'exécute <strong>dans l'ordre</strong> et on lit le code de haut en bas, comme d'habitude. Pas besoin d'imbriquer des <code>.then()</code>.",
          en: "With <code>async</code>/<code>await</code>, each line runs <strong>in order</strong> and we read the code top to bottom, as usual. No need to nest <code>.then()</code> calls."
        }
      },
      exercice: {
        enonce: {
          fr: "Complète la fonction <code>async function chercher(ville)</code> pour qu'elle interroge l'API de géocodage et affiche dans la console le <strong>nom</strong> et la <strong>latitude</strong> de la ville. Utilise <code>await</code> devant <code>fetch</code> et devant <code>.json()</code>.",
          en: "Complete the <code>async function chercher(ville)</code> so it queries the geocoding API and logs the <strong>name</strong> and <strong>latitude</strong> of the city to the console. Use <code>await</code> before <code>fetch</code> and before <code>.json()</code>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>async / await</title>\n</head>\n<body>\n  <h2>Exercice : async / await</h2>\n  <p>Ouvre la console (F12) pour voir le résultat.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "async function chercher(ville) {\n  const url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n\n  // 1. Attends la réponse du serveur\n  const reponse = await /* ... */;\n\n  // 2. Attends la conversion en objet JavaScript\n  const data = await /* ... */;\n\n  // 3. Affiche le nom et la latitude\n  console.log(\"Nom :\", /* ... */);\n  console.log(\"Latitude :\", /* ... */);\n}\n\nchercher(\"Amsterdam\");"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>async / await</title>\n</head>\n<body>\n  <h2>Exercice : async / await</h2>\n  <p>Ouvre la console (F12) pour voir le résultat.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "async function chercher(ville) {\n  const url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n\n  const reponse = await fetch(url);\n  const data = await reponse.json();\n\n  console.log(\"Nom :\", data.results[0].name);      // \"Amsterdam\"\n  console.log(\"Latitude :\", data.results[0].latitude); // 52.374...\n}\n\nchercher(\"Amsterdam\");"
        },
        verification: [
          { fichier: "js", contient: "async function chercher", message: { fr: "Déclare la fonction avec le mot-clé async.", en: "Declare the function with the async keyword." } },
          { fichier: "js", contient: "await fetch(url)", message: { fr: "Utilise await devant fetch(url) pour attendre la réponse.", en: "Use await before fetch(url) to wait for the response." } },
          { fichier: "js", contient: "await reponse.json()", message: { fr: "Utilise await devant reponse.json() pour convertir la réponse.", en: "Use await before reponse.json() to convert the response." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quel mot-clé met le code en pause jusqu'à ce qu'une promesse soit résolue ?",
            en: "Which keyword pauses code until a promise is resolved?"
          },
          bonneReponse: "await",
          explication: {
            fr: "<code>await</code> met la fonction <code>async</code> en pause jusqu'à ce que la promesse se résolve, puis reprend l'exécution avec la valeur obtenue. Il ne peut s'utiliser qu'à l'intérieur d'une fonction <code>async</code>.",
            en: "<code>await</code> pauses the <code>async</code> function until the promise resolves, then resumes execution with the resulting value. It can only be used inside an <code>async</code> function."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },

    // ─── Étape 3 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Enchaîner deux requêtes : géocodage puis météo", en: "Chaining two requests: geocoding then weather" },
      besoin: {
        fr: "L'API météo a besoin de coordonnées GPS (<code>latitude</code> et <code>longitude</code>) pour répondre. Ces coordonnées, c'est l'API de géocodage qui nous les donne. Il faut donc <strong>enchaîner deux requêtes</strong> : d'abord géocoder la ville, puis demander la météo.",
        en: "The weather API needs GPS coordinates (<code>latitude</code> and <code>longitude</code>) to respond. Those coordinates come from the geocoding API. We therefore need to <strong>chain two requests</strong>: first geocode the city, then request the weather."
      },
      decouverte: {
        fr: "Grâce à <code>async</code>/<code>await</code>, enchaîner deux requêtes est aussi simple qu'écrire deux lignes. On récupère la <code>latitude</code> et la <code>longitude</code> du premier appel, on construit l'URL météo avec ces valeurs, puis on fait un <strong>deuxième <code>await fetch</code></strong>. Le tout reste lisible de haut en bas.",
        en: "Thanks to <code>async</code>/<code>await</code>, chaining two requests is as simple as writing two lines. We get the <code>latitude</code> and <code>longitude</code> from the first call, build the weather URL with those values, then do a <strong>second <code>await fetch</code></strong>. Everything stays readable from top to bottom."
      },
      explication: {
        fr: "L'API météo Open-Meteo s'appelle avec l'URL <code>https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m,weather_code&timezone=auto</code>. Elle renvoie un objet dont on lit <code>current.temperature_2m</code> (nombre décimal, en °C) et <code>current.weather_code</code> (code WMO décrivant les conditions). Les coordonnées viennent directement de <code>data.results[0].latitude</code> et <code>data.results[0].longitude</code>.",
        en: "The Open-Meteo weather API is called with the URL <code>https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m,weather_code&timezone=auto</code>. It returns an object from which we read <code>current.temperature_2m</code> (decimal number, in °C) and <code>current.weather_code</code> (WMO code describing conditions). The coordinates come directly from <code>data.results[0].latitude</code> and <code>data.results[0].longitude</code>."
      },
      illustration: "api-flow",
      exemple: {
        code: "async function obtenirMeteo(ville) {\n  // --- Requête 1 : géocodage ---\n  const urlGeo = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n  const repGeo = await fetch(urlGeo);\n  const geo = await repGeo.json();\n\n  const lat = geo.results[0].latitude;   // ex : 48.85341\n  const lon = geo.results[0].longitude;  // ex : 2.3488\n\n  // --- Requête 2 : météo ---\n  const urlMeteo = \"https://api.open-meteo.com/v1/forecast?latitude=\" + lat\n    + \"&longitude=\" + lon\n    + \"&current=temperature_2m,weather_code&timezone=auto\";\n  const repMeteo = await fetch(urlMeteo);\n  const meteo = await repMeteo.json();\n\n  console.log(\"Température :\", meteo.current.temperature_2m, \"°C\");\n  console.log(\"Code météo :\", meteo.current.weather_code);\n}\n\nobtenirMeteo(\"Paris\");",
        langage: "js",
        commentaire: {
          fr: "On utilise <code>lat</code> et <code>lon</code> obtenus à l'étape 1 pour construire l'URL de l'étape 2. Les deux <code>await</code> rendent l'enchaînement aussi simple à lire que du code synchrone.",
          en: "We use <code>lat</code> and <code>lon</code> obtained in step 1 to build the URL for step 2. The two <code>await</code> calls make the chain as easy to read as synchronous code."
        }
      },
      exercice: {
        enonce: {
          fr: "Complète la fonction <code>obtenirMeteo</code> : après avoir récupéré la latitude et la longitude via le géocodage, fais un deuxième <code>await fetch</code> vers l'API météo et affiche la <strong>température actuelle</strong> dans la console.",
          en: "Complete the <code>obtenirMeteo</code> function: after retrieving latitude and longitude via geocoding, make a second <code>await fetch</code> to the weather API and log the <strong>current temperature</strong> to the console."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Deux requêtes</title>\n</head>\n<body>\n  <h2>Exercice : géocodage + météo</h2>\n  <p>Ouvre la console (F12) pour voir la température.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "async function obtenirMeteo(ville) {\n  // Requête 1 : géocodage\n  const urlGeo = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n  const repGeo = await fetch(urlGeo);\n  const geo = await repGeo.json();\n\n  const lat = geo.results[0].latitude;\n  const lon = geo.results[0].longitude;\n  console.log(\"Coordonnées :\", lat, lon);\n\n  // Requête 2 : météo\n  // Construis l'URL avec lat et lon\n  const urlMeteo = /* ... */;\n\n  // Fais le fetch et convertis en JSON\n  const repMeteo = await /* ... */;\n  const meteo = await /* ... */;\n\n  // Affiche la température\n  console.log(\"Température :\", /* meteo.current... */, \"°C\");\n}\n\nobtenirMeteo(\"Berlin\");"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Deux requêtes</title>\n</head>\n<body>\n  <h2>Exercice : géocodage + météo</h2>\n  <p>Ouvre la console (F12) pour voir la température.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "async function obtenirMeteo(ville) {\n  // Requête 1 : géocodage\n  const urlGeo = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n  const repGeo = await fetch(urlGeo);\n  const geo = await repGeo.json();\n\n  const lat = geo.results[0].latitude;\n  const lon = geo.results[0].longitude;\n  console.log(\"Coordonnées :\", lat, lon);\n\n  // Requête 2 : météo\n  const urlMeteo = \"https://api.open-meteo.com/v1/forecast?latitude=\" + lat\n    + \"&longitude=\" + lon\n    + \"&current=temperature_2m,weather_code&timezone=auto\";\n  const repMeteo = await fetch(urlMeteo);\n  const meteo = await repMeteo.json();\n\n  console.log(\"Température :\", meteo.current.temperature_2m, \"°C\");\n  console.log(\"Code météo :\", meteo.current.weather_code);\n}\n\nobtenirMeteo(\"Berlin\");"
        },
        verification: [
          { fichier: "js", contient: "open-meteo.com/v1/forecast", message: { fr: "Construis l'URL de l'API météo avec api.open-meteo.com/v1/forecast.", en: "Build the weather API URL with api.open-meteo.com/v1/forecast." } },
          { fichier: "js", contient: "meteo.current.temperature_2m", message: { fr: "Affiche la température avec meteo.current.temperature_2m.", en: "Log the temperature with meteo.current.temperature_2m." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Quelles données du géocodage servent à appeler l'API météo ?",
            en: "Which data from geocoding is used to call the weather API?"
          },
          options: [
            { fr: "Le nom de la ville et le code pays", en: "The city name and the country code" },
            { fr: "La latitude et la longitude", en: "The latitude and the longitude" },
            { fr: "Le fuseau horaire et la population", en: "The timezone and the population" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "L'API météo Open-Meteo exige les coordonnées GPS (<code>latitude</code> et <code>longitude</code>) en paramètres d'URL. On les obtient dans la réponse du géocodage, à <code>results[0].latitude</code> et <code>results[0].longitude</code>.",
            en: "The Open-Meteo weather API requires GPS coordinates (<code>latitude</code> and <code>longitude</code>) as URL parameters. We obtain them from the geocoding response at <code>results[0].latitude</code> and <code>results[0].longitude</code>."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },

    // ─── Étape 4 ────────────────────────────────────────────────────────────────
    {
      titre: { fr: "Gérer les erreurs (ville introuvable, réseau)", en: "Handling errors (city not found, network)" },
      besoin: {
        fr: "Que se passe-t-il si l'utilisateur tape une ville qui n'existe pas, ou si le réseau est coupé ? Sans gestion d'erreur, le programme <strong>plante</strong> avec une exception. Il faut l'en empêcher.",
        en: "What happens if the user types a city that does not exist, or the network is down? Without error handling, the program <strong>crashes</strong> with an exception. We need to prevent that."
      },
      decouverte: {
        fr: "Le bloc <code>try { ... } catch (e) { ... }</code> entoure le code risqué. Si une erreur survient dans le <code>try</code>, JavaScript saute directement au <code>catch</code> au lieu de planter. On peut aussi tester si l'API a renvoyé des résultats : <code>if (!data.results)</code> signifie que la ville n'a pas été trouvée.",
        en: "The <code>try { ... } catch (e) { ... }</code> block wraps the risky code. If an error occurs inside <code>try</code>, JavaScript jumps straight to <code>catch</code> instead of crashing. We can also check whether the API returned results: <code>if (!data.results)</code> means the city was not found."
      },
      explication: {
        fr: "Il y a deux types de problèmes à gérer : une <strong>erreur réseau</strong> (pas de connexion, serveur indisponible) que <code>catch</code> attrape automatiquement, et une <strong>ville introuvable</strong> (l'API répond mais sans résultats) qu'on détecte avec <code>if (!data.results)</code> avant d'accéder à <code>results[0]</code>. Dans les deux cas, on affiche un message clair à l'utilisateur au lieu de laisser la page se bloquer.",
        en: "There are two types of problems to handle: a <strong>network error</strong> (no connection, server unavailable) that <code>catch</code> catches automatically, and a <strong>city not found</strong> case (the API responds but with no results) detected with <code>if (!data.results)</code> before accessing <code>results[0]</code>. In both cases, we display a clear message to the user instead of letting the page crash."
      },
      illustration: null,
      exemple: {
        code: "async function obtenirMeteo(ville) {\n  try {\n    // Requête 1 : géocodage\n    const urlGeo = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n    const repGeo = await fetch(urlGeo);\n    const geo = await repGeo.json();\n\n    // Vérifie que la ville a été trouvée\n    if (!geo.results) {\n      console.log(\"Ville introuvable :\", ville);\n      return; // sort de la fonction sans planter\n    }\n\n    const lat = geo.results[0].latitude;\n    const lon = geo.results[0].longitude;\n\n    // Requête 2 : météo\n    const urlMeteo = \"https://api.open-meteo.com/v1/forecast?latitude=\" + lat\n      + \"&longitude=\" + lon\n      + \"&current=temperature_2m,weather_code&timezone=auto\";\n    const repMeteo = await fetch(urlMeteo);\n    const meteo = await repMeteo.json();\n\n    console.log(\"Température :\", meteo.current.temperature_2m, \"°C\");\n\n  } catch (e) {\n    // Erreur réseau ou autre problème inattendu\n    console.log(\"Erreur réseau :\", e.message);\n  }\n}\n\nobtenirMeteo(\"Paris\");      // fonctionne\nobtenirMeteo(\"ZzZzZzZzZz\"); // ville introuvable",
        langage: "js",
        commentaire: {
          fr: "<code>try</code>/<code>catch</code> attrape les erreurs réseau. Le <code>if (!geo.results)</code> gère le cas « ville introuvable » avant qu'on tente d'accéder à <code>results[0]</code> (ce qui planterait).",
          en: "<code>try</code>/<code>catch</code> catches network errors. The <code>if (!geo.results)</code> handles the \"city not found\" case before we try to access <code>results[0]</code> (which would crash)."
        }
      },
      exercice: {
        enonce: {
          fr: "Entoure la logique fetch dans un bloc <code>try { ... } catch (e) { ... }</code>. Ajoute la vérification <code>if (!data.results)</code> pour afficher <code>\"Ville introuvable\"</code> dans la div <code>#message</code>. Teste avec une ville réelle (ex: « Tokyo ») puis avec un nom inventé (ex: « ZzZzZz »).",
          en: "Wrap the fetch logic in a <code>try { ... } catch (e) { ... }</code> block. Add the <code>if (!data.results)</code> check to display <code>\"Ville introuvable\"</code> in the <code>#message</code> div. Test with a real city (e.g. « Tokyo ») then with a made-up name (e.g. « ZzZzZz »)."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Gestion des erreurs</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #message { margin-top: 12px; padding: 10px; border-radius: 6px; background: #f0f4ff; }\n    .erreur { background: #ffe0e0; color: #c0392b; }\n  </style>\n</head>\n<body>\n  <h2>Exercice : gestion des erreurs</h2>\n  <input id=\"ville\" type=\"text\" placeholder=\"Nom de la ville\" value=\"Tokyo\">\n  <button onclick=\"charger()\">Chercher</button>\n  <div id=\"message\">En attente…</div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "async function charger() {\n  const ville = document.querySelector(\"#ville\").value;\n  const msg = document.querySelector(\"#message\");\n\n  // Entoure le code ci-dessous avec try { ... } catch (e) { ... }\n\n    const urlGeo = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n    const repGeo = await fetch(urlGeo);\n    const data = await repGeo.json();\n\n    // Ajoute ici la vérification if (!data.results)\n\n    const lat = data.results[0].latitude;\n    const lon = data.results[0].longitude;\n\n    const urlMeteo = \"https://api.open-meteo.com/v1/forecast?latitude=\" + lat\n      + \"&longitude=\" + lon + \"&current=temperature_2m,weather_code&timezone=auto\";\n    const repMeteo = await fetch(urlMeteo);\n    const meteo = await repMeteo.json();\n\n    msg.className = \"\";\n    msg.textContent = data.results[0].name + \" : \" + meteo.current.temperature_2m + \" °C\";\n}"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Gestion des erreurs</title>\n  <style>\n    body { font-family: sans-serif; padding: 16px; }\n    #message { margin-top: 12px; padding: 10px; border-radius: 6px; background: #f0f4ff; }\n    .erreur { background: #ffe0e0; color: #c0392b; }\n  </style>\n</head>\n<body>\n  <h2>Exercice : gestion des erreurs</h2>\n  <input id=\"ville\" type=\"text\" placeholder=\"Nom de la ville\" value=\"Tokyo\">\n  <button onclick=\"charger()\">Chercher</button>\n  <div id=\"message\">En attente…</div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "async function charger() {\n  const ville = document.querySelector(\"#ville\").value;\n  const msg = document.querySelector(\"#message\");\n\n  try {\n    const urlGeo = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n    const repGeo = await fetch(urlGeo);\n    const data = await repGeo.json();\n\n    if (!data.results) {\n      msg.className = \"erreur\";\n      msg.textContent = \"Ville introuvable : \" + ville;\n      return;\n    }\n\n    const lat = data.results[0].latitude;\n    const lon = data.results[0].longitude;\n\n    const urlMeteo = \"https://api.open-meteo.com/v1/forecast?latitude=\" + lat\n      + \"&longitude=\" + lon + \"&current=temperature_2m,weather_code&timezone=auto\";\n    const repMeteo = await fetch(urlMeteo);\n    const meteo = await repMeteo.json();\n\n    msg.className = \"\";\n    msg.textContent = data.results[0].name + \" : \" + meteo.current.temperature_2m + \" °C\";\n\n  } catch (e) {\n    msg.className = \"erreur\";\n    msg.textContent = \"Erreur réseau : \" + e.message;\n  }\n}"
        },
        verification: [
          { fichier: "js", contient: "try {", message: { fr: "Entoure le code fetch dans un bloc try { ... }.", en: "Wrap the fetch code in a try { ... } block." } },
          { fichier: "js", contient: "catch (e)", message: { fr: "Ajoute un catch (e) pour gérer les erreurs réseau.", en: "Add a catch (e) to handle network errors." } },
          { fichier: "js", contient: "if (!data.results)", message: { fr: "Vérifie si la ville existe avec if (!data.results).", en: "Check whether the city exists with if (!data.results)." } }
        ]
      },
      application: {
        fr: "Les cartes du tableau de bord affichent maintenant la <strong>vraie température</strong> et les conditions météo, récupérées en temps réel. Les erreurs (ville introuvable, réseau indisponible) sont gérées proprement sans planter la page. Le prochain module ajoute l'heure locale, la persistance des villes et la touche finale de style.",
        en: "The dashboard cards now display the <strong>real temperature</strong> and weather conditions, fetched live. Errors (city not found, network unavailable) are handled cleanly without crashing the page. The next module adds local time, city persistence, and final styling polish."
      },
      quiz: [
        {
          type: "vraifaux",
          question: {
            fr: "<code>try...catch</code> permet de gérer les erreurs sans planter le programme.",
            en: "<code>try...catch</code> allows handling errors without crashing the program."
          },
          bonneReponse: true,
          explication: {
            fr: "Vrai. Le bloc <code>try...catch</code> intercepte les erreurs qui surviennent dans le <code>try</code> et les traite dans le <code>catch</code>, ce qui empêche le programme de s'arrêter brutalement.",
            en: "True. The <code>try...catch</code> block intercepts errors that occur in <code>try</code> and handles them in <code>catch</code>, preventing the program from crashing abruptly."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
