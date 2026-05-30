import { describe, it, assertEqual } from "./runner.js";
import { parseHash } from "../assets/js/router.js";

describe("router.parseHash", () => {
  it("hash vide -> module 0 étape 0", () => assertEqual(parseHash(""), { module: 0, etape: 0 }));
  it("#/m3/e2 -> {3,2}", () => assertEqual(parseHash("#/m3/e2"), { module: 3, etape: 2 }));
  it("tolère absence d'étape", () => assertEqual(parseHash("#/m5"), { module: 5, etape: 0 }));
  it("valeurs non numériques -> 0", () => assertEqual(parseHash("#/mx/ey"), { module: 0, etape: 0 }));
});
