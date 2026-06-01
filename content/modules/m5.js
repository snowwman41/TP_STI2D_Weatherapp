export const m5 = {
  titre: { fr: "Chercher des données — API, JSON, fetch", en: "Fetching data — API, JSON, fetch" },
  etapes: [
    {
      titre: { fr: "Qu'est-ce qu'une API ?", en: "What is an API?" },
      rappel: { fr: "Tes cartes s'affichent avec des données fictives. Ici tu vas chercher de <strong>vraies données en ligne</strong> (pays, drapeau) grâce à une <strong>API</strong>.",
                en: "Your cards show placeholder data. Here you'll fetch <strong>real online data</strong> (country, flag) using an <strong>API</strong>." },
      besoin: {
        fr: "Nos cartes affichent encore des tirets à la place du pays et de la météo. Pour obtenir de vraies données, il faut <strong>interroger un service en ligne</strong> — c'est exactement ce que fait une API.",
        en: "Our cards still show dashes instead of the country and weather. To get real data, we need to <strong>query an online service</strong> — that is exactly what an API does."
      },
      decouverte: {
        fr: "Une <strong>API</strong> (Application Programming Interface) est un service accessible via une URL. On lui envoie une <strong>requête</strong> (une URL avec des paramètres) et elle nous renvoie une <strong>réponse</strong> avec des données. C'est comme un serveur dans un restaurant : tu commandes (requête), il t'apporte le plat (réponse).",
        en: "An <strong>API</strong> (Application Programming Interface) is a service accessible via a URL. You send it a <strong>request</strong> (a URL with parameters) and it sends back a <strong>response</strong> with data. Think of a restaurant waiter: you order (request), they bring your dish (response)."
      },
      explication: {
        fr: "L'URL d'une API ressemble à une adresse web ordinaire, mais elle inclut des <strong>paramètres</strong> après le <code>?</code>. Par exemple, <code>?name=Paris&amp;count=1</code> indique au service qu'on cherche « Paris » et qu'on veut 1 résultat. Changer <code>name=Paris</code> en <code>name=Tokyo</code> interroge le même service pour une ville différente.",
        en: "An API URL looks like a regular web address, but it includes <strong>parameters</strong> after the <code>?</code>. For example, <code>?name=Paris&amp;count=1</code> tells the service we are looking for « Paris » and want 1 result. Changing <code>name=Paris</code> to <code>name=Tokyo</code> queries the same service for a different city."
      },
      illustration: "api-flow",
      exemple: {
        code: "// URL de l'API de géocodage Open-Meteo\n// Elle accepte un paramètre 'name' pour la ville\nconst url = \"https://geocoding-api.open-meteo.com/v1/search?name=Paris&count=1&language=fr\";\n\n// Pour chercher Tokyo, on change juste le paramètre :\nconst urlTokyo = \"https://geocoding-api.open-meteo.com/v1/search?name=Tokyo&count=1&language=fr\";\n\nconsole.log(url);\nconsole.log(urlTokyo);",
        langage: "js",
        commentaire: {
          fr: "L'URL contient des paramètres séparés par <code>&amp;</code>. Ici <code>name</code> est la ville, <code>count=1</code> limite à 1 résultat, <code>language=fr</code> renvoie les noms en français.",
          en: "The URL contains parameters separated by <code>&amp;</code>. Here <code>name</code> is the city, <code>count=1</code> limits to 1 result, <code>language=fr</code> returns names in French."
        }
      },
      exercice: {
        enonce: {
          fr: "Complète la variable <code>url</code> pour interroger l'API de géocodage avec la ville de ton choix (par exemple « Lyon » ou « Berlin »). Change uniquement le paramètre <code>name=</code>. Affiche l'URL dans la console et observe sa structure.",
          en: "Complete the <code>url</code> variable to query the geocoding API for a city of your choice (e.g. « Lyon » or « Berlin »). Only change the <code>name=</code> parameter. Log the URL to the console and observe its structure."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Explorer une URL d'API</title>\n</head>\n<body>\n  <h2>Exercice : lire une URL d'API</h2>\n  <p>Ouvre la console (F12) pour voir le résultat.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// Modifie le paramètre name= pour choisir ta ville\nconst url = \"https://geocoding-api.open-meteo.com/v1/search?name=Paris&count=1&language=fr\";\n\n// Affiche l'URL dans la console\nconsole.log(\"URL construite :\", url);\n\n// Bonus : affiche chaque paramètre séparément\nconst params = new URL(url).searchParams;\nconsole.log(\"Ville recherchée :\", params.get(\"name\"));\nconsole.log(\"Nombre de résultats :\", params.get(\"count\"));"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Explorer une URL d'API</title>\n</head>\n<body>\n  <h2>Exercice : lire une URL d'API</h2>\n  <p>Ouvre la console (F12) pour voir le résultat.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// On change name=Paris en name=Lyon\nconst url = \"https://geocoding-api.open-meteo.com/v1/search?name=Lyon&count=1&language=fr\";\n\nconsole.log(\"URL construite :\", url);\n\nconst params = new URL(url).searchParams;\nconsole.log(\"Ville recherchée :\", params.get(\"name\")); // \"Lyon\"\nconsole.log(\"Nombre de résultats :\", params.get(\"count\")); // \"1\""
        },
        verification: [
          { fichier: "js", contient: "searchParams", message: { fr: "Utilise new URL(url).searchParams pour lire les paramètres de l'URL.", en: "Use new URL(url).searchParams to read the URL parameters." } },
          { fichier: "js", contient: "params.get(\"name\")", message: { fr: "Utilise params.get(\"name\") pour afficher la ville recherchée.", en: "Use params.get(\"name\") to display the searched city." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Qu'est-ce qu'une API ?",
            en: "What is an API?"
          },
          options: [
            { fr: "Un langage de programmation pour créer des sites web", en: "A programming language for creating websites" },
            { fr: "Un service en ligne qu'on interroge pour obtenir des données", en: "An online service you query to get data" },
            { fr: "Un fichier de style CSS pour mettre en forme une page", en: "A CSS style file for formatting a page" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "Une API est un service en ligne que l'on interroge via une URL. On envoie une requête avec des paramètres, et le service renvoie des données en retour.",
            en: "An API is an online service you query via a URL. You send a request with parameters, and the service returns data in response."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Le format JSON", en: "The JSON format" },
      besoin: {
        fr: "L'API nous répond — mais dans quel format ? Il faut comprendre comment les données sont structurées pour pouvoir les lire et les utiliser dans notre code.",
        en: "The API responds to us — but in what format? We need to understand how the data is structured to be able to read and use it in our code."
      },
      decouverte: {
        fr: "Les APIs web répondent en <strong>JSON</strong> (JavaScript Object Notation). C'est un format texte qui ressemble aux objets JavaScript : des <strong>objets</strong> entre accolades <code>{ }</code> avec des paires clé/valeur, et des <strong>tableaux</strong> entre crochets <code>[ ]</code>. On accède aux valeurs avec la notation pointée (<code>.propriete</code>) ou les crochets (<code>[index]</code>).",
        en: "Web APIs respond in <strong>JSON</strong> (JavaScript Object Notation). It is a text format that looks like JavaScript objects: <strong>objects</strong> in curly braces <code>{ }</code> with key/value pairs, and <strong>arrays</strong> in square brackets <code>[ ]</code>. You access values with dot notation (<code>.property</code>) or brackets (<code>[index]</code>)."
      },
      explication: {
        fr: "L'API de géocodage renvoie un objet avec une propriété <code>results</code> qui est un tableau. Le premier résultat se trouve à <code>results[0]</code> et contient des propriétés comme <code>name</code>, <code>country</code>, <code>latitude</code>, <code>longitude</code> et <code>country_code</code>. On lit ces valeurs avec le <strong>point</strong> : <code>data.results[0].country</code>.",
        en: "The geocoding API returns an object with a <code>results</code> property that is an array. The first result is at <code>results[0]</code> and contains properties like <code>name</code>, <code>country</code>, <code>latitude</code>, <code>longitude</code>, and <code>country_code</code>. We read these values with the <strong>dot</strong>: <code>data.results[0].country</code>."
      },
      illustration: null,
      exemple: {
        code: "// Exemple de réponse JSON de l'API de géocodage\nconst data = {\n  \"results\": [\n    {\n      \"name\": \"Paris\",\n      \"latitude\": 48.85341,\n      \"longitude\": 2.3488,\n      \"country\": \"France\",\n      \"country_code\": \"FR\",\n      \"timezone\": \"Europe/Paris\"\n    }\n  ]\n};\n\n// Accéder aux valeurs avec la notation pointée\nconsole.log(data.results[0].name);        // \"Paris\"\nconsole.log(data.results[0].country);     // \"France\"\nconsole.log(data.results[0].latitude);    // 48.85341\nconsole.log(data.results[0].country_code); // \"FR\"",
        langage: "js",
        commentaire: {
          fr: "<code>data.results</code> est le tableau, <code>[0]</code> prend le premier élément, puis <code>.country</code> lit la propriété souhaitée.",
          en: "<code>data.results</code> is the array, <code>[0]</code> takes the first element, then <code>.country</code> reads the desired property."
        }
      },
      exercice: {
        enonce: {
          fr: "À partir de l'objet <code>data</code> fourni (qui simule une réponse de l'API), affiche dans la console : le pays (<code>country</code>), la latitude (<code>latitude</code>) et le code pays (<code>country_code</code>) du premier résultat.",
          en: "From the provided <code>data</code> object (which simulates an API response), log to the console: the country (<code>country</code>), the latitude (<code>latitude</code>), and the country code (<code>country_code</code>) of the first result."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Lire du JSON</title>\n</head>\n<body>\n  <h2>Exercice : lire des données JSON</h2>\n  <p>Ouvre la console (F12) pour voir le résultat.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// Données JSON simulées (comme l'API les renverrait)\nconst data = {\n  results: [\n    {\n      name: \"Berlin\",\n      latitude: 52.52437,\n      longitude: 13.41053,\n      country: \"Allemagne\",\n      country_code: \"DE\",\n      timezone: \"Europe/Berlin\"\n    }\n  ]\n};\n\n// Affiche le pays dans la console\nconsole.log(\"Pays :\", /* ... */);\n\n// Affiche la latitude\nconsole.log(\"Latitude :\", /* ... */);\n\n// Affiche le code pays\nconsole.log(\"Code pays :\", /* ... */);"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Lire du JSON</title>\n</head>\n<body>\n  <h2>Exercice : lire des données JSON</h2>\n  <p>Ouvre la console (F12) pour voir le résultat.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const data = {\n  results: [\n    {\n      name: \"Berlin\",\n      latitude: 52.52437,\n      longitude: 13.41053,\n      country: \"Allemagne\",\n      country_code: \"DE\",\n      timezone: \"Europe/Berlin\"\n    }\n  ]\n};\n\nconsole.log(\"Pays :\", data.results[0].country);      // \"Allemagne\"\nconsole.log(\"Latitude :\", data.results[0].latitude);  // 52.52437\nconsole.log(\"Code pays :\", data.results[0].country_code); // \"DE\""
        },
        verification: [
          { fichier: "js", contient: "data.results[0].country", message: { fr: "Accède au pays avec data.results[0].country.", en: "Access the country with data.results[0].country." } },
          { fichier: "js", contient: "data.results[0].country_code", message: { fr: "Accède au code pays avec data.results[0].country_code.", en: "Access the country code with data.results[0].country_code." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quel symbole ouvre un objet en JSON ?",
            en: "Which symbol opens an object in JSON?"
          },
          bonneReponse: "{",
          explication: {
            fr: "En JSON, un objet commence par <code>{</code> et se termine par <code>}</code>. Il contient des paires clé/valeur séparées par des virgules.",
            en: "In JSON, an object opens with <code>{</code> and closes with <code>}</code>. It contains key/value pairs separated by commas."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Aller chercher les données avec fetch", en: "Fetching data with fetch" },
      besoin: {
        fr: "On sait lire du JSON, on comprend les URLs d'API — maintenant il faut <strong>vraiment appeler l'API</strong> depuis JavaScript pour obtenir des données réelles en temps réel.",
        en: "We know how to read JSON and understand API URLs — now we need to <strong>actually call the API</strong> from JavaScript to get real live data."
      },
      decouverte: {
        fr: "<code>fetch(url)</code> envoie une requête à l'URL donnée et retourne une <strong>promesse</strong>. On enchaîne deux <code>.then()</code> : le premier convertit la réponse en JSON (<code>r.json()</code>), le second reçoit les données exploitables. Cette syntaxe <code>.then().then()</code> permet d'exécuter du code <strong>une fois les données arrivées</strong>.",
        en: "<code>fetch(url)</code> sends a request to the given URL and returns a <strong>promise</strong>. We chain two <code>.then()</code> calls: the first converts the response to JSON (<code>r.json()</code>), the second receives the usable data. This <code>.then().then()</code> syntax lets us run code <strong>once the data has arrived</strong>."
      },
      explication: {
        fr: "Un appel réseau prend du temps — le navigateur ne peut pas bloquer toute la page pour attendre la réponse. <code>fetch</code> est donc <em>asynchrone</em> : le code continue à s'exécuter, et le <code>.then()</code> est déclenché automatiquement quand les données sont prêtes. C'est pourquoi on ne peut pas mettre le résultat dans une variable ordinaire et l'utiliser sur la ligne suivante.",
        en: "A network call takes time — the browser cannot freeze the whole page waiting for a response. <code>fetch</code> is therefore <em>asynchronous</em>: code keeps running, and the <code>.then()</code> is triggered automatically when data is ready. That is why you cannot store the result in a regular variable and use it on the next line."
      },
      illustration: "fetch-timeline",
      exemple: {
        code: "const url = \"https://geocoding-api.open-meteo.com/v1/search?name=Paris&count=1&language=fr\";\n\nfetch(url)\n  .then(function(reponse) {\n    return reponse.json(); // Convertit la réponse en objet JS\n  })\n  .then(function(data) {\n    // data contient maintenant les données de l'API\n    console.log(data);\n    console.log(data.results[0].name);    // \"Paris\"\n    console.log(data.results[0].country); // \"France\"\n  });",
        langage: "js",
        commentaire: {
          fr: "Le premier <code>.then</code> transforme la réponse brute en objet JavaScript. Le second <code>.then</code> reçoit cet objet et permet d'utiliser les données.",
          en: "The first <code>.then</code> transforms the raw response into a JavaScript object. The second <code>.then</code> receives that object and lets us use the data."
        }
      },
      exercice: {
        enonce: {
          fr: "Utilise <code>fetch</code> pour interroger l'API de géocodage avec une ville de ton choix. Dans le second <code>.then</code>, affiche dans la console le premier résultat complet (<code>data.results[0]</code>), puis le nom et le pays séparément.",
          en: "Use <code>fetch</code> to query the geocoding API for a city of your choice. In the second <code>.then</code>, log to the console the full first result (<code>data.results[0]</code>), then the name and country separately."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Premier fetch</title>\n</head>\n<body>\n  <h2>Mon premier fetch</h2>\n  <p>Ouvre la console (F12) pour voir les données de l'API.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// Change 'Madrid' par une ville de ton choix\nconst ville = \"Madrid\";\nconst url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n\nfetch(url)\n  .then(function(reponse) {\n    return reponse.json();\n  })\n  .then(function(data) {\n    // Affiche le premier résultat complet\n    console.log(data.results[0]);\n\n    // Affiche le nom et le pays séparément\n    // ...\n    // ...\n  });"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Premier fetch</title>\n</head>\n<body>\n  <h2>Mon premier fetch</h2>\n  <p>Ouvre la console (F12) pour voir les données de l'API.</p>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const ville = \"Madrid\";\nconst url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n\nfetch(url)\n  .then(function(reponse) {\n    return reponse.json();\n  })\n  .then(function(data) {\n    console.log(data.results[0]);\n    console.log(\"Nom :\", data.results[0].name);    // \"Madrid\"\n    console.log(\"Pays :\", data.results[0].country); // \"Espagne\"\n  });"
        },
        verification: [
          { fichier: "js", contient: "fetch(url)", message: { fr: "Utilise fetch(url) pour envoyer la requête à l'API.", en: "Use fetch(url) to send the request to the API." } },
          { fichier: "js", contient: "reponse.json()", message: { fr: "Convertis la réponse en JSON avec reponse.json() dans le premier .then.", en: "Convert the response to JSON with reponse.json() in the first .then." } },
          { fichier: "js", contient: "data.results[0].country", message: { fr: "Affiche le pays avec data.results[0].country.", en: "Log the country with data.results[0].country." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "vraifaux",
          question: {
            fr: "<code>fetch</code> permet de récupérer des données depuis un serveur distant.",
            en: "<code>fetch</code> allows retrieving data from a remote server."
          },
          bonneReponse: true,
          explication: {
            fr: "Vrai. <code>fetch</code> est la fonction JavaScript standard pour envoyer des requêtes réseau et récupérer des données depuis un serveur distant, comme une API.",
            en: "True. <code>fetch</code> is the standard JavaScript function for sending network requests and retrieving data from a remote server, such as an API."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Afficher le pays et le drapeau", en: "Displaying the country and flag" },
      besoin: {
        fr: "On sait récupérer les données — maintenant il faut les <strong>afficher dans la carte</strong> : le nom du pays et son drapeau, grâce au code pays renvoyé par l'API.",
        en: "We know how to fetch data — now we need to <strong>display it in the card</strong>: the country name and its flag, using the country code returned by the API."
      },
      decouverte: {
        fr: "L'API renvoie un <code>country_code</code> comme <code>\"FR\"</code> ou <code>\"DE\"</code>. Le service <strong>flagcdn.com</strong> fournit des drapeaux SVG à partir d'un code pays en minuscules : <code>https://flagcdn.com/fr.svg</code>. On combine <code>country_code.toLowerCase()</code> avec un template literal pour construire l'URL du drapeau, puis on insère une balise <code>&lt;img&gt;</code> dans la carte.",
        en: "The API returns a <code>country_code</code> like <code>\"FR\"</code> or <code>\"DE\"</code>. The <strong>flagcdn.com</strong> service provides SVG flags from a lowercase country code: <code>https://flagcdn.com/fr.svg</code>. We combine <code>country_code.toLowerCase()</code> with a template literal to build the flag URL, then insert an <code>&lt;img&gt;</code> tag into the card."
      },
      explication: {
        fr: "<code>toLowerCase()</code> est une méthode des chaînes de caractères qui convertit tous les caractères en minuscules. C'est nécessaire car <code>flagcdn.com</code> attend <code>fr</code>, pas <code>FR</code>. On construit l'URL avec un template literal : <code>`https://flagcdn.com/${code.toLowerCase()}.svg`</code>, puis on l'utilise comme attribut <code>src</code> d'une balise <code>&lt;img&gt;</code>.",
        en: "<code>toLowerCase()</code> is a string method that converts all characters to lowercase. This is necessary because <code>flagcdn.com</code> expects <code>fr</code>, not <code>FR</code>. We build the URL with a template literal: <code>`https://flagcdn.com/${code.toLowerCase()}.svg`</code>, then use it as the <code>src</code> attribute of an <code>&lt;img&gt;</code> tag."
      },
      illustration: null,
      exemple: {
        code: "const url = \"https://geocoding-api.open-meteo.com/v1/search?name=Tokyo&count=1&language=fr\";\n\nfetch(url)\n  .then(function(reponse) {\n    return reponse.json();\n  })\n  .then(function(data) {\n    const resultat = data.results[0];\n    const pays = resultat.country;       // \"Japon\"\n    const code = resultat.country_code;  // \"JP\"\n\n    // URL du drapeau : code en minuscules\n    const urlDrapeau = `https://flagcdn.com/${code.toLowerCase()}.svg`;\n\n    // Insérer dans la carte\n    const carte = document.querySelector(\"#carte\");\n    carte.innerHTML = `\n      <h2>${resultat.name}</h2>\n      <img src=\"${urlDrapeau}\" alt=\"Drapeau de ${pays}\" width=\"48\">\n      <p>${pays}</p>\n    `;\n  });",
        langage: "js",
        commentaire: {
          fr: "<code>country_code.toLowerCase()</code> transforme <code>\"JP\"</code> en <code>\"jp\"</code> pour construire l'URL du drapeau. On insère ensuite l'image et le pays dans le HTML de la carte.",
          en: "<code>country_code.toLowerCase()</code> transforms <code>\"JP\"</code> into <code>\"jp\"</code> to build the flag URL. We then insert the image and country name into the card's HTML."
        }
      },
      exercice: {
        enonce: {
          fr: "Utilise <code>fetch</code> pour interroger l'API de géocodage avec une ville de ton choix. Affiche dans la carte : le nom de la ville, le drapeau (image <code>&lt;img&gt;</code>) et le nom du pays. Le drapeau doit être construit avec <code>country_code.toLowerCase()</code> et l'URL <code>https://flagcdn.com/XX.svg</code>.",
          en: "Use <code>fetch</code> to query the geocoding API for a city of your choice. Display in the card: the city name, the flag (<code>&lt;img&gt;</code> tag), and the country name. The flag must be built with <code>country_code.toLowerCase()</code> and the URL <code>https://flagcdn.com/XX.svg</code>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Pays et drapeau</title>\n  <style>\n    .carte { border: 2px solid #4a6fa5; padding: 16px; border-radius: 8px; display: inline-block; min-width: 160px; background: #f0f4ff; font-family: sans-serif; }\n    .carte h2 { margin: 0 0 8px; color: #1a3a6b; }\n    .carte img { display: block; margin: 8px 0; }\n    .carte p { margin: 4px 0; color: #555; }\n  </style>\n</head>\n<body>\n  <div id=\"carte\" class=\"carte\">Chargement…</div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "// Change 'Lisbonne' par une ville de ton choix\nconst ville = \"Lisbonne\";\nconst url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n\nfetch(url)\n  .then(function(reponse) {\n    return reponse.json();\n  })\n  .then(function(data) {\n    const resultat = data.results[0];\n\n    // Récupère le pays et le code pays\n    const pays = /* ... */;\n    const code = /* ... */;\n\n    // Construit l'URL du drapeau\n    const urlDrapeau = /* `https://flagcdn.com/...` */;\n\n    // Met à jour le HTML de la carte\n    const carte = document.querySelector(\"#carte\");\n    carte.innerHTML = /* template literal avec nom, image, pays */;\n  });"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Pays et drapeau</title>\n  <style>\n    .carte { border: 2px solid #4a6fa5; padding: 16px; border-radius: 8px; display: inline-block; min-width: 160px; background: #f0f4ff; font-family: sans-serif; }\n    .carte h2 { margin: 0 0 8px; color: #1a3a6b; }\n    .carte img { display: block; margin: 8px 0; }\n    .carte p { margin: 4px 0; color: #555; }\n  </style>\n</head>\n<body>\n  <div id=\"carte\" class=\"carte\">Chargement…</div>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
          js: "const ville = \"Lisbonne\";\nconst url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n\nfetch(url)\n  .then(function(reponse) {\n    return reponse.json();\n  })\n  .then(function(data) {\n    const resultat = data.results[0];\n    const pays = resultat.country;      // \"Portugal\"\n    const code = resultat.country_code; // \"PT\"\n\n    const urlDrapeau = `https://flagcdn.com/${code.toLowerCase()}.svg`;\n\n    const carte = document.querySelector(\"#carte\");\n    carte.innerHTML = `\n      <h2>${resultat.name}</h2>\n      <img src=\"${urlDrapeau}\" alt=\"Drapeau de ${pays}\" width=\"48\">\n      <p>${pays}</p>\n    `;\n  });"
        },
        verification: [
          { fichier: "js", contient: "toLowerCase()", message: { fr: "Utilise .toLowerCase() sur le code pays pour construire l'URL du drapeau.", en: "Use .toLowerCase() on the country code to build the flag URL." } },
          { fichier: "js", contient: "flagcdn.com", message: { fr: "Construis l'URL du drapeau avec flagcdn.com.", en: "Build the flag URL using flagcdn.com." } },
          { fichier: "js", contient: "resultat.country_code", message: { fr: "Récupère le code pays avec resultat.country_code.", en: "Get the country code with resultat.country_code." } }
        ]
      },
      application: {
        fr: "Les cartes affichent maintenant le vrai nom du pays et son drapeau, récupérés en temps réel depuis l'API. Dans le module suivant, on ajoutera la température et les conditions météo !",
        en: "The cards now display the real country name and its flag, fetched live from the API. In the next module, we will add temperature and weather conditions!"
      },
      notepad: {
        fr: {
          fichier: "script.js",
          intro: "Remplace tout <code>script.js</code> par ce code qui crée une carte avec le vrai pays et drapeau :",
          code: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\nconst conteneur = document.querySelector(\"#cartes\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n  if (ville === \"\") return;\n\n  const url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n  fetch(url)\n    .then(function(r) { return r.json(); })\n    .then(function(data) {\n      const res = data.results[0];\n      const urlDrapeau = \"https://flagcdn.com/\" + res.country_code.toLowerCase() + \".svg\";\n      const carte = document.createElement(\"div\");\n      carte.className = \"carte\";\n      carte.innerHTML = `<h2>${res.name}</h2><img src=\"${urlDrapeau}\" alt=\"\" width=\"40\"><p>${res.country}</p><p>Météo : —</p>`;\n      conteneur.append(carte);\n    });\n\n  champ.value = \"\";\n});"
        },
        en: {
          fichier: "script.js",
          intro: "Replace all of <code>script.js</code> with this code that creates a card with real country and flag:",
          code: "const formulaire = document.querySelector(\"#form-ville\");\nconst champ = document.querySelector(\"#champ-ville\");\nconst conteneur = document.querySelector(\"#cartes\");\n\nformulaire.addEventListener(\"submit\", function(event) {\n  event.preventDefault();\n  const ville = champ.value;\n  if (ville === \"\") return;\n\n  const url = \"https://geocoding-api.open-meteo.com/v1/search?name=\" + ville + \"&count=1&language=fr\";\n  fetch(url)\n    .then(function(r) { return r.json(); })\n    .then(function(data) {\n      const res = data.results[0];\n      const urlDrapeau = \"https://flagcdn.com/\" + res.country_code.toLowerCase() + \".svg\";\n      const carte = document.createElement(\"div\");\n      carte.className = \"carte\";\n      carte.innerHTML = `<h2>${res.name}</h2><img src=\"${urlDrapeau}\" alt=\"\" width=\"40\"><p>${res.country}</p><p>Météo : —</p>`;\n      conteneur.append(carte);\n    });\n\n  champ.value = \"\";\n});"
        }
      },
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quelle propriété du résultat contient le code du pays (ex: \"FR\") ?",
            en: "Which property of the result contains the country code (e.g. \"FR\")?"
          },
          bonneReponse: "country_code",
          explication: {
            fr: "La propriété <code>country_code</code> contient le code ISO du pays en majuscules (ex: <code>\"FR\"</code> pour la France). On utilise <code>.toLowerCase()</code> pour le convertir en minuscules et construire l'URL du drapeau.",
            en: "The <code>country_code</code> property contains the ISO country code in uppercase (e.g. <code>\"FR\"</code> for France). We use <code>.toLowerCase()</code> to convert it to lowercase and build the flag URL."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
