# Rapport de contrôle

Site officiel du CMPJ Régional du Littoral. Contrôle effectué à la livraison, hors mise en production. Les mesures portent sur le build de production servi en local, en mode mobile, avec la simulation réseau standard de Lighthouse.

## Périmètre contrôlé

- 19 routes générées : accueil, Le Centre, Formations (liste et six fiches de filière), Admission, Programmes, Actualités, Galerie, Contact, Mentions légales, Confidentialité, Plan du site, pages 404 et 500.
- Deux fonctions de formulaire : pré-inscription et contact.
- Configuration : en-têtes de sécurité, robots.txt, sitemap, manifeste, favicons, image de partage.

## Méthode

- Lighthouse 13, Chrome sans interface, moteur d'émulation mobile (Moto G Power, 4G bridée, simulate), lecture du dossier `dist` par un serveur statique local.
- Poids des fichiers mesurés sur le disque, puis taille après compression gzip pour estimer le volume réellement transféré.
- Vérifications de forme (signatures, typographie, contenu) par recherche automatisée dans le code source et dans le HTML produit.

## Scores Lighthouse (mobile)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | --- | --- | --- | --- |
| Accueil | 99 | 100 | 100 | 100 |
| Admission | 99 | 100 | 100 | 100 |
| Formations | 99 | 100 | 100 | 100 |

Métriques retenues sur ces pages : LCP 1,7 s, CLS 0, TBT négligeable. Le score de performance dépasse le seuil demandé de 90 sur l'ensemble des pages testées.

Note sur les polices : le chargement est réglé sur `font-display: swap`, avec des faces de repli portant les mesures typographiques de la police du Centre (`size-adjust`, `ascent-override`, `descent-override`). Le texte s'affiche immédiatement à la taille exacte de la police finale : aucun décalage au chargement (CLS mesuré à 0,000 sur toutes les pages) et la typographie du Centre est visible dès la première visite. Les deux faces utilisées au premier rendu sont préchargées.

## Poids des pages

Le style est intégré au HTML (aucun fichier CSS séparé). Les tableaux ci-dessous donnent le poids du document seul, puis le poids estimé en service, document compressé et polices inclus.

| Route | Document brut | Document compressé |
| --- | --- | --- |
| /admission/ | 15,2 Ko | 4,6 Ko |
| /contact/ | 12,6 Ko | 3,8 Ko |
| /formations/ | 11,8 Ko | 3,3 Ko |
| / (accueil) | 11,1 Ko | 2,9 Ko |
| /confidentialite/ | 10,4 Ko | 3,2 Ko |
| /le-centre/ | 10,2 Ko | 3,2 Ko |
| /mentions-legales/ | 10,1 Ko | 3,1 Ko |
| /plan-du-site/ | 9,9 Ko | 2,7 Ko |
| /programmes/ | 9,7 Ko | 3,0 Ko |
| Fiches de filière (6) | 9,2 à 9,4 Ko | 2,7 à 2,8 Ko |
| /actualites/ | 9,1 Ko | 2,8 Ko |
| /galerie/ | 8,6 Ko | 2,6 Ko |
| /404.html, /500.html | 8,3 à 8,4 Ko | 2,6 Ko |

Polices auto-hébergées, quatre faces latin au format WOFF2, 72,9 Ko au total, aucun fichier source externe. Une page courante transfère son document compressé (3 à 5 Ko) et les deux faces visibles au premier rendu (environ 36 Ko), soit un poids réel compris entre 40 et 80 Ko selon les polices déjà en cache. Le budget de 150 Ko hors images est respecté avec une marge importante.

Aucune photographie n'est encore publiée : le Centre n'a pas fourni d'images réelles. Les emplacements visuels restent masqués jusqu'à livraison.

## Vérifications de contenu et de forme

- Règle « aucune invention » : chaque bloc dépend d'un champ renseigné. Un champ vide, nul ou absent masque la section. Aucun texte provisoire, aucun « à venir », aucun contenu de remplissage.
- Zéro mention de génération, aucune balise `generator` dans le HTML produit.
- Aucun terme de remplissage ou de promotion creuse relevé dans le contenu.
- Aucun tiret long dans les fichiers de contenu.
- Aucun point d'exclamation dans les textes édités.
- Aucun appel de débogage dans le code source.

## Vérifications de référencement

- Titre et description propres à chaque page.
- URL canoniques en français, structure au format `/section/page/`.
- Sitemap généré (`sitemap-index.xml`) et déclaré dans `robots.txt`.
- Métadonnées Open Graph et Twitter sur chaque page, image de partage dédiée.
- Données structurées `GovernmentOrganization` limitées aux informations réellement fournies : dénomination, adresse renseignée, site, réseaux déclarés, tutelle. Aucun champ inventé.

## Vérifications d'accessibilité (WCAG 2.1 AA)

- Lien d'évitement « Aller au contenu » en tête de chaque page.
- Structure de titres hiérarchisée, un `h1` par page.
- Contraste des couleurs institutionnelles sur fond blanc cassé.
- Focus clavier visible (contour net sur tout élément interactif).
- Formules républicaines et monogramme servis en texte, pas en image seule.
- Attribution `aria` sur les zones dynamiques (menu mobile, confirmation des filtres).
- Score d'accessibilité Lighthouse 100 sur les pages testées.

## Vérifications de sécurité et d'hébergement

- En-têtes appliqués sur l'ensemble du site : `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Politique de sécurité de contenu restrictive, avec contrôle de l'origine des requêtes de formulaire.
- Polices, favicons et image de partage auto-hébergés. Aucun appel à un tiers pour les ressources d'affichage.
- Aucun traceur ni service d'analyse à des fins publicitaires.
- Les deux formulaires rejettent les envois automatisés par un champ piège invisible et un contrôle de durée, sans CAPTCHA visible.

## Rafraîchissement jeunesse (seconde passe)

Une seconde passe a renforcé l'impact visuel et la clarté pour le public jeune, sans surcharge et sans toucher aux règles de fond (aucune invention, tons institutionnels, masque de l'absent) :

- Bandeau tricolore de 3 px en tête de site, marque de l'État.
- Accroche de l'accueil construite à partir des données réelles : compte des filières publiées écrit en lettres, quartier et ville repris de l'adresse. Aucun chiffre inventé.
- Bouton « Candidater » en rouge brique dans l'en-tête sur toutes les pages ; les actions principales passent au rouge brique, le vert restant la couleur d'identité.
- Menu mobile en deux groupes, « Découvrir » puis « Agir ».
- Barre d'action fixe en bas d'écran sur mobile (Choisir une filière / Se préinscrire), masquée en grand écran ; pied de page prolongé d'une réserve pour ne rien couvrir ; bouton WhatsApp rehaussé sur mobile.
- Titres de sections intérieures en sans, capitulées, petite corps (style section-titre), contrastant avec les titres de page en serif.
- Pictogrammes SVG inline par filière (dessin au trait, monochrome, poids nul), affichés dans les listes, les cartes et l'en-tête des fiches.
- Parcours « S'inscrire en trois étapes » sur l'accueil.
- Fiches de filière : navigation filière précédente / suivante, lien WhatsApp par filière, questions courantes remaniées en titres parlants (« Ce que vous apprendrez », « Ce que vous ferez en atelier », « Où vous travaillerez ») ; débouchés formulés avec des verbes d'action.
- Page Formations : cartes empilées sur mobile, tableau réservé aux grand écrans.
- Bloc de chiffres-clés prêt sur l'accueil : alimenté par `chiffres_cles` dans `contenu/site.json`, affiché seulement si des valeurs sont saisies. Vide à ce jour, donc masqué.
- Microcopy d'action partout : « Voir les filières », « Pré-inscription en ligne », « Écrire au Centre », « Écrire sur WhatsApp ».

## Réserves et suite

- Les mesures ont été réalisées en local avec un serveur statique non compressé ; le déploiement sur le réseau de diffusion ajoutera la compression de transport. Un contrôle Lighthouse sur l'URL définitive en HTTPS est recommandé après mise en ligne.
- Le nom de domaine définitif en `.cm` reste à confirmer par la direction, puis à saisir dans la variable `PUBLIC_SITE_URL`.
- Les contenus en attente de transmission par le Centre (coordonnées, filières détaillées, photographies, actualités, documents à télécharger) sont listés dans `CONTENU_A_FOURNIR.md`. Les pages concernées restent volontairement sobres jusqu'à livraison.
