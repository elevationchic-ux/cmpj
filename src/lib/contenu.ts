// Helpers de contenu. Centralisent la regle : une information absente n'est pas affichee.
import { getCollection, render } from 'astro:content';

// Considéré comme absent : null, undefined, chaine vide ou blanche, tableau vide.
export function estPresent(valeur: unknown): boolean {
  if (valeur === null || valeur === undefined) return false;
  if (typeof valeur === 'string') return valeur.trim().length > 0;
  if (Array.isArray(valeur)) return valeur.length > 0;
  return true;
}

// Retourne la valeur uniquement si elle est presente, sinon null.
export function valeurOuNulle<T>(valeur: T | null | undefined): T | null {
  return estPresent(valeur) ? (valeur as T) : null;
}

export async function getOrganisation() {
  const entrees = await getCollection('organisation');
  return entrees[0]?.data ?? {};
}

export async function getSite() {
  const entrees = await getCollection('site');
  return entrees[0]?.data ?? {};
}

export async function getNavigation() {
  const entrees = await getCollection('navigation');
  return entrees[0]?.data ?? { liens: [], liens_pied: [] };
}

export async function getTelechargements() {
  const entrees = await getCollection('telechargements');
  return entrees.map((e) => e.data);
}

export async function getGalerie() {
  const entrees = await getCollection('galerie');
  return entrees.map((e) => e.data);
}

// Un message pre-rempli pour WhatsApp, sans inventer le numero : renvoie null si absent.
export function lienWhatsApp(numero: unknown, message: string): string | null {
  if (!estPresent(numero)) return null;
  const propre = String(numero).replace(/[^0-9]/g, '');
  if (propre.length < 8) return null;
  return `https://wa.me/${propre}?text=${encodeURIComponent(message)}`;
}

// Date en francais, sans dependance externe.
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatDateCourt(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

// Composants filieres : liste publiee, triee.
export async function getFilieresPubliees() {
  const toutes = await getCollection('filieres', (e) => e.data.publie === true);
  return toutes.sort((a, b) => (a.data.ordre ?? 999) - (b.data.ordre ?? 999));
}

// Ecrit un petit nombre en lettres pour l'accroche de l'accueil (0 a 20, au dela : chiffre).
export function nombreEnLettres(n: number): string {
  const mots = [
    'zero', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf',
    'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt',
  ];
  return n >= 0 && n <= 20 ? mots[n] : String(n);
}

export async function getActualitesPubliees() {
  const toutes = await getCollection('actualites', (e) => e.data.publie === true);
  return toutes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPagesStatiques() {
  const toutes = await getCollection('pages', (e) => e.data.publie !== false);
  return toutes.sort((a, b) => (a.data.ordre ?? 999) - (b.data.ordre ?? 999));
}

export async function rendreMarkdown(entry: any) {
  const { Content } = await render(entry);
  return Content;
}
