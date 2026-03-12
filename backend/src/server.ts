import express from "express";
import dotenv from "dotenv";

import gamesRouter from "./routes/gameRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/games", gamesRouter);

app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});
