import { NextRequest, NextResponse } from 'next/server';
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';
import { assertBrowserOrigin, emailField, intakeFailure, localBurstLimit, phoneField, readJsonObject, reference, textField } from '@/lib/intake';

/* ------------------------------------------------------------------ */
/*  Validation helpers                                                 */
/* ------------------------------------------------------------------ */

const PHONE_REGEX = /^[\d\s\+\-\(\)]{7,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EIRCODE_REGEX = /^[A-Za-z]\d{2}\s?[A-Za-z\d]{4}$/;

interface SurveyPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  eircode: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

function validateSurvey(data: Partial<SurveyPayload>): string[] {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required (at least 2 characters).');
  }

  if (!data.phone || !PHONE_REGEX.test(data.phone.trim())) {
    errors.push('A valid phone number is required.');
  }

  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.push('Address is required (at least 5 characters).');
  }

  if (!data.eircode || !EIRCODE_REGEX.test(data.eircode.trim())) {
    errors.push('A valid Eircode is required (e.g. D18 A4K9).');
  }

  if (!data.preferredDate || !/^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate)) {
    errors.push('Preferred date is required (YYYY-MM-DD format).');
  }

  const validTimes = ['morning', 'afternoon', 'am', 'pm'];
  if (
    !data.preferredTime ||
    !validTimes.includes(data.preferredTime.trim().toLowerCase())
  ) {
    errors.push('Preferred time must be "morning" or "afternoon".');
  }

  return errors;
}

/* ------------------------------------------------------------------ */
/*  POST Handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  try {
    assertBrowserOrigin(req);
    localBurstLimit(req, 'survey', 8);
    const raw = await readJsonObject(req);
    const body: SurveyPayload = {
      name: textField(raw, 'name', 100, true), phone: phoneField(raw), email: emailField(raw),
      address: textField(raw, 'address', 250, true), eircode: textField(raw, 'eircode', 12, true),
      preferredDate: textField(raw, 'preferredDate', 10, true), preferredTime: textField(raw, 'preferredTime', 20, true),
      notes: textField(raw, 'notes', 1_000),
    };

    const errors = validateSurvey(body);
    const requested = /^\d{4}-\d{2}-\d{2}$/.test(body.preferredDate) ? new Date(`${body.preferredDate}T12:00:00Z`) : null;
    const today = new Date(); today.setUTCHours(0, 0, 0, 0);
    const latest = new Date(today); latest.setUTCFullYear(latest.getUTCFullYear() + 1);
    if (requested && (Number.isNaN(requested.getTime()) || requested < today || requested > latest)) errors.push('Preferred date must be a valid future date within one year.');
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 },
      );
    }

    const bookingRef = reference('SURV');

    try {
      await captureHubSpotLead({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        source: 'website-chat',
        submissionType: 'Roof survey request — awaiting confirmation',
        reference: bookingRef,
        details: {
          Address: body.address.trim(),
          Eircode: body.eircode.trim(),
          'Preferred date': body.preferredDate,
          'Preferred time': body.preferredTime,
          Notes: body.notes?.trim(),
        },
      });
    } catch (error) {
      console.error('[Survey request] HubSpot capture failed', { reference: bookingRef });
      const failure = hubSpotFailureResponse(error);
      return NextResponse.json({ success: false, message: failure.message }, { status: failure.status });
    }

    return NextResponse.json({
      success: true,
      message: `Your preferred survey slot for ${body.preferredDate} (${body.preferredTime}) has been received. Our team will confirm availability with you.`,
      reference: bookingRef,
      surveyDate: body.preferredDate,
      surveyTime: body.preferredTime,
    });
  } catch (error) {
    return intakeFailure(error);
  }
}
