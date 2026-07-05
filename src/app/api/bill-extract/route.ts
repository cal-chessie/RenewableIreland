import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BillExtraction {
  supplier: string;
  monthly_amount: number | null;
  annual_amount: number | null;
  bill_period: string;
  tariff_name: string;
  confidence: "high" | "medium" | "low";
}

/* ------------------------------------------------------------------ */
/*  Extraction prompt                                                  */
/* ------------------------------------------------------------------ */

const EXTRACTION_PROMPT = `You are a bill extraction assistant for an Irish solar company. Analyse this electricity bill image and extract the following information. Return ONLY valid JSON — no markdown fences, no commentary.

Fields to extract:
- "supplier": The electricity supplier name (e.g. "Electric Ireland", "Bord Gáis Energy", "Energia", "SSE Airtricity", "Pinergy", "Community Power", "Yuno Energy", "PrepayPower")
- "monthly_amount": The total amount due this billing period in euros (number, e.g. 187.42). If the bill is monthly, use that figure. If it covers 2 months (bimonthly Irish standard), halve it to get a monthly figure.
- "annual_amount": If the bill shows an annual estimate or annual total, provide it. Otherwise calculate from monthly_amount × 12.
- "bill_period": The billing period shown (e.g. "1 Mar 2025 – 31 Mar 2025")
- "tariff_name": The name of the tariff/plan if visible (e.g. "Standard 24hr", "Urban 24hr", "NightSaver")
- "confidence": "high" if all key fields are clearly readable, "medium" if some fields are unclear, "low" if the bill is hard to read or incomplete

Important Irish bill context:
- Most Irish electricity bills are bimonthly (every 2 months)
- Common suppliers: Electric Ireland (largest), Bord Gáis Energy, Energia, SSE Airtricity, Pinergy, Community Power, Yuno Energy, PrepayPower, Panda Power
- Currency is always EUR (€)
- If you cannot determine a field, use null for numeric fields and "" for string fields
- If the document is not an electricity bill, set all amounts to null and confidence to "low"`;

/* ------------------------------------------------------------------ */
/*  PDF text extraction fallback                                       */
/* ------------------------------------------------------------------ */

async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import to avoid bundling issues on Vercel
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text || "";
  } catch (err) {
    console.error("[BillExtract] PDF parse failed:", err);
    return "";
  }
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("bill") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unsupported file type. Please upload a PDF, JPG, or PNG.",
        },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extraction: BillExtraction;

    if (file.type === "application/pdf") {
      // For PDFs: extract text, then send to LLM for parsing
      const pdfText = await extractPdfText(buffer);

      if (!pdfText.trim()) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Could not read this PDF. Try taking a photo of your bill instead.",
          },
          { status: 422 }
        );
      }

      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: EXTRACTION_PROMPT,
          },
          {
            role: "user",
            content: `Here is the extracted text from an Irish electricity bill PDF:\n\n---\n${pdfText.slice(0, 4000)}\n---\n\nExtract the billing data and return ONLY valid JSON.`,
          },
        ],
        temperature: 0.1,
        max_tokens: 500,
      });

      const raw = completion.choices?.[0]?.message?.content?.trim() || "";
      extraction = parseExtraction(raw);
    } else {
      // For images: send base64 to VLM
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;

      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: EXTRACTION_PROMPT,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract the billing data from this electricity bill image and return ONLY valid JSON.",
              },
              {
                type: "image_url",
                image_url: { url: dataUrl },
              },
            ],
          },
        ],
        temperature: 0.1,
        max_tokens: 500,
      });

      const raw = completion.choices?.[0]?.message?.content?.trim() || "";
      extraction = parseExtraction(raw);
    }

    // Validate we got something useful
    if (!extraction.monthly_amount && !extraction.annual_amount) {
      return NextResponse.json({
        success: true,
        data: extraction,
        message:
          "We couldn't read a specific amount from this bill, but you can set it manually in the next step.",
      });
    }

    return NextResponse.json({ success: true, data: extraction });
  } catch (error) {
    console.error("[BillExtract] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong analysing your bill. Please try again or enter your details manually.",
      },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */
/*  Parse LLM JSON response                                            */
/* ------------------------------------------------------------------ */

function parseExtraction(raw: string): BillExtraction {
  // Strip markdown code fences if present
  let cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

  // Try to extract JSON from the response (handle cases where LLM adds extra text)
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      supplier: "",
      monthly_amount: null,
      annual_amount: null,
      bill_period: "",
      tariff_name: "",
      confidence: "low",
    };
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);

    // If the bill is bimonthly and monthly_amount looks too high, halve it
    let monthly = parsed.monthly_amount;
    if (monthly && monthly > 600) {
      // Most Irish bills over €600 are likely bimonthly
      monthly = Math.round(monthly / 2 * 100) / 100;
    }

    // Derive annual if missing but monthly is present
    let annual = parsed.annual_amount;
    if (!annual && monthly) {
      annual = Math.round(monthly * 12 * 100) / 100;
    }

    return {
      supplier: parsed.supplier || "",
      monthly_amount: monthly || null,
      annual_amount: annual || null,
      bill_period: parsed.bill_period || "",
      tariff_name: parsed.tariff_name || "",
      confidence: parsed.confidence || "medium",
    };
  } catch {
    return {
      supplier: "",
      monthly_amount: null,
      annual_amount: null,
      bill_period: "",
      tariff_name: "",
      confidence: "low",
    };
  }
}