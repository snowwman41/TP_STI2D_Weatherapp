import { describe, it, assertTrue } from "./runner.js";
import { buildPreviewDoc } from "../assets/js/editor.js";

describe("editor.buildPreviewDoc", () => {
  const doc = buildPreviewDoc("<h1>Hi</h1>", "h1{color:red}", "console.log(1)");
  it("inclut le HTML", () => assertTrue(doc.includes("<h1>Hi</h1>")));
  it("inclut le CSS dans une balise style", () => assertTrue(doc.includes("h1{color:red}")));
  it("inclut le JS dans une balise script", () => assertTrue(doc.includes("console.log(1)")));
  it("relaie la console au parent", () => assertTrue(doc.includes("postMessage")));
});
