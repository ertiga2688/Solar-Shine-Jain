import { Router } from "express";
import { db, feedbackTable } from "@workspace/db";
import { SubmitFeedbackBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/feedback", async (req, res) => {
  const rows = await db
    .select()
    .from(feedbackTable)
    .orderBy(desc(feedbackTable.createdAt));

  res.json(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      location: r.location ?? null,
      rating: r.rating,
      message: r.message,
      createdAt: r.createdAt.toISOString(),
    })),
  );
});

router.post("/feedback", async (req, res) => {
  const parsed = SubmitFeedbackBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, location, rating, message } = parsed.data;

  const [inserted] = await db
    .insert(feedbackTable)
    .values({ name, location: location ?? null, rating, message })
    .returning();

  res.status(201).json({
    id: inserted.id,
    name: inserted.name,
    location: inserted.location ?? null,
    rating: inserted.rating,
    message: inserted.message,
    createdAt: inserted.createdAt.toISOString(),
  });
});

export default router;
