import { supabase } from './supabase-client.js';

const ADMIN_PSEUDO = 'soltani';
const ADMIN_PASSWORD = 'snowwmana141219922';

export function showLogin() {
  return new Promise((resolve) => {
    const overlay = document.getElementById('login-overlay');
    const form = document.getElementById('login-form');
    const input = document.getElementById('pseudo-input');
    const passwordInput = document.getElementById('password-input');
    const errorEl = document.getElementById('login-error');
    const submitBtn = form.querySelector('button[type="submit"]');

    let awaitingPassword = false;

    input.focus();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorEl.hidden = true;

      // ── Étape 2 : vérification du mot de passe admin ──
      if (awaitingPassword) {
        if (passwordInput.value !== ADMIN_PASSWORD) {
          errorEl.textContent = 'Mot de passe incorrect.';
          errorEl.hidden = false;
          passwordInput.value = '';
          passwordInput.focus();
          return;
        }
        overlay.style.display = 'none';
        resolve({ pseudo: ADMIN_PSEUDO, savedData: { teacher: true, completed: {}, scores: {} } });
        return;
      }

      // ── Étape 1 : saisie du pseudo ──
      const pseudo = input.value.trim().toLowerCase();
      if (!pseudo) return;

      if (pseudo === ADMIN_PSEUDO) {
        input.disabled = true;
        passwordInput.style.display = 'block';
        passwordInput.required = true;
        passwordInput.focus();
        awaitingPassword = true;
        return;
      }

      // ── Flux normal élève ──
      submitBtn.disabled = true;
      submitBtn.textContent = '...';

      try {
        const { data, error } = await supabase
          .from('progress')
          .select('data')
          .eq('pseudo', pseudo)
          .maybeSingle();

        if (error) throw error;

        overlay.style.display = 'none';
        resolve({ pseudo, savedData: data?.data || null });
      } catch {
        errorEl.textContent = 'Erreur de connexion. Réessaie.';
        errorEl.hidden = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Commencer →';
      }
    });
  });
}
