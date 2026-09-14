import { Request, Response, NextFunction } from "express";

export function authorizeRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Usuário não autenticado.",
      });
    }

    const userRole = String(req.user.role).toUpperCase();
    const allowed = roles.map((r) => r.toUpperCase());

    if (!allowed.includes(userRole)) {
      return res.status(403).json({
        status: "error",
        statusCode: 403,
        message: "Acesso negado: permissão insuficiente para este recurso.",
      });
    }

    return next();
  };
}