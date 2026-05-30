// Bibliothèque d'illustrations SVG pédagogiques.
const lib = {
  "dom-tree": () => `
    <figure class="illus"><figcaption>Le DOM est un arbre</figcaption>
    <svg viewBox="0 0 320 180" width="100%"><g font-size="12" text-anchor="middle">
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

  "fetch-timeline": () => `
    <figure class="illus"><figcaption>fetch() est asynchrone</figcaption>
    <svg viewBox="0 0 360 140" width="100%" font-size="11" text-anchor="middle">
      <rect x="10" y="20" width="80" height="28" rx="6" fill="#0284c7"/><text x="50" y="38" fill="#fff">appel fetch()</text>
      <rect x="110" y="20" width="140" height="28" rx="6" fill="#e2e8f0" stroke="#94a3b8"/><text x="180" y="38" fill="#475569">⏳ attente réseau…</text>
      <rect x="270" y="20" width="80" height="28" rx="6" fill="#16a34a"/><text x="310" y="38" fill="#fff">réponse reçue</text>
      <line x1="90" y1="34" x2="110" y2="34" stroke="#94a3b8" marker-end="url(#arr)"/>
      <line x1="250" y1="34" x2="270" y2="34" stroke="#94a3b8" marker-end="url(#arr)"/>
      <text x="180" y="80" fill="#475569" font-size="12">Le code continue pendant l'attente</text>
      <rect x="10" y="95" width="340" height="22" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
      <rect x="10" y="95" width="80" height="22" rx="4" fill="#bae6fd"/>
      <text x="50" y="110" fill="#0284c7" font-size="10">fetch lancé</text>
      <text x="230" y="110" fill="#16a34a" font-size="10">.then() appelé</text>
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#94a3b8"/></marker></defs>
    </svg></figure>`,

  "box-model": () => `
    <figure class="illus"><figcaption>Le modèle de boîte CSS</figcaption>
    <svg viewBox="0 0 320 200" width="100%" font-size="11" text-anchor="middle">
      <rect x="10" y="10" width="300" height="180" rx="6" fill="#fef9c3" stroke="#ca8a04"/>
      <text x="160" y="26" fill="#ca8a04" font-weight="700">margin</text>
      <rect x="35" y="35" width="250" height="130" rx="6" fill="#fed7aa" stroke="#ea580c"/>
      <text x="160" y="51" fill="#ea580c" font-weight="700">border</text>
      <rect x="60" y="60" width="200" height="80" rx="4" fill="#bbf7d0" stroke="#16a34a"/>
      <text x="160" y="75" fill="#16a34a" font-weight="700">padding</text>
      <rect x="85" y="82" width="150" height="40" rx="4" fill="#bae6fd" stroke="#0284c7"/>
      <text x="160" y="106" fill="#0284c7" font-weight="700">content</text>
    </svg></figure>`,

  "color-formats": () => `
    <figure class="illus"><figcaption>La même couleur, 3 formats</figcaption>
    <svg viewBox="0 0 360 100" width="100%" font-size="11" text-anchor="middle">
      <circle cx="60" cy="45" r="28" fill="#0284c7"/>
      <text x="60" y="85" fill="#475569">hex #0284c7</text>
      <circle cx="180" cy="45" r="28" fill="rgb(2,132,199)"/>
      <text x="180" y="85" fill="#475569">rgb(2,132,199)</text>
      <circle cx="300" cy="45" r="28" fill="hsl(200,98%,39%)"/>
      <text x="300" y="85" fill="#475569">hsl(200,98%,39%)</text>
    </svg></figure>`,

  "linear-gradient": () => `
    <figure class="illus"><figcaption>linear-gradient en CSS</figcaption>
    <svg viewBox="0 0 320 120" width="100%" font-size="12" text-anchor="middle">
      <defs>
        <linearGradient id="lg1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0ea5e9"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="280" height="60" rx="10" fill="url(#lg1)"/>
      <text x="160" y="54" fill="#fff" font-weight="700">135deg</text>
      <text x="30" y="100" fill="#0ea5e9">#0ea5e9</text>
      <text x="290" y="100" fill="#2563eb">#2563eb</text>
    </svg></figure>`,

  "before-after": (data = {}) => `
    <figure class="illus"><figcaption>Avant / Après</figcaption>
    <div class="before-after">
      <div><strong>Avant</strong>${data.avant || "<div class='placeholder'>avant</div>"}</div>
      <div><strong>Après</strong>${data.apres || "<div class='placeholder'>après</div>"}</div>
    </div></figure>`,
};

export function getIllustration(cle, data) {
  const fn = lib[cle];
  return fn ? fn(data) : "";
}
