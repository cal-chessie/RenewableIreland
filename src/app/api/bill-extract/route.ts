import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { assertBrowserOrigin, IntakeError, intakeFailure, localBurstLimit } from '@/lib/intake';

export const maxDuration = 30;

const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);

const schema = {
  type: 'object', additionalProperties: false,
  properties: {
    is_bill: { type: 'boolean' },
    supplier: { type: ['string', 'null'] },
    account_holder_name: { type: ['string', 'null'] },
    supply_address: { type: ['string', 'null'] },
    account_number: { type: ['string', 'null'] },
    mprn: { type: ['string', 'null'] },
    mpan: { type: ['string', 'null'] },
    monthly_amount: { type: ['number', 'null'] },
    billing_period: { type: ['string', 'null'] },
    usage_kwh: { type: ['number', 'null'] },
    tariff: { type: ['string', 'null'] },
    unit_rate: { type: ['string', 'null'] },
    standing_charge: { type: ['string', 'null'] },
    meter_type: { type: ['string', 'null'] },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
  },
  required: ['is_bill', 'supplier', 'account_holder_name', 'supply_address', 'account_number', 'mprn', 'mpan', 'monthly_amount', 'billing_period', 'usage_kwh', 'tariff', 'unit_rate', 'standing_charge', 'meter_type', 'confidence'],
} as const;

function hasExpectedSignature(bytes: Uint8Array, type: string) {
  if (type === 'application/pdf') return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-';
  if (type === 'image/png') return bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((value, index) => bytes[index] === value);
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function asNullableString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 500) : null;
}

export async function POST(req: NextRequest) {
  try {
    assertBrowserOrigin(req);
    localBurstLimit(req, 'bill-extract', 3);
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_FILE_BYTES + 50_000) throw new IntakeError(413, 'File is too large. Please upload a file under 4 MB.');

    const form = await req.formData();
    if (form.get('consent') !== 'yes') throw new IntakeError(400, 'Please confirm that we may analyse this bill for your estimate.');
    const file = form.get('bill');
    if (!(file instanceof File)) throw new IntakeError(400, 'Please choose a PDF, JPG or PNG bill.');
    const type = file.type === 'image/jpg' ? 'image/jpeg' : file.type;
    if (!ALLOWED_TYPES.has(type)) throw new IntakeError(400, 'Please upload a PDF, JPG or PNG bill.');
    if (!file.size || file.size > MAX_FILE_BYTES) throw new IntakeError(413, 'File is too large. Please upload a file under 4 MB.');

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!hasExpectedSignature(bytes, type)) throw new IntakeError(400, 'The file contents do not match the selected file type.');
    const base64 = Buffer.from(bytes).toString('base64');
    const fileData = `data:${type};base64,${base64}`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new IntakeError(503, 'Bill analysis is temporarily unavailable. Please enter your bill manually.');
    const client = new OpenAI({ apiKey, timeout: 25_000, maxRetries: 1 });
    const content = type === 'application/pdf'
      ? [{ type: 'input_file' as const, filename: 'electricity-bill.pdf', file_data: fileData }]
      : [{ type: 'input_image' as const, image_url: fileData, detail: 'high' as const }];

    const response = await client.responses.create({
      model: 'gpt-4o',
      store: false,
      input: [{
        role: 'user',
        content: [{
          type: 'input_text',
          text: 'Check whether this is an electricity or gas bill. If it is, extract every useful bill field in the supplied schema exactly as printed: supplier, account holder name, supply address, account number, MPRN or MPAN, amount due for the billing period, billing period, consumption in kWh, tariff name, unit rate, standing charge and meter type. Do not extract payment-card, bank or direct-debit details. Never guess, calculate, combine or normalise an uncertain value: return null for anything not clearly shown.',
        }, ...content],
      }],
      text: { format: { type: 'json_schema', name: 'bill_summary', strict: true, schema } },
    });

    let parsed: Record<string, unknown>;
    try { parsed = JSON.parse(response.output_text) as Record<string, unknown>; }
    catch { throw new IntakeError(502, 'We could not read that bill. Please enter your bill manually.'); }
    if (parsed.is_bill !== true) throw new IntakeError(400, 'That does not appear to be an electricity or gas bill.');
    const amount = typeof parsed.monthly_amount === 'number' && Number.isFinite(parsed.monthly_amount) ? parsed.monthly_amount : null;
    const usableAmount = amount !== null && amount > 0 && amount <= 10_000 ? amount : null;

    return NextResponse.json({ success: true, data: {
      monthly_amount: usableAmount === null ? null : Math.round(usableAmount * 100) / 100,
      supplier: asNullableString(parsed.supplier),
      account_holder_name: asNullableString(parsed.account_holder_name),
      supply_address: asNullableString(parsed.supply_address),
      account_number: asNullableString(parsed.account_number),
      mprn: asNullableString(parsed.mprn),
      mpan: asNullableString(parsed.mpan),
      billing_period: asNullableString(parsed.billing_period),
      usage_kwh: typeof parsed.usage_kwh === 'number' && Number.isFinite(parsed.usage_kwh) ? parsed.usage_kwh : null,
      tariff: asNullableString(parsed.tariff),
      unit_rate: asNullableString(parsed.unit_rate),
      standing_charge: asNullableString(parsed.standing_charge),
      meter_type: asNullableString(parsed.meter_type),
      confidence: parsed.confidence === 'high' || parsed.confidence === 'low' ? parsed.confidence : 'medium',
    } }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (!(error instanceof IntakeError)) console.error('[Bill extract] processing failed');
    return intakeFailure(error);
  }
}
