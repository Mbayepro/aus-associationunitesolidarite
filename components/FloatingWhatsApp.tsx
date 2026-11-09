"use client";

import React, { useState } from "react";
import { content } from "@/data/content";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
    content.contact.whatsappMessageIntro
  )}`;

  return (
    <div className="fixed bottom-6 right-5 z-50 flex items-end gap-3 flex-col sm:flex-row">
      {/* Tooltip on desktop/tablet */}
      {showTooltip && (
        <div className="relative bg-white text-slate-800 text-xs font-medium px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-2 opacity-0 [animation:zoom-in_0.5s_cubic-bezier(0.22,1,0.36,1)_2s_forwards,float_6s_ease-in-out_2.5s_infinite]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Besoin d'un renseignement ? Écrivez-nous sur WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5 rounded"
            aria-label="Fermer l'infobulle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45 transform"></div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter AUS sur WhatsApp au 76 293 77 54 / 77 157 67 55"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 text-white shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 group-hover:opacity-60 animate-ping"></span>

        <WhatsAppIcon className="w-8 h-8 relative z-10 fill-current text-white animate-wiggle group-hover:[animation-play-state:paused]" />

        <span className="sr-only">Discuter avec l'AUS sur WhatsApp</span>
      </a>
    </div>
  );
}

