import { NextRequest, NextResponse } from 'next/server';
import { assertBrowserOrigin, intakeFailure, localBurstLimit, readJsonObject, textField } from '@/lib/intake';

export async function POST(request: NextRequest) {
  try {
    assertBrowserOrigin(request);
    localBurstLimit(request, 'dismiss', 30);
    const body = await readJsonObject(request, 2_048);
    textField(body, 'variant', 40);
    // Deliberately no fake analytics acknowledgement: dismissal is a client-side
    // preference until a real consent-aware analytics sink is configured.
    return new NextResponse(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return intakeFailure(error);
  }
}
