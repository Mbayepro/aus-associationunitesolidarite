"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const R = 20;
const C = 2 * Math.PI * R;

/** Bouton « retour en haut » avec anneau de progression du défilement. */
export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
      setVisible(h.scrollTop > 600);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Revenir en haut de la page"
      className={`group fixed bottom-6 left-5 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg border border-slate-200 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-xl hover:-translate-y-1 print:hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} fill="none" stroke="#e2e8f0" strokeWidth="3" />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="url(#aus-ring)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
        <defs>
          <linearGradient id="aus-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#124B9C" />
            <stop offset="55%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp className="relative w-4 h-4 text-aus-blue-700 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}

