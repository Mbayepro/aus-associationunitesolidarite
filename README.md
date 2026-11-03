# 🇸🇳 AUS – Association pour l'Unité et la Solidarité (Yeumbeul Nord / Keur Massar)

> **Slogans :**  
> *"Unis pour un impact durable"* &nbsp;|&nbsp; *#AUSenAction*

Site vitrine officiel de l'**Association pour l'Unité et la Solidarité (AUS)**, ancrée à Yeumbeul Nord, Diamalaye et dans le département de Keur Massar (Dakar, Sénégal).

---

## 🚀 Stack Technique & Spécifications

- **Framework :** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Langage :** TypeScript (typé à 100%)
- **Style :** Tailwind CSS (couleurs personnalisées du logo : Bleu principal, Rouge, Orange, Vert, Fond blanc)
- **Icônes :** Lucide React
- **Gestion du Contenu :** **Fichier unique `data/content.ts`** (aucun backend ni base de données requis)
- **Déploiement :** 100% prêt pour **Vercel** (génération statique instantanée, coût zéro)

---

## 📁 Structure du Projet

```text
├── app/
│   ├── layout.tsx              # Structure globale (SEO, Navbar, Footer, WhatsApp flottant)
│   ├── page.tsx                # Page d'accueil (Hero, Chiffres clés, Actions, Qui sommes-nous, etc.)
│   ├── qui-sommes-nous/        # Page détaillée Histoire, Mission, 5 Valeurs, Équipe
│   ├── actions/                # Page Actions avec filtres (Santé, Jeunesse, Citoyenneté)
│   ├── galerie/                # Page Galerie photos (Lightbox) + Vidéos & Reels Facebook
│   ├── actualites/             # Fil d'actualités et communiqués officiels
│   ├── rejoindre/              # Page d'adhésion avec formulaire WhatsApp dynamique
│   ├── contact/                # Coordonnées (77 157 67 55, ausyeumbeulnord@gmail.com, Maps)
│   └── globals.css             # Styles Tailwind & animations
├── components/
│   ├── Navbar.tsx              # Menu responsive mobile-first + barre de contact
│   ├── Footer.tsx              # Pied de page riche avec toutes les informations
│   ├── ActionCard.tsx          # Carte d'action avec badges, date, lieu, spécialités médicales
│   ├── GallerySection.tsx      # Grille multimédia (Photos / Vidéos)
│   ├── Lightbox.tsx            # Modale d'agrandissement photo plein écran (Next/Prev/Esc)
│   ├── FacebookReelEmbed.tsx   # Lecteur réactif pour Reels & Vidéos Facebook
│   ├── WhatsAppJoinForm.tsx    # Générateur de message WhatsApp pré-rempli sans backend
│   └── FloatingWhatsApp.tsx    # Bouton WhatsApp flottant avec pulsation
├── data/
│   └── content.ts              # 🌟 LE COEUR DU SITE : TOUTES LES DONNÉES SONT ICI
└── public/
    ├── logo.png                # Logo officiel de l'AUS
    └── images/                 # Photos des actions, des bénévoles et de la galerie
```

---

## 🛠️ Guide Pratique : Comment modifier le contenu dans `data/content.ts`

Toutes les informations du site proviennent du fichier **[`data/content.ts`](file:///c:/Demo/AUS/data/content.ts)**.  
**Vous n'avez jamais besoin de toucher au code des composants !**

---

### 1️⃣ Comment ajouter une nouvelle Action (ex: consultation médicale, don, conférence)

Ouvrez `data/content.ts` et repérez le tableau `actions: [ ... ]`. Ajoutez simplement un nouvel objet :

```typescript
{
  id: "consultation-diamalaye-2027",
  title: "Grande Journée Médicale de Printemps",
  date: "2027-04-12",
  formattedDate: "Samedi 12 Avril 2027",
  location: "Terrain Bokk Xalaat, Yeumbeul Nord",
  image: "/images/mon-image.jpg", // Photo placée dans /public/images/
  summary: "Consultations gratuites et dépistages pour les familles.",
  description: "Détails complets de l'action, contexte, prise en charge...",
  category: "Santé", // Options : "Santé" | "Jeunesse" | "Citoyenneté" | "Solidarité" | "Développement"
  status: "À venir",  // Options : "À venir" | "En cours" | "Réalisée"
  partners: ["Odontologie UCAD", "Poste de Santé Diamalaye"],
  specialties: [
    "Soins dentaires",
    "Médecine générale",
    "Don de médicaments gratuits"
  ],
  highlight: true // true pour mettre en avant sur la page d'accueil
}
```

---

### 2️⃣ Comment ajouter une Photo dans la Galerie

1. Déposez votre fichier photo dans le dossier `/public/images/` (ex : `consultation-enfants.jpg`).
2. Ouvrez `data/content.ts`, cherchez le tableau `gallery: [ ... ]` et ajoutez votre entrée :

```typescript
{
  id: "gal-nouvelle-photo",
  title: "Séance de dépistage bucco-dentaire",
  category: "Santé", // "Santé" | "Jeunesse" | "Citoyenneté" | "Communauté"
  image: "/images/consultation-enfants.jpg",
  caption: "Les enfants reçoivent leurs kits d'hygiène avec le sourire.",
  date: "Novembre 2026"
}
```
La photo apparaît immédiatement dans la grille avec sa catégorie et s'ouvre dans la Lightbox plein écran.

---

### 3️⃣ Comment intégrer un Reel Facebook ou une Vidéo

Ouvrez `data/content.ts` et cherchez le tableau `videos: [ ... ]` :

```typescript
{
  id: "mon-nouveau-reel",
  title: "Reel Facebook : Ambiance de la journée citoyenne",
  description: "Témoignages des jeunes et des notables du quartier.",
  url: "https://www.facebook.com/reel/VOTRE_ID_DE_REEL", // ou lien direct Facebook
  type: "facebook-reel", // ou "facebook-video"
  date: "Octobre 2026"
}
```
Le composant charge automatiquement le lecteur vidéo responsive Facebook avec fallback interactif.

---

### 4️⃣ Comment ajouter une Actualité / Communiqué

Ouvrez `data/content.ts` et cherchez le tableau `news: [ ... ]` :

```typescript
{
  id: "communique-lancement-daaras",
  title: "Lancement du programme santé dans les Daaras de Yeumbeul Nord",
  date: "2026-11-15",
  author: "Commission Santé AUS",
  category: "Santé & Prévention",
  summary: "Distribution de kits et sensibilisation des talibés.",
  content: "Texte complet du communiqué officiel expliquant la démarche...",
  image: "/images/news-1.jpg",
  readTime: "3 min de lecture"
}
```

---

### 5️⃣ Comment mettre à jour les Chiffres Clés ou Contacts

Dans `data/content.ts` :
- **Chiffres clés :** modifiez le tableau `stats: [ ... ]` (par exemple passer de `"2 500+"` à `"3 000+"`).
- **Coordonnées :** modifiez l'objet `contact: { ... }` :
  - `phoneDisplay: "77 157 67 55"`
  - `whatsappNumber: "221771576755"`
  - `email: "ausyeumbeulnord@gmail.com"`
  - `facebookUrl: "https://www.facebook.com/profile.php?id=100054573154913"`

---

### 6️⃣ Comment configurer les Dons (Wave / Orange Money) et la FAQ

- Dans `data/content.ts` sous `donations : { ... }` :
  - `waveNumber: "771576755"`
  - `orangeMoneyNumber: "771576755"`
  - `impactExamples`: montant en FCFA et ce qu'il permet de financer sur le terrain.
- Dans `data/content.ts` sous `faq : [ ... ]` :
  - Ajoutez simplement une question et une réponse dans le tableau `faq` pour qu'elle apparaisse instantanément dans l'accordéon dynamique sur la page d'accueil, la page de présentation et la page d'adhésion.

---

### 7️⃣ Partage WhatsApp & Mode Application Mobile (PWA)

- **Partage WhatsApp :** Chaque carte d'action, chaque actualité et le bilan de la journée médicale disposent d'un bouton dédié pour relayer l'information avec un message pré-rempli dans les groupes WhatsApp communautaires.
- **Progressive Web App (PWA) :** Le site intègre un fichier `manifest.json` permettant aux membres et aux habitants d'installer le site directement sur leur écran d'accueil Android ou iOS sans passer par un store d'applications.

---

## 💻 Démarrage Local

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```

---

## ☁️ Déploiement sur Vercel (Recommandé)

Le projet a été conçu pour se déployer en 1 clic sur **Vercel** :
1. Créez un compte gratuit sur [vercel.com](https://vercel.com).
2. Connectez votre dépôt Git (GitHub, GitLab ou Bitbucket).
3. Cliquez sur **"Import"** puis **"Deploy"**.
4. Aucune variable d'environnement ni base de données requise : le site est pré-rendu en HTML statique ultra-rapide.

---

## 📞 Permanence AUS

- **Téléphone / WhatsApp :** `+221 77 157 67 55`
- **Email :** `ausyeumbeulnord@gmail.com`
- **Adresse :** Diamalaye, Yeumbeul Nord, Département de Keur Massar, Sénégal
- **Facebook :** [Association pour l'Unité et la Solidarité - AUS](https://www.facebook.com/profile.php?id=100054573154913)

