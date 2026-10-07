// Endpoint de pre-inscription. Les donnees ne sont jamais affichees publiquement.
import type { APIRoute } from 'astro';
import { validerInscription, controleAntiSpam, assainir } from '../../lib/validation';
import { pageAccuse, transmettre } from '../../lib/formulaires';

export const prerender = false;

function veutDuJson(request: Request): boolean {
  const accept = request.headers.get('accept') || '';
  return accept.includes('application/json') || request.headers.get('x-requested-with') === 'fetch';
}

export const POST: APIRoute = async ({ request, locals }) => {
  const form = await request.formData();

  if (!controleAntiSpam(form)) {
    if (veutDuJson(request)) {
      return Response.json({ ok: false, erreurs: {} }, { status: 400 });
    }
    return new Response('Demande refusée', { status: 400 });
  }

  const { erreurs, donnees } = validerInscription(form);
  const env = (locals as any).runtime?.env ?? {};

  if (Object.keys(erreurs).length > 0) {
    if (veutDuJson(request)) {
      return Response.json({ ok: false, erreurs }, { status: 422 });
    }
    const liste = Object.values(erreurs).map((e) => `<li>${assainir(e)}</li>`).join('');
    return new Response(
      pageAccuse('Pré-inscription incomplète', `<p>Certaines informations manquent ou sont incorrectes :</p><ul>${liste}</ul><p><a href="/admission/">Revenir au formulaire</a></p>`, false),
      { status: 422, headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  }

  await transmettre(env.FORMS_WEBHOOK_URL, {
    type: 'inscription',
    nom: assainir(donnees.nom),
    prenom: assainir(donnees.prenom),
    email: assainir(donnees.email),
    telephone: assainir(donnees.telephone),
    filiere: assainir(donnees.filiere),
    recu_le: new Date().toISOString(),
  });

  if (veutDuJson(request)) {
    return Response.json({ ok: true });
  }
  return new Response(
    pageAccuse(
      'Pré-inscription enregistrée',
      `<p>Votre pré-inscription a bien été enregistrée. Elle prépare le dépôt du dossier et ne vaut pas inscription définitive.</p><p>Complétez la démarche en retirant le dossier auprès du secrétariat, puis en le déposant avec les pièces demandées pour la session en cours.</p>`
    ),
    { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }
  );
};
