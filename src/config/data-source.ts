import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASS || ''),
  database: process.env.DB_NAME || 'medclinic_db',
  synchronize: true, // Cria automaticamente a tabela 'users' no banco
  logging: false,
  entities: [User]
});