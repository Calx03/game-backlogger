// PATCH /api/backlog/:id — Update rating, status, notes
// DELETE /api/backlog/:id — Remove a game from the backlog

import { Router } from "express";
import { db } from "../db/db.js";
import { BacklogEntryTable, UserTable } from "../db/schema.js";
import { and, eq } from "drizzle-orm";

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
    const existingEntry = await db
      .select()
      .from(BacklogEntryTable)
      .where(
        and(
          eq(BacklogEntryTable.rawgId, rawgId),
          eq(BacklogEntryTable.userId, req.user.id),
        ),
      );

    if (existingEntry.length > 0) {
      return res.json({ error: "Game already in backlog" });
    }

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

router.patch("/:id", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorised" });

  const { status, rating, notes } = req.body;
  const id = parseInt(req.params.id);
  try {
    const updatedEntry = await db
      .update(BacklogEntryTable)
      .set({ status, rating, notes })
      .where(
        and(
          eq(BacklogEntryTable.id, id),
          eq(BacklogEntryTable.userId, req.user.id),
        ),
      )
      .returning();

    res.json(updatedEntry);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorised" });

  const id = parseInt(req.params.id);

  try {
    await db
      .delete(BacklogEntryTable)
      .where(
        and(
          eq(BacklogEntryTable.id, id),
          eq(BacklogEntryTable.userId, req.user.id),
        ),
      );

    res.status(204).send();
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
