"use client";

import React, { useEffect, useRef, useState } from "react";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "fade" | "blur";

interface RevealProps {
  children: React.ReactNode;
  variant?: Variant;
  /** Délai en millisecondes avant le début de l'animation */
  delay?: number;
  /** Durée en millisecondes */
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  /** Rejouer l'animation à chaque entrée dans l'écran */
  repeat?: boolean;
  id?: string;
}

const hiddenStyles: Record<Variant, string> = {
  up: "opacity-0 translate-y-10",
  down: "opacity-0 -translate-y-10",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  zoom: "opacity-0 scale-90",
  fade: "opacity-0",
  blur: "opacity-0 blur-md scale-[0.98]",
};

/**
 * Fait apparaître son contenu en douceur lorsqu'il entre dans l'écran.
 * Respecte automatiquement la préférence système « réduire les animations ».
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 800,
  className = "",
  as = "div",
  repeat = false,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [introDelay, setIntroDelay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Pendant l'intro animée, on attend la levée du rideau avant d'animer
    if (document.documentElement.dataset.intro === "play") {
      setIntroDelay(1450);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!repeat) observer.unobserve(node);
        } else if (repeat) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [repeat]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      id={id}
      style={{
        transitionDelay: `${delay + introDelay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`transition-all will-change-transform ${
        visible ? "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0" : hiddenStyles[variant]
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

