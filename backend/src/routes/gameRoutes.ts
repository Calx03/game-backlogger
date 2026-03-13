import { Router } from "express";

const router = Router();

// Test RawgID: 3498 (GTA V)

interface RawgSearchResultInterface {
  results: RawgGameDataInterface[];
}

interface RawgGameDataInterface {
  id: number;
  name: string;
  description: string;
  released: string;
  background_image: string;
  platforms: {
    platform: {
      name: string;
    };
    released_at: string;
  }[];
}

router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${query}&key=${process.env.RAWG_KEY}`,
    );
    const data = (await response.json()) as RawgSearchResultInterface;

    const games = data.results.map((game) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      released: game.released,
      platforms: game.platforms.map((p) => p.platform.name),
    }));

    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:rawgId", async (req, res) => {
  const { rawgId } = req.params;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${rawgId}?key=${process.env.RAWG_KEY}`,
    );
    const data = (await response.json()) as RawgGameDataInterface;

    res.json({
      id: data.id,
      name: data.name,
      description: data.description,
      background_image: data.background_image,
      released: data.released,
      platforms: data.platforms.map((p) => p.platform.name),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
