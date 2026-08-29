import { NextRequest, NextResponse } from 'next/server';
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';

/* ------------------------------------------------------------------ */
/*  Validation helpers                                                 */
/* ------------------------------------------------------------------ */

const PHONE_REGEX = /^[\d\s\+\-\(\)]{7,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  county?: string;
  systemSize?: string;
  billAmount?: string;
  message?: string;
}

function validateLead(data: Partial<LeadPayload>): string[] {
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

  return errors;
}

/* ------------------------------------------------------------------ */
/*  POST Handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();

    const errors = validateLead(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 },
      );
    }

    const leadRef = `RI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    try {
      await captureHubSpotLead({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        source: 'website-chat',
        submissionType: 'Chat lead request',
        reference: leadRef,
        details: {
          County: body.county?.trim(),
          'Interested system size': body.systemSize?.trim(),
          'Estimated monthly bill': body.billAmount?.trim(),
          Message: body.message?.trim(),
        },
      });
    } catch (error) {
      console.error('[Chat lead] HubSpot capture failed', { reference: leadRef });
      const failure = hubSpotFailureResponse(error);
      return NextResponse.json({ success: false, message: failure.message }, { status: failure.status });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your details have been received and our team will be in touch.',
      reference: leadRef,
    });
  } catch (error) {
    console.error('[Chat Lead API Error]', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
