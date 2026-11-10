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
  Users,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ActionCardProps {
  action: ActionItem;
  featured?: boolean;
}

export default function ActionCard({ action, featured = false }: ActionCardProps) {
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "Santé":
        return {
          badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
          border: "hover:border-emerald-500",
          pill: "bg-emerald-600",
        };
      case "Jeunesse":
        return {
          badge: "bg-orange-100 text-orange-800 border-orange-200",
          border: "hover:border-orange-500",
          pill: "bg-orange-600",
        };
      case "Citoyenneté":
        return {
          badge: "bg-blue-100 text-blue-800 border-blue-200",
          border: "hover:border-blue-500",
          pill: "bg-blue-600",
        };
      default:
        return {
          badge: "bg-slate-100 text-slate-800 border-slate-200",
          border: "hover:border-slate-500",
          pill: "bg-slate-600",
        };
    }
  };

  const theme = getCategoryTheme(action.category);

  return (
    <div
      className={`spotlight group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${theme.border} transform hover:-translate-y-1.5`}
    >
      {/* Action Image & Badges */}
      <div className="img-reveal relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <Image
          src={action.image}
          alt={action.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${theme.badge}`}
          >
            {action.category}
          </span>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm backdrop-blur-md ${action.status === "À venir"
                ? "bg-aus-red-600 animate-pulse"
                : action.status === "En cours"
                  ? "bg-aus-orange-600"
                  : "bg-aus-green-700"
              }`}
          >
            {action.status}
          </span>
        </div>

        {/* Date on image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 drop-shadow">
            <Calendar className="w-3.5 h-3.5 text-aus-orange-400" />
            <span>{action.formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-start gap-1.5 text-xs font-medium text-slate-500 mb-2.5">
            <MapPin className="w-4 h-4 text-aus-red-500 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{action.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-aus-blue-700 transition-colors">
            {action.title}
          </h3>

          {/* Summary / Description */}
          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {action.description}
          </p>

          {/* Medical Specialties (if any) */}
          {action.specialties && action.specialties.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                Services & Soins offerts :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {action.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-800"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1 flex-shrink-0" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Partners list */}
          {action.partners && action.partners.length > 0 && (
            <div className="mt-3.5">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                En collaboration avec :
              </span>
              <div className="flex flex-wrap gap-1">
                {action.partners.map((partner, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-aus-blue-800 border border-blue-100"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Call to Action */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/rejoindre"
            className="group/cta inline-flex items-center gap-1.5 text-xs font-bold text-aus-blue-700 hover:text-aus-blue-900 transition-colors"
          >
            <span>Soutenir</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2">
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
              className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 mr-1" />
              <span>Infos</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

