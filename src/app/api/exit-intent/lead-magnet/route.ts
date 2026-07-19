import { NextRequest, NextResponse } from 'next/server';
import { forwardLeadToAisolar } from '@/lib/aisolar';
import { sendLeadEmail } from '@/lib/notify';

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

    // ─── Log lead magnet download ───────────────────────
    console.log(`[Exit Intent] Lead magnet download requested:`, {
      name: sanitizedName,
      email: sanitisedEmail,
      timestamp: new Date().toISOString(),
      source: 'exit-intent-popup',
    });

    await sendLeadEmail(`Lead magnet download — ${sanitizedName}`, {
      Name: sanitizedName,
      Email: sanitisedEmail,
      Source: 'exit-intent-popup',
    });

    await forwardLeadToAisolar({
      source: 'exit_intent',
      name: sanitizedName,
      email: sanitisedEmail,
    });

    // ─── In production, this would: ─────────────────────
    // 1. Save to database (Prisma)
    // 2. Trigger email with PDF guide attached (SendGrid/Mailgun)
    // 3. Add to CRM/marketing automation (HubSpot/Mailchimp)
    // 4. Create/merge contact record

    // ─── Response ───────────────────────────────────────
    return NextResponse.json({
      success: true,
      message: `Guide sent to ${sanitisedEmail}`,
      reference: `LM-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
