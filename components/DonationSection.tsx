"use client";

import { useState } from "react";
import { Copy, Check, Heart, ShieldCheck, ArrowRight, Smartphone, Sparkles, Send } from "lucide-react";
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
    `Bonjour AUS, je souhaite faire un don (${selectedMethod === "wave" ? "Wave" : "Orange Money"}) pour soutenir vos actions communautaires à Yeumbeul.`
  )}`;

  return (
    <section id="dons" className={`py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal variant="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-aus-red/10 text-aus-red mb-3">
              <Heart className="w-3.5 h-3.5 fill-aus-red text-aus-red" />
              Soutien solidaire & dons
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {donations.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600">
              {donations.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Boîte des Méthodes de Paiement */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/80 shadow-xl shadow-aus-blue/5 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Mobile Money Sénégal
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-0.5">
                  Faire un don direct
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod("wave")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedMethod === "wave"
                      ? "bg-[#1BA2E7] text-white shadow-md shadow-[#1BA2E7]/25"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  Wave
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod("om")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedMethod === "om"
                      ? "bg-[#FF7900] text-white shadow-md shadow-[#FF7900]/25"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  Orange Money
                </button>
              </div>
            </div>

            {/* Carte Wave */}
            {selectedMethod === "wave" && (
              <div className="mt-6 rounded-2xl p-6 bg-gradient-to-br from-[#1BA2E7]/10 via-[#1BA2E7]/5 to-transparent border border-[#1BA2E7]/20 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#1BA2E7] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                      W
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0E6C9E] uppercase tracking-wider">
                        Compte Wave officiel
                      </div>
                      <div className="text-sm font-bold text-neutral-900">
                        {donations.waveRecipient}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#1BA2E7]/15 text-[#0E6C9E]">
                    Sans frais de transfert
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="p-4 bg-white/90 rounded-xl border border-[#1BA2E7]/20 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-neutral-500 font-semibold">Numéro 1 (Free / Wave)</div>
                      <div className="text-lg sm:text-2xl font-mono font-bold text-neutral-900">
                        76 293 77 54
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("762937754", "wave-1")}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        copiedKey === "wave-1"
                          ? "bg-aus-green text-white shadow-sm"
                          : "bg-[#1BA2E7] text-white hover:bg-[#168ecb] shadow-sm"
                      }`}
                    >
                      {copiedKey === "wave-1" ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copier
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-white/90 rounded-xl border border-[#1BA2E7]/20 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-neutral-500 font-semibold">Numéro 2 (Orange / Wave)</div>
                      <div className="text-lg sm:text-2xl font-mono font-bold text-neutral-900">
                        77 157 67 55
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("771576755", "wave-2")}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        copiedKey === "wave-2"
                          ? "bg-aus-green text-white shadow-sm"
                          : "bg-[#1BA2E7] text-white hover:bg-[#168ecb] shadow-sm"
                      }`}
                    >
                      {copiedKey === "wave-2" ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copier
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
                  <span className="inline-flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-[#1BA2E7]" />
                    Ouvrez l&apos;application Wave sur votre téléphone
                  </span>
                  <span>&bull;</span>
                  <span>Tapez le numéro ou scannez pour envoyer</span>
                </div>
              </div>
            )}

            {/* Carte Orange Money */}
            {selectedMethod === "om" && (
              <div className="mt-6 rounded-2xl p-6 bg-gradient-to-br from-[#FF7900]/10 via-[#FF7900]/5 to-transparent border border-[#FF7900]/20 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF7900] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                      OM
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#B85600] uppercase tracking-wider">
                        Orange Money officiel
                      </div>
                      <div className="text-sm font-bold text-neutral-900">
                        {donations.orangeMoneyRecipient}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FF7900]/15 text-[#B85600]">
                    Transfert national direct
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="p-4 bg-white/90 rounded-xl border border-[#FF7900]/20 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-neutral-500 font-semibold">Numéro Principal (Orange Money)</div>
                      <div className="text-lg sm:text-2xl font-mono font-bold text-neutral-900">
                        77 157 67 55
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("771576755", "om-1")}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        copiedKey === "om-1"
                          ? "bg-aus-green text-white shadow-sm"
                          : "bg-[#FF7900] text-white hover:bg-[#e66c00] shadow-sm"
                      }`}
                    >
                      {copiedKey === "om-1" ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copier
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-white/90 rounded-xl border border-[#FF7900]/20 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-neutral-500 font-semibold">Deuxième Ligne</div>
                      <div className="text-lg sm:text-2xl font-mono font-bold text-neutral-900">
                        76 293 77 54
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("762937754", "om-2")}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        copiedKey === "om-2"
                          ? "bg-aus-green text-white shadow-sm"
                          : "bg-[#FF7900] text-white hover:bg-[#e66c00] shadow-sm"
                      }`}
                    >
                      {copiedKey === "om-2" ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copier
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
                  <span className="inline-flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-[#FF7900]" />
                    Composez #144# ou ouvrez Max it / Orange Money
                  </span>
                </div>
              </div>
            )}

            {/* Action WhatsApp confirmation / reçu */}
            <div className="mt-6 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-aus-green shrink-0" />
                <span>Après votre transfert, prévenez le bureau pour confirmation immédiate.</span>
              </div>
              <a
                href={whatsappDonationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-aus-green hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Confirmer sur WhatsApp</span>
              </a>
            </div>

            {/* Note de transparence */}
            <div className="mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 text-xs text-neutral-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-aus-blue shrink-0 mt-0.5" />
              <span>{donations.transparencyNote}</span>
            </div>
          </div>

          {/* Colonne Exemples d'Impact */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-aus-blue to-aus-blue/90 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-aus-blue/20">
              <div className="flex items-center gap-2 text-aus-orange text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                Votre impact concret
              </div>
              <h3 className="text-xl font-bold">À quoi sert votre don ?</h3>
              <p className="mt-1 text-xs text-blue-100">
                Chaque franc CFA versé est investi à 100% sur le terrain pour les habitants de Yeumbeul Nord.
              </p>

              <div className="mt-5 space-y-3">
                {donations.impactExamples.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-start gap-3 hover:bg-white/15 transition-all"
                  >
                    <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-white text-aus-blue shrink-0 shadow-sm">
                      {item.amount}
                    </span>
                    <p className="text-xs text-blue-50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="text-blue-100">Don par chèque ou matériel ?</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-bold text-white hover:text-aus-orange inline-flex items-center gap-1 transition-colors"
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
