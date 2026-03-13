import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  id: number;
  username: string;
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorised" });
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    ) as DecodedToken;

    req.user = { id: decodedToken.id, username: decodedToken.username };

    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export default authenticateUser;
