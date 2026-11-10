"use client";

import React, { useEffect } from "react";
import Image from "next/image";

/**
 * Écran d'introduction animé (logo + rideau aux couleurs AUS).
 * Joué une seule fois par session. L'animation est 100 % CSS
 * (voir globals.css → #aus-intro) pour éviter tout flash au chargement.
 */
export default function IntroSplash() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;
    try {
      window.sessionStorage.setItem("aus_intro_seen", "1");
    } catch {
      /* stockage indisponible : on ignore */
    }
    const t = window.setTimeout(() => {
      root.dataset.intro = "seen";
    }, 2300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div id="aus-intro" aria-hidden="true">
      <div className="intro-layer intro-layer--blue" />
      <div className="intro-layer intro-layer--white">
        <div className="intro-content">
          <div className="intro-logo">
            <Image src="/logo.png" alt="" fill sizes="112px" className="object-contain" priority />
          </div>
          <p className="intro-title">AUS</p>
          <p className="intro-sub">Association pour l&apos;Unité et la Solidarité</p>
          <div className="intro-bar">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

