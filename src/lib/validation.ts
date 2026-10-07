// Validation partagee entre le navigateur et le serveur. Regles identiques des deux cotes.

export interface ResultatValidation {
  erreurs: Record<string, string>;
  donnees: Record<string, string>;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const telephoneRegex = /^[+0-9 ().-]{6,20}$/;

function propre(valeur: FormData | URLSearchParams, cle: string): string {
  const brut = valeur.get(cle);
  return typeof brut === 'string' ? brut.trim() : '';
}

export function validerContact(form: FormData | URLSearchParams): ResultatValidation {
  const erreurs: Record<string, string> = {};
  const nom = propre(form, 'nom');
  const email = propre(form, 'email');
  const message = propre(form, 'message');

  if (nom.length < 2) erreurs.nom = 'Indiquez votre nom.';
  if (!emailRegex.test(email)) erreurs.email = 'Indiquez une adresse électronique valide.';
  if (message.length < 10) erreurs.message = 'Votre message est trop court.';
  if (message.length > 2000) erreurs.message = 'Votre message dépasse la longueur autorisée.';

  return { erreurs, donnees: { nom, email, message, sujet: propre(form, 'sujet') } };
}

export function validerInscription(form: FormData | URLSearchParams): ResultatValidation {
  const erreurs: Record<string, string> = {};
  const nom = propre(form, 'nom');
  const prenom = propre(form, 'prenom');
  const email = propre(form, 'email');
  const telephone = propre(form, 'telephone');
  const filiere = propre(form, 'filiere');

  if (nom.length < 2) erreurs.nom = 'Indiquez votre nom.';
  if (prenom.length < 2) erreurs.prenom = 'Indiquez votre prénom.';
  if (!emailRegex.test(email)) erreurs.email = 'Indiquez une adresse électronique valide.';
  if (!telephoneRegex.test(telephone)) erreurs.telephone = 'Indiquez un numéro de téléphone joignable.';
  if (filiere === '') erreurs.filiere = 'Choisissez une filière.';

  return {
    erreurs,
    donnees: {
      nom,
      prenom,
      email,
      telephone,
      filiere,
      annee: propre(form, 'annee'),
      commentaire: propre(form, 'commentaire'),
    },
  };
}

// Anti-spam sans service tiers : leurre (doit rester vide) et duree minimale de remplissage.
// Le champ t est la seconde epoch de rendu de la page, y compris sans JavaScript.
export function controleAntiSpam(form: FormData | URLSearchParams, secondesMin = 3): boolean {
  if (propre(form, '_gotcha') !== '') return false;
  const t = Number(propre(form, 't'));
  if (!Number.isFinite(t) || t <= 0) return false;
  const ecoulee = Math.floor(Date.now() / 1000) - t;
  return ecoulee >= secondesMin;
}

// Nettoyage minimal avant tout usage ou journalisation.
export function assainir(valeur: string): string {
  return valeur.replace(/[<>]/g, '').slice(0, 2000);
}
