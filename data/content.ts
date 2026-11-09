/**
 * FICHIER DE CONTENU UNIQUE DU SITE VITRINE AUS
 *
 * Pour ajouter ou modifier des informations, des actions, des actualités, des photos
 * ou des vidéos, modifiez simplement les données ci-dessous.
 * Aucun composant technique n'a besoin d'être retouché !
 */

export interface ActionItem {
  id: string;
  title: string;
  date: string;
  formattedDate: string;
  location: string;
  image: string;
  summary: string;
  description: string;
  category: "Santé" | "Jeunesse" | "Citoyenneté" | "Solidarité" | "Développement";
  partners?: string[];
  specialties?: string[];
  status: "À venir" | "Réalisée" | "En cours";
  highlight?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Santé" | "Jeunesse" | "Citoyenneté" | "Communauté";
  image: string;
  caption: string;
  date: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string; // URL directe ou lien d'intégration de Reel Facebook ou vidéo
  type: "facebook-reel" | "facebook-video" | "youtube" | "generic";
  date: string;
  thumbnail?: string;
}

export interface PartnerItem {
  name: string;
  role: string;
  logoText: string;
  logoImage?: string;
  description?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  phone?: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
  icon: "users" | "heart" | "stethoscope" | "award" | "map-pin" | "calendar";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Adhésion & Bénévolat" | "Santé & Actions" | "Dons & Soutien" | "Organisation";
}

export interface DonationConfig {
  title: string;
  subtitle: string;
  waveNumber: string;
  waveNumberSecondary?: string;
  waveRecipient: string;
  orangeMoneyNumber: string;
  orangeMoneyNumberSecondary?: string;
  orangeMoneyRecipient: string;
  phoneDisplay: string;
  impactExamples: {
    amount: string;
    description: string;
  }[];
  transparencyNote: string;
}

export interface AssociationContent {
  meta: {
    siteName: string;
    fullName: string;
    acronym: string;
    slogans: string[];
    description: string;
    keywords: string[];
    url: string;
  };
  contact: {
    phone: string;
    phoneSecondary?: string;
    phoneDisplay: string;
    email: string;
    address: string;
    commune: string;
    departement: string;
    pays: string;
    facebookUrl: string;
    facebookDisplayName: string;
    whatsappNumber: string; // Sans le + ni espaces pour lien API wa.me
    whatsappNumberSecondary?: string;
    whatsappMessageIntro: string;
    googleMapsSearchUrl: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    emergencyCallout: string;
  };
  about: {
    historyTitle: string;
    historyParagraphs: string[];
    missionTitle: string;
    mission: string;
    vision: string;
    values: {
      title: string;
      description: string;
      color: "blue" | "red" | "orange" | "green";
      icon: string;
    }[];
  };
  stats: StatItem[];
  actions: ActionItem[];
  news: NewsItem[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  partners: PartnerItem[];
  team: TeamMember[];
  join: {
    title: string;
    subtitle: string;
    volunteerBenefits: string[];
    rolesAvailable: string[];
  };
  donations: DonationConfig;
  faq: FaqItem[];
}

export const content: AssociationContent = {
  meta: {
    siteName: "AUS – Yeumbeul & Guédiawaye",
    fullName: "Association pour l'Unité et la Solidarité",
    acronym: "AUS",
    slogans: ["Unis pour un impact durable", "AUS en action"],
    description:
      "Site officiel de l'Association pour l'Unité et la Solidarité (AUS), intervenant à Yeumbeul et Guédiawaye (Sénégal). Actions communautaires, consultations médicales gratuites, citoyenneté et épanouissement de la jeunesse.",
    keywords: [
      "AUS",
      "Association Unité Solidarité",
      "Yeumbeul",
      "Guédiawaye",
      "Diamalaye",
      "Sénégal",
      "Santé solidaire",
      "Consultation médicale gratuite",
      "Bokk Xalaat",
      "Jeunesse Sénégal",
      "Impact Hub Dakar",
      "Engage Sénégal",
    ],
    url: "https://aus-associationunitesolidarite.vercel.app",
  },

  contact: {
    phone: "+221762937754",
    phoneSecondary: "+221771576755",
    phoneDisplay: "76 293 77 54 / 77 157 67 55",
    email: "ausyeumbeulnord@gmail.com",
    address: "Yeumbeul",
    commune: "Yeumbeul",
    departement: "Guédiawaye",
    pays: "Sénégal",
    facebookUrl: "https://www.facebook.com/profile.php?id=100054573154913",
    facebookDisplayName: "Association pour l'Unité et la Solidarité - AUS",
    whatsappNumber: "221762937754",
    whatsappNumberSecondary: "221771576755",
    whatsappMessageIntro: "Bonjour AUS, je souhaite vous contacter au sujet de vos actions communautaires à Yeumbeul et Guédiawaye.",
    googleMapsSearchUrl: "https://maps.google.com/?q=Yeumbeul+Dakar+Senegal",
  },

  hero: {
    badge: "Zones d'intervention : Yeumbeul & Guédiawaye",
    title: "Unis pour un impact",
    highlight: "durable & solidaire",
    subtitle:
      "L'Association pour l'Unité et la Solidarité (AUS) mobilise les énergies locales à Yeumbeul et Guédiawaye pour la santé, l'éducation, le civisme et le développement socio-communautaire.",
    primaryButtonText: "Nous rejoindre",
    secondaryButtonText: "Voir nos actions",
    emergencyCallout: "Grand succès de la Journée Médicale Gratuite du 10 Octobre à l'École Aliou Kébé : découvrez le bilan et les vidéos !",
  },

  about: {
    historyTitle: "Notre histoire et nos zones d'intervention",
    historyParagraphs: [
      "Née de la volonté citoyenne de jeunes engagés, l'AUS (Association pour l'Unité et la Solidarité) déploie ses actions prioritaires dans ses deux grandes zones d'intervention : Yeumbeul et Guédiawaye, pour apporter des réponses concrètes et bienveillantes aux défis quotidiens des populations.",
      "De Yeumbeul (Diamalaye, Bokk Xalaat) jusqu'à l'ensemble des communes de Guédiawaye, notre engagement s'articule autour de piliers fondamentaux : la santé préventive et curative pour tous, l'accompagnement citoyen de la jeunesse, la cohésion sociale et la protection des personnes vulnérables.",
      "À travers la devise 'Unis pour un impact durable' et notre cri de ralliement 'AUS en action', nous prouvons chaque jour que la solidarité fraternelle est le moteur le plus puissant de la transformation communautaire.",
    ],
    missionTitle: "Notre Mission & Notre Vision",
    mission:
      "Fédérer les forces vives de Yeumbeul et Guédiawaye pour promouvoir le bien-être communautaire, faciliter l'accès aux soins de santé de qualité, encourager l'émancipation citoyenne des jeunes et bâtir une solidarité agissante et pérenne.",
    vision:
      "Une communauté unie, solidaire, éduquée et en bonne santé, où chaque citoyen, quel que soit son âge ou son milieu, devient un acteur digne du progrès partagé.",
    values: [
      {
        title: "Unité",
        description: "Resserrer les liens fraternels entre toutes les couches sociales, les générations et les quartiers de Yeumbeul et Guédiawaye.",
        color: "blue",
        icon: "users",
      },
      {
        title: "Solidarité",
        description: "Agir avec bienveillance et altruisme auprès des familles démunies, des malades, des enfants et des personnes âgées.",
        color: "red",
        icon: "heart",
      },
      {
        title: "Santé",
        description: "Organiser des dépistages, consultations gratuites, sensibilisations bucco-dentaires et dons de médicaments pour préserver la vie.",
        color: "green",
        icon: "stethoscope",
      },
      {
        title: "Jeunesse",
        description: "Valoriser les compétences, le leadership et l'engagement citoyen de la jeunesse pour en faire le fer de lance du renouveau local.",
        color: "orange",
        icon: "sparkles",
      },
      {
        title: "Développement",
        description: "Promouvoir des initiatives durables, l'assainissement du cadre de vie, l'éducation et les projets à fort impact communautaire.",
        color: "blue",
        icon: "globe",
      },
    ],
  },

  stats: [
    {
      value: "2 500+",
      label: "Bénéficiaires touchés",
      subtext: "Lors de nos journées médicales et actions sociales",
      icon: "users",
    },
    {
      value: "5",
      label: "Spécialités médicales",
      subtext: "Dentaire, médecine générale, gériatrie, pédiatrie, gynécologie",
      icon: "stethoscope",
    },
    {
      value: "100%",
      label: "Bénévolat engagé",
      subtext: "Membres dévoués pour le quartier",
      icon: "heart",
    },
    {
      value: "6+",
      label: "Partenaires clés",
      subtext: "UCAD Odontologie, Poste de santé, Impact Hub, Engage",
      icon: "award",
    },
  ],

  actions: [
    {
      id: "journee-medicale-gratuite-2026",
      title: "Journée de consultation médicale gratuite & Don de médicaments",
      date: "2026-10-10",
      formattedDate: "Samedi 10 Octobre 2026",
      location: "École Aliou Kébé près du Poste de Santé de Diamalaye (Terrain Bokk Xalaat)",
      image: "/images/action-medicale.jpg",
      summary:
        "Grande journée de santé communautaire ayant offert des consultations gratuites multidisciplinaires et une distribution gracieuse de médicaments.",
      description:
        "Organisée avec un immense succès par l'AUS en étroite collaboration avec la promotion sortante d'Odontologie de l'UCAD et le Poste de Santé de Diamalaye. Les populations de Yeumbeul Nord ont bénéficié de consultations et soins spécialisés sans frais assurés par des praticiens bénévoles dévoués, accompagnés d'un don direct de médicaments prescrits.",
      category: "Santé",
      partners: [
        "Promotion sortante d'Odontologie UCAD",
        "Poste de Santé de Diamalaye",
        "École Aliou Kébé",
      ],
      specialties: [
        "Chirurgie dentaire (soins, extractions, détartrage)",
        "Médecine générale",
        "Gériatrie (santé des aînés)",
        "Gynécologie & santé maternelle",
        "Pédiatrie (santé infantile)",
        "Dons gracieux de médicaments essentiels",
      ],
      status: "Réalisée",
      highlight: true,
    },
    {
      id: "sante-solidaire-sourire-sain",
      title: "Santé solidaire : un sourire sain, un avenir serein",
      date: "2026-06-15",
      formattedDate: "Campagne 2026",
      location: "Écoles élémentaires et Daaras de Yeumbeul Nord",
      image: "/images/action-sourire.jpg",
      summary:
        "Sensibilisation intensive à l'hygiène bucco-dentaire des enfants, distribution de kits de brossage et dépistage précoce des caries.",
      description:
        "Initiative majeure de santé préventive soutenue par le Fonds Yaakaar (Impact Hub Dakar). Ce programme forme les élèves, les maîtres coraniques et les parents aux bons réflexes d'hygiène buccale, procède à des examens buccaux et dote chaque enfant d'un kit complet brosse-dentifrice pour garantir un sourire éclatant et un avenir en pleine santé.",
      category: "Santé",
      partners: [
        "Fonds Yaakaar",
        "Impact Hub Dakar",
        "Odontologie UCAD",
      ],
      specialties: [
        "Éducation à l'hygiène bucco-dentaire",
        "Distribution de kits de brossage",
        "Dépistage des caries et affections de gencives",
      ],
      status: "Réalisée",
      highlight: true,
    },
    {
      id: "grand-panel-citoyen-yeumbeul",
      title: "Grand Panel Citoyen : Dialogue Structuré & Participation de la Jeunesse",
      date: "2026-04-20",
      formattedDate: "Rencontre Citoyenne",
      location: "Salle polyvalente / Foyer des jeunes de Yeumbeul Nord",
      image: "/images/action-panel.jpg",
      summary:
        "Construction d'un cadre de dialogue structuré et concerté autour des enjeux de la jeunesse et de la participation citoyenne locale.",
      description:
        "En partenariat avec l'initiative citoyenne Engage Sénégal, ce grand panel a rassemblé associations de jeunesse, notables, élus territoriaux et acteurs de la société civile pour co-construire une feuille de route sur l'insertion professionnelle, la citoyenneté active, la salubrité environnementale et la prévention communautaire.",
      category: "Citoyenneté",
      partners: [
        "Engage Sénégal",
        "Collectif des jeunes de Yeumbeul",
        "Acteurs territoriaux de Keur Massar",
      ],
      specialties: [
        "Leadership et gouvernance locale",
        "Démocratie participative",
        "Ateliers de propositions citoyennes",
      ],
      status: "Réalisée",
      highlight: true,
    },
    {
      id: "eco-edu-yeumbeul-nord",
      title: "Projet Eco Edu (2ᵉ phase) : Sensibilisation & Éducation Environnementale",
      date: "2026-09-20",
      formattedDate: "Dimanche 20 Septembre 2026",
      location: "École So Trac de Yeumbeul, Yeumbeul Nord",
      image: "/images/galerie-6.jpg",
      summary:
        "Journée d'engagement, de partage et de sensibilisation autour de l'éducation environnementale avec les jeunes et les encadreurs.",
      description:
        "La 2ᵉ phase du projet Eco Edu à l'école So Trac a permis aux jeunes participants de renforcer leur conscience écologique et leur engagement pour la protection de l'environnement, avec l'accompagnement et la contribution du Consortium Jeunesse Sénégal.",
      category: "Jeunesse",
      partners: [
        "Consortium Jeunesse Sénégal",
        "Yaakaar Dakar",
        "École So Trac",
      ],
      specialties: [
        "Éducation environnementale",
        "Sensibilisation au cadre de vie sain",
        "Ateliers d'engagement citoyen pour l'écologie",
      ],
      status: "Réalisée",
      highlight: true,
    },
  ],

  news: [
    {
      id: "preparation-journee-medicale-aliou-kebe",
      title: "Bilan et grand succès de la Journée Médicale Gratuite du 10 Octobre à l'École Aliou Kébé",
      date: "2026-10-12",
      author: "Comité de pilotage AUS Santé",
      category: "Santé & Prévention",
      summary:
        "Plus de 1000 patients consultés gratuitement en chirurgie dentaire, médecine générale, pédiatrie, gynécologie et gériatrie avec don gracieux de médicaments.",
      content:
        "La grande journée de santé communautaire organisée par l'AUS à l'École Aliou Kébé (Terrain Bokk Xalaat) a rencontré un franc succès. En partenariat avec la promotion sortante d'Odontologie de l'UCAD et le personnel du Poste de Santé de Diamalaye, les populations vulnérables ont été soignées avec bienveillance et ont reçu gratuitement leurs ordonnances complètes.",
      image: "/images/news-1.jpg",
      readTime: "3 min de lecture",
    },
    {
      id: "fonds-yaakaar-impact-hub-partenariat",
      title: "Succès retentissant du programme 'Santé Solidaire' soutenu par le Fonds Yaakaar",
      date: "2026-07-02",
      author: "Pôle Jeunesse & Projets",
      category: "Partenariat & Impact",
      summary:
        "Grâce au soutien d'Impact Hub Dakar, des centaines d'enfants de Yeumbeul Nord ont bénéficié de soins bucco-dentaires et de kits offerts.",
      content:
        "Le partenariat avec le Fonds Yaakaar (Impact Hub Dakar) a permis d'investir les écoles et Daaras pour sensibiliser aux maladies parodontales et aux caries infantiles. Une démonstration concrète de la synergie entre société civile et incubateurs au profit de la banlieue dakaroise.",
      image: "/images/news-2.jpg",
      readTime: "2 min de lecture",
    },
    {
      id: "restitution-panel-engage-senegal",
      title: "Restitution du Panel Citoyen : Les jeunes au cœur des décisions de Yeumbeul Nord",
      date: "2026-05-10",
      author: "Commission Citoyenneté",
      category: "Engagement Civique",
      summary:
        "Le rapport issu du panel avec Engage Sénégal formule 12 recommandations concrètes pour le cadre de vie et la jeunesse de Keur Massar.",
      content:
        "L'AUS a transmis aux autorités communales les conclusions du grand panel citoyen. Le document insiste sur la création d'espaces dédiés aux initiatives de jeunes, l'éclairage public des zones sensibles et la pérennisation des journées de nettoiement (Set-Setal).",
      image: "/images/news-3.jpg",
      readTime: "4 min de lecture",
    },
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Consultations dentaires en plein air",
      category: "Santé",
      image: "/images/galerie-1.jpg",
      caption: "Étudiants d'Odontologie de l'UCAD et praticiens soignant les résidents à Diamalaye.",
      date: "Octobre 2026",
    },
    {
      id: "gal-2",
      title: "Distribution de kits de brossage",
      category: "Santé",
      image: "/images/galerie-2.jpg",
      caption: "Des sourires radieux après la séance de sensibilisation bucco-dentaire du Fonds Yaakaar.",
      date: "Juin 2026",
    },
    {
      id: "gal-3",
      title: "Grand Panel Citoyen Engage Sénégal",
      category: "Citoyenneté",
      image: "/images/galerie-3.jpg",
      caption: "Débats animés et constructifs pour la jeunesse de Yeumbeul Nord.",
      date: "Avril 2026",
    },
    {
      id: "gal-4",
      title: "Pharmacie solidaire & Don de médicaments",
      category: "Santé",
      image: "/images/galerie-4.jpg",
      caption: "Remise ordonnée des médicaments prescrits gratuitement aux familles vulnérables.",
      date: "Octobre 2026",
    },
    {
      id: "gal-5",
      title: "Mobilisation bénévole de quartier",
      category: "Communauté",
      image: "/images/galerie-5.jpg",
      caption: "L'équipe de l'AUS réunie pour l'aménagement du site Bokk Xalaat.",
      date: "Septembre 2026",
    },
    {
      id: "gal-6",
      title: "Sensibilisation dans les Daaras",
      category: "Jeunesse",
      image: "/images/galerie-6.jpg",
      caption: "Atelier pédagogique d'hygiène avec les talibés et maîtres coraniques.",
      date: "Mai 2026",
    },
  ],

  videos: [
    {
      id: "vid-1",
      title: "Dox dieum le 10 Octobre… Consultation Médicale Gratuite",
      description:
        "Consultation médicale gratuite avec comme spécialités : Chirurgie Dentaire, Médecine générale, Gériatrie, Gynécologie, Pédiatrie, avec don de médicaments. En direct avec les acteurs communautaires et les partenaires de santé.",
      url: "https://www.facebook.com/reel/1134057982391038/",
      type: "facebook-reel",
      date: "Octobre 2026",
      thumbnail: "/images/action-medicale.jpg",
    },
    {
      id: "vid-2",
      title: "Grand Panel Citoyen : Cadre de Dialogue Structuré pour la Jeunesse",
      description:
        "Retour en images sur le Grand Panel citoyen sur la construction d’un cadre de dialogue structuré. Un moment riche en échanges et en réflexions autour de la jeunesse, de la participation citoyenne et des synergies nécessaires pour construire l’avenir de Yeumbeul Nord. Yeumbeul regorge de jeunes dynamiques qui sont une force de proposition et d’action.",
      url: "https://www.facebook.com/reel/2115390012406795/",
      type: "facebook-reel",
      date: "Mai 2026",
      thumbnail: "/images/action-panel.jpg",
    },
    {
      id: "vid-3",
      title: "Projet Eco Edu (2ᵉ phase) : Éducation Environnementale à l'École So Trac",
      description:
        "Retour en images sur la 2ᵉ phase du projet Eco Edu à l’école So Trac de Yeumbeul. Une belle journée d’engagement, de partage et de sensibilisation autour de l’éducation environnementale permettant aux jeunes de renforcer leur conscience écologique et leur engagement pour la protection de l’environnement.",
      url: "https://www.facebook.com/reel/1653854189183582/",
      type: "facebook-reel",
      date: "Septembre 2026",
      thumbnail: "/images/galerie-6.jpg",
    },
  ],

  partners: [
    {
      name: "Promotion sortante d'Odontologie UCAD",
      role: "Partenaire médical & chirurgie dentaire",
      logoText: "UCAD Dentaire",
      description: "Mobilisation de chirurgiens-dentistes et étudiants pour des soins et extractions de qualité.",
    },
    {
      name: "Poste de Santé de Diamalaye",
      role: "Partenaire sanitaire institutionnel",
      logoText: "Poste Diamalaye",
      description: "Appui logistique, suivi médical des patients et ancrage dans la zone de santé.",
    },
    {
      name: "Fonds Yaakaar / Impact Hub Dakar",
      role: "Partenaire financier & accompagnement",
      logoText: "Fonds Yaakaar",
      description: "Soutien du projet bucco-dentaire 'Santé solidaire : un sourire sain, un avenir serein'.",
    },
    {
      name: "Engage Sénégal",
      role: "Partenaire citoyenneté & démocratie",
      logoText: "Engage Sénégal",
      description: "Co-organisation du grand panel citoyen sur le dialogue structuré de la jeunesse.",
    },
    {
      name: "École Aliou Kébé",
      role: "Partenaire hôte",
      logoText: "École Aliou Kébé",
      description: "Mise à disposition des infrastructures scolaires pour l'accueil des patients.",
    },
    {
      name: "Collectivités de Yeumbeul & Guédiawaye",
      role: "Appui institutionnel territorial",
      logoText: "Yeumbeul & Guédiawaye",
      description: "Accompagnement institutionnel de la vie associative et citoyenne dans nos zones d'intervention.",
    },
    {
      name: "Consortium Jeunesse Sénégal",
      role: "Partenaire jeunesse & environnement",
      logoText: "CJS",
      description: "Accompagnement et contribution au projet Eco Edu et à l'autonomie des jeunes.",
    },
    {
      name: "Ministère de la Santé et de l'Action sociale",
      role: "Appui institutionnel santé",
      logoText: "MSAS Sénégal",
      description: "Soutien et cadre de référence des actions de santé publique communautaire.",
    },
  ],

  team: [
    {
      name: "Coordinateur Général AUS",
      role: "Président / Coordination Générale",
      bio: "Engagé depuis de nombreuses années pour le développement et la cohésion sociale à Yeumbeul et Guédiawaye.",
      image: "/images/team-1.jpg",
      phone: "76 293 77 54 / 77 157 67 55",
    },
    {
      name: "Responsable Pôle Santé",
      role: "Commission Santé & Actions Médicales",
      bio: "Supervise la logistique des consultations gratuites, les relations avec l'UCAD et les postes de santé.",
      image: "/images/team-2.jpg",
    },
    {
      name: "Secrétaire Générale",
      role: "Administration & Partenariats",
      bio: "Coordination des projets institutionnels, suivi des conventions avec Impact Hub et Engage Sénégal.",
      image: "/images/team-3.jpg",
    },
    {
      name: "Responsable Jeunesse & Citoyenneté",
      role: "Mobilisation & Actions Sociales",
      bio: "Anime le réseau des bénévoles et pilote les panels citoyens ainsi que les actions de terrain.",
      image: "/images/team-4.jpg",
    },
  ],

  join: {
    title: "Rejoignez l'AUS ou apportez votre soutien",
    subtitle:
      "Chaque compétence, chaque heure donnée et chaque contribution fait grandir nos communautés à Yeumbeul et Guédiawaye. Choisissez votre manière d'agir avec nous !",
    volunteerBenefits: [
      "Agir directement pour les enfants et les familles démunies de Yeumbeul et Guédiawaye",
      "Participer à des actions médicales concrètes de haute utilité publique",
      "Développer ses compétences en gestion de projet associatif et leadership",
      "Faire partie d'une équipe fraternelle, dynamique et reconnue sur le terrain",
    ],
    rolesAvailable: [
      "Bénévole de terrain (accueil, logistique, organisation lors des événements)",
      "Personnel de santé bénévole (médecins, dentistes, infirmiers, sages-femmes)",
      "Communication & multimédia (photos, vidéos, réseaux sociaux, graphisme)",
      "Membre adhérent / cotisant actif",
      "Partenaire / Donateur (médicaments, matériel, soutien financier)",
    ],
  },

  donations: {
    title: "Soutenez nos actions sur le terrain",
    subtitle:
      "Chaque don finance directement l'achat de médicaments essentiels, les kits d'hygiène pour les enfants et le déploiement logistique de nos journées citoyennes à Yeumbeul.",
    waveNumber: "762937754",
    waveNumberSecondary: "771576755",
    waveRecipient: "AUS – Yeumbeul",
    orangeMoneyNumber: "771576755",
    orangeMoneyNumberSecondary: "762937754",
    orangeMoneyRecipient: "AUS – Yeumbeul",
    phoneDisplay: "76 293 77 54 / 77 157 67 55",
    impactExamples: [
      {
        amount: "5 000 FCFA",
        description: "Médicaments essentiels complets pour 2 enfants ou personnes âgées vulnérables.",
      },
      {
        amount: "15 000 FCFA",
        description: "Kits complets d'hygiène bucco-dentaire et sensibilisation pour une classe d'école.",
      },
      {
        amount: "50 000 FCFA",
        description: "Matériel médical à usage unique pour 40 consultations spécialisées.",
      },
      {
        amount: "100 000 FCFA",
        description: "Contribution majeure au stock de pharmacie d'une grande journée médicale de quartier.",
      },
    ],
    transparencyNote:
      "Toutes les contributions sont gérées dans la transparence totale avec publication de bilans aux adhérents et partenaires. Reçu de don sur simple demande WhatsApp.",
  },

  faq: [
    {
      id: "faq-adhesion",
      question: "Comment puis-je adhérer à l'Association pour l'Unité et la Solidarité (AUS) ?",
      answer:
        "L'adhésion est ouverte à toute personne partageant nos valeurs de solidarité, d'entraide et de citoyenneté. Vous pouvez remplir le formulaire d'adhésion sur ce site pour être mis en relation directe avec notre bureau via WhatsApp, ou venir nous rencontrer lors de nos réunions publiques à Yeumbeul.",
      category: "Adhésion & Bénévolat",
    },
    {
      id: "faq-geographie",
      question: "Faut-il obligatoirement résider à Yeumbeul pour participer ?",
      answer:
        "Non. Même si notre siège et nos actions prioritaires sont ancrés à Yeumbeul, de nombreux membres, sympathisants et professionnels de santé viennent de tout Dakar, de l'UCAD, d'autres communes ou de la diaspora sénégalaise.",
      category: "Adhésion & Bénévolat",
    },
    {
      id: "faq-sante",
      question: "Je suis professionnel ou étudiant en santé, comment participer aux consultations ?",
      answer:
        "Nous accueillons avec honneur les médecins généralistes, dentistes, pédiatres, gynécologues, infirmiers, pharmaciens et étudiants en fin de cycle (UCAD et autres facultés). Contactez-nous par WhatsApp ou téléphone au 76 293 77 54 ou au 77 157 67 55 avec l'objet 'Pôle Médical' pour intégrer l'équipe lors des prochaines journées.",
      category: "Santé & Actions",
    },
    {
      id: "faq-dons",
      question: "Comment sont gérés les dons financiers (Wave, Orange Money) et matériels ?",
      answer:
        "100% des fonds reçus sont alloués aux actions sociales et à la pharmacie communautaire. Pour les dons de médicaments, un pharmacien et notre commission médicale vérifient minutieusement les dates d'expiration et la conformité avant toute distribution aux patients sous ordonnance.",
      category: "Dons & Soutien",
    },
    {
      id: "faq-partenariat",
      question: "Notre structure ou école souhaite organiser une action conjointe avec l'AUS. Comment faire ?",
      answer:
        "Nous collaborons régulièrement avec les postes de santé, les associations de jeunesse, les ONG (Fonds Yaakaar, Impact Hub Dakar, Engage Sénégal) et les établissements scolaires. Écrivez-nous à ausyeumbeulnord@gmail.com ou appelez le 76 293 77 54 / 77 157 67 55 pour soumettre un projet de partenariat.",
      category: "Organisation",
    },
    {
      id: "faq-suivi",
      question: "Où puis-je suivre les résultats et les vidéos des actions réalisées ?",
      answer:
        "Toutes nos activités font l'objet de restitutions publiques sur notre page Facebook officielle, dans la rubrique Vidéos & Galerie de ce site, ainsi que via nos communiqués officiels diffusés dans les médias locaux.",
      category: "Organisation",
    },
  ],
};

