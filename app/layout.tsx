import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/motion/ScrollProgress";
import IntroSplash from "@/components/motion/IntroSplash";
import MotionObserver from "@/components/motion/MotionObserver";
import BackToTop from "@/components/motion/BackToTop";

/** Script exécuté avant l'affichage : décide si l'intro doit être jouée (sans flash). */
const motionBootScript = `try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=(r||sessionStorage.getItem('aus_intro_seen'))?'seen':'play';d.classList.add('motion-ready');}catch(e){}`;
import { content } from "@/data/content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  content.meta.url ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: content.meta.fullName,
  alternateName: [
    "AUS",
    "AUS Sénégal",
    "AUS Yeumbeul",
    "AUS Guédiawaye",
    "Association pour l'Unité et la Solidarité",
    "Association Unité et Solidarité",
  ],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  description: content.meta.description,
  slogan: content.meta.slogans[0],
  email: content.contact.email,
  telephone: content.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yeumbeul",
    addressRegion: "Guédiawaye, Dakar",
    addressCountry: "SN",
  },
  areaServed: [
    { "@type": "City", name: "Yeumbeul" },
    { "@type": "City", name: "Guédiawaye" },
    { "@type": "City", name: "Dakar" },
    { "@type": "Country", name: "Sénégal" },
  ],
  sameAs: [content.contact.facebookUrl],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${content.meta.acronym} – ${content.meta.fullName} | Yeumbeul & Guédiawaye`,
    template: `%s | ${content.meta.acronym} – ${content.meta.fullName}`,
  },
  description: content.meta.description,
  keywords: content.meta.keywords,
  authors: [{ name: "Association pour l'Unité et la Solidarité (AUS)" }],
  creator: "AUS Yeumbeul Nord",
  publisher: "AUS",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AUS Yeumbeul",
  },
  openGraph: {
    title: `${content.meta.acronym} – ${content.meta.fullName}`,
    description: content.meta.description,
    url: siteUrl,
    siteName: content.meta.siteName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Association pour l'Unité et la Solidarité - Yeumbeul Nord",
      },
    ],
    locale: "fr_SN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.meta.acronym} – ${content.meta.fullName}`,
    description: content.meta.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-aus-blue-700 selection:text-white">
        <IntroSplash />
        <MotionObserver />
        <ScrollProgress />
        <BackToTop />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

