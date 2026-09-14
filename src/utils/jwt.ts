import jwt from "jsonwebtoken";

export interface IJwtPayload {
  id: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const JWT_EXPIRES_IN = "1d";

export function generateToken(payload: IJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): IJwtPayload {
  return jwt.verify(token, JWT_SECRET) as IJwtPayload;
}