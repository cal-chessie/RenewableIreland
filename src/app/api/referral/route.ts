import { NextRequest, NextResponse } from "next/server";

/* ===== In-Memory Storage (demo) ===== */
interface ReferralEntry {
  code: string;
  name: string;
  url: string;
  clicks: number;
  quotes: number;
  installs: number;
  rewardTotal: number;
  createdAt: string;
}

const referralStore = new Map<string, ReferralEntry>();

/* ===== Helpers ===== */
function generateRandomCode(length: number = 4): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateReferralCode(name: string): string {
  const prefix = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 6);
  const short = prefix.length >= 2 ? prefix.slice(0, Math.min(6, prefix.length)) : name.toUpperCase().slice(0, 6);
  let code = `RI-${short}-${generateRandomCode()}`;

  // Ensure uniqueness
  let attempts = 0;
  while (referralStore.has(code) && attempts < 50) {
    code = `RI-${short}-${generateRandomCode()}`;
    attempts++;
  }
  return code;
}

/* ===== POST Handler ===== */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, name, code } = body;

    if (!action) {
      return NextResponse.json(
        { success: false, error: "Missing action field" },
        { status: 400 }
      );
    }

    switch (action) {
      /* ---------- GENERATE ---------- */
      case "generate": {
        if (!name || typeof name !== "string" || name.trim().length < 1) {
          return NextResponse.json(
            { success: false, error: "Name is required" },
            { status: 400 }
          );
        }

        const cleanName = name.trim();
        const referralCode = generateReferralCode(cleanName);
        const referralUrl = `https://renewableireland.ie/referral/${referralCode}`;

        referralStore.set(referralCode, {
          code: referralCode,
          name: cleanName,
          url: referralUrl,
          clicks: 0,
          quotes: 0,
          installs: 0,
          rewardTotal: 0,
          createdAt: new Date().toISOString(),
        });

        return NextResponse.json({
          success: true,
          code: referralCode,
          url: referralUrl,
          name: cleanName,
        });
      }

      /* ---------- TRACK ---------- */
      case "track": {
        if (!code || typeof code !== "string") {
          return NextResponse.json(
            { success: false, error: "Referral code is required" },
            { status: 400 }
          );
        }

        const entry = referralStore.get(code.toUpperCase());
        if (!entry) {
          return NextResponse.json({
            success: true,
            found: false,
            message: "Referral code not found. Try generating one first.",
          });
        }

        // Return demo data (slightly randomised for realism)
        return NextResponse.json({
          success: true,
          found: true,
          data: {
            code: entry.code,
            name: entry.name,
            url: entry.url,
            clicks: Math.max(entry.clicks, Math.floor(Math.random() * 30) + 5),
            quotes: Math.max(entry.quotes, Math.floor(Math.random() * 8) + 1),
            installs: Math.max(entry.installs, Math.floor(Math.random() * 3)),
            rewardTotal: Math.max(
              entry.rewardTotal,
              Math.max(entry.installs, Math.floor(Math.random() * 3)) * 200
            ),
            createdAt: entry.createdAt,
          },
        });
      }

      /* ---------- VALIDATE ---------- */
      case "validate": {
        if (!code || typeof code !== "string") {
          return NextResponse.json(
            { success: false, error: "Referral code is required" },
            { status: 400 }
          );
        }

        const entry = referralStore.get(code.toUpperCase());
        if (!entry) {
          return NextResponse.json({
            success: true,
            valid: false,
            message: "Invalid referral code",
          });
        }

        return NextResponse.json({
          success: true,
          valid: true,
          data: {
            code: entry.code,
            name: entry.name,
            url: entry.url,
          },
        });
      }

      /* ---------- UNKNOWN ACTION ---------- */
      default:
        return NextResponse.json(
          { success: false, error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
