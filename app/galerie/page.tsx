import React from "react";
import { Metadata } from "next";
import GallerySection from "@/components/GallerySection";
import Reveal from "@/components/motion/Reveal";
import { content } from "@/data/content";
import { Camera, Video as VideoIcon, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Galerie Photos & Vidéos – AUS en Action",
  description:
    "Explorez les photos et vidéos des activités de l'Association pour l'Unité et la Solidarité à Yeumbeul Nord : consultations médicales, dons de kits, panels et vie de quartier.",
};

export default function GaleriePage() {
  return (
    <div className="py-12 sm:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-aus-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Médiathèque AUS
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Galerie <span className="text-gradient-animated">Photos & Vidéos</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Revivez nos actions en immersion : consultations gratuites, sensibilisation des enfants et moments de communion avec la population de Yeumbeul Nord.
          </p>
        </Reveal>

        {/* Gallery Section Component */}
        <GallerySection showTabs={true} />

        {/* Facebook Banner Notice */}
        <Reveal variant="up">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Plus de photos et vidéos exclusives sur notre page Facebook
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Nos équipes partagent régulièrement les albums complets et les direct live de nos événements de quartier.
              </p>
            </div>
          </div>

          <a
            href={content.contact.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow transition-colors"
          >
            <span>Voir la page Facebook</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        </Reveal>
      </div>
    </div>
  );
}

