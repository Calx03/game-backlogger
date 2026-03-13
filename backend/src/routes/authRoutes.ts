import { Router } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

import { db } from "../db/db.js";
import { UserTable } from "../db/schema.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const result = await db
      .insert(UserTable)
      .values({ username, email, password: hash })
      .returning({ username: UserTable.username, email: UserTable.email });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));

    if (user.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const result = await bcrypt.compare(password, user[0].password);

    if (result) {
      res.json({ login: "success" });
    } else {
      res.json({ login: "failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
