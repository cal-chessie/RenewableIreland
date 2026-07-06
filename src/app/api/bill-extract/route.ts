import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const SYSTEM_PROMPT = `You are an expert at reading Irish electricity bills. Extract the following from the bill image:

1. **supplier** - The energy supplier name (e.g. "Electric Ireland", "Bord Gáis Energy", "SSE Airtricity", "Pumpkin", "Energia", "Flogas", "PrepayPower", "Yuno", "Community Power", etc.)
2. **monthly_amount** - The monthly bill amount in euros (€). Look for the total due, current charges, or "amount payable". Return as a number only.
3. **billing_period** - The billing period if visible (e.g. "1 May 2025 - 31 May 2025")
4. **account_number** - The account number if visible
5. **mpx** - The MPRN or MPAN number if visible

Return ONLY valid JSON with this exact structure:
{
  "supplier": "Supplier Name",
  "monthly_amount": 150,
  "billing_period": "period if found",
  "account_number": "if found",
  "mpx": "MPRN/MPAN if found",
  "confidence": "high|medium|low",
  "message": "Brief note about what was found"
}

Rules:
- If you can't determine the supplier, return null for it
- If you can't find a clear monthly amount, estimate based on any charges shown and set confidence to "low"
- Always return valid JSON, no markdown
- Amounts should be in euros as a number (not a string)
- If the image is not a bill or is unreadable, return {"success": false, "message": "description of the problem"}`;

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
        { success: false, message: 'Invalid file type. Please upload a PDF, JPG or PNG.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File too large (max 10MB).' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mimeType = file.type;

    // Use ZAI vision to read the bill
    const zai = await ZAI.create();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const completion = await (zai.chat.completions.create as any)({
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
      max_tokens: 500,
      temperature: 0.1,
    });

    const responseText = completion.choices?.[0]?.message?.content ?? '';

    // Try to parse the response as JSON
    let parsed;
    try {
      // Strip markdown code blocks if present
      const cleanJson = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      return NextResponse.json({
        success: false,
        message: 'Could not parse the bill. Please try again or enter details manually.',
        debug: 'parse_error',
      });
    }

    // Check if the model said it couldn't read it
    if (parsed.success === false) {
      return NextResponse.json({
        success: false,
        message: parsed.message || 'Could not read this bill.',
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

    // Clamp to reasonable range (€20-€1000/month)
    const clampedAmount = Math.max(20, Math.min(1000, Math.round(monthlyAmount)));

    return NextResponse.json({
      success: true,
      data: {
        monthly_amount: clampedAmount,
        supplier: parsed.supplier || null,
        billing_period: parsed.billing_period || null,
        account_number: parsed.account_number || null,
        mpx: parsed.mpx || null,
        confidence: parsed.confidence || 'medium',
        message: parsed.message || null,
      },
    });
  } catch (error) {
    console.error('Bill extract error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again or enter your details manually.',
      },
      { status: 500 }
    );
  }
}