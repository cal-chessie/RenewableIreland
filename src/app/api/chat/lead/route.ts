import { NextRequest, NextResponse } from 'next/server';
import { forwardLeadToAisolar } from '@/lib/aisolar';
import { sendLeadEmail } from '@/lib/notify';

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

    // In production, this would save to a database (Prisma, etc.)
    // For now, we log and return success.
    console.log('[Chat Lead Captured]', {
      ref: leadRef,
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      county: body.county?.trim() ?? 'Not provided',
      systemSize: body.systemSize?.trim() ?? 'Not specified',
      billAmount: body.billAmount?.trim() ?? 'Not specified',
      message: body.message?.trim() ?? 'No message',
      capturedAt: new Date().toISOString(),
    });

    await sendLeadEmail(`New chat lead ${leadRef} — ${body.name.trim()}`, {
      Reference: leadRef,
      Name: body.name.trim(),
      Phone: body.phone.trim(),
      Email: body.email.trim(),
      County: body.county?.trim(),
      'System size': body.systemSize?.trim(),
      'Monthly bill': body.billAmount?.trim(),
      Message: body.message?.trim(),
    });

    await forwardLeadToAisolar({
      source: 'website_chat',
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      county: body.county?.trim(),
      message: body.message?.trim(),
      monthlyBill: parseFloat(body.billAmount) || undefined,
      meta: { reference: leadRef, systemSize: body.systemSize?.trim() },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your details have been submitted. Our team will contact you within 1 hour during business hours.',
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
