// Couche i18n du site. Le Cameroun est bilingue : le site est publié en français (racine)
// et en anglais (préfixe /en). La langue est dérivée de l'URL de la requête, jamais d'un
// cookie de session pour le rendu : chaque page existe dans ses deux langues.
// Règle : aucun texte n'est inventé, l'anglais est la traduction fidèle du français publié.

export type Lang = 'fr' | 'en';

export const LOCALES: Lang[] = ['fr', 'en'];
export const DEFAULT_LOCALE: Lang = 'fr';

const EN_PREFIX = '/en';

// Nom natif de chaque langue, affiché tel quel (non traduit) dans la bascule.
export const LANG_NAME: Record<Lang, string> = { fr: 'Français', en: 'English' };

// Détecte la langue à partir du chemin. '/en' ou '/en/...' = anglais, sinon français.
export function getLang(pathname: string): Lang {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? 'en' : 'fr';
}

// Applique la langue à un chemin relatif interne (ex. '/formations/' -> '/en/formations/').
export function localizeUrl(pathname: string, lang: Lang): string {
  if (lang === 'en') {
    if (getLang(pathname) === 'en') return pathname;
    return pathname === '/' ? `${EN_PREFIX}/` : `${EN_PREFIX}${pathname}`;
  }
  // français : retire le préfixe /en
  if (getLang(pathname) !== 'en') return pathname;
  const stripped = pathname.slice(EN_PREFIX.length);
  return stripped === '' ? '/' : stripped;
}

// Chemin de la page miroir dans l'autre langue, à partir du chemin courant.
export function counterpartUrl(pathname: string, fromLang: Lang): string {
  const target: Lang = fromLang === 'en' ? 'fr' : 'en';
  return localizeUrl(pathname, target);
}

// Écrit un petit nombre en lettres pour l'accroche de l'accueil (0 à 20, au-delà : chiffre).
export function nombreEnLettres(lang: Lang, n: number): string {
  const fr = [
    'zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf',
    'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt',
  ];
  const en = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
  ];
  const table = lang === 'en' ? en : fr;
  return n >= 0 && n <= 20 ? table[n] : String(n);
}

// Dates dans la langue courante, sans dépendance externe.
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatDateCourt(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

type Entrée = { fr: string; en: string };

// Libellés d'interface. Regroupés ici pour que la traduction reste une opération centralisée.
const UI: Record<string, Entrée> = {
  // Accessibilité, divers
  'a11y.skip': { fr: 'Aller au contenu', en: 'Skip to content' },
  'a11y.back_home': { fr: "Retour à l'accueil", en: 'Back to home' },
  'a11y.main_nav': { fr: 'Navigation principale', en: 'Main navigation' },
  'a11y.breadcrumb': { fr: "Fil d'Ariane", en: 'Breadcrumb' },
  'a11y.footer_links': { fr: 'Liens de pied de page', en: 'Footer links' },
  'a11y.toggle': { fr: 'Changer de langue', en: 'Change language' },
  'a11y.news_nav': { fr: 'Navigation entre les actualités', en: 'News navigation' },

  // En-tête
  'header.menu': { fr: 'Menu', en: 'Menu' },
  'header.apply': { fr: 'Candidater', en: 'Apply' },
  'header.discover': { fr: 'Découvrir', en: 'Explore' },
  'header.act': { fr: 'Agir', en: 'Get involved' },

  // Pied de page
  'footer.find': { fr: 'Nous situer et joindre', en: 'Find and contact us' },
  'footer.contact_note': {
    fr: 'Coordonnées du secrétariat communiquées sur la page Contact.',
    en: 'Contact details of the secretariat are published on the Contact page.',
  },
  'footer.follow': { fr: 'Suivre le Centre', en: 'Follow the Centre' },
  'footer.facebook': { fr: 'Page Facebook', en: 'Facebook page' },
  'footer.tiktok': { fr: 'Compte TikTok', en: 'TikTok account' },

  // Barre d'action mobile
  'mob.choose': { fr: 'Choisir une filière', en: 'Choose a trade' },
  'mob.pre': { fr: 'Se préinscrire', en: 'Pre-register' },

  // Bouton WhatsApp
  'wa.aria': { fr: 'Écrire au Centre sur WhatsApp', en: 'Message the Centre on WhatsApp' },
  'wa.label': { fr: 'WhatsApp', en: 'WhatsApp' },
  'wa.msg.general': {
    fr: 'Bonjour, je souhaite des informations sur le CMPJ Régional du Littoral.',
    en: 'Hello, I would like information about the CMPJ Regional Centre of the Littoral.',
  },

  // Accueil
  'home.centre_default': { fr: 'Centre de formation', en: 'Vocational training centre' },
  'home.cta_trades': { fr: 'Voir les filières', en: 'View the trades' },
  'home.cta_apply': { fr: 'Pré-inscription en ligne', en: 'Apply online' },
  'home.cta_contact': { fr: 'Écrire au Centre', en: 'Contact the Centre' },
  'home.practical': { fr: 'Informations pratiques', en: 'Practical information' },
  'home.address': { fr: 'Adresse', en: 'Address' },
  'home.hours': { fr: 'Horaires', en: 'Opening hours' },
  'home.phone': { fr: 'Téléphone', en: 'Phone' },
  'home.tutelle': { fr: 'Tutelle', en: 'Supervising ministry' },
  'home.contact_here_1': {
    fr: 'Retrouvez le détail des coordonnées sur la page ',
    en: 'You can find the full contact details on the ',
  },
  'home.contact_here_2': { fr: 'Contact', en: 'Contact' },
  'home.choose_title': { fr: 'Choisissez votre métier', en: 'Choose your trade' },
  'home.all_trades': { fr: 'Toutes les filières', en: 'All trades' },
  'home.discover_trade': { fr: 'Découvrir le métier', en: 'Discover the trade' },
  'home.steps_title': { fr: "S'inscrire en trois étapes", en: 'Register in three steps' },
  'home.step1_h': { fr: 'Choisir une filière', en: 'Choose a trade' },
  'home.step1_1': { fr: 'Comparer les métiers proposés', en: 'Compare the trades offered' },
  'home.step1_2': { fr: ' et retenir celui qui vous convient.', en: ' and select the one that suits you.' },
  'home.step2_h': { fr: 'Se pré-inscrire', en: 'Pre-register' },
  'home.step2_1': { fr: 'Remplir la pré-inscription en ligne', en: 'Complete the online pre-registration' },
  'home.step2_2': { fr: ' pour préparer le dépôt du dossier.', en: ' to prepare your file for submission.' },
  'home.step3_h': { fr: 'Déposer le dossier', en: 'Submit your file' },
  'home.step3_1': {
    fr: 'Déposer le dossier complet au secrétariat du Centre, ',
    en: "Submit the complete file at the Centre's secretariat, ",
  },
  'home.step3_link': { fr: 'coordonnées ici', en: 'details here' },
  'home.step3_2': { fr: '.', en: '.' },
  'home.news_title': { fr: 'Actualités', en: 'News' },
  'home.all_news': { fr: 'Toutes les actualités', en: 'All news' },
  // Éléments de l'accroche (phrase générée à partir des données réelles du Centre).
  'home.acc_centre': { fr: 'un Centre', en: 'a Centre' },
  'home.acc_at': { fr: ' à ', en: ' in ' },
  'home.acc_one': { fr: 'métier à apprendre', en: 'trade to learn' },
  'home.acc_plural': { fr: 'métiers à apprendre', en: 'trades to learn' },

  // Libellés communs de fiche (métadonnées)
  'meta.duration': { fr: 'Durée', en: 'Duration' },
  'meta.level': { fr: "Niveau d'accès", en: 'Entry level' },
  'meta.fees': { fr: 'Frais', en: 'Fees' },
  'meta.capacity': { fr: 'Capacité', en: 'Capacity' },
  'meta.award': { fr: 'Diplôme', en: 'Award' },

  // Index des formations
  'formations.heading': { fr: 'Formations', en: 'Training' },
  'formations.search_label': { fr: 'Rechercher un métier', en: 'Search a trade' },
  'formations.search_placeholder': { fr: 'Nom de la filière', en: 'Trade name' },
  'formations.card_cta': { fr: 'Voir la filière', en: 'View the trade' },
  'formations.empty_search': { fr: 'Aucune filière ne correspond à votre recherche.', en: 'No trade matches your search.' },
  'formations.empty_list': {
    fr: 'Le Centre communique ses filières ouvertes à la formation sur cette page.',
    en: 'The Centre announces the trades open for training on this page.',
  },
  'formations.footnote': {
    fr: 'Les durées, niveaux d’accès et frais sont précisés pour chaque session par la direction du Centre et rappelés au secrétariat lors du retrait du dossier.',
    en: 'Durations, entry levels and fees are set for each session by the Centre’s management and confirmed at the secretariat when you collect your file.',
  },

  // Fiche métier
  'fiche.requirements': { fr: "Conditions d'admission", en: 'Entry requirements' },
  'fiche.outcomes': { fr: 'Débouchés', en: 'Career opportunities' },
  'fiche.apply': { fr: 'Se préinscrire', en: 'Apply' },
  'fiche.contact': { fr: 'Écrire au Centre', en: 'Contact the Centre' },
  'fiche.q_label': { fr: 'Une question sur cette formation ?', en: 'A question about this training?' },
  'fiche.whatsapp_link': { fr: 'Écrire sur WhatsApp', en: 'Write on WhatsApp' },
  'fiche.prev': { fr: 'Filière précédente', en: 'Previous trade' },
  'fiche.next': { fr: 'Filière suivante', en: 'Next trade' },
  'fiche.back_top': { fr: 'Retour en haut de la page', en: 'Back to top of page' },
  'fiche.fallback': {
    fr: "est dispensée au CMPJ Régional du Littoral. Le détail du programme, les conditions d'admission, les frais et le calendrier de la session sont communiqués par le secrétariat du Centre.",
    en: "is taught at the CMPJ Regional Centre of the Littoral. Programme details, entry requirements, fees and the session calendar are provided by the Centre's secretariat.",
  },
  'fiche.whatsapp_msg': {
    fr: 'Bonjour, je souhaite des renseignements sur la filière ',
    en: 'Hello, I would like information about the ',
  },
  'fiche.whatsapp_msg_end': {
    fr: ' du CMPJ Régional du Littoral.',
    en: ' trade at the CMPJ Regional Centre of the Littoral.',
  },
  'fiche.home': { fr: 'Accueil', en: 'Home' },
  'fiche.formations': { fr: 'Formations', en: 'Training' },

  // Page Contact
  'contact.heading': { fr: 'Contact', en: 'Contact' },
  'contact.coords': { fr: 'Coordonnées', en: 'Contact details' },
  'contact.dt_address': { fr: 'Adresse', en: 'Address' },
  'contact.dt_hours': { fr: "Horaires d'ouverture", en: 'Opening hours' },
  'contact.dt_phone': { fr: 'Téléphone', en: 'Phone' },
  'contact.dt_email': { fr: 'Adresse électronique', en: 'Email address' },
  'contact.no_coords': {
    fr: 'Les coordonnées complètes du secrétariat sont communiquées par la direction du Centre.',
    en: "The full contact details of the secretariat are provided by the Centre's management.",
  },
  'contact.whatsapp': { fr: 'Écrire sur WhatsApp', en: 'Message on WhatsApp' },
  'contact.map_button': { fr: "Afficher le plan d'accès", en: 'Show the access map' },
  'contact.map_title': { fr: "Plan d'accès", en: 'Access map' },
  'contact.write': { fr: 'Écrire au Centre', en: 'Write to the Centre' },
  'contact.write_lede': {
    fr: 'Décrivez votre demande. Le secrétariat du Centre la reçoit.',
    en: "Describe your request. The Centre's secretariat receives it.",
  },
  'contact.desc': {
    fr: 'Contacter le CMPJ Régional du Littoral à New-Bell, Douala : adresse du Centre et formulaire de contact.',
    en: 'Contact the CMPJ Regional Centre of the Littoral in New-Bell, Douala: Centre address and contact form.',
  },
  'contact.whatsapp_msg': {
    fr: 'Bonjour, je souhaite contacter le CMPJ Régional du Littoral.',
    en: 'Hello, I would like to contact the CMPJ Regional Centre of the Littoral.',
  },
  'contact.home': { fr: 'Accueil', en: 'Home' },

  // Page Admission
  'admission.heading': { fr: 'Admission et inscription', en: 'Admission and enrolment' },
  'admission.fallback': {
    fr: "L'admission se fait par le dépôt d'un dossier complet au secrétariat du Centre. Les conditions, pièces et frais propres à chaque filière sont précisés lors du retrait du dossier.",
    en: 'Admission requires submitting a complete file at the Centre’s secretariat. The conditions, documents and fees specific to each trade are set out when you collect the file.',
  },
  'admission.pre_h': { fr: 'Pré-inscription en ligne', en: 'Online pre-registration' },
  'admission.q_before': {
    fr: 'Une question avant de déposer votre dossier ?',
    en: 'A question before you submit your file?',
  },
  'admission.whatsapp_link': { fr: 'Écrire sur WhatsApp', en: 'Write on WhatsApp' },
  'admission.whatsapp_msg': {
    fr: "Bonjour, je souhaite des renseignements sur l'inscription au CMPJ Régional du Littoral.",
    en: 'Hello, I would like information about enrolment at the CMPJ Regional Centre of the Littoral.',
  },
  'admission.home': { fr: 'Accueil', en: 'Home' },

  // Formulaires (libellés et messages)
  'form.name': { fr: 'Nom', en: 'Name' },
  'form.first_name': { fr: 'Prénom', en: 'First name' },
  'form.email': { fr: 'Adresse électronique', en: 'Email address' },
  'form.phone': { fr: 'Téléphone', en: 'Phone' },
  'form.subject': { fr: 'Objet', en: 'Subject' },
  'form.message': { fr: 'Message', en: 'Message' },
  'form.trade': { fr: 'Filière souhaitée', en: 'Chosen trade' },
  'form.trade_placeholder': { fr: 'Choisir une filière', en: 'Choose a trade' },
  'form.birth_year': { fr: 'Année de naissance', en: 'Year of birth' },
  'form.note_label': { fr: 'Précision utile', en: 'Additional information' },
  'form.required_note': {
    fr: "Les champs marqués d'un astérisque sont obligatoires.",
    en: 'Fields marked with an asterisk are required.',
  },
  'form.pre_note': {
    fr: 'Cette pré-inscription prépare le dépôt du dossier et ne vaut pas inscription définitive. Les informations saisies ne sont pas publiées.',
    en: 'This pre-registration prepares your file submission and is not a final enrolment. The information you enter is not published.',
  },
  'form.send': { fr: 'Envoyer', en: 'Send' },
  'form.submit_pre': { fr: 'Envoyer la pré-inscription', en: 'Submit pre-registration' },
  'form.ok_contact': {
    fr: 'Votre message a bien été transmis au Centre.',
    en: 'Your message has been sent to the Centre.',
  },
  'form.ok_pre': {
    fr: "Votre pré-inscription a bien été enregistrée. Retirez ensuite le dossier auprès du secrétariat pour finaliser l'inscription.",
    en: 'Your pre-registration has been recorded. Please then collect your file from the secretariat to complete the enrolment.',
  },
  'form.fail': {
    fr: "L'envoi a échoué. Vérifiez les champs indiqués ou réessayez.",
    en: 'Sending failed. Please check the highlighted fields or try again.',
  },

  // Messages de validation (serveur)
  'err.name': { fr: 'Indiquez votre nom.', en: 'Please enter your name.' },
  'err.first_name': { fr: 'Indiquez votre prénom.', en: 'Please enter your first name.' },
  'err.email': { fr: 'Indiquez une adresse électronique valide.', en: 'Please enter a valid email address.' },
  'err.message_short': { fr: 'Votre message est trop court.', en: 'Your message is too short.' },
  'err.message_long': {
    fr: 'Votre message dépasse la longueur autorisée.',
    en: 'Your message exceeds the allowed length.',
  },
  'err.phone': { fr: 'Indiquez un numéro de téléphone joignable.', en: 'Please enter a reachable phone number.' },
  'err.trade': { fr: 'Choisissez une filière.', en: 'Please choose a trade.' },

  // Pages d'accusé sans JavaScript
  'ack.incomplete_contact': { fr: 'Formulaire incomplet', en: 'Incomplete form' },
  'ack.incomplete_body': {
    fr: "Votre message n'a pas pu être envoyé. Merci de corriger :",
    en: 'Your message could not be sent. Please correct:',
  },
  'ack.incomplete_pre': { fr: 'Pré-inscription incomplète', en: 'Incomplete pre-registration' },
  'ack.incomplete_pre_body': {
    fr: 'Certaines informations manquent ou sont incorrectes :',
    en: 'Some information is missing or incorrect:',
  },
  'ack.back_form': { fr: 'Revenir au formulaire', en: 'Return to the form' },
  'ack.sent': { fr: 'Message transmis', en: 'Message sent' },
  'ack.sent_body': {
    fr: 'Votre demande a bien été enregistrée. Le secrétariat du Centre la prend en charge.',
    en: "Your request has been recorded. The Centre's secretariat will handle it.",
  },
  'ack.sent_extra': {
    fr: 'Pour une réponse rapide, vous pouvez également écrire directement au Centre.',
    en: 'For a quick reply, you can also write to the Centre directly.',
  },
  'ack.pre_recorded': { fr: 'Pré-inscription enregistrée', en: 'Pre-registration recorded' },
  'ack.pre_recorded_body': {
    fr: 'Votre pré-inscription a bien été enregistrée. Elle prépare le dépôt du dossier et ne vaut pas inscription définitive.',
    en: 'Your pre-registration has been recorded. It prepares your file submission and is not a final enrolment.',
  },
  'ack.pre_recorded_extra': {
    fr: 'Complétez la démarche en retirant le dossier auprès du secrétariat, puis en le déposant avec les pièces demandées pour la session en cours.',
    en: 'Complete the process by collecting the file from the secretariat, then submitting it with the documents required for the current session.',
  },
  'ack.refused': { fr: 'Demande refusée', en: 'Request refused' },

  // Actualités
  'news.heading': { fr: 'Actualités et événements', en: 'News and events' },
  'news.upcoming': { fr: 'À venir', en: 'Upcoming' },
  'news.search_label': { fr: 'Rechercher', en: 'Search' },
  'news.search_placeholder': { fr: 'Titre ou résumé', en: 'Title or summary' },
  'news.category_label': { fr: 'Catégorie', en: 'Category' },
  'news.category_all': { fr: 'Toutes', en: 'All' },
  'news.empty': {
    fr: "Les annonces, cérémonies et informations du Centre sont publiées sur cette page, dans l'ordre chronologique.",
    en: 'Announcements, ceremonies and information from the Centre are published on this page, in chronological order.',
  },
  'news.desc': {
    fr: 'Annonces, cérémonies et informations publiées par le CMPJ Régional du Littoral.',
    en: 'Announcements, ceremonies and information published by the CMPJ Regional Centre of the Littoral.',
  },
  'news.home': { fr: 'Accueil', en: 'Home' },
  'news.crumb': { fr: 'Actualités', en: 'News' },
  'news.title_suffix': { fr: " | Actualités du CMPJ Régional du Littoral", en: ' | CMPJ Regional Centre of the Littoral news' },

  // Galerie
  'gallery.heading': { fr: 'Galerie', en: 'Gallery' },
  'gallery.empty': {
    fr: 'La galerie présente les photographies et les vidéos des ateliers, des apprenants et des cérémonies du Centre, publiées avec l’autorisation de la direction.',
    en: 'The gallery presents photographs and videos of the workshops, learners and ceremonies of the Centre, published with the management’s authorisation.',
  },
  'gallery.desc': {
    fr: 'Photographies et vidéos des activités du CMPJ Régional du Littoral à New-Bell, Douala.',
    en: 'Photographs and videos of the activities of the CMPJ Regional Centre of the Littoral in New-Bell, Douala.',
  },

  // Plan du site
  'sitemap.heading': { fr: 'Plan du site', en: 'Site map' },
  'sitemap.sections': { fr: 'Sections', en: 'Sections' },
  'sitemap.trades': { fr: 'Filières', en: 'Trades' },
  'sitemap.news': { fr: 'Actualités', en: 'News' },
  'sitemap.legal': { fr: 'Mentions légales', en: 'Legal notice' },
  'sitemap.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'sitemap.desc': { fr: 'Toutes les pages du site du CMPJ Régional du Littoral.', en: 'All pages of the CMPJ Regional Centre of the Littoral website.' },

  // Pages d'erreur
  '404.title': { fr: 'Page introuvable', en: 'Page not found' },
  '404.body': {
    fr: "L'adresse demandée ne correspond à aucune page du site du CMPJ Régional du Littoral. La page a peut-être été déplacée ou son adresse comporte une erreur.",
    en: 'The requested address does not match any page on the CMPJ Regional Centre of the Littoral website. The page may have been moved, or the address contains an error.',
  },
  '404.desc': { fr: 'La page demandée est introuvable.', en: 'The requested page cannot be found.' },
  '404.home': { fr: "Retour à l'accueil", en: 'Back to home' },
  '404.sitemap': { fr: 'Consulter le plan du site', en: 'View the site map' },
  '404.contact': { fr: 'Contacter le Centre', en: 'Contact the Centre' },
  '500.title': { fr: 'Erreur du site', en: 'Site error' },
  '500.heading': { fr: 'Une erreur est survenue', en: 'An error occurred' },
  '500.body': {
    fr: "Le serveur n'a pas pu traiter la demande. Réessayez dans quelques instants. Si le problème persiste, vous pouvez contacter le Centre par un autre moyen.",
    en: 'The server could not process the request. Please try again in a moment. If the problem persists, you can contact the Centre by another means.',
  },
  '500.desc': {
    fr: "Une erreur est survenue lors de l'affichage de la page.",
    en: 'An error occurred while displaying the page.',
  },

  // Suffixe de titre commun (marque : nom officiel, non traduit)
  'brand.suffix': { fr: ' | CMPJ Régional du Littoral', en: ' | CMPJ Regional Centre of the Littoral' },
};

// Traduit une clé pour une langue. En cas de clé inconnue, renvoie la clé (visible, non silencieux).
export function t(lang: Lang, key: string): string {
  const e = UI[key];
  if (!e) return key;
  return e[lang];
}
