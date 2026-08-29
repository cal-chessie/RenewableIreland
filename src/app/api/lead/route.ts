import { NextRequest, NextResponse } from 'next/server';
import { captureHubSpotLead, hubSpotFailureResponse } from '@/lib/hubspot';
import { assertBrowserOrigin, boundedDetail, emailField, IntakeError, intakeFailure, localBurstLimit, phoneField, readJsonObject, reference, textField } from '@/lib/intake';

export async function POST(req: NextRequest) {
  try {
    assertBrowserOrigin(req);
    localBurstLimit(req, 'lead', 10);
    const body = await readJsonObject(req);
    const name = textField(body, 'name', 100, true);
    if (name.length < 2) throw new IntakeError(400, 'Name must be at least 2 characters.');
    const email = emailField(body);
    const phone = phoneField(body);
    const county = textField(body, 'county', 80);
    const monthly_bill = textField(body, 'monthly_bill', 40);
    const estimate_data = boundedDetail(body, 'estimate_data');
    const intake_data = boundedDetail(body, 'intake_data');
    // Source is owned by this endpoint, not by an untrusted browser payload.
    const source = 'website';
    const leadRef = reference('RI');

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
          'Bill scan': intake_data,
        },
      });
    } catch (error) {
      console.error('[Lead] HubSpot capture failed', { reference: leadRef });
      const failure = hubSpotFailureResponse(error);
      return NextResponse.json({ success: false, message: failure.message }, { status: failure.status });
    }

    return NextResponse.json({ success: true, message: 'Quote request received!', reference: leadRef });
  } catch (error) {
    return intakeFailure(error);
  }
}
