"use client";

import { ActionItem, content } from "@/data/content";

export interface CertificateItem {
  id: string;
  reference: string;
  type:
    | "benevolat"
    | "medical"
    | "reconnaissance"
    | "participation"
    | "membre";
  recipientTitle: string; // Ex: Dr., M., Mme, Mlle
  recipientName: string;
  recipientRole: string; // Ex: Chirurgien-Dentiste Bénévole
  activityTitle: string; // Ex: Journée de consultation médicale gratuite
  activityDate: string; // Ex: Samedi 10 Octobre 2026
  zone: string; // Ex: Yeumbeul & Guédiawaye
  customMessage: string;
  issueDate: string; // Ex: 09 Novembre 2026
  issuedAtCity: string; // Ex: Yeumbeul
  signer1Title: string;
  signer1Name: string;
  signer2Title: string;
  signer2Name: string;
  recipientPhone?: string;
  createdAt: string;
}

export const CERTIFICATE_TYPES: Record<
  CertificateItem["type"],
  {
    label: string;
    heading: string;
    subtitle: string;
    defaultMessage: string;
    badgeColor: string;
  }
> = {
  benevolat: {
    label: "Attestation de Bénévolat",
    heading: "ATTESTATION D'ENGAGEMENT BÉNÉVOLE",
    subtitle: "Décernée en reconnaissance d'un dévouement exemplaire au service de la communauté",
    defaultMessage:
      "Pour son engagement remarquable, son sens élevé du devoir citoyen et sa participation active sur le terrain dans nos zones d'intervention de Yeumbeul et Guédiawaye, contribuant directement à la réussite de nos missions sociales et humanitaires.",
    badgeColor: "#124B9C",
  },
  medical: {
    label: "Attestation Corps Médical",
    heading: "ATTESTATION D'INTERVENTION MÉDICALE SOLIDAIRE",
    subtitle: "Hommage au dévouement médical et humanitaire auprès des populations vulnérables",
    defaultMessage:
      "En témoignage de notre profonde gratitude pour son expertise médicale, sa générosité et les soins gratuits prodigués avec bienveillance aux familles, enfants et personnes âgées lors de notre campagne sanitaire communautaire.",
    badgeColor: "#16A34A",
  },
  reconnaissance: {
    label: "Diplôme de Reconnaissance",
    heading: "DIPLÔME D'HONNEUR & DE RECONNAISSANCE",
    subtitle: "En témoignage de gratitude officielle pour un soutien précieux et durable",
    defaultMessage:
      "L'Association pour l'Unité et la Solidarité (AUS) exprime sa reconnaissance officielle pour l'appui constant, la solidarité agissante et la contribution déterminante au rayonnement de nos œuvres sociales à Yeumbeul et Guédiawaye.",
    badgeColor: "#EA580C",
  },
  participation: {
    label: "Certificat de Participation",
    heading: "CERTIFICAT DE PARTICIPATION CITOYENNE",
    subtitle: "Attestant de la participation active aux travaux, panels et initiatives de l'AUS",
    defaultMessage:
      "Pour sa présence active, la qualité de ses contributions et son esprit constructif lors de cette activité majeure dédiée à l'éveil citoyen, à l'éducation et au développement durable de nos quartiers.",
    badgeColor: "#DC2626",
  },
  membre: {
    label: "Attestation de Membre Actif",
    heading: "ATTESTATION DE MEMBRE ACTIF",
    subtitle: "Certifiant l'adhésion et la participation régulière à la vie associative de l'AUS",
    defaultMessage:
      "Est reconnu(e) comme membre actif de l'Association pour l'Unité et la Solidarité (AUS), portant haut les valeurs d'Unité, de Solidarité, de Santé et de Citoyenneté au cœur de Yeumbeul et Guédiawaye.",
    badgeColor: "#124B9C",
  },
};

const CUSTOM_ACTIONS_KEY = "aus_admin_custom_actions_v1";
const CERTIFICATES_KEY = "aus_admin_certificates_v1";

export function getCustomActions(): ActionItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CUSTOM_ACTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAllActions(): ActionItem[] {
  const custom = getCustomActions();
  const existingIds = new Set(custom.map((a) => a.id));
  const defaults = content.actions.filter((a) => !existingIds.has(a.id));
  return [...custom, ...defaults];
}

export function saveCustomAction(action: ActionItem): ActionItem[] {
  const current = getCustomActions();
  const idx = current.findIndex((item) => item.id === action.id);
  let updated: ActionItem[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = action;
  } else {
    updated = [action, ...current];
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CUSTOM_ACTIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("aus-actions-updated"));
  }
  return updated;
}

export function deleteCustomAction(id: string): ActionItem[] {
  const current = getCustomActions();
  const updated = current.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CUSTOM_ACTIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("aus-actions-updated"));
  }
  return updated;
}

export function getSavedCertificates(): CertificateItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CERTIFICATES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCertificate(cert: CertificateItem): CertificateItem[] {
  const current = getSavedCertificates();
  const idx = current.findIndex((c) => c.id === cert.id);
  let updated: CertificateItem[];
  if (idx >= 0) {
    updated = [...current];
    updated[idx] = cert;
  } else {
    updated = [cert, ...current];
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function deleteCertificate(id: string): CertificateItem[] {
  const current = getSavedCertificates();
  const updated = current.filter((c) => c.id !== id);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function generateCertificateReference(count?: number): string {
  const year = new Date().getFullYear();
  const num = (count ?? getSavedCertificates().length) + 1;
  const padded = String(num).padStart(3, "0");
  const randomSuffix = Math.floor(10 + Math.random() * 89);
  return `AUS-${year}-YG-${padded}${randomSuffix}`;
}
