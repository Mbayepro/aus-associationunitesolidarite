import React from "react";
import { Sparkle, HeartHandshake, Stethoscope } from "lucide-react";

const TOP_ITEMS = [
  "Wérgu Yaram • Santé Gratuite",
  "Bokk • Inclusion & Citoyenneté",
  "Jàng • Sensibilisation & Écoles",
  "Ligeey • Solidarité de Terrain",
  "Yeumbeul & Guédiawaye",
  "Unis pour un impact durable",
];

const BOTTOM_ITEMS = [
  "Consultations Médicales Multidisciplinaires",
  "Don Gratuit de Médicaments",
  "Partenariat Odontologie UCAD",
  "Poste de Santé de Diamalaye",
  "Fonds Yaakaar • Impact Hub Dakar",
  "Consortium Jeunesse Sénégal",
  "Engage Sénégal",
];

/** Double bandeau défilant en sens opposé (style dynamique CJS). */
export default function ImpactMarquee() {
  const topLoop = [...TOP_ITEMS, ...TOP_ITEMS];
  const bottomLoop = [...BOTTOM_ITEMS, ...BOTTOM_ITEMS];

  return (
    <section aria-hidden="true" className="relative overflow-hidden select-none">
      {/* Bandeau 1 : Défilement vers la gauche (Bleu profond & Émeraude) */}
      <div className="relative py-4 sm:py-5 bg-[#031529] border-y border-white/10 overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {topLoop.map((word, i) => (
            <span
              key={`top-${i}`}
              className={`flex items-center gap-5 sm:gap-8 pr-5 sm:pr-8 text-lg sm:text-2xl font-black uppercase tracking-wider whitespace-nowrap ${
                i % 2 === 0 ? "text-white" : "text-emerald-400"
              }`}
            >
              {word}
              <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 text-aus-orange-500 fill-current shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* Bandeau 2 : Défilement vers la droite (Ruban Orange/Rouge solidaire) */}
      <div className="relative py-3 bg-gradient-to-r from-aus-orange-600 via-aus-red-600 to-aus-orange-600 text-white overflow-hidden shadow-md">
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {bottomLoop.map((item, i) => (
            <span
              key={`bot-${i}`}
              className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6 text-xs sm:text-sm font-extrabold uppercase tracking-widest whitespace-nowrap text-white/95"
            >
              {i % 2 === 0 ? (
                <Stethoscope className="w-4 h-4 text-amber-200 shrink-0" />
              ) : (
                <HeartHandshake className="w-4 h-4 text-amber-200 shrink-0" />
              )}
              <span>{item}</span>
              <span className="text-white/40">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
