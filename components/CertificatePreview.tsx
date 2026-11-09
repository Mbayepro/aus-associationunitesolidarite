"use client";

import React, { useState } from "react";
import { CertificateItem, CERTIFICATE_TYPES } from "@/lib/adminStore";
import { Download, Printer, Check, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

interface CertificatePreviewProps {
  certificate: CertificateItem;
  onSaveToRegistry?: () => void;
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

export default function CertificatePreview({
  certificate,
  onSaveToRegistry,
}: CertificatePreviewProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const meta = CERTIFICATE_TYPES[certificate.type] || CERTIFICATE_TYPES.benevolat;
  const fullRecipient = `${certificate.recipientTitle ? certificate.recipientTitle + " " : ""}${
    certificate.recipientName || "Nom du Bénéficiaire"
  }`.trim();

  const handlePrint = () => {
    if (onSaveToRegistry) onSaveToRegistry();
    window.print();
  };

  const handleDownloadPng = async () => {
    setDownloading(true);
    if (onSaveToRegistry) onSaveToRegistry();

    try {
      const canvas = document.createElement("canvas");
      const w = 1600;
      const h = 1130;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Fond Ivoire / Blanc Prestige
      const gradBg = ctx.createLinearGradient(0, 0, w, h);
      gradBg.addColorStop(0, "#FFFFFF");
      gradBg.addColorStop(0.5, "#F8FAFC");
      gradBg.addColorStop(1, "#F1F5F9");
      ctx.fillStyle = gradBg;
      ctx.fillRect(0, 0, w, h);

      // Halos décoratifs subtils
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = "#124B9C";
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 380, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Bordure extérieure quadricolore AUS
      const borderThickness = 18;
      // Haut : Bleu & Rouge
      ctx.fillStyle = "#124B9C";
      ctx.fillRect(0, 0, w / 2, borderThickness);
      ctx.fillStyle = "#DC2626";
      ctx.fillRect(w / 2, 0, w / 2, borderThickness);
      // Bas : Orange & Vert
      ctx.fillStyle = "#EA580C";
      ctx.fillRect(0, h - borderThickness, w / 2, borderThickness);
      ctx.fillStyle = "#16A34A";
      ctx.fillRect(w / 2, h - borderThickness, w / 2, borderThickness);
      // Gauche & Droite
      ctx.fillStyle = "#124B9C";
      ctx.fillRect(0, 0, borderThickness, h);
      ctx.fillStyle = "#16A34A";
      ctx.fillRect(w - borderThickness, 0, borderThickness, h);

      // Cadre intérieur double (Bleu marine et Or)
      ctx.strokeStyle = "#124B9C";
      ctx.lineWidth = 4;
      ctx.strokeRect(42, 42, w - 84, h - 84);

      ctx.strokeStyle = "#D97706";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(52, 52, w - 104, h - 104);

      // Coins ornementaux
      const cornerSize = 32;
      const corners = [
        [42, 42],
        [w - 42 - cornerSize, 42],
        [42, h - 42 - cornerSize],
        [w - 42 - cornerSize, h - 42 - cornerSize],
      ];
      ctx.fillStyle = meta.badgeColor;
      corners.forEach(([cx, cy]) => {
        ctx.fillRect(cx, cy, cornerSize, cornerSize);
      });

      // 3. Chargement du logo AUS
      const logoImg = new window.Image();
      logoImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve) => {
        logoImg.onload = () => resolve();
        logoImg.onerror = () => resolve();
        logoImg.src = "/logo.png";
      });

      if (logoImg.complete && logoImg.naturalWidth > 0) {
        // Filigrane central très léger
        ctx.save();
        ctx.globalAlpha = 0.04;
        ctx.drawImage(logoImg, w / 2 - 220, h / 2 - 200, 440, 440);
        ctx.restore();

        // Logo en haut à gauche
        ctx.save();
        ctx.beginPath();
        ctx.arc(165, 155, 68, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#124B9C";
        ctx.stroke();
        ctx.drawImage(logoImg, 103, 93, 124, 124);
        ctx.restore();
      }

      // 4. En-tête officiel
      ctx.textAlign = "center";
      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 20px Arial, sans-serif";
      ctx.fillText(
        "RÉPUBLIQUE DU SÉNÉGAL • UN PEUPLE – UN BUT – UNE FOI",
        w / 2,
        105
      );

      ctx.fillStyle = "#124B9C";
      ctx.font = "bold 30px Arial, sans-serif";
      ctx.fillText(
        "ASSOCIATION POUR L'UNITÉ ET LA SOLIDARITÉ (AUS)",
        w / 2,
        148
      );

      ctx.fillStyle = "#475569";
      ctx.font = "bold 16px Arial, sans-serif";
      ctx.fillText(
        "ZONES D'INTERVENTION : YEUMBEUL & GUÉDIAWAYE  •  « UNIS POUR UN IMPACT DURABLE »",
        w / 2,
        180
      );

      // Référence en haut à droite
      ctx.textAlign = "right";
      ctx.fillStyle = "#64748B";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`Réf : ${certificate.reference}`, w - 85, 105);

      // Ruban de titre du certificat
      ctx.textAlign = "center";
      ctx.fillStyle = meta.badgeColor;
      const ribbonW = 920;
      const ribbonH = 64;
      const ribbonX = (w - ribbonW) / 2;
      const ribbonY = 215;
      ctx.fillRect(ribbonX, ribbonY, ribbonW, ribbonH);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px Arial, sans-serif";
      ctx.fillText(meta.heading, w / 2, ribbonY + 43);

      // Sous-titre
      ctx.fillStyle = "#475569";
      ctx.font = "italic 19px Georgia, serif";
      ctx.fillText(meta.subtitle, w / 2, 315);

      // Phrase d'introduction
      ctx.fillStyle = "#1E293B";
      ctx.font = "20px Arial, sans-serif";
      ctx.fillText(
        "Le Bureau Exécutif de l'Association pour l'Unité et la Solidarité (AUS) décerne la présente attestation à :",
        w / 2,
        365
      );

      // 5. Nom du bénéficiaire
      ctx.fillStyle = "#124B9C";
      ctx.font = "bold 54px Georgia, serif";
      ctx.fillText(fullRecipient, w / 2, 440);

      // Ligne dorée sous le nom
      ctx.fillStyle = "#EA580C";
      ctx.fillRect(w / 2 - 180, 460, 360, 4);

      // Rôle / Qualité
      if (certificate.recipientRole) {
        ctx.fillStyle = "#0F172A";
        ctx.font = "bold 24px Arial, sans-serif";
        ctx.fillText(`En qualité de : ${certificate.recipientRole}`, w / 2, 505);
      }

      // 6. Encadré Activité & Zone d'intervention
      const boxX = 200;
      const boxY = 535;
      const boxW = w - 400;
      const boxH = 95;
      ctx.fillStyle = "#EFF6FF";
      ctx.fillRect(boxX, boxY, boxW, boxH);
      ctx.strokeStyle = "#BFDBFE";
      ctx.lineWidth = 2;
      ctx.strokeRect(boxX, boxY, boxW, boxH);

      ctx.fillStyle = "#1E3A8A";
      ctx.font = "bold 22px Arial, sans-serif";
      ctx.fillText(
        `Activité : ${certificate.activityTitle || "Actions communautaires AUS"}`,
        w / 2,
        boxY + 38
      );

      ctx.fillStyle = "#047857";
      ctx.font = "bold 18px Arial, sans-serif";
      ctx.fillText(
        `Date : ${certificate.activityDate || certificate.issueDate}   •   Zone d'intervention : ${certificate.zone}`,
        w / 2,
        boxY + 72
      );

      // 7. Texte de reconnaissance
      ctx.fillStyle = "#334155";
      ctx.font = "21px Georgia, serif";
      wrapCanvasText(
        ctx,
        certificate.customMessage || meta.defaultMessage,
        w / 2,
        675,
        w - 320,
        34
      );

      // 8. Date et lieu de délivrance
      ctx.fillStyle = "#0F172A";
      ctx.font = "italic 19px Georgia, serif";
      ctx.fillText(
        `Fait à ${certificate.issuedAtCity || "Yeumbeul"}, le ${certificate.issueDate}`,
        w / 2,
        815
      );

      // 9. Signatures & Cachet officiel
      const sigY = 865;

      // Signataire 1 (Gauche)
      ctx.textAlign = "center";
      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 19px Arial, sans-serif";
      ctx.fillText(certificate.signer1Title, 360, sigY);
      ctx.fillStyle = "#475569";
      ctx.font = "17px Arial, sans-serif";
      ctx.fillText(certificate.signer1Name, 360, sigY + 28);

      // Courbe de signature 1
      ctx.save();
      ctx.strokeStyle = "#124B9C";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(280, sigY + 75);
      ctx.bezierCurveTo(320, sigY + 40, 380, sigY + 95, 440, sigY + 55);
      ctx.stroke();
      ctx.restore();

      // Cachet rond officiel au centre
      ctx.save();
      const stampX = w / 2;
      const stampY = sigY + 55;
      ctx.strokeStyle = "#124B9C";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(stampX, stampY, 68, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(stampX, stampY, 60, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#124B9C";
      ctx.font = "bold 13px Arial, sans-serif";
      ctx.fillText("CACHET OFFICIEL", stampX, stampY - 22);
      ctx.font = "bold 22px Arial, sans-serif";
      ctx.fillText("A U S", stampX, stampY + 4);
      ctx.fillStyle = "#DC2626";
      ctx.font = "bold 11px Arial, sans-serif";
      ctx.fillText("YEUMBEUL • GUÉDIAWAYE", stampX, stampY + 22);
      ctx.fillStyle = "#16A34A";
      ctx.font = "bold 10px Arial, sans-serif";
      ctx.fillText("SÉNÉGAL", stampX, stampY + 38);
      ctx.restore();

      // Signataire 2 (Droite)
      ctx.textAlign = "center";
      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 19px Arial, sans-serif";
      ctx.fillText(certificate.signer2Title, w - 360, sigY);
      ctx.fillStyle = "#475569";
      ctx.font = "17px Arial, sans-serif";
      ctx.fillText(certificate.signer2Name, w - 360, sigY + 28);

      // Courbe de signature 2
      ctx.save();
      ctx.strokeStyle = "#124B9C";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(w - 430, sigY + 70);
      ctx.bezierCurveTo(w - 380, sigY + 35, w - 340, sigY + 90, w - 290, sigY + 50);
      ctx.stroke();
      ctx.restore();

      // 10. Pied de page de vérification
      ctx.textAlign = "center";
      ctx.fillStyle = "#64748B";
      ctx.font = "bold 14px Arial, sans-serif";
      ctx.fillText(
        "AUS – Association pour l'Unité et la Solidarité  |  Tél : 76 293 77 54 / 77 157 67 55  |  Email : ausyeumbeulnord@gmail.com",
        w / 2,
        h - 68
      );

      // Export PNG
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = (certificate.recipientName || "beneficiaire")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      link.download = `attestation-aus-${safeName}-${certificate.reference}.png`;
      link.href = dataUrl;
      link.click();

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } finally {
      setDownloading(false);
    }
  };

  const whatsappShareText = `*ASSOCIATION POUR L'UNITÉ ET LA SOLIDARITÉ (AUS)*
_Zones d'intervention : Yeumbeul & Guédiawaye_

Félicitations *${fullRecipient}* !
Le Bureau Exécutif de l'AUS a l'honneur de vous délivrer votre *${meta.label}* (Réf: *${certificate.reference}*) en qualité de *${certificate.recipientRole}* dans le cadre de : *${certificate.activityTitle}* (${certificate.zone}).

Merci pour votre engagement exceptionnel !
*#AUSenAction #Yeumbeul #Guédiawaye*`;

  const cleanPhone = (certificate.recipientPhone || "").replace(/[^0-9]/g, "");
  const formattedWaPhone =
    cleanPhone.length === 9 ? `221${cleanPhone}` : cleanPhone;
  const whatsappUrl = formattedWaPhone
    ? `https://wa.me/${formattedWaPhone}?text=${encodeURIComponent(whatsappShareText)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareText)}`;

  return (
    <div className="space-y-5">
      {/* Barre d'actions d'export */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Aperçu officiel en direct (Réf :{" "}
            <span className="font-mono text-aus-blue-700">{certificate.reference}</span>)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-md transition-all"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Image HD Téléchargée !</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{downloading ? "Génération..." : "Télécharger en Image HD (.PNG)"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
          >
            <Printer className="w-4 h-4 text-aus-orange-600" />
            <span>Imprimer / PDF A4</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (onSaveToRegistry) onSaveToRegistry();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Envoyer sur WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Conteneur Visuel du Diplôme / Attestation */}
      <div
        id="aus-certificate-print-area"
        className="relative bg-gradient-to-br from-white via-slate-50/40 to-blue-50/20 rounded-2xl shadow-2xl overflow-hidden border-[8px] border-aus-blue-800 p-4 sm:p-8 print:shadow-none print:rounded-none print:border-[10px]"
      >
        {/* Rubans de couleurs AUS aux 4 coins */}
        <div className="absolute top-0 left-0 w-1/2 h-2 bg-aus-blue-700" />
        <div className="absolute top-0 right-0 w-1/2 h-2 bg-aus-red-600" />
        <div className="absolute bottom-0 left-0 w-1/2 h-2 bg-aus-orange-500" />
        <div className="absolute bottom-0 right-0 w-1/2 h-2 bg-emerald-600" />

        {/* Cadre intérieur doré / bleu */}
        <div className="relative border-2 border-amber-500/70 rounded-xl p-5 sm:p-10 text-center space-y-5">
          {/* Filigrane central */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]"
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" className="w-80 h-80 object-contain" />
          </div>

          {/* En-tête : Logo + République du Sénégal + AUS */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Logo AUS"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain border-2 border-aus-blue-700 p-1 bg-white shadow-sm"
              />
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
                  République du Sénégal
                </p>
                <h3 className="text-sm sm:text-lg font-black text-aus-blue-900 leading-tight">
                  ASSOCIATION POUR L&apos;UNITÉ ET LA SOLIDARITÉ
                </h3>
                <p className="text-[11px] font-bold text-aus-orange-600">
                  Zones d&apos;intervention : Yeumbeul &amp; Guédiawaye
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <span className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-700">
                Réf : {certificate.reference}
              </span>
              <p className="text-[11px] text-slate-500 mt-1 italic">
                « Unis pour un impact durable »
              </p>
            </div>
          </div>

          {/* Titre Principal de l'Attestation */}
          <div className="pt-2">
            <div
              className="inline-block px-6 py-2.5 rounded-xl text-white font-black text-lg sm:text-2xl tracking-wide shadow-md uppercase"
              style={{ backgroundColor: meta.badgeColor }}
            >
              {meta.heading}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 italic mt-2 font-serif">
              {meta.subtitle}
            </p>
          </div>

          {/* Corps de l'attestation */}
          <div className="space-y-3 py-2">
            <p className="text-xs sm:text-sm text-slate-700">
              Le Bureau Exécutif de l&apos;<strong>Association pour l&apos;Unité et la Solidarité (AUS)</strong> décerne la présente attestation à :
            </p>

            <div className="py-1">
              <h2 className="text-2xl sm:text-4xl font-black text-aus-blue-900 font-serif tracking-tight">
                {fullRecipient}
              </h2>
              <div className="w-40 h-1 bg-gradient-to-r from-aus-blue-600 via-aus-orange-500 to-emerald-600 mx-auto mt-2 rounded-full" />
            </div>

            {certificate.recipientRole && (
              <p className="text-sm sm:text-base font-bold text-slate-800">
                En qualité de :{" "}
                <span className="text-aus-blue-700">{certificate.recipientRole}</span>
              </p>
            )}

            {/* Encadré Activité & Zone */}
            <div className="max-w-2xl mx-auto p-3.5 sm:p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 space-y-1">
              <div className="text-xs sm:text-sm font-extrabold text-aus-blue-950">
                Activité : {certificate.activityTitle || "Actions communautaires AUS"}
              </div>
              <div className="text-xs font-bold text-emerald-700 flex flex-wrap items-center justify-center gap-2">
                <span>Date : {certificate.activityDate || certificate.issueDate}</span>
                <span>•</span>
                <span>Zone d&apos;intervention : {certificate.zone}</span>
              </div>
            </div>

            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed font-serif pt-2">
              {certificate.customMessage || meta.defaultMessage}
            </p>
          </div>

          {/* Date et Lieu */}
          <div className="text-xs sm:text-sm text-slate-700 italic font-serif">
            Fait à <strong>{certificate.issuedAtCity || "Yeumbeul"}</strong>, le{" "}
            <strong>{certificate.issueDate}</strong>
          </div>

          {/* Pied : Signatures et Cachet Officiel */}
          <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Signataire 1 */}
            <div className="text-center space-y-1">
              <p className="text-xs font-extrabold text-slate-900 uppercase">
                {certificate.signer1Title}
              </p>
              <p className="text-xs text-slate-600 font-medium">{certificate.signer1Name}</p>
              <div className="h-10 flex items-center justify-center">
                <svg className="w-28 h-8 text-aus-blue-700/80" viewBox="0 0 140 40" fill="none">
                  <path
                    d="M10 30 C 35 5, 65 35, 95 12 C 110 5, 120 25, 132 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Cachet Officiel Rond */}
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full border-2 border-aus-blue-800 p-1 flex items-center justify-center bg-white/90 shadow-inner">
                <div className="w-full h-full rounded-full border border-dashed border-aus-blue-600 flex flex-col items-center justify-center text-center p-1">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-aus-blue-800">
                    Cachet Officiel
                  </span>
                  <span className="text-sm font-black text-aus-blue-900 tracking-widest">
                    A U S
                  </span>
                  <span className="text-[8px] font-extrabold text-aus-red-600 uppercase">
                    Yeumbeul • Guédiawaye
                  </span>
                  <span className="text-[8px] font-bold text-emerald-700">SÉNÉGAL</span>
                </div>
              </div>
            </div>

            {/* Signataire 2 */}
            <div className="text-center space-y-1">
              <p className="text-xs font-extrabold text-slate-900 uppercase">
                {certificate.signer2Title}
              </p>
              <p className="text-xs text-slate-600 font-medium">{certificate.signer2Name}</p>
              <div className="h-10 flex items-center justify-center">
                <svg className="w-28 h-8 text-aus-blue-700/80" viewBox="0 0 140 40" fill="none">
                  <path
                    d="M15 26 C 45 8, 70 32, 105 14 C 115 10, 122 22, 130 18"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Barre de contact bas de diplôme */}
          <div className="pt-3 border-t border-slate-100 text-[10px] sm:text-xs text-slate-500 font-medium flex flex-wrap items-center justify-center gap-3">
            <span>AUS – Association pour l&apos;Unité et la Solidarité</span>
            <span>•</span>
            <span>Tél : 76 293 77 54 / 77 157 67 55</span>
            <span>•</span>
            <span>Email : ausyeumbeulnord@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
