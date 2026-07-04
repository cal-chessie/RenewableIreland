import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Types ───
interface LeadQualifyPayload {
  postcode: string;
  county: string;
  country: "IE" | "GB";
  billAmount: string;
  homeType: string;
  recommendedSystem?: string;
  systemCost?: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  surveyDate: string;
  surveyTime: string;
  notes?: string;
}

// ─── Generate unique reference number ───
function generateReference(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RI-${year}-${code}`;
}

// ─── Validation ───
function validatePayload(data: LeadQualifyPayload): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required string fields
  const requiredFields: (keyof LeadQualifyPayload)[] = [
    "fullName", "phone", "email", "address", "surveyDate", "surveyTime",
    "postcode", "county", "country", "billAmount", "homeType",
  ];

  for (const field of requiredFields) {
    if (!data[field] || String(data[field]).trim() === "") {
      errors.push(`${field} is required`);
    }
  }

  // Name validation
  if (data.fullName && data.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters");
  }

  // Phone validation
  if (data.phone) {
    const cleanedPhone = data.phone.replace(/[\s-]/g, "");
    if (data.country === "GB") {
      if (!/^(\+44|0)\d{9,10}$/.test(cleanedPhone)) {
        errors.push("Invalid UK phone number format");
      }
    } else {
      if (!/^(\+353|0)\d{9}$/.test(cleanedPhone)) {
        errors.push("Invalid Irish phone number format");
      }
    }
  }

  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email address format");
  }

  // Survey date validation (must be at least 2 days from today)
  if (data.surveyDate) {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    minDate.setHours(0, 0, 0, 0);
    const surveyDate = new Date(data.surveyDate);
    if (surveyDate < minDate) {
      errors.push("Survey date must be at least 2 days from today");
    }
  }

  // Survey time validation
  if (data.surveyTime && !["morning", "afternoon"].includes(data.surveyTime)) {
    errors.push("Survey time must be 'morning' or 'afternoon'");
  }

  // Country validation
  if (data.country && !["IE", "GB"].includes(data.country)) {
    errors.push("Country must be 'IE' or 'GB'");
  }

  return { valid: errors.length === 0, errors };
}

// ─── POST Handler ───
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LeadQualifyPayload;

    // Validate payload
    const validation = validatePayload(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed: " + validation.errors.join(", "),
        },
        { status: 400 }
      );
    }

    // Generate reference
    const reference = generateReference();

    // ─── Save to Supabase ───
    const address = `${body.postcode}, ${body.county}, ${body.country}`;
    const billNum = body.billAmount ? Number(body.billAmount) : null;
    const notes = [
      `Home type: ${body.homeType}`,
      body.recommendedSystem ? `Recommended system: ${body.recommendedSystem}` : null,
      `Survey date: ${body.surveyDate}`,
      `Survey time: ${body.surveyTime}`,
      "Lead from renewableireland.ie intake form",
    ]
      .filter(Boolean)
      .join("\n");

    const { error: dbError } = await supabase.from("leads").insert({
      name: body.fullName,
      email: body.email,
      phone: body.phone || null,
      address,
      monthly_bill: billNum,
      workflow_stage: "new",
      notes,
    });

    if (dbError) {
      console.error("[Lead Qualification] Supabase insert failed:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to save lead. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        reference,
        message: "Your free roof survey has been booked successfully! Our team will contact you within 24 hours to confirm your appointment.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Lead Qualification] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
