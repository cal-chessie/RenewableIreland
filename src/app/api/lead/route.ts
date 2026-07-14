// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';

const PHONE_REGEX = /^[\d\s\+\-\(\)]{7,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const county = (body.county || '').trim();
    const monthly_bill = body.monthly_bill;
    const estimate_data = body.estimate_data;
    const source = (body.source || 'website').trim();

    const errors = [];
    if (!name || name.length < 2) errors.push('Name is required');
    if (!email || !EMAIL_REGEX.test(email)) errors.push('Valid email is required');
    if (!phone || !PHONE_REGEX.test(phone)) errors.push('Valid phone is required');

    if (errors.length > 0) {
      return NextResponse.json({ success: false, message: errors.join('. ') }, { status: 400 });
    }

    const leadRef = `RI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Build notes from extra data
    const notesParts = [
      source !== 'website' ? `Source: ${source}` : 'Lead from renewableireland.ie',
      county ? `County: ${county}` : null,
      estimate_data ? `Estimate: ${JSON.stringify(estimate_data)}` : null,
      `Ref: ${leadRef}`,
    ].filter(Boolean).join('\n');

    console.log('[Lead Captured]', { ref: leadRef, name, email, phone, county, monthly_bill, source });

    // Save to Supabase using AISolar leads schema
    try {
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase.from('leads').insert({
          name,
          email,
          phone: phone || null,
          monthly_bill: monthly_bill ?? null,
          workflow_stage: 'new',
          notes: notesParts,
          tenant_id: process.env.NEXT_PUBLIC_TENANT_ID,
          brand: process.env.NEXT_PUBLIC_BRAND,
        });
        if (error) {
          console.error('[Lead] Supabase insert error:', error);
        } else {
          console.log('[Lead] Saved to Supabase (AISolar schema)');
        }
      }
    } catch (dbErr) {
      console.error('[Lead] Supabase error (non-fatal):', dbErr?.message || dbErr);
    }

    return NextResponse.json({ success: true, message: 'Quote request received!', reference: leadRef });
  } catch (error) {
    console.error('[Lead API Error]', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}