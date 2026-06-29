import { Router } from "express";
import { db, contactsTable, feedbackTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

function checkAuth(req: any, res: any): boolean {
  const auth = req.headers.authorization ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!process.env.ADMIN_PASSWORD || token !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.get("/admin/contacts", async (req, res) => {
  if (!checkAuth(req, res)) return;
  const rows = await db.select().from(contactsTable).orderBy(desc(contactsTable.createdAt));
  res.json(rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

router.get("/admin/feedback", async (req, res) => {
  if (!checkAuth(req, res)) return;
  const rows = await db.select().from(feedbackTable).orderBy(desc(feedbackTable.createdAt));
  res.json(rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

export default router;
