// PATCH /api/backlog/:id — Update rating, status, notes
// DELETE /api/backlog/:id — Remove a game from the backlog

import { Router } from "express";
import { db } from "../db/db.js";
import { BacklogEntryTable, UserTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

// Get all games in the authenticated user's backlog
router.get("/", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorised" });

  try {
    const entries = await db
      .select()
      .from(BacklogEntryTable)
      .where(eq(BacklogEntryTable.userId, req.user.id));
    res.json(entries);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a game to the user's backlog
router.post("/", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorised" });

  const { rawgId, status, rating, notes } = req.body;

  try {
    const entry = await db
      .insert(BacklogEntryTable)
      .values({ rawgId, status, rating, notes, userId: req.user.id })
      .returning();

    res.json(entry);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
