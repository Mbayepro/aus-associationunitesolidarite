"use client";

import React, { useState } from "react";
import { content } from "@/data/content";
import ActionCard from "@/components/ActionCard";
import Reveal from "@/components/motion/Reveal";
import { WhatsAppShareButton } from "@/components/WhatsAppShareButton";
import Link from "next/link";
import {
  Stethoscope,
  Landmark,
  Sprout,
  LayoutGrid,
  Smile,
  HeartHandshake,
  HeartPulse,
  Baby,
  Pill,
  CalendarDays,
  MapPin,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  Toutes: LayoutGrid,
  Santé: Stethoscope,
  Citoyenneté: Landmark,
  Jeunesse: Sprout,
};

const specialtyChips: { label: string; icon: LucideIcon; highlight?: boolean }[] = [
  { label: "Chirurgie dentaire", icon: Smile },
  { label: "Médecine générale", icon: Stethoscope },
  { label: "Gériatrie", icon: HeartHandshake },
  { label: "Gynécologie", icon: HeartPulse },
  { label: "Pédiatrie", icon: Baby },
  { label: "Don gratuit de médicaments", icon: Pill, highlight: true },
];

export default function ActionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");

  const categories = ["Toutes", "Santé", "Citoyenneté", "Jeunesse"];

  const filteredActions = content.actions.filter((action) => {
    if (selectedCategory === "Toutes") return true;
    return action.category === selectedCategory;
  });

  return (
    <div className="relative py-12 sm:py-20 bg-slate-50/50 overflow-hidden">
      {/* Fond animé */}
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-aus-red-100/50 blur-3xl animate-blob pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-aus-blue-100/60 blur-3xl animate-blob [animation-delay:4s] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal variant="down">
            <span className="text-xs font-extrabold uppercase tracking-widest text-aus-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Nos Projets & Interventions
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Les Actions de l'AUS <span className="text-gradient-animated">sur le Terrain</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Des initiatives concrètes organisées à Yeumbeul Nord et Keur Massar pour la santé publique, l'éducation buccale et l'éveil citoyen.
            </p>
          </Reveal>
        </div>

        {/* Category Filters */}
        <Reveal delay={300} className="flex flex-wrap items-center justify-center gap-2" >
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  active
                    ? "bg-aus-blue-700 text-white shadow-lg shadow-aus-blue-700/25 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:-translate-y-0.5 border border-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-aus-orange-300" : "text-aus-blue-600"}`} />
                {cat}
              </button>
            );
          })}
        </Reveal>

        {/* Action Cards Grid — key forces re-animation on filter change */}
        <div key={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActions.map((action, i) => (
            <Reveal key={action.id} id={action.id} delay={i * 120} variant="up" className="scroll-mt-32">
              <ActionCard action={action} featured={action.highlight} />
            </Reveal>
          ))}
        </div>

        {/* Focus Banner on upcoming medical day */}
        <Reveal variant="zoom">
          <div className="relative overflow-hidden bg-gradient-to-r from-aus-blue-900 via-aus-blue-800 to-slate-900 bg-[length:200%_200%] animate-gradient-x rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-aus-blue-700">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border-[18px] border-white/5 animate-spin-slow" aria-hidden="true" />
            <div className="absolute -left-10 -bottom-20 w-56 h-56 rounded-full bg-aus-orange-500/10 blur-2xl animate-float-slow" aria-hidden="true" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Événement Réalisé avec Succès • Samedi 10 Octobre 2026
                </span>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                  Bilan : Grande Journée de Consultation Médicale Gratuite & Don de Médicaments
                </h2>
                <p className="text-sm sm:text-base text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-aus-orange-400" />
                  <span>
                    <strong>École Aliou Kébé</strong>, près du Poste de Santé de Diamalaye (Terrain Bokk Xalaat).
                    Un succès retentissant avec la <strong>promotion sortante d'Odontologie de l'UCAD</strong> et le Poste de Santé de Diamalaye, ayant offert des soins complets à plus de 1000 résidents.
                  </span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs">
                  {specialtyChips.map(({ label, icon: Icon, highlight }, i) => (
                    <Reveal key={label} delay={150 + i * 80} variant="zoom">
                      <span
                        className={`flex items-center gap-2 p-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 ${
                          highlight
                            ? "bg-emerald-500/25 text-emerald-200 font-bold ring-1 ring-emerald-400/40"
                            : "bg-white/10 text-slate-100 hover:bg-white/15"
                        }`}
                      >
                        <span className={`flex items-center justify-center w-7 h-7 rounded-md ${highlight ? "bg-emerald-500/30" : "bg-white/10"}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        {label}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <Link
                  href="/galerie"
                  className="btn-shine group w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all hover:-translate-y-0.5"
                >
                  Voir les Reels & Photos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex gap-2">
                  <Link
                    href="/actualites#preparation-journee-medicale-aliou-kebe"
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-center text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Bilan complet
                  </Link>
                  <WhatsAppShareButton
                    title="Bilan Journée Médicale Gratuite AUS à Yeumbeul Nord"
                    summary="Consultation médicale gratuite avec don de médicaments : chirurgie dentaire, médecine générale, gynécologie, pédiatrie, gériatrie."
                    label="Partager"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
