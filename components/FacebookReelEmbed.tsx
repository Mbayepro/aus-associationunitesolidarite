"use client";

import React, { useState } from "react";
import Image from "next/image";
import { VideoItem } from "@/data/content";
import FacebookIcon from "@/components/icons/FacebookIcon";
import {
  Play,
  ExternalLink,
  Calendar,
  Share2,
  Check,
  Film,
  X,
  AlertCircle,
} from "lucide-react";

interface FacebookReelEmbedProps {
  video: VideoItem;
}

export default function FacebookReelEmbed({ video }: FacebookReelEmbedProps) {
  const [loadIframe, setLoadIframe] = useState(false);
  const [copied, setCopied] = useState(false);

  // URL du lecteur officiel Facebook Video/Reel
  const getIframeSrc = (rawUrl: string) => {
    if (rawUrl.includes("facebook.com/plugins/video.php")) {
      return rawUrl;
    }
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      rawUrl
    )}&show_text=false&t=0`;
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(video.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full">
      {/* Zone Vidéo / Lecteur */}
      <div className="relative w-full bg-slate-950 aspect-[9/13] sm:aspect-[9/12] flex items-center justify-center overflow-hidden">
        {loadIframe ? (
          <div className="relative w-full h-full flex flex-col bg-slate-950">
            {/* Barre de contrôle supérieure */}
            <div className="z-10 flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-white">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-300">
                <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
                Lecteur Facebook
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white"
                >
                  <span>Plein écran</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => setLoadIframe(false)}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                  title="Fermer le lecteur"
                  aria-label="Fermer le lecteur"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Iframe Facebook avec permissions sécurisées */}
            <div className="relative flex-1 w-full h-full">
              <iframe
                src={getIframeSrc(video.url)}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Avertissement discret si Facebook bloque les cookies tiers */}
            <div className="px-3 py-1.5 bg-slate-900/95 border-t border-slate-800 text-center">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-blue-300 hover:text-blue-200"
              >
                <AlertCircle className="w-3 h-3" />
                <span>La vidéo tarde ? Cliquez ici pour l'ouvrir directement sur Facebook</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col justify-between p-5 text-white">
            {/* Image de fond authentique si disponible */}
            {video.thumbnail && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-aus-blue-950/80" />
              </div>
            )}

            {/* Haut de la carte vidéo */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600/90 text-white backdrop-blur-md shadow-sm">
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>Facebook Reel</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/50 text-slate-200 backdrop-blur-sm">
                <Calendar className="w-3 h-3 text-aus-orange-400" />
                <span>{video.date}</span>
              </span>
            </div>

            {/* Centre : Bouton de lecture moderne */}
            <div className="relative z-10 my-auto flex flex-col items-center text-center">
              <button
                onClick={() => setLoadIframe(true)}
                className="btn-shine relative w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-aus-blue-600 to-aus-orange-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400"
                aria-label={`Lire le Reel : ${video.title}`}
              >
                <span className="absolute -inset-1.5 rounded-full bg-white/25 animate-ping pointer-events-none" />
                <Play className="relative w-9 h-9 ml-1 fill-current text-white" />
              </button>

              <span className="mt-4 text-xs font-bold text-white px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow">
                Lancer le Reel intégré
              </span>
            </div>

            {/* Bas : bouton direct Facebook */}
            <div className="relative z-10 flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-300 font-medium">
                Page officielle AUS
              </span>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-300 hover:text-white transition-colors"
              >
                <span>Ouvrir sur Facebook</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Informations sous la vidéo */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Film className="w-3.5 h-3.5 text-aus-blue-600" />
              <span>Vidéo de terrain</span>
            </span>
            <button
              onClick={handleShare}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
              title="Copier le lien"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-[11px]">Copié</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Partager</span>
                </>
              )}
            </button>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-aus-blue-700 transition-colors">
            {video.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {video.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
            <span>Regarder sur Facebook</span>
          </a>

          {!loadIframe ? (
            <button
              onClick={() => setLoadIframe(true)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-aus-blue-700 hover:bg-slate-100 transition-colors"
            >
              Visionner ici
            </button>
          ) : (
            <button
              onClick={() => setLoadIframe(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Fermer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
