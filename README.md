# Tableau de bord des villes du monde — Plateforme pédagogique

Plateforme d'apprentissage du développement web **par le projet** : les élèves construisent pas à pas une application affichant des informations en temps réel sur des villes du monde (pays, drapeau, température, météo, heure locale), guidés par 9 modules et 37 étapes interactives.

---

## Démarrer

**Prérequis :** Python 3 installé et accessible en ligne de commande.

> La plateforme utilise des modules ES et des appels API : il faut obligatoirement un serveur local, pas une simple ouverture de fichier.

**Windows :**
```cmd
serve.cmd
```

**macOS / Linux :**
```bash
bash serve.sh
```

Les deux scripts lancent `python -m http.server 8000`. Ouvrir ensuite :

```
http://localhost:8000
```

---

## Pour l'élève

### Suivre le parcours

Le cours est découpé en **9 modules (M0 à M8)** pour un total de **37 étapes**. Chaque étape suit toujours le même enchaînement :

1. **Besoin** — pourquoi on a besoin de cette notion
2. **Découverte** — présentation de la notion
3. **Explication** — détail et fonctionnement
4. **Exemple** — code illustratif
5. **Exercice** — éditeur de code intégré (modifier, exécuter, voir la correction)
6. **Application projet** — appliquer la notion au vrai projet
7. **Quiz** — valider les acquis avant de continuer

### L'éditeur live

Chaque étape comporte un exercice avec un **éditeur de code intégré** directement dans la page. Il est possible de modifier le code, d'observer le résultat en direct dans un aperçu, puis d'afficher la correction officielle.

### Les quiz bloquants

À la fin de chaque étape, un **quiz doit être réussi** pour débloquer l'étape suivante. La progression est automatiquement sauvegardée dans le navigateur (localStorage) : fermer la page ne fait pas perdre l'avancement.

### Coder son projet

Le vrai projet à construire se trouve dans :

```
projet-eleve/starter/
├── index.html
├── style.css
└── script.js
```

C'est ici que l'élève écrit son propre code, module après module, en suivant les instructions **Application projet** de chaque étape.

### Rattraper ou comparer avec les snapshots

Des instantanés de fin de module sont disponibles pour rattraper un retard ou vérifier son travail :

```
projet-eleve/etapes/
├── module-1/   ← état du projet après le module 1
├── module-2/
├── ...
└── module-7/   ← projet final de référence
```

---

## Pour le professeur

### Déverrouiller toutes les étapes

En cas de démonstration ou de dépannage, le raccourci **`Ctrl + Shift + U`** ouvre l'intégralité du contenu sans avoir à passer les quiz.

### Réinitialiser la progression d'un élève

La progression est stockée dans le **localStorage** du navigateur. Pour repartir de zéro :

1. Ouvrir les outils développeur (`F12`)
2. Aller dans l'onglet **Application** → **Local Storage** → `http://localhost:8000`
3. Sélectionner toutes les entrées et les supprimer (ou cliquer sur l'icône « Effacer »)

### Usage au vidéoprojecteur

La plateforme fonctionne intégralement en local, sans connexion internet requise pour la navigation (les APIs météo/drapeaux nécessitent internet uniquement lors des exercices qui les utilisent).

### Langue et mode sombre

- **Sélecteur de langue** (FR / EN) dans l'en-tête : bascule l'interface et le contenu des leçons.
- **Mode sombre** : bouton 🌙 dans l'en-tête.

---

## Le projet construit

L'application finale que les élèves construisent permet de :

- saisir des noms de villes
- afficher une **carte** pour chaque ville avec : pays, drapeau national, température actuelle, conditions météo, et heure locale

**APIs utilisées — gratuites, sans clé d'authentification :**

| Service | Usage |
|---|---|
| [Open-Meteo](https://open-meteo.com/) | Géocodage (ville → coordonnées) + météo en temps réel |
| [flagcdn.com](https://flagcdn.com/) | Drapeaux nationaux |

---

## Structure du dépôt

```
TP web/
├── index.html              # Point d'entrée de la plateforme
├── serve.cmd               # Lancement serveur local (Windows)
├── serve.sh                # Lancement serveur local (macOS/Linux)
│
├── assets/                 # CSS et JS de la plateforme
│   ├── css/
│   └── js/
│
├── content/                # Contenu pédagogique
│   └── modules/
│       ├── m0.js           # Module 0 : introduction
│       ├── m1.js           # Module 1 : HTML
│       ├── ...
│       └── m8.js           # Module 8 : défis
│
├── projet-eleve/           # Espace de travail de l'élève
│   ├── starter/            # Point de départ (fichiers vides à compléter)
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── etapes/             # Snapshots de fin de module (référence)
│       ├── module-1/
│       ├── ...
│       └── module-7/       # Projet final complet
│
└── tests/                  # Tests automatisés
    ├── index.html           # Suite de tests unitaires
    └── smoke.html           # Smoke test + vérification des APIs
```

---

## Modifier le contenu

### Où se trouvent les leçons

Chaque module est un fichier dans `content/modules/` :

```
content/modules/m0.js   ← Module 0
content/modules/m1.js   ← Module 1
...
content/modules/m8.js   ← Module 8
```

### Schéma d'une étape

Chaque fichier exporte un objet avec un tableau `etapes`. Chaque étape suit cette structure :

```js
{
  titre:           { fr: "…", en: "…" },
  besoin:          { fr: "…", en: "…" },
  decouverte:      { fr: "…", en: "…" },
  explication:     { fr: "…", en: "…" },
  illustration:    "nom-illustration",        // optionnel
  exemple: {
    code:          "…",
    langage:       "html" | "css" | "js",
    commentaire:   { fr: "…", en: "…" }
  },
  exercice: {
    enonce:        { fr: "…", en: "…" },
    fichiers:      { html: "…", css: "…", js: "…" },  // code de départ
    correction:    { html: "…", css: "…", js: "…" }   // solution
  },
  application:     { fr: "…", en: "…" } | null,
  quiz: [
    {
      type:        "qcm",
      question:    { fr: "…", en: "…" },
      options:     [{ fr: "…", en: "…" }, …],
      reponse:     0   // index de la bonne réponse
    }
  ],
  scoreMinimal:    75,          // score minimum pour débloquer l'étape suivante (%)
  defiOptionnel:   { fr: "…", en: "…" } | null
}
```

Tous les champs de texte sont **bilingues** (`{ fr, en }`). Pour ajouter une étape, copier ce schéma dans le tableau `etapes` du module concerné.

---

## Tests

Ouvrir les URLs suivantes **après avoir lancé le serveur local** :

| URL | Contenu |
|---|---|
| `http://localhost:8000/tests/` | Suite de tests unitaires (éditeur, i18n, progression, quiz, routeur, thème, météo) |
| `http://localhost:8000/tests/smoke.html` | Smoke test global + vérification de la disponibilité des APIs externes |
