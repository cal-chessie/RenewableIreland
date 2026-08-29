import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[\d\s+()\-]{7,20}$/;
const windows = new Map<string, { count: number; resetAt: number }>();

export class IntakeError extends Error {
  constructor(public status: number, public publicMessage: string) { super(publicMessage); }
}

export async function readJsonObject(req: NextRequest, maxBytes = 16_384): Promise<Record<string, unknown>> {
  const type = req.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') throw new IntakeError(415, 'Content-Type must be application/json.');
  const declared = Number(req.headers.get('content-length') || 0);
  if (declared > maxBytes) throw new IntakeError(413, 'Request is too large.');
  const raw = await req.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) throw new IntakeError(413, 'Request is too large.');
  let value: unknown;
  try { value = JSON.parse(raw); } catch { throw new IntakeError(400, 'Invalid request body.'); }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new IntakeError(400, 'Invalid request body.');
  return value as Record<string, unknown>;
}

export function textField(body: Record<string, unknown>, key: string, max: number, required = false): string {
  const value = body[key];
  if (value == null || value === '') {
    if (required) throw new IntakeError(400, `${key} is required.`);
    return '';
  }
  if (typeof value !== 'string') throw new IntakeError(400, `${key} must be text.`);
  const clean = value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
  if (required && !clean) throw new IntakeError(400, `${key} is required.`);
  if (clean.length > max) throw new IntakeError(400, `${key} is too long.`);
  return clean;
}

export function boundedDetail(body: Record<string, unknown>, key: string, max = 2_000): unknown {
  const value = body[key];
  if (value == null) return undefined;
  const encoded = typeof value === 'string' ? value : JSON.stringify(value);
  if (new TextEncoder().encode(encoded).byteLength > max) throw new IntakeError(400, `${key} is too large.`);
  return value;
}

export function emailField(body: Record<string, unknown>, key = 'email'): string {
  const email = textField(body, key, 254, true).toLowerCase();
  if (!EMAIL.test(email)) throw new IntakeError(400, 'A valid email address is required.');
  return email;
}

export function phoneField(body: Record<string, unknown>, key = 'phone'): string {
  const phone = textField(body, key, 20, true);
  if (!PHONE.test(phone)) throw new IntakeError(400, 'A valid phone number is required.');
  return phone;
}

export function assertBrowserOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return;
  const allowed = new Set([req.nextUrl.origin, 'https://renewableireland.ie', 'https://www.renewableireland.ie']);
  if (!allowed.has(origin)) throw new IntakeError(403, 'Request origin is not allowed.');
}

export function localBurstLimit(req: NextRequest, route: string, limit: number, windowMs = 15 * 60_000) {
  const now = Date.now();
  if (windows.size > 5_000) for (const [key, value] of windows) if (value.resetAt <= now) windows.delete(key);
  const ip = (req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown').trim();
  const key = `${route}:${ip}`;
  const current = windows.get(key);
  if (!current || current.resetAt <= now) { windows.set(key, { count: 1, resetAt: now + windowMs }); return; }
  if (current.count >= limit) throw new IntakeError(429, 'Too many requests. Please wait and try again.');
  current.count += 1;
}

export function intakeFailure(error: unknown) {
  if (error instanceof IntakeError) return NextResponse.json({ success: false, message: error.publicMessage }, { status: error.status, headers: { 'Cache-Control': 'no-store' } });
  return NextResponse.json({ success: false, message: 'We could not safely process your request. Please try again.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
}

export function reference(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString('hex').toUpperCase()}`;
}
