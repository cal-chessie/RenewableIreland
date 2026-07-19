import { NextRequest, NextResponse } from "next/server";
import { forwardLeadToAisolar } from '@/lib/aisolar';
import { sendLeadEmail } from '@/lib/notify';

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

    // In production, you would save to database here:
    // await db.lead.create({ data: { ...body, reference, createdAt: new Date() } });

    console.log(`[Lead Qualification] New lead: ${reference}`, {
      reference,
      name: body.fullName,
      email: body.email,
      phone: body.phone,
      county: body.county,
      country: body.country,
      postcode: body.postcode,
      billAmount: body.billAmount,
      homeType: body.homeType,
      recommendedSystem: body.recommendedSystem,
      surveyDate: body.surveyDate,
      surveyTime: body.surveyTime,
    });

    await sendLeadEmail(`Qualified lead ${reference} — ${body.fullName} (${body.county})`, {
      Reference: reference,
      Name: body.fullName,
      Email: body.email,
      Phone: body.phone,
      County: body.county,
      Country: body.country,
      Postcode: body.postcode,
      'Bill amount': body.billAmount,
      'Home type': body.homeType,
      'Recommended system': body.recommendedSystem,
      'Survey date': body.surveyDate,
      'Survey time': body.surveyTime,
    });

    await forwardLeadToAisolar({
      source: 'website_qualified',
      name: body.fullName,
      email: body.email,
      phone: body.phone,
      county: body.county,
      eircode: body.postcode,
      monthlyBill: parseFloat(body.billAmount ?? '') || undefined,
      meta: {
        reference,
        homeType: body.homeType,
        recommendedSystem: body.recommendedSystem,
        surveyDate: body.surveyDate,
        surveyTime: body.surveyTime,
      },
    });

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
