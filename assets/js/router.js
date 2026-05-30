const listeners = new Set();

export function parseHash(hash) {
  const m = /^#\/m(\d+)(?:\/e(\d+))?/.exec(hash || "");
  if (!m) return { module: 0, etape: 0 };
  return { module: Number(m[1]) || 0, etape: Number(m[2]) || 0 };
}

export function buildHash(module, etape) { return `#/m${module}/e${etape}`; }

export function navigate(module, etape) { location.hash = buildHash(module, etape); }

export function onRoute(fn) { listeners.add(fn); }

export function startRouter() {
  const fire = () => listeners.forEach(fn => fn(parseHash(location.hash)));
  window.addEventListener("hashchange", fire);
  fire();
}
