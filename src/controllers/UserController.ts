import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/user.repository";

export class UserController {
  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const user = await userRepository.findOne({
        where: { id: req.user?.id },
        select: {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
},
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  adminPing = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      message: "Acesso autorizado ao painel administrativo (pong)!",
      user: req.user,
    });
  };
}