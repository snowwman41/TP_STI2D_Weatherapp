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
  const passed = results.filter(r => r.ok).length;
  const allOk = passed === results.length;

  // Mode navigateur : rendu HTML dans #results.
  if (typeof document !== "undefined") {
    const root = document.getElementById("results");
    root.innerHTML =
      `<h1>${passed}/${results.length} tests passés</h1>` +
      results.map(r =>
        `<div style="color:${r.ok ? "green" : "red"}">` +
        `${r.ok ? "✓" : "✗"} [${r.suite}] ${r.name}` +
        (r.ok ? "" : `<br><small>${r.message}</small>`) + `</div>`
      ).join("");
    document.title = allOk ? "TESTS OK" : "TESTS FAIL";
    return;
  }

  // Mode node : sortie console + code de sortie (permet la vérification headless).
  results.forEach(r =>
    console.log(`${r.ok ? "✓" : "✗"} [${r.suite}] ${r.name}` + (r.ok ? "" : ` — ${r.message}`)));
  console.log(`${passed}/${results.length} tests passés`);
  if (typeof process !== "undefined") process.exitCode = allOk ? 0 : 1;
}
