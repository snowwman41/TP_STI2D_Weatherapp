# Plateforme « Tableau de bord des villes du monde » — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire une plateforme d'apprentissage statique (HTML/CSS/JS pur, sans build) où des élèves de Première apprennent le web *par projet* en construisant l'application « Tableau de bord des villes du monde ».

**Architecture:** SPA légère maison — une seule page `index.html` (sidebar de progression + colonne de contenu), un routeur par hash, un moteur d'étapes piloté par des données bilingues, un éditeur live (textarea + iframe sandbox), un moteur de quiz bloquant, des illustrations SVG, et la persistance via `localStorage`. Le contenu pédagogique vit dans `content/modules/m0.js … m8.js`. Le projet que l'élève construit vit séparément dans `projet-eleve/` (un seul `index.html`, `style.css`, `script.js`).

**Tech Stack:** HTML5, CSS3 (variables custom, fl/grid), JavaScript ES modules natifs (`<script type="module">`). Aucune dépendance, aucun bundler. APIs : Open-Meteo (geocoding + forecast, sans clé), flagcdn (drapeaux). Tests : mini-runner d'assertions maison (`tests/runner.js` + `tests/index.html`).

**Réf. spec :** `docs/superpowers/specs/2026-05-30-tableau-de-bord-villes-design.md`

---

## Conventions communes

- **ES modules** partout : chaque fichier `assets/js/*.js` fait `export`/`import`. `index.html` charge un unique `<script type="module" src="assets/js/main.js">`.
- **Pas de `file://`** : on développe et teste via le serveur local fourni (`serve.cmd` / `serve.sh`). Toujours ouvrir `http://localhost:8000`.
- **TDD pour la logique pure** : on écrit le test dans `tests/*.test.js`, on le voit échouer (ouvrir `http://localhost:8000/tests/`), on implémente, on le voit passer.
- **Commits fréquents** : un commit par tâche terminée. (Si le dépôt git n'existe pas encore, la Phase 0 l'initialise.)
- **Bilingue** : tout texte destiné à l'utilisateur est un objet `{ fr, en }`. Jamais de chaîne nue affichée.

## Carte des fichiers (responsabilités)

| Fichier | Responsabilité |
|---------|----------------|
| `index.html` | Coquille : en-tête (langue, thème), sidebar, conteneur de contenu. Charge `main.js`. |
| `assets/css/variables.css` | Tokens de design : couleurs (thème clair/sombre via `[data-theme]`), espacements, typo, rayons, ombres. |
| `assets/css/layout.css` | Grille sidebar + contenu, en-tête, responsive (burger). |
| `assets/css/components.css` | Boutons, cartes, blocs d'étape, éditeur, quiz, illustrations, barre de progression. |
| `assets/js/main.js` | Point d'entrée : initialise i18n, thème, progression, routeur, sidebar. |
| `assets/js/i18n.js` | État de langue + `t(cle)` + `pick(objFrEn)` ; persistance. |
| `assets/js/theme.js` | Bascule clair/sombre ; persistance ; application de `data-theme`. |
| `assets/js/router.js` | Parse `#/module/etape`, événement de navigation, garde de verrouillage. |
| `assets/js/progress.js` | État de progression (étapes finies, scores, déverrouillage prof) ; persistance ; calcul des verrous. |
| `assets/js/quiz.js` | Rendu + correction d'un quiz ; calcul du score ; signal de réussite. |
| `assets/js/editor.js` | Éditeur live : onglets HTML/CSS/JS, iframe sandbox, capture console, debounce. |
| `assets/js/illustrations.js` | Bibliothèque de schémas SVG/animés, insérés par clé. |
| `assets/js/weather.js` | Logique du projet réutilisable : mapping code météo → description {fr,en}, heure locale. |
| `assets/js/step-template.js` | Rend un objet-étape en HTML (les 7 blocs + quiz). |
| `assets/js/content-loader.js` | Charge `content/modules/*`, fournit étape par id, ordre global. |
| `content/modules.js` | Plan : liste ordonnée des modules et de leurs étapes (métadonnées + titres). |
| `content/modules/m0.js … m8.js` | Contenu pédagogique bilingue de chaque module (étapes complètes). |
| `content/ui-strings.js` | Libellés d'interface `{ fr, en }`. |
| `projet-eleve/starter/` | `index.html`, `style.css`, `script.js` de départ pour l'élève. |
| `projet-eleve/etapes/module-N/` | Snapshot du projet à la fin de chaque module. |
| `tests/runner.js`, `tests/index.html`, `tests/*.test.js` | Mini-framework d'assertions + tests de la logique pure. |
| `serve.cmd` / `serve.sh` | Lance `python -m http.server 8000`. |
| `README.md` | Mode d'emploi prof + élève. |

---

## Phase 0 — Échafaudage, serveur local, mini-framework de test

### Task 0.1: Initialiser le dépôt et l'arborescence

**Files:**
- Create: `serve.cmd`, `serve.sh`, `.gitignore`

- [ ] **Step 1: Initialiser git (si absent) et créer l'arborescence**

```bash
git init
mkdir -p assets/css assets/js content/modules projet-eleve/starter projet-eleve/etapes tests
```

- [ ] **Step 2: Créer `.gitignore`**

```
.superpowers/
.DS_Store
Thumbs.db
```

- [ ] **Step 3: Créer `serve.cmd` (Windows)**

```bat
@echo off
echo Ouvre http://localhost:8000 dans ton navigateur
python -m http.server 8000
```

- [ ] **Step 4: Créer `serve.sh` (macOS/Linux)**

```bash
#!/usr/bin/env bash
echo "Ouvre http://localhost:8000 dans ton navigateur"
python3 -m http.server 8000
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: échafaudage projet + serveur local"
```

### Task 0.2: Mini-framework de test maison

**Files:**
- Create: `tests/runner.js`, `tests/index.html`

- [ ] **Step 1: Écrire `tests/runner.js`**

```js
// Mini-framework d'assertions, zéro dépendance.
const results = [];
let currentSuite = "(racine)";

export function describe(name, fn) {
  currentSuite = name;
  fn();
  currentSuite = "(racine)";
}

export function it(name, fn) {
  try {
    fn();
    results.push({ suite: currentSuite, name, ok: true });
  } catch (err) {
    results.push({ suite: currentSuite, name, ok: false, message: err.message });
  }
}

export function assertEqual(actual, expected, msg) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error((msg ? msg + " — " : "") + `attendu ${e}, reçu ${a}`);
}

export function assertTrue(cond, msg) {
  if (!cond) throw new Error(msg || "attendu vrai");
}

export function render() {
  const root = document.getElementById("results");
  const passed = results.filter(r => r.ok).length;
  root.innerHTML =
    `<h1>${passed}/${results.length} tests passés</h1>` +
    results.map(r =>
      `<div style="color:${r.ok ? "green" : "red"}">` +
      `${r.ok ? "✓" : "✗"} [${r.suite}] ${r.name}` +
      (r.ok ? "" : `<br><small>${r.message}</small>`) + `</div>`
    ).join("");
  // Code de sortie lisible dans le titre pour vérification rapide
  document.title = passed === results.length ? "TESTS OK" : "TESTS FAIL";
}
```

- [ ] **Step 2: Écrire `tests/index.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Tests</title></head>
<body>
  <div id="results">Chargement…</div>
  <script type="module">
    // Importer ici chaque fichier *.test.js puis appeler render().
    // Les tests s'ajouteront au fur et à mesure des phases.
    import { render } from "./runner.js";
    // import "./router.test.js"; (décommenté en Phase 3)
    render();
  </script>
</body>
</html>
```

- [ ] **Step 3: Vérifier**

Run: lancer `serve.cmd`/`serve.sh`, ouvrir `http://localhost:8000/tests/`
Expected: page affichant « 0/0 tests passés », titre « TESTS OK ».

- [ ] **Step 4: Commit**

```bash
git add tests/ && git commit -m "test: mini-framework d'assertions maison"
```

---

## Phase 1 — Thème, coquille HTML, mode sombre

### Task 1.1: Tokens de design (`variables.css`)

**Files:**
- Create: `assets/css/variables.css`

- [ ] **Step 1: Écrire les variables (thème clair par défaut + sombre via `[data-theme="dark"]`)**

```css
:root {
  /* Palette « bleu sobre documentation » */
  --c-bg: #ffffff;
  --c-bg-soft: #f6f9fc;
  --c-surface: #ffffff;
  --c-border: #e2e8f0;
  --c-text: #0f172a;
  --c-text-soft: #475569;
  --c-primary: #0284c7;
  --c-primary-soft: #e0f2fe;
  --c-accent: #0369a1;
  --c-success: #16a34a;
  --c-danger: #dc2626;
  --c-card-grad-a: #0ea5e9;
  --c-card-grad-b: #2563eb;

  --radius: 12px;
  --radius-sm: 8px;
  --gap: 16px;
  --shadow: 0 6px 20px rgba(2, 132, 199, .12);
  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-head: Georgia, "Times New Roman", serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  --maxw-content: 820px;
}

[data-theme="dark"] {
  --c-bg: #0b1220;
  --c-bg-soft: #0f1a2e;
  --c-surface: #111c30;
  --c-border: #1e3a5f;
  --c-text: #dbeafe;
  --c-text-soft: #93b4d8;
  --c-primary: #38bdf8;
  --c-primary-soft: #0c2740;
  --c-accent: #7dd3fc;
  --c-card-grad-a: #0369a1;
  --c-card-grad-b: #1e40af;
  --shadow: 0 6px 20px rgba(0, 0, 0, .4);
}

* { box-sizing: border-box; }
body { margin: 0; background: var(--c-bg); color: var(--c-text); font-family: var(--font-body); }
h1, h2, h3 { font-family: var(--font-head); }
```

- [ ] **Step 2: Vérifier (différé)** — sera visible une fois `index.html` créé (Task 1.3).

- [ ] **Step 3: Commit**

```bash
git add assets/css/variables.css && git commit -m "feat: tokens de design + thème clair/sombre"
```

### Task 1.2: Module de thème (`theme.js`) — TDD

**Files:**
- Create: `assets/js/theme.js`, `tests/theme.test.js`

- [ ] **Step 1: Écrire le test**

```js
import { describe, it, assertEqual } from "./runner.js";
import { nextTheme } from "../assets/js/theme.js";

describe("theme", () => {
  it("bascule clair -> sombre", () => assertEqual(nextTheme("light"), "dark"));
  it("bascule sombre -> clair", () => assertEqual(nextTheme("dark"), "light"));
  it("valeur inconnue -> dark", () => assertEqual(nextTheme(null), "dark"));
});
```

- [ ] **Step 2: Brancher le test dans `tests/index.html`** (ajouter `import "./theme.test.js";` avant `render()`), ouvrir `http://localhost:8000/tests/` → FAIL (module introuvable).

- [ ] **Step 3: Écrire `theme.js`**

```js
const KEY = "tbv:theme";

export function nextTheme(current) {
  return current === "dark" ? "light" : "dark";
}

export function getTheme() {
  return localStorage.getItem(KEY) || "light";
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(KEY, theme);
}

export function initTheme(toggleBtn) {
  applyTheme(getTheme());
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => applyTheme(nextTheme(getTheme())));
  }
}
```

- [ ] **Step 4: Vérifier** → `http://localhost:8000/tests/` affiche 3/3 passés.

- [ ] **Step 5: Commit**

```bash
git add assets/js/theme.js tests/theme.test.js tests/index.html && git commit -m "feat: bascule thème clair/sombre (TDD)"
```

### Task 1.3: Coquille `index.html` + layout

**Files:**
- Create: `index.html`, `assets/css/layout.css`, `assets/css/components.css` (vide pour l'instant), `assets/js/main.js`

- [ ] **Step 1: Écrire `assets/css/layout.css`**

```css
.app { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
.topbar { grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between;
  padding: 10px 20px; border-bottom: 1px solid var(--c-border); background: var(--c-surface); position: sticky; top: 0; z-index: 10; }
.topbar .brand { font-weight: 800; }
.topbar .controls { display: flex; gap: 8px; align-items: center; }
.sidebar { border-right: 1px solid var(--c-border); background: var(--c-bg-soft); padding: 16px; overflow-y: auto; }
.content { padding: 28px; }
.content-inner { max-width: var(--maxw-content); margin: 0 auto; }
.burger { display: none; }
@media (max-width: 800px) {
  .app { grid-template-columns: 1fr; }
  .sidebar { display: none; }
  .sidebar.open { display: block; position: fixed; inset: 56px 0 0 0; z-index: 20; }
  .burger { display: inline-block; }
}
```

- [ ] **Step 2: Créer `assets/css/components.css`** avec un commentaire d'en-tête (rempli plus tard) :

```css
/* Composants : boutons, cartes, blocs d'étape, éditeur, quiz, illustrations. */
.btn { font: inherit; font-weight: 700; border: 1px solid var(--c-border); background: var(--c-surface);
  color: var(--c-text); padding: 8px 14px; border-radius: var(--radius-sm); cursor: pointer; }
.btn-primary { background: var(--c-primary); color: #fff; border-color: var(--c-primary); }
```

- [ ] **Step 3: Écrire `index.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tableau de bord des villes — Parcours</title>
  <link rel="stylesheet" href="assets/css/variables.css">
  <link rel="stylesheet" href="assets/css/layout.css">
  <link rel="stylesheet" href="assets/css/components.css">
</head>
<body>
  <div class="app">
    <header class="topbar">
      <button class="btn burger" id="burger" aria-label="Menu">☰</button>
      <span class="brand">🌍 <span data-i18n="brand">Tableau de bord des villes</span></span>
      <div class="controls">
        <select id="lang" aria-label="Langue"><option value="fr">FR</option><option value="en">EN</option></select>
        <button class="btn" id="theme-toggle" aria-label="Thème">🌙</button>
      </div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="content"><div class="content-inner" id="content"></div></main>
  </div>
  <script type="module" src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Écrire un `main.js` minimal (sera enrichi)**

```js
import { initTheme } from "./theme.js";

initTheme(document.getElementById("theme-toggle"));
document.getElementById("burger").addEventListener("click", () =>
  document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("content").innerHTML = "<p>Initialisation…</p>";
```

- [ ] **Step 5: Vérifier** — ouvrir `http://localhost:8000` : en-tête visible, bouton 🌙 bascule clair/sombre, pas d'erreur console.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/layout.css assets/css/components.css assets/js/main.js && git commit -m "feat: coquille HTML + layout sidebar/contenu"
```

---

## Phase 2 — Internationalisation (FR / EN)

### Task 2.1: Libellés d'interface (`ui-strings.js`)

**Files:**
- Create: `content/ui-strings.js`

- [ ] **Step 1: Écrire les libellés (seront complétés au fil des phases)**

```js
export const uiStrings = {
  brand:        { fr: "Tableau de bord des villes", en: "World Cities Dashboard" },
  progression:  { fr: "Progression", en: "Progress" },
  locked:       { fr: "Verrouillé — termine l'étape précédente", en: "Locked — finish the previous step" },
  showSolution: { fr: "Afficher la correction", en: "Show solution" },
  hideSolution: { fr: "Masquer la correction", en: "Hide solution" },
  runHint:      { fr: "Le résultat se met à jour automatiquement.", en: "The preview updates automatically." },
  quizValidate: { fr: "Valider", en: "Submit" },
  quizRetry:    { fr: "Réessayer", en: "Try again" },
  quizPassed:   { fr: "Réussi ! Étape suivante débloquée.", en: "Passed! Next step unlocked." },
  quizFailed:   { fr: "Pas encore — réessaie pour débloquer la suite.", en: "Not yet — try again to unlock." },
  next:         { fr: "Étape suivante", en: "Next step" },
  prev:         { fr: "Étape précédente", en: "Previous step" },
  teacherUnlock:{ fr: "Tout déverrouiller (prof)", en: "Unlock all (teacher)" },
  reset:        { fr: "Réinitialiser ma progression", en: "Reset my progress" },
  blockNeed:    { fr: "Le besoin", en: "The need" },
  blockDiscover:{ fr: "Découverte", en: "Discover" },
  blockExplain: { fr: "Explication", en: "Explanation" },
  blockExample: { fr: "Exemple", en: "Example" },
  blockExercise:{ fr: "Exercice", en: "Exercise" },
  blockApply:   { fr: "Dans le projet", en: "In the project" },
  blockQuiz:    { fr: "Quiz", en: "Quiz" },
  optionalChallenge: { fr: "Défi optionnel", en: "Optional challenge" }
};
```

- [ ] **Step 2: Commit**

```bash
git add content/ui-strings.js && git commit -m "feat: libellés d'interface bilingues"
```

### Task 2.2: Moteur i18n (`i18n.js`) — TDD

**Files:**
- Create: `assets/js/i18n.js`, `tests/i18n.test.js`

- [ ] **Step 1: Écrire le test**

```js
import { describe, it, assertEqual } from "./runner.js";
import { pick, t, setLang, getLang } from "../assets/js/i18n.js";

describe("i18n", () => {
  it("pick renvoie la langue active", () => {
    setLang("fr");
    assertEqual(pick({ fr: "Bonjour", en: "Hello" }), "Bonjour");
    setLang("en");
    assertEqual(pick({ fr: "Bonjour", en: "Hello" }), "Hello");
  });
  it("pick tolère une chaîne nue", () => assertEqual(pick("x"), "x"));
  it("t lit une clé d'interface", () => { setLang("fr"); assertEqual(t("quizValidate"), "Valider"); });
  it("getLang reflète setLang", () => { setLang("en"); assertEqual(getLang(), "en"); });
});
```

- [ ] **Step 2: Brancher dans `tests/index.html`**, ouvrir → FAIL.

- [ ] **Step 3: Écrire `i18n.js`**

```js
import { uiStrings } from "../../content/ui-strings.js";

const KEY = "tbv:lang";
let lang = localStorage.getItem(KEY) || "fr";
const listeners = new Set();

export function getLang() { return lang; }

export function setLang(next) {
  lang = next === "en" ? "en" : "fr";
  localStorage.setItem(KEY, lang);
  listeners.forEach(fn => fn(lang));
}

export function onLangChange(fn) { listeners.add(fn); }

export function pick(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] ?? obj.fr ?? "";
}

export function t(key) {
  return pick(uiStrings[key]) || key;
}

export function applyStaticI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
}
```

- [ ] **Step 4: Vérifier** → tests passés.

- [ ] **Step 5: Brancher le sélecteur de langue dans `main.js`**

Ajouter à `main.js` :

```js
import { getLang, setLang, onLangChange, applyStaticI18n } from "./i18n.js";

const langSel = document.getElementById("lang");
langSel.value = getLang();
langSel.addEventListener("change", () => setLang(langSel.value));
onLangChange(() => { applyStaticI18n(); /* le routeur re-rendra l'étape (Phase 3) */ });
applyStaticI18n();
```

- [ ] **Step 6: Vérifier** — changer FR/EN met à jour le libellé « brand ». Commit.

```bash
git add assets/js/i18n.js tests/i18n.test.js tests/index.html assets/js/main.js && git commit -m "feat: moteur i18n + sélecteur de langue (TDD)"
```

---

## Phase 3 — Routeur par hash

### Task 3.1: Parsing de hash (`router.js`) — TDD

**Files:**
- Create: `assets/js/router.js`, `tests/router.test.js`

- [ ] **Step 1: Écrire le test**

```js
import { describe, it, assertEqual } from "./runner.js";
import { parseHash } from "../assets/js/router.js";

describe("router.parseHash", () => {
  it("hash vide -> module 0 étape 0", () => assertEqual(parseHash(""), { module: 0, etape: 0 }));
  it("#/m3/e2 -> {3,2}", () => assertEqual(parseHash("#/m3/e2"), { module: 3, etape: 2 }));
  it("tolère absence d'étape", () => assertEqual(parseHash("#/m5"), { module: 5, etape: 0 }));
  it("valeurs non numériques -> 0", () => assertEqual(parseHash("#/mx/ey"), { module: 0, etape: 0 }));
});
```

- [ ] **Step 2: Brancher, voir FAIL.**

- [ ] **Step 3: Écrire `router.js` (parsing + navigation)**

```js
const listeners = new Set();

export function parseHash(hash) {
  const m = /^#\/m(\d+)(?:\/e(\d+))?/.exec(hash || "");
  if (!m) return { module: 0, etape: 0 };
  return { module: Number(m[1]) || 0, etape: Number(m[2]) || 0 };
}

export function buildHash(module, etape) { return `#/m${module}/e${etape}`; }

export function navigate(module, etape) { location.hash = buildHash(module, etape); }

export function onRoute(fn) { listeners.add(fn); }

export function startRouter() {
  const fire = () => listeners.forEach(fn => fn(parseHash(location.hash)));
  window.addEventListener("hashchange", fire);
  fire();
}
```

- [ ] **Step 4: Vérifier** → tests passés.

- [ ] **Step 5: Commit**

```bash
git add assets/js/router.js tests/router.test.js tests/index.html && git commit -m "feat: routeur par hash (TDD)"
```

---

## Phase 4 — Progression, verrous, persistance

### Task 4.1: Plan des modules (`content/modules.js`)

**Files:**
- Create: `content/modules.js`

- [ ] **Step 1: Écrire le plan (métadonnées ; le contenu détaillé viendra plus tard).** Ce fichier importe les modules de contenu et expose une liste plate ordonnée d'étapes.

```js
import { m0 } from "./modules/m0.js";
import { m1 } from "./modules/m1.js";
import { m2 } from "./modules/m2.js";
import { m3 } from "./modules/m3.js";
import { m4 } from "./modules/m4.js";
import { m5 } from "./modules/m5.js";
import { m6 } from "./modules/m6.js";
import { m7 } from "./modules/m7.js";
import { m8 } from "./modules/m8.js";

export const modules = [m0, m1, m2, m3, m4, m5, m6, m7, m8];

// Liste plate des étapes dans l'ordre, avec leur position (module, etape).
export const flatSteps = modules.flatMap((mod, mi) =>
  mod.etapes.map((step, ei) => ({ ...step, module: mi, etape: ei, moduleTitre: mod.titre }))
);

export function stepAt(module, etape) {
  return flatSteps.find(s => s.module === module && s.etape === etape) || null;
}

export function globalIndex(module, etape) {
  return flatSteps.findIndex(s => s.module === module && s.etape === etape);
}
```

> **Note d'exécution :** chaque `content/modules/mN.js` doit exister (au moins un squelette `export const mN = { titre:{fr,en}, etapes: [] };`) avant que ce fichier s'importe sans erreur. La Phase 9 crée M0/M1 complets ; pour permettre l'exécution dès la Phase 4, créer d'abord des squelettes vides m2…m8 dans la Task 4.2.

### Task 4.2: Squelettes de modules vides

**Files:**
- Create: `content/modules/m0.js … m8.js` (squelettes)

- [ ] **Step 1: Pour chaque N de 0 à 8, créer `content/modules/mN.js`** avec ce contenu minimal (titres réels, étapes vides — remplies en Phase 9+) :

```js
export const m0 = { titre: { fr: "Découverte & mise en route", en: "Getting started" }, etapes: [] };
```
(idem m1…m8 avec leurs titres respectifs, repris de la section 11 du spec.)

- [ ] **Step 2: Vérifier** que `import { flatSteps } from "./content/modules.js"` ne lève pas d'erreur (depuis un test temporaire ou la console). Commit.

```bash
git add content/modules.js content/modules/ && git commit -m "feat: plan des modules + squelettes"
```

### Task 4.3: Logique de progression et verrous (`progress.js`) — TDD

**Files:**
- Create: `assets/js/progress.js`, `tests/progress.test.js`

- [ ] **Step 1: Écrire le test**

```js
import { describe, it, assertEqual, assertTrue } from "./runner.js";
import { isUnlocked, markCompleted, resetProgress, unlockAll, _setState } from "../assets/js/progress.js";

describe("progress", () => {
  it("première étape toujours déverrouillée", () => {
    resetProgress();
    assertTrue(isUnlocked(0)); // index global 0
  });
  it("étape verrouillée tant que la précédente n'est pas finie", () => {
    resetProgress();
    assertEqual(isUnlocked(1), false);
  });
  it("compléter une étape déverrouille la suivante", () => {
    resetProgress();
    markCompleted(0);
    assertTrue(isUnlocked(1));
  });
  it("déverrouillage prof ouvre tout", () => {
    resetProgress();
    unlockAll();
    assertTrue(isUnlocked(5));
  });
});
```

- [ ] **Step 2: Brancher, voir FAIL.**

- [ ] **Step 3: Écrire `progress.js`** (les verrous reposent sur l'index global ; une étape `i` est déverrouillée si `i===0`, si l'étape `i-1` est complétée, ou si mode prof)

```js
const KEY = "tbv:progress";
const listeners = new Set();

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || base(); }
  catch { return base(); }
}
function base() { return { completed: {}, scores: {}, teacher: false }; }
let state = load();

function save() { localStorage.setItem(KEY, JSON.stringify(state)); listeners.forEach(fn => fn(state)); }

export function onProgressChange(fn) { listeners.add(fn); }
export function _setState(s) { state = s; }            // test only

export function isCompleted(i) { return !!state.completed[i]; }
export function isUnlocked(i) { return i === 0 || state.teacher || isCompleted(i - 1); }
export function markCompleted(i, score) {
  state.completed[i] = true;
  if (score != null) state.scores[i] = score;
  save();
}
export function unlockAll() { state.teacher = true; save(); }
export function resetProgress() { state = base(); save(); }
export function getState() { return state; }
```

- [ ] **Step 4: Vérifier** → tests passés. Commit.

```bash
git add assets/js/progress.js tests/progress.test.js tests/index.html && git commit -m "feat: progression + verrous (TDD)"
```

### Task 4.4: Rendu de la sidebar

**Files:**
- Create: `assets/js/sidebar.js`
- Modify: `assets/css/components.css` (styles sidebar)

- [ ] **Step 1: Ajouter les styles dans `components.css`**

```css
.progress-bar { height: 8px; background: var(--c-border); border-radius: 999px; overflow: hidden; margin-bottom: 14px; }
.progress-bar > span { display: block; height: 100%; background: var(--c-primary); }
.mod-group { margin-bottom: 14px; }
.mod-group > h4 { margin: 8px 0 4px; font-size: 13px; color: var(--c-text-soft); }
.step-link { display: block; padding: 6px 10px; border-radius: var(--radius-sm); text-decoration: none; color: var(--c-text); font-size: 14px; }
.step-link.current { background: var(--c-primary-soft); font-weight: 700; }
.step-link.locked { opacity: .5; pointer-events: none; }
.step-link .state { margin-right: 6px; }
```

- [ ] **Step 2: Écrire `sidebar.js`**

```js
import { modules, flatSteps, globalIndex } from "../../content/modules.js";
import { pick, t } from "./i18n.js";
import { isUnlocked, isCompleted, getState } from "./progress.js";
import { buildHash } from "./router.js";

export function renderSidebar(current) {
  const el = document.getElementById("sidebar");
  const total = flatSteps.length;
  const done = flatSteps.filter((s, i) => isCompleted(i)).length;
  let html = `<div class="progress-bar"><span style="width:${Math.round(done / total * 100)}%"></span></div>`;
  modules.forEach((mod, mi) => {
    html += `<div class="mod-group"><h4>${pick(mod.titre)}</h4>`;
    mod.etapes.forEach((step, ei) => {
      const gi = globalIndex(mi, ei);
      const unlocked = isUnlocked(gi);
      const isCur = current && current.module === mi && current.etape === ei;
      const state = isCompleted(gi) ? "✓" : unlocked ? "▸" : "🔒";
      const cls = ["step-link", isCur ? "current" : "", unlocked ? "" : "locked"].join(" ");
      const href = unlocked ? buildHash(mi, ei) : "#";
      html += `<a class="${cls}" href="${href}"><span class="state">${state}</span>${pick(step.titre)}</a>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
}
```

- [ ] **Step 3: Vérifier (différé)** — la sidebar sera peuplée une fois M0/M1 remplis (Phase 9) et le routeur câblé (Phase 5). Commit.

```bash
git add assets/js/sidebar.js assets/css/components.css && git commit -m "feat: rendu de la sidebar avec verrous et progression"
```

---

## Phase 5 — Éditeur live (textarea + iframe sandbox)

### Task 5.1: Construction du document d'aperçu — TDD

**Files:**
- Create: `assets/js/editor.js`, `tests/editor.test.js`

- [ ] **Step 1: Écrire le test (logique pure : assembler html+css+js en un document)**

```js
import { describe, it, assertTrue } from "./runner.js";
import { buildPreviewDoc } from "../assets/js/editor.js";

describe("editor.buildPreviewDoc", () => {
  const doc = buildPreviewDoc("<h1>Hi</h1>", "h1{color:red}", "console.log(1)");
  it("inclut le HTML", () => assertTrue(doc.includes("<h1>Hi</h1>")));
  it("inclut le CSS dans une balise style", () => assertTrue(doc.includes("h1{color:red}")));
  it("inclut le JS dans une balise script", () => assertTrue(doc.includes("console.log(1)")));
  it("relaie la console au parent", () => assertTrue(doc.includes("postMessage")));
});
```

- [ ] **Step 2: Brancher, voir FAIL.**

- [ ] **Step 3: Écrire `editor.js`**

```js
export function buildPreviewDoc(html, css, js) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css || ""}</style></head>
<body>${html || ""}
<script>
  (function(){
    const relay = (type, args) => parent.postMessage({ __preview:true, type,
      text: args.map(a => { try { return typeof a === "object" ? JSON.stringify(a) : String(a); } catch { return String(a); } }).join(" ") }, "*");
    ["log","warn","error"].forEach(k => { const o = console[k]; console[k] = (...a) => { relay(k, a); o.apply(console, a); }; });
    window.addEventListener("error", e => relay("error", [e.message]));
  })();
<\/script>
<script>${js || ""}<\/script>
</body></html>`;
}

// Crée un éditeur dans `container` à partir de fichiers {html,css,js}.
// Retourne { getCode, setCode }.
export function createEditor(container, initial, opts = {}) {
  const files = { html: initial.html || "", css: initial.css || "", js: initial.js || "" };
  const tabs = opts.tabs || Object.keys(files).filter(k => initial[k] != null);
  let active = tabs[0];

  container.innerHTML = `
    <div class="editor">
      <div class="editor-tabs">${tabs.map(t => `<button class="etab" data-t="${t}">${t.toUpperCase()}</button>`).join("")}</div>
      <textarea class="editor-area" spellcheck="false"></textarea>
      <iframe class="editor-preview" sandbox="allow-scripts"></iframe>
      <div class="editor-console" aria-label="console"></div>
    </div>`;

  const area = container.querySelector(".editor-area");
  const frame = container.querySelector(".editor-preview");
  const cons = container.querySelector(".editor-console");
  const setActive = (tt) => { active = tt; area.value = files[active];
    container.querySelectorAll(".etab").forEach(b => b.classList.toggle("active", b.dataset.t === tt)); };
  container.querySelectorAll(".etab").forEach(b => b.addEventListener("click", () => setActive(b.dataset.t)));

  let timer;
  const refresh = () => { cons.innerHTML = ""; frame.srcdoc = buildPreviewDoc(files.html, files.css, files.js); };
  area.addEventListener("input", () => { files[active] = area.value; clearTimeout(timer); timer = setTimeout(refresh, 400); });

  window.addEventListener("message", e => {
    if (e.data && e.data.__preview) {
      const line = document.createElement("div");
      line.className = "cline " + e.data.type;
      line.textContent = (e.data.type === "error" ? "⛔ " : "› ") + e.data.text;
      cons.appendChild(line);
    }
  });

  setActive(active);
  refresh();
  return { getCode: () => ({ ...files }), setCode: (f) => { Object.assign(files, f); setActive(active); refresh(); } };
}
```

- [ ] **Step 4: Vérifier** → tests passés.

- [ ] **Step 5: Styles éditeur dans `components.css`**

```css
.editor { border: 1px solid var(--c-border); border-radius: var(--radius); overflow: hidden; display: grid;
  grid-template-columns: 1fr 1fr; grid-template-rows: auto 220px 80px; }
.editor-tabs { grid-column: 1 / -1; display: flex; gap: 4px; padding: 6px; background: var(--c-bg-soft); }
.etab { font: inherit; border: 0; background: transparent; padding: 4px 10px; border-radius: 6px; cursor: pointer; color: var(--c-text-soft); }
.etab.active { background: var(--c-primary); color: #fff; }
.editor-area { font-family: var(--font-mono); font-size: 13px; border: 0; padding: 10px; resize: none;
  background: #0f172a; color: #e2e8f0; outline: none; }
.editor-preview { border: 0; border-left: 1px solid var(--c-border); background: #fff; }
.editor-console { grid-column: 1 / -1; font-family: var(--font-mono); font-size: 12px; padding: 6px 10px;
  background: #0b1220; color: #cbd5e1; overflow: auto; }
.editor-console .error { color: #fca5a5; }
@media (max-width: 700px) { .editor { grid-template-columns: 1fr; grid-template-rows: auto 180px 180px 70px; } }
```

- [ ] **Step 6: Commit**

```bash
git add assets/js/editor.js tests/editor.test.js tests/index.html assets/css/components.css && git commit -m "feat: éditeur live avec aperçu sandbox et console (TDD)"
```

---

## Phase 6 — Moteur de quiz (bloquant)

### Task 6.1: Calcul du score — TDD

**Files:**
- Create: `assets/js/quiz.js`, `tests/quiz.test.js`

- [ ] **Step 1: Écrire le test**

```js
import { describe, it, assertEqual, assertTrue } from "./runner.js";
import { scoreQuiz } from "../assets/js/quiz.js";

const quiz = [
  { type: "qcm", bonneReponse: 1 },
  { type: "vraifaux", bonneReponse: true },
  { type: "complete", bonneReponse: "addEventListener" }
];

describe("quiz.scoreQuiz", () => {
  it("tout juste -> 1", () => assertEqual(scoreQuiz(quiz, [1, true, "addEventListener"]).ratio, 1));
  it("moitié -> ~0.33 par bonne réponse", () => assertEqual(scoreQuiz(quiz, [1, false, "x"]).ratio, 1/3));
  it("complete insensible à la casse/espaces", () =>
    assertTrue(scoreQuiz([quiz[2]], [" AddEventListener "]).ratio === 1));
});
```

- [ ] **Step 2: Brancher, voir FAIL.**

- [ ] **Step 3: Écrire `quiz.js`**

```js
import { pick, t } from "./i18n.js";

function correct(q, ans) {
  if (q.type === "complete")
    return String(ans).trim().toLowerCase() === String(q.bonneReponse).trim().toLowerCase();
  return ans === q.bonneReponse;
}

export function scoreQuiz(questions, answers) {
  const good = questions.reduce((n, q, i) => n + (correct(q, answers[i]) ? 1 : 0), 0);
  return { good, total: questions.length, ratio: questions.length ? good / questions.length : 1 };
}

// Rend le quiz dans `container`. Appelle onPass(score) si réussi (>= seuil).
export function renderQuiz(container, questions, seuil, onPass) {
  const answers = new Array(questions.length).fill(undefined);
  container.innerHTML = `<div class="quiz">${questions.map((q, i) => `
    <div class="qz" data-i="${i}">
      <p class="qz-q">${i + 1}. ${pick(q.question)}</p>
      <div class="qz-opts">${renderInput(q, i)}</div>
      <p class="qz-explain" hidden>${pick(q.explication)}</p>
    </div>`).join("")}
    <button class="btn btn-primary qz-validate">${t("quizValidate")}</button>
    <p class="qz-result" hidden></p></div>`;

  container.querySelectorAll(".qz").forEach(node => {
    const i = Number(node.dataset.i);
    node.querySelectorAll("[data-val]").forEach(inp =>
      inp.addEventListener("input", () => { answers[i] = readVal(questions[i], inp); }));
  });

  container.querySelector(".qz-validate").addEventListener("click", () => {
    const score = scoreQuiz(questions, answers);
    const passed = score.ratio >= seuil;
    container.querySelectorAll(".qz-explain").forEach(e => e.hidden = false);
    const res = container.querySelector(".qz-result");
    res.hidden = false;
    res.textContent = `${score.good}/${score.total} — ` + (passed ? t("quizPassed") : t("quizFailed"));
    res.className = "qz-result " + (passed ? "ok" : "ko");
    if (passed) onPass(score.ratio);
  });
}

function renderInput(q, i) {
  if (q.type === "complete")
    return `<input class="qz-input" data-val type="text" placeholder="…">`;
  if (q.type === "vraifaux")
    return `<label><input type="radio" name="q${i}" data-val value="true"> ${pick({fr:"Vrai",en:"True"})}</label>
            <label><input type="radio" name="q${i}" data-val value="false"> ${pick({fr:"Faux",en:"False"})}</label>`;
  return q.options.map((o, k) =>
    `<label><input type="radio" name="q${i}" data-val value="${k}"> ${pick(o)}</label>`).join("");
}

function readVal(q, inp) {
  if (q.type === "complete") return inp.value;
  if (!inp.checked) return undefined;
  if (q.type === "vraifaux") return inp.value === "true";
  return Number(inp.value);
}
```

- [ ] **Step 4: Vérifier** → tests passés.

- [ ] **Step 5: Styles quiz dans `components.css`**

```css
.quiz { border: 1px solid var(--c-border); border-radius: var(--radius); padding: 16px; background: var(--c-bg-soft); }
.qz { margin-bottom: 12px; }
.qz-opts label { display: block; padding: 4px 0; cursor: pointer; }
.qz-explain { font-size: 13px; color: var(--c-text-soft); border-left: 3px solid var(--c-primary); padding-left: 8px; }
.qz-result.ok { color: var(--c-success); font-weight: 700; }
.qz-result.ko { color: var(--c-danger); font-weight: 700; }
.qz-input { font: inherit; padding: 6px 8px; border: 1px solid var(--c-border); border-radius: 6px; }
```

- [ ] **Step 6: Commit**

```bash
git add assets/js/quiz.js tests/quiz.test.js tests/index.html assets/css/components.css && git commit -m "feat: moteur de quiz bloquant (TDD)"
```

---

## Phase 7 — Illustrations SVG + logique du projet (météo, heure)

### Task 7.1: Bibliothèque d'illustrations (`illustrations.js`)

**Files:**
- Create: `assets/js/illustrations.js`
- Modify: `assets/css/components.css`

- [ ] **Step 1: Écrire `illustrations.js`** — chaque illustration est une fonction renvoyant du HTML/SVG, exposée via `getIllustration(cle)`. Implémenter au minimum : `dom-tree`, `api-flow`, `fetch-timeline`, `box-model`, `color-formats`, `linear-gradient`, `before-after`.

```js
const lib = {
  "dom-tree": () => `
    <figure class="illus"><figcaption>Le DOM est un arbre</figcaption>
    <svg viewBox="0 0 320 180" width="100%"><!-- html -> body -> (h1, div) -->
      <g font-size="12" text-anchor="middle">
        <rect x="130" y="10" width="60" height="26" rx="6" fill="#0284c7"/><text x="160" y="27" fill="#fff">html</text>
        <rect x="130" y="70" width="60" height="26" rx="6" fill="#0ea5e9"/><text x="160" y="87" fill="#fff">body</text>
        <rect x="40" y="130" width="60" height="26" rx="6" fill="#38bdf8"/><text x="70" y="147" fill="#fff">h1</text>
        <rect x="220" y="130" width="60" height="26" rx="6" fill="#38bdf8"/><text x="250" y="147" fill="#fff">div</text>
        <line x1="160" y1="36" x2="160" y2="70" stroke="#94a3b8"/>
        <line x1="160" y1="96" x2="70" y2="130" stroke="#94a3b8"/>
        <line x1="160" y1="96" x2="250" y2="130" stroke="#94a3b8"/>
      </g></svg></figure>`,
  "api-flow": () => `
    <figure class="illus"><figcaption>Ton code ↔ une API</figcaption>
    <svg viewBox="0 0 360 120" width="100%" font-size="11">
      <rect x="10" y="40" width="90" height="40" rx="8" fill="#0284c7"/><text x="55" y="64" fill="#fff" text-anchor="middle">Navigateur</text>
      <rect x="260" y="40" width="90" height="40" rx="8" fill="#0369a1"/><text x="305" y="64" fill="#fff" text-anchor="middle">API météo</text>
      <line x1="100" y1="52" x2="260" y2="52" stroke="#16a34a" marker-end="url(#a)"/><text x="180" y="46" text-anchor="middle">requête (ville)</text>
      <line x1="260" y1="70" x2="100" y2="70" stroke="#0ea5e9" marker-end="url(#a)"/><text x="180" y="86" text-anchor="middle">réponse (JSON)</text>
      <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#475569"/></marker></defs>
    </svg></figure>`,
  // … fetch-timeline, box-model, color-formats, linear-gradient, before-after
};

export function getIllustration(cle) {
  return (lib[cle] || (() => ""))();
}
```

> **Note d'exécution :** implémenter les 7 clés listées. Les SVG restent simples (formes + texte) ; l'animation se fait en CSS (`@keyframes`) dans `components.css`. `before-after` prend deux fragments via une variante `getIllustration("before-after", {avant, apres})` — adapter la signature pour accepter un second argument optionnel.

- [ ] **Step 2: Ajouter styles `.illus` dans `components.css`**

```css
.illus { margin: 16px 0; padding: 12px; border: 1px dashed var(--c-border); border-radius: var(--radius); background: var(--c-bg-soft); }
.illus figcaption { font-size: 13px; color: var(--c-text-soft); margin-bottom: 6px; font-weight: 700; }
.before-after { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
```

- [ ] **Step 3: Vérifier** via une page temporaire ou la console : `getIllustration("dom-tree")` renvoie du SVG. Commit.

```bash
git add assets/js/illustrations.js assets/css/components.css && git commit -m "feat: bibliothèque d'illustrations SVG"
```

### Task 7.2: Logique météo & heure locale (`weather.js`) — TDD

**Files:**
- Create: `assets/js/weather.js`, `tests/weather.test.js`

- [ ] **Step 1: Écrire le test**

```js
import { describe, it, assertEqual } from "./runner.js";
import { weatherText, localTime } from "../assets/js/weather.js";

describe("weather", () => {
  it("code 0 -> ciel dégagé (fr)", () => assertEqual(weatherText(0, "fr"), "Ciel dégagé"));
  it("code 0 -> clear sky (en)", () => assertEqual(weatherText(0, "en"), "Clear sky"));
  it("code inconnu -> libellé générique", () => assertEqual(weatherText(999, "fr"), "Météo inconnue"));
  it("localTime formate HH:MM pour un fuseau", () => {
    const s = localTime("Europe/Paris", new Date("2026-05-30T12:00:00Z"));
    assertEqual(/^\d{2}:\d{2}$/.test(s), true);
  });
});
```

- [ ] **Step 2: Brancher, voir FAIL.**

- [ ] **Step 3: Écrire `weather.js`** (mapping WMO d'Open-Meteo → description bilingue ; heure via `Intl`)

```js
// Codes météo WMO utilisés par Open-Meteo (sous-ensemble courant).
const WMO = {
  0:  { fr: "Ciel dégagé", en: "Clear sky" },
  1:  { fr: "Plutôt dégagé", en: "Mainly clear" },
  2:  { fr: "Partiellement nuageux", en: "Partly cloudy" },
  3:  { fr: "Couvert", en: "Overcast" },
  45: { fr: "Brouillard", en: "Fog" },
  48: { fr: "Brouillard givrant", en: "Rime fog" },
  51: { fr: "Bruine légère", en: "Light drizzle" },
  61: { fr: "Pluie faible", en: "Light rain" },
  63: { fr: "Pluie modérée", en: "Moderate rain" },
  65: { fr: "Pluie forte", en: "Heavy rain" },
  71: { fr: "Neige faible", en: "Light snow" },
  80: { fr: "Averses", en: "Rain showers" },
  95: { fr: "Orage", en: "Thunderstorm" }
};

export function weatherText(code, lang = "fr") {
  const e = WMO[code];
  if (!e) return lang === "en" ? "Unknown weather" : "Météo inconnue";
  return e[lang] || e.fr;
}

export function localTime(timezone, now = new Date()) {
  try {
    return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: timezone }).format(now);
  } catch {
    return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(now);
  }
}
```

- [ ] **Step 4: Vérifier** → tests passés. Commit.

```bash
git add assets/js/weather.js tests/weather.test.js tests/index.html && git commit -m "feat: logique météo + heure locale (TDD)"
```

---

## Phase 8 — Gabarit d'étape + assemblage de l'application

### Schéma d'un objet-étape (contrat utilisé partout)

```js
{
  titre:       { fr, en },              // libellé court (sidebar + en-tête d'étape)
  besoin:      { fr, en },              // 🎯 phrase déclencheuse + objectif (HTML autorisé)
  decouverte:  { fr, en },              // 💡 pourquoi cette notion
  explication: { fr, en },              // 📖 texte (HTML autorisé)
  illustration: "dom-tree" | null,      // clé d'illustration insérée après l'explication
  exemple:     { code, langage, commentaire: { fr, en } } | null,   // 👀 (affiché en bloc de code)
  exercice:    {                        // ✏️ + ✅ (optionnel)
    enonce: { fr, en },
    fichiers: { html?, css?, js? },     // contenu initial de l'éditeur (onglets = clés présentes)
    correction: { html?, css?, js? }
  } | null,
  application: { fr, en } | null,        // 🚀 ce qu'on ajoute au projet (HTML autorisé)
  quiz:        [ { type:"qcm"|"vraifaux"|"complete", question:{fr,en},
                   options?:[{fr,en}], bonneReponse, explication:{fr,en} } ],
  scoreMinimal: 1,                       // ratio requis pour débloquer (défaut 1 = tout juste)
  defiOptionnel: { fr, en } | null
}
```

### Task 8.1: Gabarit de rendu (`step-template.js`)

**Files:**
- Create: `assets/js/step-template.js`
- Modify: `assets/css/components.css`

- [ ] **Step 1: Écrire `step-template.js`** (rend les blocs présents, branche éditeur, correction, quiz)

```js
import { pick, t } from "./i18n.js";
import { getIllustration } from "./illustrations.js";
import { createEditor } from "./editor.js";
import { renderQuiz } from "./quiz.js";

function block(labelKey, icon, inner) {
  if (!inner) return "";
  return `<section class="step-block"><h3>${icon} ${t(labelKey)}</h3>${inner}</section>`;
}

export function renderStep(container, step, ctx) {
  // ctx = { onComplete: fn(score), gotoNext: fn, gotoPrev: fn, globalIndex }
  const ex = step.exercice;
  container.innerHTML = `
    <article class="step">
      <h2>${pick(step.titre)}</h2>
      ${block("blockNeed", "🎯", `<p class="need">${pick(step.besoin)}</p>`)}
      ${block("blockDiscover", "💡", `<p>${pick(step.decouverte)}</p>`)}
      ${block("blockExplain", "📖", `<div>${pick(step.explication)}</div>${step.illustration ? getIllustration(step.illustration) : ""}`)}
      ${step.exemple ? block("blockExample", "👀",
        `<pre class="code"><code>${escapeHtml(step.exemple.code)}</code></pre><p class="hint">${pick(step.exemple.commentaire)}</p>`) : ""}
      ${ex ? `<section class="step-block"><h3>✏️ ${t("blockExercise")}</h3>
        <p>${pick(ex.enonce)}</p>
        <div class="exo-editor"></div>
        <button class="btn show-sol">${t("showSolution")}</button>
        <div class="solution" hidden></div></section>` : ""}
      ${block("blockApply", "🚀", step.application ? `<div>${pick(step.application)}</div>` : "")}
      ${step.defiOptionnel ? `<section class="step-block challenge"><h3>⭐ ${t("optionalChallenge")}</h3><div>${pick(step.defiOptionnel)}</div></section>` : ""}
      ${step.quiz && step.quiz.length ? `<section class="step-block"><h3>✅ ${t("blockQuiz")}</h3><div class="quiz-host"></div></section>` : ""}
      <nav class="step-nav">
        <button class="btn nav-prev">${t("prev")}</button>
        <button class="btn btn-primary nav-next" ${step.quiz && step.quiz.length ? "disabled" : ""}>${t("next")}</button>
      </nav>
    </article>`;

  // Éditeur d'exercice
  if (ex) {
    const ed = createEditor(container.querySelector(".exo-editor"), ex.fichiers);
    const solBtn = container.querySelector(".show-sol");
    const solBox = container.querySelector(".solution");
    let shown = false;
    solBtn.addEventListener("click", () => {
      shown = !shown;
      solBox.hidden = !shown;
      solBtn.textContent = shown ? t("hideSolution") : t("showSolution");
      if (shown) solBox.innerHTML = Object.entries(ex.correction)
        .map(([k, v]) => `<p class="hint">${k.toUpperCase()}</p><pre class="code"><code>${escapeHtml(v)}</code></pre>`).join("");
    });
  }

  // Quiz bloquant
  const nextBtn = container.querySelector(".nav-next");
  if (step.quiz && step.quiz.length) {
    renderQuiz(container.querySelector(".quiz-host"), step.quiz, step.scoreMinimal ?? 1, (ratio) => {
      nextBtn.disabled = false;
      ctx.onComplete(ratio);
    });
  } else {
    nextBtn.addEventListener("click", () => ctx.onComplete(1));
  }
  nextBtn.addEventListener("click", ctx.gotoNext);
  container.querySelector(".nav-prev").addEventListener("click", ctx.gotoPrev);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
```

- [ ] **Step 2: Styles des blocs d'étape dans `components.css`**

```css
.step h2 { margin-top: 0; }
.step-block { margin: 22px 0; padding: 16px; border: 1px solid var(--c-border); border-radius: var(--radius); background: var(--c-surface); }
.step-block h3 { margin: 0 0 8px; font-family: var(--font-body); font-size: 15px; }
.step-block.challenge { border-style: dashed; }
.need { font-style: italic; font-size: 17px; }
.code { background: #0f172a; color: #e2e8f0; padding: 12px; border-radius: var(--radius-sm); overflow: auto; font-family: var(--font-mono); font-size: 13px; }
.hint { font-size: 13px; color: var(--c-text-soft); }
.step-nav { display: flex; justify-content: space-between; margin-top: 24px; }
```

- [ ] **Step 3: Commit**

```bash
git add assets/js/step-template.js assets/css/components.css && git commit -m "feat: gabarit de rendu d'une étape"
```

### Task 8.2: Assemblage final dans `main.js`

**Files:**
- Modify: `assets/js/main.js`

- [ ] **Step 1: Réécrire `main.js`** pour câbler routeur + sidebar + gabarit + i18n + progression + déverrouillage prof

```js
import { initTheme } from "./theme.js";
import { getLang, setLang, onLangChange, applyStaticI18n, t } from "./i18n.js";
import { startRouter, onRoute, parseHash, navigate, buildHash } from "./router.js";
import { flatSteps, stepAt, globalIndex } from "../../content/modules.js";
import { renderSidebar } from "./sidebar.js";
import { renderStep } from "./step-template.js";
import { isUnlocked, markCompleted, unlockAll, resetProgress } from "./progress.js";

const content = document.getElementById("content");

function show(route) {
  const gi = globalIndex(route.module, route.etape);
  if (gi === -1 || !isUnlocked(gi)) { content.innerHTML = `<p>${t("locked")}</p>`; renderSidebar(route); return; }
  const step = stepAt(route.module, route.etape);
  renderStep(content, step, {
    globalIndex: gi,
    onComplete: (ratio) => { markCompleted(gi, ratio); renderSidebar(route); },
    gotoNext: () => { const n = flatSteps[gi + 1]; if (n) navigate(n.module, n.etape); },
    gotoPrev: () => { const p = flatSteps[gi - 1]; if (p) navigate(p.module, p.etape); }
  });
  renderSidebar(route);
  window.scrollTo(0, 0);
}

// Init
initTheme(document.getElementById("theme-toggle"));
document.getElementById("burger").addEventListener("click", () =>
  document.getElementById("sidebar").classList.toggle("open"));

const langSel = document.getElementById("lang");
langSel.value = getLang();
langSel.addEventListener("change", () => setLang(langSel.value));
onLangChange(() => { applyStaticI18n(); show(parseHash(location.hash)); });
applyStaticI18n();

// Déverrouillage prof : Ctrl+Shift+U
window.addEventListener("keydown", e => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "u") { unlockAll(); show(parseHash(location.hash)); }
});

onRoute(show);
startRouter();
```

- [ ] **Step 2: Vérifier (différé jusqu'à M0/M1 remplis)** — après Phase 9, ouvrir `http://localhost:8000` : la première étape s'affiche, la sidebar montre les verrous, la navigation fonctionne.

- [ ] **Step 3: Commit**

```bash
git add assets/js/main.js && git commit -m "feat: assemblage de l'application (routeur + étapes + progression)"
```

---

## Phase 9 — Contenu de référence : Module 0 (gabarit canonique)

Cette phase remplit `content/modules/m0.js` avec du contenu **complet et réel**. Il sert de **modèle de référence** : tous les modules suivants copient exactement cette structure et ce niveau de détail. À partir d'ici, le ton, la longueur des explications et la forme des exercices sont fixés par cet exemple.

### Task 9.1: Module 0 complet

**Files:**
- Modify: `content/modules/m0.js`

- [ ] **Step 1: Écrire `m0.js` (3 étapes complètes)**

```js
export const m0 = {
  titre: { fr: "Découverte & mise en route", en: "Getting started" },
  etapes: [
    {
      titre: { fr: "À quoi va ressembler le projet ?", en: "What will the project look like?" },
      besoin: { fr: "Avant de coder, voyons ce qu'on va construire : un tableau de bord qui affiche la météo de villes du monde.",
                en: "Before coding, let's see what we'll build: a dashboard showing the weather of cities worldwide." },
      decouverte: { fr: "Comprendre l'objectif final aide à savoir <em>pourquoi</em> chaque notion qu'on apprendra est utile.",
                    en: "Understanding the final goal helps us know <em>why</em> each notion we learn matters." },
      explication: { fr: "L'application finale permettra de taper le nom d'une ville et d'afficher une carte avec son pays, son drapeau, sa température, la météo et l'heure locale. On va la construire petit à petit.",
                     en: "The final app will let you type a city name and show a card with its country, flag, temperature, weather and local time. We'll build it step by step." },
      illustration: null,
      exemple: null,
      exercice: null,
      application: { fr: "Voici un aperçu d'une carte de ville finie :<div class='preview-card'>🇯🇵 <strong>Tokyo</strong> — 22° · Ciel dégagé · 14:30</div>",
                     en: "Here's a preview of a finished city card:<div class='preview-card'>🇯🇵 <strong>Tokyo</strong> — 22° · Clear sky · 14:30</div>" },
      quiz: [
        { type: "qcm", question: { fr: "Que va afficher l'application pour chaque ville ?", en: "What will the app show for each city?" },
          options: [{ fr: "Seulement le nom", en: "Only the name" },
                    { fr: "Pays, drapeau, température, météo et heure", en: "Country, flag, temperature, weather and time" },
                    { fr: "Une vidéo", en: "A video" }],
          bonneReponse: 1,
          explication: { fr: "Chaque carte regroupe toutes ces informations.", en: "Each card gathers all this information." } }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Les 3 fichiers du web", en: "The 3 web files" },
      besoin: { fr: "Pour construire une page web, il nous faut trois fichiers qui jouent chacun un rôle.",
                en: "To build a web page, we need three files, each with its own role." },
      decouverte: { fr: "Séparer structure, style et comportement rend le code clair et réutilisable.",
                    en: "Separating structure, style and behavior keeps code clear and reusable." },
      explication: { fr: "<strong>HTML</strong> = la structure (le contenu). <strong>CSS</strong> = le style (l'apparence). <strong>JavaScript</strong> = le comportement (les actions). Comparaison : HTML est le squelette, CSS les vêtements, JS les muscles.",
                     en: "<strong>HTML</strong> = structure (content). <strong>CSS</strong> = style (looks). <strong>JavaScript</strong> = behavior (actions). Analogy: HTML is the skeleton, CSS the clothes, JS the muscles." },
      illustration: null,
      exemple: { code: "index.html   → structure\nstyle.css    → apparence\nscript.js    → comportement",
                 langage: "text", commentaire: { fr: "Les trois fichiers de notre projet.", en: "The three files of our project." } },
      exercice: {
        enonce: { fr: "Relie ce fichier HTML à un CSS et un JS : complète les deux lignes manquantes dans le <head> et avant </body>.",
                  en: "Link this HTML to a CSS and JS file: complete the two missing lines in <head> and before </body>." },
        fichiers: { html: "<!DOCTYPE html>\n<html>\n<head>\n  <!-- relie le CSS ici -->\n</head>\n<body>\n  <h1>Mon projet</h1>\n  <!-- relie le JS ici -->\n</body>\n</html>",
                    css: "h1 { color: #0284c7; }",
                    js: "console.log('JS branché !');" },
        correction: { html: "<!DOCTYPE html>\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Mon projet</h1>\n  <script src=\"script.js\"></script>\n</body>\n</html>",
                      css: "h1 { color: #0284c7; }",
                      js: "console.log('JS branché !');" }
      },
      application: { fr: "Dans ton dossier <code>projet-eleve/</code>, tu retrouves exactement ces trois fichiers, déjà reliés. C'est ton point de départ.",
                     en: "In your <code>projet-eleve/</code> folder you'll find exactly these three files, already linked. That's your starting point." },
      quiz: [
        { type: "qcm", question: { fr: "Quel fichier gère l'apparence ?", en: "Which file handles the looks?" },
          options: [{ fr: "HTML", en: "HTML" }, { fr: "CSS", en: "CSS" }, { fr: "JavaScript", en: "JavaScript" }],
          bonneReponse: 1, explication: { fr: "Le CSS s'occupe du style.", en: "CSS handles styling." } },
        { type: "complete", question: { fr: "Quelle balise relie un fichier JS ? <…src=\"script.js\">", en: "Which tag links a JS file? <…src=\"script.js\">" },
          bonneReponse: "script", explication: { fr: "<script src=\"…\"> charge le JavaScript.", en: "<script src=\"…\"> loads JavaScript." } }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    },
    {
      titre: { fr: "Comment le navigateur lit ta page", en: "How the browser reads your page" },
      besoin: { fr: "Comprendre ce que fait le navigateur quand il ouvre ta page évite beaucoup d'erreurs plus tard.",
                en: "Understanding what the browser does when it opens your page avoids many later mistakes." },
      decouverte: { fr: "Le navigateur lit le HTML de haut en bas, applique le CSS, puis exécute le JS.",
                    en: "The browser reads HTML top to bottom, applies CSS, then runs JS." },
      explication: { fr: "Le navigateur transforme ton HTML en un <strong>arbre</strong> d'éléments (le DOM). Le CSS habille cet arbre, le JS peut le modifier. On reverra le DOM en détail bientôt.",
                     en: "The browser turns your HTML into a <strong>tree</strong> of elements (the DOM). CSS dresses this tree, JS can change it. We'll revisit the DOM soon." },
      illustration: "dom-tree",
      exemple: null,
      exercice: null,
      application: { fr: "Ton projet est une page que le navigateur lira ainsi à chaque rechargement.",
                     en: "Your project is a page the browser reads this way on every reload." },
      quiz: [
        { type: "vraifaux", question: { fr: "Le navigateur transforme le HTML en un arbre appelé le DOM.", en: "The browser turns HTML into a tree called the DOM." },
          bonneReponse: true, explication: { fr: "Oui, c'est le Document Object Model.", en: "Yes — the Document Object Model." } }
      ],
      scoreMinimal: 1,
      defiOptionnel: null
    }
  ]
};
```

- [ ] **Step 2: Ajouter le style `.preview-card` dans `components.css`**

```css
.preview-card { margin-top: 10px; padding: 14px; border-radius: var(--radius);
  background: linear-gradient(135deg, var(--c-card-grad-a), var(--c-card-grad-b)); color: #fff; font-size: 18px; }
```

- [ ] **Step 3: Vérifier** — ouvrir `http://localhost:8000` : M0 étape 1 s'affiche, le quiz débloque « Étape suivante », la sidebar montre M1+ verrouillés, la navigation et la bascule FR/EN fonctionnent.

- [ ] **Step 4: Commit**

```bash
git add content/modules/m0.js assets/css/components.css && git commit -m "content: Module 0 complet (gabarit de référence)"
```

---

## Phases 10 à 17 — Contenu des modules 1 à 8

> **Pour l'exécutant :** ce sont des tâches de **rédaction de contenu**. Reproduis exactement la structure, le ton et le niveau de détail de `m0.js` (Phase 9). Chaque champ texte est bilingue `{ fr, en }`. Chaque étape suit le schéma de la Phase 8. Chaque étape se termine par 1–3 questions de quiz (`scoreMinimal` par défaut = 1). Vérifie après chaque module : ouvrir l'app, parcourir le module, aucun message d'erreur console, quiz et éditeurs fonctionnels. Commit par module : `content: Module N`.

Pour chaque module, le tableau ci-dessous fixe **les étapes, la notion, l'exercice et le quiz** à produire. Le ton/explication suit M0.

### Task 10: Module 1 — Structure (HTML) → `content/modules/m1.js`

| # | Étape (titre) | Notion expliquée | Illustration | Exercice (starter → correction) | Quiz |
|---|---------------|------------------|-------------|----------------------------------|------|
| 1 | Le squelette d'une page | balises, `<!DOCTYPE>`, `head`/`body` | `dom-tree` | Compléter un squelette HTML minimal valide | QCM : rôle de `<head>` |
| 2 | Un titre et un conteneur | `h1`, `div`, attribut `id` | — | Ajouter un `h1` « Tableau de bord » + un `div id="cartes"` | complete : balise d'un titre principal |
| 3 | Le formulaire de saisie | `form`, `input`, `button`, `placeholder` | — | Créer un champ ville + bouton « Ajouter » | QCM : quel élément reçoit le texte tapé |
| 4 | Application au projet | regrouper le tout dans `index.html` | — | Assembler en-tête + formulaire + conteneur (starter = projet M0, correction = projet fin M1) | vraifaux : un `id` doit être unique |

> **Application projet (fin de module) :** l'élève a maintenant dans `projet-eleve/index.html` un en-tête, un champ de saisie et un bouton « Ajouter », plus un conteneur vide pour les cartes. Snapshot à créer en Phase 17 (`etapes/module-1/`).

### Task 11: Module 2 — Style (CSS) → `content/modules/m2.js`

| # | Étape | Notion | Illustration | Exercice | Quiz |
|---|-------|--------|-------------|----------|------|
| 1 | Cibler avec les sélecteurs | sélecteurs (élément, classe, id), `class` | — | Colorer un `h1` et une classe `.carte` | QCM : que cible `.carte` |
| 2 | Le box model | `margin`, `padding`, `border` | `box-model` | Donner du padding et une bordure à une carte | complete : propriété d'espacement intérieur |
| 3 | **Les couleurs en CSS** | `color`/`background`, hex, `rgb/rgba`, `hsl/hsla` | `color-formats` | Écrire la même couleur en hex puis en rgb | QCM : que permet l'alpha de `rgba` |
| 4 | **Les dégradés `linear-gradient`** | direction (`135deg`), points d'arrêt, multi-couleurs | `linear-gradient` | Transformer un fond plat en dégradé (avant/après sur une carte) | complete : fonction CSS pour un dégradé linéaire |
| 5 | Variables CSS & mode sombre | `:root`, `var()`, `[data-theme]` | — | Définir 2 variables de couleur et les utiliser | vraifaux : `var()` permet de réutiliser une valeur |
| 6 | Flexbox & Grid | `display:flex`, `display:grid`, `gap` | — | Disposer les cartes en grille responsive | QCM : propriété pour l'espace entre éléments |
| 7 | Responsive | `@media`, unités relatives | — | Passer la grille à 1 colonne sur petit écran | vraifaux : `@media` adapte selon la largeur |

> **Application projet :** interface stylée — en-tête, formulaire et grille de cartes avec dégradé, mode sombre, responsive. Snapshot `etapes/module-2/`.

### Task 12: Module 3 — Événements & JS → `content/modules/m3.js`

| # | Étape | Notion | Exercice | Quiz |
|---|-------|--------|----------|------|
| 1 | Variables & fonctions | `const`/`let`, fonction | Déclarer une fonction qui retourne un message | QCM : différence `const`/`let` |
| 2 | Sélectionner un élément | `document.querySelector` | Récupérer le bouton et l'input | complete : méthode pour sélectionner |
| 3 | Réagir au clic | `addEventListener`, objet `event`, `submit`, `preventDefault` | Afficher une alerte au clic sur « Ajouter » | QCM : rôle de `preventDefault` |
| 4 | Lire la valeur saisie | `input.value` | Récupérer et `console.log` la ville tapée | complete : propriété qui contient le texte |

> **Application projet :** cliquer sur « Ajouter » récupère le nom de la ville (affiché temporairement). Snapshot `etapes/module-3/`.

### Task 13: Module 4 — DOM en écriture → `content/modules/m4.js`

| # | Étape | Notion | Illustration | Exercice | Quiz |
|---|-------|--------|-------------|----------|------|
| 1 | Stocker dans un tableau | tableau, `push` | — | Ajouter chaque ville à un tableau `villes` | QCM : méthode pour ajouter en fin de tableau |
| 2 | Créer un élément | `createElement`, `textContent`, `append` | `dom-tree` | Créer un `div.carte` et l'ajouter au conteneur | complete : méthode qui crée un élément |
| 3 | Template literals | backticks, `${}`, `innerHTML` | — | Construire le HTML d'une carte avec un template | vraifaux : `${}` insère une variable |
| 4 | Boucler sur les villes | `for...of` / `forEach` | — | Réafficher toutes les cartes à chaque ajout | QCM : à quoi sert la boucle ici |

> **Application projet :** chaque ville ajoutée crée une vraie carte (données factices). Snapshot `etapes/module-4/`.

### Task 14: Module 5 — API, JSON, fetch → `content/modules/m5.js`

| # | Étape | Notion | Illustration | Exercice | Quiz |
|---|-------|--------|-------------|----------|------|
| 1 | Qu'est-ce qu'une API | client/serveur, requête/réponse | `api-flow` | Lire l'URL de géocodage Open-Meteo et repérer le paramètre `name` | QCM : qu'est-ce qu'une API |
| 2 | Le format JSON | objets, tableaux, clés/valeurs | — | Extraire `country` et `latitude` d'un JSON d'exemple | complete : symbole qui ouvre un objet JSON |
| 3 | `fetch` (sans attente, version simple) | `fetch().then(r=>r.json())` | — | Appeler l'API géocodage et `console.log` le résultat | vraifaux : `fetch` récupère des données distantes |
| 4 | Afficher pays + drapeau | flagcdn (`https://flagcdn.com/{code}.svg`) | — | Insérer drapeau + pays dans la carte | complete : propriété renvoyant le code pays |

> **APIs (référence pour l'exécutant) :** Géocodage `https://geocoding-api.open-meteo.com/v1/search?name={ville}&count=1&language=fr` ; renvoie `results[0]` avec `latitude`, `longitude`, `country`, `country_code`, `timezone`. Drapeau : `https://flagcdn.com/{country_code_minuscule}.svg`.
> **Application projet :** la carte affiche le pays réel + le drapeau. Snapshot `etapes/module-5/`.

### Task 15: Module 6 — async/await → `content/modules/m6.js`

| # | Étape | Notion | Illustration | Exercice | Quiz |
|---|-------|--------|-------------|----------|------|
| 1 | Le problème de l'attente | asynchrone, promesse | `fetch-timeline` | Observer l'ordre d'exécution avec un `setTimeout` | QCM : pourquoi `fetch` est asynchrone |
| 2 | `async` / `await` | `async function`, `await` | — | Réécrire l'appel géocodage avec `await` | complete : mot-clé qui attend une promesse |
| 3 | Enchaîner géocodage → météo | 2e appel `forecast` avec lat/lon | `api-flow` | Récupérer la température courante | QCM : quel paramètre relie les 2 appels |
| 4 | Gérer les erreurs | `try`/`catch`, ville introuvable | — | Afficher un message si la ville n'existe pas | vraifaux : `try/catch` gère les erreurs |

> **APIs :** Prévisions `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,weather_code&timezone=auto` ; lire `current.temperature_2m` et `current.weather_code` (→ `weatherText()` de `weather.js`).
> **Application projet :** la carte affiche température + description météo réelles, erreurs gérées. Snapshot `etapes/module-6/`.

### Task 16: Module 7 — Finitions → `content/modules/m7.js`

| # | Étape | Notion | Exercice | Quiz |
|---|-------|--------|----------|------|
| 1 | L'heure locale | `timezone`, `Intl.DateTimeFormat` (`localTime()`) | Afficher l'heure locale de la ville | complete : objet JS pour formater une date |
| 2 | Sauvegarder les villes | `localStorage`, `JSON.stringify`/`parse` | Persister le tableau `villes` | QCM : à quoi sert `localStorage` |
| 3 | Supprimer une ville | bouton supprimer, filtrer le tableau, re-render | Ajouter une croix qui retire la carte | complete : méthode de tableau qui filtre |
| 4 | États & animations | message « chargement… », transitions CSS | Afficher un état de chargement pendant le fetch | vraifaux : montrer un état de chargement améliore l'UX |

> **Application projet :** application **complète** — heure locale, persistance, suppression, polish. Snapshot `etapes/module-7/` (= projet final de référence).

### Task 17: Module 8 — Défis optionnels → `content/modules/m8.js`

3 étapes, **toutes en `defiOptionnel`** (pas de quiz bloquant, `quiz: []`) :
1. Icône météo dynamique selon `weather_code`.
2. Trier les cartes par température / mettre une ville en favori.
3. Bouton « ma position » via `navigator.geolocation` → météo locale.

> Chaque défi : `besoin`, `explication`, une piste, et un `exercice` avec correction. Pas de verrou.

---

## Phase 18 — Fichiers du projet élève (starter + projet de référence + snapshots)

Le projet de l'élève est **un seul `index.html`, `style.css`, `script.js`**. On fournit : le point de départ (`starter/`), le projet **final de référence** (sert de solution et de source des corrections des modules), et les snapshots de fin de module.

### Task 18.1: Starter

**Files:**
- Create: `projet-eleve/starter/index.html`, `style.css`, `script.js`

- [ ] **Step 1: `index.html` de départ** (relié au CSS/JS, sinon vide)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tableau de bord des villes</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Tu vas construire l'application ici, étape par étape -->
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: `style.css` et `script.js` de départ** (quasi vides avec un commentaire d'amorce)

```css
/* Tes styles iront ici (Module 2) */
```
```js
// Ton code JavaScript ira ici (Module 3)
console.log("Projet prêt !");
```

- [ ] **Step 3: Commit** `git add projet-eleve/starter && git commit -m "content: projet de départ de l'élève"`

### Task 18.2: Projet final de référence

**Files:**
- Create: `projet-eleve/etapes/module-7/index.html`, `style.css`, `script.js`

- [ ] **Step 1: `index.html` final**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tableau de bord des villes</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>🌍 Tableau de bord des villes</h1>
    <form id="form-ville">
      <input id="champ-ville" type="text" placeholder="Entrez une ville…" required>
      <button type="submit">Ajouter</button>
    </form>
    <p id="message" class="message"></p>
  </header>
  <main id="cartes" class="grille"></main>
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: `style.css` final**

```css
:root { --grad-a: #0ea5e9; --grad-b: #2563eb; --bg: #f6f9fc; --text: #0f172a; }
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }
header { padding: 24px; text-align: center; }
#form-ville { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
#champ-ville { padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; min-width: 220px; }
#form-ville button { padding: 10px 18px; border: 0; border-radius: 8px; background: #0284c7; color: #fff; font-weight: 700; cursor: pointer; }
.message { color: #dc2626; min-height: 20px; }
.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; padding: 0 24px 40px; }
.carte { position: relative; border-radius: 16px; padding: 18px; color: #fff;
  background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); box-shadow: 0 8px 20px rgba(2,132,199,.25); }
.carte h2 { margin: 0 0 4px; }
.carte .temp { font-size: 34px; font-weight: 800; }
.carte .meta { opacity: .9; font-size: 14px; }
.carte .suppr { position: absolute; top: 8px; right: 10px; background: rgba(255,255,255,.25); border: 0; color: #fff; border-radius: 999px; width: 26px; height: 26px; cursor: pointer; }
.carte.loading { opacity: .6; }
@media (max-width: 500px) { .grille { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: `script.js` final**

```js
const form = document.getElementById("form-ville");
const champ = document.getElementById("champ-ville");
const conteneur = document.getElementById("cartes");
const message = document.getElementById("message");

let villes = JSON.parse(localStorage.getItem("villes") || "[]");

const WMO = { 0:"Ciel dégagé",1:"Plutôt dégagé",2:"Partiellement nuageux",3:"Couvert",45:"Brouillard",
  51:"Bruine",61:"Pluie faible",63:"Pluie",65:"Pluie forte",71:"Neige",80:"Averses",95:"Orage" };

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nom = champ.value.trim();
  if (!nom) return;
  message.textContent = "";
  champ.value = "";
  try {
    const ville = await chercherVille(nom);
    villes.push(ville);
    sauvegarder();
    afficher();
  } catch (err) {
    message.textContent = err.message;
  }
});

async function chercherVille(nom) {
  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nom)}&count=1&language=fr`).then(r => r.json());
  if (!geo.results || !geo.results.length) throw new Error(`Ville introuvable : ${nom}`);
  const g = geo.results[0];
  const meteo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,weather_code&timezone=auto`).then(r => r.json());
  return {
    nom: g.name, pays: g.country, code: g.country_code.toLowerCase(), timezone: g.timezone,
    temp: Math.round(meteo.current.temperature_2m), météo: WMO[meteo.current.weather_code] || "Météo inconnue"
  };
}

function heureLocale(tz) {
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date());
}

function afficher() {
  conteneur.innerHTML = "";
  villes.forEach((v, i) => {
    const carte = document.createElement("div");
    carte.className = "carte";
    carte.innerHTML = `
      <button class="suppr" data-i="${i}" aria-label="Supprimer">✕</button>
      <h2><img src="https://flagcdn.com/${v.code}.svg" width="22" alt=""> ${v.nom}</h2>
      <div class="meta">${v.pays}</div>
      <div class="temp">${v.temp}°</div>
      <div class="meta">${v.météo} · ${heureLocale(v.timezone)}</div>`;
    conteneur.appendChild(carte);
  });
  conteneur.querySelectorAll(".suppr").forEach(b =>
    b.addEventListener("click", () => { villes.splice(Number(b.dataset.i), 1); sauvegarder(); afficher(); }));
}

function sauvegarder() { localStorage.setItem("villes", JSON.stringify(villes)); }

afficher();
```

- [ ] **Step 4: Vérifier** — copier ces 3 fichiers dans un dossier, lancer le serveur, ouvrir : ajouter « Tokyo », « Paris » → cartes avec drapeau, pays, température, météo, heure ; suppression et persistance fonctionnent.

- [ ] **Step 5: Commit** `git add projet-eleve/etapes/module-7 && git commit -m "content: projet final de référence"`

### Task 18.3: Snapshots intermédiaires (modules 1 à 6)

**Files:**
- Create: `projet-eleve/etapes/module-1/ … module-6/` (3 fichiers chacun)

- [ ] **Step 1: Créer chaque snapshot** comme un sous-ensemble cohérent du projet final, correspondant à l'« Application projet » de fin de module (cf. tableaux Phases 10–16). M1 = structure HTML sans style ni JS ; M2 = + style ; M3 = + lecture de l'input ; M4 = + cartes factices ; M5 = + pays/drapeau réels ; M6 = + température/météo réelles. Ces fichiers servent de point de rattrapage et de source aux corrections d'exercices.

- [ ] **Step 2: Vérifier** chaque snapshot s'ouvre sans erreur console. Commit `git add projet-eleve/etapes && git commit -m "content: snapshots de fin de module 1 à 6"`

---

## Phase 19 — Smoke-test & vérification finale

### Task 19.1: Page de smoke-test

**Files:**
- Create: `tests/smoke.html`

- [ ] **Step 1: Écrire `tests/smoke.html`** — charge tout le contenu, vérifie qu'aucune étape ne plante au rendu, et teste la disponibilité des APIs.

```html
<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>Smoke test</title>
<link rel="stylesheet" href="../assets/css/variables.css">
<link rel="stylesheet" href="../assets/css/components.css"></head>
<body>
<div id="log"></div>
<div id="host" style="position:absolute;left:-9999px"></div>
<script type="module">
import { flatSteps } from "../content/modules.js";
import { renderStep } from "../assets/js/step-template.js";
const log = (m, ok=true) => log_.innerHTML += `<div style="color:${ok?'green':'red'}">${ok?'✓':'✗'} ${m}</div>`;
const log_ = document.getElementById("log");
const host = document.getElementById("host");

// 1) chaque étape se rend sans exception
let okSteps = 0;
flatSteps.forEach((s, i) => {
  try { renderStep(host, s, { globalIndex:i, onComplete(){}, gotoNext(){}, gotoPrev(){} }); okSteps++; }
  catch (e) { log(`étape ${i} (${s.titre.fr}) : ${e.message}`, false); }
});
log(`${okSteps}/${flatSteps.length} étapes rendues sans erreur`, okSteps === flatSteps.length);

// 2) chaque étape avec quiz a une bonneReponse définie
let badQuiz = 0;
flatSteps.forEach(s => (s.quiz||[]).forEach(q => { if (q.bonneReponse === undefined) badQuiz++; }));
log(`quiz : ${badQuiz} question(s) sans bonneReponse`, badQuiz === 0);

// 3) APIs joignables
try {
  const g = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=Paris&count=1").then(r=>r.json());
  log("Open-Meteo geocoding répond ("+(g.results?.[0]?.country||"?")+")", !!g.results);
  const f = await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,weather_code&timezone=auto").then(r=>r.json());
  log("Open-Meteo forecast répond ("+f.current?.temperature_2m+"°)", f.current!=null);
  const flag = await fetch("https://flagcdn.com/fr.svg"); log("flagcdn répond", flag.ok);
} catch(e) { log("API : "+e.message, false); }
</script>
</body></html>
```

- [ ] **Step 2: Lancer** `http://localhost:8000/tests/smoke.html` → toutes les lignes vertes.

- [ ] **Step 3: Commit** `git add tests/smoke.html && git commit -m "test: smoke-test étapes + APIs"`

### Task 19.2: Checklist de vérification manuelle

- [ ] Parcourir le parcours du début à la fin en **français**, puis rebasculer en **anglais** sur quelques étapes : libellés et contenus traduits.
- [ ] Vérifier le **verrouillage** : on ne peut pas sauter une étape sans réussir le quiz ; `Ctrl+Shift+U` déverrouille tout.
- [ ] Vérifier la **persistance** : recharger conserve la progression, la langue et le thème.
- [ ] Vérifier le **mode sombre** sur toutes les pages (lisibilité, contrastes).
- [ ] Vérifier le **responsive** (largeur < 800px : burger ; < 500px : éditeur empilé).
- [ ] Reproduire le **projet final** depuis le starter en suivant les corrections → résultat identique à `etapes/module-7`.

---

## Phase 20 — README

### Task 20.1: README prof + élève

**Files:**
- Create: `README.md`

- [ ] **Step 1: Écrire `README.md`** couvrant : présentation, **comment lancer** (`serve.cmd`/`serve.sh` puis `http://localhost:8000`), où est le parcours vs le projet élève (`projet-eleve/`), le **déverrouillage prof** (`Ctrl+Shift+U`) et la réinitialisation, la bascule FR/EN et thème, comment **ajouter/éditer une étape** (`content/modules/mN.js`, schéma de la Phase 8), et la note sur les APIs gratuites sans clé.

- [ ] **Step 2: Commit** `git add README.md && git commit -m "docs: README prof + élève"`

---

## Auto-revue du plan (vérifiée par l'auteur)

**Couverture du spec :**
- §2 décisions → Conventions + phases (hybride : plateforme vs `projet-eleve/` ; sans build : ES modules ; APIs : weather.js + projet ; layout A : layout.css/sidebar ; style B : variables.css ; quiz bloquant : quiz.js + verrous ; bilingue : i18n ; 1 fichier/module : content/modules). ✓
- §3-4 architecture/fichiers → Carte des fichiers + phases 0-8. ✓
- §5 modèle d'étape → schéma Phase 8 + m0.js. ✓
- §6 éditeur → Phase 5. §7 quiz bloquant → Phase 6. §8 progression → Phase 4. ✓
- §9 i18n → Phase 2. §10 illustrations → Phase 7.1 (7 clés). §11 parcours 8 modules → Phases 9-17. ✓
- §12 flux de données → projet de référence Phase 18.2 + weather.js. §13 responsive/dark/a11y → layout.css/variables.css + checklist 19.2. §14 tests → mini-runner + smoke-test. ✓

**Cohérence des noms :** `flatSteps`, `globalIndex`, `stepAt`, `isUnlocked`, `markCompleted`, `unlockAll`, `pick`, `t`, `parseHash`, `buildHash`, `navigate`, `createEditor`, `buildPreviewDoc`, `renderQuiz`, `scoreQuiz`, `getIllustration`, `weatherText`, `localTime`, `renderStep`, `renderSidebar` — utilisés de façon cohérente entre définitions (phases 2-8) et appels (`main.js`, `step-template.js`, smoke-test). ✓

**Placeholders :** le code du moteur est complet. Les Phases 10-17 sont des tâches de **rédaction de contenu** explicitement cadrées (tableaux étape/notion/exercice/quiz + ton fixé par m0.js de la Phase 9) — pas des placeholders de code.

---

## Hypothèses retenues (à signaler à l'utilisateur)

1. **Seuil de quiz** : `scoreMinimal = 1` par défaut (il faut tout juste pour débloquer), car les quiz font 1–3 questions. Ajustable par étape.
2. **Déverrouillage prof** : raccourci `Ctrl+Shift+U` (+ bouton possible dans un panneau réglages). À confirmer si un autre geste est préféré.
3. **Snapshots intermédiaires** (Task 18.3) : décrits comme sous-ensembles cohérents du projet final plutôt que listés ligne à ligne, pour éviter de dupliquer ~150 lignes 6 fois ; l'exécutant les dérive du projet de référence (18.2).
4. **Coloration syntaxique de l'éditeur** : volontairement minimale (textarea stylé), pas de lib de coloration, conformément au « sans dépendance ».
