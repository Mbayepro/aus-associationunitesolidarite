import React from "react";
import Image from "next/image";
import Link from "next/link";
import { content } from "@/data/content";
import HomeActionsGrid from "@/components/HomeActionsGrid";
import GallerySection from "@/components/GallerySection";
import { DonationSection } from "@/components/DonationSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  Heart,
  Users,
  Stethoscope,
  Award,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Globe,
  Building2,
  type LucideIcon,
} from "lucide-react";

const statIcons: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  users: { icon: Users, color: "text-aus-blue-600", bg: "bg-aus-blue-50" },
  stethoscope: { icon: Stethoscope, color: "text-emerald-600", bg: "bg-emerald-50" },
  heart: { icon: Heart, color: "text-aus-red-600", bg: "bg-red-50" },
  award: { icon: Award, color: "text-aus-orange-600", bg: "bg-orange-50" },
};

const valueIcons: Record<string, LucideIcon> = {
  users: Users,
  heart: Heart,
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  globe: Globe,
};

const valueColors: Record<string, string> = {
  blue: "bg-aus-blue-700",
  red: "bg-aus-red-600",
  orange: "bg-aus-orange-600",
  green: "bg-emerald-600",
};

function SectionHeading({
  tag,
  tagClass,
  title,
  text,
  link,
}: {
  tag: string;
  tagClass: string;
  title: string;
  text: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
      <Reveal variant="left">
        <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${tagClass}`}>
          {tag}
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900">{title}</h2>
        <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-aus-blue-600 via-aus-orange-500 to-aus-green-600 origin-left animate-draw-line" />
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">{text}</p>
      </Reveal>
      {link && (
        <Reveal variant="right" delay={150}>
          <Link
            href={link.href}
            className="group inline-flex items-center gap-2 text-sm font-bold text-aus-blue-700 hover:text-aus-blue-900 transition-colors"
          >
            <span>{link.label}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}

export default function HomePage() {
  const partnersLoop = [...content.partners, ...content.partners];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50/50 pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-100">
        {/* Animated background */}
        <div className="absolute inset-0 bg-dots opacity-70 pointer-events-none" aria-hidden="true" />
        <div className="absolute -top-20 -left-20 w-[26rem] h-[26rem] rounded-full bg-aus-blue-200/50 blur-3xl animate-blob pointer-events-none" aria-hidden="true" />
        <div className="absolute top-10 right-0 w-[22rem] h-[22rem] rounded-full bg-aus-orange-200/40 blur-3xl animate-blob [animation-delay:3s] pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-24 left-1/3 w-[24rem] h-[24rem] rounded-full bg-aus-green-100/60 blur-3xl animate-blob [animation-delay:6s] pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Announcement Bar */}
          <Reveal variant="down" className="flex justify-center mb-6">
            <Link
              href="/actions#journee-medicale-gratuite-2026"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur border border-aus-blue-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-xs font-semibold text-slate-800 hover:text-aus-blue-700 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px]">Action Réalisée</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="line-clamp-1 text-slate-700">{content.hero.emergencyCallout}</span>
              <ArrowRight className="w-3.5 h-3.5 text-aus-orange-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <Reveal delay={100}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-aus-blue-100/70 text-aus-blue-900 font-bold text-xs uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-aus-red-600" />
                  <span>{content.hero.badge}</span>
                </div>
              </Reveal>

              <Reveal delay={200} variant="blur" duration={1000}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  {content.hero.title}{" "}
                  <span className="text-gradient-animated">{content.hero.highlight}</span>
                </h1>
              </Reveal>

              <Reveal delay={350}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm font-bold">
                  <span className="px-3 py-1 rounded-lg bg-aus-blue-50 text-aus-blue-800 border border-aus-blue-200">
                    « {content.meta.slogans[0]} »
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-aus-orange-50 text-aus-orange-800 border border-aus-orange-200">
                    #{content.meta.slogans[1]}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={450}>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {content.hero.subtitle}
                </p>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={550}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                  <Link
                    href="/rejoindre"
                    className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-lg shadow-aus-blue-700/25 hover:shadow-xl hover:shadow-aus-blue-700/30 hover:-translate-y-0.5 transition-all duration-300 group active:scale-95"
                  >
                    <Heart className="w-5 h-5 text-aus-red-400 fill-current group-hover:scale-125 transition-transform" />
                    <span>{content.hero.primaryButtonText}</span>
                    <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/actions"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-aus-blue-300 shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>{content.hero.secondaryButtonText}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Reveal>

              {/* Trust highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600">
                {[
                  { label: "Consultations 100% gratuites", color: "text-emerald-600" },
                  { label: "Partenariat Odontologie UCAD", color: "text-aus-blue-600" },
                  { label: "Zones : Yeumbeul & Guédiawaye", color: "text-aus-orange-600" },
                ].map((item, i) => (
                  <Reveal key={item.label} delay={650 + i * 100} variant="fade">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className={`w-4 h-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right Column: Logo & Institutional Hero Card */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal variant="zoom" delay={250} duration={900} className="relative w-full max-w-md">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-aus-blue-600/15 via-aus-orange-500/10 to-aus-green-600/15 blur-xl pointer-events-none" aria-hidden="true" />

                <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 flex flex-col items-center text-center">
                  {/* Official Logo Frame */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 mb-5 rounded-full p-1.5 bg-gradient-to-tr from-aus-blue-700 via-aus-red-600 to-aus-green-600 shadow-md">
                    <div className="relative w-full h-full rounded-full bg-white p-2 overflow-hidden">
                      <Image
                        src="/logo.png"
                        alt="Logo officiel AUS – Association pour l'Unité et la Solidarité"
                        fill
                        sizes="(max-width: 640px) 176px, 208px"
                        className="object-contain p-1"
                        priority
                      />
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-aus-blue-900 tracking-wider uppercase mb-1">
                    Association pour l&apos;Unité et la Solidarité
                  </span>
                  <h2 className="text-xl font-black text-slate-900">AUS – Yeumbeul &amp; Guédiawaye</h2>
                  <p className="text-xs text-slate-500 mt-1">Siège : Yeumbeul • Zones : Yeumbeul &amp; Guédiawaye</p>

                  <div className="mt-5 w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-left">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400">
                        <Calendar className="w-3 h-3" /> Dernier Bilan
                      </span>
                      <span className="text-xs font-bold text-slate-900">10 Octobre 2026</span>
                      <span className="block text-[11px] text-emerald-700 font-semibold">Consultation Gratuite</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400">
                        <Building2 className="w-3 h-3" /> Lieu d&apos;impact
                      </span>
                      <span className="text-xs font-bold text-slate-900">École Aliou Kébé</span>
                      <span className="block text-[11px] text-aus-blue-700 font-medium">Poste Diamalaye</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
                      "Bonjour AUS, je souhaite échanger avec un responsable de l'association."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                    <span>Contacter la coordination AUS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="hidden lg:flex justify-center mt-14">
            <a href="#chiffres" aria-label="Défiler vers les chiffres clés" className="flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400 hover:text-aus-blue-700 transition-colors">
              Découvrir
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. CHIFFRES CLÉS */}
      <section id="chiffres" className="py-12 sm:py-16 bg-white border-b border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-aus-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Impact Communautaire Chiffré
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">
              Des actions mesurables à Yeumbeul et Guédiawaye
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Chaque chiffre représente des vies soulagées, des enfants sensibilisés et une jeunesse mobilisée.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.stats.map((stat, idx) => {
              const s = statIcons[stat.icon] ?? statIcons.users;
              const Icon = s.icon;
              return (
                <Reveal key={idx} delay={idx * 120} variant="up">
                  <div className="group relative h-full overflow-hidden bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between">
                    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-aus-blue-100/0 to-aus-orange-100/0 group-hover:from-aus-blue-100/60 group-hover:to-aus-orange-100/60 transition-all duration-700" aria-hidden="true" />
                    <div className="relative flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${s.bg} shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        <Icon className={`w-7 h-7 ${s.color}`} />
                      </div>
                      <span className="w-2 h-2 rounded-full bg-aus-orange-500 animate-pulse" />
                    </div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        <CountUp value={stat.value} />
                      </div>
                      <div className="text-sm font-bold text-slate-800 mt-1">{stat.label}</div>
                      <div className="text-xs text-slate-500 mt-1">{stat.subtext}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DERNIÈRES ACTIONS */}
      <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="AUS sur le Terrain"
            tagClass="text-aus-red-700 bg-red-50 border-red-100"
            title="Nos actions & projets prioritaires"
            text="Découvrez nos interventions directes à Yeumbeul et Guédiawaye pour la santé publique, l'éducation bucco-dentaire et l'autonomie citoyenne."
            link={{ href: "/actions", label: "Consulter tout l'historique" }}
          />
          <HomeActionsGrid />
        </div>
      </section>

      {/* 4. QUI SOMMES-NOUS */}
      <section className="relative py-16 sm:py-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="absolute -right-32 top-10 w-96 h-96 rounded-full bg-emerald-50 blur-3xl animate-blob pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal variant="left" className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                Identité & Vocation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Une association bâtie sur le cœur et la fraternité
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{content.about.mission}</p>
              <div className="p-4 rounded-2xl bg-aus-blue-50/70 border border-aus-blue-100 text-aus-blue-900 text-sm border-l-4 border-l-aus-blue-600">
                <span className="font-bold block mb-1">Notre Vision communautaire :</span>
                <p className="italic text-slate-700">« {content.about.vision} »</p>
              </div>
              <div className="pt-2">
                <Link
                  href="/qui-sommes-nous"
                  className="btn-shine group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-aus-blue-700 hover:bg-aus-blue-800 transition-all shadow hover:-translate-y-0.5"
                >
                  <span>En savoir plus sur l'AUS et l'équipe</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.about.values.map((val, idx) => {
                  const Icon = valueIcons[val.icon] ?? Heart;
                  return (
                    <Reveal key={idx} delay={idx * 100} variant="right">
                      <div className="group h-full p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`w-9 h-9 rounded-xl ${valueColors[val.color]} text-white flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110`}>
                            <Icon className="w-[18px] h-[18px]" />
                          </span>
                          <span className="text-sm font-bold text-slate-900">{val.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.description}</p>
                      </div>
                    </Reveal>
                  );
                })}

                <Reveal delay={500} variant="zoom">
                  <div className="h-full p-5 rounded-2xl bg-gradient-to-br from-aus-blue-900 to-slate-900 bg-[length:200%_200%] animate-gradient-x text-white flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-aus-orange-500/30 text-aus-orange-300">
                        <MapPin className="w-3 h-3" /> Zones d'intervention
                      </span>
                      <h4 className="text-base font-bold text-white mt-2">Yeumbeul & Guédiawaye</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Interventions sanitaires, éducatives et citoyennes à Yeumbeul et dans tout le département de Guédiawaye.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold">
                      #AUSenAction
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GALERIE */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Galerie Multimédia"
            tagClass="text-aus-blue-700 bg-blue-50 border-blue-100"
            title="Moments forts & Vidéos de terrain"
            text="Revivez en images et en vidéos nos journées médicales, nos ateliers avec les enfants et les panels citoyens."
            link={{ href: "/galerie", label: "Voir toute la galerie & reels" }}
          />
          <Reveal variant="fade" duration={1000}>
            <GallerySection limit={6} showTabs={true} />
          </Reveal>
        </div>
      </section>

      {/* 6. ACTUALITÉS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Fil d'information"
            tagClass="text-aus-orange-700 bg-orange-50 border-orange-100"
            title="Dernières actualités de l'AUS"
            text="Restez informés sur nos démarches, préparatifs et communiqués officiels."
            link={{ href: "/actualites", label: "Toutes les actualités" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.news.map((item, i) => (
              <Reveal key={item.id} delay={i * 130}>
                <Link
                  href={`/actualites#${item.id}`}
                  className="group h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-white/95 text-slate-800 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-aus-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3">{item.summary}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-aus-blue-700">
                        <span>Lire l'article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PARTENAIRES — défilement infini */}
      <section className="py-14 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <Reveal className="text-center mb-8 px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Ils nous font confiance et agissent à nos côtés
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Partenaires & Institutions Alliées</h3>
        </Reveal>

        <div className="group relative mask-fade-x">
          <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
            {partnersLoop.map((partner, i) => (
              <div
                key={i}
                aria-hidden={i >= content.partners.length}
                className="w-56 flex-shrink-0 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 hover:border-aus-blue-400 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aus-blue-600 to-aus-blue-800 text-white flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{partner.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{partner.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DONS & SOUTIEN FINANCIER (Wave & Orange Money) */}
      <DonationSection className="bg-white border-b border-slate-100" />

      {/* 9. FOIRE AUX QUESTIONS */}
      <FaqAccordion className="bg-slate-50/50" limit={4} />
    </div>
  );
}
