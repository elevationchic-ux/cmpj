// Endpoint de contact. Tourne en Pages Function (prerender = false) sur Cloudflare.
import type { APIRoute } from 'astro';
import { validerContact, controleAntiSpam, assainir } from '../../lib/validation';
import { pageAccuse, transmettre } from '../../lib/formulaires';

export const prerender = false;

function veutDuJson(request: Request): boolean {
  const accept = request.headers.get('accept') || '';
  return accept.includes('application/json') || request.headers.get('x-requested-with') === 'fetch';
}

export const POST: APIRoute = async ({ request, locals }) => {
  const form = await request.formData();

  if (!controleAntiSpam(form)) {
    // Reponse neutre pour ne rien reveler aux robots.
    if (veutDuJson(request)) {
      return Response.json({ ok: false, erreurs: {} }, { status: 400 });
    }
    return new Response('Demande refusée', { status: 400 });
  }

  const { erreurs, donnees } = validerContact(form);
  const env = (locals as any).runtime?.env ?? {};

  if (Object.keys(erreurs).length > 0) {
    if (veutDuJson(request)) {
      return Response.json({ ok: false, erreurs }, { status: 422 });
    }
    const liste = Object.values(erreurs).map((e) => `<li>${assainir(e)}</li>`).join('');
    return new Response(
      pageAccuse('Formulaire incomplet', `<p>Votre message n'a pas pu être envoyé. Merci de corriger :</p><ul>${liste}</ul><p><a href="/contact/">Revenir au formulaire</a></p>`, false),
      { status: 422, headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  }

  await transmettre(env.FORMS_WEBHOOK_URL, {
    type: 'contact',
    nom: assainir(donnees.nom),
    email: assainir(donnees.email),
    sujet: assainir(donnees.sujet),
    message: assainir(donnees.message),
    recu_le: new Date().toISOString(),
  });

  if (veutDuJson(request)) {
    return Response.json({ ok: true });
  }
  return new Response(
    pageAccuse('Message transmis', `<p>Votre demande a bien été enregistrée. Le secrétariat du Centre la prend en charge.</p><p>Pour une réponse rapide, vous pouvez également écrire directement au Centre.</p>`),
    { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }
  );
};
