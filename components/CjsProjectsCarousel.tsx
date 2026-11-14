"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionItem, content } from "@/data/content";
import { getAllActions } from "@/lib/adminStore";
import { CjsArrowSvg } from "@/components/CjsPillarBento";
import Reveal from "@/components/motion/Reveal";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

export default function CjsProjectsCarousel() {
  const [actions, setActions] = useState<ActionItem[]>(content.actions);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const sync = () => setActions(getAllActions());
    sync();
    window.addEventListener("aus-actions-updated", sync);
    return () => window.removeEventListener("aus-actions-updated", sync);
  }, []);

  useEffect(() => {
    if (paused || actions.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % actions.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [paused, actions.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + actions.length) % actions.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % actions.length);
  };

  // Construit une fenêtre glissante de 3 cartes à partir de activeIndex
  const visibleCards = Array.from({ length: Math.min(3, actions.length) }, (_, offset) => {
    const idx = (activeIndex + offset) % actions.length;
    return { action: actions[idx], originalIdx: idx };
  });

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-[#051C34] to-[#031324] text-white overflow-hidden"
    >
      {/* Lueurs décoratives d'arrière-plan */}
      <div
        className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-10 w-96 h-96 rounded-full bg-aus-orange-500/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* En-tête style CJS avec flèche géométrique et contrôles du carrousel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal variant="left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              Impact &amp; Réalisations Terrain
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center flex-wrap">
              <span>Nos projets phares</span>
              <CjsArrowSvg className="w-8 sm:w-10 h-auto fill-aus-orange-500 ml-3" />
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl">
              Défilement de nos campagnes médicales gratuites, actions dans les écoles et panels citoyens à Yeumbeul et Guédiawaye.
            </p>
          </Reveal>

          <Reveal variant="right" delay={120} className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Projet précédent"
              className="w-11 h-11 rounded-full border border-white/25 bg-white/10 hover:bg-emerald-600 hover:border-emerald-500 flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Projet suivant"
              className="w-11 h-11 rounded-full border border-white/25 bg-white/10 hover:bg-emerald-600 hover:border-emerald-500 flex items-center justify-center text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              href="/actions"
              className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white border border-white/30 hover:bg-white hover:text-slate-900 transition-all"
            >
              <span>Tout voir</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* Grille Carrousel style CJS (cartes visuelles plein cadre 420px avec overlay) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCards.map(({ action, originalIdx }, slotIdx) => (
            <Link
              key={`${action.id}-${originalIdx}-${slotIdx}`}
              href={`/actions#${action.id}`}
              className={`group relative h-[430px] rounded-[28px] overflow-hidden border border-white/15 hover:border-emerald-400/70 shadow-2xl flex flex-col justify-end p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 animate-fade-in ${
                slotIdx === 2 ? "hidden lg:flex" : slotIdx === 1 ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Image plein cadre avec zoom lent au survol */}
              <Image
                src={action.image}
                alt={action.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Voile dégradé profond style CJS */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(2, 18, 34, 0.15) 0%, rgba(2, 18, 34, 0.65) 48%, rgba(2, 18, 34, 0.96) 92%)",
                }}
              />

              {/* Badges en haut de la carte */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-2 z-10">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/90 text-white shadow-md backdrop-blur-sm">
                  {action.category}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-amber-200 border border-white/20 backdrop-blur-md">
                  {action.status}
                </span>
              </div>

              {/* Texte superposé en bas (titre clamp-2 + description clamp-3 comme dans post-2814.css de CJS) */}
              <div className="relative z-10 space-y-2.5 transform transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-300">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {action.formattedDate}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-slate-300 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-aus-orange-400 shrink-0" />
                    {action.location}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                  {action.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed line-clamp-3">
                  {action.description}
                </p>

                <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-300 group-hover:text-white transition-colors">
                  <span>Découvrir le projet</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bullets de pagination style Swiper CJS */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {actions.map((act, idx) => (
            <button
              key={act.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Afficher le projet ${act.title}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-8 bg-aus-orange-500"
                  : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

