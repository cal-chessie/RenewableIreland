import 'server-only';

import { createHash } from 'node:crypto';

const HUBSPOT_API = 'https://api.hubapi.com';
const HUBSPOT_API_VERSION = '2026-03';
const LEAD_KEY_PROPERTY = 'renewable_ireland_lead_key';
const DEAL_TO_CONTACT_ASSOCIATION = 3;
const NOTE_TO_CONTACT_ASSOCIATION = 202;
const NOTE_TO_DEAL_ASSOCIATION = 214;

export class HubSpotCaptureError extends Error {
  constructor(
    message: string,
    public readonly kind: 'configuration' | 'provider',
  ) {
    super(message);
    this.name = 'HubSpotCaptureError';
  }
}

export interface HubSpotLeadCapture {
  name: string;
  email: string;
  phone?: string;
  createDeal?: boolean;
  source: string;
  submissionType: string;
  reference: string;
  details: Record<string, unknown>;
}

interface HubSpotBatchResponse {
  results?: Array<{ id?: string }>;
}

interface HubSpotConfig {
  serviceKey: string;
  pipelineId: string;
  newEnquiryStageId: string;
}

function configuration(): HubSpotConfig {
  const serviceKey = process.env.HUBSPOT_SERVICE_KEY;
  const pipelineId = process.env.HUBSPOT_PIPELINE_ID;
  const newEnquiryStageId = process.env.HUBSPOT_NEW_ENQUIRY_STAGE_ID;

  if (!serviceKey || !pipelineId || !newEnquiryStageId) {
    throw new HubSpotCaptureError(
      'HubSpot is not configured. Set HUBSPOT_SERVICE_KEY, HUBSPOT_PIPELINE_ID and HUBSPOT_NEW_ENQUIRY_STAGE_ID before accepting live leads.',
      'configuration',
    );
  }

  return { serviceKey, pipelineId, newEnquiryStageId };
}

function firstAndLastName(name: string): { firstname: string; lastname?: string } {
  const parts = name.trim().slice(0, 200).split(/\s+/).filter(Boolean);
  return {
    firstname: parts[0] ?? name.trim(),
    ...(parts.length > 1 ? { lastname: parts.slice(1).join(' ') } : {}),
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function present(value: unknown): string {
  if (value === undefined || value === null || value === '') return 'Not provided';
  const stringValue = typeof value === 'object' ? JSON.stringify(value) ?? 'Not provided' : String(value);
  return stringValue.slice(0, 2_000);
}

function noteBody(capture: HubSpotLeadCapture): string {
  const details = Object.entries(capture.details)
    .map(([key, value]) => `<li><strong>${escapeHtml(key)}:</strong> ${escapeHtml(present(value))}</li>`)
    .join('');

  return [
    `<h3>${escapeHtml(capture.submissionType.slice(0, 200))}</h3>`,
    '<ul>',
    `<li><strong>Reference:</strong> ${escapeHtml(capture.reference.slice(0, 200))}</li>`,
    `<li><strong>Source:</strong> ${escapeHtml(capture.source.slice(0, 200))}</li>`,
    `<li><strong>Captured:</strong> ${new Date().toISOString()}</li>`,
    details,
    '</ul>',
  ].join('');
}

function leadKey(email: string): string {
  return createHash('sha256')
    .update(`renewable-ireland:website-lead:${email}`)
    .digest('hex');
}

async function hubSpotRequest<T>(method: 'POST' | 'PUT', path: string, body?: unknown): Promise<T | undefined> {
  const config = configuration();
  let response: Response;
  try {
    response = await fetch(`${HUBSPOT_API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${config.serviceKey}`,
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new HubSpotCaptureError(
      `HubSpot could not be reached: ${error instanceof Error ? error.message : 'unknown network error'}`,
      'provider',
    );
  }

  if (!response.ok) {
    console.error('[HubSpot] Provider rejected write', { status: response.status, path });
    throw new HubSpotCaptureError('HubSpot rejected the lead capture.', 'provider');
  }

  const responseBody = await response.text();
  if (!responseBody) return undefined;

  try {
    return JSON.parse(responseBody) as T;
  } catch {
    console.error('[HubSpot] Provider returned an unreadable success response', { status: response.status, path });
    throw new HubSpotCaptureError('HubSpot returned an unreadable response.', 'provider');
  }
}

function requireRecordId(response: HubSpotBatchResponse | undefined, record: 'contact' | 'deal'): string {
  const id = response?.results?.[0]?.id;
  if (!id) {
    console.error(`[HubSpot] ${record} upsert returned no record ID`);
    throw new HubSpotCaptureError(`HubSpot did not confirm the ${record} record.`, 'provider');
  }
  return id;
}

export async function captureHubSpotLead(capture: HubSpotLeadCapture): Promise<{ contactId: string; dealId?: string }> {
  const config = configuration();
  const email = capture.email.trim().toLowerCase().slice(0, 254);
  const name = firstAndLastName(capture.name);
  const deterministicLeadKey = leadKey(email);

  const contact = await hubSpotRequest<HubSpotBatchResponse>(
    'POST',
    `/crm/objects/${HUBSPOT_API_VERSION}/contacts/batch/upsert`,
    {
      inputs: [
        {
          id: email,
          idProperty: 'email',
          properties: {
            email,
            firstname: name.firstname,
            ...(name.lastname ? { lastname: name.lastname } : {}),
            ...(capture.phone ? { phone: capture.phone.trim().slice(0, 50) } : {}),
          },
        },
      ],
    },
  );
  const contactId = requireRecordId(contact, 'contact');
  let dealId: string | undefined;
  if (capture.createDeal !== false) {
    const deal = await hubSpotRequest<HubSpotBatchResponse>(
      'POST',
      `/crm/objects/${HUBSPOT_API_VERSION}/deals/batch/upsert`,
      {
        inputs: [
          {
            id: deterministicLeadKey,
            idProperty: LEAD_KEY_PROPERTY,
            properties: {
              [LEAD_KEY_PROPERTY]: deterministicLeadKey,
              dealname: `Website enquiry — ${capture.name.trim().slice(0, 150)}`,
              pipeline: config.pipelineId,
              dealstage: config.newEnquiryStageId,
            },
          },
        ],
      },
    );
    dealId = requireRecordId(deal, 'deal');

    await hubSpotRequest(
      'PUT',
      `/crm/objects/${HUBSPOT_API_VERSION}/deals/${encodeURIComponent(dealId)}/associations/contacts/${encodeURIComponent(contactId)}/${DEAL_TO_CONTACT_ASSOCIATION}`,
    );
  }

  await hubSpotRequest(
    'POST',
    `/crm/objects/${HUBSPOT_API_VERSION}/notes`,
    {
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: noteBody(capture),
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: NOTE_TO_CONTACT_ASSOCIATION }],
        },
        ...(dealId ? [{
          to: { id: dealId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: NOTE_TO_DEAL_ASSOCIATION }],
        }] : []),
      ],
    },
  );

  return { contactId, ...(dealId ? { dealId } : {}) };
}

export function hubSpotFailureResponse(error: unknown): { status: number; message: string } {
  if (error instanceof HubSpotCaptureError && error.kind === 'configuration') {
    return {
      status: 503,
      message: 'Our enquiry system is being prepared. Please call us directly for now.',
    };
  }

  return {
    status: 502,
    message: 'We could not safely record your request. Please try again or call us directly.',
  };
}
