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
