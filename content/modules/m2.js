export const m2 = {
  titre: { fr: "Le style — CSS", en: "Style — CSS" },
  etapes: [
    {
      titre: { fr: "Cibler avec les sélecteurs", en: "Targeting with selectors" },
      rappel: { fr: "Tu sais écrire la <strong>structure</strong> d'une page en HTML. Maintenant tu vas l'<strong>habiller</strong> avec le CSS : couleurs, espacements et mise en page.",
                en: "You can write a page's HTML <strong>structure</strong>. Now you'll <strong>style</strong> it with CSS: colors, spacing and layout." },
      besoin: {
        fr: "Pour appliquer du style à un élément HTML, le CSS doit d'abord le <em>cibler</em>. Les sélecteurs sont les outils qui permettent de choisir quels éléments on veut styliser.",
        en: "To apply style to an HTML element, CSS must first <em>target</em> it. Selectors are the tools that let you choose which elements to style."
      },
      decouverte: {
        fr: "Il existe trois sélecteurs de base : le <strong>sélecteur d'élément</strong> (<code>h1</code>), le <strong>sélecteur de classe</strong> (<code>.carte</code>) et le <strong>sélecteur d'id</strong> (<code>#cartes</code>). La classe s'assigne avec l'attribut <code>class</code> en HTML.",
        en: "There are three basic selectors: the <strong>element selector</strong> (<code>h1</code>), the <strong>class selector</strong> (<code>.carte</code>), and the <strong>id selector</strong> (<code>#cartes</code>). A class is assigned with the <code>class</code> attribute in HTML."
      },
      explication: {
        fr: "Le sélecteur d'élément cible <strong>tous</strong> les éléments du même type (ex. : tous les <code>&lt;h1&gt;</code>). Le sélecteur de classe cible tous les éléments ayant <code>class=\"carte\"</code>. Le sélecteur d'id cible l'élément unique ayant <code>id=\"cartes\"</code>. Un élément peut avoir plusieurs classes séparées par des espaces : <code>class=\"carte active\"</code>.",
        en: "The element selector targets <strong>all</strong> elements of the same type (e.g. all <code>&lt;h1&gt;</code>). The class selector targets all elements with <code>class=\"carte\"</code>. The id selector targets the unique element with <code>id=\"cartes\"</code>. An element can have multiple space-separated classes: <code>class=\"carte active\"</code>."
      },
      illustration: null,
      exemple: {
        code: "/* Sélecteur d'élément */\nh1 { color: #0284c7; }\n\n/* Sélecteur de classe */\n.carte { background-color: white; }\n\n/* Sélecteur d'id */\n#cartes { padding: 16px; }",
        langage: "css",
        commentaire: {
          fr: "Les trois sélecteurs fondamentaux du CSS.",
          en: "The three fundamental CSS selectors."
        }
      },
      exercice: {
        enonce: {
          fr: "Colorie le <code>&lt;h1&gt;</code> en bleu (<code>#0284c7</code>) avec un sélecteur d'élément, et donne une <code>background-color</code> jaune clair (<code>#fef9c3</code>) aux éléments ayant la classe <code>carte</code>.",
          en: "Color the <code>&lt;h1&gt;</code> blue (<code>#0284c7</code>) with an element selector, and give a light yellow <code>background-color</code> (<code>#fef9c3</code>) to elements with the class <code>carte</code>."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Sélecteurs</title>\n</head>\n<body>\n  <h1>Tableau de bord des villes</h1>\n  <div class=\"carte\">Paris</div>\n  <div class=\"carte\">Tokyo</div>\n  <div>Pas une carte</div>\n</body>\n</html>",
          css: "/* Colorie le h1 en bleu #0284c7 */\n\n/* Donne un fond jaune clair #fef9c3 aux éléments .carte */\n"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Sélecteurs</title>\n</head>\n<body>\n  <h1>Tableau de bord des villes</h1>\n  <div class=\"carte\">Paris</div>\n  <div class=\"carte\">Tokyo</div>\n  <div>Pas une carte</div>\n</body>\n</html>",
          css: "h1 {\n  color: #0284c7;\n}\n\n.carte {\n  background-color: #fef9c3;\n}\n"
        },
        verification: [
          { fichier: "css", contient: "color: #0284c7", message: { fr: "Utilise color: #0284c7 sur le sélecteur h1.", en: "Use color: #0284c7 on the h1 selector." } },
          { fichier: "css", contient: ".carte", message: { fr: "Ajoute une règle CSS avec le sélecteur .carte.", en: "Add a CSS rule with the .carte selector." } },
          { fichier: "css", contient: "background-color: #fef9c3", message: { fr: "Utilise background-color: #fef9c3 sur .carte.", en: "Use background-color: #fef9c3 on .carte." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Que cible le sélecteur <code>.carte</code> ?",
            en: "What does the selector <code>.carte</code> target?"
          },
          options: [
            { fr: "L'élément dont l'id est \"carte\"", en: "The element whose id is \"carte\"" },
            { fr: "Les éléments qui ont class=\"carte\"", en: "Elements that have class=\"carte\"" },
            { fr: "Tous les éléments de la page", en: "All elements on the page" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "Le point (<code>.</code>) devant un nom indique un sélecteur de <strong>classe</strong>. Le dièse (<code>#</code>) est réservé aux ids.",
            en: "A dot (<code>.</code>) before a name means a <strong>class</strong> selector. The hash (<code>#</code>) is for ids."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Le box model", en: "The box model" },
      besoin: {
        fr: "Chaque élément HTML occupe une zone rectangulaire dans la page. Comprendre comment cette zone est construite permet de maîtriser l'espacement et les bordures.",
        en: "Every HTML element occupies a rectangular zone on the page. Understanding how this zone is built lets you control spacing and borders."
      },
      decouverte: {
        fr: "Le <strong>box model</strong> décrit les couches qui entourent le contenu d'un élément : <code>padding</code> (espace intérieur), <code>border</code> (bordure), et <code>margin</code> (espace extérieur entre éléments).",
        en: "The <strong>box model</strong> describes the layers surrounding an element's content: <code>padding</code> (inner space), <code>border</code> (the border itself), and <code>margin</code> (outer space between elements)."
      },
      explication: {
        fr: "<code>padding</code> crée de l'espace <strong>à l'intérieur</strong> de l'élément, entre le contenu et la bordure. <code>margin</code> crée de l'espace <strong>à l'extérieur</strong>, entre l'élément et ses voisins. <code>border</code> trace un trait autour de l'élément ; on précise son épaisseur, son style (<code>solid</code>, <code>dashed</code>…) et sa couleur.",
        en: "<code>padding</code> creates space <strong>inside</strong> the element, between the content and the border. <code>margin</code> creates space <strong>outside</strong>, between the element and its neighbors. <code>border</code> draws a line around the element; you specify its thickness, style (<code>solid</code>, <code>dashed</code>…) and color."
      },
      illustration: "box-model",
      exemple: {
        code: ".carte {\n  padding: 16px;          /* espace intérieur */\n  border: 2px solid #0284c7; /* bordure */\n  margin: 8px;            /* espace extérieur */\n}",
        langage: "css",
        commentaire: {
          fr: "Les trois propriétés du box model appliquées à une carte.",
          en: "The three box model properties applied to a card."
        }
      },
      exercice: {
        enonce: {
          fr: "Donne à la <code>.carte</code> un <code>padding</code> de <code>20px</code> et une <code>border</code> de <code>2px solid #0284c7</code>. Observe comment l'espace intérieur et la bordure apparaissent.",
          en: "Give the <code>.carte</code> a <code>padding</code> of <code>20px</code> and a <code>border</code> of <code>2px solid #0284c7</code>. Observe how the inner space and border appear."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Box model</title>\n</head>\n<body>\n  <div class=\"carte\">Paris — 18° ☀️</div>\n  <div class=\"carte\">Tokyo — 22° 🌤</div>\n</body>\n</html>",
          css: ".carte {\n  /* Ajoute padding: 20px; */\n  /* Ajoute border: 2px solid #0284c7; */\n  margin: 8px;\n  background-color: #f0f9ff;\n}\n"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Box model</title>\n</head>\n<body>\n  <div class=\"carte\">Paris — 18° ☀️</div>\n  <div class=\"carte\">Tokyo — 22° 🌤</div>\n</body>\n</html>",
          css: ".carte {\n  padding: 20px;\n  border: 2px solid #0284c7;\n  margin: 8px;\n  background-color: #f0f9ff;\n}\n"
        },
        verification: [
          { fichier: "css", contient: "padding: 20px", message: { fr: "Ajoute padding: 20px dans la règle .carte.", en: "Add padding: 20px inside the .carte rule." } },
          { fichier: "css", contient: "border: 2px solid", message: { fr: "Ajoute une propriété border (ex: border: 2px solid #0284c7) dans .carte.", en: "Add a border property (e.g. border: 2px solid #0284c7) inside .carte." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quelle propriété CSS crée de l'espace À L'INTÉRIEUR d'un élément ?",
            en: "Which CSS property creates space INSIDE an element?"
          },
          bonneReponse: "padding",
          explication: {
            fr: "<code>padding</code> est l'espace entre le contenu et la bordure. <code>margin</code>, lui, crée l'espace à l'extérieur.",
            en: "<code>padding</code> is the space between the content and the border. <code>margin</code> creates space on the outside."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Les couleurs en CSS", en: "Colors in CSS" },
      besoin: {
        fr: "Les couleurs sont partout dans une interface : texte, fond, bordures… CSS offre plusieurs façons de les exprimer, chacune ayant ses avantages.",
        en: "Colors are everywhere in an interface: text, backgrounds, borders… CSS offers several ways to express them, each with its own advantages."
      },
      decouverte: {
        fr: "On définit la couleur du texte avec <code>color</code> et celle du fond avec <code>background-color</code>. Il existe quatre façons d'écrire une couleur : <strong>nom</strong> (<code>tomato</code>), <strong>hexadécimal</strong> (<code>#0284c7</code>), <strong>rgb/rgba</strong> et <strong>hsl/hsla</strong>.",
        en: "Text color is set with <code>color</code> and background color with <code>background-color</code>. There are four ways to write a color: <strong>name</strong> (<code>tomato</code>), <strong>hexadecimal</strong> (<code>#0284c7</code>), <strong>rgb/rgba</strong>, and <strong>hsl/hsla</strong>."
      },
      explication: {
        fr: "<code>rgb(2, 132, 199)</code> mélange rouge, vert et bleu (0–255). <code>rgba()</code> ajoute un <strong>4ᵉ paramètre</strong> entre 0 et 1 qui règle la <strong>transparence</strong> (l'opacité) : 0 = invisible, 1 = opaque. <code>hsl()</code> utilise la teinte (0–360°), la saturation (%) et la luminosité (%). Ces formats sont interchangeables : ils décrivent la même couleur.",
        en: "<code>rgb(2, 132, 199)</code> mixes red, green and blue (0–255). <code>rgba()</code> adds a <strong>4th parameter</strong> between 0 and 1 that sets the <strong>transparency</strong> (opacity): 0 = invisible, 1 = opaque. <code>hsl()</code> uses hue (0–360°), saturation (%), and lightness (%). These formats are interchangeable: they describe the same color."
      },
      illustration: "color-formats",
      exemple: {
        code: "/* Quatre façons d'écrire le même bleu */\n.boite-1 { background-color: #0284c7; }          /* hex */\n.boite-2 { background-color: rgb(2, 132, 199); }  /* rgb */\n.boite-3 { background-color: rgba(2,132,199,0.4); } /* rgba : 40% opaque */\n.boite-4 { background-color: hsl(199, 98%, 39%); } /* hsl */",
        langage: "css",
        commentaire: {
          fr: "Quatre notations pour la même teinte de bleu.",
          en: "Four notations for the same shade of blue."
        }
      },
      exercice: {
        enonce: {
          fr: "Écris la même couleur bleue <code>#0ea5e9</code> de deux façons différentes : en hexadécimal sur <code>.boite-hex</code> et en <code>rgb()</code> sur <code>.boite-rgb</code> (équivalent : <code>rgb(14, 165, 233)</code>).",
          en: "Write the same blue <code>#0ea5e9</code> in two different ways: as hexadecimal on <code>.boite-hex</code> and as <code>rgb()</code> on <code>.boite-rgb</code> (equivalent: <code>rgb(14, 165, 233)</code>)."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Couleurs</title>\n</head>\n<body>\n  <div class=\"boite-hex\">Hex</div>\n  <div class=\"boite-rgb\">RGB</div>\n</body>\n</html>",
          css: ".boite-hex {\n  /* Ajoute background-color en hexadécimal #0ea5e9 */\n  color: white;\n  padding: 16px;\n  margin: 8px;\n}\n\n.boite-rgb {\n  /* Ajoute background-color en rgb(14, 165, 233) */\n  color: white;\n  padding: 16px;\n  margin: 8px;\n}\n"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Couleurs</title>\n</head>\n<body>\n  <div class=\"boite-hex\">Hex</div>\n  <div class=\"boite-rgb\">RGB</div>\n</body>\n</html>",
          css: ".boite-hex {\n  background-color: #0ea5e9;\n  color: white;\n  padding: 16px;\n  margin: 8px;\n}\n\n.boite-rgb {\n  background-color: rgb(14, 165, 233);\n  color: white;\n  padding: 16px;\n  margin: 8px;\n}\n"
        },
        verification: [
          { fichier: "css", contient: "background-color: #0ea5e9", message: { fr: "Ajoute background-color: #0ea5e9 sur .boite-hex.", en: "Add background-color: #0ea5e9 on .boite-hex." } },
          { fichier: "css", contient: "rgb(14, 165, 233)", message: { fr: "Ajoute background-color: rgb(14, 165, 233) sur .boite-rgb.", en: "Add background-color: rgb(14, 165, 233) on .boite-rgb." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "À quoi sert le 4ᵉ nombre dans <code>rgba(2,132,199,0.5)</code> ?",
            en: "What does the 4th number in <code>rgba(2,132,199,0.5)</code> do?"
          },
          options: [
            { fr: "À définir la nuance de bleu", en: "To define the shade of blue" },
            { fr: "À régler la transparence (l'opacité)", en: "To control the transparency (opacity)" },
            { fr: "À choisir la teinte (hue)", en: "To choose the hue" }
          ],
          bonneReponse: 1,
          explication: {
            fr: "Le 4ᵉ paramètre est le canal <strong>alpha</strong> : 0 = totalement transparent, 1 = totalement opaque. Ici 0.5 = semi-transparent.",
            en: "The 4th parameter is the <strong>alpha</strong> channel: 0 = fully transparent, 1 = fully opaque. Here 0.5 = semi-transparent."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Les dégradés — linear-gradient", en: "Gradients — linear-gradient" },
      besoin: {
        fr: "Une interface moderne utilise souvent des dégradés pour donner de la profondeur aux cartes et aux en-têtes. CSS permet d'en créer facilement sans image.",
        en: "A modern interface often uses gradients to give depth to cards and headers. CSS lets you create them easily without images."
      },
      decouverte: {
        fr: "La fonction <code>linear-gradient()</code> génère un dégradé entre plusieurs couleurs. On l'utilise comme valeur de <code>background</code>. On précise la direction et les couleurs : <code>background: linear-gradient(direction, couleur1, couleur2)</code>.",
        en: "The <code>linear-gradient()</code> function generates a gradient between several colors. It is used as a value for <code>background</code>. You specify the direction and colors: <code>background: linear-gradient(direction, color1, color2)</code>."
      },
      explication: {
        fr: "La direction peut être un mot-clé (<code>to right</code>, <code>to bottom right</code>) ou un angle en degrés (<code>135deg</code>). On peut ajouter des <strong>points d'arrêt</strong> pour contrôler où commence chaque couleur : <code>#6366f1 0%, #8b5cf6 100%</code>. Un dégradé peut mélanger plus de deux couleurs.",
        en: "The direction can be a keyword (<code>to right</code>, <code>to bottom right</code>) or an angle in degrees (<code>135deg</code>). You can add <strong>color stops</strong> to control where each color starts: <code>#6366f1 0%, #8b5cf6 100%</code>. A gradient can blend more than two colors."
      },
      illustration: "linear-gradient",
      exemple: {
        code: "/* Dégradé horizontal */\n.banniere {\n  background: linear-gradient(to right, #0ea5e9, #2563eb);\n}\n\n/* Dégradé diagonal avec points d'arrêt */\n.carte {\n  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);\n}\n\n/* Trois couleurs */\n.arc-en-ciel {\n  background: linear-gradient(to right, #f59e0b, #ef4444, #8b5cf6);\n}",
        langage: "css",
        commentaire: {
          fr: "Trois exemples de dégradés linéaires.",
          en: "Three examples of linear gradients."
        }
      },
      exercice: {
        enonce: {
          fr: "Transforme le fond plat de la <code>.carte</code> en un dégradé linéaire : <code>linear-gradient(135deg, #0ea5e9, #2563eb)</code>. Compare l'avant (fond uni bleu) et l'après (dégradé) dans l'aperçu.",
          en: "Transform the flat background of <code>.carte</code> into a linear gradient: <code>linear-gradient(135deg, #0ea5e9, #2563eb)</code>. Compare before (solid blue) and after (gradient) in the preview."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Dégradé</title>\n</head>\n<body>\n  <div class=\"carte\">Paris — 18° ☀️</div>\n  <div class=\"carte\">Tokyo — 22° 🌤</div>\n</body>\n</html>",
          css: ".carte {\n  /* Remplace cette couleur unie par un linear-gradient(135deg, #0ea5e9, #2563eb) */\n  background: #0ea5e9;\n  color: white;\n  padding: 20px;\n  margin: 8px;\n  border-radius: 8px;\n}\n"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Dégradé</title>\n</head>\n<body>\n  <div class=\"carte\">Paris — 18° ☀️</div>\n  <div class=\"carte\">Tokyo — 22° 🌤</div>\n</body>\n</html>",
          css: ".carte {\n  background: linear-gradient(135deg, #0ea5e9, #2563eb);\n  color: white;\n  padding: 20px;\n  margin: 8px;\n  border-radius: 8px;\n}\n"
        },
        verification: [
          { fichier: "css", contient: "linear-gradient", message: { fr: "Utilise linear-gradient(...) comme valeur de background sur .carte.", en: "Use linear-gradient(...) as the background value on .carte." } },
          { fichier: "css", contient: "135deg", message: { fr: "Le dégradé doit utiliser la direction 135deg.", en: "The gradient must use the 135deg direction." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "complete",
          question: {
            fr: "Quelle fonction CSS crée un dégradé linéaire ?",
            en: "Which CSS function creates a linear gradient?"
          },
          bonneReponse: "linear-gradient",
          explication: {
            fr: "<code>linear-gradient()</code> génère un dégradé progressif entre plusieurs couleurs, le long d'une direction.",
            en: "<code>linear-gradient()</code> generates a progressive blend between several colors along a direction."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Les variables CSS", en: "CSS variables" },
      besoin: {
        fr: "Quand on utilise une même couleur à plusieurs endroits, la changer oblige à modifier chaque ligne. Les variables CSS règlent ce problème : on définit la valeur une seule fois et on la réutilise partout.",
        en: "When the same color is used in many places, changing it means editing every line. CSS variables solve this: you define the value once and reuse it everywhere."
      },
      decouverte: {
        fr: "On déclare une variable CSS dans <code>:root</code> avec la syntaxe <code>--nom-variable: valeur;</code>, puis on la lit partout avec <code>var(--nom-variable)</code>. Changer la valeur à un seul endroit met à jour toute la page.",
        en: "A CSS variable is declared inside <code>:root</code> with the syntax <code>--variable-name: value;</code>, then read anywhere with <code>var(--variable-name)</code>. Changing the value in one place updates the whole page."
      },
      explication: {
        fr: "Le sélecteur <code>:root</code> correspond à la racine du document HTML — les variables définies là sont accessibles depuis n'importe quel élément. L'intérêt : si une couleur est utilisée à dix endroits, il suffit de changer la variable une seule fois pour tout mettre à jour. <em>(Plus tard, dans les finitions, on s'en servira pour créer un mode sombre.)</em>",
        en: "The <code>:root</code> selector matches the root of the HTML document — variables defined there are accessible from any element. The benefit: if a color is used in ten places, you change the variable once to update everything. <em>(Later, in the finishing touches, we'll use this to build a dark mode.)</em>"
      },
      illustration: null,
      exemple: {
        code: ":root {\n  --couleur-principale: #0284c7;\n  --fond-carte: #f0f9ff;\n  --texte: #1e293b;\n}\n\n.carte {\n  background-color: var(--fond-carte);\n  color: var(--texte);\n  border: 2px solid var(--couleur-principale);\n}",
        langage: "css",
        commentaire: {
          fr: "On déclare les variables une fois dans :root, puis on les réutilise avec var().",
          en: "Variables declared once in :root, then reused with var()."
        }
      },
      exercice: {
        enonce: {
          fr: "Définis deux variables dans <code>:root</code> : <code>--couleur-carte</code> à <code>#0ea5e9</code> et <code>--texte-carte</code> à <code>white</code>. Utilise-les ensuite avec <code>var()</code> dans la règle <code>.carte</code>.",
          en: "Define two variables in <code>:root</code>: <code>--couleur-carte</code> set to <code>#0ea5e9</code> and <code>--texte-carte</code> set to <code>white</code>. Then use them with <code>var()</code> in the <code>.carte</code> rule."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Variables CSS</title>\n</head>\n<body>\n  <div class=\"carte\">Paris — 18° ☀️</div>\n  <div class=\"carte\">Tokyo — 22° 🌤</div>\n</body>\n</html>",
          css: ":root {\n  /* Déclare --couleur-carte: #0ea5e9; */\n  /* Déclare --texte-carte: white; */\n}\n\n.carte {\n  /* Utilise var(--couleur-carte) pour background */\n  /* Utilise var(--texte-carte) pour color */\n  padding: 20px;\n  margin: 8px;\n  border-radius: 8px;\n}\n"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Variables CSS</title>\n</head>\n<body>\n  <div class=\"carte\">Paris — 18° ☀️</div>\n  <div class=\"carte\">Tokyo — 22° 🌤</div>\n</body>\n</html>",
          css: ":root {\n  --couleur-carte: #0ea5e9;\n  --texte-carte: white;\n}\n\n.carte {\n  background: var(--couleur-carte);\n  color: var(--texte-carte);\n  padding: 20px;\n  margin: 8px;\n  border-radius: 8px;\n}\n"
        },
        verification: [
          { fichier: "css", contient: "--couleur-carte:", message: { fr: "Déclare la variable --couleur-carte dans :root.", en: "Declare the --couleur-carte variable in :root." } },
          { fichier: "css", contient: "--texte-carte:", message: { fr: "Déclare la variable --texte-carte dans :root.", en: "Declare the --texte-carte variable in :root." } },
          { fichier: "css", contient: "var(--couleur-carte)", message: { fr: "Utilise var(--couleur-carte) dans la règle .carte.", en: "Use var(--couleur-carte) inside the .carte rule." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "vraifaux",
          question: {
            fr: "Les variables CSS permettent de réutiliser une même valeur à plusieurs endroits.",
            en: "CSS variables allow reusing the same value in multiple places."
          },
          bonneReponse: true,
          explication: {
            fr: "Exact ! On déclare la valeur une seule fois dans <code>:root</code> et on la lit partout avec <code>var()</code>. Changer la variable met à jour toute l'interface.",
            en: "Correct! You declare the value once in <code>:root</code> and read it anywhere with <code>var()</code>. Changing the variable updates the whole interface."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Disposer avec Flexbox & Grid", en: "Layout with Flexbox & Grid" },
      besoin: {
        fr: "Des cartes empilées verticalement, c'est peu attrayant. Il faut les aligner côte à côte et les répartir intelligemment — c'est le rôle de Flexbox et de CSS Grid.",
        en: "Cards stacked vertically look poor. We need to align them side by side and distribute them smartly — that's the role of Flexbox and CSS Grid."
      },
      decouverte: {
        fr: "<code>display: flex</code> aligne les enfants en ligne ou en colonne. <code>display: grid</code> les place dans un tableau de colonnes et de lignes. La propriété <code>gap</code> crée un espace uniforme entre les éléments, dans les deux cas.",
        en: "<code>display: flex</code> aligns children in a row or column. <code>display: grid</code> places them in a table of columns and rows. The <code>gap</code> property creates a uniform space between elements, in both cases."
      },
      explication: {
        fr: "<code>grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))</code> crée automatiquement autant de colonnes que possible, chacune d'au moins 200px. <code>1fr</code> (fraction) signifie que les colonnes partagent l'espace disponible équitablement. C'est la recette d'une grille responsive sans media query.",
        en: "<code>grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))</code> automatically creates as many columns as possible, each at least 200px wide. <code>1fr</code> (fraction) means columns share available space equally. This is the recipe for a responsive grid without media queries."
      },
      illustration: null,
      exemple: {
        code: "/* Flexbox simple */\n.conteneur-flex {\n  display: flex;\n  gap: 16px;\n}\n\n/* Grille responsive */\n#cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n}",
        langage: "css",
        commentaire: {
          fr: "Flexbox pour une rangée simple, Grid pour une grille automatique.",
          en: "Flexbox for a simple row, Grid for an automatic grid."
        }
      },
      exercice: {
        enonce: {
          fr: "Transforme le conteneur <code>#cartes</code> en grille responsive : <code>display: grid</code>, <code>grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))</code> et <code>gap: 16px</code>. Observe les cartes se répartir automatiquement.",
          en: "Turn the <code>#cartes</code> container into a responsive grid: <code>display: grid</code>, <code>grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))</code>, and <code>gap: 16px</code>. Watch the cards distribute automatically."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Grid</title>\n</head>\n<body>\n  <div id=\"cartes\">\n    <div class=\"carte\">Paris ☀️</div>\n    <div class=\"carte\">Tokyo 🌤</div>\n    <div class=\"carte\">New York 🌧</div>\n    <div class=\"carte\">Sydney 🌈</div>\n  </div>\n</body>\n</html>",
          css: "#cartes {\n  /* Ajoute display: grid; */\n  /* Ajoute grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */\n  /* Ajoute gap: 16px; */\n  padding: 16px;\n}\n\n.carte {\n  background: linear-gradient(135deg, #0ea5e9, #2563eb);\n  color: white;\n  padding: 20px;\n  border-radius: 8px;\n}\n"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Grid</title>\n</head>\n<body>\n  <div id=\"cartes\">\n    <div class=\"carte\">Paris ☀️</div>\n    <div class=\"carte\">Tokyo 🌤</div>\n    <div class=\"carte\">New York 🌧</div>\n    <div class=\"carte\">Sydney 🌈</div>\n  </div>\n</body>\n</html>",
          css: "#cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  padding: 16px;\n}\n\n.carte {\n  background: linear-gradient(135deg, #0ea5e9, #2563eb);\n  color: white;\n  padding: 20px;\n  border-radius: 8px;\n}\n"
        },
        verification: [
          { fichier: "css", contient: "display: grid", message: { fr: "Ajoute display: grid sur #cartes.", en: "Add display: grid to #cartes." } },
          { fichier: "css", contient: "grid-template-columns", message: { fr: "Ajoute grid-template-columns avec repeat(auto-fill, minmax(200px, 1fr)).", en: "Add grid-template-columns with repeat(auto-fill, minmax(200px, 1fr))." } },
          { fichier: "css", contient: "gap: 16px", message: { fr: "Ajoute gap: 16px pour espacer les cartes.", en: "Add gap: 16px to space the cards." } }
        ]
      },
      application: null,
      quiz: [
        {
          type: "qcm",
          question: {
            fr: "Quelle propriété crée un espace entre les éléments d'une grille/flex ?",
            en: "Which property creates space between elements in a grid/flex container?"
          },
          options: [
            { fr: "padding", en: "padding" },
            { fr: "margin", en: "margin" },
            { fr: "gap", en: "gap" }
          ],
          bonneReponse: 2,
          explication: {
            fr: "<code>gap</code> crée un espacement uniforme entre les éléments enfants d'un <code>flex</code> ou <code>grid</code>, sans ajouter d'espace sur les bords extérieurs.",
            en: "<code>gap</code> creates uniform spacing between child elements of a <code>flex</code> or <code>grid</code> container, without adding space at the outer edges."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Rendre responsive", en: "Making it responsive" },
      besoin: {
        fr: "Le tableau de bord doit s'afficher correctement aussi bien sur un grand écran que sur un téléphone. Les media queries permettent d'adapter le CSS selon la taille de l'écran.",
        en: "The dashboard must display correctly on both large screens and phones. Media queries allow adapting CSS based on screen size."
      },
      decouverte: {
        fr: "Un <strong>media query</strong> s'écrit <code>@media (max-width: …) { … }</code>. Le CSS à l'intérieur ne s'applique que si la condition est vraie. Les <strong>unités relatives</strong> comme <code>%</code> et <code>rem</code> s'adaptent aussi naturellement à la taille de l'écran.",
        en: "A <strong>media query</strong> is written <code>@media (max-width: …) { … }</code>. The CSS inside only applies when the condition is true. <strong>Relative units</strong> like <code>%</code> and <code>rem</code> also adapt naturally to screen size."
      },
      explication: {
        fr: "L'approche <em>mobile-first</em> consiste à écrire d'abord le CSS pour petits écrans, puis à utiliser <code>min-width</code> pour les grands. À l'inverse, <em>desktop-first</em> part du grand et adapte avec <code>max-width</code>. Dans notre projet, on passera à une colonne unique sous <strong>500px</strong> de largeur.",
        en: "The <em>mobile-first</em> approach means writing CSS for small screens first, then using <code>min-width</code> for larger ones. Conversely, <em>desktop-first</em> starts from large and adapts with <code>max-width</code>. In our project, we'll switch to a single column below <strong>500px</strong> width."
      },
      illustration: null,
      exemple: {
        code: "/* Style par défaut (grands écrans) */\n#cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n}\n\n/* Sous 500px : une seule colonne */\n@media (max-width: 500px) {\n  #cartes {\n    grid-template-columns: 1fr;\n  }\n}",
        langage: "css",
        commentaire: {
          fr: "La grille passe à une colonne sur mobile.",
          en: "The grid switches to a single column on mobile."
        }
      },
      exercice: {
        enonce: {
          fr: "Ajoute un <code>@media (max-width: 500px)</code> qui force le conteneur <code>#cartes</code> à n'avoir qu'une seule colonne : <code>grid-template-columns: 1fr</code>. Rétrécis l'aperçu pour voir l'effet.",
          en: "Add a <code>@media (max-width: 500px)</code> that forces the <code>#cartes</code> container to have only one column: <code>grid-template-columns: 1fr</code>. Narrow the preview to see the effect."
        },
        fichiers: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Responsive</title>\n</head>\n<body>\n  <div id=\"cartes\">\n    <div class=\"carte\">Paris ☀️</div>\n    <div class=\"carte\">Tokyo 🌤</div>\n    <div class=\"carte\">New York 🌧</div>\n    <div class=\"carte\">Sydney 🌈</div>\n  </div>\n</body>\n</html>",
          css: "#cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  padding: 16px;\n}\n\n.carte {\n  background: linear-gradient(135deg, #0ea5e9, #2563eb);\n  color: white;\n  padding: 20px;\n  border-radius: 8px;\n}\n\n/* Ajoute ici le @media (max-width: 500px) */\n"
        },
        correction: {
          html: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Responsive</title>\n</head>\n<body>\n  <div id=\"cartes\">\n    <div class=\"carte\">Paris ☀️</div>\n    <div class=\"carte\">Tokyo 🌤</div>\n    <div class=\"carte\">New York 🌧</div>\n    <div class=\"carte\">Sydney 🌈</div>\n  </div>\n</body>\n</html>",
          css: "#cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  padding: 16px;\n}\n\n.carte {\n  background: linear-gradient(135deg, #0ea5e9, #2563eb);\n  color: white;\n  padding: 20px;\n  border-radius: 8px;\n}\n\n@media (max-width: 500px) {\n  #cartes {\n    grid-template-columns: 1fr;\n  }\n}\n"
        },
        verification: [
          { fichier: "css", contient: "@media (max-width: 500px)", message: { fr: "Ajoute un @media (max-width: 500px) pour le style mobile.", en: "Add a @media (max-width: 500px) for mobile styles." } },
          { fichier: "css", contient: "grid-template-columns: 1fr", message: { fr: "Dans le @media, force grid-template-columns: 1fr sur #cartes.", en: "Inside the @media, force grid-template-columns: 1fr on #cartes." } }
        ]
      },
      application: {
        fr: "Ton projet dispose maintenant d'une interface stylisée et responsive : cartes avec dégradé, grille automatique et adaptation mobile. Les variables CSS sont prêtes pour basculer en mode sombre. Prochaine étape : donner vie à tout cela avec JavaScript ! <br><br>👉 <strong>Dans Notepad++ :</strong> ouvre <code>style.css</code> de ton dossier <code>projet-eleve/</code>, reporte-y ce que tu viens de pratiquer, enregistre (Ctrl+S), puis rafraîchis <code>index.html</code> dans le navigateur. Ton projet doit maintenant afficher des cartes stylées en grille.",
        en: "Your project now has a styled, responsive interface: gradient cards, an automatic grid, and mobile adaptation. CSS variables are ready for dark mode toggling. Next step: bring it all to life with JavaScript! <br><br>👉 <strong>In Notepad++:</strong> open <code>style.css</code> from your <code>projet-eleve/</code> folder, transfer what you just practised, save (Ctrl+S), then refresh <code>index.html</code> in the browser. Your project should now display styled cards in a grid."
      },
      quiz: [
        {
          type: "vraifaux",
          question: {
            fr: "<code>@media</code> permet d'appliquer du CSS selon la largeur de l'écran.",
            en: "<code>@media</code> allows applying CSS based on the screen width."
          },
          bonneReponse: true,
          explication: {
            fr: "Exact ! Les media queries permettent d'adapter le style à différentes tailles d'écran — c'est la base du design responsive.",
            en: "Correct! Media queries allow adapting style to different screen sizes — that's the foundation of responsive design."
          }
        }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
