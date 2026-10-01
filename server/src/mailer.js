import nodemailer from "nodemailer";

// Env vars are read inside functions, not at the top of the file.
// ES module imports run before dotenv.config() in index.js, so top-level reads would be undefined.
let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT) || 587;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export async function sendLeadNotification(lead) {
  if (!process.env.SMTP_HOST || !process.env.NOTIFY_TO) {
    console.warn("Email not configured (SMTP_HOST / NOTIFY_TO missing); skipping notification.");
    return;
  }

  const { fullName, company, email, phone, message } = lead;

  await getTransporter().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.NOTIFY_TO,
    replyTo: email, // hitting Reply in your inbox answers the lead directly
    subject: `New lead: ${fullName.replace(/[\r\n]+/g, " ")}${company ? ` (${company.replace(/[\r\n]+/g, " ")})` : ""}`,
    text: [
      `Name: ${fullName}`,
      `Company: ${company || "-"}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      "",
      message,
    ].join("\n"),
    html: `
      <h2>New lead from 247labs</h2>
      <p><strong>Name:</strong> ${esc(fullName)}<br>
         <strong>Company:</strong> ${esc(company || "-")}<br>
         <strong>Email:</strong> ${esc(email)}<br>
         <strong>Phone:</strong> ${esc(phone || "-")}</p>
      <p style="white-space:pre-wrap">${esc(message)}</p>
    `,
  });
}