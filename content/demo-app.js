// Démo interactive de l'application finale, affichée à l'étape 0 pour montrer
// l'objectif. C'est une variante du projet final (projet-eleve/etapes/module-7) :
// - SANS localStorage (interdit dans une iframe sandbox sans allow-same-origin) ;
// - avec quelques villes pré-chargées pour que la démo soit vivante tout de suite.
// Le moteur l'exécute dans une iframe sandbox via buildPreviewDoc().

export const demoApp = {
  html: `<header>
  <h1>🌍 Tableau de bord des villes</h1>
  <form id="form-ville">
    <input id="champ-ville" type="text" placeholder="Entrez une ville…" required>
    <button type="submit">Ajouter</button>
  </form>
  <p id="message" class="message"></p>
</header>
<main id="cartes" class="grille"></main>`,

  css: `:root { --grad-a: #0ea5e9; --grad-b: #2563eb; --bg: #f6f9fc; --text: #0f172a; }
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }
header { padding: 18px; text-align: center; }
h1 { font-size: 20px; margin: 0 0 12px; }
#form-ville { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
#champ-ville { padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; min-width: 200px; }
#form-ville button { padding: 10px 18px; border: 0; border-radius: 8px; background: #0284c7; color: #fff; font-weight: 700; cursor: pointer; }
.message { color: #dc2626; min-height: 18px; }
.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; padding: 0 18px 24px; }
.carte { position: relative; border-radius: 16px; padding: 16px; color: #fff;
  background: linear-gradient(135deg, var(--grad-a), var(--grad-b)); box-shadow: 0 8px 20px rgba(2,132,199,.25); }
.carte h2 { margin: 0 0 4px; font-size: 17px; }
.carte .temp { font-size: 30px; font-weight: 800; }
.carte .meta { opacity: .9; font-size: 13px; }
.carte .suppr { position: absolute; top: 8px; right: 10px; background: rgba(255,255,255,.25); border: 0; color: #fff; border-radius: 999px; width: 24px; height: 24px; cursor: pointer; }`,

  js: `const form = document.getElementById("form-ville");
const champ = document.getElementById("champ-ville");
const conteneur = document.getElementById("cartes");
const message = document.getElementById("message");
let villes = [];

const WMO = { 0:"Ciel dégagé",1:"Plutôt dégagé",2:"Partiellement nuageux",3:"Couvert",45:"Brouillard",
  51:"Bruine",61:"Pluie faible",63:"Pluie",65:"Pluie forte",71:"Neige",80:"Averses",95:"Orage" };

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nom = champ.value.trim();
  if (!nom) return;
  message.textContent = "";
  champ.value = "";
  try { villes.push(await chercherVille(nom)); afficher(); }
  catch (err) { message.textContent = err.message; }
});

async function chercherVille(nom) {
  const geo = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(nom) + "&count=1&language=fr").then(r => r.json());
  if (!geo.results || !geo.results.length) throw new Error("Ville introuvable : " + nom);
  const g = geo.results[0];
  const meteo = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + g.latitude + "&longitude=" + g.longitude + "&current=temperature_2m,weather_code&timezone=auto").then(r => r.json());
  return { nom: g.name, pays: g.country, code: g.country_code.toLowerCase(), timezone: g.timezone,
    temp: Math.round(meteo.current.temperature_2m), météo: WMO[meteo.current.weather_code] || "Météo inconnue" };
}

function heureLocale(tz) {
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date());
}

function afficher() {
  conteneur.innerHTML = "";
  villes.forEach((v, i) => {
    const carte = document.createElement("div");
    carte.className = "carte";
    carte.innerHTML =
      '<button class="suppr" data-i="' + i + '" aria-label="Supprimer">✕</button>' +
      '<h2><img src="https://flagcdn.com/' + v.code + '.svg" width="20" alt=""> ' + v.nom + '</h2>' +
      '<div class="meta">' + v.pays + '</div>' +
      '<div class="temp">' + v.temp + '°</div>' +
      '<div class="meta">' + v.météo + ' · ' + heureLocale(v.timezone) + '</div>';
    conteneur.appendChild(carte);
  });
  conteneur.querySelectorAll(".suppr").forEach(b =>
    b.addEventListener("click", () => { villes.splice(Number(b.dataset.i), 1); afficher(); }));
}

// Villes pré-chargées pour que la démo soit vivante immédiatement.
["Tokyo", "Paris", "New York"].forEach(nom =>
  chercherVille(nom).then(v => { villes.push(v); afficher(); }).catch(() => {}));`
};
