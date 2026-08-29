import { NextRequest, NextResponse } from 'next/server';
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';
import { assertBrowserOrigin, emailField, intakeFailure, localBurstLimit, phoneField, readJsonObject, reference, textField } from '@/lib/intake';

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
    assertBrowserOrigin(req);
    localBurstLimit(req, 'chat-lead', 10);
    const raw = await readJsonObject(req);
    const body: LeadPayload = {
      name: textField(raw, 'name', 100, true), phone: phoneField(raw), email: emailField(raw),
      county: textField(raw, 'county', 80), systemSize: textField(raw, 'systemSize', 40),
      billAmount: textField(raw, 'billAmount', 40), message: textField(raw, 'message', 1_000),
    };

    const errors = validateLead(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 },
      );
    }

    const leadRef = reference('RI');

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
    return intakeFailure(error);
  }
}
