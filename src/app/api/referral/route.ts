import { NextResponse } from 'next/server';

// Disabled until referrals use a durable ledger and approved reward terms.
// The former demo used ephemeral memory and invented activity figures.
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'The referral programme is not currently available.' },
    { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '86400' } },
  );
}
