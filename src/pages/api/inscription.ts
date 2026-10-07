// Endpoint de pre-inscription. Les donnees ne sont jamais affichees publiquement.
import type { APIRoute } from 'astro';
import { validerInscription, controleAntiSpam, assainir } from '../../lib/validation';
import { pageAccuse, transmettre, lireLangue } from '../../lib/formulaires';
import { t } from '../../lib/i18n';

export const prerender = false;

function veutDuJson(request: Request): boolean {
  const accept = request.headers.get('accept') || '';
  return accept.includes('application/json') || request.headers.get('x-requested-with') === 'fetch';
}

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const lang = lireLangue(form);
  const retour = lang === 'en' ? '/en/admission/' : '/admission/';

  if (!controleAntiSpam(form)) {
    if (veutDuJson(request)) {
      return Response.json({ ok: false, erreurs: {} }, { status: 400 });
    }
    return new Response(t(lang, 'ack.refused'), { status: 400 });
  }

  const { erreurs, donnees } = validerInscription(form, lang);
  const webhook = process.env.FORMS_WEBHOOK_URL;

  if (Object.keys(erreurs).length > 0) {
    if (veutDuJson(request)) {
      return Response.json({ ok: false, erreurs }, { status: 422 });
    }
    const liste = Object.values(erreurs).map((e) => `<li>${assainir(e)}</li>`).join('');
    return new Response(
      pageAccuse(t(lang, 'ack.incomplete_pre'), `<p>${t(lang, 'ack.incomplete_pre_body')}</p><ul>${liste}</ul><p><a href="${retour}">${t(lang, 'ack.back_form')}</a></p>`, false, lang),
      { status: 422, headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  }

  await transmettre(webhook, {
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
      t(lang, 'ack.pre_recorded'),
      `<p>${t(lang, 'ack.pre_recorded_body')}</p><p>${t(lang, 'ack.pre_recorded_extra')}</p>`,
      true,
      lang
    ),
    { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }
  );
};
