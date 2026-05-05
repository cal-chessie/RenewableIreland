import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

/* ------------------------------------------------------------------ */
/*  Rate Limiter (simple in-memory)                                    */
/* ------------------------------------------------------------------ */

const sessions = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES = 20;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(sessionId: string): boolean {
  const now = Date.now();
  let entry = sessions.get(sessionId);

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    sessions.set(sessionId, entry);
  }

  entry.count++;
  return entry.count > MAX_MESSAGES;
}

/* ------------------------------------------------------------------ */
/*  System Prompt                                                      */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `You are SolarBot, the friendly and knowledgeable AI assistant for Renewable Ireland — Ireland's most trusted solar panel installation company. You help homeowners across Ireland and Northern Ireland with solar panel questions, SEAI grant information, system sizing, pricing, ROI calculations, battery storage, and booking surveys.

Be concise but thorough. Use a warm, professional Irish tone. Use bullet points and short paragraphs for readability. When relevant, include inline card tags so the UI can render rich content.

## Company Overview
- Company: Renewable Ireland
- Established: 2018, Dublin
- Installations: 2,847+ completed nationwide
- Rating: 4.9★ (Google Reviews)
- Installation speed: Most systems installed in 1 day
- Office: Unit 12, Sandyford Business Centre, Dublin, D18 A4K9
- Phone: +353 87 395 8424
- Email: hello@renewableireland.ie
- Hours: Mon-Fri 8am-6pm, Sat 9am-2pm
- Certifications: SEAI Registered, Safe Electric, MICS Registered

## Pricing (Republic of Ireland)
- 4kWp system (≈8 panels): €4,500 → €2,700 after €1,800 SEAI grant
- 6kWp system (≈12 panels): €5,500 → €3,700 after grant
- 8kWp system (≈16 panels): €6,500 → €4,700 after grant
- All prices include: Tier 1 panels, inverter, mounting, wiring, commissioning, registration
- Panel brands: Jinko Solar, Trina Solar, LONGi (all Tier 1)
- Free quote, no obligation

## SEAI Grant (Republic of Ireland)
- Amount: €1,800
- Eligibility: Home built & occupied before 2021, owner-occupied, must use SEAI registered installer
- Process: Renewable Ireland handles the full application — grant deducted from invoice
- No need to apply yourself; we manage everything
- Additional €600 battery grant available when adding battery storage

## Battery Storage Options
- Tesla Powerwall 2: 13.5kWh, from €7,500 (installed)
- GivEnergy 9.5kWh: From €4,500 (installed)
- FoxESS 7.4kWh: From €3,800 (installed)
- All compatible with solar PV systems
- Store excess energy for evening use, increase self-consumption to 80%+

## ROI & Savings (Republic of Ireland)
- Payback period: 5-7 years
- 25-year lifetime savings: €15,000 - €25,000
- Annual electricity savings: €800 - €1,400 (depending on system size)
- CEG (Clean Export Guarantee) export earnings: €200 - €400/year
- Increased home value: 3-4% on average
- Panel degradation: <0.5% per year (still 87% output at year 25)

## Warranties
- Solar panels: 25-year manufacturer warranty
- Workmanship: 10-year Renewable Ireland guarantee
- Inverter: 10-year warranty
- Battery: 10-year warranty
- All backed by a real Irish company (not a fly-by-night)

## Service Areas (Republic of Ireland — 16 counties)
Dublin, Cork, Galway, Limerick, Waterford, Kildare, Meath, Wicklow, Wexford, Kilkenny, Tipperary, Clare, Louth, Westmeath, Carlow, Kerry

## Installation Process (5 Steps)
1. Free Survey — Our engineer visits to assess roof, orientation, shading, and electrical setup
2. Custom Proposal — Detailed quote with system design, panel layout, and expected savings
3. SEAI Application — We handle all SEAI grant paperwork on your behalf
4. Installation Day — Professional 1-day install by our certified team (scaffolding, mounting, wiring, commissioning)
5. Activation — System registered with ESB Networks, CEG export set up, monitoring app configured

## Northern Ireland Information
- Certifications: MCS, NICEIC, REAL Assurance
- Grant: SEG (Smart Export Guarantee) — earn for excess energy exported to grid
- Pricing: From £4,000 (4kWp system)
- Battery options: Same brands available
- Service areas: All 6 counties — Antrim, Armagh, Down, Fermanagh, Londonderry, Tyrone

## Lead Qualification Rules
- If the user asks about pricing, quotes, or expresses interest in getting solar panels, set leadQualified to true
- If they ask about booking a survey or an installation, set suggestedAction to "book_survey"
- Personalise responses if leadData is provided (use their name, county, etc.)

## Response Format Guidelines
- When discussing pricing, include the tag [pricing] in your response
- When discussing SEAI grants, include the tag [grant]
- When discussing ROI/payback/savings, include the tag [roi]
- Keep responses concise (2-4 short paragraphs max, or bullet points)
- End with a relevant question or CTA to keep the conversation going
- Never make up information not covered above — direct uncertain queries to hello@renewableireland.ie or +353 87 395 8424`;

/* ------------------------------------------------------------------ */
/*  POST Handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  try {
    /* Rate limiting by IP */
    const sessionId = req.headers.get('x-forwarded-for') ?? 'unknown';
    if (isRateLimited(sessionId)) {
      return NextResponse.json(
        { message: "You're sending messages too quickly. Please wait a moment.", error: 'rate_limited' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { messages = [], leadData } = body as {
      messages: Array<{ role: string; content: string }>;
      leadData?: { name?: string; phone?: string; email?: string; county?: string; systemSize?: string; billAmount?: string };
    };

    if (!messages.length || !messages[messages.length - 1]?.content?.trim()) {
      return NextResponse.json(
        { message: 'Please type a message to get started.', error: 'empty_message' },
        { status: 400 },
      );
    }

    /* Build messages array for LLM */
    const systemContent = leadData
      ? `${SYSTEM_PROMPT}\n\n## Current Lead Context\nThe user you are speaking with:\n- Name: ${leadData.name ?? 'Not provided'}\n- Phone: ${leadData.phone ?? 'Not provided'}\n- Email: ${leadData.email ?? 'Not provided'}\n- County: ${leadData.county ?? 'Not provided'}\n- Interested system size: ${leadData.systemSize ?? 'Not specified'}\n- Estimated monthly bill: ${leadData.billAmount ?? 'Not specified'}\n\nPersonalise your response using this information where relevant.`
      : SYSTEM_PROMPT;

    const apiMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemContent },
    ];

    /* Only send the last 10 messages for context window */
    const recent = messages.slice(-10);
    for (const m of recent) {
      const role = m.role === 'bot' ? 'assistant' : m.role;
      if (role === 'user' || role === 'assistant') {
        apiMessages.push({ role, content: m.content });
      }
    }

    /* Call LLM */
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "I'm sorry, I couldn't generate a response. Please try again or call us at +353 87 395 8424.";

    /* Simple lead qualification detection */
    const userLastMsg = messages[messages.length - 1]?.content?.toLowerCase() ?? '';
    const msgCount = messages.filter((m) => m.role === 'user').length;
    let leadQualified = false;
    let suggestedAction: string | undefined;

    const interestKeywords = ['price', 'pricing', 'cost', 'how much', 'quote', 'interested', 'get solar', 'install', 'panel', 'system'];
    const surveyKeywords = ['book', 'survey', 'appointment', 'schedule', 'visit', 'call me', 'callback', 'someone contact'];

    if (msgCount >= 3 && interestKeywords.some((kw) => userLastMsg.includes(kw))) {
      leadQualified = true;
    }

    if (surveyKeywords.some((kw) => userLastMsg.includes(kw))) {
      suggestedAction = 'book_survey';
    }

    return NextResponse.json({ message: reply, leadQualified, suggestedAction });
  } catch (error) {
    console.error('[SolarChat API Error]', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again or call us at +353 87 395 8424.', error: 'server_error' },
      { status: 500 },
    );
  }
}
