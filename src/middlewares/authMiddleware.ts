import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Token de autenticação ausente.",
    });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Token malformatado. Utilize o padrão 'Bearer <token>'.",
    });
  }

  const token = parts[1];

  try {
    const decoded = verifyToken(token);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    return next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Token inválido ou expirado.",
    });
  }
}