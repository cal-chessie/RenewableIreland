import { NextRequest, NextResponse } from 'next/server';

// ─── Types ───
interface EstimateData {
  system_size_kwp?: number;
  annual_savings?: number;
  seai_grant?: number;
  payback_years?: number | null;
  net_cost?: number;
}

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  county?: string;
  monthly_bill?: number;
  estimate_data?: EstimateData;
  source?: string;
  mprn?: string;
  supplier?: string;
  billing_period?: string;
  usage_kwh?: number;
  tariff?: string;
}

// ─── Validation ───
function validatePayload(data: LeadPayload): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.phone || data.phone.replace(/[\s\-\(\)]/g, '').length < 7) {
    errors.push('Valid phone number is required (min 7 digits)');
  }

  return { valid: errors.length === 0, errors };
}

// ─── Generate unique reference ───
function generateReference(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RI-EM-${year}-${code}`;
}

// ─── Lazy Supabase init (only if env vars exist) ───
let supabaseClient: ReturnType<typeof import('@supabase/supabase-js').createClient> | null = null;
let supabaseChecked = false;

function getSupabase() {
  if (supabaseChecked) return supabaseClient;
  supabaseChecked = true;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('[Lead API] Supabase env vars not set — leads will be logged only');
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require('@supabase/supabase-js');
    supabaseClient = createClient(url, key);
    return supabaseClient;
  } catch (e) {
    console.error('[Lead API] Failed to init Supabase:', e);
    return null;
  }
}

// ─── POST Handler ───
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadPayload;

    // Validate
    const validation = validatePayload(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.errors.join('. ') },
        { status: 400 }
      );
    }

    const reference = generateReference();
    const firstName = body.name.trim().split(' ')[0];

    // Build notes from estimate data + bill extract data
    const notesParts: string[] = [];
    notesParts.push(`Source: ${body.source || 'native-estimate-modal'}`);

    if (body.monthly_bill) {
      notesParts.push(`Monthly bill: €${body.monthly_bill}`);
    }

    if (body.estimate_data) {
      const ed = body.estimate_data;
      if (ed.system_size_kwp) notesParts.push(`System: ${ed.system_size_kwp} kWp`);
      if (ed.annual_savings) notesParts.push(`Annual savings: €${ed.annual_savings}`);
      if (ed.seai_grant) notesParts.push(`SEAI grant: €${ed.seai_grant}`);
      if (ed.payback_years) notesParts.push(`Payback: ${ed.payback_years} years`);
      if (ed.net_cost) notesParts.push(`Net cost: €${ed.net_cost}`);
    }

    if (body.supplier) notesParts.push(`Supplier: ${body.supplier}`);
    if (body.mprn) notesParts.push(`MPRN: ${body.mprn}`);
    if (body.billing_period) notesParts.push(`Billing period: ${body.billing_period}`);
    if (body.usage_kwh) notesParts.push(`Usage: ${body.usage_kwh} kWh`);
    if (body.tariff) notesParts.push(`Tariff: ${body.tariff}`);

    const notes = notesParts.join('\n');

    // Try Supabase insert
    const supabase = getSupabase();
    if (supabase) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: dbError } = await (supabase.from('leads').insert({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        address: body.county ? `${body.county}, Ireland` : null,
        monthly_bill: body.monthly_bill || null,
        workflow_stage: 'estimate-modal',
        notes,
      }) as any);

      if (dbError) {
        console.error('[Lead API] Supabase insert failed:', dbError);
        // Don't fail the request — log and continue so the user still gets to step 4
        console.log('[Lead API] Fallback: lead logged to console instead');
        console.log('[Lead API]', JSON.stringify({ reference, ...body, notes }, null, 2));
      }
    } else {
      // No Supabase — log to console (development mode)
      console.log('[Lead API] Lead captured (no DB):', JSON.stringify({ reference, ...body, notes }, null, 2));
    }

    return NextResponse.json({
      success: true,
      reference,
      firstName,
    });
  } catch (error) {
    console.error('[Lead API] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}