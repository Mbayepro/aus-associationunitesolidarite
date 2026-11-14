"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { content } from "@/data/content";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { ArrowRight } from "lucide-react";

const ROTATING_PILLARS = [
  {
    id: "sante",
    href: "/actions",
    words: ["Wérgu Yaram", "Santé Gratuite", "Soins Pour Tous"],
    subtitle: "Consultations & Dons de médicaments",
    colorClass: "text-emerald-400 hover:text-emerald-300",
    dotClass: "bg-emerald-400",
  },
  {
    id: "education",
    href: "/actions",
    words: ["Bokk & Jàng", "Apprentissage", "Citoyenneté"],
    subtitle: "Écoles, Daaras & Panels Jeunesse",
    colorClass: "text-amber-400 hover:text-amber-300",
    dotClass: "bg-amber-400",
  },
  {
    id: "solidarite",
    href: "/rejoindre",
    words: ["Bennoo & Ligeey", "Unité Active", "Solidarité"],
    subtitle: "Yeumbeul & Guédiawaye en action",
    colorClass: "text-sky-400 hover:text-sky-300",
    dotClass: "bg-sky-400",
  },
];

/** Flèche géométrique signature inspirée du Consortium Jeunesse Sénégal */
export function CjsArrowSvg({ className = "w-9 h-auto fill-aus-red-600 inline-block ml-2" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 149.22 90.06"
      aria-hidden="true"
      className={className}
    >
      <path d="M59.4,81.93c10.59,1.38,21.1,4.07,31.26,8.13L149.22,0H0v30.29h93.38l-33.99,51.63Z" />
    </svg>
  );
}

export default function CjsPillarBento() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % 3);
    }, 2500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      {/* 1. SECTION ÉDITORIALE D'INTRODUCTION STYLE CJS (avec flèche géométrique rouge) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal variant="left" className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-start text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                <span>
                  L&apos;Association pour l&apos;Unité et la Solidarité (AUS)
                  <CjsArrowSvg className="w-8 sm:w-11 h-auto fill-aus-red-600 inline-block ml-2.5 -mt-1" />
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-medium text-slate-700 leading-snug">
                une alliance citoyenne par et pour les habitants de{" "}
                <span className="font-extrabold text-aus-blue-700">Yeumbeul</span> et{" "}
                <span className="font-extrabold text-emerald-700">Guédiawaye</span>.
              </p>
            </Reveal>

            <Reveal variant="right" delay={150} className="lg:col-span-6 space-y-5">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {content.about.mission}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/qui-sommes-nous"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>Découvrir notre mission</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  « {content.meta.slogans[0]} »
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. BANDEAU IMMERSIF DES 3 PILIERS ROTATIFS + MOSAÏQUE BENTO DES CHIFFRES CLÉS */}
      <section
        id="chiffres"
        className="relative py-16 sm:py-24 overflow-hidden bg-[#04182B] text-white scroll-mt-20"
      >
        {/* Photo d'arrière-plan subtile + dégradé profond style CJS */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/images/real-communaute-1.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(4, 24, 43, 0.78) 0%, rgba(4, 24, 43, 0.94) 45%, #031322 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Les 3 Piliers Rotatifs (Wolof / Français / Impact) — style Bokk | Jang | Ligeey */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {ROTATING_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.id} delay={idx * 120} variant="up">
                <Link
                  href={pillar.href}
                  className="group block text-center p-6 rounded-[28px] bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/25 backdrop-blur-sm transition-all duration-500 hover:scale-[1.05]"
                >
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-300 mb-2">
                    <span className={`w-2 h-2 rounded-full ${pillar.dotClass} animate-pulse`} />
                    <span>Pilier 0{idx + 1}</span>
                  </div>

                  {/* Mot rotatif avec animation drop-in */}
                  <div className="h-14 sm:h-16 flex items-center justify-center overflow-hidden">
                    <span
                      key={`${pillar.id}-${wordIndex}`}
                      className={`block text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight transition-transform duration-500 animate-slide-down ${pillar.colorClass}`}
                    >
                      {pillar.words[wordIndex]}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300/90 mt-1 font-medium">
                    {pillar.subtitle}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Mosaïque Bento CJS : Alternance de Cartes Dégradées (Chiffres 65px) & Cartes Photos Terrain */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* COLONNE 1 : Carte Compteur Émeraude + Carte Photo Terrain */}
            <div className="flex flex-col gap-5">
              <Reveal variant="left">
                <div className="group relative min-h-[225px] rounded-[30px] p-7 flex flex-col justify-end overflow-hidden border border-white/25 bg-gradient-to-b from-emerald-600/90 to-teal-900/95 shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <Image
                    src="/images/real-medical-1.jpg"
                    alt="Consultations médicales gratuites AUS"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="relative z-10">
                    <div className="text-5xl sm:text-[62px] font-black text-white leading-none tracking-tight">
                      <CountUp value={content.stats[0]?.value || "+1000"} />
                    </div>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                      {content.stats[0]?.label || "Personnes touchées"}
                    </h3>
                    <p className="text-xs text-emerald-100/90 mt-1">
                      {content.stats[0]?.subtext}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="up" delay={120}>
                <div className="group relative min-h-[225px] rounded-[30px] overflow-hidden border border-white/15 shadow-xl">
                  <Image
                    src="/images/real-medical-2.jpg"
                    alt="Équipe médicale AUS à Yeumbeul"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      Odontologie UCAD &amp; Poste Diamalaye
                    </span>
                    <p className="text-sm font-bold mt-0.5">
                      Soins dentaires, médecine générale, pédiatrie &amp; pharmacie gratuite
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* COLONNE 2 : Carte Photo Sourire Enfants + Carte Compteur Bleu AUS */}
            <div className="flex flex-col gap-5">
              <Reveal variant="down" delay={80}>
                <div className="group relative min-h-[225px] rounded-[30px] overflow-hidden border border-white/15 shadow-xl">
                  <Image
                    src="/images/real-sourire-1.jpg"
                    alt="Sensibilisation bucco-dentaire enfants"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      Fonds Yaakaar • Impact Hub Dakar
                    </span>
                    <p className="text-sm font-bold mt-0.5">
                      Un sourire sain, un avenir radieux dans nos écoles et daaras
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="up" delay={180}>
                <div className="group relative min-h-[225px] rounded-[30px] p-7 flex flex-col justify-end overflow-hidden border border-white/25 bg-gradient-to-b from-aus-blue-600/95 to-aus-blue-900/95 shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <Image
                    src="/images/real-action-3.jpg"
                    alt="Kits dentaires distribués"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="relative z-10">
                    <div className="text-5xl sm:text-[62px] font-black text-white leading-none tracking-tight">
                      <CountUp value={content.stats[2]?.value || "+500"} />
                    </div>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                      {content.stats[2]?.label || "Enfants sensibilisés"}
                    </h3>
                    <p className="text-xs text-blue-100/90 mt-1">
                      {content.stats[2]?.subtext}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* COLONNE 3 : Carte Compteur Orange + Carte Compteur Rouge/Bénévoles */}
            <div className="flex flex-col gap-5">
              <Reveal variant="right" delay={140}>
                <div className="group relative min-h-[225px] rounded-[30px] p-7 flex flex-col justify-end overflow-hidden border border-white/25 bg-gradient-to-b from-aus-orange-500/95 to-amber-800/95 shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <Image
                    src="/images/real-panel-1.jpg"
                    alt="Spécialités médicales et panels citoyens"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="relative z-10">
                    <div className="text-5xl sm:text-[62px] font-black text-white leading-none tracking-tight">
                      <CountUp value={content.stats[1]?.value || "5"} />
                    </div>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                      {content.stats[1]?.label || "Spécialités médicales"}
                    </h3>
                    <p className="text-xs text-amber-100/95 mt-1">
                      {content.stats[1]?.subtext}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="up" delay={240}>
                <div className="group relative min-h-[225px] rounded-[30px] p-7 flex flex-col justify-end overflow-hidden border border-white/25 bg-gradient-to-b from-rose-600/90 to-red-950/95 shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <Image
                    src="/images/real-bureau-1.jpg"
                    alt="Réseau de bénévoles AUS Yeumbeul & Guédiawaye"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="relative z-10">
                    <div className="text-5xl sm:text-[62px] font-black text-white leading-none tracking-tight">
                      <CountUp value={content.stats[3]?.value || "100%"} />
                    </div>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                      {content.stats[3]?.label || "Engagement citoyen"}
                    </h3>
                    <p className="text-xs text-rose-100/90 mt-1">
                      {content.stats[3]?.subtext}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
