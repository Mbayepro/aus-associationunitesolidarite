import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { content } from "@/data/content";
import Reveal from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  Heart,
  Users,
  Target,
  Sparkles,
  Stethoscope,
  Globe,
  MapPin,
  Phone,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Qui sommes-nous – Mission, Valeurs et Équipe",
  description:
    "Découvrez l'histoire, la mission, les valeurs et l'équipe de l'Association pour l'Unité et la Solidarité (AUS), intervenant à Yeumbeul et Guédiawaye.",
};

const valueIcons: Record<string, LucideIcon> = {
  users: Users,
  heart: Heart,
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  globe: Globe,
};

const getValueColor = (color: string) => {
  switch (color) {
    case "blue":
      return { bg: "bg-blue-50", text: "text-aus-blue-700", border: "border-blue-200", icon: "bg-aus-blue-700", glow: "group-hover:shadow-aus-blue-700/20" };
    case "red":
      return { bg: "bg-red-50", text: "text-aus-red-700", border: "border-red-200", icon: "bg-aus-red-600", glow: "group-hover:shadow-aus-red-600/20" };
    case "orange":
      return { bg: "bg-orange-50", text: "text-aus-orange-700", border: "border-orange-200", icon: "bg-aus-orange-600", glow: "group-hover:shadow-aus-orange-600/20" };
    case "green":
      return { bg: "bg-green-50", text: "text-emerald-700", border: "border-green-200", icon: "bg-emerald-600", glow: "group-hover:shadow-emerald-600/20" };
    default:
      return { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200", icon: "bg-slate-600", glow: "" };
  }
};

const places = ["Yeumbeul", "Guédiawaye", "Diamalaye", "Terrain Bokk Xalaat"];

export default function QuiSommesNousPage() {
  return (
    <div className="relative py-12 sm:py-20 bg-slate-50/50 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-32 right-0 w-[28rem] h-[28rem] rounded-full bg-aus-blue-100/60 blur-3xl animate-blob pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[40%] -left-32 w-96 h-96 rounded-full bg-aus-orange-100/50 blur-3xl animate-blob [animation-delay:5s] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal variant="down">
            <span className="text-xs font-extrabold uppercase tracking-widest text-aus-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Qui Sommes-Nous ?
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              L'Association pour l'<span className="text-gradient-animated">Unité et la Solidarité</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Une force vive citoyenne intervenant à Yeumbeul et Guédiawaye, guidée par notre devise :
              <span className="font-bold text-aus-blue-800"> « {content.meta.slogans[0]} »</span>.
            </p>
          </Reveal>
        </div>

        {/* Section 1 : Notre Histoire et Ancrage Local */}
        <Reveal variant="blur">
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-aus-orange-600">
                Genèse & Engagement
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {content.about.historyTitle}
              </h2>
              {content.about.historyParagraphs.map((p, idx) => (
                <Reveal key={idx} delay={100 + idx * 120} variant="left">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{p}</p>
                </Reveal>
              ))}

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
                {places.map((place, i) => (
                  <Reveal key={place} delay={300 + i * 90} variant="zoom">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-aus-blue-50 hover:text-aus-blue-800 transition-colors">
                      <MapPin className="w-3.5 h-3.5 text-aus-red-500" />
                      {place}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <Reveal variant="right" delay={150} className="w-full max-w-sm">
                <Tilt>
                  <div className="group relative w-full aspect-square rounded-3xl overflow-hidden border-4 border-slate-100 shadow-xl">
                    <Image
                      src="/images/real-communaute-1.jpg"
                      alt="Engagement communautaire AUS"
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                      <span className="text-white text-sm font-bold">
                        Solidarité agissante sur le terrain à Diamalaye
                      </span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            </div>
          </div>
        </Reveal>

        {/* Section 2 : Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Notre Mission", text: content.about.mission, icon: Target, tag: "#ImpactDurable", from: "from-aus-blue-900", to: "to-aus-blue-950", accent: "text-aus-orange-400", border: "border-aus-blue-800" },
            { title: "Notre Vision", text: content.about.vision, icon: Sparkles, tag: "#AUSenAction", from: "from-slate-900", to: "to-slate-950", accent: "text-emerald-400", border: "border-slate-800" },
          ].map((card, i) => (
            <Reveal key={card.title} variant={i === 0 ? "left" : "right"} delay={i * 120}>
              <div className={`group relative overflow-hidden h-full bg-gradient-to-br ${card.from} ${card.to} text-white p-8 rounded-3xl shadow-lg border ${card.border} flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1`}>
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border-[14px] border-white/5 animate-spin-slow" aria-hidden="true" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <card.icon className={`w-6 h-6 ${card.accent}`} />
                  </div>
                  <h3 className="text-2xl font-black mb-3">{card.title}</h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{card.text}</p>
                </div>
                <div className={`relative mt-6 pt-4 border-t border-white/10 text-xs font-semibold ${card.accent}`}>
                  {card.tag}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Section 3 : Les 5 Valeurs Fondatrices */}
        <div>
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-aus-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Nos Piliers
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              5 Valeurs fondamentales au cœur de l'AUS
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Unité, Solidarité, Santé, Jeunesse et Développement : notre boussole au quotidien.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.about.values.map((val, idx) => {
              const theme = getValueColor(val.color);
              const Icon = valueIcons[val.icon] ?? Heart;
              return (
                <Reveal key={idx} delay={idx * 100} variant="up">
                  <div className={`group h-full p-6 rounded-3xl bg-white border ${theme.border} shadow-sm hover:shadow-xl ${theme.glow} transition-all duration-500 hover:-translate-y-2`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${theme.icon} text-white flex items-center justify-center shadow-md transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${theme.bg} ${theme.text} ${theme.border}`}>
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{val.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Section 4 : L'Équipe de l'Association */}
        <div>
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              Bureau & Commissions
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              L'Équipe dirigeante de l'AUS
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Des bénévoles dévoués qui œuvrent avec rigueur et passion pour faire rayonner nos actions.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.team.map((member, i) => (
              <Reveal key={i} delay={i * 110} variant="up">
                <div className="group h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aus-blue-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm block truncate text-center">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                      <p className="text-xs text-aus-blue-700 font-medium mt-0.5">{member.role}</p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3">{member.bio}</p>
                    </div>

                    {member.phone && (
                      <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Section FAQ */}
        <FaqAccordion className="pt-4 pb-0" />

        {/* CTA Banner */}
        <Reveal variant="zoom">
          <div className="relative overflow-hidden bg-gradient-to-r from-aus-blue-900 via-aus-blue-700 to-aus-blue-900 bg-[length:200%_200%] animate-gradient-x rounded-3xl p-8 sm:p-12 text-white text-center flex flex-col items-center">
            <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-aus-orange-500/15 blur-3xl animate-float-slow" aria-hidden="true" />
            <div className="relative w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <span className="absolute inset-0 rounded-full bg-aus-red-500/30 animate-ping" />
              <Heart className="relative w-8 h-8 text-aus-red-500 fill-current" />
            </div>
            <h2 className="relative text-2xl sm:text-3xl font-black">
              Envie de rejoindre l'aventure humaine de l'AUS ?
            </h2>
            <p className="relative mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
              Toutes les compétences sont les bienvenues pour bâtir un Yeumbeul Nord uni et solidaire.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-4 justify-center">
              <Link
                href="/rejoindre"
                className="btn-shine group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-aus-orange-600 hover:bg-aus-orange-700 transition-all shadow hover:-translate-y-0.5"
              >
                Rejoindre nos bénévoles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/actions"
                className="px-6 py-3 rounded-xl font-bold text-slate-200 bg-white/10 hover:bg-white/20 transition-colors"
              >
                Voir nos actions
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
