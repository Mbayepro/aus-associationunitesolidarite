"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2 } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface InstallAppButtonProps {
  variant?: "navbar" | "mobile-bar" | "mobile-drawer";
  onAction?: () => void;
}

export default function InstallAppButton({
  variant = "navbar",
  onAction,
}: InstallAppButtonProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Enregistrer le Service Worker pour activer l'installation PWA native
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Vérifier si l'application est déjà installée et ouverte en mode standalone
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);

    const ua = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(ua));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      setShowGuideModal(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (isStandalone) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
      }
      onAction?.();
      return;
    }
    setShowGuideModal(true);
    onAction?.();
  };

  return (
    <>
      {variant === "navbar" && (
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-lg text-aus-blue-800 bg-aus-blue-50 hover:bg-aus-blue-100 border border-aus-blue-200 transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
          title="Installer l'application AUS sur votre téléphone ou ordinateur"
        >
          <Download className="w-3.5 h-3.5 text-aus-blue-700 animate-bounce" />
          <span>Installer AUS</span>
        </button>
      )}

      {variant === "mobile-bar" && (
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-extrabold text-aus-blue-800 bg-aus-blue-50 hover:bg-aus-blue-100 border border-aus-blue-200 rounded-md cursor-pointer"
          title="Installer l'application AUS"
        >
          <Download className="w-3.5 h-3.5 text-aus-blue-700" />
          <span>Installer AUS</span>
        </button>
      )}

      {variant === "mobile-drawer" && (
        <button
          type="button"
          onClick={handleInstallClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-extrabold text-aus-blue-900 bg-aus-blue-50 hover:bg-aus-blue-100 border border-aus-blue-200 shadow-sm cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-aus-blue-700" />
          <span>Installer l&apos;application AUS sur mon téléphone</span>
        </button>
      )}

      {/* Fenêtre d'aide à l'installation rapide si le navigateur ne lance pas la popup automatique */}
      {showGuideModal && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowGuideModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl border border-slate-200 p-1 bg-white shadow-sm shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Logo AUS"
                    fill
                    sizes="48px"
                    className="object-contain rounded-xl"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Application Rapide
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    Installer AUS sur votre écran
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Accédez à l&apos;Association pour l&apos;Unité et la Solidarité en 1 clic depuis votre écran d&apos;accueil, comme une application mobile :
            </p>

            {isIos ? (
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                <div className="font-extrabold text-aus-blue-900">
                  Sur iPhone / iPad (Safari) :
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-aus-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span className="flex items-center gap-1.5 flex-wrap">
                    Appuyez sur le bouton <strong>Partager</strong>{" "}
                    <Share className="w-4 h-4 text-aus-blue-700 inline" /> en bas de l&apos;écran.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-aus-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span className="flex items-center gap-1.5 flex-wrap">
                    Choisissez <strong>« Sur l&apos;écran d&apos;accueil »</strong>{" "}
                    <PlusSquare className="w-4 h-4 text-aus-blue-700 inline" /> puis <strong>Ajouter</strong>.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                <div className="font-extrabold text-aus-blue-900">
                  Sur Android ou Ordinateur (Chrome / Edge) :
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-aus-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Ouvrez le menu du navigateur <strong>(⋮ en haut à droite)</strong> ou cliquez sur l&apos;icône d&apos;installation dans la barre d&apos;adresse.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-aus-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Appuyez sur <strong>« Installer l&apos;application »</strong> ou <strong>« Ajouter à l&apos;écran d&apos;accueil »</strong>.
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                Gratuit &amp; sans téléchargement lourd
              </span>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2.5 rounded-xl bg-aus-blue-700 hover:bg-aus-blue-800 text-white text-xs font-bold shadow"
              >
                J&apos;ai compris
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
