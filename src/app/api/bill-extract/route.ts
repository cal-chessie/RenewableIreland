// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert at reading Irish electricity bills. You MUST first verify this is actually an electricity or gas utility bill — NOT a photo of a car, dog, house, receipt, invoice for other services, or any non-utility document.

If the image is NOT an electricity/gas bill, respond with exactly:
{"is_bill": false, "reason": "brief description of what the image actually shows"}

If it IS a valid electricity/gas bill, extract ALL of the following sensitive details:

1. **supplier** - The energy supplier name (e.g. "Electric Ireland", "Bord Gáis Energy", "SSE Airtricity", "Pumpkin", "Energia", "Flogas", "PrepayPower", "Yuno", "Community Power", "Pinergy", "Budget Energy", "Iberdrola", "Tap Electric", etc.)
2. **monthly_amount** - The bill amount in euros (€). Look for "total due", "amount payable", "current charges", or the final total. Return as a number.
3. **billing_period** - The billing period (e.g. "1 May 2025 - 31 May 2025")
4. **account_number** - The customer account number
5. **mprn** - The MPRN (Meter Point Reference Number) — this is an 11-digit number unique to Irish electricity meters. Critical for solar applications.
6. **mpan** - The MPAN if it's a UK/Northern Ireland gas bill
7. **name** - The account holder's name as shown on the bill
8. **address** - The supply address as shown on the bill
9. **usage_kwh** - The electricity usage in kWh if shown
10. **tariff** - The tariff name or plan if visible (e.g. "Standard 24hr", "Urban 24hr", "Time of Use Nightsaver")
11. **standing_charge** - The daily standing charge amount
12. **unit_rate** - The per-kWh unit rate

Return ONLY valid JSON:
{
  "is_bill": true,
  "supplier": "Supplier Name",
  "monthly_amount": 150,
  "billing_period": "period if found",
  "account_number": "if found",
  "mprn": "11-digit MPRN if found",
  "mpan": "MPAN if found",
  "name": "account holder name if found",
  "address": "supply address if found",
  "usage_kwh": number or null,
  "tariff": "tariff name if found",
  "standing_charge": number or null,
  "unit_rate": number or null,
  "confidence": "high|medium|low",
  "message": "Brief note about what was found or any issues"
}

Rules:
- NEVER guess or fabricate numbers. Only return what you can actually read from the bill.
- If a field is not visible, return null for it — do NOT make it up.
- The MPRN is critical for SEAI grant applications. Look carefully for it — it's usually near the top or in a "Your supply details" section.
- Always return valid JSON, no markdown wrapping.
- Amounts should be numbers (not strings).
- Confidence "high" = all key fields clearly readable. "medium" = amount and supplier clear but some details unclear. "low" = partially readable or estimated.`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('bill') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Please upload a PDF, JPG or PNG of your electricity bill.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB raw max — client compresses images before upload)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File too large. Take a clearer photo closer to the bill.' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');

    // Safety: reject if base64 payload exceeds 4MB (Vercel body limit headroom)
    if (base64.length > 4 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'Image too large after processing. Please take a closer, clearer photo of your bill.' },
        { status: 400 }
      );
    }
    const mimeType = file.type === 'image/jpg' ? 'image/jpeg' : file.type;

    // Use OpenAI with Vercel env keys
    const openai = new OpenAI();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const completion = await (openai.chat.completions.create as any)({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: SYSTEM_PROMPT },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64}`,
                detail: 'high',
              },
            },
          ],
        },
      ],
      max_tokens: 800,
      temperature: 0.05,
    });

    const responseText = completion.choices?.[0]?.message?.content ?? '';

    // Try to parse the response as JSON
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      return NextResponse.json({
        success: false,
        message: 'Could not read the bill. Please try again or enter details manually.',
        debug: 'parse_error',
      });
    }

    // If model says it's not a bill, reject it
    if (parsed.is_bill === false) {
      return NextResponse.json({
        success: false,
        message: `That doesn't look like an electricity bill${parsed.reason ? ' — ' + parsed.reason : ''}. Please upload a photo of your electricity or gas bill.`,
        debug: 'not_a_bill',
      });
    }

    // Validate we got a monthly amount
    const monthlyAmount = parsed.monthly_amount;
    if (!monthlyAmount || typeof monthlyAmount !== 'number' || monthlyAmount <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Could not find a bill amount. Please enter your monthly bill manually.',
        debug: 'no_amount',
      });
    }

    // Clamp to reasonable range
    const clampedAmount = Math.max(20, Math.min(1000, Math.round(monthlyAmount)));

    return NextResponse.json({
      success: true,
      data: {
        monthly_amount: clampedAmount,
        supplier: parsed.supplier ?? null,
        billing_period: parsed.billing_period ?? null,
        account_number: parsed.account_number ?? null,
        mprn: parsed.mprn ?? null,
        mpan: parsed.mpan ?? null,
        name: parsed.name ?? null,
        address: parsed.address ?? null,
        usage_kwh: parsed.usage_kwh ?? null,
        tariff: parsed.tariff ?? null,
        standing_charge: parsed.standing_charge ?? null,
        unit_rate: parsed.unit_rate ?? null,
        confidence: parsed.confidence ?? 'medium',
        message: parsed.message ?? null,
      },
    });
  } catch (error) {
    console.error('Bill extract error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong reading your bill. Please try again or enter details manually.',
        debug: msg.includes('API key') ? 'api_key_missing' : undefined,
      },
      { status: 500 }
    );
  }
}