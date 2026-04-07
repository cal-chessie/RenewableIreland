import { NextRequest, NextResponse } from "next/server";
import { calculateSavings } from "@/lib/savings-calculator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, county, homeType, systemSize, billAmount } = body;

    // Validate required fields
    if (!fullName || !county || !homeType || !systemSize || !billAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Determine country based on NI counties
    const niCounties = [
      "antrim", "armagh", "down", "fermanagh", "londonderry", "tyrone",
    ];
    const countySlug = county.toLowerCase();
    const country: "IE" | "GB" = niCounties.includes(countySlug) ? "GB" : "IE";

    // Map homeType to calculator format
    const homeTypeMap: Record<string, string> = {
      "Detached": "Detached House",
      "Semi": "Semi-Detached",
      "Terraced": "Terraced",
      "Bungalow": "Bungalow",
    };

    // Calculate savings
    const result = calculateSavings({
      billAmount: Number(billAmount),
      homeType: homeTypeMap[homeType] || homeType,
      county: countySlug,
      country,
    });

    // Generate certificate number
    const certNum = `RI-ROI-2026-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`;

    // Get formatted date
    const now = new Date();
    const generatedDate = now.toLocaleDateString("en-IE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return NextResponse.json({
      success: true,
      data: {
        fullName,
        county,
        systemSize,
        homeType,
        result,
        certificateNumber: certNum,
        generatedDate,
      },
    });
  } catch (error) {
    console.error("ROI Certificate API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
