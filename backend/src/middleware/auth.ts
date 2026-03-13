import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  id: number;
  username: string;
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorised" });

  const token = authHeader.split(" ")[1];
  const secret = process.env.ACCESS_TOKEN_SECRET as string;

  if (!secret) {
    console.error("ACCESS_TOKEN_SECRET is not set");
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    const decodedToken = jwt.verify(token, secret) as DecodedToken;

    req.user = { id: decodedToken.id, username: decodedToken.username };

    next();
  } catch (err: any) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

export default authenticateUser;
