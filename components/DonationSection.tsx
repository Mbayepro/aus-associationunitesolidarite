"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Heart,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { content } from "@/data/content";
import Reveal from "./motion/Reveal";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export function DonationSection({ className = "" }: { className?: string }) {
  const { donations, contact } = content;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"wave" | "om">("wave");

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      // Fallback
    }
  };

  const whatsappDonationUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Bonjour AUS, je souhaite faire un don (${
      selectedMethod === "wave" ? "Wave" : "Orange Money"
    }) pour soutenir vos actions communautaires à Yeumbeul et Guédiawaye.`
  )}`;

  const activeTheme =
    selectedMethod === "wave"
      ? {
          name: "Wave",
          badgeBg: "bg-[#1BA2E7]",
          panelBg: "bg-[#F0F9FF] border-[#BAE6FD]",
          accentText: "text-[#0369A1]",
          btnBg: "bg-[#1BA2E7] hover:bg-[#0284C7]",
          hint: "Ouvrez l'application Wave et envoyez au numéro de votre choix (0% de frais).",
          numbers: [
            {
              id: "wave-1",
              label: "Ligne 1 • Compte Wave AUS",
              display: "76 293 77 54",
              raw: "762937754",
            },
            {
              id: "wave-2",
              label: "Ligne 2 • Compte Wave AUS",
              display: "77 157 67 55",
              raw: "771576755",
            },
          ],
        }
      : {
          name: "Orange Money",
          badgeBg: "bg-[#FF7900]",
          panelBg: "bg-[#FFF7ED] border-[#FED7AA]",
          accentText: "text-[#C2410C]",
          btnBg: "bg-[#FF7900] hover:bg-[#EA580C]",
          hint: "Composez #144# ou utilisez l'application Max it / Orange Money.",
          numbers: [
            {
              id: "om-1",
              label: "Ligne Principale • Orange Money",
              display: "77 157 67 55",
              raw: "771576755",
            },
            {
              id: "om-2",
              label: "Ligne Secondaire • Wave / Mobile",
              display: "76 293 77 54",
              raw: "762937754",
            },
          ],
        };

  return (
    <section id="dons" className={`py-14 sm:py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal variant="up">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-50 text-aus-red-600 border border-red-100 mb-3">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Soutien solidaire &amp; dons
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {donations.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {donations.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Colonne Gauche : Boîte de Paiement Mobile Money épurée */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-5 sm:p-8 flex flex-col justify-between">
            <div>
              {/* En-tête empilé proprement (sans texte écrasé sur mobile) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold text-aus-blue-700 uppercase tracking-widest block">
                    Mobile Money Sénégal
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    Faire un don direct
                  </h3>
                </div>

                {/* Sélecteur segmenté 2 colonnes large et net */}
                <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-full sm:w-auto sm:min-w-[260px]">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("wave")}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                      selectedMethod === "wave"
                        ? "bg-[#1BA2E7] text-white shadow-md shadow-[#1BA2E7]/25"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>Wave</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("om")}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                      selectedMethod === "om"
                        ? "bg-[#FF7900] text-white shadow-md shadow-[#FF7900]/25"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>Orange Money</span>
                  </button>
                </div>
              </div>

              {/* Encart du compte sélectionné */}
              <div
                className={`mt-5 rounded-2xl p-4 sm:p-6 border transition-all ${activeTheme.panelBg}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-900/10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl ${activeTheme.badgeBg} text-white flex items-center justify-center font-black text-base shadow-sm shrink-0`}
                    >
                      {selectedMethod === "wave" ? "W" : "OM"}
                    </div>
                    <div>
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider block ${activeTheme.accentText}`}
                      >
                        Compte {activeTheme.name} officiel
                      </span>
                      <span className="text-sm sm:text-base font-black text-slate-900">
                        AUS – Yeumbeul &amp; Guédiawaye
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-white text-slate-800 shadow-sm border border-slate-200/70">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Transfert direct</span>
                  </span>
                </div>

                {/* Les 2 numéros avec bouton Copier aligné sur une seule ligne */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTheme.numbers.map((num) => {
                    const isCopied = copiedKey === num.id;
                    return (
                      <div
                        key={num.id}
                        className="p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <span className="text-[11px] text-slate-500 font-semibold block truncate">
                            {num.label}
                          </span>
                          <span className="text-base sm:text-lg font-mono font-black text-slate-900 whitespace-nowrap block mt-0.5">
                            {num.display}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => copyToClipboard(num.raw, num.id)}
                          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold text-white shadow-sm transition-all ${
                            isCopied ? "bg-emerald-600" : activeTheme.btnBg
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copié</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copier</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Smartphone className={`w-4 h-4 shrink-0 ${activeTheme.accentText}`} />
                  <span>{activeTheme.hint}</span>
                </div>
              </div>
            </div>

            {/* Pied de carte : Confirmation WhatsApp + Transparence */}
            <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Prévenez le bureau après votre envoi pour accusé de réception.</span>
                </p>
                <a
                  href={whatsappDonationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Confirmer sur WhatsApp</span>
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] text-slate-600 leading-relaxed">
                {donations.transparencyNote}
              </div>
            </div>
          </div>

          {/* Colonne Droite : Domaines d'Impact (sans montants imposés) */}
          <div className="lg:col-span-5 flex">
            <div className="w-full bg-gradient-to-br from-aus-blue-800 via-aus-blue-700 to-aus-blue-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-aus-blue/20 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-aus-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  Votre impact concret
                </div>
                <h3 className="text-xl font-extrabold">À quoi sert votre soutien ?</h3>
                <p className="mt-1.5 text-xs text-blue-100 leading-relaxed">
                  Chaque contribution, libre et selon vos moyens, est investie à 100 % sur le terrain pour les familles de{" "}
                  <strong>Yeumbeul et Guédiawaye</strong> :
                </p>

                <div className="mt-5 space-y-3">
                  {donations.impactExamples.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-start gap-3 hover:bg-white/15 transition-all"
                    >
                      <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-extrabold text-white tracking-wide">
                          {item.amount}
                        </span>
                        <p className="text-xs text-blue-100 leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="text-blue-100">Don de médicaments ou matériel ?</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-bold text-white hover:text-aus-orange-300 inline-flex items-center gap-1 transition-colors"
                >
                  Contactez-nous
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
