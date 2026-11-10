import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionItem, content } from "@/data/content";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WhatsAppShareButton } from "@/components/WhatsAppShareButton";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Building2,
} from "lucide-react";

interface ActionCardProps {
  action: ActionItem;
  featured?: boolean;
}

export default function ActionCard({ action }: ActionCardProps) {
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "Santé":
        return {
          bar: "from-emerald-500 via-teal-500 to-emerald-600",
          badge: "bg-emerald-950/80 text-emerald-200 border-emerald-400/40",
          border: "hover:border-emerald-400/80",
          chip: "bg-emerald-50 text-emerald-800 border-emerald-200/70",
          iconColor: "text-emerald-600",
        };
      case "Jeunesse":
        return {
          bar: "from-aus-orange-500 via-amber-500 to-aus-orange-600",
          badge: "bg-orange-950/80 text-orange-200 border-orange-400/40",
          border: "hover:border-aus-orange-500/80",
          chip: "bg-orange-50 text-orange-800 border-orange-200/70",
          iconColor: "text-aus-orange-600",
        };
      case "Citoyenneté":
        return {
          bar: "from-aus-blue-600 via-sky-500 to-aus-blue-700",
          badge: "bg-blue-950/80 text-blue-200 border-blue-400/40",
          border: "hover:border-aus-blue-500/80",
          chip: "bg-blue-50 text-aus-blue-800 border-blue-200/70",
          iconColor: "text-aus-blue-600",
        };
      case "Solidarité":
        return {
          bar: "from-aus-red-600 via-rose-500 to-aus-red-700",
          badge: "bg-red-950/80 text-red-200 border-red-400/40",
          border: "hover:border-aus-red-500/80",
          chip: "bg-red-50 text-red-800 border-red-200/70",
          iconColor: "text-aus-red-600",
        };
      default:
        return {
          bar: "from-aus-blue-600 to-aus-green-600",
          badge: "bg-slate-900/80 text-slate-100 border-slate-400/40",
          border: "hover:border-slate-400",
          chip: "bg-slate-100 text-slate-800 border-slate-200",
          iconColor: "text-aus-blue-600",
        };
    }
  };

  const theme = getCategoryTheme(action.category);

  return (
    <article
      className={`spotlight group h-full bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col ${theme.border} hover:-translate-y-1.5`}
    >
      {/* Liseré supérieur coloré selon la catégorie */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.bar}`} />

      {/* Visuel de l'action & badges superposés */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <Image
          src={action.image}
          alt={action.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Voile dégradé pour garantir la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/10" />

        {/* Badges supérieurs */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <span
            className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${theme.badge}`}
          >
            {action.category}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full text-white shadow-sm backdrop-blur-md ${
              action.status === "À venir"
                ? "bg-aus-red-600/95 animate-pulse"
                : action.status === "En cours"
                ? "bg-aus-orange-600/95"
                : "bg-emerald-600/95"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {action.status}
          </span>
        </div>

        {/* Date et lieu sur le bas de l'image */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col gap-1 text-white">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 drop-shadow">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{action.formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-aus-red-400 shrink-0" />
            <span className="line-clamp-1">{action.location}</span>
          </div>
        </div>
      </div>

      {/* Corps de la carte */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Titre de l'action */}
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug group-hover:text-aus-blue-700 transition-colors">
            {action.title}
          </h3>

          {/* Description synthétique */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {action.description}
          </p>

          {/* Spécialités / Points clés */}
          {action.specialties && action.specialties.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-slate-100">
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Axes &amp; Services déployés
              </span>
              <div className="flex flex-wrap gap-1.5">
                {action.specialties.slice(0, 5).map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/70"
                  >
                    <CheckCircle2 className={`w-3 h-3 ${theme.iconColor} mr-1.5 shrink-0`} />
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Partenaires */}
          {action.partners && action.partners.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                <Building2 className="w-3 h-3" />
                Partenaires associés
              </span>
              <div className="flex flex-wrap gap-1.5">
                {action.partners.map((partner, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${theme.chip}`}
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pied de carte : Actions rapides */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            href="/rejoindre"
            className="group/cta inline-flex items-center gap-1.5 text-xs font-extrabold text-aus-blue-700 hover:text-aus-blue-900 transition-colors"
          >
            <span>Soutenir cette action</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>

          <div className="flex items-center gap-1.5">
            <WhatsAppShareButton
              title={action.title}
              summary={action.summary}
              variant="icon"
            />

            <a
              href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(
                `Bonjour AUS, je souhaite des informations concernant l'action : ${action.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              <span>Infos</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
