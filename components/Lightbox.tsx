"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "@/data/content";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Agrandissement de photo"
    >
      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-300 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Fermer la vue grand format"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
        aria-label="Photo précédente"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
        aria-label="Photo suivante"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div key={currentIndex} className="relative w-full h-[55vh] sm:h-[68vh] animate-zoom-in">
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption & Metadata Card */}
        <div key={`cap-${currentIndex}`} className="mt-4 w-full max-w-2xl bg-slate-900/90 text-white p-4 rounded-xl border border-slate-700/60 backdrop-blur-md text-center animate-page-in">
          <div className="flex items-center justify-center gap-3 mb-1.5 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1 font-semibold text-aus-orange-400">
              <Tag className="w-3.5 h-3.5" />
              {currentItem.category}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {currentItem.date}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {currentItem.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

