"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Edit3,
  Eye,
  FileCheck2,
  FolderPlus,
  History,
  ImagePlus,
  KeyRound,
  LayoutGrid,
  Lock,
  LogOut,
  MapPin,
  Plus,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
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

type AdminTab = "home" | "activities" | "certificates" | "registry" | "security";

export default function AdminPage() {
  // Authentification PIN
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

  // Navigation principale : démarre sur "home" (Vue d'ensemble en un clin d'œil)
  const [activeTab, setActiveTab] = useState<AdminTab>("home");

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
  const [showAdvancedActionFields, setShowAdvancedActionFields] = useState(false);
  const [actionSavedToast, setActionSavedToast] = useState(false);

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
  const [issueDate, setIssueDate] = useState("15 Novembre 2026");
  const [issuedAtCity, setIssuedAtCity] = useState("Yeumbeul");
  const [signer1Title, setSigner1Title] = useState("Le Président de l'AUS");
  const [signer1Name, setSigner1Name] = useState("Coordination Générale");
  const [signer2Title, setSigner2Title] = useState("Le Secrétaire Général");
  const [signer2Name, setSigner2Name] = useState("Bureau Exécutif AUS");
  const [showAdvancedCertFields, setShowAdvancedCertFields] = useState(false);
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
    setShowAdvancedActionFields(false);
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

    const cleanSummary = actSummary.trim() || actDescription.trim().slice(0, 140) || actTitle.trim();
    const cleanDesc = actDescription.trim() || cleanSummary;

    const newAction: ActionItem = {
      id,
      title: actTitle.trim(),
      date: actDate,
      formattedDate: actFormattedDate.trim() || actDate,
      location: fullLocation,
      image: actImage || "/images/real-communaute-1.jpg",
      summary: cleanSummary,
      description: cleanDesc,
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
    setTimeout(() => setActionSavedToast(false), 4000);
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
    setActLocationDetail(
      action.location.replace(/\((Yeumbeul|Guédiawaye|Yeumbeul & Guédiawaye)\)/g, "").trim()
    );
    setActCategory(action.category);
    setActStatus(action.status);
    setActImage(action.image);
    setActSummary(action.summary);
    setActDescription(action.description);
    setActSpecialties((action.specialties || []).join(", "));
    setActPartners((action.partners || []).join(", "));
    setActHighlight(Boolean(action.highlight));
    setActiveTab("activities");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteAction = (id: string) => {
    const updated = deleteCustomAction(id);
    setCustomActions(updated);
    setAllActions(getAllActions());
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
    setTimeout(() => setCertSavedToast(false), 3500);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =====================================================================
  // ÉCRAN DE CONNEXION
  // =====================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[82vh] flex items-center justify-center px-4 py-16 bg-slate-50">
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
              Entrez votre code secret pour publier une activité ou délivrer une attestation officielle.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label
                htmlFor="admin-pin"
                className="block text-xs font-bold text-slate-700 mb-1.5 text-center"
              >
                Code confidentiel du Bureau
              </label>
              <input
                id="admin-pin"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aus-blue-600 text-lg font-mono text-center tracking-widest"
                required
              />
              {pinError && (
                <p className="text-xs text-red-600 font-semibold mt-1.5 text-center">
                  Code incorrect. Veuillez réessayer.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-lg transition-all cursor-pointer"
            >
              Ouvrir l&apos;espace Admin
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-500 hover:text-aus-blue-700 transition-colors"
              >
                ← Retourner au site public
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =====================================================================
  // TABLEAU DE BORD ADMINISTRATEUR CLAIR & INTUITIF
  // =====================================================================
  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Bandeau supérieur épuré */}
        <div className="bg-gradient-to-r from-[#04182B] via-aus-blue-900 to-[#06241B] rounded-3xl p-5 sm:p-7 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-emerald-300 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Espace Bureau AUS • Yeumbeul &amp; Guédiawaye</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Que souhaitez-vous faire aujourd&apos;hui ?
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/actions"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Voir le site public</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-xs font-bold text-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Barre de menu rapide (5 onglets très lisibles) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 print:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === "home"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            <span>Accueil Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("activities")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === "activities"
                ? "bg-aus-blue-700 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FolderPlus className="w-4 h-4 shrink-0" />
            <span>+ Activité</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === "certificates"
                ? "bg-aus-orange-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>+ Attestation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("registry")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === "registry"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FileCheck2 className="w-4 h-4 shrink-0" />
            <span>Archives ({allActions.length + certificates.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === "security"
                ? "bg-slate-800 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <KeyRound className="w-4 h-4 shrink-0" />
            <span>Code secret</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* VUE 0 : ACCUEIL EN UN CLIN D'ŒIL (PAR DÉFAUT)                     */}
        {/* ================================================================= */}
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* 3 Grandes Cartes d'Action Immédiate */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Carte 1 : Publier une activité */}
              <button
                type="button"
                onClick={() => {
                  resetActionForm();
                  setActiveTab("activities");
                }}
                className="group text-left bg-white hover:bg-blue-50/40 rounded-3xl p-6 sm:p-7 border-2 border-blue-200 hover:border-aus-blue-700 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-aus-blue-700 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <FolderPlus className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-aus-blue-800">
                      Action 1
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    Ajouter une Activité
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Publiez une journée médicale, une sensibilisation ou un panel réalisé à Yeumbeul ou Guédiawaye avec sa photo.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-extrabold text-aus-blue-700">
                  <span>Ouvrir le formulaire rapide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Carte 2 : Donner une attestation */}
              <button
                type="button"
                onClick={() => setActiveTab("certificates")}
                className="group text-left bg-white hover:bg-orange-50/40 rounded-3xl p-6 sm:p-7 border-2 border-orange-200 hover:border-aus-orange-600 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-aus-orange-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Award className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-50 text-aus-orange-800">
                      Action 2
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    Donner une Attestation
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Entrez simplement le nom du bénévole, médecin ou partenaire : le diplôme officiel (PDF A4 &amp; Image HD) est prêt !
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-extrabold text-aus-orange-600">
                  <span>Créer un diplôme maintenant</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Carte 3 : Consulter les archives */}
              <button
                type="button"
                onClick={() => setActiveTab("registry")}
                className="group text-left bg-white hover:bg-emerald-50/40 rounded-3xl p-6 sm:p-7 border-2 border-emerald-200 hover:border-emerald-600 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <FileCheck2 className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800">
                      Archives
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    Historique &amp; Registre
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Retrouvez vos <strong>{allActions.length} activités</strong> publiées et vos{" "}
                    <strong>{certificates.length} attestations</strong> enregistrées pour les modifier ou les retélécharger.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-extrabold text-emerald-700">
                  <span>Voir toute la liste</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Aperçu rapide : Les activités actuelles avec raccourci 1-clic "Donner une attestation" */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-aus-blue-700">
                    Raccourci rapide
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Vos activités récentes ({allActions.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetActionForm();
                    setActiveTab("activities");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-aus-blue-700 hover:bg-aus-blue-800 text-white text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle activité</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allActions.slice(0, 4).map((act) => {
                  const isCustom = customActions.some((c) => c.id === act.id);
                  return (
                    <div
                      key={act.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-aus-blue-100 text-aus-blue-900">
                            {act.category}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {act.formattedDate}
                          </span>
                          {isCustom && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              Ajoutée par vous
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {act.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-aus-red-500 shrink-0" />
                          <span className="truncate">{act.location}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70">
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectExistingActivity(act.id);
                            setActiveTab("certificates");
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-aus-orange-600 hover:bg-aus-orange-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Donner une attestation pour cette activité</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditAction(act)}
                          className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* ONGLET 1 : AJOUTER UNE ACTIVITÉ (EN 3 ÉTAPES SIMPLES)             */}
        {/* ================================================================= */}
        {activeTab === "activities" && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase text-aus-blue-700">
                  {editingActionId ? "Modification d'activité" : "Formulaire en 3 étapes simples"}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {editingActionId
                    ? "Modifier cette activité"
                    : "Publier une nouvelle activité dans l'historique"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  resetActionForm();
                  setActiveTab("home");
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour à l&apos;accueil</span>
              </button>
            </div>

            {actionSavedToast && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Activité enregistrée ! Elle est maintenant visible sur le site.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("registry")}
                  className="underline text-emerald-800 whitespace-nowrap"
                >
                  Voir la liste →
                </button>
              </div>
            )}

            <form onSubmit={handleSaveAction} className="space-y-6">
              {/* ÉTAPE 1 : QUOI & QUAND */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-aus-blue-900">
                  <span className="w-6 h-6 rounded-full bg-aus-blue-700 text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  <span>Quoi &amp; Quand ?</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom de l&apos;activité <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={actTitle}
                    onChange={(e) => setActTitle(e.target.value)}
                    placeholder="Ex : Journée de consultation gratuite à Guédiawaye"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-aus-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date (ex : Samedi 20 Novembre 2026)
                    </label>
                    <input
                      type="text"
                      value={actFormattedDate}
                      onChange={(e) => setActFormattedDate(e.target.value)}
                      placeholder="Ex : Samedi 20 Novembre 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Domaine de l&apos;action
                    </label>
                    <select
                      value={actCategory}
                      onChange={(e) =>
                        setActCategory(e.target.value as ActionItem["category"])
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold"
                    >
                      <option value="Santé">Santé</option>
                      <option value="Jeunesse">Jeunesse</option>
                      <option value="Citoyenneté">Citoyenneté</option>
                      <option value="Solidarité">Solidarité</option>
                      <option value="Développement">Développement</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ÉTAPE 2 : OÙ & PHOTO */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-aus-blue-900">
                  <span className="w-6 h-6 rounded-full bg-aus-blue-700 text-white text-xs flex items-center justify-center">
                    2
                  </span>
                  <span>Lieu &amp; Photo de l&apos;activité</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Zone (Yeumbeul ou Guédiawaye)
                    </label>
                    <select
                      value={actZone}
                      onChange={(e) =>
                        setActZone(
                          e.target.value as "Yeumbeul" | "Guédiawaye" | "Yeumbeul & Guédiawaye"
                        )
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold"
                    >
                      <option value="Yeumbeul">Yeumbeul</option>
                      <option value="Guédiawaye">Guédiawaye</option>
                      <option value="Yeumbeul & Guédiawaye">Yeumbeul &amp; Guédiawaye</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Lieu précis (École, Poste de santé...)
                    </label>
                    <input
                      type="text"
                      value={actLocationDetail}
                      onChange={(e) => setActLocationDetail(e.target.value)}
                      placeholder="Ex : École Aliou Kébé"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-aus-blue-700 hover:bg-aus-blue-800 text-white text-xs font-bold shadow-sm transition-colors">
                    <ImagePlus className="w-4 h-4" />
                    <span>Choisir une photo sur mon téléphone / PC</span>
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
                    className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-medium"
                  >
                    <option value="">-- Ou utiliser une photo AUS existante --</option>
                    {PRESET_IMAGES.map((img) => (
                      <option key={img.path} value={img.path}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ÉTAPE 3 : DESCRIPTION */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-aus-blue-900">
                  <span className="w-6 h-6 rounded-full bg-aus-blue-700 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  <span>Que s&apos;est-il passé ? (Résumé)</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expliquez en quelques mots l&apos;activité <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={actDescription}
                    onChange={(e) => {
                      setActDescription(e.target.value);
                      if (!actSummary) setActSummary(e.target.value.slice(0, 130));
                    }}
                    placeholder="Ex : Journée de consultations gratuites et distribution de médicaments au profit des familles..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
                  />
                </div>

                {/* Options avancées repliées par défaut */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedActionFields(!showAdvancedActionFields)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-aus-blue-700 cursor-pointer"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span>
                      {showAdvancedActionFields
                        ? "Masquer les options facultatives"
                        : "Ajouter des spécialités médicales ou partenaires (facultatif)"}
                    </span>
                    {showAdvancedActionFields ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {showAdvancedActionFields && (
                    <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Spécialités (séparées par virgule)
                        </label>
                        <input
                          type="text"
                          value={actSpecialties}
                          onChange={(e) => setActSpecialties(e.target.value)}
                          placeholder="Ex : Pédiatrie, Dentisterie"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Partenaires (séparés par virgule)
                        </label>
                        <input
                          type="text"
                          value={actPartners}
                          onChange={(e) => setActPartners(e.target.value)}
                          placeholder="Ex : UCAD, Poste de Santé"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>
                  {editingActionId
                    ? "Enregistrer les modifications"
                    : "Publier l'activité sur le site"}
                </span>
              </button>
            </form>
          </div>
        )}

        {/* ================================================================= */}
        {/* ONGLET 2 : DONNER UNE ATTESTATION (ULTRA-SIMPLE EN 3 ÉTAPES)      */}
        {/* ================================================================= */}
        {activeTab === "certificates" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 print:hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-aus-orange-600">
                    Création immédiate en 3 étapes
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Donner une Attestation Officielle AUS
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleNewCertificate}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    Nouveau N° ({certReference})
                  </button>
                </div>
              </div>

              {certSavedToast && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Attestation enregistrée dans les archives de l&apos;AUS !</span>
                </div>
              )}

              {/* ÉTAPE 1 : TYPE D'ATTESTATION */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <span className="w-6 h-6 rounded-full bg-aus-orange-600 text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  <span>Choisissez le modèle d&apos;attestation :</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
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
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? "border-aus-blue-700 bg-aus-blue-50/80 ring-2 ring-aus-blue-600/20"
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

              {/* ÉTAPE 2 : NOM & RÔLE DU BÉNÉFICIAIRE */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <span className="w-6 h-6 rounded-full bg-aus-orange-600 text-white text-xs flex items-center justify-center">
                    2
                  </span>
                  <span>À qui donnez-vous cette attestation ?</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Titre
                    </label>
                    <select
                      value={recipientTitle}
                      onChange={(e) => setRecipientTitle(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl border border-slate-300 text-sm bg-white font-semibold"
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
                      Prénom &amp; Nom de la personne <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Ex : Dr. Moussa Diop / Fatou Ndiaye"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-900 focus:ring-2 focus:ring-aus-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Son Rôle ou sa Fonction
                    </label>
                    <input
                      type="text"
                      value={recipientRole}
                      onChange={(e) => setRecipientRole(e.target.value)}
                      placeholder="Ex : Chirurgien-Dentiste Bénévole"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm"
                    />
                  </div>
                </div>

                {/* Boutons de rôles en 1 clic */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">
                    Cliquez pour remplir le rôle :
                  </span>
                  {QUICK_ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRecipientRole(r)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        recipientRole === r
                          ? "bg-aus-blue-700 text-white border-aus-blue-700"
                          : "bg-white hover:bg-aus-blue-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* ÉTAPE 3 : POUR QUELLE ACTIVITÉ ? */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <span className="w-6 h-6 rounded-full bg-aus-orange-600 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  <span>Pour quelle activité ?</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sélectionner une activité existante
                    </label>
                    <select
                      onChange={(e) => handleSelectExistingActivity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white font-semibold"
                    >
                      {allActions.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.title} ({a.formattedDate})
                        </option>
                      ))}
                      <option value="custom">-- Ou écrire un autre titre à droite --</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Titre affiché sur l&apos;attestation
                    </label>
                    <input
                      type="text"
                      value={activityTitle}
                      onChange={(e) => setActivityTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold"
                    />
                  </div>
                </div>

                {/* Bouton pour déplier les réglages secondaires (texte, dates, signataires, WhatsApp) */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedCertFields(!showAdvancedCertFields)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-aus-blue-700 cursor-pointer"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span>
                      {showAdvancedCertFields
                        ? "Masquer les options avancées"
                        : "Personnaliser le texte, la date, les signataires ou le numéro WhatsApp (facultatif)"}
                    </span>
                    {showAdvancedCertFields ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {showAdvancedCertFields && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Texte officiel de reconnaissance
                        </label>
                        <textarea
                          rows={2}
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Zone mentionnée
                          </label>
                          <select
                            value={certZone}
                            onChange={(e) => setCertZone(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold"
                          >
                            <option value="Yeumbeul & Guédiawaye">Yeumbeul &amp; Guédiawaye</option>
                            <option value="Yeumbeul">Yeumbeul</option>
                            <option value="Guédiawaye">Guédiawaye</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Date de délivrance
                          </label>
                          <input
                            type="text"
                            value={issueDate}
                            onChange={(e) => setIssueDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
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
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            WhatsApp du bénéficiaire
                          </label>
                          <input
                            type="tel"
                            value={recipientPhone}
                            onChange={(e) => setRecipientPhone(e.target.value)}
                            placeholder="Ex : 77 123 45 67"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Aperçu Officiel & Boutons de Téléchargement (Image HD, PDF A4, WhatsApp) */}
            <CertificatePreview
              certificate={currentCertificate}
              onSaveToRegistry={handleSaveCertificateToRegistry}
            />
          </div>
        )}

        {/* ================================================================= */}
        {/* ONGLET 3 : ARCHIVES (HISTORIQUE DES ACTIVITÉS & ATTESTATIONS)     */}
        {/* ================================================================= */}
        {activeTab === "registry" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Colonne 1 : Liste des activités */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-aus-blue-700 flex items-center justify-center">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900">
                      Activités publiées ({allActions.length})
                    </h2>
                    <p className="text-xs text-slate-500">
                      Dont {customActions.length} ajoutée(s) depuis cet espace
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetActionForm();
                    setActiveTab("activities");
                  }}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-aus-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter</span>
                </button>
              </div>

              <div className="space-y-3">
                {allActions.map((act) => {
                  const isCustom = customActions.some((c) => c.id === act.id);
                  return (
                    <div
                      key={act.id}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-aus-blue-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-aus-blue-50 text-aus-blue-800">
                            {act.category}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-aus-orange-500" />
                            {act.formattedDate}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {act.title}
                        </h4>
                        <p className="text-xs text-slate-500">{act.location}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectExistingActivity(act.id);
                            setActiveTab("certificates");
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-aus-orange-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Attestation</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditAction(act)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAction(act.id)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                            title="Supprimer"
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

            {/* Colonne 2 : Registre des attestations délivrées */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-aus-orange-600 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900">
                      Attestations délivrées ({certificates.length})
                    </h2>
                    <p className="text-xs text-slate-500">
                      Cliquez sur une attestation pour la retélécharger
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("certificates")}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-aus-orange-600 text-white text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nouvelle</span>
                </button>
              </div>

              {certificates.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Award className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs sm:text-sm font-bold text-slate-700">
                    Aucune attestation archivée pour l&apos;instant.
                  </p>
                  <p className="text-xs text-slate-500">
                    Lorsque vous téléchargez un diplôme, il s&apos;enregistre automatiquement ici.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-aus-blue-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-aus-blue-800">
                            {cert.reference}
                          </span>
                          <span className="text-[11px] font-bold text-aus-orange-700 bg-orange-50 px-2 py-0.5 rounded-full">
                            {CERTIFICATE_TYPES[cert.type]?.label}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900">
                          {cert.recipientTitle} {cert.recipientName}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {cert.recipientRole} • {cert.activityTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleLoadCertificate(cert)}
                          className="px-3 py-1.5 rounded-xl bg-aus-blue-50 hover:bg-aus-blue-100 text-aus-blue-800 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Ouvrir</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = deleteCertificate(cert.id);
                            setCertificates(updated);
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                  Modifier le code secret
                </h2>
              </div>
            </div>

            <form onSubmit={handleChangePin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Code actuel *
                </label>
                <input
                  type="password"
                  value={currentPinField}
                  onChange={(e) => setCurrentPinField(e.target.value)}
                  placeholder="Entrez le code actuel"
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
                className="w-full py-3.5 px-5 rounded-xl font-bold text-sm text-white bg-aus-blue-700 hover:bg-aus-blue-800 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Enregistrer le nouveau code</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
