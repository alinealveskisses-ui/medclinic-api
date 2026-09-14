import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthServices";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, email, password, role } = req.body;

      // Validação de campos obrigatórios (RF05)
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      // Validação de formato de e-mail (RF05)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Formato de e-mail inválido." });
      }

      const user = await this.authService.register({ name, email, password, role });
      return res.status(201).json(user);
    } catch (error) {
      next(error); // Encaminha para o middleware de erro central
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      }

      const result = await this.authService.login({ email, password });
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}