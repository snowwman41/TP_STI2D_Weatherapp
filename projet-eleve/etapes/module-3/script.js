const form = document.getElementById("form-ville");
const champ = document.getElementById("champ-ville");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const ville = champ.value.trim();
  console.log("Ville :", ville);
  champ.value = "";
});
