import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(lead) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Must stay this until you verify a domain
      to: process.env.NOTIFY_TO,
      subject: `New Lead: ${lead.fullName}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${lead.fullName}</p>
        <p><strong>Company:</strong> ${lead.company || 'N/A'}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${lead.message}</p>
      `,
    });
    console.log("Lead notification email sent successfully.");
  } catch (error) {
    console.error("Lead notification email failed:", error);
    throw error;
  }
}