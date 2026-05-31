const form = document.getElementById("form-ville");
const champ = document.getElementById("champ-ville");
const conteneur = document.getElementById("cartes");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = champ.value.trim();
  if (!nom) return;
  message.textContent = "";
  champ.value = "";

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nom)}&count=1&language=fr`)
    .then((r) => r.json())
    .then((geo) => {
      if (!geo.results || !geo.results.length) {
        message.textContent = `Ville introuvable : ${nom}`;
        return;
      }
      const g = geo.results[0];
      const code = g.country_code.toLowerCase();
      const carte = document.createElement("div");
      carte.className = "carte";
      carte.innerHTML = `
        <h2><img src="https://flagcdn.com/${code}.svg" width="22" alt=""> ${g.name}</h2>
        <div class="meta">${g.country}</div>
        <div class="temp">—°</div>
        <div class="meta">Météo non chargée</div>`;
      conteneur.appendChild(carte);
    });
});
