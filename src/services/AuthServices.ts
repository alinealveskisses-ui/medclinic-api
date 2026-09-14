import { userRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { CreateUserDTO, LoginDTO, UserResponseDTO } from "../dtos/AuthDTO";

export class AuthService {
  async register(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { name, email, password, role } = data;

    // RF05 & RF11: Validar e-mail duplicado
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      const error: any = new Error("E-mail já cadastrado no sistema.");
      error.statusCode = 409;
      throw error;
    }

    // RF06: Hash da senha
    const hashedPassword = await hashPassword(password);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await userRepository.save(newUser);

    // Retorna dados sem expor o hash da senha
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };
  }

  async login(credentials: LoginDTO): Promise<{ token: string }> {
    const { email, password } = credentials;

    // RF07 & RF11: Validação sem especificar qual campo errou (401 genérico)
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      const error: any = new Error("Credenciais inválidas.");
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      const error: any = new Error("Credenciais inválidas.");
      error.statusCode = 401;
      throw error;
    }

    // RF07: Emissão do JWT com id e role
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return { token };
  }
}