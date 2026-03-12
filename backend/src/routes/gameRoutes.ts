import { Router } from "express";

const router = Router();

router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${query}&key=${process.env.RAWG_KEY}`,
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
