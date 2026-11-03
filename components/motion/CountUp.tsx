"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Valeur textuelle issue de content.ts, ex : "2 500+", "100%", "5" */
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Anime un chiffre de 0 jusqu'à sa valeur finale lorsqu'il devient visible.
 * Conserve le préfixe / suffixe (ex : "+", "%") et le séparateur de milliers français.
 */
export default function CountUp({ value, duration = 2000, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const match = value.match(/^(\D*)([\d\s\u00a0.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2].replace(/[\s\u00a0.,]/g, ""), 10) : NaN;
  const suffix = match?.[3] ?? "";

  const [display, setDisplay] = useState(isNaN(target) ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (isNaN(target)) return;
    const node = ref.current;
    if (!node) return;

    const format = (n: number) => n.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(`${prefix}${format(target)}${suffix}`);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(`${prefix}${format(Math.round(target * eased))}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      {display}
    </span>
  );
}

