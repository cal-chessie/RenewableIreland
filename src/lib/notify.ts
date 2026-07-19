/**
 * Lead notification — emails leads to the business via Postmark.
 * Without POSTMARK_SERVER_TOKEN set, leads are only console-logged (i.e. lost
 * in production). Set the env vars from .env.example.
 */
export async function sendLeadEmail(
  subject: string,
  fields: Record<string, unknown>
): Promise<boolean> {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  const to = process.env.CONTACT_EMAIL_TO || 'cal@renewably.ie';
  const from = process.env.CONTACT_EMAIL_FROM || to;

  if (!token) {
    console.warn('[Leads] POSTMARK_SERVER_TOKEN not set — lead only logged, not emailed:', subject);
    return false;
  }

  const body = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v ?? 'N/A'}`)
    .join('\n');

  const res = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Postmark-Server-Token': token,
    },
    body: JSON.stringify({
      From: from,
      To: to,
      Subject: subject,
      TextBody: body,
      MessageStream: 'outbound',
    }),
  });

  if (!res.ok) {
    console.error('[Leads] Postmark send failed:', res.status, await res.text());
    return false;
  }
  return true;
}
