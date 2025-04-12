import { RequestHandler } from "express";
import { verifyAuthToken } from "./utils/auth";

export const authMiddleware: RequestHandler = (req, res, next) => {
    console.log('req.headers', req.headers);
  const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);
  const user = verifyAuthToken(token || "");
  console.log("user", user);

  if (!user) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  (req as any).user = user;
  next();
};
