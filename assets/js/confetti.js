// Petit canon à confettis pour féliciter l'élève quand un exercice est réussi.
// Volontairement minimal : un canvas plein écran éphémère, une poignée de
// particules avec gravité, puis nettoyage automatique. Aucune dépendance.
//
// Respecte « prefers-reduced-motion » : si l'utilisateur préfère moins
// d'animations, on ne lance rien.

const COULEURS = ["#0284c7", "#22c55e", "#facc15", "#f97316", "#ec4899", "#a855f7"];

// Lance un petit jet de confettis depuis le point (x, y) en pixels écran.
// Par défaut, le jet part du centre bas de la fenêtre.
export function celebrate(x = window.innerWidth / 2, y = window.innerHeight * 0.7) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  // Petit jet : ~36 particules projetées vers le haut en éventail.
  const particules = Array.from({ length: 36 }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.1; // vers le haut, en éventail
    const vitesse = 6 + Math.random() * 6;
    return {
      x, y,
      vx: Math.cos(angle) * vitesse,
      vy: Math.sin(angle) * vitesse,
      taille: 5 + Math.random() * 5,
      couleur: COULEURS[(Math.random() * COULEURS.length) | 0],
      rotation: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.3,
      vie: 1
    };
  });

  const GRAVITE = 0.18;
  const FROTTEMENT = 0.99;

  function frame() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let vivantes = false;

    for (const p of particules) {
      p.vx *= FROTTEMENT;
      p.vy = p.vy * FROTTEMENT + GRAVITE;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vrot;
      p.vie -= 0.012;
      if (p.vie <= 0) continue;
      vivantes = true;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.vie);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.couleur;
      ctx.fillRect(-p.taille / 2, -p.taille / 2, p.taille, p.taille * 0.6);
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
