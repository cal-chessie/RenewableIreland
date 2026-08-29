import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: false, message: 'The savings calculator is being reviewed before publication.' },
    { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '86400' } },
  );
}
