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
