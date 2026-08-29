import { NextRequest, NextResponse } from "next/server";
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';
import { assertBrowserOrigin, emailField, intakeFailure, localBurstLimit, phoneField, readJsonObject, reference, textField } from '@/lib/intake';

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
  return reference(`RI-${new Date().getFullYear()}`);
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
    const surveyDate = new Date(`${data.surveyDate}T12:00:00Z`);
    const maxDate = new Date(minDate);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.surveyDate) || Number.isNaN(surveyDate.getTime()) || surveyDate < minDate || surveyDate > maxDate) {
      errors.push("Survey date must be valid, at least 2 days away, and within one year");
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
    assertBrowserOrigin(request);
    localBurstLimit(request, 'qualify', 8);
    const raw = await readJsonObject(request);
    const rawCost = raw.systemCost;
    if (rawCost != null && (typeof rawCost !== 'number' || !Number.isFinite(rawCost) || rawCost < 0 || rawCost > 1_000_000)) {
      return NextResponse.json({ success: false, message: 'Estimated system cost is invalid.' }, { status: 400 });
    }
    const body: LeadQualifyPayload = {
      postcode: textField(raw, 'postcode', 16, true), county: textField(raw, 'county', 80, true),
      country: textField(raw, 'country', 2, true) as 'IE' | 'GB', billAmount: textField(raw, 'billAmount', 40, true),
      homeType: textField(raw, 'homeType', 60, true), recommendedSystem: textField(raw, 'recommendedSystem', 60),
      systemCost: rawCost as number | undefined, fullName: textField(raw, 'fullName', 100, true),
      phone: phoneField(raw), email: emailField(raw), address: textField(raw, 'address', 250, true),
      surveyDate: textField(raw, 'surveyDate', 10, true), surveyTime: textField(raw, 'surveyTime', 20, true),
      notes: textField(raw, 'notes', 1_000),
    };

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
    return intakeFailure(error);
  }
}
