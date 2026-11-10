"use client";

import { useEffect } from "react";

/**
 * Moteur de motion global (léger) :
 * - ajoute `.is-inview` aux éléments `.img-reveal` lorsqu'ils entrent à l'écran
 *   (révélation des images en rideau) — fonctionne aussi pour les composants serveur ;
 * - met à jour la position du curseur (`--mx`, `--my`) sur les cartes `.spotlight`.
 */
export default function MotionObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const scan = () => {
      document.querySelectorAll(".img-reveal:not(.is-inview)").forEach((el) => {
        if (reduce) el.classList.add("is-inview");
        else io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const card = target?.closest?.(".spotlight") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}

