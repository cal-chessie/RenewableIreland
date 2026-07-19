import { NextRequest, NextResponse } from 'next/server';
import { forwardLeadToAisolar } from '@/lib/aisolar';
import { sendLeadEmail } from '@/lib/notify';

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
    const body: SurveyPayload = await req.json();

    const errors = validateSurvey(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 },
      );
    }

    const bookingRef = `SURV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // In production, this would save to a database (Prisma) and trigger a calendar event.
    console.log('[Survey Booking]', {
      ref: bookingRef,
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      address: body.address.trim(),
      eircode: body.eircode.trim(),
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      notes: body.notes?.trim() ?? 'No notes',
      bookedAt: new Date().toISOString(),
    });

    await sendLeadEmail(`Survey booking ${bookingRef} — ${body.name.trim()} (${body.preferredDate})`, {
      Reference: bookingRef,
      Name: body.name.trim(),
      Phone: body.phone.trim(),
      Email: body.email.trim(),
      Address: body.address.trim(),
      Eircode: body.eircode.trim(),
      'Preferred date': body.preferredDate,
      'Preferred time': body.preferredTime,
      Notes: body.notes?.trim(),
    });

    await forwardLeadToAisolar({
      source: 'website_survey',
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      address: body.address.trim(),
      eircode: body.eircode.trim(),
      message: body.notes?.trim(),
      meta: { reference: bookingRef, preferredDate: body.preferredDate, preferredTime: body.preferredTime },
    });

    return NextResponse.json({
      success: true,
      message: `Your roof survey has been booked for ${body.preferredDate} (${body.preferredTime}). Our engineer will confirm by phone within 2 hours.`,
      reference: bookingRef,
      surveyDate: body.preferredDate,
      surveyTime: body.preferredTime,
    });
  } catch (error) {
    console.error('[Survey Booking API Error]', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
