"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ActionItem, content } from "@/data/content";
import {
  CertificateItem,
  CERTIFICATE_TYPES,
  deleteCertificate,
  deleteCustomAction,
  generateCertificateReference,
  getAdminPin,
  getAllActions,
  getCustomActions,
  getSavedCertificates,
  saveCertificate,
  saveCustomAction,
  setAdminPin,
} from "@/lib/adminStore";
import CertificatePreview from "@/components/CertificatePreview";
import {
  Award,
  Calendar,
  Check,
  ClipboardCopy,
  Download,
  Edit3,
  Eye,
  FileCheck2,
  FolderPlus,
  History,
  ImagePlus,
  KeyRound,
  Lock,
  LogOut,
  MapPin,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Users,
} from "lucide-react";

const PRESET_IMAGES = [
  { label: "Consultation médicale", path: "/images/real-medical-1.jpg" },
  { label: "Équipe médicale", path: "/images/real-medical-2.jpg" },
  { label: "Sensibilisation enfants", path: "/images/real-sourire-1.jpg" },
  { label: "Panel citoyen", path: "/images/real-panel-1.jpg" },
  { label: "Mobilisation communauté", path: "/images/real-communaute-1.jpg" },
  { label: "Bureau exécutif", path: "/images/real-bureau-1.jpg" },
  { label: "Action terrain", path: "/images/real-action-3.jpg" },
];

const QUICK_ROLES = [
  "Bénévole de terrain – Mobilisation & Logistique",
  "Chirurgien-Dentiste Bénévole (UCAD)",
  "Médecin Généraliste Bénévole",
  "Sage-Femme / Gynécologie Bénévole",
  "Pédiatre / Gériatre Bénévole",
  "Pharmacien / Commission Médicaments",
  "Membre Actif du Bureau Exécutif",
  "Partenaire & Donateur Solidaire",
  "Participant au Panel Citoyen",
];

export default function AdminPage() {
  // Authentification PIN (modifiable par l'administrateur)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Changement de code PIN
  const [currentPinField, setCurrentPinField] = useState("");
  const [newPinField, setNewPinField] = useState("");
  const [confirmPinField, setConfirmPinField] = useState("");
  const [pinChangeMsg, setPinChangeMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Navigation par onglets
  const [activeTab, setActiveTab] = useState<
    "activities" | "certificates" | "registry" | "security"
  >("activities");

  // Données chargées
  const [customActions, setCustomActions] = useState<ActionItem[]>([]);
  const [allActions, setAllActions] = useState<ActionItem[]>(content.actions);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);

  // État Formulaire Activité
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const [actTitle, setActTitle] = useState("");
  const [actDate, setActDate] = useState("2026-11-15");
  const [actFormattedDate, setActFormattedDate] = useState("Dimanche 15 Novembre 2026");
  const [actZone, setActZone] = useState<"Yeumbeul" | "Guédiawaye" | "Yeumbeul & Guédiawaye">(
    "Yeumbeul"
  );
  const [actLocationDetail, setActLocationDetail] = useState("");
  const [actCategory, setActCategory] = useState<ActionItem["category"]>("Santé");
  const [actStatus, setActStatus] = useState<ActionItem["status"]>("Réalisée");
  const [actImage, setActImage] = useState(PRESET_IMAGES[0].path);
  const [actSummary, setActSummary] = useState("");
  const [actDescription, setActDescription] = useState("");
  const [actSpecialties, setActSpecialties] = useState("");
  const [actPartners, setActPartners] = useState("");
  const [actHighlight, setActHighlight] = useState(false);
  const [actionSavedToast, setActionSavedToast] = useState(false);
  const [copiedCodeToast, setCopiedCodeToast] = useState(false);

  // État Formulaire Attestation
  const [certType, setCertType] = useState<CertificateItem["type"]>("benevolat");
  const [certReference, setCertReference] = useState("AUS-2026-YG-001");
  const [recipientTitle, setRecipientTitle] = useState("M.");
  const [recipientName, setRecipientName] = useState("");
  const [recipientRole, setRecipientRole] = useState(QUICK_ROLES[0]);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [activityTitle, setActivityTitle] = useState(
    content.actions[0]?.title || "Journée de consultation médicale gratuite"
  );
  const [activityDate, setActivityDate] = useState(
    content.actions[0]?.formattedDate || "Samedi 10 Octobre 2026"
  );
  const [certZone, setCertZone] = useState("Yeumbeul & Guédiawaye");
  const [customMessage, setCustomMessage] = useState(
    CERTIFICATE_TYPES.benevolat.defaultMessage
  );
  const [issueDate, setIssueDate] = useState("09 Novembre 2026");
  const [issuedAtCity, setIssuedAtCity] = useState("Yeumbeul");
  const [signer1Title, setSigner1Title] = useState("Le Président de l'AUS");
  const [signer1Name, setSigner1Name] = useState("Coordination Générale");
  const [signer2Title, setSigner2Title] = useState("Le Secrétaire Général");
  const [signer2Name, setSigner2Name] = useState("Bureau Exécutif AUS");
  const [certSavedToast, setCertSavedToast] = useState(false);

  useEffect(() => {
    const auth = window.sessionStorage.getItem("aus_admin_auth");
    if (auth === "ok") {
      setIsAuthenticated(true);
    }
    const loadedCustom = getCustomActions();
    setCustomActions(loadedCustom);
    setAllActions(getAllActions());
    const loadedCerts = getSavedCertificates();
    setCertificates(loadedCerts);
    setCertReference(generateCertificateReference(loadedCerts.length));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pinInput.trim();
    const activePin = getAdminPin();
    if (cleaned === activePin) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput("");
      window.sessionStorage.setItem("aus_admin_auth", "ok");
    } else {
      setPinError(true);
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const activePin = getAdminPin();
    if (currentPinField.trim() !== activePin) {
      setPinChangeMsg({
        type: "error",
        text: "Le code actuel saisi est incorrect.",
      });
      return;
    }
    if (newPinField.trim().length < 4) {
      setPinChangeMsg({
        type: "error",
        text: "Le nouveau code doit contenir au moins 4 caractères ou chiffres.",
      });
      return;
    }
    if (newPinField.trim() !== confirmPinField.trim()) {
      setPinChangeMsg({
        type: "error",
        text: "La confirmation ne correspond pas au nouveau code.",
      });
      return;
    }
    setAdminPin(newPinField.trim());
    setCurrentPinField("");
    setNewPinField("");
    setConfirmPinField("");
    setPinChangeMsg({
      type: "success",
      text: "Le code d'accès administrateur a été modifié avec succès.",
    });
    setTimeout(() => setPinChangeMsg(null), 5000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.sessionStorage.removeItem("aus_admin_auth");
  };

  // Compression d'image uploadée en Base64 léger
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 900;
        const scale = img.width > maxW ? maxW / img.width : 1;
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
          setActImage(dataUrl);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resetActionForm = () => {
    setEditingActionId(null);
    setActTitle("");
    setActDate("2026-11-15");
    setActFormattedDate("Dimanche 15 Novembre 2026");
    setActZone("Yeumbeul");
    setActLocationDetail("");
    setActCategory("Santé");
    setActStatus("Réalisée");
    setActImage(PRESET_IMAGES[0].path);
    setActSummary("");
    setActDescription("");
    setActSpecialties("");
    setActPartners("");
    setActHighlight(false);
  };

  const handleSaveAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle.trim()) return;

    const fullLocation = actLocationDetail.trim()
      ? `${actLocationDetail.trim()} (${actZone})`
      : actZone;

    const id =
      editingActionId ||
      `${actTitle
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}-${Date.now().toString().slice(-4)}`;

    const newAction: ActionItem = {
      id,
      title: actTitle.trim(),
      date: actDate,
      formattedDate: actFormattedDate.trim() || actDate,
      location: fullLocation,
      image: actImage || "/images/real-communaute-1.jpg",
      summary: actSummary.trim() || actDescription.trim().slice(0, 140),
      description: actDescription.trim() || actSummary.trim(),
      category: actCategory,
      status: actStatus,
      highlight: actHighlight,
      specialties: actSpecialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      partners: actPartners
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    const updatedCustom = saveCustomAction(newAction);
    setCustomActions(updatedCustom);
    setAllActions(getAllActions());
    setActionSavedToast(true);
    setTimeout(() => setActionSavedToast(false), 3500);
    resetActionForm();
  };

  const handleEditAction = (action: ActionItem) => {
    setEditingActionId(action.id);
    setActTitle(action.title);
    setActDate(action.date);
    setActFormattedDate(action.formattedDate);
    if (action.location.includes("Guédiawaye") && action.location.includes("Yeumbeul")) {
      setActZone("Yeumbeul & Guédiawaye");
    } else if (action.location.includes("Guédiawaye")) {
      setActZone("Guédiawaye");
    } else {
      setActZone("Yeumbeul");
    }
    setActLocationDetail(action.location.replace(/\((Yeumbeul|Guédiawaye|Yeumbeul & Guédiawaye)\)/g, "").trim());
    setActCategory(action.category);
    setActStatus(action.status);
    setActImage(action.image);
    setActSummary(action.summary);
    setActDescription(action.description);
    setActSpecialties((action.specialties || []).join(", "));
    setActPartners((action.partners || []).join(", "));
    setActHighlight(Boolean(action.highlight));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteAction = (id: string) => {
    const updated = deleteCustomAction(id);
    setCustomActions(updated);
    setAllActions(getAllActions());
  };

  const handleCopyContentTsCode = async () => {
    const code = JSON.stringify(allActions, null, 2);
    await navigator.clipboard.writeText(code);
    setCopiedCodeToast(true);
    setTimeout(() => setCopiedCodeToast(false), 3000);
  };

  // Gestion du changement de type d'attestation
  const handleCertTypeChange = (type: CertificateItem["type"]) => {
    setCertType(type);
    setCustomMessage(CERTIFICATE_TYPES[type].defaultMessage);
  };

  // Sélection d'une activité existante pour pré-remplir l'attestation
  const handleSelectExistingActivity = (actId: string) => {
    if (actId === "custom") return;
    const found = allActions.find((a) => a.id === actId);
    if (found) {
      setActivityTitle(found.title);
      setActivityDate(found.formattedDate);
      if (found.location.toLowerCase().includes("guédiawaye")) {
        setCertZone("Guédiawaye");
      } else {
        setCertZone("Yeumbeul & Guédiawaye");
      }
    }
  };

  const currentCertificate: CertificateItem = {
    id: certReference,
    reference: certReference,
    type: certType,
    recipientTitle,
    recipientName: recipientName || "Dr. Moussa Diop",
    recipientRole,
    activityTitle,
    activityDate,
    zone: certZone,
    customMessage,
    issueDate,
    issuedAtCity,
    signer1Title,
    signer1Name,
    signer2Title,
    signer2Name,
    recipientPhone,
    createdAt: new Date().toISOString(),
  };

  const handleSaveCertificateToRegistry = () => {
    const updated = saveCertificate(currentCertificate);
    setCertificates(updated);
    setCertSavedToast(true);
    setTimeout(() => setCertSavedToast(false), 3000);
  };

  const handleNewCertificate = () => {
    const nextRef = generateCertificateReference(certificates.length + 1);
    setCertReference(nextRef);
    setRecipientName("");
    setRecipientPhone("");
  };

  const handleLoadCertificate = (cert: CertificateItem) => {
    setCertType(cert.type);
    setCertReference(cert.reference);
    setRecipientTitle(cert.recipientTitle);
    setRecipientName(cert.recipientName);
    setRecipientRole(cert.recipientRole);
    setRecipientPhone(cert.recipientPhone || "");
    setActivityTitle(cert.activityTitle);
    setActivityDate(cert.activityDate);
    setCertZone(cert.zone);
    setCustomMessage(cert.customMessage);
    setIssueDate(cert.issueDate);
    setIssuedAtCity(cert.issuedAtCity);
    setSigner1Title(cert.signer1Title);
    setSigner1Name(cert.signer1Name);
    setSigner2Title(cert.signer2Title);
    setSigner2Name(cert.signer2Name);
    setActiveTab("certificates");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-aus-blue-50 text-aus-blue-700 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-aus-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              Espace Bureau Exécutif
            </span>
            <h1 className="mt-3 text-2xl font-black text-slate-900">
              Administration AUS
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Gestion de l&apos;historique des activités (Yeumbeul &amp; Guédiawaye) et délivrance d&apos;attestations officielles.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label
                htmlFor="admin-pin"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Code confidentiel du Bureau Exécutif
              </label>
              <input
                id="admin-pin"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aus-blue-600 text-sm font-mono text-center tracking-widest"
                required
              />
              {pinError && (
                <p className="text-xs text-red-600 font-semibold mt-1.5 text-center">
                  Code d&apos;accès incorrect. Veuillez réessayer.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-lg transition-all"
            >
              Déverrouiller le portail
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-500 hover:text-aus-blue-700 transition-colors"
              >
                ← Retourner à l&apos;accueil public
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* En-tête Admin (masqué à l'impression) */}
        <div className="bg-gradient-to-r from-aus-blue-900 via-aus-blue-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 print:hidden">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-aus-orange-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portail Administrateur AUS • Yeumbeul &amp; Guédiawaye</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Gestion de l&apos;Historique &amp; Générateur d&apos;Attestations
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Ajoutez de nouvelles activités réalisées à Yeumbeul et Guédiawaye, et délivrez des attestations officielles (Image HD ou PDF A4) aux bénévoles, médecins et partenaires.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/actions"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Voir la page Actions</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 text-xs font-bold text-red-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Verrouiller</span>
            </button>
          </div>
        </div>

        {/* Cartes de statistiques rapides (masquées à l'impression) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:hidden">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">
                Activités dans l&apos;historique
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {allActions.length} activités
              </div>
              <span className="text-xs text-emerald-600 font-semibold">
                Dont {customActions.length} ajoutée(s) via l&apos;admin
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-aus-blue-700 flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">
                Attestations délivrées
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {certificates.length} attestations
              </div>
              <span className="text-xs text-aus-orange-600 font-semibold">
                Format HD PNG &amp; A4 Paysage
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-aus-orange-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">
                Zones d&apos;intervention
              </span>
              <div className="text-xl font-black text-slate-900 mt-1">
                Yeumbeul &amp; Guédiawaye
              </div>
              <span className="text-xs text-slate-500 font-medium">
                76 293 77 54 / 77 157 67 55
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Barre d'Onglets (masquée à l'impression) */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 print:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("activities")}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "activities"
                ? "bg-aus-blue-700 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>1. Historique des Activités ({allActions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certificates")}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "certificates"
                ? "bg-aus-orange-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>2. Créer &amp; Donner une Attestation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("registry")}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "registry"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>3. Registre des Attestations ({certificates.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "security"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>4. Code d&apos;accès &amp; Sécurité</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* ONGLET 1 : AJOUTER ET GÉRER L'HISTORIQUE DES ACTIVITÉS           */}
        {/* ================================================================= */}
        {activeTab === "activities" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Formulaire d'ajout / édition */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-aus-blue-700">
                    {editingActionId ? "Mode modification" : "Nouvelle entrée"}
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    {editingActionId
                      ? "Modifier l'activité"
                      : "Ajouter une activité à l'historique"}
                  </h2>
                </div>
                {editingActionId && (
                  <button
                    type="button"
                    onClick={resetActionForm}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                  >
                    Annuler
                  </button>
                )}
              </div>

              {actionSavedToast && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Activité enregistrée avec succès ! Elle est maintenant visible dans l&apos;historique du site.
                  </span>
                </div>
              )}

              <form onSubmit={handleSaveAction} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Titre de l&apos;activité / action <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={actTitle}
                    onChange={(e) => setActTitle(e.target.value)}
                    placeholder="Ex : Journée de don de sang & dépistage à Guédiawaye"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-aus-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date (calendrier)
                    </label>
                    <input
                      type="date"
                      value={actDate}
                      onChange={(e) => setActDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date affichée (en français)
                    </label>
                    <input
                      type="text"
                      value={actFormattedDate}
                      onChange={(e) => setActFormattedDate(e.target.value)}
                      placeholder="Ex : Samedi 20 Novembre 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>

                {/* Zone d'intervention */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Zone d&apos;intervention
                    </label>
                    <select
                      value={actZone}
                      onChange={(e) =>
                        setActZone(
                          e.target.value as "Yeumbeul" | "Guédiawaye" | "Yeumbeul & Guédiawaye"
                        )
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-semibold"
                    >
                      <option value="Yeumbeul">Yeumbeul</option>
                      <option value="Guédiawaye">Guédiawaye</option>
                      <option value="Yeumbeul & Guédiawaye">Yeumbeul &amp; Guédiawaye</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Lieu exact (École, Poste de santé, Place...)
                    </label>
                    <input
                      type="text"
                      value={actLocationDetail}
                      onChange={(e) => setActLocationDetail(e.target.value)}
                      placeholder="Ex : École Aliou Kébé / Place publique"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>

                {/* Catégorie & Statut */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Domaine / Catégorie
                    </label>
                    <select
                      value={actCategory}
                      onChange={(e) =>
                        setActCategory(e.target.value as ActionItem["category"])
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    >
                      <option value="Santé">Santé</option>
                      <option value="Jeunesse">Jeunesse</option>
                      <option value="Citoyenneté">Citoyenneté</option>
                      <option value="Solidarité">Solidarité</option>
                      <option value="Développement">Développement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Statut de l&apos;activité
                    </label>
                    <select
                      value={actStatus}
                      onChange={(e) =>
                        setActStatus(e.target.value as ActionItem["status"])
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-semibold"
                    >
                      <option value="Réalisée">Réalisée (Historique)</option>
                      <option value="En cours">En cours</option>
                      <option value="À venir">À venir (Programmée)</option>
                    </select>
                  </div>
                </div>

                {/* Photo de l'activité */}
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700">
                    Photo de l&apos;activité
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-aus-blue-700 hover:bg-aus-blue-800 text-white text-xs font-bold shadow-sm transition-colors">
                      <ImagePlus className="w-4 h-4" />
                      <span>Importer une photo depuis l&apos;appareil</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <select
                      value={actImage.startsWith("data:") ? "" : actImage}
                      onChange={(e) => {
                        if (e.target.value) setActImage(e.target.value);
                      }}
                      className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    >
                      <option value="">-- Ou choisir une photo AUS existante --</option>
                      {PRESET_IMAGES.map((img) => (
                        <option key={img.path} value={img.path}>
                          {img.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Résumé & Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Résumé court <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={actSummary}
                    onChange={(e) => setActSummary(e.target.value)}
                    placeholder="Une phrase résumant l'impact de l'activité"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bilan détaillé / Description complète <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={actDescription}
                    onChange={(e) => setActDescription(e.target.value)}
                    placeholder="Décrivez le déroulement, le nombre de bénéficiaires touchés, l'ambiance..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Spécialités / Services (séparés par virgule)
                    </label>
                    <input
                      type="text"
                      value={actSpecialties}
                      onChange={(e) => setActSpecialties(e.target.value)}
                      placeholder="Ex : Pédiatrie, Dons de médicaments, Sensibilisation"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Partenaires associés (séparés par virgule)
                    </label>
                    <input
                      type="text"
                      value={actPartners}
                      onChange={(e) => setActPartners(e.target.value)}
                      placeholder="Ex : UCAD, Poste de Santé, Mairie"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={actHighlight}
                    onChange={(e) => setActHighlight(e.target.checked)}
                    className="rounded border-slate-300 text-aus-blue-700 focus:ring-aus-blue-600"
                  />
                  <span>Mettre cette activité en avant (Action Phare)</span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {editingActionId
                      ? "Enregistrer les modifications"
                      : "Publier dans l'historique d'activités"}
                  </span>
                </button>
              </form>
            </div>

            {/* Liste de l'historique actif */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Historique actif ({allActions.length} activités)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cliquez sur une activité pour la modifier ou générer une attestation liée.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyContentTsCode}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  {copiedCodeToast ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>JSON Copié !</span>
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="w-3.5 h-3.5" />
                      <span>Copier JSON complet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-3">
                {allActions.map((act) => {
                  const isCustom = customActions.some((c) => c.id === act.id);
                  return (
                    <div
                      key={act.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-aus-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-aus-blue-50 text-aus-blue-800">
                            {act.category}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                            {act.status}
                          </span>
                          {isCustom && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              Ajoutée via Admin
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {act.title}
                        </h4>
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-aus-orange-500" />
                            {act.formattedDate}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-aus-red-500" />
                            {act.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectExistingActivity(act.id);
                            setActiveTab("certificates");
                          }}
                          className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-aus-orange-700 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                          title="Créer une attestation pour cette activité"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Attestation</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEditAction(act)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Modifier cette activité"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAction(act.id)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Supprimer cette activité"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* ONGLET 2 : GÉNÉRATEUR D'ATTESTATIONS OFFICIELLES AUS              */}
        {/* ================================================================= */}
        {activeTab === "certificates" && (
          <div className="space-y-8">
            {/* Formulaire de configuration (masqué à l'impression) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 print:hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-aus-orange-600">
                    Générateur officiel de diplômes &amp; certificats
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Paramétrer l&apos;Attestation à délivrer
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleNewCertificate}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    Nouveau N° Réf
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCertificateToRegistry}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm transition-colors"
                  >
                    Enregistrer dans le registre
                  </button>
                </div>
              </div>

              {certSavedToast && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Attestation enregistrée dans le registre officiel de l&apos;AUS !</span>
                </div>
              )}

              {/* Choix du modèle d'attestation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  1. Choisir le type d&apos;attestation :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {(
                    Object.keys(CERTIFICATE_TYPES) as Array<CertificateItem["type"]>
                  ).map((t) => {
                    const info = CERTIFICATE_TYPES[t];
                    const active = certType === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleCertTypeChange(t)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          active
                            ? "border-aus-blue-700 bg-aus-blue-50/70 ring-2 ring-aus-blue-600/20"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full mb-1.5"
                          style={{ backgroundColor: info.badgeColor }}
                        />
                        <div className="text-xs font-bold text-slate-900">
                          {info.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informations du bénéficiaire */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Civilité / Titre
                  </label>
                  <select
                    value={recipientTitle}
                    onChange={(e) => setRecipientTitle(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-semibold"
                  >
                    <option value="M.">M.</option>
                    <option value="Mme">Mme</option>
                    <option value="Mlle">Mlle</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Pr.">Pr.</option>
                    <option value="">(Aucun)</option>
                  </select>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Prénom &amp; Nom du bénéficiaire <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Ex : Mamadou Sylla / Fatou Ndiaye"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rôle / Fonction / Qualité
                  </label>
                  <input
                    type="text"
                    value={recipientRole}
                    onChange={(e) => setRecipientRole(e.target.value)}
                    placeholder="Ex : Chirurgien-Dentiste Bénévole"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              {/* Suggestions rapides de rôles */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 mr-1">
                  Rôles rapides :
                </span>
                {QUICK_ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRecipientRole(r)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-aus-blue-50 hover:text-aus-blue-800 text-slate-700 transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Activité liée & Zone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Choisir une activité de l&apos;historique
                  </label>
                  <select
                    onChange={(e) => handleSelectExistingActivity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    {allActions.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.title} ({a.formattedDate})
                      </option>
                    ))}
                    <option value="custom">-- Saisie personnalisée ci-contre --</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Intitulé de l&apos;activité sur le diplôme
                  </label>
                  <input
                    type="text"
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Zone d&apos;intervention mentionnée
                  </label>
                  <select
                    value={certZone}
                    onChange={(e) => setCertZone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-bold"
                  >
                    <option value="Yeumbeul & Guédiawaye">Yeumbeul &amp; Guédiawaye</option>
                    <option value="Yeumbeul">Yeumbeul</option>
                    <option value="Guédiawaye">Guédiawaye</option>
                  </select>
                </div>
              </div>

              {/* Message de reconnaissance */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Texte officiel de reconnaissance (modifiable)
                </label>
                <textarea
                  rows={2}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm"
                />
              </div>

              {/* Dates, Signataires & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date de l&apos;activité
                  </label>
                  <input
                    type="text"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date de délivrance
                  </label>
                  <input
                    type="text"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Signataire Gauche
                  </label>
                  <input
                    type="text"
                    value={signer1Name}
                    onChange={(e) => setSigner1Name(e.target.value)}
                    placeholder="Nom du Président"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp du bénéficiaire (optionnel)
                  </label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="Ex : 77 123 45 67"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Aperçu Officiel & Téléchargement */}
            <CertificatePreview
              certificate={currentCertificate}
              onSaveToRegistry={handleSaveCertificateToRegistry}
            />
          </div>
        )}

        {/* ================================================================= */}
        {/* ONGLET 3 : REGISTRE DES ATTESTATIONS DÉLIVRÉES                    */}
        {/* ================================================================= */}
        {activeTab === "registry" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-700">
                  Traçabilité &amp; Archives
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  Registre des Attestations Délivrées ({certificates.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("certificates")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-aus-blue-700 text-white text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Nouvelle attestation</span>
              </button>
            </div>

            {certificates.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Award className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">
                  Aucune attestation enregistrée dans le registre pour le moment.
                </p>
                <p className="text-xs text-slate-500">
                  Dès que vous téléchargez ou enregistrez une attestation dans l&apos;onglet 2, elle est archivée ici avec son numéro de référence.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-aus-blue-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-slate-100 text-aus-blue-800">
                          {cert.reference}
                        </span>
                        <span className="text-xs font-bold text-aus-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full">
                          {CERTIFICATE_TYPES[cert.type]?.label}
                        </span>
                        <span className="text-xs text-slate-500">
                          Délivrée le {cert.issueDate}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900">
                        {cert.recipientTitle} {cert.recipientName}{" "}
                        <span className="text-xs font-semibold text-slate-500">
                          — {cert.recipientRole}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-600">
                        Activité : <strong>{cert.activityTitle}</strong> ({cert.zone})
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleLoadCertificate(cert)}
                        className="px-3.5 py-2 rounded-xl bg-aus-blue-50 hover:bg-aus-blue-100 text-aus-blue-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Ouvrir &amp; Télécharger</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = deleteCertificate(cert.id);
                          setCertificates(updated);
                        }}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        title="Supprimer du registre"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* ONGLET 4 : CHANGER LE CODE D'ACCÈS ADMINISTRATEUR                 */}
        {/* ================================================================= */}
        {activeTab === "security" && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 print:hidden">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-11 h-11 rounded-2xl bg-aus-blue-50 text-aus-blue-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-aus-blue-700">
                  Sécurité du Portail Bureau
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  Modifier le code d&apos;accès administrateur
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Vous pouvez personnaliser le code secret permettant d&apos;accéder à cet espace d&apos;administration (par défaut initialisé à <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-800">2026</code>).
            </p>

            <form onSubmit={handleChangePin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Code d&apos;accès actuel *
                </label>
                <input
                  type="password"
                  value={currentPinField}
                  onChange={(e) => setCurrentPinField(e.target.value)}
                  placeholder="Entrez votre code actuel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-aus-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nouveau code (min. 4 caractères) *
                  </label>
                  <input
                    type="password"
                    value={newPinField}
                    onChange={(e) => setNewPinField(e.target.value)}
                    placeholder="Nouveau code secret"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-aus-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirmer le nouveau code *
                  </label>
                  <input
                    type="password"
                    value={confirmPinField}
                    onChange={(e) => setConfirmPinField(e.target.value)}
                    placeholder="Répétez le nouveau code"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-aus-blue-600"
                    required
                  />
                </div>
              </div>

              {pinChangeMsg && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                    pinChangeMsg.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{pinChangeMsg.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-xl font-bold text-sm text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Enregistrer le nouveau code d&apos;accès</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

