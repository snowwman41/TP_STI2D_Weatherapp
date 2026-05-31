const form = document.getElementById("form-ville");
const champ = document.getElementById("champ-ville");
const conteneur = document.getElementById("cartes");

let villes = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = champ.value.trim();
  if (!nom) return;
  champ.value = "";
  villes.push({ nom: nom });
  afficher();
});

function afficher() {
  conteneur.innerHTML = "";
  villes.forEach((v) => {
    const carte = document.createElement("div");
    carte.className = "carte";
    carte.innerHTML = `
      <h2>${v.nom}</h2>
      <div class="meta">Pays ?</div>
      <div class="temp">—°</div>
      <div class="meta">Météo inconnue</div>`;
    conteneur.appendChild(carte);
  });
}
