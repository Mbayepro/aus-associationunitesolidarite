"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { content } from "@/data/content";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Heart,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Qui sommes-nous", href: "/qui-sommes-nous" },
    { name: "Actions", href: "/actions" },
    { name: "Galerie & Vidéos", href: "/galerie" },
    { name: "Actualités", href: "/actualites" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Banner Contact Bar - hidden on small mobile, visible from sm */}
      <div className="bg-aus-blue-900 text-white text-xs sm:text-sm py-2 px-4 sm:px-6 border-b border-aus-blue-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a
              href={`tel:${content.contact.phone}`}
              className="flex items-center gap-1.5 hover:text-aus-orange-500 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-aus-orange-500" />
              <span>{content.contact.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-aus-orange-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-aus-red-500" />
              <span>{content.contact.email}</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-aus-green-500" />
              <span>Yeumbeul Nord / Keur Massar, Sénégal</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-aus-orange-600/30 text-aus-orange-200 border border-aus-orange-500/40">
              AUS en action
            </span>
            <a
              href={content.contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs hover:text-blue-300 transition-colors"
              title="Page Facebook AUS"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-white transition-all duration-300 ${
          scrolled ? "shadow-md py-2.5" : "shadow-sm py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Association Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 rounded-full border-2 border-aus-blue-500/20 p-0.5 bg-white shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                <Image
                  src="/logo.png"
                  alt="Logo AUS Yeumbeul Nord"
                  fill
                  sizes="52px"
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-aus-blue-900 group-hover:text-aus-blue-700 transition-colors">
                    AUS
                  </span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-aus-red-600"></span>
                  <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Yeumbeul Nord
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-600 line-clamp-1 italic font-medium">
                  {content.meta.slogans[0]}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`link-underline px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-aus-blue-700 font-bold"
                        : "text-slate-700 hover:text-aus-blue-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
                  content.contact.whatsappMessageIntro
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                title="Écrire sur WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/rejoindre"
                className="btn-shine relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-aus-blue-700 hover:bg-aus-blue-800 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group overflow-hidden"
              >
                <span className="absolute top-0 left-0 w-1 h-full bg-aus-orange-500"></span>
                <Heart className="w-4 h-4 text-aus-red-400 group-hover:scale-125 transition-transform fill-current" />
                <span>Nous rejoindre</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link
                href="/rejoindre"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-aus-blue-700 rounded-md"
              >
                <Heart className="w-3.5 h-3.5 text-aus-red-400 fill-current" />
                <span>Rejoindre</span>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="p-2 rounded-lg text-slate-700 hover:text-aus-blue-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-aus-blue-600"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label="Ouvrir le menu de navigation"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-slide-down">
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3.5 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-aus-blue-50 text-aus-blue-800 font-bold"
                        : "text-slate-800 hover:bg-slate-50 hover:text-aus-blue-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <Link
                  href="/rejoindre"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow"
                >
                  <Heart className="w-4 h-4 text-aus-red-400 fill-current" />
                  <span>Adhérer ou Soutenir l'AUS</span>
                </Link>

                <a
                  href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
                    content.contact.whatsappMessageIntro
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                  <span>Discuter sur WhatsApp ({content.contact.phoneDisplay})</span>
                </a>

                <a
                  href={`tel:${content.contact.phone}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  <Phone className="w-4 h-4 text-aus-blue-600" />
                  <span>Appeler directement le {content.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

