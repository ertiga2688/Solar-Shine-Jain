import { logger } from "./logger";

const WHATSAPP_NUMBER = "918101090001"; // 91 = India country code

function encodeMessage(text: string): string {
  return encodeURIComponent(text);
}

async function sendWhatsApp(message: string): Promise<void> {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) {
    logger.warn("CALLMEBOT_API_KEY not set — skipping WhatsApp notification");
    return;
  }

  const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodeMessage(message)}&apikey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`CallMeBot error ${res.status}: ${body}`);
  }
  logger.info("WhatsApp notification sent");
}

export async function whatsappContactAlert(data: {
  name: string;
  phone: string;
  type: string;
  message: string;
  monthlyBill?: number | null;
}): Promise<void> {
  const typeLabel =
    data.type === "survey"
      ? "Free Site Survey"
      : data.type === "subsidy"
        ? "Subsidy Inquiry"
        : "General Inquiry";

  const bill = data.monthlyBill
    ? `\nMonthly Bill: Rs ${data.monthlyBill.toLocaleString("en-IN")}`
    : "";

  const msg =
    `*New ${typeLabel}* - Jain Solar\n` +
    `Name: ${data.name}\n` +
    `Phone: ${data.phone}${bill}\n` +
    `Message: ${data.message.slice(0, 200)}`;

  await sendWhatsApp(msg);
}

export async function whatsappFeedbackAlert(data: {
  name: string;
  location?: string | null;
  rating: number;
  message: string;
}): Promise<void> {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
  const loc = data.location ? ` (${data.location})` : "";

  const msg =
    `*New ${data.rating}-star Review* - Jain Solar\n` +
    `${stars}\n` +
    `From: ${data.name}${loc}\n` +
    `"${data.message.slice(0, 200)}"`;

  await sendWhatsApp(msg);
}
