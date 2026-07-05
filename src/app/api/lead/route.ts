import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SimpleLeadPayload {
  name: string;
  email: string;
  phone: string;
  county?: string;
  monthly_bill?: number;
  estimate_data?: {
    system_size_kwp: number;
    annual_savings: number;
    seai_grant: number;
    payback_years: number | null;
    net_cost: number;
  };
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SimpleLeadPayload;

    // Basic validation
    const errors: string[] = [];
    if (!body.name || body.name.trim().length < 2) errors.push("Name is required");
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.push("Valid email is required");
    if (!body.phone || body.phone.trim().length < 7)
      errors.push("Phone is required");

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join(". ") },
        { status: 400 }
      );
    }

    const notes = [
      body.estimate_data
        ? `Estimate: ${body.estimate_data.system_size_kwp}kWp system, €${body.estimate_data.annual_savings}/yr savings, €${body.estimate_data.seai_grant} SEAI grant, ${body.estimate_data.payback_years}yr payback, €${body.estimate_data.net_cost} net cost`
        : null,
      body.county ? `County: ${body.county}` : null,
      body.source ? `Source: ${body.source}` : null,
      "Lead from renewableireland.ie native estimate modal",
    ]
      .filter(Boolean)
      .join("\n");

    const { error: dbError } = await supabase.from("leads").insert({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      address: body.county ? `${body.county}, IE` : "IE",
      monthly_bill: body.monthly_bill || null,
      workflow_stage: "new",
      notes,
    });

    if (dbError) {
      console.error("[Lead] Supabase insert failed:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to save. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "We'll be in touch within 24 hours with your personalised quote.",
    });
  } catch (error) {
    console.error("[Lead] Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}