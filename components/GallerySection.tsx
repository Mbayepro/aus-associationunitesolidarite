"use client";

import React, { useState } from "react";
import Image from "next/image";
import { content, GalleryItem } from "@/data/content";
import Lightbox from "@/components/Lightbox";
import FacebookReelEmbed from "@/components/FacebookReelEmbed";
import Reveal from "@/components/motion/Reveal";
import { ZoomIn, Calendar, Tag, Video as VideoIcon, Image as ImageIcon } from "lucide-react";

interface GallerySectionProps {
  limit?: number;
  showTabs?: boolean;
}

export default function GallerySection({ limit, showTabs = true }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [activeMediaTab, setActiveMediaTab] = useState<"photos" | "videos">("photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["Tous", "Santé", "Jeunesse", "Citoyenneté", "Communauté"];

  const filteredPhotos = content.gallery.filter((item) => {
    if (selectedCategory === "Tous") return true;
    return item.category === selectedCategory;
  });

  const displayPhotos = limit ? filteredPhotos.slice(0, limit) : filteredPhotos;
  const displayVideos = limit ? content.videos.slice(0, limit) : content.videos;

  return (
    <div>
      {/* Media Switcher Tab (Photos vs Vidéos / Reels) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveMediaTab("photos")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeMediaTab === "photos"
                ? "bg-white text-aus-blue-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-aus-blue-600" />
            <span>Photos de terrain ({content.gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveMediaTab("videos")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeMediaTab === "videos"
                ? "bg-white text-aus-blue-800 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <VideoIcon className="w-4 h-4 text-aus-orange-600" />
            <span>Reels & Vidéos ({content.videos.length})</span>
          </button>
        </div>

        {/* Photo Categories Chips (only shown when photos tab is active) */}
        {activeMediaTab === "photos" && showTabs && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-aus-blue-700 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Photos View */}
      {activeMediaTab === "photos" && (
        <div key={selectedCategory} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPhotos.map((item, index) => (
            <Reveal key={item.id} delay={(index % 6) * 90} variant="zoom">
            <div
              onClick={() => setLightboxIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Agrandir la photo : ${item.title}`}
              className="group relative h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-1.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-aus-blue-500/40"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay hover icon */}
                <div className="absolute inset-0 bg-aus-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-aus-blue-800 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-aus-blue-900 backdrop-blur-md shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Text Card */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-aus-blue-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span className="font-semibold text-aus-blue-600 flex items-center gap-1">
                    Agrandir
                    <ZoomIn className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Videos / Reels View */}
      {activeMediaTab === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.map((video, i) => (
            <Reveal key={video.id} delay={i * 110} variant="up">
              <FacebookReelEmbed video={video} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Lightbox Component */}
      <Lightbox
        items={displayPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}

