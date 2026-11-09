import React from "react";
import { Metadata } from "next";
import { content } from "@/data/content";
import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact – Association pour l'Unité et la Solidarité (AUS)",
  description:
    "Contactez l'AUS à Yeumbeul : téléphones 76 293 77 54 / 77 157 67 55, email ausyeumbeulnord@gmail.com, page Facebook et permanence.",
};

export default function ContactPage() {
  return (
    <div className="relative py-12 sm:py-20 bg-slate-50/50 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl animate-blob pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-aus-blue-100/50 blur-3xl animate-blob [animation-delay:4s] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal variant="down">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              Échange & Permanence
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Contactez l'<span className="text-gradient-animated">Association AUS</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Nous sommes à votre entière disposition pour répondre à vos questions, accueillir vos propositions ou organiser un rendez-vous.
            </p>
          </Reveal>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone & WhatsApp */}
          <Reveal delay={100} variant="up">
            <div className="group h-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between hover:border-emerald-500 transition-all duration-500">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Téléphone & WhatsApp (2 Numéros)
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  76 293 77 54 / 77 157 67 55
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Joignable 7j/7 pour les urgences sanitaires, adhésions et informations sur nos activités à Yeumbeul.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
                {/* Numéro 1 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-[11px] font-bold text-slate-500 mb-1">Ligne 1 : 76 293 77 54</span>
                  <div className="flex gap-2">
                    <a
                      href="tel:+221762937754"
                      className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold text-center text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      Appeler
                    </a>
                    <a
                      href={`https://wa.me/221762937754?text=${encodeURIComponent(content.contact.whatsappMessageIntro)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold text-center text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Numéro 2 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-[11px] font-bold text-slate-500 mb-1">Ligne 2 : 77 157 67 55</span>
                  <div className="flex gap-2">
                    <a
                      href="tel:+221771576755"
                      className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold text-center text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      Appeler
                    </a>
                    <a
                      href={`https://wa.me/221771576755?text=${encodeURIComponent(content.contact.whatsappMessageIntro)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold text-center text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Email */}
          <Reveal delay={200} variant="up">
            <div className="group h-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between hover:border-aus-red-500 transition-all duration-500">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-aus-red-600 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Courrier Électronique
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 break-all">
                  {content.contact.email}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Pour l'envoi de dossiers officiels, courriers administratifs, conventions de mécénat et propositions institutionnelles.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={`mailto:${content.contact.email}`}
                  className="btn-shine w-full inline-block py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white bg-aus-red-600 hover:bg-aus-red-700 transition-colors"
                >
                  Envoyer un email
                </a>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Localisation */}
          <Reveal delay={300} variant="up">
            <div className="group h-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between hover:border-aus-blue-500 transition-all duration-500">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-aus-blue-600 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Siège & Permanence
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Yeumbeul
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  {content.contact.address}, {content.contact.pays}. Près de l'École Aliou Kébé et du Terrain Bokk Xalaat.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={content.contact.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white bg-aus-blue-700 hover:bg-aus-blue-800 transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Ouvrir dans Google Maps</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Facebook Focus Section */}
        <Reveal variant="zoom">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 bg-[length:200%_200%] animate-gradient-x text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-700 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border-[18px] border-white/5 animate-spin-slow pointer-events-none" aria-hidden="true" />
            <div className="relative space-y-3 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-700/60 text-blue-200">
                Communauté en Ligne
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Page Officielle Facebook de l'AUS
              </h2>
              <p className="text-sm text-slate-200 max-w-xl">
                Suivez les diffusions en direct, les annonces urgentes et les albums photos de toutes nos journées médicales à Yeumbeul Nord.
              </p>
              <p className="text-xs text-blue-300 font-mono">
                {content.contact.facebookUrl}
              </p>
            </div>

            <a
              href={content.contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine relative flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white text-blue-800 hover:bg-blue-50 font-extrabold text-sm shadow-lg transition-transform hover:scale-105"
            >
              <FacebookIcon className="w-5 h-5 text-blue-600" />
              <span>Rejoindre la page Facebook</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
