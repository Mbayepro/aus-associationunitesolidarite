import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { content } from "@/data/content";

export const metadata: Metadata = {
  metadataBase: new URL(content.meta.url),
  title: {
    default: `${content.meta.acronym} – ${content.meta.fullName} | Yeumbeul Nord & Keur Massar`,
    template: `%s | ${content.meta.acronym} – Yeumbeul Nord`,
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
    url: content.meta.url,
    siteName: content.meta.siteName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
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
    <html lang="fr" data-scroll-behavior="smooth" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-aus-blue-700 selection:text-white">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

