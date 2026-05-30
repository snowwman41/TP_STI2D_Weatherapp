export function buildPreviewDoc(html, css, js) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css || ""}</style></head>
<body>${html || ""}
<script>
  (function(){
    const relay = (type, args) => parent.postMessage({ __preview:true, type,
      text: args.map(a => { try { return typeof a === "object" ? JSON.stringify(a) : String(a); } catch { return String(a); } }).join(" ") }, "*");
    ["log","warn","error"].forEach(k => { const o = console[k]; console[k] = (...a) => { relay(k, a); o.apply(console, a); }; });
    window.addEventListener("error", e => relay("error", [e.message]));
  })();
<\/script>
<script>${js || ""}<\/script>
</body></html>`;
}

// Crée un éditeur dans `container` à partir de fichiers {html,css,js}.
// Retourne { getCode, setCode }.
export function createEditor(container, initial, opts = {}) {
  const files = { html: initial.html || "", css: initial.css || "", js: initial.js || "" };
  const tabs = opts.tabs || Object.keys(files).filter(k => initial[k] != null);
  let active = tabs[0];

  container.innerHTML = `
    <div class="editor">
      <div class="editor-tabs">${tabs.map(t => `<button class="etab" data-t="${t}">${t.toUpperCase()}</button>`).join("")}</div>
      <textarea class="editor-area" spellcheck="false"></textarea>
      <iframe class="editor-preview" sandbox="allow-scripts"></iframe>
      <div class="editor-console" aria-label="console"></div>
    </div>`;

  const area = container.querySelector(".editor-area");
  const frame = container.querySelector(".editor-preview");
  const cons = container.querySelector(".editor-console");
  const setActive = (tt) => { active = tt; area.value = files[active];
    container.querySelectorAll(".etab").forEach(b => b.classList.toggle("active", b.dataset.t === tt)); };
  container.querySelectorAll(".etab").forEach(b => b.addEventListener("click", () => setActive(b.dataset.t)));

  let timer;
  const refresh = () => { cons.innerHTML = ""; frame.srcdoc = buildPreviewDoc(files.html, files.css, files.js); };
  area.addEventListener("input", () => { files[active] = area.value; clearTimeout(timer); timer = setTimeout(refresh, 400); });

  window.addEventListener("message", e => {
    if (e.data && e.data.__preview) {
      const line = document.createElement("div");
      line.className = "cline " + e.data.type;
      line.textContent = (e.data.type === "error" ? "⛔ " : "› ") + e.data.text;
      cons.appendChild(line);
    }
  });

  setActive(active);
  refresh();
  return { getCode: () => ({ ...files }), setCode: (f) => { Object.assign(files, f); setActive(active); refresh(); } };
}
