import { NextRequest, NextResponse } from 'next/server';
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';
import { assertBrowserOrigin, emailField, intakeFailure, localBurstLimit, readJsonObject, reference, textField } from '@/lib/intake';

export async function POST(request: NextRequest) {
  try {
    assertBrowserOrigin(request);
    localBurstLimit(request, 'guide', 6);
    const body = await readJsonObject(request, 4_096);
    const name = textField(body, 'name', 100, true);
    const email = emailField(body);

    // ─── Validation ─────────────────────────────────────
    if (name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name is required (at least 2 characters)' },
        { status: 400 }
      );
    }

    const sanitizedName = name;
    const sanitisedEmail = email;

    const requestReference = reference('LM');
    try {
      await captureHubSpotLead({
        name: sanitizedName,
        email: sanitisedEmail,
        createDeal: false,
        source: 'exit-intent-popup',
        submissionType: 'Guide request — delivery not yet automated',
        reference: requestReference,
        details: { Request: 'Website guide' },
      });
    } catch (error) {
      console.error('[Guide request] HubSpot capture failed', { reference: requestReference });
      const failure = hubSpotFailureResponse(error);
      return NextResponse.json({ success: false, error: failure.message }, { status: failure.status });
    }

    // ─── Response ───────────────────────────────────────
    return NextResponse.json({
      success: true,
      message: 'Your guide request has been received. Our team will be in touch.',
      reference: requestReference,
    });
  } catch (error) {
    return intakeFailure(error);
  }
}
