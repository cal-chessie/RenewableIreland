import { NextRequest, NextResponse } from "next/server";
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';

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

    try {
      await captureHubSpotLead({
        name: body.fullName.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        source: 'website-lead-qualification',
        submissionType: 'Qualified survey request — awaiting confirmation',
        reference,
        details: {
          Address: body.address.trim(),
          Postcode: body.postcode.trim(),
          County: body.county.trim(),
          Country: body.country,
          'Monthly electricity bill': body.billAmount,
          'Home type': body.homeType,
          'Recommended system': body.recommendedSystem,
          'Estimated system cost': body.systemCost,
          'Preferred survey date': body.surveyDate,
          'Preferred survey time': body.surveyTime,
          Notes: body.notes?.trim(),
        },
      });
    } catch (error) {
      console.error('[Lead qualification] HubSpot capture failed', { reference });
      const failure = hubSpotFailureResponse(error);
      return NextResponse.json(
        { success: false, message: failure.message },
        { status: failure.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        reference,
        message: "Your survey request has been received. Our team will confirm availability with you before anything is booked.",
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
