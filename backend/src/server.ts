import express from "express";
import dotenv from "dotenv";

import { db } from "./db/db.js";
import { BacklogGameTable } from "./db/schema.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await db.insert(BacklogGameTable).values({ rawgId: 1 });
    const game = await db.query.BacklogGameTable.findFirst();
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});
