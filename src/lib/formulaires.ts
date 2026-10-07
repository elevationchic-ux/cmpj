// Aide commune aux endpoints de formulaires : page d'accuse simple, sans dependance externe.

export function pageAccuse(titre: string, corps: string, ok = true): string {
  const couleur = ok ? '#0F5B3A' : '#B3202A';
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${escapeHtml(titre)}</title>
<style>
  :root { color-scheme: light; }
  body { margin:0; font:17px/1.7 'Segoe UI', system-ui, sans-serif; background:#FAF8F3; color:#1C2321; }
  header { background:${couleur}; color:#fff; padding:14px 20px; font-weight:600; }
  main { max-width:640px; margin:0 auto; padding:32px 20px 64px; }
  .carte { background:#fff; border:1px solid #D9D6CC; border-radius:4px; padding:24px; margin-top:20px; }
  a { color:#0F5B3A; }
</style>
</head>
<body>
<header>${escapeHtml(titre)}</header>
<main>
  <div class="carte">${corps}</div>
  <p><a href="/">&larr; Retour à l'accueil</a></p>
</main>
</body>
</html>`;
}

function escapeHtml(valeur: string): string {
  return valeur.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

// Transmission facultative vers une adresse du Centre. En l'absence de cible configuree,
// la demande est consideree enregistree ; la direction branche l'envoi en production.
export async function transmettre(
  cible: string | undefined,
  payload: Record<string, unknown>
): Promise<void> {
  if (!cible) return;
  try {
    await fetch(cible, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // L'echec de la transmission ne doit pas exposer de donnee au visiteur.
  }
}
