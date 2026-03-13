import express from "express";
import dotenv from "dotenv";

import gameRouter from "./routes/gameRoutes.js";
import authRouter from "./routes/authRoutes.js";
import backlogRouter from "./routes/backlogRoutes.js";
import authenticateUser from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/games", gameRouter);
app.use("/api/auth", authRouter);
app.use("/api/backlog", authenticateUser, backlogRouter);

app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});
