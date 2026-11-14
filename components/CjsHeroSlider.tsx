"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { content } from "@/data/content";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  ArrowRight,
  MapPin,
  Heart,
  Stethoscope,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const HERO_SLIDES = [
  {
    image: "/images/real-medical-1.jpg",
    tag: "Wérgu Yaram • Santé Communautaire",
    title: "Un modèle citoyen d'unité, de santé gratuite et de solidarité",
    subtitle:
      "Consultations médicales multidisciplinaires gratuites, dons de médicaments et prévention sanitaire au cœur de Yeumbeul et Guédiawaye.",
    accent: "from-emerald-400 to-teal-300",
  },
  {
    image: "/images/real-sourire-1.jpg",
    tag: "Jàng & Prévention • Écoles & Daaras",
    title: "Santé solidaire : un sourire sain, un avenir radieux pour chaque enfant",
    subtitle:
      "Sensibilisation à l'hygiène bucco-dentaire et distribution de centaines de kits dentaires gratuits aux élèves avec le soutien du Fonds Yaakaar.",
    accent: "from-amber-300 to-orange-400",
  },
  {
    image: "/images/real-panel-1.jpg",
    tag: "Bokk & Ligeey • Participation Citoyenne",
    title: "Une alliance par les jeunes et pour la communauté à Yeumbeul & Guédiawaye",
    subtitle:
      "Panels citoyens, éducation environnementale (Eco Edu) et mobilisation de la jeunesse avec le Consortium Jeunesse Sénégal et Engage Sénégal.",
    accent: "from-sky-300 to-blue-400",
  },
  {
    image: "/images/real-communaute-1.jpg",
    tag: "Bennoo • Solidarité de Terrain",
    title: "Unis pour un impact durable auprès des familles vulnérables",
    subtitle:
      "Plus de 1 000 résidents accompagnés grâce à l'engagement bénévole des médecins, dentistes de l'UCAD et jeunes leaders de nos quartiers.",
    accent: "from-rose-300 to-orange-300",
  },
];

export default function CjsHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative min-h-[84vh] w-full flex items-end overflow-hidden bg-[#041428] text-white"
    >
      {/* Diaporama plein écran avec effet Ken Burns (zoom lent) */}
      {HERO_SLIDES.map((s, idx) => {
        const active = idx === current;
        return (
          <div
            key={s.image}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              active ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                active ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        );
      })}

      {/* Double voile dégradé style Consortium Jeunesse Sénégal (transparent en haut -> très sombre en bas) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(4, 20, 40, 0.28) 0%, rgba(4, 20, 40, 0.55) 45%, rgba(2, 18, 34, 0.95) 88%, #021222 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 85%, rgba(18, 75, 156, 0.55), transparent 55%), radial-gradient(circle at 85% 20%, rgba(22, 163, 74, 0.3), transparent 50%)",
        }}
      />

      {/* Contenu aligné en bas comme sur consortiumjeunessesenegal.org */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Colonne gauche : Grand titre animé & Badges */}
          <div className="lg:col-span-8 space-y-5">
            {/* Bandeau supérieur localisation + tag dynamique */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Zones : Yeumbeul &amp; Guédiawaye
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-amber-200 border border-white/20 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {slide.tag}
              </span>
            </div>

            {/* Titre principal avec transition fluide à chaque slide */}
            <div key={current} className="animate-page-in space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white max-w-4xl">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-lg text-slate-200/95 max-w-2xl leading-relaxed font-normal">
                {slide.subtitle}
              </p>
            </div>

            {/* Boutons pilules contour blanc style CJS (border-radius: 30px, remplissage au survol) */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href="/actions"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 border-2 border-emerald-500 shadow-lg shadow-emerald-900/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Découvrir nos actions</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/rejoindre"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-transparent hover:bg-aus-orange-600 border-2 border-white hover:border-aus-orange-500 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 text-aus-red-400 group-hover:text-white fill-current transition-colors" />
                <span>Rejoindre ou Soutenir l&apos;AUS</span>
              </Link>

              <a
                href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
                  content.contact.whatsappMessageIntro
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>76 293 77 54 / 77 157 67 55</span>
              </a>
            </div>
          </div>

          {/* Colonne droite : Médaillon identité & Contrôles du diaporama */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-5">
            <div className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 flex items-center gap-4 shadow-2xl">
              <div className="relative w-16 h-16 rounded-2xl bg-white p-1.5 shrink-0 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Logo officiel AUS"
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block">
                  #AUSenAction
                </span>
                <h2 className="text-base font-black text-white truncate">
                  AUS – Yeumbeul &amp; Guédiawaye
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  « Unis pour un impact durable »
                </p>
              </div>
            </div>

            {/* Contrôles du carrousel + barre de progression des slides */}
            <div className="flex items-center gap-3 self-stretch lg:self-end justify-between lg:justify-end">
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrent(idx)}
                    aria-label={`Aller à la diapositive ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === current
                        ? "w-9 bg-emerald-400"
                        : "w-2.5 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  aria-label="Diapositive précédente"
                  className="w-10 h-10 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
                  aria-label="Diapositive suivante"
                  className="w-10 h-10 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
