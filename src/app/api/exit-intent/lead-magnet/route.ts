import { NextRequest, NextResponse } from 'next/server';
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body as { name?: string; email?: string };

    // ─── Validation ─────────────────────────────────────
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name is required (at least 2 characters)' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    const sanitizedName = name.trim().slice(0, 100);
    const sanitisedEmail = email.trim().slice(0, 254).toLowerCase();

    const reference = `LM-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    try {
      await captureHubSpotLead({
        name: sanitizedName,
        email: sanitisedEmail,
        createDeal: false,
        source: 'exit-intent-popup',
        submissionType: 'Guide request — delivery not yet automated',
        reference,
        details: { Request: 'Website guide' },
      });
    } catch (error) {
      console.error('[Guide request] HubSpot capture failed', { reference });
      const failure = hubSpotFailureResponse(error);
      return NextResponse.json({ success: false, error: failure.message }, { status: failure.status });
    }

    // ─── Response ───────────────────────────────────────
    return NextResponse.json({
      success: true,
      message: 'Your guide request has been received. Our team will be in touch.',
      reference,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
