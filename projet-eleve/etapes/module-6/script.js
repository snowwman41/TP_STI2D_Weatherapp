const form = document.getElementById("form-ville");
const champ = document.getElementById("champ-ville");
const conteneur = document.getElementById("cartes");
const message = document.getElementById("message");

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
    afficherCarte(ville);
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
    nom: g.name,
    pays: g.country,
    code: g.country_code.toLowerCase(),
    temp: Math.round(meteo.current.temperature_2m),
    météo: WMO[meteo.current.weather_code] || "Météo inconnue"
  };
}

function afficherCarte(v) {
  const carte = document.createElement("div");
  carte.className = "carte";
  carte.innerHTML = `
    <h2><img src="https://flagcdn.com/${v.code}.svg" width="22" alt=""> ${v.nom}</h2>
    <div class="meta">${v.pays}</div>
    <div class="temp">${v.temp}°</div>
    <div class="meta">${v.météo}</div>`;
  conteneur.appendChild(carte);
}
