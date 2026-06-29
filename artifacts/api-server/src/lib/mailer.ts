import nodemailer from "nodemailer";
import { logger } from "./logger";

const NOTIFY_EMAIL = "navnkd@gmail.com";
const FROM = '"Jain Communications Solar" <navnkd@gmail.com>';

function createTransport() {
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: NOTIFY_EMAIL, pass },
  });
}

export async function sendContactNotification(data: {
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  message: string;
  type: string;
  monthlyBill?: number | null;
}) {
  const transporter = createTransport();
  if (!transporter) {
    logger.warn("GMAIL_APP_PASSWORD not set — skipping contact email notification");
    return;
  }

  const typeLabel = data.type === "survey" ? "Free Site Survey Request" : data.type === "subsidy" ? "Subsidy Inquiry" : "General Inquiry";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:12px">
      <div style="background:#1E3A5F;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="color:#F59E0B;margin:0;font-size:20px">New ${typeLabel}</h2>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">Jain Communications Solar Website</p>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #eee">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600;color:#1E3A5F">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;font-size:13px">Phone</td><td style="padding:8px 0;font-weight:600;color:#1E3A5F"><a href="tel:+91${data.phone}" style="color:#1E3A5F">${data.phone}</a></td></tr>
          ${data.email ? `<tr><td style="padding:8px 0;color:#666;font-size:13px">Email</td><td style="padding:8px 0;color:#1E3A5F">${data.email}</td></tr>` : ""}
          ${data.address ? `<tr><td style="padding:8px 0;color:#666;font-size:13px">Address</td><td style="padding:8px 0;color:#1E3A5F">${data.address}</td></tr>` : ""}
          ${data.monthlyBill ? `<tr><td style="padding:8px 0;color:#666;font-size:13px">Monthly Bill</td><td style="padding:8px 0;color:#1E3A5F">₹${data.monthlyBill.toLocaleString("en-IN")}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#666;font-size:13px">Type</td><td style="padding:8px 0"><span style="background:#FEF3C7;color:#92400E;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:600">${typeLabel}</span></td></tr>
        </table>
        <div style="margin-top:16px;background:#f9f9f9;padding:14px;border-radius:8px;border-left:3px solid #F59E0B">
          <p style="margin:0 0 6px;color:#666;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px">Message</p>
          <p style="margin:0;color:#333;line-height:1.6">${data.message}</p>
        </div>
        <div style="margin-top:20px;text-align:center">
          <a href="tel:+91${data.phone}" style="display:inline-block;background:#1E3A5F;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Call ${data.phone}</a>
        </div>
      </div>
      <p style="text-align:center;color:#aaa;font-size:11px;margin-top:12px">www.jaincommunications.com</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject: `[JC Solar] New ${typeLabel} from ${data.name}`,
      html,
    });
    logger.info("Contact notification email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send contact notification email");
  }
}

export async function sendFeedbackNotification(data: {
  name: string;
  location?: string | null;
  rating: number;
  message: string;
}) {
  const transporter = createTransport();
  if (!transporter) {
    logger.warn("GMAIL_APP_PASSWORD not set — skipping feedback email notification");
    return;
  }

  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:12px">
      <div style="background:#1E3A5F;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="color:#F59E0B;margin:0;font-size:20px">New Customer Review</h2>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">Jain Communications Solar Website</p>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #eee">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <div style="width:48px;height:48px;border-radius:50%;background:#1E3A5F;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#F59E0B;text-align:center;line-height:48px">${data.name.charAt(0).toUpperCase()}</div>
          <div>
            <p style="margin:0;font-weight:700;color:#1E3A5F;font-size:16px">${data.name}</p>
            ${data.location ? `<p style="margin:2px 0 0;color:#888;font-size:13px">${data.location}</p>` : ""}
          </div>
        </div>
        <div style="font-size:24px;color:#F59E0B;margin-bottom:12px;letter-spacing:2px">${stars}</div>
        <div style="background:#f9f9f9;padding:14px;border-radius:8px;border-left:3px solid #F59E0B">
          <p style="margin:0;color:#333;line-height:1.6;font-style:italic">"${data.message}"</p>
        </div>
      </div>
      <p style="text-align:center;color:#aaa;font-size:11px;margin-top:12px">www.jaincommunications.com</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject: `[JC Solar] New ${data.rating}-star review from ${data.name}`,
      html,
    });
    logger.info("Feedback notification email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send feedback notification email");
  }
}
