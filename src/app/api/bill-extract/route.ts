import { NextResponse } from 'next/server';

// Bill uploads can contain account numbers, meter identifiers and home
// addresses. This endpoint remains closed until the collection notice,
// retention policy, file validation and approved processing route are live.
export async function POST() {
  return NextResponse.json(
    { success: false, message: 'Bill upload is not available yet. Please use the enquiry form or contact us directly.' },
    { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '86400' } },
  );
}
