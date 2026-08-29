import { NextRequest, NextResponse } from 'next/server';
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';

const PHONE_REGEX = /^[\d\s\+\-\(\)]{7,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const county = (body.county || '').trim();
    const monthly_bill = body.monthly_bill;
    const estimate_data = body.estimate_data;
    const source = (body.source || 'website').trim();

    const errors: string[] = [];
    if (!name || name.length < 2) errors.push('Name is required');
    if (!email || !EMAIL_REGEX.test(email)) errors.push('Valid email is required');
    if (!phone || !PHONE_REGEX.test(phone)) errors.push('Valid phone is required');

    if (errors.length > 0) {
      return NextResponse.json({ success: false, message: errors.join('. ') }, { status: 400 });
    }

    const leadRef = `RI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    try {
      await captureHubSpotLead({
        name,
        email,
        phone,
        source,
        submissionType: 'Website quote request',
        reference: leadRef,
        details: {
          County: county,
          'Monthly electricity bill': monthly_bill,
          Estimate: estimate_data,
        },
      });
    } catch (error) {
      console.error('[Lead] HubSpot capture failed', { reference: leadRef });
      const failure = hubSpotFailureResponse(error);
      return NextResponse.json({ success: false, message: failure.message }, { status: failure.status });
    }

    return NextResponse.json({ success: true, message: 'Quote request received!', reference: leadRef });
  } catch (error) {
    console.error('[Lead API Error]', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
