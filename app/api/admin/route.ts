import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ActionItem } from "@/data/content";
import { CertificateItem, DEFAULT_SITE_TEXTS, SiteTextSettings } from "@/lib/adminStore";

interface ServerAdminState {
  pin: string;
  customActions: ActionItem[];
  certificates: CertificateItem[];
  siteTexts: SiteTextSettings;
  updatedAt: string;
}

const TMP_FILE_PATH = path.join("/tmp", "aus-admin-state-v1.json");
const DEFAULT_PIN = process.env.AUS_ADMIN_PIN || "AUS2026";

// Mémoire globale du serveur (partagée entre les connexions du Président, du Bureau et de l'Admin)
const globalStore = globalThis as unknown as {
  __ausAdminState?: ServerAdminState;
};

function readServerState(): ServerAdminState {
  if (globalStore.__ausAdminState) {
    return globalStore.__ausAdminState;
  }
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const raw = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw) as ServerAdminState;
      if (parsed && typeof parsed.pin === "string") {
        globalStore.__ausAdminState = parsed;
        return parsed;
      }
    }
  } catch {
    // ignore file read errors
  }

  const initial: ServerAdminState = {
    pin: DEFAULT_PIN,
    customActions: [],
    certificates: [],
    siteTexts: DEFAULT_SITE_TEXTS,
    updatedAt: new Date().toISOString(),
  };
  globalStore.__ausAdminState = initial;
  return initial;
}

function writeServerState(nextState: ServerAdminState): void {
  globalStore.__ausAdminState = nextState;
  try {
    fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(nextState), "utf-8");
  } catch {
    // ignore file write errors on read-only environments
  }
}

export async function GET() {
  const state = readServerState();
  return NextResponse.json({
    pin: state.pin,
    customActions: state.customActions,
    certificates: state.certificates,
    siteTexts: state.siteTexts || DEFAULT_SITE_TEXTS,
    updatedAt: state.updatedAt,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = readServerState();

    const updated: ServerAdminState = {
      pin:
        typeof body.pin === "string" && body.pin.trim().length >= 4
          ? body.pin.trim()
          : current.pin,
      customActions: Array.isArray(body.customActions)
        ? body.customActions
        : current.customActions,
      certificates: Array.isArray(body.certificates)
        ? body.certificates
        : current.certificates,
      siteTexts:
        body.siteTexts && typeof body.siteTexts === "object"
          ? { ...DEFAULT_SITE_TEXTS, ...body.siteTexts }
          : current.siteTexts || DEFAULT_SITE_TEXTS,
      updatedAt: new Date().toISOString(),
    };

    writeServerState(updated);
    return NextResponse.json({ ok: true, state: updated });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
