// Canon à confettis pour féliciter l'élève quand un exercice ou un quiz est réussi.
// Un canvas plein écran éphémère, des particules avec gravité et flottement,
// puis nettoyage automatique. Aucune dépendance.

const COULEURS = ["#0284c7", "#22c55e", "#facc15", "#f97316", "#ec4899", "#a855f7", "#38bdf8"];

// Lance un jet de confettis depuis le point (x, y) en pixels écran.
// Par défaut, le jet part du centre bas de la fenêtre.
export function celebrate(x = window.innerWidth / 2, y = window.innerHeight * 0.7) {
  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  // Deux jets légèrement inclinés (gauche/droite) pour un effet de double canon
  // plus fourni qu'un simple éventail.
  const particules = [];
  for (const cote of [-1, 1]) {
    for (let i = 0; i < 45; i++) {
      // Angle de base vers le haut, incliné vers l'extérieur, avec dispersion.
      const angle = -Math.PI / 2 + cote * 0.35 + (Math.random() - 0.5) * 0.9;
      const vitesse = 8 + Math.random() * 9;
      particules.push({
        x, y,
        vx: Math.cos(angle) * vitesse,
        vy: Math.sin(angle) * vitesse,
        taille: 6 + Math.random() * 6,
        couleur: COULEURS[(Math.random() * COULEURS.length) | 0],
        rond: Math.random() < 0.3,                 // ~30% de confettis ronds
        rotation: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.25,
        phase: Math.random() * Math.PI * 2,        // déphasage du flottement
        flottement: 0.6 + Math.random() * 0.9,     // amplitude de l'oscillation
        vie: 1,
        declin: 0.004 + Math.random() * 0.003      // disparition lente et variée
      });
    }
  }

  const GRAVITE = 0.16;
  const FROTTEMENT = 0.985;
  let temps = 0;

  function frame() {
    temps += 1;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let vivantes = false;

    for (const p of particules) {
      p.vx *= FROTTEMENT;
      p.vy = p.vy * FROTTEMENT + GRAVITE;
      // Flottement : léger balancement horizontal, comme un vrai confetti qui tombe.
      p.x += p.vx + Math.sin(temps * 0.06 + p.phase) * p.flottement;
      p.y += p.vy;
      p.rotation += p.vrot;
      // On ne commence à s'effacer qu'une fois la fusée retombée (effet plus long).
      if (p.vy > 0) p.vie -= p.declin;
      if (p.vie <= 0 || p.y > window.innerHeight + 20) continue;
      vivantes = true;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.vie);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.couleur;
      if (p.rond) {
        ctx.beginPath();
        ctx.arc(0, 0, p.taille / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Rectangle « ruban » qui s'aplatit selon la rotation pour donner du relief.
        const h = p.taille * (0.4 + 0.3 * Math.abs(Math.cos(p.rotation)));
        ctx.fillRect(-p.taille / 2, -h / 2, p.taille, h);
      }
      ctx.restore();
    }

    if (vivantes) {
      requestAnimationFrame(frame);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(frame);
}
