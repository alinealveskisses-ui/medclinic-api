import { UserRole } from "../entities/User"; // Importe o enum da sua entidade

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole; // Altere de string para UserRole
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}