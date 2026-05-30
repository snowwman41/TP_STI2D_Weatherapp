# Design — Plateforme d'apprentissage « Tableau de bord des villes du monde »

**Date :** 2026-05-30
**Statut :** validé en brainstorming, en attente de relecture utilisateur

## 1. Objectif

Concevoir une plateforme d'apprentissage interactive, moderne et autoportante, destinée à des élèves de Première (16-17 ans). Elle enseigne le développement web **par projet** : les élèves construisent progressivement une application « Tableau de bord des villes du monde » pendant que chaque notion (HTML, CSS, JS, événements, DOM, API, JSON, fetch, async/await) est (re)découverte **au moment précis où le projet en a besoin**.

Le résultat doit être utilisable directement en classe sur vidéoprojecteur, et suffisamment guidé pour qu'un élève apprenne et réalise le projet sans autre support.

### Application finale construite par l'élève

Une appli permettant de saisir le nom d'une ou plusieurs villes et d'afficher pour chacune une carte avec : nom, pays, drapeau, température actuelle, description météo, heure locale — données récupérées via des APIs gratuites.

## 2. Décisions structurantes (issues du brainstorming)

| Sujet | Décision |
|-------|----------|
| Modèle d'édition | **Hybride** : éditeur live intégré pour les exercices/notions ; le **projet final** est développé dans de **vrais fichiers** que l'élève fait grandir module après module. |
| Techno plateforme | **HTML/CSS/JS pur, sans build.** Aucune dépendance, aucun outil. Sert aussi d'exemple de code lisible. |
| APIs du projet | **Open-Meteo Geocoding + Forecast** (gratuit, **sans clé**, CORS ouvert) + **flagcdn** (drapeaux par code pays). Heure locale via fuseau + `Intl.DateTimeFormat`. |
| Disposition | **A — Documentation classique** : sidebar de progression à gauche + colonne de contenu unique. Sidebar repliable (mode focus / mobile). |
| Ambiance graphique | **B — Bleu sobre « documentation »** : sobre, lisible, professionnel. Couleurs ajustables via variables CSS. Mode sombre inclus. |
| Quiz | **Bloquant** : réussir le quiz de fin d'étape (score minimal) débloque l'étape suivante. **Déverrouillage prof** disponible. |
| Langue | **Bilingue FR / EN** : sélecteur dans l'en-tête, bascule interface + contenu, mémorisé en `localStorage`. |
| Granularité contenu plateforme | **Un fichier JS par module** (`m0.js` … `m8.js`), contenant toutes les étapes du module. |
| Structure du projet élève | Volontairement simple : **un seul `script.js`**, **un seul `style.css`**, et **un seul `index.html`** de préférence (plusieurs pages HTML autorisées mais non encouragées). |

## 3. Architecture générale

Site **statique** : on ouvre `index.html` via un petit serveur local (fourni, `python -m http.server`) pour éviter les restrictions CORS/`file://`.

Deux espaces cohabitent :

- **La plateforme d'apprentissage** : parcours, leçons, éditeur live, quiz, progression. C'est ce qu'on développe.
- **Le projet de l'élève** (`projet-eleve/`) : les vrais fichiers `index.html` / `style.css` / `script.js` que l'élève édite dans son propre éditeur, plus des **snapshots de fin de module** pour rattraper ou comparer.

La plateforme est une **SPA légère maison** : une seule page, **routeur basé sur le hash** (`#/module-3/etape-2`, ~50 lignes) qui injecte le contenu de l'étape dans la colonne centrale. Pas de framework — le routeur reste lisible et sert d'exemple pédagogique.

## 4. Structure des fichiers

```
TP web/
├── index.html                  # coquille : sidebar + zone contenu + en-tête (langue, thème)
├── assets/
│   ├── css/
│   │   ├── variables.css       # couleurs, espacements, typo (thème clair/sombre)
│   │   ├── layout.css          # sidebar + colonne contenu, responsive
│   │   └── components.css       # cartes, boutons, blocs d'étape, éditeur, quiz
│   └── js/
│       ├── router.js           # navigation #/module/etape
│       ├── progress.js         # localStorage : étapes finies, scores, déverrouillage
│       ├── editor.js           # éditeur live (textarea amélioré + iframe sandbox + console)
│       ├── quiz.js             # moteur de quiz (QCM / vrai-faux / complète le code)
│       ├── i18n.js             # sélecteur de langue + dictionnaire d'interface
│       ├── illustrations.js    # composants SVG/animations réutilisables
│       └── content-loader.js   # charge et rend les étapes via le gabarit
├── content/
│   ├── modules.js              # plan : modules → étapes (métadonnées, ordre, verrous)
│   ├── ui-strings.js           # libellés d'interface { fr, en }
│   └── modules/                # 1 fichier par module, contenu bilingue
│       ├── m0.js  m1.js  …  m8.js   # chaque fichier = toutes les étapes du module
├── projet-eleve/
│   ├── starter/                # index.html + style.css + script.js de départ
│   └── etapes/module-1/ … module-7/   # snapshots de fin de module (même structure : 1 html, 1 css, 1 js)
├── serve.cmd / serve.sh        # lance le serveur local
└── README.md                   # mode d'emploi prof + élève
```

## 5. Modèle de contenu d'une étape

Chaque étape est un objet, regroupé avec les autres étapes de son module dans `content/modules/mX.js` (qui exporte la liste ordonnée de ses étapes). Tous les textes sont bilingues (`{ fr, en }`). Le **gabarit** rend les blocs dans un ordre fixe correspondant à la pédagogie imposée :

```
step = {
  id, module, ordre,
  besoin:        { fr, en },   // 🎯 phrase déclencheuse + objectif
  decouverte:    { fr, en },   // 💡 pourquoi cette notion
  explication:   { fr, en },   // 📖 texte clair (peut référencer une illustration)
  illustration:  'dom-tree' | 'api-flow' | ... ,   // schéma/animation à insérer
  exemple:       { code, langage, commentaire:{fr,en}, apercu:bool },  // 👀
  exercice:      { enonce:{fr,en}, fichiers:{html,css,js}, correction:{html,css,js} },  // ✏️ + ✅
  application:   { fr, en, avant, apres },   // 🚀 ce qu'on ajoute au projet + aperçu résultat
  quiz:          [ { type, question:{fr,en}, options, bonneReponse, explication:{fr,en} } ],
  scoreMinimal:  0.6,          // seuil de déverrouillage (quiz bloquant)
  defiOptionnel: { fr, en } | null
}
```

Le rendu produit toujours la même mise en page : **Besoin → Découverte → Explication → Exemple illustré → Exercice guidé → Correction (révélable) → Application projet → Quiz**.

## 6. Éditeur live & aperçu

- **Éditeur** : `<textarea>` amélioré (numéros de ligne, indentation auto, coloration légère) — pas de bibliothèque lourde.
- **Aperçu** : `<iframe sandbox>` exécutant le HTML/CSS/JS de l'élève en isolation, rafraîchi en direct (debounce ~400 ms). La **console JS** est capturée (`console.log`, erreurs) et affichée sous l'aperçu.
- **Correction** : chaque exercice embarque sa solution ; bouton « Afficher la correction » + **comparaison avant/après** optionnelle.
- L'éditeur est mono-fichier ou tri-onglets (HTML/CSS/JS) selon l'étape.

## 7. Quiz & validation (bloquant)

Moteur `quiz.js`, 3 types : **QCM**, **vrai/faux**, **« complète le code »**. Feedback immédiat (correct/incorrect + explication), score mémorisé. Réussir au `scoreMinimal` **débloque l'étape suivante** ; sinon l'élève peut réessayer. Les **défis optionnels** sont marqués distinctement et ne bloquent jamais. Un **déverrouillage prof** (raccourci clavier + bouton réglages) lève tous les verrous et permet de réinitialiser la progression.

## 8. Progression & persistance

`localStorage` retient : étapes terminées, scores de quiz, étapes déverrouillées, dernière position, langue, thème clair/sombre. La sidebar affiche l'état de chaque étape (**✓ terminé / ▸ en cours / 🔒 verrouillé**) et une **barre de progression globale**. Bouton de réinitialisation (réglages / prof).

## 9. Internationalisation (FR / EN)

- `i18n.js` : état de langue + fonction `t(cle)` pour l'interface, alimentée par `content/ui-strings.js`.
- Contenu des étapes : chaque champ textuel est `{ fr, en }` ; le loader sélectionne la langue active.
- Sélecteur dans l'en-tête ; changement de langue instantané sans rechargement ; persistance `localStorage`.

## 10. Illustrations pédagogiques

En **SVG + CSS/animations** (légères, nettes au projecteur, zéro dépendance), regroupées dans `illustrations.js` et insérées par clé depuis les étapes :

- arbre du **DOM** (mise en évidence interactive nœud ↔ HTML) ;
- schéma **navigateur ↔ API** (requête → réponse JSON, animé) ;
- cycle **fetch / async-await** (timeline d'attente) ;
- **box model**, flexbox, grid ;
- **couleurs CSS** : même couleur en hex / rgb(a) / hsl(a) + roue HSL ;
- **`linear-gradient`** interactif (angle + arrêts de couleur) ;
- comparaisons **avant/après** sur le projet.

## 11. Parcours détaillé (8 modules)

Chaque module est découpé en étapes suivant le gabarit en 7 temps. L'application part d'une page blanche (M0) et devient l'appli météo complète (M7).

- **M0 — Découverte & mise en route** : démo du résultat final, rôle des 3 fichiers, fonctionnement dans le navigateur. → squelette du projet posé.
- **M1 — Structure (HTML)** : balises, formulaire/input/button, **arbre du DOM (visuel)**, rappel structure d'un document. → en-tête, champ, bouton « Ajouter ».
- **M2 — Style (CSS)** : sélecteurs, box model ; **Les couleurs en CSS** (`color`/`background`, hex, rgb(a), hsl(a)) ; **`linear-gradient`** (direction, arrêts, multi-couleurs) ; variables CSS → **mode sombre** ; flexbox & grid ; responsive. → interface soignée + grille de cartes, dégradés appliqués.
- **M3 — Événements & JS** : variables/fonctions, `addEventListener`, objet `event`/`submit`, lire la valeur d'un input. → le clic récupère la ville saisie.
- **M4 — DOM en écriture** : tableaux & boucles, `createElement`/`append`, template literals. → une carte par ville (sans données réelles).
- **M5 — API, JSON, fetch** : qu'est-ce qu'une API (visuel), JSON, `fetch`, géocodage. → pays + drapeau réels affichés.
- **M6 — async/await** : promesses, `async`/`await`, `try`/`catch` (ville introuvable) ; enchaînement géocodage → météo. → température + description météo réelles, erreurs gérées.
- **M7 — Finitions** : heure locale (fuseau + `Intl`), `localStorage`, suppression d'une ville, états de chargement & animations, responsive final. → application complète.
- **M8 — Défis optionnels** : icônes météo dynamiques, tri/favoris, géolocalisation. → bonus.

## 12. Flux de données du projet final

```
ville saisie
  → Open-Meteo Geocoding   (pays, code pays, lat/lon, fuseau horaire)
  → Open-Meteo Forecast     (température actuelle, code météo → description)
  → flagcdn                 (drapeau via code pays)
  → heure locale            (fuseau + Intl.DateTimeFormat)
  → rendu de la carte
```

**Gestion d'erreurs** (chacune devient un moment pédagogique) : champ vide, ville introuvable (géocodage sans résultat), réseau coupé / API indisponible.

## 13. Responsive, accessibilité, mode sombre

Mobile-first ; sidebar repliable en menu burger sur petit écran. Mode sombre via `data-theme` + variables CSS. Contrastes AA, navigation clavier, focus visibles, texte lisible au vidéoprojecteur.

## 14. Vérification / tests

Pas de framework de test (site statique pédagogique). Vérification par :
- **checklist manuelle** par module ;
- **smoke-test** : une page qui charge chaque étape et signale les erreurs console, et qui vérifie que Open-Meteo (geocoding + forecast) et flagcdn répondent.

## 15. Périmètre & livraison

Le bilingue double le contenu rédactionnel. Plan de réalisation : d'abord la **plateforme + le moteur** (routeur, éditeur, quiz, i18n, progression, illustrations, thème) puis les **modules** dans l'ordre, chacun entièrement bilingue, en réutilisant le même gabarit d'étape.

## 16. Hors périmètre (YAGNI)

- Pas de backend, base de données, ni comptes utilisateurs.
- Pas de build/bundler/framework.
- Pas de clé API ni de service payant.
- Pas de suivi côté serveur des élèves (progression locale uniquement).
