import { describe, it, assertEqual } from "./runner.js";
import { richText, escapeText } from "../assets/js/sanitize.js";

describe("sanitize.escapeText", () => {
  it("échappe < > &", () => assertEqual(escapeText("a & <b>"), "a &amp; &lt;b&gt;"));
  it("ne double-échappe PAS les entités déjà présentes", () =>
    assertEqual(escapeText("&lt;html&gt; &amp; &#39;"), "&lt;html&gt; &amp; &#39;"));
  it("tolère null", () => assertEqual(escapeText(null), ""));
});

describe("sanitize.richText", () => {
  it("échappe une balise dangereuse <script>", () =>
    assertEqual(richText('<script src="x">'), '&lt;script src="x"&gt;'));
  it("préserve <strong>", () =>
    assertEqual(richText("<strong>a</strong>"), "<strong>a</strong>"));
  it("préserve <code> mais échappe son contenu littéral", () =>
    assertEqual(richText("<code><input></code>"), "<code>&lt;input&gt;</code>"));
  it("échappe <head> et </body> (exemples littéraux)", () =>
    assertEqual(richText("le <head> et </body>"), "le &lt;head&gt; et &lt;/body&gt;"));
  it("préserve <em> et <br>", () =>
    assertEqual(richText("a<br><em>b</em>"), "a<br><em>b</em>"));
  it("gère les balises écrites en entités (&lt;html&gt;) dans un <code>", () =>
    assertEqual(richText("(<code>&lt;html&gt;</code>)"), "(<code>&lt;html&gt;</code>)"));
  it("tolère null", () => assertEqual(richText(null), ""));
});
