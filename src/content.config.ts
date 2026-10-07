// Couche de contenu : tous les textes editables du site vivent dans le dossier contenu/.
// La direction du Centre corrige ces fichiers sans toucher au code.
// Regle absolue : un champ absent, vide ou null n'est jamais affiche au public.
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Champ de texte optionnel : accepte une chaine, null ou une absence.
const texteLibre = z.string().nullish();
const liste = z.array(z.string()).optional();

// Un champ boolean de controle permet a la direction d'afficher ou masquer une section
// sans supprimer le texte : true = publie, toute autre valeur = masque.
const publiable = z.boolean().optional();

const organisation = defineCollection({
  loader: file('contenu/organisation.json'),
  schema: z.object({
    denomination_courte: texteLibre,
    denomination_officielle: texteLibre,
    categorie: texteLibre,
    tutelle: z
      .object({
        ministere: texteLibre,
        sigle: texteLibre,
        republique: texteLibre,
      })
      .optional(),
    pays: texteLibre,
    adresse: z
      .object({
        rue: texteLibre,
        quartier: texteLibre,
        repere: texteLibre,
        ville: texteLibre,
        region: texteLibre,
        pays: texteLibre,
      })
      .optional(),
    contacts: z
      .object({
        telephones: liste,
        whatsapp: texteLibre,
        email: texteLibre,
      })
      .optional(),
    horaires: texteLibre,
    reseaux: z
      .object({
        facebook: texteLibre,
        tiktok: texteLibre,
      })
      .optional(),
    coordinatees_gps: z
      .object({ latitude: z.number().nullish(), longitude: z.number().nullish() })
      .optional(),
  }),
});

const site = defineCollection({
  loader: file('contenu/site.json'),
  schema: z.object({
    titre_accueil: texteLibre,
    description_site: texteLibre,
    mission: texteLibre,
    langues_disponibles: liste,
    langue_active: texteLibre,
    // Chiffres factuels communiques par la direction (annee de creation, nombre de diplomes, etc.).
    // Tant que la valeur est vide, l'indicateur n'est pas affiche.
    chiffres_cles: z
      .array(z.object({ valeur: texteLibre, label: texteLibre }))
      .optional(),
  }),
});

const navigation = defineCollection({
  loader: file('contenu/navigation.json'),
  schema: z.object({
    liens: z
      .array(
        z.object({
          titre: z.string(),
          url: z.string(),
          ordre: z.number().optional(),
          groupe: z.enum(['decouvrir', 'agir']).optional(),
        })
      )
      .optional(),
    liens_pied: z.array(z.object({ titre: z.string(), url: z.string() })).optional(),
  }),
});

// Une filiere de formation. Seules les valeurs confirmees par le Centre sont affichees.
const filieres = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'contenu/filieres' }),
  schema: z.object({
    titre: z.string(),
    slug: texteLibre,
    ordre: z.number().optional(),
    publie: publiable,
    code: texteLibre,
    resume: texteLibre,
    duree: texteLibre,
    niveau_acces: texteLibre,
    frais: texteLibre,
    capacite: texteLibre,
    diplome: texteLibre,
    conditions_admission: liste,
    debouches: liste,
    contact: texteLibre,
    // Pictogramme de la filiere (metal, electricite, textile, automobile, menuiserie, graphique, maconnerie).
    icone: texteLibre,
    photo: texteLibre,
    photo_legende: texteLibre,
  }),
});

const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'contenu/actualites' }),
  schema: z.object({
    titre: z.string(),
    date: z.coerce.date(),
    categorie: texteLibre,
    resume: texteLibre,
    image: texteLibre,
    image_legende: texteLibre,
    publie: publiable,
  }),
});

const evenements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'contenu/evenements' }),
  schema: z.object({
    titre: z.string(),
    date: z.coerce.date(),
    lieu: texteLibre,
    heure: texteLibre,
    resume: texteLibre,
    publie: publiable,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'contenu/pages' }),
  schema: z.object({
    titre: z.string(),
    description: texteLibre,
    slug: texteLibre,
    ordre: z.number().optional(),
    publie: publiable,
  }),
});

const telechargements = defineCollection({
  loader: file('contenu/telechargements.json'),
  schema: z.object({
    titre: z.string(),
    url: z.string(),
    format: texteLibre,
    taille: texteLibre,
    description: texteLibre,
  }),
});

const galerie = defineCollection({
  loader: file('contenu/galerie.json'),
  schema: z.object({
    titre: texteLibre,
    date: texteLibre,
    media: z
      .array(
        z.object({
          url: z.string(),
          legende: texteLibre,
          credits: texteLibre,
          type: texteLibre,
        })
      )
      .optional(),
  }),
});

export const collections = {
  organisation,
  site,
  navigation,
  filieres,
  actualites,
  evenements,
  pages,
  telechargements,
  galerie,
};
