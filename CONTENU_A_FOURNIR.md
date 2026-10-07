# Contenu à fournir par le Centre

Ce document liste les informations, documents et visuels que la direction du CMPJ Régional du Littoral doit transmettre pour compléter et publier le site. Le site est déjà en ligne avec les seules informations connues à ce jour. Toute information absente de cette liste, ou non renvoyée, reste masquée : rien n'est inventé, aucun texte provisoire n'apparaît au public.

Pour chaque élément, indiquez la valeur exacte à publier. Vous pouvez renvoyer ce fichier complété, ou modifier directement les fichiers du dossier `contenu/` (procédure décrite dans le README).

## 1. Identité et dénomination

- Dénomination officielle complète, telle qu'elle doit apparaître (en-tête, pied de page, mentions légales).
- Sigle et appellation courte autorisés.
- Catégorie exacte du centre (régionale) et, si disponible, la référence de l'arrêté ou de la décision de création.
- Éventuel logo officiel du Centre (fichier vectoriel SVG ou image haute définition sur fond transparent). Sans logo, un monogramme typographique « CM » aux couleurs du Centre est utilisé.

## 2. Coordonnées et accès

- Adresse postale exacte, avec rue, numéro et repère précis à New-Bell.
- Coordonnées GPS (latitude, longitude) pour la carte d'accès.
- Horaires d'ouverture du secrétariat (jours et plages horaires).
- Numéros de téléphone fixes et mobiles du secrétariat.
- Numéro WhatsApp Business (avec indicatif pays) destiné au public.
- Adresse(s) électronique(s) officielle(s) de contact et d'admission.
- Lien TikTok officiel, s'il existe (le lien Facebook est déjà intégré).

Fichier concerné : `contenu/organisation.json`.

## 3. Direction et organisation

- Nom et titre du ou de la chef de centre (responsable de la publication).
- Organigramme du Centre et noms des services (secrétariat, ateliers, régie des finances).
- Nom et fonction des personnes à citer, avec autorisation de diffusion.
- Historique du Centre : année de création, dates clés, évolution des filières.

Fichiers concernés : `contenu/pages/le-centre.md`, `contenu/organisation.json`.

## 4. Filières de formation

La liste actuelle (chaudronnerie, électricité, industrie d'habillement, mécanique automobile, menuiserie, infographie) est reprise de la page Facebook du Centre. Merci de la confirmer et de la compléter.

Les descriptions générales de chaque métier, le contenu du programme et les débouchés professionnels sont déjà rédigés dans les fichiers de filière. Merci de les valider ou de signaler les ajustements à y apporter (intitulés locaux, spécificités de l'enseignement au CMPJ, filières supprimées ou ajoutées).

Pour chaque filière, fournir les informations propres au Centre, encore non renseignées :

- Intitulé exact et, s'il existe, code officiel.
- Durée de la formation.
- Niveau d'accès requis (diplôme, âge).
- Frais de scolarité et modalités de paiement.
- Capacité d'accueil par promotion.
- Diplôme ou attestation délivré.
- Conditions d'admission propres à la filière.
- Contact ou atelier référent.
- Photographie réelle de l'atelier, avec légende et autorisation de diffusion.

Fichiers concernés : un fichier par filière dans `contenu/filieres/`.

## 5. Admission et inscription

- Pièces à fournir pour le dossier d'admission (liste exacte par session).
- Frais et débours par filière et par session.
- Calendrier des inscriptions : dates d'ouverture et de clôture, dates de sélection, rentrée.
- Formulaire de dossier à mettre en téléchargement (PDF léger).
- Modalités de paiement et délivrance du reçu par la régie des finances.

Fichiers concernés : `contenu/pages/admission.md`, `contenu/telechargements.json`.

## 6. Programmes et partenariats

- Confirmation de la présence d'une unité de l'Observatoire National de la Jeunesse (ONJ) au Centre.
- Programmes en cours (PTS-Jeunes, bourses, dispositifs d'appui), avec le texte ou le communiqué officiel de référence.
- Liste des partenaires institutionnels, privés et associatifs, avec leur logo autorisé et la nature du partenariat.

Fichier concerné : `contenu/pages/programmes.md`.

## 7. Actualités et événements

- Articles récents à publier : titre, date, résumé, texte complet, catégorie, photo légendée.
- Cérémonies de sortie de promotion, avis de la direction, communications officielles.
- Agenda des événements à venir : date, lieu, heure, description.

Fichiers concernés : `contenu/actualites/`, `contenu/evenements/`.

## 8. Galerie

- Photographies réelles (ateliers, apprenants, cérémonies), chacune avec une légende datée et l'autorisation écrite de diffusion des personnes visibles.
- Vidéos hébergeables, avec légende.

Fichier concerné : `contenu/galerie.json`.

## 9. Textes officiels de référence

- Copie ou référence exacte du décret n° 2005/151 du 5 mai 2005 et du décret n° 2010/1099/PM du 7 mai 2010, pour validation de la formulation reprise sur le site.
- Tout texte propre au Centre (règlement intérieur, décisions).

## 10. Documents à télécharger

- Formulaires, calendriers, avis et notes de service, en PDF légers et nommés clairement.

Fichier concerné : `contenu/telechargements.json`.

## 11. Nom de domaine et messagerie

- Nom de domaine définitif retenu (souhaité en .cm, par exemple cmpj-littoral.cm).
- Adresse électronique de la fiche Google Business Profile à créer ou à revendiquer.
- Adresse d'expédition ou de réception des demandes issues des formulaires (pour brancher l'envoi).

Fichiers concernés : `.env` (variable `PUBLIC_SITE_URL`), `contenu/organisation.json`.

## 12. Mentions légales et confidentialité

- Validation de la page Mentions légales et de la page Confidentialité par la direction, en particulier l'éditeur du site, le responsable de la publication et le traitement des données personnelles.

Fichiers concernés : `contenu/pages/mentions-legales.md`, `contenu/pages/confidentialite.md`.

## 13. Images de marque

- Image de partage pour les réseaux sociaux (photo réelle du Centre, format 1200 x 630), si une photographie doit remplacer le visuel typographique actuel.

Fichier concerné : `public/og.png` (regénéré à partir de `public/og.svg`).
