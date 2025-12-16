import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STALE_THRESHOLD_DAYS = 3;

interface StaleLead {
  id: string;
  name: string;
  email: string;
  workflow_stage: string | null;
  updated_at: string;
  days_stale: number;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Follow-up digest function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate threshold date
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - STALE_THRESHOLD_DAYS);

    // Fetch stale leads
    const { data: staleLeads, error: leadsError } = await supabase
      .from("leads")
      .select("id, name, email, workflow_stage, updated_at")
      .lt("updated_at", thresholdDate.toISOString())
      .not("workflow_stage", "in", '("completed","installed","done")');

    if (leadsError) {
      console.error("Error fetching stale leads:", leadsError);
      throw leadsError;
    }

    if (!staleLeads || staleLeads.length === 0) {
      console.log("No stale leads found");
      return new Response(
        JSON.stringify({ message: "No stale leads to report" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Calculate days stale for each lead
    const leadsWithDays: StaleLead[] = staleLeads.map(lead => ({
      ...lead,
      days_stale: Math.floor(
        (new Date().getTime() - new Date(lead.updated_at).getTime()) / (1000 * 60 * 60 * 24)
      )
    })).sort((a, b) => b.days_stale - a.days_stale);

    console.log(`Found ${leadsWithDays.length} stale leads`);

    // Fetch all consultants to send digest
    const { data: consultants, error: consultantsError } = await supabase
      .from("profiles")
      .select("user_id, full_name")
      .eq("role", "consultant");

    if (consultantsError) {
      console.error("Error fetching consultants:", consultantsError);
      throw consultantsError;
    }

    // Get consultant emails from auth
    const consultantEmails: string[] = [];
    for (const consultant of consultants || []) {
      const { data: userData } = await supabase.auth.admin.getUserById(consultant.user_id);
      if (userData?.user?.email) {
        consultantEmails.push(userData.user.email);
      }
    }

    if (consultantEmails.length === 0) {
      console.log("No consultant emails found");
      return new Response(
        JSON.stringify({ message: "No consultants to notify" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate email HTML
    const urgentLeads = leadsWithDays.filter(l => l.days_stale >= 7);
    const warningLeads = leadsWithDays.filter(l => l.days_stale >= 5 && l.days_stale < 7);
    const attentionLeads = leadsWithDays.filter(l => l.days_stale < 5);

    const getStageLabel = (stage: string | null) => {
      const labels: Record<string, string> = {
        'new': 'New Lead',
        'survey': 'Survey',
        'proposal': 'Proposal',
        'approved': 'Approved',
        'scheduled': 'Scheduled'
      };
      return labels[stage || 'new'] || stage || 'New Lead';
    };

    const generateLeadRow = (lead: StaleLead) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${lead.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${getStageLabel(lead.workflow_stage)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: ${lead.days_stale >= 7 ? '#dc2626' : lead.days_stale >= 5 ? '#f59e0b' : '#6b7280'}; font-weight: bold;">
          ${lead.days_stale} days
        </td>
      </tr>
    `;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 24px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; }
          .alert { background: #fef2f2; border-left: 4px solid #dc2626; padding: 12px 16px; margin-bottom: 16px; border-radius: 4px; }
          .warning { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 16px; border-radius: 4px; }
          table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-top: 16px; }
          th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; }
          .footer { text-align: center; padding: 16px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">📋 Follow-up Reminder Digest</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">You have ${leadsWithDays.length} leads needing attention</p>
          </div>
          
          <div class="content">
            ${urgentLeads.length > 0 ? `
              <div class="alert">
                <strong>🚨 Urgent:</strong> ${urgentLeads.length} lead${urgentLeads.length > 1 ? 's' : ''} with no activity for 7+ days
              </div>
            ` : ''}
            
            ${warningLeads.length > 0 ? `
              <div class="warning">
                <strong>⚠️ Warning:</strong> ${warningLeads.length} lead${warningLeads.length > 1 ? 's' : ''} with no activity for 5-6 days
              </div>
            ` : ''}
            
            <table>
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Stage</th>
                  <th>Days Inactive</th>
                </tr>
              </thead>
              <tbody>
                ${leadsWithDays.slice(0, 15).map(generateLeadRow).join('')}
              </tbody>
            </table>
            
            ${leadsWithDays.length > 15 ? `
              <p style="text-align: center; color: #6b7280; margin-top: 16px;">
                + ${leadsWithDays.length - 15} more leads...
              </p>
            ` : ''}
            
            <p style="text-align: center; margin-top: 24px;">
              <a href="${Deno.env.get("SITE_URL") || "https://your-app.lovable.app"}" 
                 style="display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                Open Dashboard
              </a>
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated follow-up reminder from your Solar CRM</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to all consultants
    const emailResponse = await resend.emails.send({
      from: "Solar CRM <onboarding@resend.dev>",
      to: consultantEmails,
      subject: `📋 Follow-up Reminder: ${leadsWithDays.length} leads need attention`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        staleLeadsCount: leadsWithDays.length,
        emailsSent: consultantEmails.length
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-follow-up-digest function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
