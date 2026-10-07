// Helpers de contenu. Centralisent la regle : une information absente n'est pas affichee.
import { getCollection, render } from 'astro:content';
import type { Lang } from './i18n';

// Langue d'une entree de contenu. Les entrees sans champ lang sont en francais.
const langOf = (e: { data: { lang?: string } }): Lang => (e.data.lang === 'en' ? 'en' : 'fr');

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

export async function getOrganisation(lang: Lang = 'fr') {
  const entrees = await getCollection('organisation');
  return entrees.find((e) => langOf(e) === lang)?.data ?? {};
}

export async function getSite(lang: Lang = 'fr') {
  const entrees = await getCollection('site');
  return entrees.find((e) => langOf(e) === lang)?.data ?? {};
}

export async function getNavigation(lang: Lang = 'fr') {
  const entrees = await getCollection('navigation');
  return entrees.find((e) => langOf(e) === lang)?.data ?? { liens: [], liens_pied: [] };
}

export async function getTelechargements(lang: Lang = 'fr') {
  const entrees = await getCollection('telechargements');
  return entrees.filter((e) => langOf(e) === lang).map((e) => e.data);
}

export async function getGalerie(lang: Lang = 'fr') {
  const entrees = await getCollection('galerie');
  return entrees.filter((e) => langOf(e) === lang).map((e) => e.data);
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

// Composants filieres : liste publiee, triee, dans la langue demandee.
export async function getFilieresPubliees(lang: Lang = 'fr') {
  const toutes = await getCollection('filieres', (e) => e.data.publie === true && langOf(e) === lang);
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

export async function getActualitesPubliees(lang: Lang = 'fr') {
  const toutes = await getCollection('actualites', (e) => e.data.publie === true && langOf(e) === lang);
  return toutes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPagesStatiques(lang: Lang = 'fr') {
  const toutes = await getCollection('pages', (e) => e.data.publie !== false && langOf(e) === lang);
  return toutes.sort((a, b) => (a.data.ordre ?? 999) - (b.data.ordre ?? 999));
}

// Retourne une page statutaire par son slug, dans la langue demandee. Null si absente.
export async function getPageBySlug(slug: string, lang: Lang = 'fr') {
  const toutes = await getCollection('pages');
  return toutes.find((e) => (e.data.slug ?? e.id) === slug && langOf(e) === lang) ?? null;
}

// Identifiant d'une actualite convertible en segment d'URL. Les entrees anglaises vivent
// dans un sous-dossier (id 'en/...') ; on retire ce prefix pour que le miroir /en/ soit propre.
export function slugActualite(id: string): string {
  return id.replace(/^en\//, '');
}

export async function rendreMarkdown(entry: any) {
  const { Content } = await render(entry);
  return Content;
}
