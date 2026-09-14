import { Request, Response, NextFunction } from "express";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Erro interno do servidor.";

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
}