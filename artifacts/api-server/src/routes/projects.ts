import { Router } from "express";
import { db, projectsTable } from "@workspace/db";
import { GetProjectsResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/projects", async (req, res) => {
  const projects = await db
    .select()
    .from(projectsTable)
    .orderBy(desc(projectsTable.year), desc(projectsTable.id));

  const validated = GetProjectsResponse.parse(projects);
  res.json(validated);
});

export default router;
