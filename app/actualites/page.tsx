import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { content } from "@/data/content";
import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import { WhatsAppShareButton } from "@/components/WhatsAppShareButton";
import { Calendar, User, Clock, ArrowRight, Tag, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Actualités & Communiqués – AUS Yeumbeul Nord",
  description:
    "Suivez toutes les actualités, annonces officielles et bilans d'actions de l'Association pour l'Unité et la Solidarité à Yeumbeul Nord et Keur Massar.",
};

export default function ActualitesPage() {
  return (
    <div className="py-12 sm:py-20 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-aus-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            Journal de l'Association
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Actualités & Communiqués
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Toutes les nouvelles, comptes-rendus de réunions et annonces officielles de l'AUS alimentées en temps réel depuis nos données.
          </p>
        </Reveal>

        {/* News Articles List */}
        <div className="space-y-8">
          {content.news.map((item, i) => (
            <Reveal key={item.id} variant={i % 2 === 0 ? "left" : "right"}>
              <article
                id={item.id}
                className="group scroll-mt-32 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8"
              >
                {/* Thumbnail */}
                <div className="md:col-span-5 relative aspect-[16/11] md:aspect-auto w-full min-h-[220px] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-aus-blue-900 shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-aus-orange-500" />
                        {item.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {item.author}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm text-slate-600 font-medium">
                      {item.summary}
                    </p>

                    <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {item.content}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
                          `Bonjour AUS, je souhaite réagir à l'actualité : ${item.title}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>Réagir</span>
                      </a>

                      <WhatsAppShareButton
                        title={item.title}
                        summary={item.summary}
                        variant="badge"
                        label="Partager"
                      />
                    </div>

                    <a
                      href={content.contact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1.5"
                    >
                      <FacebookIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

