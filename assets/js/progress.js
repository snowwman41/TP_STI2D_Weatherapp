const KEY = "tbv:progress";
const hasLS = typeof localStorage !== "undefined";
const listeners = new Set();

function base() { return { completed: {}, scores: {}, teacher: false }; }

function load() {
  if (!hasLS) return base();
  try { return JSON.parse(localStorage.getItem(KEY)) || base(); }
  catch { return base(); }
}
let state = load();

function save() {
  if (hasLS) localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach(fn => fn(state));
}

export function onProgressChange(fn) { listeners.add(fn); }

export function isCompleted(i) { return !!state.completed[i]; }
export function isUnlocked(i) { return i === 0 || state.teacher || isCompleted(i - 1); }
export function markCompleted(i, score) {
  state.completed[i] = true;
  if (score != null) state.scores[i] = score;
  save();
}
export function unlockAll() { state.teacher = true; save(); }
export function resetProgress() { state = base(); save(); }
export function getState() { return state; }
