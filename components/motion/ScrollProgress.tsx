"use client";

import React, { useEffect, useState } from "react";

/** Fine barre tricolore en haut de l'écran indiquant la progression du défilement. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
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
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 pointer-events-none" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-aus-blue-600 via-aus-orange-500 to-aus-green-600 shadow-[0_0_10px_rgba(234,88,12,0.6)]"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}

