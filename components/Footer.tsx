import React from "react";
import Link from "next/link";
import Image from "next/image";
import { content } from "@/data/content";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Calendar,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-aus-blue-600">
      {/* Pre-footer Callout */}
      <div className="bg-gradient-to-r from-aus-blue-900 via-aus-blue-800 to-slate-900 py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-bold uppercase tracking-wider text-aus-orange-400 bg-aus-orange-950/60 rounded-full border border-aus-orange-800/40">
              Zones d'intervention : Yeumbeul & Guédiawaye
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Prêt à faire la différence à Yeumbeul et Guédiawaye ?
            </h3>
            <p className="mt-1 text-slate-300 text-sm sm:text-base max-w-2xl">
              Rejoignez notre réseau de bénévoles, soutenez nos journées médicales gratuites ou proposez un partenariat.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rejoindre"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white bg-aus-orange-600 hover:bg-aus-orange-700 shadow-lg hover:shadow-orange-600/30 transition-all"
            >
              <Heart className="w-4 h-4 fill-current text-white" />
              <span>Nous rejoindre</span>
            </Link>
            <a
              href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
                "Bonjour AUS, je souhaite échanger directement avec vous."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-700/60 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Identity & Slogans */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-slate-700">
                <Image
                  src="/logo.png"
                  alt="Logo AUS"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">AUS</h4>
                <p className="text-xs text-slate-400 uppercase tracking-wider">
                  Yeumbeul • Sénégal
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {content.meta.description}
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold text-aus-orange-400 uppercase tracking-wider">
                Devise & Slogan :
              </p>
              <p className="text-sm font-medium text-white italic mt-0.5">
                « {content.meta.slogans[0]} »
              </p>
              <p className="text-xs font-bold text-emerald-400 mt-1 uppercase tracking-wide">
                #{content.meta.slogans[1]}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-aus-blue-400" />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/qui-sommes-nous"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-aus-blue-400" />
                  <span>Qui sommes-nous (Mission & Valeurs)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/actions"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-aus-blue-400" />
                  <span>Nos Actions Communautaires</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/galerie"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-aus-blue-400" />
                  <span>Galerie Photos & Vidéos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/actualites"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-aus-blue-400" />
                  <span>Actualités & Rapports</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/rejoindre"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-aus-orange-400" />
                  <span>Adhérer & Bénévolat</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/rejoindre#dons"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-aus-red-400" />
                  <span>Faire un don (Wave & OM)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/rejoindre#faq"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                  <span>Foire Aux Questions (FAQ)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Contactez-nous</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Actions Phares */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 mb-4">
              Actions Majeures
            </h4>
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-aus-blue-900 text-blue-300 mb-1">
                  Santé Gratuite
                </span>
                <p className="font-semibold text-white">
                  Consultation Médicale Gratuite 2026
                </p>
                <p className="text-slate-400 mt-1">
                  École Aliou Kébé • Bokk Xalaat • Partenariat Odontologie UCAD & Poste Diamalaye.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-900 text-emerald-300 mb-1">
                  Prévention Enfants
                </span>
                <p className="font-semibold text-white">
                  Santé Solidaire : un sourire sain
                </p>
                <p className="text-slate-400 mt-1">
                  Soutenue par Fonds Yaakaar (Impact Hub Dakar).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-aus-orange-950 text-orange-300 mb-1">
                  Citoyenneté
                </span>
                <p className="font-semibold text-white">
                  Grand Panel Citoyen des Jeunes
                </p>
                <p className="text-slate-400 mt-1">
                  Initiative en collaboration avec Engage Sénégal.
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Réseaux */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 mb-4">
              Coordonnées
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${content.contact.phone}`}
                className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-aus-blue-900/60 text-aus-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-aus-blue-800">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Téléphone / WhatsApp</p>
                  <p className="font-semibold text-white">{content.contact.phoneDisplay}</p>
                </div>
              </a>

              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-aus-red-950/60 text-aus-red-400 flex items-center justify-center flex-shrink-0 group-hover:bg-aus-red-900">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="break-all">
                  <p className="text-xs text-slate-400">Courriel</p>
                  <p className="font-semibold text-white">{content.contact.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Localisation</p>
                  <p className="font-semibold text-white">{content.contact.address}</p>
                  <p className="text-xs text-slate-400">{content.contact.commune}, {content.contact.departement}, {content.contact.pays}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <p className="text-xs text-slate-400 mb-2">Suivez nos activités en direct :</p>
                <a
                  href={content.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                  <span>Rejoindre la page Facebook AUS</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} AUS – {content.meta.fullName}. Association à but non lucratif régie par la loi sénégalaise.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-slate-400">Siège : Yeumbeul</span>
            <span>•</span>
            <span className="text-slate-400">Zones : Yeumbeul & Guédiawaye</span>
            <span>•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
              title="Accès réservé au Bureau Exécutif"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Accès Bureau</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

