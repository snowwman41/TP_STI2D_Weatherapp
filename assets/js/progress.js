import { supabase } from './supabase-client.js';

const listeners = new Set();
let currentPseudo = null;

function base() { return { completed: {}, scores: {}, teacher: false }; }
let state = base();

export function initProgress(pseudo, savedData) {
  currentPseudo = pseudo;
  state = savedData || base();
  listeners.forEach(fn => fn(state));
}

async function syncToSupabase() {
  if (!currentPseudo) return;
  await supabase.from('progress').upsert({
    pseudo: currentPseudo,
    data: state,
    updated_at: new Date().toISOString()
  });
}

function save() {
  listeners.forEach(fn => fn(state));
  syncToSupabase();
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
