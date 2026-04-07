import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variant, timestamp } = body as {
      variant?: string;
      timestamp?: number;
    };

    // ─── Log dismissal for analytics ────────────────────
    console.log(`[Exit Intent] Popup dismissed:`, {
      variant: variant || 'unknown',
      timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
      engagementTime: timestamp ? Date.now() - timestamp : null,
    });

    // ─── In production, this would: ─────────────────────
    // 1. Store in analytics database
    // 2. Track A/B test variant performance
    // 3. Update conversion funnel metrics
    // 4. Feed into ML model for optimal timing

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
