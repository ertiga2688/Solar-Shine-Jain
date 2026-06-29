import { Router } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { sendContactNotification } from "../lib/mailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, phone, email, address, message, type, monthlyBill } = parsed.data;

  const [inserted] = await db.insert(contactsTable).values({
    name,
    phone,
    email: email ?? null,
    address: address ?? null,
    message,
    type: type as "general" | "survey" | "subsidy",
    monthlyBill: monthlyBill ?? null,
  }).returning();

  const response: { id: number; message: string } = {
    id: inserted.id,
    message: "Thank you! We will contact you within 24 hours.",
  };

  const validated = SubmitContactResponse.parse(response);
  res.status(201).json(validated);

  // Send email notification (non-blocking — don't await so response is instant)
  sendContactNotification({ name, phone, email, address, message, type, monthlyBill }).catch(() => {});
});

export default router;
