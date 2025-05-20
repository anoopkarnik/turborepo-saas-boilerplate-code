// middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request,res: Response,next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token  = authHeader?.split(" ")[1] as string;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) 
    // @ts-ignore
    req.userId = (decoded as any).id; 
    next(); // ✅ All good, continue
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
