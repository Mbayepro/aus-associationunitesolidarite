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
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  content.meta.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${content.meta.acronym} – ${content.meta.fullName} | Yeumbeul`,
    template: `%s | ${content.meta.acronym} – Yeumbeul`,
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

