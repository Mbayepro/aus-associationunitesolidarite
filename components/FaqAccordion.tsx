"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquarePlus, Sparkles } from "lucide-react";
import { content, FaqItem } from "@/data/content";
import Reveal from "./motion/Reveal";
import WhatsAppIcon from "./icons/WhatsAppIcon";

interface FaqAccordionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  limit?: number;
}

export function FaqAccordion({
  items = content.faq,
  title = "Foire Aux Questions (FAQ)",
  subtitle = "Tout ce que vous devez savoir sur l'AUS, nos adhésions, nos actions de santé et notre fonctionnement.",
  className = "",
  limit,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");

  const categories = ["Toutes", ...Array.from(new Set(items.map((it) => it.category)))];

  const displayedItems = items
    .filter((it) => selectedCategory === "Toutes" || it.category === selectedCategory)
    .slice(0, limit || items.length);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal variant="up">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-aus-blue/10 text-aus-blue mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-aus-blue" />
              Réponses à vos questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              {subtitle}
            </p>
          </div>
        </Reveal>

        {/* Filtres par catégorie */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-aus-blue text-white shadow-md shadow-aus-blue/20"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Liste des questions accordéon */}
        <div className="space-y-3.5">
          {displayedItems.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-aus-blue/30 shadow-lg shadow-aus-blue/5 ring-1 ring-aus-blue/15"
                    : "bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 transition-colors focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 transition-colors ${
                        isOpen
                          ? "bg-aus-blue text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-neutral-900 leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-aus-blue/10 text-aus-blue rotate-180"
                        : "bg-neutral-100 text-neutral-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer contact si question non trouvée */}
        <div className="mt-10 p-6 bg-gradient-to-r from-blue-50/70 via-emerald-50/50 to-orange-50/50 rounded-2xl border border-blue-100/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Une autre question ?
            </div>
            <div className="text-sm font-bold text-neutral-900 mt-0.5">
              Notre équipe répond directement sur WhatsApp ou par téléphone.
            </div>
          </div>
          <a
            href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
              "Bonjour AUS, j'ai une question concernant l'association : "
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-aus-green hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Poser ma question</span>
          </a>
        </div>
      </div>
    </section>
  );
}
