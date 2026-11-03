"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";

interface WhatsAppShareButtonProps {
  title: string;
  summary?: string;
  url?: string;
  label?: string;
  variant?: "badge" | "button" | "icon";
  className?: string;
}

export function WhatsAppShareButton({
  title,
  summary,
  url,
  label = "Partager",
  variant = "button",
  className = "",
}: WhatsAppShareButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleShare = () => {
    const currentUrl =
      url || (typeof window !== "undefined" ? window.location.href : "https://aus-yeumbeul-nord.sn");
    
    const messageParts = [
      `*AUS – Association pour l'Unité et la Solidarité* (Yeumbeul Nord)`,
      `*${title}*`,
      summary ? `\n${summary}` : "",
      `\nDécouvrez les détails sur notre site :`,
      currentUrl,
      `\n#AUSenAction #YeumbeulNord #Solidarité`,
    ].filter(Boolean);

    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      messageParts.join("\n")
    )}`;

    setClicked(true);
    setTimeout(() => setClicked(false), 3000);

    if (typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleShare}
        aria-label={`Partager "${title}" sur WhatsApp`}
        title="Partager sur WhatsApp"
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-sm ${className}`}
      >
        {clicked ? <Check className="w-4 h-4 text-emerald-700" /> : <WhatsAppIcon className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === "badge") {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 transition-all ${className}`}
      >
        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
        <span>{clicked ? "Partagé !" : label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#25D366]/10 text-emerald-800 hover:bg-[#25D366] hover:text-white transition-all ${className}`}
    >
      <WhatsAppIcon className="w-3.5 h-3.5" />
      <span>{clicked ? "Lien ouvert !" : label}</span>
    </button>
  );
}
