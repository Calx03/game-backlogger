import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${req.query.query}&key=${process.env.RAWG_KEY}`,
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});
