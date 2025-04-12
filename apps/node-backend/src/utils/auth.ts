import jwt from "jsonwebtoken";

export function verifyAuthToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (err) {
    console.error("Token verification failed", err);
    return null;
  }
}
