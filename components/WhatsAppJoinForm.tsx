"use client";

import React, { useState } from "react";
import { content } from "@/data/content";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  Send,
  Heart,
  User,
  Phone,
  MapPin,
  Stethoscope,
  HandHelping,
  Handshake,
  ShieldCheck,
} from "lucide-react";

export default function WhatsAppJoinForm() {
  const roles = content.join.rolesAvailable;
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("Yeumbeul");
  const [role, setRole] = useState(roles[0]);
  const [availability, setAvailability] = useState("Week-ends et événements");
  const [message, setMessage] = useState("");

  // Generate clean formatted WhatsApp message
  const generatedMessage = `*ADHÉSION / SOUTIEN AUS - YEUMBEUL*
Bonjour l'équipe de l'AUS, je souhaite vous rejoindre et apporter ma contribution !

- *Nom & Prénom* : ${fullName || "Non renseigné"}
- *Téléphone* : ${phone || "Non renseigné"}
- *Quartier / Ville* : ${location || "Yeumbeul"}
- *Rôle souhaité* : ${role}
- *Disponibilité* : ${availability}
${message ? `- *Message personnel* : ${message}\n` : ""}
_Envoyé depuis le site vitrine officiel de l'AUS_`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(generatedMessage);
    const whatsappUrl = `https://wa.me/${content.contact.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleQuickPreset = (presetRole: string, defaultMsg: string) => {
    setRole(presetRole);
    if (!message) {
      setMessage(defaultMsg);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-aus-blue-50 text-aus-blue-700 flex items-center justify-center font-bold">
          <Heart className="w-6 h-6 text-aus-red-600 fill-current" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Formulaire d'engagement & de soutien
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Remplissez ce formulaire : il génère votre message et ouvre WhatsApp en 1 clic !
          </p>
        </div>
      </div>

      {/* Quick selection chips */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Suggestions rapides :
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            {
              label: "Professionnel de santé",
              icon: Stethoscope,
              role: roles[1],
              msg: "Je suis professionnel ou étudiant de santé et je souhaite participer à vos journées de consultations gratuites.",
              cls: "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
              activeCls: "ring-2 ring-emerald-500 bg-emerald-100",
            },
            {
              label: "Bénévole de terrain",
              icon: HandHelping,
              role: roles[0],
              msg: "Je souhaite donner de mon temps pour aider à l'organisation de la prochaine action sur le terrain.",
              cls: "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100",
              activeCls: "ring-2 ring-blue-500 bg-blue-100",
            },
            {
              label: "Donateur / Partenaire",
              icon: Handshake,
              role: roles[roles.length - 1],
              msg: "Je souhaite soutenir vos actions communautaires par un don ou une convention de partenariat.",
              cls: "bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100",
              activeCls: "ring-2 ring-orange-500 bg-orange-100",
            },
          ].map(({ label, icon: Icon, role: presetRole, msg, cls, activeCls }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleQuickPreset(presetRole, msg)}
              aria-pressed={role === presetRole}
              className={`group inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${cls} ${
                role === presetRole ? activeCls : ""
              }`}
            >
              <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-125" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs sm:text-sm font-bold text-slate-800 mb-1"
            >
              Votre Nom complet <span className="text-aus-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Moussa Diop"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aus-blue-600 focus:border-transparent text-sm text-slate-800"
              />
            </div>
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs sm:text-sm font-bold text-slate-800 mb-1"
            >
              Votre Numéro WhatsApp <span className="text-aus-red-600">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex : 77 123 45 67"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aus-blue-600 focus:border-transparent text-sm text-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Quartier / Localisation */}
          <div>
            <label
              htmlFor="location"
              className="block text-xs sm:text-sm font-bold text-slate-800 mb-1"
            >
              Votre Quartier / Commune
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex : Yeumbeul, Diamalaye..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aus-blue-600 focus:border-transparent text-sm text-slate-800"
              />
            </div>
          </div>

          {/* Type d'engagement */}
          <div>
            <label
              htmlFor="role"
              className="block text-xs sm:text-sm font-bold text-slate-800 mb-1"
            >
              Comment souhaitez-vous agir ?
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aus-blue-600 focus:border-transparent text-sm text-slate-800 bg-white"
            >
              {content.join.rolesAvailable.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Disponibilité */}
        <div>
          <label
            htmlFor="availability"
            className="block text-xs sm:text-sm font-bold text-slate-800 mb-1"
          >
            Vos disponibilités
          </label>
          <input
            id="availability"
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="Ex : Week-ends, soirs, journées complètes..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aus-blue-600 focus:border-transparent text-sm text-slate-800"
          />
        </div>

        {/* Message libre */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs sm:text-sm font-bold text-slate-800 mb-1"
          >
            Message ou motivations (optionnel)
          </label>
          <textarea
            id="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Présentez brièvement vos compétences, votre motivation ou vos propositions..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aus-blue-600 focus:border-transparent text-sm text-slate-800"
          ></textarea>
        </div>

        {/* Live WhatsApp message preview */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
              Aperçu du message transmis sur WhatsApp :
            </span>
            <span className="text-[11px] text-emerald-700">Vers le {content.contact.phoneDisplay}</span>
          </div>
          <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans bg-white/80 p-3 rounded-xl border border-emerald-100 max-h-36 overflow-y-auto">
            {generatedMessage}
          </pre>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="btn-shine w-full group relative flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.99] cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 text-emerald-200 group-hover:scale-110 group-hover:rotate-12 transition-transform fill-current" />
            <span>Envoyer directement sur WhatsApp</span>
            <Send className="w-4 h-4 ml-1 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Sans stockage de données ni cookies invasifs. Le bouton ouvre directement votre application WhatsApp avec le message prêt à l'envoi.</span>
          </p>
        </div>
      </form>
    </div>
  );
}

