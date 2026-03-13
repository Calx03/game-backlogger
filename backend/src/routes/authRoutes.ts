import { Router } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const accessToken = jwt.sign(
        { id: user[0].id, username: user[0].username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" },
      );

      res.json({ accessToken: accessToken });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
