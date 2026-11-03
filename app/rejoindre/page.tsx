import React from "react";
import { Metadata } from "next";
import WhatsAppJoinForm from "@/components/WhatsAppJoinForm";
import Reveal from "@/components/motion/Reveal";
import { DonationSection } from "@/components/DonationSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { content } from "@/data/content";
import {
  CheckCircle2,
  Users,
  Sparkles,
  Phone,
  Stethoscope,
  HandHelping,
  Camera,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Rejoindre & Soutenir l'AUS – Adhésion & Bénévolat",
  description:
    "Rejoignez l'Association pour l'Unité et la Solidarité à Yeumbeul Nord : devenez bénévole, professionnel de santé partenaire ou donateur pour un impact durable.",
};

export default function RejoindrePage() {
  return (
    <div className="relative py-12 sm:py-20 bg-slate-50/50 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-aus-red-100/50 blur-3xl animate-blob pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-aus-blue-100/50 blur-3xl animate-blob [animation-delay:4s] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal variant="down">
            <span className="text-xs font-extrabold uppercase tracking-widest text-aus-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Adhésion & Bénévolat
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              <span className="text-gradient-animated">{content.join.title}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              {content.join.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Why join & Roles */}
          <div className="lg:col-span-5 space-y-8">
            {/* Benefits Card */}
            <Reveal variant="left" delay={150}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-aus-orange-500 animate-pulse" />
                  <span>Pourquoi vous engager avec l'AUS ?</span>
                </h3>
                <ul className="space-y-3">
                  {content.join.volunteerBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Profile Needs Card */}
            <Reveal variant="left" delay={250}>
              <div className="bg-gradient-to-br from-aus-blue-900 to-slate-900 bg-[length:200%_200%] animate-gradient-x text-white rounded-3xl p-6 sm:p-8 shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-aus-orange-400" />
                  <span>Profils & compétences recherchés</span>
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors flex items-start gap-3">
                    <Stethoscope className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Corps médical & soignants :</strong>
                      Chirurgiens-dentistes, médecins généralistes, pédiatres, gynécologues, infirmiers, pharmaciens.
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors flex items-start gap-3">
                    <HandHelping className="w-4 h-4 text-aus-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Jeunes & résidents de quartier :</strong>
                      Accueil des familles, orientation des patients, aménagement et logistique du terrain.
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors flex items-start gap-3">
                    <Camera className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Communication & Mécénat :</strong>
                      Photographes, animateurs réseaux sociaux, donateurs de médicaments et partenaires institutionnels.
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Direct Phone / Contact Help */}
            <Reveal variant="left" delay={350}>
              <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Une question sur votre adhésion ?
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Appelez notre permanence au <strong>{content.contact.phoneDisplay}</strong>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive WhatsApp Form */}
          <Reveal variant="right" delay={200} className="lg:col-span-7">
            <WhatsAppJoinForm />
          </Reveal>
        </div>

        {/* Section Dons Mobile Money (Wave / Orange Money) */}
        <div className="pt-8 border-t border-slate-200/80">
          <DonationSection className="py-6" />
        </div>

        {/* FAQ Accordion */}
        <div className="pt-4 border-t border-slate-200/80">
          <FaqAccordion
            title="Questions fréquentes sur l'adhésion & les dons"
            subtitle="Toutes les réponses pour nous rejoindre en toute clarté et soutenir la communauté."
            className="py-6"
          />
        </div>
      </div>
    </div>
  );
}
