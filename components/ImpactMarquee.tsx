import React from "react";
import { Sparkle } from "lucide-react";

const WORDS = [
  "Santé gratuite",
  "Solidarité",
  "Citoyenneté",
  "Jeunesse engagée",
  "Yeumbeul",
  "Guédiawaye",
  "Unis pour un impact durable",
];

/** Bandeau de typographie cinétique défilant aux couleurs de l'AUS. */
export default function ImpactMarquee() {
  const loop = [...WORDS, ...WORDS];
  return (
    <section
      aria-hidden="true"
      className="relative py-5 sm:py-7 bg-aus-blue-900 overflow-hidden border-y border-aus-blue-800"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-aus-blue-900 via-transparent to-aus-blue-900 z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee">
        {loop.map((word, i) => (
          <span
            key={i}
            className={`flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 text-2xl sm:text-4xl font-black uppercase tracking-tight whitespace-nowrap ${
              i % 2 === 0 ? "text-white" : "text-stroke-white"
            }`}
          >
            {word}
            <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-aus-orange-500 fill-current" />
          </span>
        ))}
      </div>
    </section>
  );
}

