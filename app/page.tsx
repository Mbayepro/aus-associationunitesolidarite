import React from "react";
import Image from "next/image";
import Link from "next/link";
import { content } from "@/data/content";
import CjsHeroSlider from "@/components/CjsHeroSlider";
import CjsPillarBento, { CjsArrowSvg } from "@/components/CjsPillarBento";
import CjsProjectsCarousel from "@/components/CjsProjectsCarousel";
import HomeActionsGrid from "@/components/HomeActionsGrid";
import GallerySection from "@/components/GallerySection";
import { DonationSection } from "@/components/DonationSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import Reveal from "@/components/motion/Reveal";
import ImpactMarquee from "@/components/ImpactMarquee";
import {
  Heart,
  Users,
  Stethoscope,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Globe,
  Building2,
  type LucideIcon,
} from "lucide-react";

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
        <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 flex items-center flex-wrap">
          <span>{title}</span>
          <CjsArrowSvg className="w-7 sm:w-8 h-auto fill-aus-red-600 ml-2.5" />
        </h2>
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
      {/* 1. HERO PLEIN ÉCRAN STYLE CONSORTIUM JEUNESSE SÉNÉGAL */}
      <CjsHeroSlider />

      {/* 2. DOUBLE BANDEAU DÉFILANT EN SENS OPPOSÉ */}
      <ImpactMarquee />

      {/* 3. INTRO ÉDITORIALE + 3 PILIERS ROTATIFS (Wérgu Yaram | Bokk & Jàng | Bennoo) + MOSAÏQUE BENTO CHIFFRES CLÉS */}
      <CjsPillarBento />

      {/* 4. CARROUSEL AUTOMATIQUE « NOS PROJETS PHARES » STYLE CJS */}
      <CjsProjectsCarousel />

      {/* 5. CARTES DÉTAILLÉES DES DERNIÈRES INTERVENTIONS */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="AUS sur le Terrain"
            tagClass="text-aus-red-700 bg-red-50 border-red-100"
            title="Détail de nos interventions"
            text="Consultez les fiches complètes de nos journées médicales gratuites, sensibilisations scolaires et panels citoyens à Yeumbeul et Guédiawaye."
            link={{ href: "/actions", label: "Consulter tout l'historique" }}
          />
          <HomeActionsGrid />
        </div>
      </section>

      {/* 6. VALEURS & IDENTITÉ */}
      <section className="relative py-16 sm:py-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="absolute -right-32 top-10 w-96 h-96 rounded-full bg-emerald-50 blur-3xl animate-blob pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal variant="left" className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                Identité &amp; Vocation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Une association bâtie sur le cœur et la fraternité
                <CjsArrowSvg className="w-7 h-auto fill-emerald-600 ml-2" />
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{content.about.mission}</p>
              <div className="p-4 rounded-2xl bg-aus-blue-50/70 border border-aus-blue-100 text-aus-blue-900 text-sm border-l-4 border-l-aus-blue-600">
                <span className="font-bold block mb-1">Notre Vision communautaire :</span>
                <p className="italic text-slate-700">« {content.about.vision} »</p>
              </div>
              <div className="pt-2">
                <Link
                  href="/qui-sommes-nous"
                  className="btn-shine group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-aus-blue-700 hover:bg-aus-blue-800 transition-all shadow hover:-translate-y-0.5"
                >
                  <span>En savoir plus sur l&apos;AUS et l&apos;équipe</span>
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
                      <div className="spotlight group h-full p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
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
                        <MapPin className="w-3 h-3" /> Zones d&apos;intervention
                      </span>
                      <h4 className="text-base font-bold text-white mt-2">Yeumbeul &amp; Guédiawaye</h4>
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

      {/* 7. GALERIE MULTIMÉDIA */}
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

      {/* 8. ACTUALITÉS (Style Loop-Grid CJS avec zoom doux 1.03x au survol) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Fil d'information"
            tagClass="text-aus-orange-700 bg-orange-50 border-orange-100"
            title="Dernières actualités de l'AUS"
            text="Restez informés sur nos démarches, bilans d'activités et communiqués officiels."
            link={{ href: "/actualites", label: "Toutes les actualités" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.news.map((item, i) => (
              <Reveal key={item.id} delay={i * 130}>
                <Link
                  href={`/actualites#${item.id}`}
                  className="spotlight group h-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/95 text-slate-900 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="text-slate-500">{item.readTime}</span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-aus-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3">{item.summary}</p>
                    </div>
                    <div className="mt-5 pt-3.5 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-aus-blue-700">
                        <span>Lire l&apos;article</span>
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

      {/* 9. PARTENAIRES & ALLIÉS — Cartes flottantes style CJS (ha_floating_fx + scale 1.1) & Bandeau continu */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <Reveal variant="left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-aus-blue-700">
              Écosystème &amp; Coopération
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center flex-wrap">
              <span>Les Partenaires de l&apos;AUS</span>
              <CjsArrowSvg className="w-6 h-auto fill-aus-red-600 ml-2.5" />
            </h3>
          </Reveal>

          {/* Grille de badges flottants avec zoom 1.08x au survol comme sur CJS */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {content.partners.map((partner, idx) => (
              <Reveal key={partner.name} delay={idx * 90} variant="up">
                <div
                  style={{ animationDelay: `${idx * 0.6}s` }}
                  className="group h-full bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-aus-blue-400 transition-all duration-300 hover:scale-[1.06] animate-float-slow flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aus-blue-600 to-emerald-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:rotate-6 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                      {partner.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {partner.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bandeau défilant infini des partenaires */}
        <div className="group relative mask-fade-x pt-2">
          <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
            {partnersLoop.map((partner, i) => (
              <div
                key={i}
                aria-hidden={i >= content.partners.length}
                className="w-64 flex-shrink-0 bg-white px-4 py-3 rounded-full border border-slate-200 shadow-sm flex items-center gap-3 hover:border-emerald-500 transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-slate-800 truncate">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. DONS & SOUTIEN FINANCIER (Wave & Orange Money) */}
      <DonationSection className="bg-white border-b border-slate-100" />

      {/* 11. FOIRE AUX QUESTIONS */}
      <FaqAccordion className="bg-slate-50/50" limit={4} />

      {/* 12. BANDEAU D'APPEL FINAL STYLE CJS (« Rejoignez l'AUS / Nous contacter » avec soulignement SVG animé) */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-[#04182B] via-aus-blue-900 to-[#06241B] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal variant="left" className="lg:col-span-8 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                Bokk • Jàng • Ligeey • Wérgu Yaram
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                <Link href="/rejoindre" className="hover:text-emerald-300 transition-colors">
                  Rejoignez le mouvement AUS
                </Link>{" "}
                à Yeumbeul &amp; Guédiawaye
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                Bénévoles, médecins, étudiants, partenaires institutionnels : construisons ensemble des actions durables pour nos communautés.
              </p>
            </Reveal>

            <Reveal variant="right" delay={150} className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-5">
              <Link
                href="/contact"
                className="group relative inline-block text-xl sm:text-2xl font-extrabold text-white hover:text-amber-300 transition-colors pb-2"
              >
                <span>Nous contacter directement</span>
                <svg
                  viewBox="0 0 300 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-0 -bottom-1 w-full h-3.5 pointer-events-none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 13C72 4 198 3 296 12"
                    stroke="#F97316"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="cjs-underline-path"
                  />
                </svg>
              </Link>

              <Link
                href="/rejoindre"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg transition-all hover:-translate-y-0.5"
              >
                <span>Devenir membre ou bénévole</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
