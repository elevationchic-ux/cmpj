# Site officiel du CMPJ Régional du Littoral

Manuel d'exploitation destiné à la direction du Centre et à son prestataire technique. Il décrit l'installation, la mise à jour du contenu, la configuration du nom de domaine et le déploiement.

Le CMPJ Régional du Littoral est un centre multifonctionnel de promotion des jeunes situé à New-Bell, Douala, sous tutelle du Ministère de la Jeunesse et de l'Éducation Civique. Le site présente le Centre, ses filières de formation, les conditions d'admission, ses programmes et permet de contacter l'établissement.

## Principe directeur du contenu

Aucune information n'est inventée. Chaque bloc du site dépend d'un champ rempli dans le dossier `contenu/`. Un champ vide, absent ou nul n'est pas affiché : la section correspondante disparaît, sans texte provisoire ni mention « à venir ». Cette règle est appliquée dans tout le code ; il n'existe donc aucun contenu fantôme à surveiller.

La liste des informations restant à transmettre par le Centre figure dans `CONTENU_A_FOURNIR.md`.

## Environnement technique

- Générateur de site statique : Astro 5, rendu statique.
- Feuille de style : Tailwind CSS 4, configurée dans `src/styles/global.css`.
- Polices : Source Serif 4 (titres) et Source Sans 3 (texte), auto-hébergées au format WOFF2, subset latin. Aucune police n'est chargée depuis un service externe.
- Hébergement et fonctions : Cloudflare Pages. Les pages sont servies en statique ; seuls les deux formulaires s'exécutent comme fonctions.
- Aucun service tiers de formulaire, aucun traceur, aucune analyse à des fins publicitaires.

## Prérequis

- Node.js 20 ou version supérieure.
- npm 10 ou version supérieure.

## Installation

```bash
npm install
```

Les scripts d'installation des dépendances natives (esbuild, sharp, workerd) doivent être autorisés. Si npm les bloque, exécuter :

```bash
npm approve-scripts --all
```

## Commandes

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement local, recompilation à chaud sur `http://localhost:4321`. |
| `npm run check` | Vérification TypeScript et des gabarits de contenu. |
| `npm run build` | Build de production dans `dist/`. |
| `npm run preview` | Prévisualisation du build de production. |

Le résultat de `npm run build` contient les pages statiques ainsi que le dossier `_worker.js` et le fichier `_routes.json` nécessaires aux fonctions Cloudflare.

## Structure du projet

```
contenu/                 Texte et données éditables (dossier principal de la direction)
  organisation.json      Identité, adresse, contacts, réseaux, coordonnées GPS
  site.json              Titre d'accueil, description, mission, langues
  navigation.json        Liens de l'en-tête et du pied de page
  pages/                 Pages en Markdown (le-centre, admission, programmes, mentions-legales, confidentialite)
  filieres/              Un fichier Markdown par filière de formation
  actualites/            Articles d'actualité (Markdown), dossier vide tant qu'aucun article n'est fourni
  evenements/            Événements à venir (Markdown)
  telechargements.json   Liste des documents PDF à télécharger
  galerie.json           Albums de la galerie photo
src/                     Code du site (gabarits et logique)
  layouts/BaseLayout.astro   Chassis commun : en-tête, métadonnées, données structurées
  pages/                     Une route par page du site
  pages/api/                 Fonctions des formulaires (contact, inscription)
  components/                Éléments réutilisables (en-tête, pied, formulaires, bouton WhatsApp)
  lib/                       Aides : lecture du contenu, validation des formulaires
  styles/global.css          Palette, typographie, règles Tailwind
public/                  Favicons, image de partage, manifeste, robots.txt, en-têtes
scripts/gen-icomes.mjs   Régénération des favicons et de l'image OG à partir des SVG
```

## Mettre à jour le contenu

Toute modification se fait dans le dossier `contenu/`, sans toucher au code. Après modification, relancer `npm run build` puis déployer. En local, `npm run dev` affiche le résultat immédiatement.

### Identité, adresse et contacts

Fichier : `contenu/organisation.json`.

- `denomination_officielle`, `denomination_courte`, `categorie` : textes affichés dans l'en-tête, le pied de page et les mentions légales.
- `tutelle` : ministère de rattachement, sigle et formule républicaine du bandeau.
- `adresse` : rue, quartier, repère, ville, région, pays. Un champ laissé à `null` n'apparaît pas.
- `contacts.telephones` : tableau de numéros. `contacts.whatsapp` : numéro WhatsApp Business au format international sans séparateur (par exemple 6XXXXXXXX). Le bouton WhatsApp ne s'affiche que si ce champ est renseigné.
- `contacts.email` : adresse de contact.
- `horaires` : texte libre des horaires d'ouverture.
- `reseaux.facebook`, `reseaux.tiktok` : URL complètes. Un réseau non renseigné n'est pas proposé.
- `coordinatees_gps.latitude` et `coordinatees_gps.longitude` : nombres décimaux. Dès qu'ils sont remplis, la page Contact affiche la carte d'accès.

### Textes des pages

Fichier : `contenu/pages/nom.md`. Chaque page est un fichier Markdown. L'en-tête YAML porte le titre, la description (utilisée pour le référencement), l'identifiant d'URL et `publie`. Le corps du fichier constitue le texte affiché. Écrire en français, sans tirets longs ni points d'exclamation, conformément à la charte.

Pages existantes : `le-centre.md`, `admission.md`, `programmes.md`, `mentions-legales.md`, `confidentialite.md`.

### Général du site

Fichier : `contenu/site.json`.

- `titre_accueil`, `description_site`, `mission` : textes de l'accueil et du référencement.
- `chiffres_cles` : tableau d'objets `{ "valeur": "...", "label": "..." }` pour le bloc d'indicateurs de l'accueil (année de création, nombre de jeunes formés, etc.). Un indicateur sans valeur saisie ne s'affiche pas. Le tableau vide masque le bloc entier.

### Filières de formation

Dossier : `contenu/filieres/`. Un fichier par filière, avec un en-tête YAML :

```yaml
titre: Menuiserie
slug: menuiserie
ordre: 5
publie: true
icone: menuiserie
duree:
niveau_acces:
frais:
capacite:
diplome:
```

- `icone` : pictogramme de la filière. Valeurs disponibles : `menuiserie`, `metal`, `electricite`, `textile`, `automobile`, `graphique`. Un champ vide n'affiche aucun pictogramme.
- Les champs laissés vides ne s'affichent pas. Une filière dont on ne connaît que le nom tient sur une page factuelle rappelant que le détail est communiqué par le secrétariat. Pour retirer provisoirement une filière de la liste, passer `publie: false`.

### Actualités et événements

Dossiers : `contenu/actualites/` et `contenu/evenements/`. Un fichier Markdown par élément. L'en-tête porte le titre, la date au format `AAAA-MM-JJ`, la catégorie et un résumé. Tant que ces dossiers sont vides, les pages concernées affichent une phrase descriptive neutre et le fil d'actualité reste vide, sans message « à venir ».

### Documents à télécharger

Fichier : `contenu/telechargements.json`. Tableau d'objets :

```json
[
  {
    "titre": "Formulaire de demande d'admission",
    "url": "/documents/demande-admission.pdf",
    "format": "PDF",
    "taille": "180 Ko",
    "description": "Formulaire à retourner au secrétariat."
  }
]
```

Placer les fichiers PDF dans `public/documents/`. Un tableau vide masque la section Téléchargements.

### Galerie

Fichier : `contenu/galerie.json`. Tableau d'albums, chacun avec un titre, une date et une liste `media` (url, legende, credits, type). Les photographies doivent être réelles, légendées et diffusées avec l'accord des personnes visibles. Un tableau vide masque la galerie.

### Image de partage et favicons

L'image de partage et les icônes sont des visuels typographiques aux couleurs du Centre. Pour les régénérer après modification des SVG sources :

```bash
node scripts/gen-icomes.mjs
```

Pour remplacer l'image de partage par une photographie réelle, déposer le fichier dans `public/` et mettre à jour la référence dans `src/layouts/BaseLayout.astro`.

## Formulaires et anti-spam

Deux formulaires sont en service : pré-inscription (page Admission) et contact (page Contact).

- Validation côté navigateur et côté serveur. Les messages d'erreur sont en français.
- Anti-spam discret, sans CAPTCHA visible ni service tiers : un champ piège invisible et un contrôle de durée. Un envoi trop rapide est rejeté.
- Le site fonctionne sans JavaScript : l'envoi est traité par la fonction et renvoie une page d'accusé de réception. Avec JavaScript, la confirmation s'affiche sans rechargement.
- Les demandes sont transmises à l'adresse ou au service défini par `FORMS_WEBHOOK_URL`. Sans configuration, la demande est accusée à l'écran et reste à relever côté régie.

## Configuration du nom de domaine

Le domaine définitif doit être confirmé par la direction. La valeur par défaut est `https://cmpj-littoral.cm`.

Pour l'ajuster, copier `.env.example` en `.env` et renseigner :

```
PUBLIC_SITE_URL=https://domaine-definitif.cm
FORMS_WEBHOOK_URL=
```

Cette variable alimente les URL canoniques, le sitemap et les métadonnées Open Graph. Le fichier `.env` n'est pas versionné.

### Faire-pointer le domaine .cm

1. Créer le projet Pages et déployer (voir ci-dessous).
2. Dans le tableau de bord Cloudflare Pages, ajouter le domaine dans « Custom domains ».
3. Chez le registraire .cm, créer un enregistrement `CNAME` vers l'URL `nom-du-projet.pages.dev`, ou indiquer les serveurs Cloudflare si le domaine est géré par Cloudflare.
4. Laisser Cloudflare émettre le certificat HTTPS. Ne pas activer le site avant que le certificat soit valide.

## Déploiement sur Cloudflare Pages

Depuis le tableau de bord Cloudflare :

1. Connecter le dépôt Git du projet.
2. Framework preset : Astro.
3. Commande de build : `npm run build`. Dossier de sortie : `dist`.
4. Variable d'environnement de build : `PUBLIC_SITE_URL`.
5. Redéployer à chaque modification de contenu.

En local avec l'interface en ligne de commande :

```bash
npx wrangler pages deploy dist
```

Les en-têtes de sécurité et le cache sont définis dans `public/_headers`. Le fichier `public/robots.txt` déclare l'emplacement du sitemap.

## Ajout d'une seconde langue

Le site est conçu pour l'anglais mais ne l'active pas. La langue courante est fixée dans `contenu/site.json` (`langue_active: "fr"`, `langues_disponibles: ["fr"]`). Pour activer une langue, prévoir un jeu de fichiers par langue dans `contenu/` et ajouter l'identifiant à `langues_disponibles`. Rien ne s'affiche tant que les textes correspondants n'existent pas.

## Contrôle qualité

Le rapport de contrôle (`RAPPORT_CONTROLE.md`) consigne les poids de pages, les vérifications d'accessibilité et les tests effectués à la livraison.
